const pillars = [
  {
    title: "功能医学视角",
    desc: "不止看指标，寻找症状背后的根本原因——肠道、营养、压力、毒素负荷全面评估。",
  },
  {
    title: "循证营养干预",
    desc: "基于研究证据制定个性化营养方案，通过饮食、补剂精准调节免疫与甲状腺功能。",
  },
  {
    title: "持续陪伴支持",
    desc: "从首次评估到长期追踪，与您并肩解读检查结果、调整方案，不让您一个人面对。",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: "var(--green-50)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* 左侧文案 */}
          <div>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--green-700)" }}
            >
              关于我们
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-gray-900 leading-snug">
              我们相信，
              <br />
              <span className="font-semibold" style={{ color: "var(--green-800)" }}>
                身体有自愈的能力
              </span>
            </h2>
            <p className="mt-6 text-gray-500 leading-relaxed">
              汇泽健康由专注自身免疫与营养医学的团队创立。我们深知桥本、
              甲减患者在传统医疗体系中面临的困境——指标"正常"却依然疲惫、
              情绪低落、体重难控。
            </p>
            <p className="mt-4 text-gray-500 leading-relaxed">
              我们整合功能医学、营养学与生活方式干预，帮助患者超越单纯的
              药物管理，从根源上重建免疫平衡与甲状腺健康。
            </p>

            {/* 分隔线 */}
            <div
              className="mt-8 w-12 h-1 rounded-full"
              style={{ background: "var(--green-500)" }}
            />
          </div>

          {/* 右侧卡片 */}
          <div className="flex flex-col gap-4">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="bg-white p-6 rounded-2xl border"
                style={{ borderColor: "var(--green-100)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-6 h-6 rounded-full text-xs text-white flex items-center justify-center font-medium flex-shrink-0"
                    style={{ background: "var(--green-700)" }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-medium" style={{ color: "var(--green-900)" }}>
                    {p.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed pl-9">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
