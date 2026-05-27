const chapters = [
  { icon: "🧠", name: "认知篇", desc: "什么是桥本 · 发展机制 · 干预思路" },
  { icon: "🥗", name: "饮食篇", desc: "精准忌口 · 抗炎饮食 · 无麸质清单" },
  { icon: "🏃", name: "运动篇", desc: "适合桥本的运动方式与强度建议" },
  { icon: "😴", name: "睡眠篇", desc: "皮质醇节律 · 睡眠与免疫的关系" },
  { icon: "🧘", name: "情绪篇", desc: "压力与自免 · 情绪调节实操方案" },
  { icon: "💊", name: "营养篇", desc: "硒 · 维生素D · 铁 · 锌 · 精准补充" },
  { icon: "💤", name: "肠道篇", desc: "肠漏修复 · 菌群重建 · 肠免疫轴" },
  { icon: "📋", name: "检查篇", desc: "如何读懂甲功五项 · 抗体 · 营养指标" },
  { icon: "🗓️", name: "方案篇", desc: "分期干预计划 · 可执行落地方案" },
];

const stats = [
  { num: "40", label: "完整页面" },
  { num: "9", label: "核心章节" },
  { num: "6", label: "大类忌口" },
  { num: "3000+", label: "服务桥本人" },
];

export default function GuideSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* 顶部标签 */}
        <div className="text-center mb-12">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--green-700)" }}
          >
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
            从饮食、运动、睡眠、情绪管理到营养补充剂——
            功能医学视角的全方位桥本干预方案，
            服务 3000+ 桥本患者经验结晶。
          </p>
        </div>

        {/* 主体内容：左预览 + 右章节 */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* 左：封面预览卡 */}
          <div
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, var(--green-50) 0%, #fff 70%)" }}
          >
            {/* 装饰斜块 */}
            <div
              className="absolute right-0 top-0 bottom-0 w-32 opacity-10"
              style={{ background: "linear-gradient(135deg, var(--green-700), var(--green-500))", clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            />

            {/* 品牌线 */}
            <div className="flex items-center gap-2 mb-5 text-xs font-bold tracking-widest uppercase" style={{ color: "var(--green-700)" }}>
              <span className="w-5 h-0.5" style={{ background: "var(--green-700)" }} />
              汇泽甲功健康
            </div>

            <h3 className="text-4xl font-bold leading-tight mb-2" style={{ color: "#1A2E4A" }}>
              桥本<em className="not-italic" style={{ color: "var(--green-700)" }}>疗愈</em>指南
            </h3>
            <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">
              Hashimoto's Healing Guide
            </p>
            <p
              className="text-sm leading-relaxed mb-6 border-l-2 pl-3"
              style={{ color: "#546E7A", borderColor: "var(--green-300)" }}
            >
              从饮食、运动、睡眠、情绪管理到营养补充剂<br />
              功能医学视角的全方位桥本干预方案
            </p>

            {/* 数据统计 */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-xl p-3 text-center border shadow-sm"
                  style={{ borderColor: "var(--green-100)" }}
                >
                  <div className="text-xl font-bold" style={{ color: "var(--green-700)" }}>{s.num}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA 按钮 */}
            <a
              href="/guide"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white px-8 py-3.5 rounded-full shadow-lg transition-all hover:shadow-xl"
              style={{ background: "var(--green-700)", boxShadow: "0 4px 16px rgba(46,125,107,0.3)" }}
            >
              立即免费阅读
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <p className="text-xs text-gray-400 mt-3">完全免费 · 无需注册 · 即开即用</p>
          </div>

          {/* 右：章节目录 */}
          <div>
            <div
              className="text-xs tracking-widest uppercase mb-4 font-semibold"
              style={{ color: "var(--green-700)" }}
            >
              9 大章节 全面覆盖
            </div>
            <div className="space-y-2">
              {chapters.map((c, i) => (
                <div
                  key={c.name}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-sm group"
                  style={{ borderColor: "var(--green-100)", background: "var(--green-50)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: "white", border: "1px solid var(--green-200)" }}
                  >
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-4">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-medium text-sm" style={{ color: "var(--green-900)" }}>{c.name}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 pl-6">{c.desc}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: "var(--green-400)", flexShrink: 0 }}>
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ))}
            </div>

            <a
              href="/guide"
              className="mt-6 w-full flex items-center justify-center gap-2 text-sm py-3 rounded-xl border transition-all"
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
