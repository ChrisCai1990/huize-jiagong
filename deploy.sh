#!/bin/bash
set -e
cd /var/www/huize-jiagong

# 安装 PM2（如未安装）
if ! command -v pm2 &> /dev/null; then
  npm install -g pm2
fi

# 写 PM2 配置（standalone 模式：直接运行 server.js，无需 npm install）
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: "huize-jiagong",
    script: "standalone/server.js",
    cwd: "/var/www/huize-jiagong/.next",
    max_restarts: 5,
    min_uptime: "10s",
    env: { NODE_ENV: "production", PORT: "3001", HOSTNAME: "0.0.0.0" }
  }]
};
EOF

# 删除旧进程（重置重启计数），强制释放端口，再全新启动
pm2 delete huize-jiagong 2>/dev/null || true
sleep 1
fuser -k 3001/tcp 2>/dev/null || true
sleep 1
pm2 start ecosystem.config.js
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
