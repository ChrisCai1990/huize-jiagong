import Link from "next/link";
import { notFound } from "next/navigation";
import getDb from "@/lib/db";
import { PILLAR_COLORS, STAGE_COLORS, STATUS_LABELS, STATUS_COLORS } from "@/lib/types";
import type { Topic, Script, PublishCopy, DayStatus, Pillar, AudienceStage } from "@/lib/types";

interface DayRow {
  id: number;
  month: string;
  day_number: number;
  topic_id: number | null;
  status: DayStatus;
  title?: string;
  pain_point?: string;
  pillar?: Pillar;
  audience_stage?: AudienceStage;
  hook?: string;
  notes?: string;
}
import { buildScriptPrompt, buildPublishPrompt } from "@/lib/prompts";
import ScriptEditor from "./ScriptEditor";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ month: string; day: string }>;
}

export default async function DayDetailPage({ params }: PageProps) {
  const { month, day } = await params;
  const dayNumber = parseInt(day, 10);

  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 31) notFound();

  const db = getDb();

  const scheduleDay = db.prepare(
    `SELECT sd.*, t.id as topic_id, t.title, t.pain_point, t.pillar, t.audience_stage, t.hook, t.notes
     FROM schedule_days sd
     LEFT JOIN topics t ON sd.topic_id = t.id
     WHERE sd.month = ? AND sd.day_number = ?`
  ).get(month, dayNumber) as DayRow | null;

  if (!scheduleDay) notFound();

  const script = db.prepare(
    "SELECT * FROM scripts WHERE schedule_day_id = ?"
  ).get(scheduleDay.id) as Script | null;

  const publishCopy = db.prepare(
    "SELECT * FROM publish_copies WHERE schedule_day_id = ?"
  ).get(scheduleDay.id) as PublishCopy | null;

  const [y, m] = month.split("-").map(Number);
  const daysInMonth = new Date(y, m, 0).getDate();
  const prevDay = dayNumber > 1 ? String(dayNumber - 1).padStart(2, "0") : null;
  const nextDay = dayNumber < daysInMonth ? String(dayNumber + 1).padStart(2, "0") : null;

  const topic = scheduleDay.topic_id ? {
    id: scheduleDay.topic_id,
    title: scheduleDay.title || "",
    pain_point: scheduleDay.pain_point || null,
    pillar: scheduleDay.pillar!,
    audience_stage: scheduleDay.audience_stage!,
    hook: scheduleDay.hook || null,
    notes: scheduleDay.notes || null,
    status: "approved" as const,
    created_at: "",
  } as Topic : null;

  const scriptPrompt = topic ? buildScriptPrompt(topic) : "";
  const publishPrompt = topic && script ? buildPublishPrompt(topic, script) : "";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb & Nav */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/admin/schedule" className="hover:text-gray-800 transition-colors">排期</Link>
          <span className="text-gray-300">›</span>
          <Link href={`/admin/schedule/${month}`} className="hover:text-gray-800 transition-colors">
            {y}年{m}月
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-800 font-medium">Day {String(dayNumber).padStart(2, "0")}</span>
        </div>
        <div className="flex items-center gap-1">
          {prevDay && (
            <Link
              href={`/admin/schedule/${month}/${prevDay}`}
              className="p-1.5 rounded-lg border border-[var(--green-200)] hover:bg-[var(--green-50)] transition-colors"
            >
              <ChevronLeft size={15} />
            </Link>
          )}
          {nextDay && (
            <Link
              href={`/admin/schedule/${month}/${nextDay}`}
              className="p-1.5 rounded-lg border border-[var(--green-200)] hover:bg-[var(--green-50)] transition-colors"
            >
              <ChevronRight size={15} />
            </Link>
          )}
        </div>
      </div>

      {/* Topic card */}
      {topic ? (
        <div className="bg-white rounded-2xl p-6 mb-5 border border-[var(--green-100)]">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${PILLAR_COLORS[topic.pillar]}`}>
              {topic.pillar}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STAGE_COLORS[topic.audience_stage]}`}>
              {topic.audience_stage}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ml-auto ${STATUS_COLORS[scheduleDay.status]}`}>
              {STATUS_LABELS[scheduleDay.status]}
            </span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900 mb-3">{topic.title}</h1>
          {topic.pain_point && (
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">核心痛点</span>
              <p className="text-sm text-gray-600 mt-0.5">{topic.pain_point}</p>
            </div>
          )}
          {topic.hook && (
            <div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">视频号开场钩子</span>
              <p className="text-sm text-gray-600 mt-0.5 italic">"{topic.hook}"</p>
            </div>
          )}
        </div>
      ) : (
        <div
          className="rounded-2xl p-10 text-center mb-5"
          style={{ background: "var(--green-50)", border: "2px dashed var(--green-200)" }}
        >
          <p className="text-gray-500 text-sm mb-3">本天尚未分配选题</p>
          <Link
            href={`/admin/schedule/${month}`}
            className="text-sm font-medium text-[var(--green-700)] hover:text-[var(--green-900)] transition-colors"
          >
            去排期页面分配 →
          </Link>
        </div>
      )}

      {/* Script editor */}
      {topic && (
        <ScriptEditor
          scheduleDayId={scheduleDay.id}
          month={month}
          dayNumber={dayNumber}
          status={scheduleDay.status}
          script={script}
          publishCopy={publishCopy}
          scriptPrompt={scriptPrompt}
          publishPrompt={publishPrompt}
        />
      )}
    </div>
  );
}
