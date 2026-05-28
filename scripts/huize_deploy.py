#!/usr/bin/env python3
"""
惠择加工 一键部署脚本
用法：
  python scripts/huize_deploy.py                     # 只部署（不 push）
  python scripts/huize_deploy.py --push              # git add + commit + push + 部署
  python scripts/huize_deploy.py --push -m "描述"   # 指定 commit message
"""

import sys, time, subprocess, argparse, os
from datetime import datetime

HOST      = '39.106.218.225'
USER      = 'root'
PASSWORD  = '@Cbq19900208'
REPO_DIR  = '/var/www/huize-jiagong'
LOCAL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def _load_config():
    config_path = os.path.join(LOCAL_DIR, '.deploy_config')
    cfg = {}
    if os.path.exists(config_path):
        for line in open(config_path).read().splitlines():
            if '=' in line and not line.startswith('#'):
                k, v = line.split('=', 1)
                cfg[k.strip()] = v.strip()
    return cfg

_CFG = _load_config()
GIT_TOKEN = _CFG.get('GIT_TOKEN', '')

def check_paramiko():
    try:
        import paramiko; return paramiko
    except ImportError:
        subprocess.run([sys.executable, '-m', 'pip', 'install', 'paramiko', '-q'], check=True)
        import paramiko; return paramiko

def git_commit_and_push(message=None):
    def run_git(args, check=True):
        return subprocess.run(['git'] + args, cwd=LOCAL_DIR,
                              capture_output=True, text=True, check=check)

    status = run_git(['status', '--porcelain'])
    has_changes = bool(status.stdout.strip())

    if has_changes:
        print('提交代码改动...')
        run_git(['add', '.'])
        msg = message or f'update {datetime.now().strftime("%Y-%m-%d %H:%M")}'
        result = run_git(['commit', '-m', msg], check=False)
        if result.returncode not in (0, 1):
            print(f'git commit 失败：\n{result.stderr}'); sys.exit(1)
        print(f'已提交：{msg}')
    else:
        print('没有新改动，跳过 commit')

    print('推送代码到 GitHub...')
    r = subprocess.run(['git', 'push', 'origin', 'main'],
                       cwd=LOCAL_DIR, capture_output=True, text=True)
    if r.returncode != 0:
        print(f'git push 失败：\n{r.stderr}'); sys.exit(1)
    print('push 成功')

def run_deploy():
    paramiko = check_paramiko()
    print(f'\n连接服务器 {HOST}...')
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
    except Exception as e:
        print(f'SSH 连接失败：{e}'); sys.exit(1)
    print('已连接\n')

    def run(cmd, timeout=300, label=None):
        print(f'  {label or cmd[:80]}')
        _, stdout, stderr = ssh.exec_command(cmd, timeout=timeout, get_pty=True)
        out = ''
        for line in iter(stdout.readline, ''):
            l = line.rstrip()
            if l: print(f'    {l}'); out += l + '\n'
        code = stdout.channel.recv_exit_status()
        return code, out

    # 拉取最新代码（更新 remote URL 含 token，确保能 fetch）
    run(f'git -C {REPO_DIR} remote set-url origin https://{GIT_TOKEN}@github.com/ChrisCai1990/huize-jiagong.git', 10)
    code, _ = run(f'git -C {REPO_DIR} fetch origin main && git -C {REPO_DIR} reset --hard origin/main', 60, '拉取最新代码')
    if code != 0:
        print('代码拉取失败'); ssh.close(); sys.exit(1)

    _, log = run(f'git -C {REPO_DIR} log --oneline -1', 10)
    print(f'    当前 commit: {log.strip()}')

    # 安装依赖（跳过 puppeteer 下载 Chrome，服务器不需要）
    run(f'cd {REPO_DIR} && PUPPETEER_SKIP_DOWNLOAD=1 npm ci', 180, '安装依赖（npm ci）')

    # 构建
    code, _ = run(f'cd {REPO_DIR} && npm run build 2>&1', 600, '构建 Next.js')
    if code != 0:
        print('构建失败'); ssh.close(); sys.exit(1)

    # 复制静态资源到 standalone
    run(f'cp -r {REPO_DIR}/public {REPO_DIR}/.next/standalone/public', 15, '复制 public')
    run(f'cp -r {REPO_DIR}/.next/static {REPO_DIR}/.next/standalone/.next/static', 15, '复制 static')

    # 重启 PM2（用 ecosystem.config.js，PORT=3002 via env var）
    run('pm2 delete huize-jiagong 2>/dev/null || true', 10)
    time.sleep(1)
    run(f'pm2 start {REPO_DIR}/ecosystem.config.js', 30, '启动 PM2')
    run('pm2 save', 10)
    time.sleep(3)

    # 验证
    code, out = run('pm2 jlist', 10)
    if 'online' in out:
        print('\n后端运行正常')
    else:
        print('\n警告：PM2 状态异常，请检查')

    ssh.close()
    print('\n部署完成！')
    print(f'  线上地址：http://{HOST}（Nginx → 3002）')

def main():
    os.environ.setdefault('PYTHONUTF8', '1')
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    parser = argparse.ArgumentParser()
    parser.add_argument('--push', action='store_true', help='git add + commit + push 后再部署')
    parser.add_argument('-m', '--message', default=None, help='commit message（默认：update 时间戳）')
    args = parser.parse_args()
    if args.push:
        git_commit_and_push(args.message)
    run_deploy()

if __name__ == '__main__':
    main()
