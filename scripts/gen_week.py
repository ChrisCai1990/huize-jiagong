#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
用法：
  # 查看某月各周选题
  python scripts/gen_week.py --month 2026-06 --list

  # 生成某周的提示词（Claude Code 用）
  python scripts/gen_week.py --month 2026-06 --week 1

  # 将 Claude 生成的 JSON 写入数据库（提供月份确保精确匹配）
  python scripts/gen_week.py --save result.json --month 2026-06
"""

import sqlite3
import json
import argparse
import sys
import os
from datetime import date
from pathlib import Path

# 强制 UTF-8 输出
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr.encoding != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8')

DB_PATH = Path(__file__).parent.parent / "content.db"

BRAND_CONTEXT = """品牌：汇泽健康
内容方向：桥本甲状腺炎 × 孕期/备孕/产后
目标受众：患有桥本甲状腺炎的备孕、孕期、产后女性，25-38岁，焦虑，渴望实用且真实的信息
主播风格：亲切接地气，像懂桥本的闺蜜说话，不过度医学化
平台：视频号（口播视频）+ 小红书（图文笔记）

安全红线：不做确诊建议 · 不夸大疗效 · 不替代医疗建议 · 不推荐具体药品剂量""".strip()


def get_conn():
    return sqlite3.connect(str(DB_PATH))


def get_week_days(month: str, week_index: int):
    """返回指定月份第 week_index 周（从1起）的所有已分配天。"""
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        SELECT sd.day_number, sd.id,
               t.title, t.pillar, t.audience_stage, t.pain_point, t.hook
        FROM schedule_days sd
        JOIN topics t ON sd.topic_id = t.id
        WHERE sd.month = ?
        ORDER BY sd.day_number
    """, (month,))
    all_days = cur.fetchall()
    conn.close()

    if not all_days:
        return []

    year, m = map(int, month.split("-"))
    first_weekday = date(year, m, 1).weekday()  # 0=Mon

    # 按周分组
    weeks_map: dict[int, list] = {}
    for row in all_days:
        day_num = row[0]
        wk = (first_weekday + day_num - 1) // 7 + 1  # 1-based
        weeks_map.setdefault(wk, []).append(row)

    if week_index not in weeks_map:
        avail = sorted(weeks_map.keys())
        print(f"错误：第{week_index}周无内容，本月有内容的周：{avail}")
        sys.exit(1)

    return weeks_map[week_index]


def build_prompt(days, month: str, week_index: int) -> str:
    DAY_NAMES = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    year, m = map(int, month.split("-"))

    entries = []
    for row in days:
        day_num, _, title, pillar, stage, pain_point, hook = row
        wd = date(year, m, day_num).weekday()
        entries.append(
            f"=== Day {day_num}（{DAY_NAMES[wd]}）===\n"
            f"话题：{title}\n"
            f"内容支柱：{pillar}\n"
            f"目标人群：{stage}\n"
            f"核心痛点：{pain_point or ''}\n"
            f"视频号开场钩子：{hook or ''}"
        )

    count = len(days)
    days_text = "\n\n".join(entries)

    return f"""{BRAND_CONTEXT}

---

{month} 第{week_index}周共 {count} 条内容，请依次生成口播脚本。**只输出 JSON，不要任何解释文字。**

{days_text}

---

输出格式（数组长度必须 = {count}）：

```json
[
  {{
    "day_number": <整数>,
    "weixin_script": "<视频号口播脚本，60-90秒，含【开场钩子】【共情建立】【核心内容3点】【互动结尾】结构>",
    "weixin_title": "<视频号标题，15-20字，含桥本/备孕/孕期/产后关键词>",
    "weixin_cover": "<封面文字，5-8字，视觉冲击力强>",
    "xhs_title": "<小红书标题，20-30字，含emoji，搜索词前置>",
    "xhs_script": "<小红书图文正文，300-500字，用①②③或📌分点，结尾引导收藏>",
    "xhs_tags": "<15个#标签，空格分隔>",
    "shoot_tips": "<拍摄提示：景别/道具场景/情绪节奏>"
  }}
]
```"""


