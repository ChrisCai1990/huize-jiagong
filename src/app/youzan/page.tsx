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
  Quote,
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
  {
    icon: Activity,
    num: "01",
    label: "精准检测",
    desc: "全面了解身体营养现状与健康风险",
  },
  {
    icon: ClipboardList,
    num: "02",
    label: "专业分析",
    desc: "营养师解读报告，制定个性化方案",
  },
  {
    icon: Pill,
    num: "03",
    label: "靶向补充",
    desc: "精准补充所需营养素，持续跟踪改善",
  },
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
  },
  {
    icon: Zap,
    title: "维生素 D 缺乏有多普遍？",
    desc: "中国人最普遍缺乏的营养素",
  },
  {
    icon: BarChart2,
    title: "检测报告怎么看？",
    desc: "手把手教你读懂营养检测结果",
  },
];

const cases = [
  {
    name: "张女士",
    age: "34岁",
    tag: "甲状腺调理",
    quote: "坚持 3 个月，抗体明显下降，复查指标全面改善，整个人精力好了很多。",
    result: "TPO 抗体 ↓62%",
  },
  {
    name: "李先生",
    age: "41岁",
    tag: "营养素补充",
    quote: "检测后精准补充，3 个月精力明显提升，再也不会下午两点就犯困了。",
    result: "维 D / 锌 恢复正常",
  },
];

