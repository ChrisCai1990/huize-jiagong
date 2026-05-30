#!/usr/bin/env python3
"""
惠择加工 一键部署脚本（本地构建版）
流程：本地 npm run build → git push GitHub → SFTP 上传产物 → PM2 重启

用法：
  python scripts/huize_deploy.py                     # 本地构建 + 部署
  python scripts/huize_deploy.py --push              # git add + commit + push + 构建 + 部署
  python scripts/huize_deploy.py --push -m "描述"   # 指定 commit message
"""

import sys, time, subprocess, argparse, os, stat
from datetime import datetime

LOCAL_DIR  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEPLOY_DIR = '/var/www/huize-jiagong'

def _load_config():
    cfg = {}
    for name in ['.deploy_config', os.path.expanduser('~/.huize_deploy_config')]:
        path = os.path.join(LOCAL_DIR, name) if not os.path.isabs(name) else name
        if os.path.exists(path):
            for line in open(path).read().splitlines():
                if '=' in line and not line.startswith('#'):
                    k, v = line.split('=', 1)
                    cfg[k.strip()] = v.strip()
    return cfg

_CFG     = _load_config()
HOST     = _CFG.get('SSH_HOST', '101.132.139.196')
USER     = _CFG.get('SSH_USER', 'root')
PASSWORD = _CFG.get('SSH_PASSWORD', '')

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
    if status.stdout.strip():
        print('提交代码改动...')
        run_git(['add', '.'])
        msg = message or f'deploy {datetime.now().strftime("%Y-%m-%d %H:%M")}'
        result = run_git(['commit', '-m', msg], check=False)
        if result.returncode not in (0, 1):
            print(f'git commit 失败：\n{result.stderr}'); sys.exit(1)
        print(f'已提交：{msg}')
    else:
        print('没有新改动，跳过 commit')

    print('推送代码到 GitHub...')
    r = run_git(['push', 'origin', 'master'], check=False)
    if r.returncode != 0:
        # 尝试 main 分支
        r = run_git(['push', 'origin', 'main'], check=False)
    if r.returncode != 0:
        print(f'git push 失败：\n{r.stderr}'); sys.exit(1)
    print('GitHub push 成功 ✓')

def local_build():
    print('\n本地构建 Next.js...')
    result = subprocess.run(
        'npm run build',
        cwd=LOCAL_DIR,
        shell=True,
        text=True
    )
    if result.returncode != 0:
        print('构建失败，终止部署'); sys.exit(1)
    print('构建成功 ✓')

def upload_artifacts(sftp):
    """上传 .next/standalone + public + .next/static 到服务器"""
    print('\n上传构建产物到服务器...')

    def upload_dir(local_path, remote_path):
        try:
            sftp.stat(remote_path)
        except FileNotFoundError:
            sftp.mkdir(remote_path)

        for item in os.listdir(local_path):
            local_item = os.path.join(local_path, item)
            remote_item = remote_path + '/' + item
            if os.path.isfile(local_item):
                sftp.put(local_item, remote_item)
            elif os.path.isdir(local_item):
                upload_dir(local_item, remote_item)

    standalone_local  = os.path.join(LOCAL_DIR, '.next', 'standalone')
    standalone_remote = DEPLOY_DIR + '/.next/standalone'

    print('  清空旧 standalone...')
    # 先在服务器删掉旧的（避免残留文件）
    # 这里先上传，服务器端清理在 SSH 步骤做

    print('  上传 standalone/...')
    upload_dir(standalone_local, standalone_remote)

    static_local = os.path.join(LOCAL_DIR, '.next', 'static')

    print('  上传 .next/static → standalone/.next/static...')
    upload_dir(static_local, standalone_remote + '/.next/static')

    print('  上传 .next/static → .next/static (Nginx 直接读取)...')
    upload_dir(static_local, DEPLOY_DIR + '/.next/static')

    print('  上传 public → standalone/public...')
    public_local  = os.path.join(LOCAL_DIR, 'public')
    upload_dir(public_local, standalone_remote + '/public')

    print('上传完成 ✓')

def restart_pm2(ssh):
    print('\n重编译 better-sqlite3（Windows→Linux 跨平台）...')
    def run(cmd, timeout=60):
        _, stdout, stderr = ssh.exec_command(cmd, timeout=timeout, get_pty=True)
        out = stdout.read().decode('utf-8', errors='replace')
        code = stdout.channel.recv_exit_status()
        return code, out

    # 两个位置都要重编：standalone/node_modules 和 standalone/.next/node_modules
    for rebuild_dir in [
        f'{DEPLOY_DIR}/.next/standalone',
        f'{DEPLOY_DIR}/.next/standalone/.next/node_modules/better-sqlite3-*',
    ]:
        code, out = run(f'for d in {rebuild_dir}; do cd "$d" && npm rebuild better-sqlite3 2>&1; done', 120)

    # 验证是否是 Linux ELF
    _, check_out = run(
        f'file {DEPLOY_DIR}/.next/standalone/.next/node_modules/better-sqlite3-*/build/Release/better_sqlite3.node 2>&1'
    )
    if 'ELF' in check_out:
        print('better-sqlite3 编译成功（Linux ELF） ✓')
    else:
        print('警告：better-sqlite3 可能未正确编译，检查：', check_out[:200])

    print('重启 PM2...')
    run(f'pm2 restart huize-jiagong || pm2 start {DEPLOY_DIR}/ecosystem.config.js', 30)
    run('pm2 save', 10)
    time.sleep(2)

    code, out = run('pm2 jlist', 10)
    if 'online' in out:
        print('PM2 运行正常 ✓')
    else:
        print('警告：PM2 状态异常，请手动检查')
        print(out[:500])

def main():
    os.environ.setdefault('PYTHONUTF8', '1')
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')

    parser = argparse.ArgumentParser()
    parser.add_argument('--push', action='store_true', help='git add + commit + push 到 GitHub')
    parser.add_argument('-m', '--message', default=None, help='commit message')
    args = parser.parse_args()

    paramiko = check_paramiko()

    # 1. 可选：push GitHub
    if args.push:
        git_commit_and_push(args.message)

    # 2. 本地构建
    local_build()

    # 3. 连接服务器
    print(f'\n连接服务器 {HOST}...')
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
    except Exception as e:
        print(f'SSH 连接失败：{e}'); sys.exit(1)
    print('已连接 ✓')

    # 4. 清理服务器旧 standalone
    _, stdout, _ = ssh.exec_command(f'rm -rf {DEPLOY_DIR}/.next/standalone && mkdir -p {DEPLOY_DIR}/.next/standalone')
    stdout.channel.recv_exit_status()

    # 5. 上传产物
    sftp = ssh.open_sftp()
    upload_artifacts(sftp)
    sftp.close()

    # 6. 重启 PM2
    restart_pm2(ssh)
    ssh.close()

    print(f'\n部署完成！')
    print(f'  线上地址：http://{HOST}')

if __name__ == '__main__':
    main()
