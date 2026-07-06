/**
 * 有赞页面模块导出脚本
 * 用法：node scripts/export-youzan.js [url]
 * 默认 url：http://localhost:3001/youzan
 *
 * 输出：exports/youzan/01-hero.png ... （750px 宽，有赞标准宽度）
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const URL = process.argv[2] || "http://localhost:3001/youzan";
const OUT_DIR = path.join(__dirname, "../exports/youzan");
const VIEWPORT_WIDTH = 750; // 有赞标准宽度

const SECTIONS = [
  { id: "section-hero",       name: "01-banner"    },
  { id: "section-categories", name: "02-categories" },
  { id: "section-steps",      name: "03-steps"      },
  { id: "section-articles",   name: "04-articles"   },
  { id: "section-cases",      name: "05-cases"      },
  { id: "section-about",      name: "06-about"      },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`打开页面：${URL}`);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // 模拟 750px 手机屏幕，deviceScaleFactor=2 输出 2x 高清图
  // deviceScaleFactor=2 → 实际输出 1500px 宽（2x 高清），有赞可正常上传
  await page.setViewport({ width: VIEWPORT_WIDTH, height: 1334, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });

  // 等待字体和图标渲染完成
  await new Promise(r => setTimeout(r, 1000));

  // 隐藏 Next.js Dev Tools 悬浮按钮（不影响内容）
  await page.addStyleTag({
    content: `
      nextjs-portal { display: none !important; }
      [data-nextjs-dialog-overlay] { display: none !important; }
    `,
  });

  for (const { id, name } of SECTIONS) {
    const el = await page.$(`#${id}`);
    if (!el) {
      console.warn(`  ⚠ 找不到 #${id}，跳过`);
      continue;
    }

    const outPath = path.join(OUT_DIR, `${name}.png`);
    await el.screenshot({ path: outPath });

    const box = await el.boundingBox();
    console.log(`  ✓ ${name}.png  (${Math.round(box.width)}×${Math.round(box.height)} px)`);
  }

  await browser.close();
  console.log(`\n完成！图片保存在：${OUT_DIR}`);
}

main().catch(err => {
  console.error("导出失败：", err.message);
  process.exit(1);
});
