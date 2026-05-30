@AGENTS.md

# 惠择加工 (huize-jiagong)

## 技术栈
- Next.js 16（App Router，standalone 输出模式）
- TypeScript + Tailwind CSS

## 部署命令

### 标准部署
```bash
python scripts/huize_deploy.py --push
python scripts/huize_deploy.py --push -m "feat: 描述改动"
```

### 只部署（代码已手动 push 过）
```bash
python scripts/huize_deploy.py
```

> `--push` 会自动执行 git add . → git commit → git push，再 SSH 部署。未指定 `-m` 时 commit message 默认为 `update 时间戳`。

`scripts/huize_deploy.py` 通过 SSH 直连服务器：git pull → npm ci → npm run build → 复制静态资源到 standalone → PM2 重启。

## 线上地址
- http://101.132.139.196

## 服务器信息
- 阿里云 ECS，IP：101.132.139.196
- SSH：root@101.132.139.196，密码：Hzjiagong2@26
- 项目路径：/var/www/huize-jiagong
- PM2 进程名：huize-jiagong（端口 3002，Nginx 代理 80→3002）
- 注意：端口 3001 已空闲，但 huize-jiagong 固定用 3002，不要改
- 查看日志：pm2 logs huize-jiagong

## GitHub
- 仓库：https://github.com/ChrisCai1990/huize-jiagong
- 分支：main
