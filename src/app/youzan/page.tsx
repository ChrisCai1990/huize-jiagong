"use client";

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
  { icon: Pill,          label: "健康补剂" },
  { icon: Activity,      label: "健康检测" },
  { icon: Heart,         label: "健康生活" },
  { icon: BookOpen,      label: "案例分享" },
  { icon: PlayCircle,    label: "课程回放" },
  { icon: Lightbulb,     label: "健康科普" },
  { icon: Users,         label: "关于我们" },
  { icon: Grid3x3,       label: "全部商品" },
];

const steps = [
  { icon: Activity,      num: "①", label: "检测", sub1: "了解身体", sub2: "健康现状" },
  { icon: ClipboardList, num: "②", label: "分析", sub1: "专业解读", sub2: "制定方案" },
  { icon: Pill,          num: "③", label: "补充", sub1: "精准补充", sub2: "持续改善" },
];

const articles = [
  {
    icon: Lightbulb,
    title: "什么是营养素缺乏？",
    desc: "90%的人都不知道自己缺什么",
    featured: true,
  },
  {
    icon: Activity,
    title: "甲状腺与营养素的关系",
    desc: "硒、碘、锌如何影响甲功",
    featured: false,
  },
  {
    icon: Zap,
    title: "维生素 D 缺乏有多普遍？",
    desc: "中国人最普遍缺乏的营养素",
    featured: false,
  },
  {
    icon: BarChart2,
    title: "检测报告怎么看？",
    desc: "手把手教你读懂营养检测结果",
    featured: false,
  },
];

const cases = [
  { name: "张女士", tag: "甲状腺调理", desc: "坚持 3 个月，复查指标明显改善" },
  { name: "李先生", tag: "营养素补充", desc: "检测后精准补充，精力明显提升" },
];