export default function YouzanPage() {
  return (
    <div className="min-h-screen" style={{ background: "#e5e7eb" }}>
      <div className="max-w-[390px] mx-auto min-h-screen flex flex-col" style={{ background: "var(--green-50)" }}>

        {/* 顶部导航 */}
        <header
          className="flex items-center justify-between px-5 py-3 sticky top-0 z-10"
          style={{
            background: "white",
            borderBottom: "1px solid var(--green-100)",
            boxShadow: "0 1px 8px 0 rgba(27,67,50,0.06)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "var(--green-800)" }}
            >
              <Pill size={14} style={{ color: "var(--green-100)" }} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold" style={{ color: "var(--green-900)" }}>汇泽健康</span>
              <span className="text-[9px] tracking-wide" style={{ color: "var(--green-500)" }}>营养 · 检测 · 健康</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Search size={18} style={{ color: "var(--green-600)" }} />
            <ShoppingCart size={18} style={{ color: "var(--green-600)" }} />
          </div>
        </header>

        <main className="flex-1 pb-10">

          {/* ① Hero Banner */}
          <div
            id="section-hero"
            className="relative overflow-hidden px-6 pt-10 pb-10"
            style={{
              background: "linear-gradient(145deg, var(--green-950) 0%, var(--green-900) 60%, var(--green-800) 100%)",
            }}
          >
            {/* 大字装饰 */}
            <div
              className="absolute right-4 top-4 text-[120px] font-black leading-none select-none pointer-events-none"
              style={{ color: "rgba(255,255,255,0.04)", letterSpacing: "-0.05em" }}
            >
              HEALTH
            </div>
            {/* 装饰圆 */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(82,183,136,0.18) 0%, transparent 70%)" }} />
            <div className="absolute top-6 right-16 w-24 h-24 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(149,213,178,0.12) 0%, transparent 70%)" }} />

            <span
              className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase border rounded-full px-3 py-1 mb-5"
              style={{ color: "var(--green-400)", borderColor: "var(--green-700)", background: "rgba(82,183,136,0.08)" }}
            >
              <span className="w-1 h-1 rounded-full inline-block" style={{ background: "var(--green-400)" }} />
              专注健康 · 精准营养
            </span>

            <h1 className="font-light text-white leading-tight mb-1" style={{ fontSize: "28px" }}>
              科学营养方案
            </h1>
            <h1 className="font-bold leading-tight mb-4" style={{ fontSize: "32px", color: "var(--green-300)" }}>
              从这里开始
            </h1>

            <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--green-400)", maxWidth: "260px" }}>
              营养素 · 健康检测 · 天然食品<br />
              <span style={{ color: "var(--green-500)", fontSize: "11px" }}>以循证营养医学为核心，帮助每一位用户系统改善健康</span>
            </p>

            <button
              className="text-sm px-6 py-2.5 rounded-full flex items-center gap-1.5 font-medium"
              style={{
                background: "var(--green-500)",
                color: "white",
                boxShadow: "0 4px 16px rgba(82,183,136,0.35)",
              }}
            >
              立即选购 <ChevronRight size={14} />
            </button>

            {/* 信任标签 */}
            <div className="flex gap-4 mt-7 flex-wrap">
              {["✓ 正品保障", "✓ 专业检测", "✓ 顺丰包邮", "✓ 专属客服"].map((t) => (
                <span key={t} className="text-[11px]" style={{ color: "var(--green-500)" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* ② 分类导航 */}
          <div id="section-categories" className="bg-white px-5 py-6">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold" style={{ color: "var(--green-900)" }}>商品分类</span>
              <span className="text-xs flex items-center gap-0.5" style={{ color: "var(--green-600)" }}>
                全部 <ChevronRight size={11} />
              </span>
            </div>
            <div className="grid grid-cols-4 gap-x-2 gap-y-5">
              {categories.map(({ icon: Icon, label }, i) => (
                <button key={i} className="flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: i < 4
                        ? "linear-gradient(135deg, var(--green-800) 0%, var(--green-700) 100%)"
                        : "var(--green-50)",
                      border: i >= 4 ? "1.5px solid var(--green-100)" : "none",
                      boxShadow: i < 4 ? "0 4px 12px rgba(27,67,50,0.2)" : "none",
                    }}
                  >
                    <Icon size={24} style={{ color: i < 4 ? "var(--green-100)" : "var(--green-600)" }} />
                  </div>
                  <span className="text-[11px] font-medium" style={{ color: "var(--green-800)" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ③ 健康管理3步 */}
          <div
            id="section-steps"
            className="mx-3 mt-3 rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 2px 16px rgba(27,67,50,0.10)" }}
          >
            {/* 头部 */}
            <div className="px-5 pt-5 pb-4" style={{ background: "var(--green-900)" }}>
              <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--green-400)" }}>
                科学方法
              </span>
              <p className="text-lg font-semibold text-white mt-1">健康管理 · 3步开始</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--green-400)" }}>科学检测，精准补充，持续改善</p>
            </div>

            {/* 步骤 */}
            <div className="bg-white px-5 py-5 grid grid-cols-3 gap-3">
              {steps.map(({ icon: Icon, num, label, desc }, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 relative"
                    style={{
                      background: "linear-gradient(135deg, var(--green-800) 0%, var(--green-700) 100%)",
                      boxShadow: "0 4px 12px rgba(27,67,50,0.2)",
                    }}
                  >
                    <Icon size={22} style={{ color: "var(--green-100)" }} />
                    <span
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center"
                      style={{ background: "var(--green-500)", color: "white" }}
                    >
                      {num}
                    </span>
                  </div>
                  <p className="text-xs font-semibold mb-1" style={{ color: "var(--green-900)" }}>{label}</p>
                  <p className="text-[10px] leading-relaxed" style={{ color: "var(--green-500)" }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ background: "var(--green-50)", borderTop: "1px solid var(--green-100)" }}
            >
              <span className="text-xs" style={{ color: "var(--green-600)" }}>不清楚自己的健康状况？</span>
              <button
                className="text-[11px] font-medium flex items-center gap-0.5 px-3 py-1.5 rounded-full"
                style={{ background: "var(--green-800)", color: "white" }}
              >
                立即检测 <ChevronRight size={10} />
              </button>
            </div>
          </div>

          {/* ④ 健康科普 */}
          <div
            id="section-articles"
            className="mx-3 mt-3 bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 2px 16px rgba(27,67,50,0.08)" }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-4">
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--green-900)" }}>健康科普</p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--green-500)" }}>循证营养 · 专业解读</p>
              </div>
              <button className="text-[11px] flex items-center gap-0.5" style={{ color: "var(--green-600)" }}>
                更多 <ChevronRight size={11} />
              </button>
            </div>

            {/* 精选 */}
            <div className="mx-4 mb-3 rounded-xl overflow-hidden" style={{ background: "var(--green-900)" }}>
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--green-700) 0%, var(--green-600) 100%)" }}
                >
                  <Lightbulb size={18} style={{ color: "var(--green-100)" }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-sm font-medium"
                      style={{ background: "var(--green-500)", color: "white" }}
                    >
                      精选
                    </span>
                    <p className="text-sm font-semibold text-white">{articles[0].title}</p>
                  </div>
                  <p className="text-[11px]" style={{ color: "var(--green-400)" }}>{articles[0].desc}</p>
                </div>
                <ChevronRight size={14} style={{ color: "var(--green-600)" }} />
              </div>
            </div>

            {/* 列表 */}
            <div className="pb-2">
              {articles.slice(1).map((a, i) => {
                const Icon = a.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-5 py-3"
                    style={{ borderTop: "1px solid var(--green-50)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--green-50)", border: "1.5px solid var(--green-100)" }}
                    >
                      <Icon size={16} style={{ color: "var(--green-700)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: "var(--green-900)" }}>{a.title}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: "var(--green-500)" }}>{a.desc}</p>
                    </div>
                    <ChevronRight size={13} style={{ color: "var(--green-300)" }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ⑤ 客户案例 */}
          <div
            id="section-cases"
            className="mx-3 mt-3 rounded-2xl overflow-hidden"
            style={{ background: "var(--green-50)", boxShadow: "0 2px 16px rgba(27,67,50,0.08)" }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-4">
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--green-900)" }}>客户案例</p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--green-500)" }}>真实改变 · 有迹可循</p>
              </div>
              <button className="text-[11px] flex items-center gap-0.5" style={{ color: "var(--green-600)" }}>
                更多案例 <ChevronRight size={11} />
              </button>
            </div>

            <div className="px-4 pb-5 space-y-3">
              {cases.map((c, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4"
                  style={{ border: "1px solid var(--green-100)", boxShadow: "0 1px 6px rgba(27,67,50,0.06)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--green-800) 0%, var(--green-700) 100%)" }}
                    >
                      <span className="text-xs font-bold" style={{ color: "var(--green-100)" }}>{c.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--green-900)" }}>
                        {c.name} <span className="font-normal text-xs" style={{ color: "var(--green-500)" }}>{c.age}</span>
                      </p>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: "var(--green-50)", color: "var(--green-700)", border: "1px solid var(--green-200)" }}
                      >
                        {c.tag}
                      </span>
                    </div>
                  </div>
                  <div className="pl-3" style={{ borderLeft: "2px solid var(--green-300)" }}>
                    <p className="text-xs leading-relaxed italic" style={{ color: "var(--green-700)" }}>
                      &ldquo;{c.quote}&rdquo;
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "var(--green-800)", color: "var(--green-100)" }}
                    >
                      ✓ {c.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ⑥ 关于我们 */}
          <div
            id="section-about"
            className="mx-3 mt-3 rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 2px 16px rgba(27,67,50,0.10)" }}
          >
            {/* 深色头部 */}
            <div
              className="px-5 pt-5 pb-5"
              style={{ background: "linear-gradient(135deg, var(--green-900) 0%, var(--green-800) 100%)" }}
            >
              <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--green-400)" }}>关于我们</span>
              <p className="text-lg font-semibold text-white mt-1 mb-2">专注营养医学领域</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--green-400)", maxWidth: "280px" }}>
                以循证营养医学为核心，提供专业营养素、健康检测与天然食品，帮助每一位用户科学管理健康。
              </p>
            </div>
            {/* 数据 */}
            <div className="grid grid-cols-3 bg-white">
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
                  <span className="text-2xl font-bold" style={{ color: "var(--green-800)" }}>{s.value}</span>
                  <span className="text-[11px] mt-1" style={{ color: "var(--green-500)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
