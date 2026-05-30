import { NextRequest, NextResponse } from "next/server";
import { reseedTopics } from "@/lib/db";

export async function POST(req: NextRequest) {
  const pwd = req.headers.get("x-admin-password");
  if (pwd !== (process.env.ADMIN_PASSWORD || "huize2026")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const count = reseedTopics();
    return NextResponse.json({ ok: true, inserted: count });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
