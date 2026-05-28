"use client";

import { useState } from "react";
import {
  Search,
  ShoppingCart,
  ChevronRight,
  Pill,
  Activity,
  Heart,
  BookOpen,
  PlayCircle,
  Lightbulb,
  Users,
  Grid3x3,
  ClipboardList,
  BarChart2,
  Zap,
} from "lucide-react";

const categories = [
  { icon: Pill,         label: "健康补剂", bg: "bg-blue-700"  },
  { icon: Activity,     label: "健康检测", bg: "bg-blue-500"  },
  { icon: Heart,        label: "健康生活", bg: "bg-blue-500"  },
  { icon: ClipboardList,label: "案例分享", bg: "bg-blue-500"  },
  { icon: PlayCircle,   label: "课程回放", bg: "bg-blue-100"  },
  { icon: Lightbulb,    label: "健康科普", bg: "bg-blue-100"  },
  { icon: Users,        label: "关于我们", bg: "bg-blue-100"  },
  { icon: Grid3x3,      label: "全部商品", bg: "bg-blue-100"  },
];

const articles = [
  {
    icon: Lightbulb,
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "什么是营养素缺乏？",
    desc: "90%的人都不知道自己缺什么",
    featured: true,
  },
  {
    icon: Activity,
    color: "text-slate-500",
    bg: "bg-slate-50",
    title: "甲状腺与营养素的关系",
    desc: "硒、碘、锌如何影响甲功",
    featured: false,
  },
  {
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50",
    title: "维生素 D 缺乏有多普遍？",
    desc: "中国人最普遍缺乏的营养素",
    featured: false,
  },
  {
    icon: BarChart2,
    color: "text-blue-400",
    bg: "bg-blue-50",
    title: "检测报告怎么看？",
    desc: "手把手教你读懂营养检测结果",
    featured: false,
  },
];

const cases = [
  { name: "张女士", tag: "甲状腺调理", desc: "坚持 3 个月，复查指标明显改善" },
  { name: "李先生", tag: "营养素补充", desc: "检测后精准补充，精力明显提升" },
];

const steps = [
  { icon: Activity,      num: "①", label: "检测", sub1: "了解身体", sub2: "健康现状" },
  { icon: ClipboardList, num: "②", label: "分析", sub1: "专业解读", sub2: "制定方案" },
  { icon: Pill,          num: "③", label: "补充", sub1: "精准补充", sub2: "持续改善" },
];

export default function YouzanPage() {
  const [cartCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen flex flex-col">

        {/* 顶部导航 */}
        <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-10 border-b border-gray-100">
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-gray-900">汇泽健康</span>
            <span className="text-[10px] text-gray-400">营养 · 检测 · 健康</span>
          </div>
          <div className="flex items-center gap-4">
            <Search size={20} className="text-gray-500" />
            <div className="relative">
              <ShoppingCart size={20} className="text-gray-500" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">

          {/* Hero Banner */}
          <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 px-5 pt-6 pb-8 overflow-hidden">
            {/* 装饰圆 */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-blue-400/30 rounded-full" />
            <div className="absolute top-8 right-10 w-16 h-16 bg-blue-300/25 rounded-full" />

            <p className="text-blue-100 text-xs mb-1">专注健康 · 精准营养</p>
            <h1 className="text-white text-2xl font-bold leading-snug mb-3">
              科学营养方案<br />从这里开始
            </h1>
            <p className="text-blue-100 text-xs mb-4">营养素 · 健康检测 · 天然食品</p>
            <button className="border border-white text-white text-sm px-4 py-1.5 rounded-full flex items-center gap-1 hover:bg-white hover:text-blue-600 transition-colors">
              立即选购 <ChevronRight size={14} />
            </button>

            {/* 信任标签 */}
            <div className="flex gap-3 mt-5 text-blue-100 text-[11px]">
              {["✓ 正品保障", "✓ 专业检测", "✓ 顺丰包邮", "✓ 专属客服"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          {/* 分类导航 */}
          <div className="bg-white px-4 py-4 mt-2">
            <div className="grid grid-cols-4 gap-y-4">
              {categories.map(({ icon: Icon, label, bg }, i) => {
                const isDark = bg.includes("700") || bg.includes("500");
                return (
                  <button key={i} className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
                    <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center`}>
                      <Icon size={22} className={isDark ? "text-white" : "text-blue-600"} />
                    </div>
                    <span className="text-xs text-gray-600">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 健康管理3步 */}
          <div className="mx-3 mt-3 bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-sm font-bold text-gray-900">健康管理 · 3步开始</p>
            <p className="text-xs text-gray-400 mt-0.5 mb-4">科学检测，精准补充，持续改善</p>

            <div className="flex items-center justify-between">
              {steps.map(({ icon: Icon, num, label, sub1, sub2 }, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center mb-1.5">
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-[11px] text-blue-600 font-medium">{num} {label}</span>
                    <span className="text-[10px] text-gray-400 leading-tight text-center">{sub1}</span>
                    <span className="text-[10px] text-gray-400 leading-tight text-center">{sub2}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight size={16} className="text-gray-300 mx-1 mb-6" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">不清楚自己的身体健康状况？</span>
              <button className="text-xs text-blue-600 flex items-center gap-0.5">
                立即检测 <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* 健康科普 */}
          <div className="mx-3 mt-3 bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-900">健康科普</span>
              <button className="text-xs text-gray-400 flex items-center gap-0.5">
                更多 <ChevronRight size={12} />
              </button>
            </div>

            {/* 精选文章 */}
            <div className="bg-blue-600 rounded-xl p-3 flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{articles[0].title}</p>
                  <p className="text-[11px] text-blue-200">{articles[0].desc}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-blue-200 flex-shrink-0" />
            </div>

            {/* 普通文章列表 */}
            <div className="divide-y divide-gray-50">
              {articles.slice(1).map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-center gap-3 py-2.5">
                    <div className={`w-8 h-8 ${a.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon size={16} className={a.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 font-medium truncate">{a.title}</p>
                      <p className="text-[11px] text-gray-400">{a.desc}</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 客户案例 */}
          <div className="mx-3 mt-3 bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-900">客户案例</span>
              <button className="text-xs text-gray-400 flex items-center gap-0.5">
                更多案例 <ChevronRight size={12} />
              </button>
            </div>

            <div className="space-y-2">
              {cases.map((c, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{c.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {c.name} · <span className="text-blue-600">{c.tag}</span>
                    </p>
                    <p className="text-xs text-gray-400">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 关于我们 */}
          <div className="mx-3 mt-3 mb-6 border-2 border-dashed border-gray-200 rounded-2xl p-4">
            <p className="text-sm font-bold text-gray-900 mb-1">关于我们</p>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              专注健康营养领域，提供专业营养素、精准健康检测与天然食品，帮助每一位用户实现科学健康管理。
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "5000+", label: "服务用户" },
                { value: "98%",   label: "好评率"   },
                { value: "3年+",  label: "专业经验" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl py-3 flex flex-col items-center">
                  <span className="text-lg font-bold text-gray-900">{s.value}</span>
                  <span className="text-[11px] text-gray-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