export default function YouzanPage() {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-sm min-h-screen flex flex-col" style={{ background: "var(--green-50)" }}>

        {/* 顶部导航 */}
        <header
          className="flex items-center justify-between px-4 py-3 sticky top-0 z-10 border-b"
          style={{ background: "white", borderColor: "var(--green-100)" }}
        >
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold" style={{ color: "var(--green-900)" }}>汇泽健康</span>
            <span className="text-[10px]" style={{ color: "var(--green-500)" }}>营养 · 检测 · 健康</span>
          </div>
          <div className="flex items-center gap-4">
            <Search size={18} style={{ color: "var(--green-700)" }} />
            <ShoppingCart size={18} style={{ color: "var(--green-700)" }} />
          </div>
        </header>

        <main className="flex-1 pb-8">

          {/* Hero Banner */}
          <div
            className="px-5 pt-7 pb-8 relative overflow-hidden"
            style={{ background: "var(--green-900)" }}
          >
            {/* 装饰圆 */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
              style={{ background: "var(--green-500)" }}
            />
            <div
              className="absolute top-10 right-12 w-16 h-16 rounded-full opacity-15"
              style={{ background: "var(--green-300)" }}
            />

            <span
              className="inline-block text-[10px] tracking-widest uppercase border rounded-full px-3 py-0.5 mb-3"
              style={{ color: "var(--green-300)", borderColor: "var(--green-700)" }}
            >
              专注健康 · 精准营养
            </span>

            <h1 className="text-2xl font-light text-white leading-snug mb-2">
              科学营养方案
              <br />
              <span className="font-semibold" style={{ color: "var(--green-300)" }}>从这里开始</span>
            </h1>

            <p className="text-sm mb-5" style={{ color: "var(--green-300)" }}>
              营养素 · 健康检测 · 天然食品
            </p>

            <button
              className="text-sm px-5 py-1.5 rounded-full border flex items-center gap-1 transition-colors"
              style={{ color: "var(--green-100)", borderColor: "var(--green-500)" }}
            >
              立即选购 <ChevronRight size={13} />
            </button>

            {/* 信任标签 */}
            <div
              className="flex gap-3 mt-5 text-[11px] flex-wrap"
              style={{ color: "var(--green-500)" }}
            >
              {["✓ 正品保障", "✓ 专业检测", "✓ 顺丰包邮", "✓ 专属客服"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          {/* 分类导航 */}
          <div className="bg-white mx-0 px-4 py-5 mt-2">
            <div className="grid grid-cols-4 gap-y-5">
              {categories.map(({ icon: Icon, label }, i) => (
                <button key={i} className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: i < 4 ? "var(--green-800)" : "var(--green-50)", border: i >= 4 ? "1px solid var(--green-100)" : "none" }}
                  >
                    <Icon
                      size={22}
                      style={{ color: i < 4 ? "var(--green-100)" : "var(--green-700)" }}
                    />
                  </div>
                  <span className="text-xs" style={{ color: "var(--green-900)" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 健康管理3步 */}
          <div
            className="mx-3 mt-3 bg-white rounded-2xl p-4 border"
            style={{ borderColor: "var(--green-100)" }}
          >
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{ color: "var(--green-700)" }}
            >
              健康方法
            </span>
            <p className="text-sm font-medium mt-1 mb-1" style={{ color: "var(--green-900)" }}>
              健康管理 · 3步开始
            </p>
            <p className="text-xs mb-4" style={{ color: "var(--green-500)" }}>
              科学检测，精准补充，持续改善
            </p>

            <div className="flex items-center justify-between">
              {steps.map(({ icon: Icon, num, label, sub1, sub2 }, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center mb-1.5"
                      style={{ background: "var(--green-800)" }}
                    >
                      <Icon size={20} style={{ color: "var(--green-100)" }} />
                    </div>
                    <span className="text-[11px] font-medium" style={{ color: "var(--green-700)" }}>
                      {num} {label}
                    </span>
                    <span className="text-[10px] leading-tight text-center" style={{ color: "var(--green-500)" }}>{sub1}</span>
                    <span className="text-[10px] leading-tight text-center" style={{ color: "var(--green-500)" }}>{sub2}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight size={15} className="mx-1 mb-6" style={{ color: "var(--green-300)" }} />
                  )}
                </div>
              ))}
            </div>

            <div
              className="flex items-center justify-between mt-4 pt-3 border-t"
              style={{ borderColor: "var(--green-100)" }}
            >
              <span className="text-xs" style={{ color: "var(--green-500)" }}>
                不清楚自己的身体健康状况？
              </span>
              <button
                className="text-xs flex items-center gap-0.5"
                style={{ color: "var(--green-700)" }}
              >
                立即检测 <ChevronRight size={11} />
              </button>
            </div>
          </div>

          {/* 健康科普 */}
          <div
            className="mx-3 mt-3 bg-white rounded-2xl p-4 border"
            style={{ borderColor: "var(--green-100)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: "var(--green-900)" }}>健康科普</span>
              <button className="text-xs flex items-center gap-0.5" style={{ color: "var(--green-700)" }}>
                更多 <ChevronRight size={11} />
              </button>
            </div>

            {/* 精选文章 */}
            <div
              className="rounded-xl p-3 flex items-center justify-between mb-2"
              style={{ background: "var(--green-900)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--green-700)" }}
                >
                  <Lightbulb size={17} style={{ color: "var(--green-100)" }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{articles[0].title}</p>
                  <p className="text-[11px]" style={{ color: "var(--green-300)" }}>{articles[0].desc}</p>
                </div>
              </div>
              <ChevronRight size={15} style={{ color: "var(--green-500)" }} />
            </div>

            {/* 普通文章列表 */}
            <div style={{ borderTop: "1px solid var(--green-50)" }}>
              {articles.slice(1).map((a, i) => {
                const Icon = a.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2.5 border-b last:border-b-0"
                    style={{ borderColor: "var(--green-50)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--green-50)", border: "1px solid var(--green-100)" }}
                    >
                      <Icon size={15} style={{ color: "var(--green-700)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "var(--green-900)" }}>
                        {a.title}
                      </p>
                      <p className="text-[11px]" style={{ color: "var(--green-500)" }}>{a.desc}</p>
                    </div>
                    <ChevronRight size={13} style={{ color: "var(--green-300)" }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 客户案例 */}
          <div
            className="mx-3 mt-3 rounded-2xl p-4 border"
            style={{ background: "var(--green-50)", borderColor: "var(--green-100)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: "var(--green-900)" }}>客户案例</span>
              <button className="text-xs flex items-center gap-0.5" style={{ color: "var(--green-700)" }}>
                更多案例 <ChevronRight size={11} />
              </button>
            </div>

            <div className="space-y-2">
              {cases.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border"
                  style={{ borderColor: "var(--green-100)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--green-800)" }}
                  >
                    <span className="text-xs font-semibold" style={{ color: "var(--green-100)" }}>
                      {c.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--green-900)" }}>
                      {c.name} ·{" "}
                      <span style={{ color: "var(--green-700)" }}>{c.tag}</span>
                    </p>
                    <p className="text-xs" style={{ color: "var(--green-500)" }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 关于我们 */}
          <div
            className="mx-3 mt-3 rounded-2xl p-4 border-2 border-dashed"
            style={{ borderColor: "var(--green-200)" }}
          >
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{ color: "var(--green-700)" }}
            >
              关于我们
            </span>
            <p className="text-sm font-medium mt-1 mb-2" style={{ color: "var(--green-900)" }}>
              专注营养医学领域
            </p>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--green-700)" }}>
              提供专业营养素、精准健康检测与天然食品，帮助每一位用户实现科学健康管理。
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "5000+", label: "服务用户" },
                { value: "98%",   label: "好评率"   },
                { value: "3年+",  label: "专业经验" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl py-3 flex flex-col items-center border"
                  style={{ background: "white", borderColor: "var(--green-100)" }}
                >
                  <span className="text-lg font-semibold" style={{ color: "var(--green-800)" }}>
                    {s.value}
                  </span>
                  <span className="text-[11px]" style={{ color: "var(--green-500)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
