"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { initMonth } from "@/app/actions";
import AssignModal from "./AssignModal";
import { STATUS_DOT, PILLAR_COLORS } from "@/lib/types";
import { buildWeekScriptPrompt } from "@/lib/prompts";
import type { DayStatus, Pillar, AudienceStage } from "@/lib/types";
import { ChevronLeft, ChevronRight, Plus, Copy, CheckCheck, Zap } from "lucide-react";

interface DayWithTopic {
  id: number;
  month: string;
  day_number: number;
  topic_id: number | null;
  status: DayStatus;
  title?: string;
  pillar?: Pillar;
  audience_stage?: AudienceStage;
  hook?: string | null;
  pain_point?: string | null;
}

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];

function getMonthInfo(month: string) {
  const [year, m] = month.split("-").map(Number);
  const firstDay = new Date(year, m - 1, 1);
  const daysInMonth = new Date(year, m, 0).getDate();
  let startOffset = firstDay.getDay();
  if (startOffset === 0) startOffset = 7;
  startOffset -= 1;
  return { year, month: m, daysInMonth, startOffset };
}

function prevMonth(month: string) {
  const [y, m] = month.split("-").map(Number);
  if (m === 1) return `${y - 1}-12`;
  return `${y}-${String(m - 1).padStart(2, "0")}`;
}

function nextMonth(month: string) {
  const [y, m] = month.split("-").map(Number);
  if (m === 12) return `${y + 1}-01`;
  return `${y}-${String(m + 1).padStart(2, "0")}`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs rounded-lg transition-colors shrink-0"
      style={{ background: "var(--green-700)" }}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--green-800)")}
      onMouseLeave={e => (e.currentTarget.style.background = "var(--green-700)")}
    >
      {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
      {copied ? "已复制！" : "复制提示词"}
    </button>
  );
}

