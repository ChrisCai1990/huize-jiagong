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
- http://39.106.218.225

## 服务器信息
- 阿里云 ECS，IP：39.106.218.225
- SSH：root@39.106.218.225，密码：@Cbq19900208
- 项目路径：/var/www/huize-jiagong
- PM2 进程名：huize-jiagong（端口 3002，Nginx 代理 80→3002）
- 注意：端口 3001 被 /opt/poster-server/index.js 占用，不要用 3001
- 查看日志：pm2 logs huize-jiagong

## GitHub
- 仓库：https://github.com/ChrisCai1990/huize-jiagong
- 分支：main
