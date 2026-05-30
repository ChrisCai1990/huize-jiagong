import Link from "next/link";
import getDb from "@/lib/db";
import { STATUS_LABELS, STATUS_COLORS, STATUS_DOT, PILLAR_COLORS, STAGE_COLORS } from "@/lib/types";
import type { ScheduleDay, Topic } from "@/lib/types";
import { CalendarDays, BookOpen, Sparkles } from "lucide-react";

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function getThisWeekDays(month: string): number[] {
  const now = new Date();
  const dayOfMonth = now.getDate();
  const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
  const weekStart = dayOfMonth - dayOfWeek + 1;
  return Array.from({ length: 7 }, (_, i) => weekStart + i).filter((d) => d >= 1 && d <= 31);
}

export default function AdminDashboard() {
  const db = getDb();
  const month = getCurrentMonth();
  const [y, m] = month.split("-");

  const days = db
    .prepare(
      `SELECT sd.*, t.title, t.pillar, t.audience_stage
       FROM schedule_days sd
       LEFT JOIN topics t ON sd.topic_id = t.id
       WHERE sd.month = ?
       ORDER BY sd.day_number`
    )
    .all(month) as (ScheduleDay & { title?: string; pillar?: string; audience_stage?: string })[];

  const total = days.length;
  const scripted = days.filter((d) => d.status === "scripted" || d.status === "filmed" || d.status === "published").length;
  const filmed = days.filter((d) => d.status === "filmed" || d.status === "published").length;
  const published = days.filter((d) => d.status === "published").length;
  const withTopic = days.filter((d) => d.topic_id).length;

  const topicCount = (db.prepare("SELECT COUNT(*) as c FROM topics WHERE status='approved'").get() as { c: number }).c;

  const weekDayNumbers = getThisWeekDays(month);
  const weekDays = weekDayNumbers.map((n) => days.find((d) => d.day_number === n)).filter(Boolean);

  const today = new Date().getDate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">总览</h1>
        <p className="text-slate-500 text-sm mt-1">
          {y}年{m}月 · 共{total}天内容
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "已分配选题", value: withTopic, total, color: "text-slate-700" },
          { label: "脚本完成", value: scripted, total, color: "text-blue-700" },
          { label: "拍摄完成", value: filmed, total, color: "text-amber-700" },
          { label: "已发布", value: published, total, color: "text-green-700" },
        ].map(({ label, value, total, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: total > 0 ? `${(value / total) * 100}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* This week */}
      <div className="bg-white rounded-xl border border-slate-200 mb-4">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">本周内容</h2>
          <Link
            href={`/admin/schedule/${month}`}
            className="text-xs text-green-700 hover:text-green-800"
          >
            查看全月 →
          </Link>
        </div>
        <div className="grid grid-cols-7 divide-x divide-slate-100">
          {["一", "二", "三", "四", "五", "六", "日"].map((d) => (
            <div key={d} className="text-center py-1.5 text-xs text-slate-400">{d}</div>
          ))}
          {weekDays.map((day) => {
            if (!day) return <div key={Math.random()} className="p-2 bg-slate-50" />;
            const isToday = day.day_number === today;
            return (
              <Link
                key={day.day_number}
                href={`/admin/schedule/${month}/${String(day.day_number).padStart(2, "0")}`}
                className={`p-2 text-center hover:bg-slate-50 transition-colors ${isToday ? "bg-green-50" : ""}`}
              >
                <div className={`text-xs font-medium mb-1 ${isToday ? "text-green-700" : "text-slate-700"}`}>
                  {day.day_number}
                </div>
                {day.topic_id ? (
                  <>
                    <div className="flex justify-center mb-1">
                      <span className={`w-2 h-2 rounded-full ${STATUS_DOT[day.status]}`} />
                    </div>
                    <div className="text-xs text-slate-500 leading-tight line-clamp-2 hidden md:block">
                      {(day as { title?: string }).title}
                    </div>
                  </>
                ) : (
                  <div className="text-xs text-slate-300">—</div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { href: "/admin/topics", label: "选题库", desc: `${topicCount} 条已审批`, icon: BookOpen, color: "text-blue-600" },
          { href: `/admin/schedule/${month}`, label: "本月排期", desc: `${withTopic}/${total} 已分配`, icon: CalendarDays, color: "text-amber-600" },
          { href: "/admin/generate", label: "AI 生成", desc: "生成脚本/文案", icon: Sparkles, color: "text-violet-600" },
        ].map(({ href, label, desc, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-colors"
          >
            <Icon size={20} className={`${color} mb-2`} />
            <div className="text-sm font-medium text-slate-800">{label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
