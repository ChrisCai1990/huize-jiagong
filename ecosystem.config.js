module.exports = {
  apps: [{
    name: "huize-jiagong",
    script: "standalone/server.js",
    cwd: "/var/www/huize-jiagong/.next",
    max_restarts: 5,
    min_uptime: "10s",
    env: {
      NODE_ENV: "production",
      PORT: "3002",
      HOSTNAME: "0.0.0.0",
      DATABASE_PATH: "/var/www/huize-jiagong/content.db",
      ADMIN_PASSWORD: "huize2026admin",
    }
  }]
};
