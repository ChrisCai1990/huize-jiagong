#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
服务器版 gen_week - 直接操作服务器数据库
在服务器上运行：python3 /var/www/huize-jiagong/scripts/gen_week_server.py --month 2026-06 --save /tmp/result.json
"""

import sqlite3
import json
import argparse
import sys
from datetime import date
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# 优先用环境变量，其次找默认路径
import os
DB_PATH = os.environ.get(
    'DATABASE_PATH',
    str(Path(__file__).parent.parent / 'content.db')
)


def get_conn():
    return sqlite3.connect(DB_PATH)


def save_to_db(json_file: str, month: str):
    with open(json_file, 'r', encoding='utf-8') as f:
        content = f.read().strip()

    if '```' in content:
        start = content.find('```json')
        content = content[start + 7:] if start != -1 else content[content.find('```') + 3:]
        end = content.rfind('```')
        if end != -1:
            content = content[:end]
        content = content.strip()

    items = json.loads(content)
    conn = get_conn()
    cur = conn.cursor()
    saved = errors = 0

    for item in items:
        day_num = item.get('day_number')
        if not day_num:
            errors += 1
            continue

        cur.execute('SELECT id FROM schedule_days WHERE month=? AND day_number=?', (month, day_num))
        row = cur.fetchone()
        if not row:
            print(f'  Day {day_num}: 未找到排期，跳过')
            errors += 1
            continue

        sd_id = row[0]
        cur.execute('''
            INSERT INTO scripts (schedule_day_id, weixin_script, weixin_title, weixin_cover,
                                  xhs_script, xhs_title, xhs_tags, shoot_tips, updated_at)
            VALUES (?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)
            ON CONFLICT(schedule_day_id) DO UPDATE SET
              weixin_script=excluded.weixin_script, weixin_title=excluded.weixin_title,
              weixin_cover=excluded.weixin_cover, xhs_script=excluded.xhs_script,
              xhs_title=excluded.xhs_title, xhs_tags=excluded.xhs_tags,
              shoot_tips=excluded.shoot_tips, updated_at=CURRENT_TIMESTAMP
        ''', (sd_id, item.get('weixin_script',''), item.get('weixin_title',''),
              item.get('weixin_cover',''), item.get('xhs_script',''),
              item.get('xhs_title',''), item.get('xhs_tags',''), item.get('shoot_tips','')))

        cur.execute("UPDATE schedule_days SET status='scripted' WHERE id=? AND status='planned'", (sd_id,))
        print(f'  ✓ Day {day_num} 已保存')
        saved += 1

    conn.commit()
    conn.close()
    print(f'\n完成：{saved} 天写入，{errors} 个跳过')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--month', required=True)
    parser.add_argument('--save', metavar='JSON_FILE', required=True)
    args = parser.parse_args()
    print(f'数据库路径：{DB_PATH}')
    save_to_db(args.save, args.month)
