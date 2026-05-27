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
    <section id="about" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs tracking-widest text-gray-400 uppercase">关于我们</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-gray-900 leading-snug">
              我们相信，
              <br />
              <span className="font-semibold">身体有自愈的能力</span>
            </h2>
            <p className="mt-6 text-gray-500 leading-relaxed">
              汇泽甲功由专注自身免疫与营养医学的团队创立。我们深知桥本、
              甲减患者在传统医疗体系中面临的困境——指标"正常"却依然疲惫、
              情绪低落、体重难控。
            </p>
            <p className="mt-4 text-gray-500 leading-relaxed">
              我们整合功能医学、营养学与生活方式干预，帮助患者超越单纯的
              药物管理，从根源上重建免疫平衡与甲状腺健康。
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
