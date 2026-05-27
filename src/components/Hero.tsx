"use client";
export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-6 pt-16 bg-white"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* 左栏：文案 + CTA */}
          <div className="text-center lg:text-left">
            <span
              className="inline-block text-xs tracking-widest uppercase mb-6 border rounded-full px-4 py-1"
              style={{ color: "var(--green-700)", borderColor: "var(--green-300)", background: "var(--green-50)" }}
            >
              自身免疫 · 桥本甲状腺炎 · 营养医学
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-tight mb-6">
              重新认识
              <br />
              <span className="font-semibold" style={{ color: "var(--green-800)" }}>
                甲状腺健康
              </span>
            </h1>

            <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              汇泽甲功聚焦自身免疫性疾病根源，以循证营养医学为核心，
              帮助桥本、甲减患者系统改善症状、恢复活力。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#services"
                className="text-sm text-white px-8 py-3.5 rounded-full transition-colors"
                style={{ background: "var(--green-700)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--green-800)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--green-700)")}
              >
                了解服务
              </a>
              <a
                href="#contact"
                className="text-sm px-8 py-3.5 rounded-full border transition-colors"
                style={{ color: "var(--green-800)", borderColor: "var(--green-300)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--green-50)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                预约咨询
              </a>
            </div>
          </div>

          {/* 右栏：数据卡片 */}
          <div className="flex flex-col gap-5">
            {/* 数据统计 */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: "3000+", label: "服务案例" },
                { num: "8年+",  label: "专注自免领域" },
                { num: "95%",   label: "症状改善率" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-5 text-center border"
                  style={{ background: "var(--green-50)", borderColor: "var(--green-100)" }}
                >
                  <div
                    className="text-2xl lg:text-3xl font-semibold"
                    style={{ color: "var(--green-800)" }}
                  >
                    {s.num}
                  </div>
                  <div className="text-xs text-gray-400 mt-1.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* 方法卡片 */}
            <div className="rounded-2xl p-8 text-white" style={{ background: "var(--green-900)" }}>
              <div
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: "var(--green-300)" }}
              >
                我们的方法
              </div>
              <div className="space-y-3">
                {[
                  "不只看指标，寻找症状背后的根本原因",
                  "个性化营养方案，靶向调节免疫与甲状腺",
                  "全程陪伴，定期追踪指标变化",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--green-100)" }}>
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "var(--green-500)" }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 提示条 */}
            <div
              className="rounded-2xl p-5 border flex items-center gap-4"
              style={{ background: "var(--green-50)", borderColor: "var(--green-100)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white"
                style={{ background: "var(--green-500)" }}
              >
                ✓
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                首次咨询免费评估，1个工作日内回复
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
