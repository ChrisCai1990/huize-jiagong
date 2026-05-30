"use client";

import { useState, useEffect, useTransition } from "react";
import { NewTopicButton, TopicCard } from "./TopicModal";
import { PILLARS, STAGES, PILLAR_COLORS, STAGE_COLORS } from "@/lib/types";
import type { Topic, Pillar, AudienceStage } from "@/lib/types";
import { Search, RefreshCw } from "lucide-react";
import { reseedTopicsAction } from "@/app/actions";

async function fetchTopics() {
  const res = await fetch("/api/admin/topics", { cache: "no-store" });
  return res.json() as Promise<Topic[]>;
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState<Pillar | "全部">("全部");
  const [stage, setStage] = useState<AudienceStage | "全部">("全部");
  const [isPending, startTransition] = useTransition();

  useEffect(() => { fetchTopics().then(setTopics); }, []);

  function handleReseed() {
    if (!confirm("将清空当前所有选题和6月排期，重置为30条新选题。确定吗？")) return;
    startTransition(async () => {
      await reseedTopicsAction();
      const fresh = await fetchTopics();
      setTopics(fresh);
    });
  }

  const filtered = topics.filter((t) => {
    if (pillar !== "全部" && t.pillar !== pillar) return false;
    if (stage !== "全部" && t.audience_stage !== stage) return false;
    if (search && !t.title.includes(search) && !(t.pain_point || "").includes(search)) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-base font-semibold text-gray-800">选题库</h1>
          <p className="text-xs text-gray-400 mt-0.5">共 {topics.filter(t => t.status === "approved").length} 条已审批</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReseed}
            disabled={isPending}
            className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border transition-colors disabled:opacity-40"
            style={{ borderColor: "var(--green-200)", color: "var(--green-800)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--green-50)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <RefreshCw size={14} className={isPending ? "animate-spin" : ""} />
            {isPending ? "重置中…" : "重置选题"}
          </button>
          <NewTopicButton />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-3.5 mb-4 space-y-2.5 border border-[var(--green-100)]">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索话题或痛点…"
            className="w-full pl-8 pr-4 py-1.5 rounded-lg text-sm focus:outline-none transition-colors"
            style={{ border: "1px solid var(--green-200)" }}
            onFocus={e => (e.currentTarget.style.borderColor = "var(--green-400)")}
            onBlur={e => (e.currentTarget.style.borderColor = "var(--green-200)")}
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(["全部", ...PILLARS] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPillar(p as Pillar | "全部")}
              className={`text-xs px-2.5 py-0.5 rounded-full border transition-colors ${
                pillar === p && p !== "全部" ? PILLAR_COLORS[p as Pillar] : ""
              } ${pillar === p && p === "全部" ? "text-white border-[var(--green-900)]" : ""}
              ${pillar !== p && p === "全部" ? "text-gray-600 border-[var(--green-200)]" : ""}
              ${pillar !== p && p !== "全部" ? `${PILLAR_COLORS[p as Pillar]} opacity-50 hover:opacity-100` : ""}`}
              style={pillar === p && p === "全部" ? { background: "var(--green-900)" } : {}}
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
              className={`text-xs px-2.5 py-0.5 rounded-full border transition-colors ${
                stage === s && s !== "全部" ? STAGE_COLORS[s as AudienceStage] : ""
              } ${stage === s && s === "全部" ? "text-white border-[var(--green-900)]" : ""}
              ${stage !== s && s === "全部" ? "text-gray-600 border-[var(--green-200)]" : ""}
              ${stage !== s && s !== "全部" ? `${STAGE_COLORS[s as AudienceStage]} opacity-50 hover:opacity-100` : ""}`}
              style={stage === s && s === "全部" ? { background: "var(--green-900)" } : {}}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">没有匹配的选题</div>
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
