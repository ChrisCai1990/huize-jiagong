#!/usr/bin/env python3
"""
汇泽加工 一键部署脚本 v3（源码上传 + 服务器构建）

流程：
  [可选] git commit + push GitHub
  → SFTP 上传源码到服务器（仅源码，几 MB）
  → SSH: npm ci --registry=npmmirror（服务器原生安装，解决 Windows/Linux binary 问题）
  → SSH: npm run build
  → SSH: 整理静态资源 + pm2 restart

用法：
  python scripts/huize_deploy.py                     # 只部署（不 push GitHub）
  python scripts/huize_deploy.py --push              # git commit + push + 部署
  python scripts/huize_deploy.py --push -m "描述"   # 指定 commit message
"""

import sys, os, subprocess, argparse, time
from datetime import datetime
from pathlib import Path

# ─── 配置 ────────────────────────────────────────────────────────────────────
LOCAL_DIR  = Path(__file__).parent.parent.resolve()
DEPLOY_DIR = '/var/www/huize-jiagong'
NPM_MIRROR = 'https://registry.npmmirror.com'

# 上传到服务器的源码文件/目录（排除 node_modules、.next、content.db 等）
UPLOAD_ITEMS = [
    'src',
    'public',
    'package.json',
    'package-lock.json',
    'next.config.ts',
    'tsconfig.json',
    'postcss.config.mjs',
    'eslint.config.mjs',
    'ecosystem.config.js',
]

def load_config():
    cfg = {}
    for p in [LOCAL_DIR / '.deploy_config', Path.home() / '.huize_deploy_config']:
        if p.exists():
            for line in p.read_text().splitlines():
                if '=' in line and not line.startswith('#'):
                    k, v = line.split('=', 1)
                    cfg[k.strip()] = v.strip()
    return cfg

CFG = load_config()
SSH_HOST  = CFG.get('SSH_HOST', '101.132.139.196')
SSH_USER  = CFG.get('SSH_USER', 'root')
SSH_PASS  = CFG.get('SSH_PASSWORD', '')
GIT_TOKEN = CFG.get('GIT_TOKEN', '')
GIT_USER  = CFG.get('GIT_USER', 'chriscai1990')
GIT_REPO  = CFG.get('GIT_REPO', 'chriscai1990/huize-jiagong')

# ─── 工具函数 ─────────────────────────────────────────────────────────────────
def step(msg):
    print(f'\n\033[1;36m▶ {msg}\033[0m')

def ok(msg):
    print(f'  \033[32m✓ {msg}\033[0m')

def warn(msg):
    print(f'  \033[33m⚠ {msg}\033[0m')

def die(msg):
    print(f'\n\033[31m✗ {msg}\033[0m')
    sys.exit(1)

def get_paramiko():
    try:
        import paramiko
        return paramiko
    except ImportError:
        subprocess.run([sys.executable, '-m', 'pip', 'install', 'paramiko', '-q'], check=True)
        import paramiko
        return paramiko

# ─── Step 1: git push ─────────────────────────────────────────────────────────
def git_push(message=None):
    step('Git: 提交并推送到 GitHub')

    def git(args, check=True):
        return subprocess.run(
            ['git'] + args, cwd=LOCAL_DIR,
            capture_output=True, text=True, check=check
        )

    # 检查是否有改动
    status = git(['status', '--porcelain'])
    if status.stdout.strip():
        print('  暂存所有改动...')
        git(['add', '.'])
        msg = message or f'deploy {datetime.now().strftime("%Y-%m-%d %H:%M")}'
        r = git(['commit', '-m', msg], check=False)
        if r.returncode not in (0, 1):
            die(f'git commit 失败：{r.stderr}')
        ok(f'已提交：{msg}')
    else:
        print('  没有新改动，跳过 commit')

    # push：用 token 构造认证 URL（token 不存入 remote，只用于本次 push）
    branch = git(['branch', '--show-current']).stdout.strip() or 'main'
    if GIT_TOKEN:
        push_url = f'https://{GIT_USER}:{GIT_TOKEN}@github.com/{GIT_REPO}.git'
        r = subprocess.run(
            ['git', 'push', push_url, branch],
            cwd=LOCAL_DIR, capture_output=True, text=True
        )
    else:
        r = subprocess.run(
            ['git', 'push', 'origin', branch],
            cwd=LOCAL_DIR, capture_output=True, text=True
        )

    if r.returncode != 0:
        die(f'git push 失败：{r.stderr}')
    ok('GitHub push 成功')