def save_to_db(json_file: str, month: str):
    with open(json_file, "r", encoding="utf-8") as f:
        content = f.read().strip()

    # 提取 ```json ... ``` 块
    if "```" in content:
        start = content.find("```json")
        if start != -1:
            content = content[start + 7:]
        else:
            content = content[content.find("```") + 3:]
        end = content.rfind("```")
        if end != -1:
            content = content[:end]
        content = content.strip()

    try:
        items = json.loads(content)
    except json.JSONDecodeError as e:
        print(f"JSON 解析失败：{e}")
        print("内容前300字：\n", content[:300])
        sys.exit(1)

    conn = get_conn()
    cur = conn.cursor()
    saved, errors = 0, 0

    for item in items:
        day_num = item.get("day_number")
        if not day_num:
            print("  跳过：缺少 day_number")
            errors += 1
            continue

        cur.execute(
            "SELECT id FROM schedule_days WHERE month = ? AND day_number = ?",
            (month, day_num)
        )
        row = cur.fetchone()
        if not row:
            print(f"  Day {day_num}：在 {month} 中未找到排期记录，跳过")
            errors += 1
            continue

        schedule_day_id = row[0]

        cur.execute("""
            INSERT INTO scripts
              (schedule_day_id, weixin_script, weixin_title, weixin_cover,
               xhs_script, xhs_title, xhs_tags, shoot_tips, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(schedule_day_id) DO UPDATE SET
              weixin_script = excluded.weixin_script,
              weixin_title  = excluded.weixin_title,
              weixin_cover  = excluded.weixin_cover,
              xhs_script    = excluded.xhs_script,
              xhs_title     = excluded.xhs_title,
              xhs_tags      = excluded.xhs_tags,
              shoot_tips    = excluded.shoot_tips,
              updated_at    = CURRENT_TIMESTAMP
        """, (
            schedule_day_id,
            item.get("weixin_script", ""),
            item.get("weixin_title", ""),
            item.get("weixin_cover", ""),
            item.get("xhs_script", ""),
            item.get("xhs_title", ""),
            item.get("xhs_tags", ""),
            item.get("shoot_tips", ""),
        ))

        # 状态升级为 scripted
        cur.execute("""
            UPDATE schedule_days SET status = 'scripted'
            WHERE id = ? AND status = 'planned'
        """, (schedule_day_id,))

        print(f"  ✓ {month} Day {day_num} 已保存")
        saved += 1

    conn.commit()
    conn.close()
    print(f"\n完成：{saved} 天已写入数据库，{errors} 个跳过")


def list_weeks(month: str):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        SELECT sd.day_number, t.title, t.pillar, s.id as has_script
        FROM schedule_days sd
        JOIN topics t ON sd.topic_id = t.id
        LEFT JOIN scripts s ON s.schedule_day_id = sd.id
        WHERE sd.month = ?
        ORDER BY sd.day_number
    """, (month,))
    days = cur.fetchall()
    conn.close()

    if not days:
        print(f"{month} 没有已分配选题")
        return

    year, m = map(int, month.split("-"))
    first_weekday = date(year, m, 1).weekday()

    weeks_map: dict[int, list] = {}
    for row in days:
        day_num = row[0]
        wk = (first_weekday + day_num - 1) // 7 + 1
        weeks_map.setdefault(wk, []).append(row)

    print(f"\n{month} 共 {len(weeks_map)} 周有内容：\n")
    for wk, items in sorted(weeks_map.items()):
        scripted = sum(1 for i in items if i[3])
        total = len(items)
        status = f"✓ {scripted}/{total} 已生成" if scripted else f"○ 未生成"
        day_nums = ", ".join(str(i[0]) for i in items)
        print(f"  第{wk}周  Day {day_nums}  [{status}]")
        for day_num, title, pillar, _ in items:
            print(f"    Day {day_num}  [{pillar}] {title}")
    print()
    print("生成命令：python scripts/gen_week.py --month", month, "--week <周数>")
    print()


def main():
    parser = argparse.ArgumentParser(description="汇泽内容工厂 - 周文案生成工具")
    parser.add_argument("--month", help="月份，如 2026-06（默认本月）")
    parser.add_argument("--week", type=int, help="第几周（从1开始）")
    parser.add_argument("--list", action="store_true", help="列出各周选题概况")
    parser.add_argument("--save", metavar="JSON_FILE", help="将 JSON 文件写入数据库")
    args = parser.parse_args()

    # 默认本月
    if not args.month:
        today = date.today()
        args.month = f"{today.year}-{today.month:02d}"

    if args.save:
        print(f"正在写入 {args.save} → 数据库（{args.month}）...\n")
        save_to_db(args.save, args.month)
        return

    if args.list or not args.week:
        list_weeks(args.month)
        return

    days = get_week_days(args.month, args.week)
    if not days:
        print(f"{args.month} 第{args.week}周没有已分配选题")
        sys.exit(1)

    print(f"\n{args.month} 第{args.week}周，共 {len(days)} 条选题：")
    for row in days:
        print(f"  Day {row[0]}  [{row[3]}] {row[2]}")

    print("\n" + "─" * 60)
    print(build_prompt(days, args.month, args.week))
    print("─" * 60)
    print(f"\n将生成的 JSON 保存为 result.json，然后运行：")
    print(f"  python scripts/gen_week.py --save result.json --month {args.month}")


if __name__ == "__main__":
    main()
