"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { initMonth } from "@/app/actions";
import AssignModal from "./AssignModal";
import { STATUS_DOT, PILLAR_COLORS } from "@/lib/types";
import type { DayStatus, Pillar, AudienceStage } from "@/lib/types";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface DayWithTopic { id: number; month: string; day_number: number; topic_id: number | null; status: DayStatus; title?: string; pillar?: Pillar; audience_stage?: AudienceStage; }

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

export default function MonthCalendar({ params }: { params: Promise<{ month: string }> }) {
  const [month, setMonth] = useState("");
  const [days, setDays] = useState<DayWithTopic[]>([]);
  const [assignDay, setAssignDay] = useState<number | null>(null);
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

  const assigningDay = days.find((d) => d.day_number === assignDay);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(`/admin/schedule/${prevMonth(month)}`)}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">
            {year}年{m}月
          </h1>
          <button
            onClick={() => router.push(`/admin/schedule/${nextMonth(month)}`)}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="text-sm text-slate-500">
          {days.filter((d) => d.topic_id).length}/{daysInMonth} 已分配
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-slate-100">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-2 text-center text-xs font-medium text-slate-400">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
          {cells.map((day, idx) => {
            if (!day) return <div key={idx} className="bg-slate-50/50 min-h-[80px]" />;

            const isToday = isCurrentMonth && day.day_number === todayDate;
            const hasTopic = !!day.topic_id;

            return (
              <div
                key={idx}
                className={`min-h-[80px] p-1.5 flex flex-col ${isToday ? "bg-green-50" : "hover:bg-slate-50"} transition-colors relative group`}
              >
                {/* Day number */}
                <div className={`text-xs font-medium mb-1 w-5 h-5 flex items-center justify-center rounded-full ${isToday ? "bg-green-700 text-white" : "text-slate-500"}`}>
                  {day.day_number}
                </div>

                {hasTopic ? (
                  <Link
                    href={`/admin/schedule/${month}/${String(day.day_number).padStart(2, "0")}`}
                    className="flex-1 flex flex-col"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[day.status]}`} />
                    </div>
                    {day.pillar && (
                      <span className={`text-xs px-1.5 py-0.5 rounded mb-1 border leading-tight inline-block max-w-full truncate ${PILLAR_COLORS[day.pillar as Pillar]}`}>
                        {day.pillar}
                      </span>
                    )}
                    <p className="text-xs text-slate-700 leading-tight line-clamp-2">
                      {(day as { title?: string }).title}
                    </p>
                  </Link>
                ) : (
                  <button
                    onClick={() => setAssignDay(day.day_number)}
                    className="flex-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center hover:border-green-500 hover:text-green-600 transition-colors">
                      <Plus size={12} />
                    </div>
                  </button>
                )}

                {/* Edit button on hover for assigned days */}
                {hasTopic && (
                  <button
                    onClick={() => setAssignDay(day.day_number)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600"
                  >
                    <Plus size={10} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3 text-xs text-slate-500">
        {[
          { color: "bg-slate-300", label: "选题已定" },
          { color: "bg-blue-400", label: "脚本完成" },
          { color: "bg-amber-400", label: "拍摄完成" },
          { color: "bg-green-500", label: "已发布" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${color}`} />
            {label}
          </div>
        ))}
      </div>

      {/* Assign Modal */}
      {assignDay !== null && (
        <AssignModal
          month={month}
          dayNumber={assignDay}
          currentTopicId={assigningDay?.topic_id || undefined}
          onClose={() => {
            setAssignDay(null);
            loadDays(month);
          }}
        />
      )}
    </div>
  );
}
