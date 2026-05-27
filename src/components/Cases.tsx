const cases = [
  {
    label: "桥本甲状腺炎",
    name: "张女士 · 34岁",
    duration: "干预周期 6 个月",
    quote: "抗体从 1200 降到 280，疲劳感消失了，终于不再每天都精力耗尽。以前怎么睡都睡不醒，现在早上可以清醒地起床了。",
    tags: ["TPO抗体↓76%", "TSH恢复正常", "疲劳消除"],
  },
  {
    label: "甲状腺功能减退",
    name: "李先生 · 41岁",
    duration: "干预周期 4 个月",
    quote: "体重莫名增加了15斤，后来发现是亚临床甲减。通过营养干预调整后，体重逐步下降，整个人状态好了很多。",
    tags: ["体重恢复", "代谢改善", "情绪稳定"],
  },
  {
    label: "自身免疫综合干预",
    name: "王女士 · 29岁",
    duration: "干预周期 8 个月",
    quote: "同时有桥本和肠易激综合征，肠道修复后抗体也明显下降了。之前以为这两件事没关系，现在终于理解了肠-免疫轴。",
    tags: ["肠道功能修复", "抗体持续下降", "系统改善"],
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-24 px-6" style={{ background: "var(--green-50)" }}>
      <div className="max-w-6xl mx-auto">

        {/* 标题 */}
        <div className="text-center mb-16">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--green-700)" }}
          >
            成功案例
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-gray-900">
            真实改变，
            <span className="font-semibold" style={{ color: "var(--green-800)" }}>
              有迹可循
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm max-w-md mx-auto">
            以下案例经当事人同意脱敏分享，个体情况存在差异，仅供参考。
          </p>
        </div>

        {/* 案例卡片 */}
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.name} className="bg-white rounded-2xl p-8 border" style={{ borderColor: "var(--green-100)" }}>
              <span
                className="text-xs border rounded-full px-3 py-0.5"
                style={{ color: "var(--green-700)", borderColor: "var(--green-200)", background: "var(--green-50)" }}
              >
                {c.label}
              </span>

              {/* 引用线 */}
              <div className="mt-5 pl-4 border-l-2" style={{ borderColor: "var(--green-300)" }}>
                <blockquote className="text-sm text-gray-600 leading-relaxed italic">
                  "{c.quote}"
                </blockquote>
              </div>

              <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--green-100)" }}>
                <div className="font-medium" style={{ color: "var(--green-900)" }}>{c.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{c.duration}</div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full px-3 py-1"
                      style={{
                        background: "var(--green-50)",
                        color: "var(--green-800)",
                        border: "1px solid var(--green-200)",
                      }}
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
