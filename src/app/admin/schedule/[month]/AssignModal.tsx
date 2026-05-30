"use client";

import { useState, useTransition, useEffect } from "react";
import { assignTopic, removeTopic } from "@/app/actions";
import { PILLAR_COLORS, STAGE_COLORS } from "@/lib/types";
import type { Topic } from "@/lib/types";
import { X, Search } from "lucide-react";

interface Props {
  month: string;
  dayNumber: number;
  currentTopicId?: number;
  onClose: () => void;
}

export default function AssignModal({ month, dayNumber, currentTopicId, onClose }: Props) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetch("/api/admin/topics")
      .then((r) => r.json())
      .then((data: Topic[]) => setTopics(data.filter((t) => t.status === "approved")));
  }, []);

  const filtered = topics.filter(
    (t) => !search || t.title.includes(search) || t.pillar.includes(search) || t.audience_stage.includes(search)
  );

  function handleSelect(topicId: number) {
    startTransition(async () => {
      await assignTopic(month, dayNumber, topicId);
      onClose();
    });
  }

  function handleRemove() {
    startTransition(async () => {
      await removeTopic(month, dayNumber);
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="font-semibold text-slate-800">分配选题</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {month} · 第 {dayNumber} 天
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-slate-100 shrink-0">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索选题…"
              className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-4 space-y-2">
          {filtered.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleSelect(topic.id)}
              disabled={isPending}
              className={`w-full text-left p-3 rounded-xl border transition-all hover:border-green-400 hover:bg-green-50 ${
                topic.id === currentTopicId ? "border-green-500 bg-green-50" : "border-slate-200"
              }`}
            >
              <div className="flex gap-1.5 mb-1.5">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${PILLAR_COLORS[topic.pillar]}`}>
                  {topic.pillar}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${STAGE_COLORS[topic.audience_stage]}`}>
                  {topic.audience_stage}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-800">{topic.title}</p>
            </button>
          ))}
        </div>

        {currentTopicId && (
          <div className="px-4 pb-4 pt-2 border-t border-slate-100 shrink-0">
            <button
              onClick={handleRemove}
              disabled={isPending}
              className="w-full py-2 text-sm text-red-500 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              移除当前选题
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
