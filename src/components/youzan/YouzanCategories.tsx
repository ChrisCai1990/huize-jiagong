"use client";

import { ChevronRight, Pill, Activity, Heart, BookOpen, PlayCircle, Lightbulb, Users, Grid3x3 } from "lucide-react";

const categories = [
  { icon: Pill,       label: "健康补剂" },
  { icon: Activity,   label: "健康检测" },
  { icon: Heart,      label: "健康生活" },
  { icon: BookOpen,   label: "案例分享" },
  { icon: PlayCircle, label: "课程回放" },
  { icon: Lightbulb,  label: "健康科普" },
  { icon: Users,      label: "关于我们" },
  { icon: Grid3x3,    label: "全部商品" },
];

export default function YouzanCategories() {
  return (
    <div id="section-categories" className="bg-white px-5 py-5" style={{ borderTop: "1px solid var(--green-100)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--green-700)" }}>商品分类</span>
        <span className="text-xs flex items-center gap-0.5 text-gray-400">
          全部 <ChevronRight size={11} />
        </span>
      </div>
      <div className="grid grid-cols-4 gap-x-2 gap-y-4">
        {categories.map(({ icon: Icon, label }, i) => (
          <button key={i} className="flex flex-col items-center gap-1.5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center border"
              style={{ background: "var(--green-50)", borderColor: "var(--green-100)" }}
            >
              <Icon size={20} style={{ color: "var(--green-700)" }} />
            </div>
            <span className="text-[11px] text-gray-600">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
