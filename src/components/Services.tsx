const services = [
  {
    tag: "评估",
    title: "综合健康评估",
    desc: "深度解读甲状腺抗体、T3/T4、营养标志物、肠道功能等指标，绘制您专属的健康全图。",
    items: ["甲功五项精准解读", "自身抗体检测分析", "营养与炎症标志物评估"],
  },
  {
    tag: "干预",
    title: "营养医学方案",
    desc: "基于个体检测结果，制定无麸质/抗炎饮食策略与营养补剂方案，靶向支持免疫调节。",
    items: ["个性化抗炎饮食计划", "精准营养补剂方案", "肠道菌群修复指导"],
  },
  {
    tag: "管理",
    title: "长期健康管理",
    desc: "定期回顾检查结果、方案调整与阶段性评估，建立可持续的健康自我管理体系。",
    items: ["阶段性指标追踪", "症状日志分析", "生活方式持续优化"],
  },
  {
    tag: "教育",
    title: "患者健康教育",
    desc: "帮助您真正理解自身免疫病机制，掌握读懂化验单、辨别症状波动的能力。",
    items: ["自免疾病深度解读", "检查结果自读教学", "桥本患者社群支持"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs tracking-widest text-gray-400 uppercase">服务项目</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-gray-900">
            全程陪伴，<span className="font-semibold">系统改善</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            从初次评估到长期管理，我们为每位客户提供循序渐进、有据可依的健康干预路径。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
            >
              <span className="text-xs tracking-widest text-gray-400 uppercase border border-gray-200 rounded-full px-3 py-0.5">
                {s.tag}
              </span>
              <h3 className="mt-4 text-xl font-medium text-gray-900">{s.title}</h3>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
