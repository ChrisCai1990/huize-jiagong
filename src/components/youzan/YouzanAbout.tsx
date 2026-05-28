"use client";

export default function YouzanAbout() {
  return (
    <div id="section-about" className="bg-white" style={{ borderTop: "1px solid var(--green-100)" }}>
      {/* 深色方法卡 */}
      <div className="px-5 py-6 text-white" style={{ background: "var(--green-900)" }}>
        <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--green-300)" }}>关于我们</span>
        <p className="text-lg font-light text-white mt-2 mb-1">
          专注<span className="font-semibold">营养医学</span>领域
        </p>
        <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--green-300)" }}>
          以循证营养医学为核心，提供专业营养素、健康检测与天然食品。
        </p>
        <div className="space-y-2.5">
          {[
            "不只看指标，寻找症状背后的根本原因",
            "个性化营养方案，靶向调节免疫与代谢",
            "全程陪伴，定期追踪指标变化",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs" style={{ color: "var(--green-100)" }}>
              <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--green-500)" }} />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-3" style={{ borderTop: "1px solid var(--green-100)" }}>
        {[
          { value: "5000+", label: "服务用户" },
          { value: "98%",   label: "好评率"   },
          { value: "3年+",  label: "专业经验" },
        ].map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col items-center py-5"
            style={{ borderRight: i < 2 ? "1px solid var(--green-100)" : "none" }}
          >
            <span className="text-xl font-semibold" style={{ color: "var(--green-800)" }}>{s.value}</span>
            <span className="text-[11px] text-gray-400 mt-0.5">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
