export type Pillar = "指标解读" | "用药问题" | "饮食禁忌" | "检查规划" | "情绪心理" | "医患沟通";
export type AudienceStage = "备孕期" | "孕早期" | "孕中晚期" | "产后";
export type TopicStatus = "draft" | "approved" | "archived";
export type DayStatus = "planned" | "scripted" | "filmed" | "published";

export interface Topic {
  id: number;
  title: string;
  pain_point: string | null;
  pillar: Pillar;
  audience_stage: AudienceStage;
  hook: string | null;
  notes: string | null;
  status: TopicStatus;
  created_at: string;
}

export interface ScheduleDay {
  id: number;
  month: string;
  day_number: number;
  topic_id: number | null;
  status: DayStatus;
  topic?: Topic;
}

export interface Script {
  id: number;
  schedule_day_id: number;
  weixin_script: string | null;
  weixin_title: string | null;
  weixin_cover: string | null;
  xhs_script: string | null;
  xhs_title: string | null;
  xhs_tags: string | null;
  shoot_tips: string | null;
  created_at: string;
  updated_at: string;
}

export interface PublishCopy {
  id: number;
  schedule_day_id: number;
  weixin_caption: string | null;
  weixin_tags: string | null;
  xhs_caption: string | null;
  xhs_tags: string | null;
  best_time: string | null;
  created_at: string;
}

export const PILLARS: Pillar[] = ["指标解读", "用药问题", "饮食禁忌", "检查规划", "情绪心理", "医患沟通"];
export const STAGES: AudienceStage[] = ["备孕期", "孕早期", "孕中晚期", "产后"];

export const PILLAR_COLORS: Record<Pillar, string> = {
  "指标解读": "bg-blue-50 text-blue-700 border-blue-200",
  "用药问题": "bg-violet-50 text-violet-700 border-violet-200",
  "饮食禁忌": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "检查规划": "bg-orange-50 text-orange-700 border-orange-200",
  "情绪心理": "bg-pink-50 text-pink-700 border-pink-200",
  "医患沟通": "bg-cyan-50 text-cyan-700 border-cyan-200",
};

export const STAGE_COLORS: Record<AudienceStage, string> = {
  "备孕期": "bg-rose-50 text-rose-700",
  "孕早期": "bg-amber-50 text-amber-700",
  "孕中晚期": "bg-teal-50 text-teal-700",
  "产后": "bg-sky-50 text-sky-700",
};

export const STATUS_LABELS: Record<DayStatus, string> = {
  planned: "选题已定",
  scripted: "脚本完成",
  filmed: "拍摄完成",
  published: "已发布",
};

export const STATUS_COLORS: Record<DayStatus, string> = {
  planned: "bg-slate-100 text-slate-600",
  scripted: "bg-blue-50 text-blue-700",
  filmed: "bg-amber-50 text-amber-700",
  published: "bg-green-50 text-green-700",
};

export const STATUS_DOT: Record<DayStatus, string> = {
  planned: "bg-slate-300",
  scripted: "bg-blue-400",
  filmed: "bg-amber-400",
  published: "bg-green-500",
};
