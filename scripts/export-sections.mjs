import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { join } from 'path';

const URL = 'http://localhost:3001/youzan';
const OUT = 'exports/youzan';
const SCALE = 2;   // 2x → 实际输出 750×2 = 1500px，视觉宽度 750px
const WIDTH = 750; // 容器宽度 750px

const sections = [
  { id: 'section-hero',       name: '01-hero'       },
  { id: 'section-categories', name: '02-categories'  },
  { id: 'section-steps',      name: '03-steps'       },
  { id: 'section-articles',   name: '04-articles'    },
  { id: 'section-cases',      name: '05-cases'       },
  { id: 'section-about',      name: '06-about'       },
];

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  protocolTimeout: 180000,
  args: ['--disable-lcd-text', '--font-render-hinting=none'],
});
const page = await browser.newPage();

await page.setViewport({ width: WIDTH, height: 900, deviceScaleFactor: SCALE });
await page.goto(URL, { waitUntil: 'networkidle0' });
await page.evaluateHandle(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));

// 隐藏 header 和 Next.js 开发工具浮层
await page.evaluate(() => {
  const header = document.querySelector('header');
  if (header) header.style.display = 'none';
  // 移除 Next.js dev 浮层（shadow DOM 宿主）
  document.querySelectorAll('nextjs-portal').forEach(el => el.remove());
  // 隐藏 fixed 定位的非路由覆盖元素
  document.querySelectorAll('body > div:not(#__next)').forEach(el => {
    const s = window.getComputedStyle(el);
    if (s.position === 'fixed' || s.position === 'absolute') el.style.display = 'none';
  });
});

// 把容器撑到 WIDTH，去掉 max-width 限制
await page.evaluate((w) => {
  const el = document.querySelector('.max-w-\\[390px\\]');
  if (el) { el.style.maxWidth = w + 'px'; el.style.width = w + 'px'; }
}, WIDTH);

// 获取容器左边界
const containerX = await page.evaluate(() => {
  const el = document.querySelector('[style*="max-width"]') || document.querySelector('main')?.parentElement;
  return el ? el.getBoundingClientRect().left : 0;
});

for (const { id, name } of sections) {
  await page.evaluate((id) => document.getElementById(id)?.scrollIntoView(), id);
  await new Promise(r => setTimeout(r, 200));

  // 用 getComputedStyle 拿到含 margin 的完整位置
  const clip = await page.evaluate((id, containerX, containerW) => {
    const el = document.getElementById(id);
    if (!el) return null;
    const style = window.getComputedStyle(el);
    const mt = parseFloat(style.marginTop) || 0;
    const mb = parseFloat(style.marginBottom) || 0;
    const r = el.getBoundingClientRect();
    const absY = r.top + window.scrollY;
    return {
      x: containerX,
      y: absY - mt,
      width: containerW,
      height: r.height + mt + mb + 4, // +4 保留阴影
    };
  }, id, containerX, WIDTH);

  if (!clip) { console.warn(`未找到 #${id}`); continue; }

  const outPath = join(OUT, `${name}.png`);
  await page.screenshot({ path: outPath, type: 'png', clip, captureBeyondViewport: true });

  console.log(`✓ ${name}.png  (${Math.round(clip.width)}×${Math.round(clip.height)} → ${Math.round(clip.width * SCALE)}×${Math.round(clip.height * SCALE)} px)`);
}

// 整页：扩展 viewport 高度后截
const totalHeight = await page.evaluate(() => document.body.scrollHeight);
await page.setViewport({ width: WIDTH, height: totalHeight, deviceScaleFactor: SCALE });
await new Promise(r => setTimeout(r, 300));
const container = await page.$('.max-w-\\[390px\\]');
if (container) {
  await container.screenshot({ path: join(OUT, '00-full-page.png'), type: 'png' });
  const box = await container.boundingBox();
  console.log(`✓ 00-full-page.png  (${Math.round(box.width)}×${Math.round(box.height)} → ${Math.round(box.width * SCALE)}×${Math.round(box.height * SCALE)} px)`);
}

await browser.close();
console.log(`\n全部导出至 ${OUT}/`);
