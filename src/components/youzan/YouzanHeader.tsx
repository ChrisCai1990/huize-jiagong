"use client";

import { Search, ShoppingCart } from "lucide-react";

export default function YouzanHeader() {
  return (
    <header
      className="flex items-center justify-between px-5 py-3 sticky top-0 z-10 bg-white"
      style={{ borderBottom: "1px solid var(--green-100)" }}
    >
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-5 rounded-sm" style={{ background: "var(--green-700)" }} />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight text-gray-900">汇泽健康</span>
          <span className="text-[9px] tracking-wide" style={{ color: "var(--green-500)" }}>营养 · 检测 · 健康</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Search size={17} className="text-gray-400" />
        <ShoppingCart size={17} className="text-gray-400" />
      </div>
    </header>
  );
}
