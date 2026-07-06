/**
 * 桥本疗愈指南 - 导出 PDF
 * 用法：node scripts/export-guide-pdf.js
 * 前提：public/ 目录已在 http://localhost:8888 运行（python -m http.server 8888）
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const URL = 'http://localhost:8888/guide.html';
const OUTPUT = path.join(__dirname, '..', 'exports', 'guide.pdf');

async function run() {
  console.log('启动浏览器...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 设置视口（桌面宽度，确保触发桌面布局）
  await page.setViewport({ width: 1280, height: 800 });

  console.log('加载页面...');
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });

  // 等待字体渲染
  await new Promise(r => setTimeout(r, 1500));

  // 获取幻灯片总数
  const slideCount = await page.evaluate(() =>
    document.querySelectorAll('.slide').length
  );
  console.log(`共 ${slideCount} 张幻灯片`);

  // 确保 exports 目录存在
  const dir = path.dirname(OUTPUT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log('生成 PDF...');
  await page.pdf({
    path: OUTPUT,
    // A4 横向，标准尺寸，所有 PDF 阅读器均支持
    width: '297mm',
    height: '210mm',
    landscape: false,    // width/height 已指定横向比例
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    // 使用 @media print CSS，自动展示全部幻灯片
    preferCSSPageSize: true,
  });

  await browser.close();

  const size = (fs.statSync(OUTPUT).size / 1024 / 1024).toFixed(1);
  console.log(`\n✓ 已生成：${OUTPUT}`);
  console.log(`  文件大小：${size} MB`);
}

run().catch(err => {
  console.error('导出失败:', err.message);
  process.exit(1);
});
