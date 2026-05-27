const cases = [
  {
    label: "桥本甲状腺炎",
    name: "张女士 · 34岁",
    duration: "干预周期 6 个月",
    quote:
      "抗体从 1200 降到 280，疲劳感消失了，终于不再每天都精力耗尽。以前怎么睡都睡不醒，现在早上可以清醒地起床了。",
    tags: ["TPO抗体↓76%", "TSH恢复正常", "疲劳消除"],
  },
  {
    label: "甲状腺功能减退",
    name: "李先生 · 41岁",
    duration: "干预周期 4 个月",
    quote:
      "体重莫名增加了15斤，后来发现是亚临床甲减。通过营养干预调整后，体重逐步下降，整个人状态好了很多。",
    tags: ["体重恢复", "代谢改善", "情绪稳定"],
  },
  {
    label: "自身免疫综合干预",
    name: "王女士 · 29岁",
    duration: "干预周期 8 个月",
    quote:
      "同时有桥本和肠易激综合征，肠道修复后抗体也明显下降了。之前以为这两件事没关系，现在终于理解了肠-免疫轴。",
    tags: ["肠道功能修复", "抗体持续下降", "系统改善"],
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs tracking-widest text-gray-400 uppercase">成功案例</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-gray-900">
            真实改变，<span className="font-semibold">有迹可循</span>
          </h2>
          <p className="mt-4 text-gray-500 text-sm max-w-md mx-auto">
            以下案例经当事人同意脱敏分享，个体情况存在差异，仅供参考。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.name} className="bg-white rounded-2xl p-8 border border-gray-100">
              <span className="text-xs text-gray-400 border border-gray-200 rounded-full px-3 py-0.5">
                {c.label}
              </span>
              <blockquote className="mt-6 text-sm text-gray-600 leading-relaxed">
                "{c.quote}"
              </blockquote>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-sm font-medium text-gray-800">{c.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{c.duration}</div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-gray-50 border border-gray-200 text-gray-600 rounded-full px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
