import Link from "next/link";
import getDb from "@/lib/db";
import { STATUS_DOT } from "@/lib/types";
import type { ScheduleDay } from "@/lib/types";
import { CalendarDays, BookOpen, Sparkles } from "lucide-react";

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function getThisWeekDays(): number[] {
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

  const weekDayNumbers = getThisWeekDays();
  const weekDays = weekDayNumbers.map((n) => days.find((d) => d.day_number === n)).filter(Boolean);

  const today = new Date().getDate();

  const stats = [
    { label: "已分配选题", value: withTopic, colorClass: "text-[var(--green-800)]" },
    { label: "脚本完成", value: scripted, colorClass: "text-blue-700" },
    { label: "拍摄完成", value: filmed, colorClass: "text-amber-700" },
    { label: "已发布", value: published, colorClass: "text-[var(--green-700)]" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase mb-2 text-[var(--green-700)]">内容总览</p>
        <h1 className="text-2xl font-light text-gray-900">
          {y}年<span className="font-semibold text-[var(--green-800)]">{m}月</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">共 {total} 天内容计划</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map(({ label, value, colorClass }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-5 border border-[var(--green-100)]"
          >
            <div className={`text-2xl font-semibold ${colorClass}`}>{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            <div className="mt-3 h-1 rounded-full overflow-hidden bg-[var(--green-100)]">
              <div
                className="h-full rounded-full bg-[var(--green-500)] transition-all"
                style={{ width: total > 0 ? `${(value / total) * 100}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* This week */}
      <div className="bg-white rounded-2xl mb-4 overflow-hidden border border-[var(--green-100)]">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--green-100)]">
          <h2 className="text-sm font-semibold text-gray-700">本周内容</h2>
          <Link
            href={`/admin/schedule/${month}`}
            className="text-xs text-[var(--green-700)] hover:text-[var(--green-900)] transition-colors"
          >
            查看全月 →
          </Link>
        </div>
        <div className="grid grid-cols-7 divide-x divide-[var(--green-100)]">
          {["一", "二", "三", "四", "五", "六", "日"].map((d) => (
            <div key={d} className="text-center py-2 text-xs text-gray-400">{d}</div>
          ))}
          {weekDays.map((day) => {
            if (!day) return (
              <div key={Math.random()} className="p-2 bg-[var(--green-50)]" />
            );
            const isToday = day.day_number === today;
            return (
              <Link
                key={day.day_number}
                href={`/admin/schedule/${month}/${String(day.day_number).padStart(2, "0")}`}
                className={`p-2 text-center transition-colors hover:bg-[var(--green-50)] ${isToday ? "bg-[var(--green-50)]" : ""}`}
              >
                <div className={`text-xs font-medium mb-1 ${isToday ? "text-[var(--green-700)]" : "text-gray-700"}`}>
                  {day.day_number}
                </div>
                {day.topic_id ? (
                  <>
                    <div className="flex justify-center mb-1">
                      <span className={`w-2 h-2 rounded-full ${STATUS_DOT[day.status]}`} />
                    </div>
                    <div className="text-xs text-gray-500 leading-tight line-clamp-2 hidden md:block">
                      {(day as { title?: string }).title}
                    </div>
                  </>
                ) : (
                  <div className="text-xs text-gray-300">—</div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            href: "/admin/topics",
            label: "选题库",
            desc: `${topicCount} 条已审批`,
            icon: BookOpen,
            iconColor: "text-[var(--green-700)]",
          },
          {
            href: `/admin/schedule/${month}`,
            label: "本月排期",
            desc: `${withTopic}/${total} 已分配`,
            icon: CalendarDays,
            iconColor: "text-amber-600",
          },
          {
            href: "/admin/generate",
            label: "AI 生成",
            desc: "生成脚本/文案",
            icon: Sparkles,
            iconColor: "text-violet-600",
          },
        ].map(({ href, label, desc, icon: Icon, iconColor }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-5 border border-[var(--green-100)] hover:border-[var(--green-300)] hover:shadow-sm transition-all"
          >
            <Icon size={20} className={`${iconColor} mb-2.5`} />
            <div className="text-sm font-medium text-gray-800">{label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
