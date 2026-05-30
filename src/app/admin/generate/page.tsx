"use client";

import { useState, useEffect } from "react";
import { PILLAR_COLORS, STAGE_COLORS } from "@/lib/types";
import type { Topic } from "@/lib/types";
import { buildScriptPrompt, buildMonthlyTopicsPrompt } from "@/lib/prompts";
import { Copy, CheckCheck, Sparkles } from "lucide-react";

type GenType = "monthly" | "script";

function CopyButton({ text, label = "复制提示词" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white text-sm rounded-lg hover:bg-green-800 transition-colors"
    >
      {copied ? <CheckCheck size={15} /> : <Copy size={15} />}
      {copied ? "已复制！打开 Claude.ai 粘贴" : label}
    </button>
  );
}

export default function GeneratePage() {
  const [type, setType] = useState<GenType>("script");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [daysInMonth, setDaysInMonth] = useState(30);

  useEffect(() => {
    fetch("/api/admin/topics")
      .then((r) => r.json())
      .then((data: Topic[]) => setTopics(data.filter((t) => t.status === "approved")));
  }, []);

  useEffect(() => {
    const [y, m] = month.split("-").map(Number);
    setDaysInMonth(new Date(y, m, 0).getDate());
  }, [month]);

  const prompt =
    type === "monthly"
      ? buildMonthlyTopicsPrompt(month, daysInMonth)
      : selectedTopic
      ? buildScriptPrompt(selectedTopic)
      : "";

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Sparkles size={22} className="text-amber-500" />
          AI 生成助手
        </h1>
        <p className="text-slate-500 text-sm mt-1">生成提示词 → 复制到 Claude.ai → 粘贴结果到对应页面</p>
      </div>

      {/* Type selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5">
        <p className="text-sm font-medium text-slate-700 mb-3">选择生成类型</p>
        <div className="grid grid-cols-2 gap-3">
          {([
            { id: "script", label: "📝 日脚本", desc: "生成单条口播脚本（视频号+小红书）" },
            { id: "monthly", label: "📅 月度选题", desc: "一次生成整月30条选题计划" },
          ] as { id: GenType; label: string; desc: string }[]).map(({ id, label, desc }) => (
            <button
              key={id}
              onClick={() => setType(id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                type === id
                  ? "border-green-600 bg-green-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="font-medium text-slate-800 mb-1">{label}</div>
              <div className="text-xs text-slate-500">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Config */}
      {type === "monthly" && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-2">目标月份</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value.replace("/", "-"))}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <p className="text-xs text-slate-500 mt-2">本月 {daysInMonth} 天，将生成 {daysInMonth} 条选题</p>
        </div>
      )}

      {type === "script" && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5">
          <p className="text-sm font-medium text-slate-700 mb-3">选择要生成脚本的选题</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selectedTopic?.id === topic.id
                    ? "border-green-500 bg-green-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex gap-1.5 mb-1">
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
        </div>
      )}

      {/* Prompt preview */}
      {prompt && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
            <p className="text-sm font-medium text-slate-700">生成的提示词</p>
            <CopyButton text={prompt} />
          </div>
          <pre className="p-4 text-xs text-slate-600 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
            {prompt}
          </pre>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-amber-800 mb-2">使用步骤</p>
        <ol className="text-sm text-amber-700 space-y-1.5 list-decimal list-inside">
          <li>点击「复制提示词」</li>
          <li>打开 Claude.ai，新建对话，粘贴提示词发送</li>
          <li>等待 Claude 生成内容</li>
          <li>
            {type === "script"
              ? "复制生成结果，到对应日期详情页（排期→日期）粘贴填入各区域"
              : "将生成的选题逐条复制，在选题库中新建或直接填入排期"
            }
          </li>
        </ol>
      </div>
    </div>
  );
}
