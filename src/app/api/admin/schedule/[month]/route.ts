import { NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ month: string }> }) {
  const { month } = await params;
  const db = getDb();
  const days = db.prepare(
    `SELECT sd.*, t.title, t.pillar, t.audience_stage, t.hook, t.pain_point
     FROM schedule_days sd
     LEFT JOIN topics t ON sd.topic_id = t.id
     WHERE sd.month = ?
     ORDER BY sd.day_number`
  ).all(month);
  return NextResponse.json(days);
}