# ─── Step 2: SFTP 上传源码 ───────────────────────────────────────────────────
def upload_source(ssh):
    step('上传源码到服务器（仅源码，不含 node_modules）')
    sftp = ssh.open_sftp()

    def ensure_dir(remote_path):
        try:
            sftp.stat(remote_path)
        except FileNotFoundError:
            ensure_dir(str(Path(remote_path).parent).replace('\\', '/'))
            sftp.mkdir(remote_path)

    def upload_dir(local: Path, remote: str):
        ensure_dir(remote)
        for item in local.iterdir():
            r_item = f'{remote}/{item.name}'
            if item.is_file():
                sftp.put(str(item), r_item)
            elif item.is_dir() and item.name not in ('node_modules', '.next', '__pycache__'):
                upload_dir(item, r_item)

    for name in UPLOAD_ITEMS:
        local_path = LOCAL_DIR / name
        if not local_path.exists():
            warn(f'跳过不存在的文件：{name}')
            continue
        remote_path = f'{DEPLOY_DIR}/{name}'
        print(f'  上传 {name}...')
        if local_path.is_dir():
            upload_dir(local_path, remote_path)
        else:
            sftp.put(str(local_path), remote_path)

    sftp.close()
    ok('源码上传完成')

# ─── Step 3: 服务器构建 ──────────────────────────────────────────────────────
def server_build(ssh):
    step('服务器构建（npm ci + npm run build）')

    def run(cmd, timeout=600, label=None):
        label = label or cmd[:60]
        print(f'  {label}')
        _, stdout, _ = ssh.exec_command(
            f'cd {DEPLOY_DIR} && {cmd}',
            timeout=timeout, get_pty=True
        )
        output = []
        for line in iter(stdout.readline, ''):
            l = line.rstrip()
            if l:
                print(f'    {l}')
                output.append(l)
        code = stdout.channel.recv_exit_status()
        return code, '\n'.join(output)

    # 检查 package.json 是否有变化（通过 md5 比对）
    _, local_md5_out = run(
        'md5sum package.json package-lock.json 2>/dev/null | md5sum', timeout=5, label=''
    )
    _, remote_md5_out = run(
        'cat .deploy_pkg_hash 2>/dev/null || echo ""', timeout=5, label=''
    )
    pkg_changed = local_md5_out.strip() != remote_md5_out.strip()

    if pkg_changed:
        print('  package.json 有变化，重新安装依赖...')
        code, _ = run(
            f'PUPPETEER_SKIP_DOWNLOAD=1 npm ci --registry={NPM_MIRROR} 2>&1',
            timeout=300, label='npm ci（使用 npmmirror，跳过 Chrome 下载）'
        )
        if code != 0:
            die('npm ci 失败')
        # 记录当前 hash
        run(f'md5sum package.json package-lock.json | md5sum > .deploy_pkg_hash', timeout=5, label='')
        ok('依赖安装完成')
    else:
        ok('依赖无变化，跳过 npm ci')

    # 构建
    code, out = run('npm run build 2>&1', timeout=600, label='npm run build')
    if code != 0:
        die('构建失败')
    ok('构建成功')

    # 整理静态资源
    run('cp -r .next/static .next/standalone/.next/static 2>&1', timeout=30, label='复制 static')
    run('cp -r public .next/standalone/public 2>&1', timeout=30, label='复制 public')
    ok('静态资源整理完成')

# ─── Step 4: 重启服务 ────────────────────────────────────────────────────────
def restart_server(ssh):
    step('重启 PM2 服务')

    def run(cmd, timeout=30):
        _, stdout, _ = ssh.exec_command(cmd, timeout=timeout, get_pty=True)
        out = stdout.read().decode('utf-8', errors='replace')
        code = stdout.channel.recv_exit_status()
        return code, out

    run(f'pm2 restart huize-jiagong || pm2 start {DEPLOY_DIR}/ecosystem.config.js', 30)
    run('pm2 save', 10)
    time.sleep(2)

    code, out = run('pm2 jlist', 10)
    if 'online' in out:
        ok('PM2 运行正常')
    else:
        warn('PM2 状态异常，请手动检查：pm2 logs huize-jiagong')

# ─── 主流程 ──────────────────────────────────────────────────────────────────
def main():
    os.environ['PYTHONUTF8'] = '1'
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')

    parser = argparse.ArgumentParser(description='汇泽加工一键部署')
    parser.add_argument('--push', action='store_true', help='部署前 git commit + push GitHub')
    parser.add_argument('-m', '--message', default=None, help='commit message')
    args = parser.parse_args()

    print('\n\033[1;35m═══════ 汇泽加工 一键部署 ═══════\033[0m')

    # Step 1: git push（可选）
    if args.push:
        git_push(args.message)

    # 连接服务器
    step(f'连接服务器 {SSH_HOST}')
    paramiko = get_paramiko()
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh.connect(SSH_HOST, username=SSH_USER, password=SSH_PASS, timeout=15)
        ok('已连接')
    except Exception as e:
        die(f'SSH 连接失败：{e}')

    try:
        upload_source(ssh)   # Step 2
        server_build(ssh)    # Step 3
        restart_server(ssh)  # Step 4
    finally:
        ssh.close()

    print(f'\n\033[1;32m═══════ 部署完成！═══════\033[0m')
    print(f'  地址：http://{SSH_HOST}')
    print(f'  后台：http://{SSH_HOST}/admin')

if __name__ == '__main__':
    main()
