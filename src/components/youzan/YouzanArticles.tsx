"use client";

import { ChevronRight, Lightbulb, Activity, Zap, BarChart2 } from "lucide-react";

const articles = [
  { icon: Lightbulb, title: "什么是营养素缺乏？",     desc: "90%的人都不知道自己缺什么",    featured: true },
  { icon: Activity,  title: "甲状腺与营养素的关系",   desc: "硒、碘、锌如何影响甲功" },
  { icon: Zap,       title: "维生素 D 缺乏有多普遍？", desc: "中国人最普遍缺乏的营养素" },
  { icon: BarChart2, title: "检测报告怎么看？",        desc: "手把手教你读懂营养检测结果" },
];

export default function YouzanArticles() {
  return (
    <div id="section-articles" className="px-5 py-6 bg-white" style={{ borderTop: "1px solid var(--green-100)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--green-700)" }}>健康科普</span>
          <p className="text-xs text-gray-400 mt-0.5">循证营养 · 专业解读</p>
        </div>
        <button className="text-xs flex items-center gap-0.5 text-gray-400">
          更多 <ChevronRight size={11} />
        </button>
      </div>

      {/* 精选 */}
      <div
        className="rounded-2xl p-4 border mb-3 pl-5"
        style={{ background: "var(--green-50)", borderColor: "var(--green-100)", borderLeft: "3px solid var(--green-300)" }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <span
            className="text-[9px] border rounded-full px-2 py-0.5"
            style={{ color: "var(--green-700)", borderColor: "var(--green-200)", background: "white" }}
          >精选</span>
          <span className="text-sm font-medium text-gray-800">{articles[0].title}</span>
        </div>
        <p className="text-xs text-gray-400">{articles[0].desc}</p>
      </div>

      {/* 列表 */}
      <div className="space-y-0 divide-y" style={{ "--tw-divide-opacity": "1" } as React.CSSProperties}>
        {articles.slice(1).map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className="flex items-center gap-3 py-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border"
                style={{ background: "var(--green-50)", borderColor: "var(--green-100)" }}
              >
                <Icon size={14} style={{ color: "var(--green-700)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{a.title}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{a.desc}</p>
              </div>
              <ChevronRight size={13} className="text-gray-200 flex-shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
