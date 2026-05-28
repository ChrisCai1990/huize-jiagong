"use client";

import { useState, useEffect } from "react";
import {
  Search, ShoppingCart, ChevronRight,
  Pill, Activity, Heart, BookOpen, PlayCircle, Lightbulb, Users, Grid3x3,
  ClipboardList, Zap, BarChart2,
} from "lucide-react";

/* ─── 数据 ─── */
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

const steps = [
  { icon: Activity,      num: "01", label: "精准检测", desc: "全面了解身体营养现状与健康风险" },
  { icon: ClipboardList, num: "02", label: "专业分析", desc: "营养师解读报告，制定个性化方案" },
  { icon: Pill,          num: "03", label: "靶向补充", desc: "精准补充所需营养素，持续跟踪效果" },
];

const articles = [
  { icon: Lightbulb, title: "什么是营养素缺乏？",      desc: "90% 的人都不知道自己缺什么",     featured: true },
  { icon: Activity,  title: "甲状腺与营养素的关系",    desc: "硒、碘、锌如何影响甲功" },
  { icon: Zap,       title: "维生素 D 缺乏有多普遍？", desc: "中国人最普遍缺乏的营养素" },
  { icon: BarChart2, title: "检测报告怎么看？",         desc: "手把手教你读懂营养检测结果" },
];

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

/* ─── 页面 ─── */
export default function YouzanPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.querySelector(".youzan-scroll");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 20);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#e8ede9" }}>
      <div className="max-w-[390px] mx-auto min-h-screen flex flex-col bg-white relative">

        {/* ── Header ── */}
        <header
          className="flex items-center justify-between px-5 py-3 sticky top-0 z-20 transition-all duration-300"
          style={{
            background: scrolled ? "rgba(255,255,255,0.96)" : "white",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: `1px solid var(--green-100)`,
            boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
          }}
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

        <main className="flex-1 pb-16 youzan-scroll overflow-y-auto">

          {/* ── Hero ── */}
          <section id="section-hero" className="px-5 pt-8 pb-6 bg-white">
            <span
              className="inline-block text-[10px] tracking-widest uppercase border rounded-full px-3 py-1 mb-5"
              style={{ color: "var(--green-700)", borderColor: "var(--green-300)", background: "var(--green-50)" }}
            >
              自身免疫 · 营养医学 · 健康检测
            </span>

            <h1 className="text-[28px] font-light text-gray-900 leading-snug mb-3">
              重新认识<br />
              <span className="font-semibold" style={{ color: "var(--green-800)" }}>甲状腺健康</span>
            </h1>

            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-[280px]">
              以循证营养医学为核心，帮助桥本、甲减患者系统改善症状、恢复活力。
            </p>

            <div className="flex gap-3 mb-7">
              <button
                className="text-sm text-white px-6 py-2.5 rounded-full"
                style={{ background: "var(--green-700)" }}
              >
                了解服务
              </button>
              <button
                className="text-sm px-6 py-2.5 rounded-full border"
                style={{ color: "var(--green-800)", borderColor: "var(--green-300)" }}
              >
                预约咨询
              </button>
            </div>

            {/* 数据统计 */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { num: "3000+", label: "服务案例" },
                { num: "8年+",  label: "专注自免领域" },
                { num: "95%",   label: "症状改善率" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-3 text-center border"
                  style={{ background: "var(--green-50)", borderColor: "var(--green-100)" }}
                >
                  <div className="text-lg font-semibold" style={{ color: "var(--green-800)" }}>{s.num}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* 方法卡 */}
            <div className="rounded-2xl p-5 text-white" style={{ background: "var(--green-900)" }}>
              <div className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "var(--green-300)" }}>
                我们的方法
              </div>
              <div className="space-y-2.5">
                {[
                  "不只看指标，寻找症状背后的根本原因",
                  "个性化营养方案，靶向调节免疫与甲状腺",
                  "全程陪伴，定期追踪指标变化",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs" style={{ color: "var(--green-100)" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--green-500)" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 提示条 */}
            <div
              className="mt-3 rounded-2xl px-4 py-3 border flex items-center gap-3"
              style={{ background: "var(--green-50)", borderColor: "var(--green-100)" }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] text-white"
                style={{ background: "var(--green-500)" }}
              >
                ✓
              </div>
              <p className="text-xs text-gray-500">首次咨询免费评估，1个工作日内回复</p>
            </div>
          </section>

          {/* ── 分类 ── */}
          <section id="section-categories" className="px-5 py-5 bg-white" style={{ borderTop: "1px solid var(--green-100)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--green-700)" }}>商品分类</span>
              <button className="text-xs flex items-center gap-0.5 text-gray-400">
                全部 <ChevronRight size={11} />
              </button>
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
          </section>

          {/* ── 科学方法 ── */}
          <section id="section-steps" className="px-5 py-6" style={{ background: "var(--green-50)", borderTop: "1px solid var(--green-100)" }}>
            <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--green-700)" }}>科学方法</span>
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
          </section>

          {/* ── 健康科普 ── */}
          <section id="section-articles" className="px-5 py-6 bg-white" style={{ borderTop: "1px solid var(--green-100)" }}>
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
              className="rounded-2xl p-4 border mb-3"
              style={{
                background: "var(--green-50)",
                borderColor: "var(--green-100)",
                borderLeft: "3px solid var(--green-400)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="text-[9px] border rounded-full px-2 py-0.5"
                  style={{ color: "var(--green-700)", borderColor: "var(--green-200)", background: "white" }}
                >
                  精选
                </span>
                <span className="text-sm font-medium text-gray-800">{articles[0].title}</span>
              </div>
              <p className="text-xs text-gray-400">{articles[0].desc}</p>
            </div>

            {/* 列表 */}
            <div className="divide-y" style={{ borderColor: "var(--green-100)" }}>
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
          </section>

          {/* ── 成功案例 ── */}
          <section id="section-cases" className="px-5 py-6" style={{ background: "var(--green-50)", borderTop: "1px solid var(--green-100)" }}>
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
          </section>

          {/* ── 关于我们 ── */}
          <section id="section-about" className="bg-white" style={{ borderTop: "1px solid var(--green-100)" }}>
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
                { value: "3000+", label: "服务案例" },
                { value: "8年+",  label: "专注领域" },
                { value: "95%",   label: "症状改善率" },
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
          </section>

          {/* ── 底部 CTA ── */}
          <section
            className="px-5 py-8 text-center"
            style={{ background: "var(--green-50)", borderTop: "1px solid var(--green-100)" }}
          >
            <p className="text-xs text-gray-400 mb-4">首次咨询免费评估 · 1个工作日内回复</p>
            <button
              className="w-full text-sm text-white py-3 rounded-full"
              style={{ background: "var(--green-700)" }}
            >
              加微信咨询
            </button>
          </section>

        </main>
      </div>
    </div>
  );
}
