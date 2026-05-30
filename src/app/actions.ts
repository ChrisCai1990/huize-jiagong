"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getDb from "@/lib/db";

// ─── Auth ───────────────────────────────────────────────────────────────────

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  const expected = process.env.ADMIN_PASSWORD || "huize2026";
  if (password !== expected) {
    redirect("/admin/login?error=1");
  }
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

// ─── Topics ─────────────────────────────────────────────────────────────────

export async function createTopic(formData: FormData) {
  const db = getDb();
  db.prepare(
    "INSERT INTO topics (title, pain_point, pillar, audience_stage, hook, notes, status) VALUES (?, ?, ?, ?, ?, ?, 'approved')"
  ).run(
    formData.get("title"),
    formData.get("pain_point") || null,
    formData.get("pillar"),
    formData.get("audience_stage"),
    formData.get("hook") || null,
    formData.get("notes") || null,
  );
  revalidatePath("/admin/topics");
}

export async function updateTopic(id: number, formData: FormData) {
  const db = getDb();
  db.prepare(
    "UPDATE topics SET title=?, pain_point=?, pillar=?, audience_stage=?, hook=?, notes=?, status=? WHERE id=?"
  ).run(
    formData.get("title"),
    formData.get("pain_point") || null,
    formData.get("pillar"),
    formData.get("audience_stage"),
    formData.get("hook") || null,
    formData.get("notes") || null,
    formData.get("status"),
    id,
  );
  revalidatePath("/admin/topics");
}

export async function deleteTopic(id: number) {
  const db = getDb();
  db.prepare("UPDATE schedule_days SET topic_id=NULL WHERE topic_id=?").run(id);
  db.prepare("DELETE FROM topics WHERE id=?").run(id);
  revalidatePath("/admin/topics");
}

// ─── Schedule ────────────────────────────────────────────────────────────────

export async function initMonth(month: string) {
  const db = getDb();
  const [year, m] = month.split("-").map(Number);
  const daysInMonth = new Date(year, m, 0).getDate();
  const insertDay = db.prepare(
    "INSERT OR IGNORE INTO schedule_days (month, day_number, status) VALUES (?, ?, 'planned')"
  );
  const init = db.transaction(() => {
    for (let d = 1; d <= daysInMonth; d++) insertDay.run(month, d);
  });
  init();
  revalidatePath(`/admin/schedule/${month}`);
}

export async function assignTopic(month: string, dayNumber: number, topicId: number) {
  const db = getDb();
  db.prepare(
    "UPDATE schedule_days SET topic_id=?, status='planned' WHERE month=? AND day_number=?"
  ).run(topicId, month, dayNumber);
  revalidatePath(`/admin/schedule/${month}`);
}

export async function removeTopic(month: string, dayNumber: number) {
  const db = getDb();
  db.prepare(
    "UPDATE schedule_days SET topic_id=NULL, status='planned' WHERE month=? AND day_number=?"
  ).run(month, dayNumber);
  revalidatePath(`/admin/schedule/${month}`);
}

export async function updateDayStatus(month: string, dayNumber: number, status: string) {
  const db = getDb();
  db.prepare(
    "UPDATE schedule_days SET status=? WHERE month=? AND day_number=?"
  ).run(status, month, dayNumber);
  revalidatePath(`/admin/schedule/${month}/${String(dayNumber).padStart(2, "0")}`);
  revalidatePath(`/admin/schedule/${month}`);
}

// ─── Script ──────────────────────────────────────────────────────────────────

export async function saveScript(
  scheduleDayId: number,
  month: string,
  dayNumber: number,
  data: {
    weixin_script?: string;
    weixin_title?: string;
    weixin_cover?: string;
    xhs_script?: string;
    xhs_title?: string;
    xhs_tags?: string;
    shoot_tips?: string;
  }
) {
  const db = getDb();
  const existing = db.prepare("SELECT id FROM scripts WHERE schedule_day_id=?").get(scheduleDayId);
  if (existing) {
    db.prepare(
      `UPDATE scripts SET weixin_script=?, weixin_title=?, weixin_cover=?,
       xhs_script=?, xhs_title=?, xhs_tags=?, shoot_tips=?,
       updated_at=CURRENT_TIMESTAMP WHERE schedule_day_id=?`
    ).run(
      data.weixin_script ?? null, data.weixin_title ?? null, data.weixin_cover ?? null,
      data.xhs_script ?? null, data.xhs_title ?? null, data.xhs_tags ?? null,
      data.shoot_tips ?? null, scheduleDayId
    );
  } else {
    db.prepare(
      `INSERT INTO scripts (schedule_day_id, weixin_script, weixin_title, weixin_cover,
       xhs_script, xhs_title, xhs_tags, shoot_tips) VALUES (?,?,?,?,?,?,?,?)`
    ).run(
      scheduleDayId,
      data.weixin_script ?? null, data.weixin_title ?? null, data.weixin_cover ?? null,
      data.xhs_script ?? null, data.xhs_title ?? null, data.xhs_tags ?? null,
      data.shoot_tips ?? null
    );
    db.prepare(
      "UPDATE schedule_days SET status='scripted' WHERE id=? AND status='planned'"
    ).run(scheduleDayId);
  }
  revalidatePath(`/admin/schedule/${month}/${String(dayNumber).padStart(2, "0")}`);
}

// ─── Publish Copy ────────────────────────────────────────────────────────────

export async function savePublishCopy(
  scheduleDayId: number,
  month: string,
  dayNumber: number,
  data: {
    weixin_caption?: string;
    weixin_tags?: string;
    xhs_caption?: string;
    xhs_tags?: string;
    best_time?: string;
  }
) {
  const db = getDb();
  const existing = db.prepare("SELECT id FROM publish_copies WHERE schedule_day_id=?").get(scheduleDayId);
  if (existing) {
    db.prepare(
      `UPDATE publish_copies SET weixin_caption=?, weixin_tags=?, xhs_caption=?, xhs_tags=?, best_time=? WHERE schedule_day_id=?`
    ).run(data.weixin_caption ?? null, data.weixin_tags ?? null, data.xhs_caption ?? null, data.xhs_tags ?? null, data.best_time ?? null, scheduleDayId);
  } else {
    db.prepare(
      `INSERT INTO publish_copies (schedule_day_id, weixin_caption, weixin_tags, xhs_caption, xhs_tags, best_time) VALUES (?,?,?,?,?,?)`
    ).run(scheduleDayId, data.weixin_caption ?? null, data.weixin_tags ?? null, data.xhs_caption ?? null, data.xhs_tags ?? null, data.best_time ?? null);
  }
  revalidatePath(`/admin/schedule/${month}/${String(dayNumber).padStart(2, "0")}`);
}
