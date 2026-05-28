"use client";

import { ChevronRight, Activity, ClipboardList, Pill } from "lucide-react";

const steps = [
  { icon: Activity,      num: "01", label: "精准检测", desc: "全面了解身体营养现状与健康风险" },
  { icon: ClipboardList, num: "02", label: "专业分析", desc: "营养师解读报告，制定个性化方案" },
  { icon: Pill,          num: "03", label: "靶向补充", desc: "精准补充所需营养素，持续跟踪" },
];

export default function YouzanSteps() {
  return (
    <div id="section-steps" className="px-5 py-6" style={{ background: "var(--green-50)", borderTop: "1px solid var(--green-100)" }}>
      <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--green-700)" }}>
        科学方法
      </span>
      <h2 className="mt-2 text-xl font-light text-gray-900 mb-1">
        健康管理，<span className="font-semibold" style={{ color: "var(--green-800)" }}>3步开始</span>
      </h2>
      <p className="text-xs text-gray-400 mb-5">科学检测，精准补充，持续改善</p>

      <div className="flex flex-col gap-3">
        {steps.map(({ icon: Icon, num, label, desc }, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 border flex items-center gap-4"
            style={{ borderColor: "var(--green-100)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--green-50)", border: "1px solid var(--green-200)" }}
            >
              <Icon size={18} style={{ color: "var(--green-700)" }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-medium" style={{ color: "var(--green-500)" }}>{num}</span>
                <span className="text-sm font-medium text-gray-800">{label}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
            <ChevronRight size={14} className="text-gray-200 flex-shrink-0" />
          </div>
        ))}
      </div>

      <button
        className="mt-4 w-full text-sm py-2.5 rounded-full border text-center"
        style={{ color: "var(--green-700)", borderColor: "var(--green-300)" }}
      >
        立即检测 →
      </button>
    </div>
  );
}
