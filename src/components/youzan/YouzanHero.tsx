"use client";

import { ChevronRight } from "lucide-react";

export default function YouzanHero() {
  return (
    <div id="section-hero" className="px-6 pt-8 pb-8 bg-white">
      <span
        className="inline-block text-[10px] tracking-widest uppercase border rounded-full px-3 py-1 mb-5"
        style={{ color: "var(--green-700)", borderColor: "var(--green-300)", background: "var(--green-50)" }}
      >
        营养素 · 健康检测 · 天然食品
      </span>

      <h1 className="text-3xl font-light text-gray-900 leading-tight mb-2">
        科学营养方案<br />
        <span className="font-semibold" style={{ color: "var(--green-800)" }}>从这里开始</span>
      </h1>

      <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
        以循证营养医学为核心，帮助每一位用户系统改善健康。
      </p>

      <button
        className="text-sm text-white px-6 py-2.5 rounded-full"
        style={{ background: "var(--green-700)" }}
      >
        立即选购
      </button>

      {/* 数据统计 */}
      <div className="grid grid-cols-3 gap-3 mt-7">
        {[
          { num: "5000+", label: "服务用户" },
          { num: "98%",   label: "好评率"   },
          { num: "3年+",  label: "专业经验" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-3 text-center border"
            style={{ background: "var(--green-50)", borderColor: "var(--green-100)" }}
          >
            <div className="text-lg font-semibold" style={{ color: "var(--green-800)" }}>{s.num}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
