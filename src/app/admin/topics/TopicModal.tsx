"use client";

import { useState, useTransition } from "react";
import { createTopic, updateTopic, deleteTopic } from "@/app/actions";
import { PILLARS, STAGES, PILLAR_COLORS, STAGE_COLORS } from "@/lib/types";
import type { Topic } from "@/lib/types";
import { X, Plus, Trash2 } from "lucide-react";

interface Props {
  topic?: Topic;
  onClose: () => void;
}

export function TopicModal({ topic, onClose }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (topic) {
        await updateTopic(topic.id, formData);
      } else {
        await createTopic(formData);
      }
      onClose();
    });
  }

  function handleDelete() {
    if (!topic || !confirm("确定删除这个选题？")) return;
    startTransition(async () => {
      await deleteTopic(topic.id);
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">{topic ? "编辑选题" : "新建选题"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form action={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">话题标题 *</label>
            <input
              name="title"
              defaultValue={topic?.title}
              required
              placeholder="15字内，口语化表达"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">内容支柱 *</label>
              <select
                name="pillar"
                defaultValue={topic?.pillar || "指标解读"}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                {PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">人群阶段 *</label>
              <select
                name="audience_stage"
                defaultValue={topic?.audience_stage || "备孕期"}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">核心痛点</label>
            <textarea
              name="pain_point"
              defaultValue={topic?.pain_point || ""}
              rows={2}
              placeholder="一句话描述目标用户的具体困惑"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">视频号开场钩子</label>
            <textarea
              name="hook"
              defaultValue={topic?.hook || ""}
              rows={2}
              placeholder="第一句话，让目标用户说「这说的就是我！」"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">备注</label>
            <input
              name="notes"
              defaultValue={topic?.notes || ""}
              placeholder="内部备注，不影响生成"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {topic && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">状态</label>
              <select
                name="status"
                defaultValue={topic.status}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="draft">草稿</option>
                <option value="approved">已审批</option>
                <option value="archived">已归档</option>
              </select>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            {topic ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={14} />
                删除
              </button>
            ) : <div />}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50"
              >
                {isPending ? "保存中…" : "保存"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function NewTopicButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-4 py-2 bg-green-700 text-white text-sm rounded-lg hover:bg-green-800 transition-colors"
      >
        <Plus size={16} />
        新建选题
      </button>
      {open && <TopicModal onClose={() => setOpen(false)} />}
    </>
  );
}

export function TopicCard({ topic }: { topic: Topic }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-left bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:shadow-sm transition-all w-full"
      >
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${PILLAR_COLORS[topic.pillar]}`}>
            {topic.pillar}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${STAGE_COLORS[topic.audience_stage]}`}>
            {topic.audience_stage}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-800 leading-snug mb-2">{topic.title}</p>
        {topic.hook && (
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{topic.hook}</p>
        )}
      </button>
      {open && <TopicModal topic={topic} onClose={() => setOpen(false)} />}
    </>
  );
}
