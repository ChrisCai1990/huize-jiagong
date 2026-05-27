#!/bin/bash
set -e
cd /var/www/huize-jiagong

# 安装 PM2（如未安装）
if ! command -v pm2 &> /dev/null; then
  npm install -g pm2
fi

# 安装生产依赖
npm install --omit=dev

# 写 PM2 配置
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: "huize-jiagong",
    script: "node_modules/.bin/next",
    args: "start -p 3001",
    cwd: "/var/www/huize-jiagong",
    env: { NODE_ENV: "production", PORT: "3001" }
  }]
};
EOF

# 先停掉 PM2 进程，再强制释放端口，最后重新启动
# 防止 reload 时新旧进程同时争抢端口导致 EADDRINUSE
pm2 stop huize-jiagong 2>/dev/null || true
sleep 1
fuser -k 3001/tcp 2>/dev/null || true
sleep 1
pm2 start ecosystem.config.js --update-env
pm2 save

# 写 Nginx 配置（首次）
if [ ! -f /etc/nginx/conf.d/huize-jiagong.conf ]; then
  cat > /etc/nginx/conf.d/huize-jiagong.conf << 'NGINX'
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX
  nginx -t && nginx -s reload
fi

echo "Deploy done"
pm2 list
