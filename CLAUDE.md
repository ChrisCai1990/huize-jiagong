@AGENTS.md

# 惠择加工 (huize-jiagong)

## 技术栈
- Next.js 16（App Router，standalone 输出模式）
- TypeScript + Tailwind CSS

## 部署命令

### 标准部署（commit + push + 构建 + 上传）
```bash
python scripts/huize_deploy.py --push
python scripts/huize_deploy.py --push -m "feat: 描述改动"
```

### 只构建部署（代码已手动 push 过）
```bash
python scripts/huize_deploy.py
```

> **部署流程（本地构建版）：**
> 1. `--push`：git add → commit → push GitHub
> 2. 本地 `npm run build`（失败直接终止）
> 3. SFTP 上传 `.next/standalone` + `static` + `public` 到服务器
> 4. SSH: PM2 重启
>
> 服务器不需要访问 GitHub，也不在服务器构建，速度更快。

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
