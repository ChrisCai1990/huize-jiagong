const chapters = [
  { icon: "🧠", name: "认知篇", desc: "什么是桥本 · 发展机制" },
  { icon: "🥗", name: "饮食篇", desc: "精准忌口 · 抗炎饮食" },
  { icon: "🏃", name: "运动篇", desc: "运动方式与强度建议" },
  { icon: "😴", name: "睡眠篇", desc: "皮质醇节律 · 睡眠免疫" },
  { icon: "🧘", name: "情绪篇", desc: "压力与自免 · 调节方案" },
  { icon: "💊", name: "营养篇", desc: "硒 · 维D · 铁 · 锌补充" },
  { icon: "🦠", name: "肠道篇", desc: "肠漏修复 · 菌群重建" },
  { icon: "📋", name: "检查篇", desc: "读懂甲功五项与抗体" },
  { icon: "🗓️", name: "方案篇", desc: "分期干预落地计划" },
];

const stats = [
  { num: "40", label: "完整页面" },
  { num: "9",  label: "核心章节" },
  { num: "6",  label: "大类忌口" },
  { num: "3000+", label: "服务桥本人" },
];

export default function GuideSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* 顶部标题 */}
        <div className="text-center mb-14">
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--green-700)" }}>
            免费资源
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-gray-900">
            《桥本疗愈指南》
            <br />
            <span className="font-semibold" style={{ color: "var(--green-800)" }}>
              汇泽甲功 出品
            </span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            功能医学视角的全方位桥本干预方案，服务 3000+ 桥本患者的经验结晶。
          </p>
        </div>

        {/* 主体：左封面 + 右章节网格 */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* ── 左：封面预览卡 ── */}
          <div
            className="rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg, var(--green-50) 0%, #fff 70%)", minHeight: "420px" }}
          >
            {/* 装饰斜块 */}
            <div
              className="absolute right-0 top-0 bottom-0 w-36 opacity-10 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, var(--green-700), var(--green-500))",
                clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            />

            <div>
              {/* 品牌线 */}
              <div className="flex items-center gap-2 mb-5 text-xs font-bold tracking-widest uppercase" style={{ color: "var(--green-700)" }}>
                <span className="inline-block w-5 h-0.5" style={{ background: "var(--green-700)" }} />
                汇泽甲功健康
              </div>

              <h3 className="text-4xl font-bold leading-tight mb-2" style={{ color: "#1A2E4A" }}>
                桥本<em className="not-italic" style={{ color: "var(--green-700)" }}>疗愈</em>指南
              </h3>
              <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">
                Hashimoto's Healing Guide
              </p>
              <p className="text-sm leading-relaxed mb-6 border-l-2 pl-3" style={{ color: "#546E7A", borderColor: "var(--green-300)" }}>
                从饮食、运动、睡眠、情绪管理到营养补充剂<br />
                功能医学视角的全方位桥本干预方案
              </p>

              {/* 数据统计 */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-3 text-center border shadow-sm" style={{ borderColor: "var(--green-100)" }}>
                    <div className="text-xl font-bold" style={{ color: "var(--green-700)" }}>{s.num}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div>
              <a
                href="/guide"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-8 py-3.5 rounded-full transition-all"
                style={{ background: "var(--green-700)", boxShadow: "0 4px 16px rgba(46,125,107,0.3)" }}
              >
                立即免费阅读
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <p className="text-xs text-gray-400 mt-3">完全免费 · 无需注册 · 即开即用</p>
            </div>
          </div>

          {/* ── 右：3×3 章节网格 ── */}
          <div className="flex flex-col">
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: "var(--green-700)" }}>
              9 大章节 · 全面覆盖
            </div>

            <div className="grid grid-cols-3 gap-3 flex-1">
              {chapters.map((c, i) => (
                <a
                  key={c.name}
                  href="/guide"
                  className="flex flex-col items-center justify-center text-center p-4 rounded-2xl border transition-all hover:shadow-md hover:border-green-300 group"
                  style={{ borderColor: "var(--green-100)", background: "var(--green-50)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 bg-white border"
                    style={{ borderColor: "var(--green-200)" }}
                  >
                    {c.icon}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">{String(i + 1).padStart(2, '0')}</div>
                  <div className="font-semibold text-sm mb-1" style={{ color: "var(--green-900)" }}>{c.name}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "#90A4AE" }}>{c.desc}</div>
                </a>
              ))}
            </div>

            <a
              href="/guide"
              className="mt-4 flex items-center justify-center gap-2 text-sm py-3 rounded-xl border transition-all"
              style={{ color: "var(--green-700)", borderColor: "var(--green-300)" }}
            >
              查看完整手册
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
