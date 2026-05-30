"use client";

import { useState, useEffect } from "react";
import { NewTopicButton, TopicCard } from "./TopicModal";
import { PILLARS, STAGES, PILLAR_COLORS, STAGE_COLORS } from "@/lib/types";
import type { Topic, Pillar, AudienceStage } from "@/lib/types";
import { Search } from "lucide-react";

async function fetchTopics() {
  const res = await fetch("/api/admin/topics", { cache: "no-store" });
  return res.json() as Promise<Topic[]>;
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState<Pillar | "全部">("全部");
  const [stage, setStage] = useState<AudienceStage | "全部">("全部");

  useEffect(() => {
    fetchTopics().then(setTopics);
  }, []);

  const filtered = topics.filter((t) => {
    if (pillar !== "全部" && t.pillar !== pillar) return false;
    if (stage !== "全部" && t.audience_stage !== stage) return false;
    if (search && !t.title.includes(search) && !(t.pain_point || "").includes(search)) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">选题库</h1>
          <p className="text-slate-500 text-sm mt-1">共 {topics.filter(t => t.status === 'approved').length} 条已审批选题</p>
        </div>
        <NewTopicButton />
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索话题或痛点…"
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(["全部", ...PILLARS] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPillar(p as Pillar | "全部")}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                pillar === p
                  ? "bg-slate-800 text-white border-slate-800"
                  : p === "全部"
                  ? "border-slate-200 text-slate-600 hover:bg-slate-50"
                  : `${PILLAR_COLORS[p as Pillar]} hover:opacity-80`
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(["全部", ...STAGES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStage(s as AudienceStage | "全部")}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                stage === s
                  ? "bg-slate-800 text-white"
                  : s === "全部"
                  ? "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  : `${STAGE_COLORS[s as AudienceStage]} hover:opacity-80`
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-sm">没有匹配的选题</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
}