export default function MonthCalendar({ params }: { params: Promise<{ month: string }> }) {
  const [month, setMonth] = useState("");
  const [days, setDays] = useState<DayWithTopic[]>([]);
  const [assignDay, setAssignDay] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then(({ month: m }) => {
      setMonth(m);
      loadDays(m);
    });
  }, [params]);

  async function loadDays(m: string) {
    const res = await fetch(`/api/admin/schedule/${m}`, { cache: "no-store" });
    const data = await res.json();
    if (data.length === 0) {
      await initMonth(m);
      const res2 = await fetch(`/api/admin/schedule/${m}`, { cache: "no-store" });
      setDays(await res2.json());
    } else {
      setDays(data);
    }
  }

  if (!month) return null;

  const { year, month: m, daysInMonth, startOffset } = getMonthInfo(month);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === m;
  const todayDate = today.getDate();

  const cells: (DayWithTopic | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const dayNum = i + 1;
      return days.find((d) => d.day_number === dayNum) || { day_number: dayNum, month, status: "planned" } as DayWithTopic;
    }),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (DayWithTopic | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const assigningDay = days.find((d) => d.day_number === assignDay);

  const weekPrompt = (() => {
    if (selectedWeek === null) return "";
    const weekDays = (weeks[selectedWeek] ?? [])
      .filter((d): d is DayWithTopic => !!d && !!d.topic_id && !!d.title)
      .map((d) => ({
        day_number: d.day_number,
        title: d.title!,
        pillar: d.pillar ?? "",
        audience_stage: d.audience_stage ?? "",
        pain_point: d.pain_point,
        hook: d.hook,
      }));
    if (weekDays.length === 0) return "";
    return buildWeekScriptPrompt(weekDays);
  })();

  function weekLabel(week: (DayWithTopic | null)[], weekIdx: number) {
    const real = week.filter(Boolean) as DayWithTopic[];
    if (real.length === 0) return `第${weekIdx + 1}周`;
    return `第${weekIdx + 1}周（${m}/${real[0].day_number}–${real[real.length - 1].day_number}）`;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/admin/schedule/${prevMonth(month)}`)}
            className="p-1.5 rounded-lg transition-colors border border-[var(--green-200)] hover:bg-[var(--green-50)]"
          >
            <ChevronLeft size={14} />
          </button>
          <h1 className="text-base font-semibold text-gray-800">
            {year}年{m}月
          </h1>
          <button
            onClick={() => router.push(`/admin/schedule/${nextMonth(month)}`)}
            className="p-1.5 rounded-lg transition-colors border border-[var(--green-200)] hover:bg-[var(--green-50)]"
          >
            <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-3 text-xs text-gray-400">
            {[
              { color: "bg-gray-300", label: "选题已定" },
              { color: "bg-blue-400", label: "脚本完成" },
              { color: "bg-amber-400", label: "拍摄完成" },
              { color: "bg-green-500", label: "已发布" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                {label}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-400">
            {days.filter((d) => d.topic_id).length}/{daysInMonth} 已分配
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl overflow-hidden border border-[var(--green-100)]">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-[var(--green-100)]">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-2 text-center text-xs font-medium text-gray-400">{d}</div>
          ))}
        </div>

        {/* Week rows */}
        <div>
          {weeks.map((week, weekIdx) => {
            const assignedInWeek = week.filter((d): d is DayWithTopic => !!d && !!d.topic_id);
            const isSelected = selectedWeek === weekIdx;

            return (
              <div
                key={weekIdx}
                className="grid grid-cols-7 relative group/week"
                style={{
                  borderBottom: weekIdx < weeks.length - 1 ? "1px solid var(--green-100)" : "none",
                  background: isSelected ? "var(--green-50)" : "transparent",
                }}
              >
                {week.map((day, dayIdx) => {
                  if (!day) return (
                    <div
                      key={dayIdx}
                      className="min-h-[68px]"
                      style={{
                        background: "var(--green-50)",
                        borderRight: dayIdx < 6 ? "1px solid var(--green-100)" : "none",
                      }}
                    />
                  );

                  const isToday = isCurrentMonth && day.day_number === todayDate;
                  const hasTopic = !!day.topic_id;

                  return (
                    <div
                      key={dayIdx}
                      className="min-h-[68px] p-1.5 flex flex-col relative group transition-colors"
                      style={{
                        borderRight: dayIdx < 6 ? "1px solid var(--green-100)" : "none",
                        background: isToday ? "var(--green-50)" : "transparent",
                      }}
                      onMouseEnter={e => { if (!isToday) e.currentTarget.style.background = "var(--green-50)"; }}
                      onMouseLeave={e => { if (!isToday) e.currentTarget.style.background = isSelected ? "var(--green-50)" : "transparent"; }}
                    >
                      {/* Day number */}
                      <div
                        className="text-xs font-medium mb-1 w-5 h-5 flex items-center justify-center rounded-full"
                        style={isToday
                          ? { background: "var(--green-700)", color: "white" }
                          : { color: "#9ca3af" }
                        }
                      >
                        {day.day_number}
                      </div>

                      {hasTopic ? (
                        <Link href={`/admin/schedule/${month}/${String(day.day_number).padStart(2, "0")}`} className="flex-1 flex flex-col">
                          <div className="flex items-center gap-1 mb-1">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[day.status]}`} />
                          </div>
                          {day.pillar && (
                            <span className={`text-xs px-1 py-0.5 rounded mb-1 border leading-tight inline-block max-w-full truncate ${PILLAR_COLORS[day.pillar as Pillar]}`} style={{ fontSize: "10px" }}>
                              {day.pillar}
                            </span>
                          )}
                          <p className="text-gray-700 leading-tight line-clamp-2" style={{ fontSize: "11px" }}>
                            {(day as { title?: string }).title}
                          </p>
                        </Link>
                      ) : (
                        <button
                          onClick={() => setAssignDay(day.day_number)}
                          className="flex-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <div
                            className="w-5 h-5 rounded-full border-2 border-dashed flex items-center justify-center transition-colors"
                            style={{ borderColor: "var(--green-300)", color: "var(--green-500)" }}
                          >
                            <Plus size={10} />
                          </div>
                        </button>
                      )}

                      {hasTopic && (
                        <button
                          onClick={() => setAssignDay(day.day_number)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4 rounded bg-white flex items-center justify-center text-gray-400 hover:text-gray-600"
                          style={{ border: "1px solid var(--green-200)" }}
                        >
                          <Plus size={8} />
                        </button>
                      )}
                    </div>
                  );
                })}

                {/* Week generate button */}
                {assignedInWeek.length > 0 && (
                  <button
                    onClick={() => setSelectedWeek(isSelected ? null : weekIdx)}
                    title={`生成第${weekIdx + 1}周文案提示词`}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all z-10 opacity-0 group-hover/week:opacity-100"
                    style={isSelected
                      ? { background: "var(--green-700)", color: "white", opacity: 1 }
                      : { background: "white", color: "var(--green-700)", border: "1px solid var(--green-200)" }
                    }
                  >
                    <Zap size={10} />
                    {assignedInWeek.length}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <div className="flex items-center gap-1 text-gray-300 text-xs">
          <Zap size={10} />
          <span>hover 周行生成提示词</span>
        </div>
      </div>

      {/* Week prompt panel */}
      {selectedWeek !== null && (
        <div className="mt-4 bg-white rounded-xl overflow-hidden border border-[var(--green-200)]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--green-100)]" style={{ background: "var(--green-50)" }}>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {weekLabel(weeks[selectedWeek] ?? [], selectedWeek)} · 批量脚本提示词
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {(weeks[selectedWeek] ?? []).filter((d): d is DayWithTopic => !!d && !!d.topic_id).length} 条 · 复制后粘贴到 Claude.ai
              </p>
            </div>
            <div className="flex items-center gap-2">
              {weekPrompt ? <CopyButton text={weekPrompt} /> : <span className="text-xs text-gray-400">本周暂无已分配选题</span>}
              <button
                onClick={() => setSelectedWeek(null)}
                className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-[var(--green-100)] transition-colors text-sm leading-none"
              >
                ×
              </button>
            </div>
          </div>
          {weekPrompt && (
            <pre className="p-4 text-xs text-gray-600 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
              {weekPrompt}
            </pre>
          )}
        </div>
      )}

      {/* Assign Modal */}
      {assignDay !== null && (
        <AssignModal
          month={month}
          dayNumber={assignDay}
          currentTopicId={assigningDay?.topic_id || undefined}
          onClose={() => { setAssignDay(null); loadDays(month); }}
        />
      )}
    </div>
  );
}
