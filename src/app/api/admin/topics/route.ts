import { NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET() {
  const db = getDb();
  const topics = db.prepare("SELECT * FROM topics ORDER BY created_at DESC").all();
  return NextResponse.json(topics);
}
