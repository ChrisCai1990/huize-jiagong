"use client";

import { ChevronRight } from "lucide-react";

const cases = [
  {
    name: "张女士 · 34岁", tag: "甲状腺调理",
    quote: "坚持 3 个月，抗体明显下降，复查指标全面改善，整个人精力好了很多。",
    tags: ["TPO抗体↓62%", "疲劳消除"],
  },
  {
    name: "李先生 · 41岁", tag: "营养素补充",
    quote: "检测后精准补充，3 个月精力明显提升，再也不会下午两点就犯困了。",
    tags: ["维D/锌恢复正常", "精力提升"],
  },
];

export default function YouzanCases() {
  return (
    <div id="section-cases" className="px-5 py-6" style={{ background: "var(--green-50)", borderTop: "1px solid var(--green-100)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--green-700)" }}>成功案例</span>
          <h2 className="text-xl font-light text-gray-900 mt-1">
            真实改变，<span className="font-semibold" style={{ color: "var(--green-800)" }}>有迹可循</span>
          </h2>
        </div>
        <button className="text-xs flex items-center gap-0.5 text-gray-400 self-start mt-1">
          更多 <ChevronRight size={11} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {cases.map((c, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 border"
            style={{ borderColor: "var(--green-100)" }}
          >
            <span
              className="text-[10px] border rounded-full px-2.5 py-0.5"
              style={{ color: "var(--green-700)", borderColor: "var(--green-200)", background: "var(--green-50)" }}
            >
              {c.tag}
            </span>

            <div className="mt-3 pl-4 border-l-2" style={{ borderColor: "var(--green-300)" }}>
              <p className="text-xs text-gray-600 leading-relaxed italic">"{c.quote}"</p>
            </div>

            <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: "var(--green-100)" }}>
              <span className="text-xs font-medium" style={{ color: "var(--green-900)" }}>{c.name}</span>
              <div className="flex gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] rounded-full px-2 py-0.5 border"
                    style={{ background: "var(--green-50)", color: "var(--green-800)", borderColor: "var(--green-200)" }}
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
  );
}
