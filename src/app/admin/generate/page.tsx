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
      className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs rounded-lg transition-colors"
      style={{ background: "var(--green-700)" }}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--green-800)")}
      onMouseLeave={e => (e.currentTarget.style.background = "var(--green-700)")}
    >
      {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
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
  const [year, monthNumber] = month.split("-").map(Number);
  const daysInMonth = new Date(year, monthNumber, 0).getDate();

  useEffect(() => {
    fetch("/api/admin/topics")
      .then(r => r.json())
      .then((data: Topic[]) => setTopics(data.filter(t => t.status === "approved")));
  }, []);

  const prompt =
    type === "monthly"
      ? buildMonthlyTopicsPrompt(month, daysInMonth)
      : selectedTopic ? buildScriptPrompt(selectedTopic) : "";

  return (
    <div className="max-w-3xl mx-auto px-4 py-5">
      <div className="mb-4">
        <h1 className="text-base font-semibold text-gray-800 flex items-center gap-1.5">
          <Sparkles size={16} className="text-amber-400" />
          AI 生成助手
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">生成提示词 → 复制到 Claude.ai → 粘贴结果到对应页面</p>
      </div>

      {/* Type selector */}
      <div className="bg-white rounded-xl p-4 mb-4 border border-[var(--green-100)]">
        <p className="text-xs font-medium text-gray-500 mb-2.5">选择生成类型</p>
        <div className="grid grid-cols-2 gap-2">
          {([
            { id: "script" as GenType, label: "📝 日脚本", desc: "单条口播脚本（视频号+小红书）" },
            { id: "monthly" as GenType, label: "📅 月度选题", desc: "整月30条选题计划" },
          ]).map(({ id, label, desc }) => (
            <button
              key={id}
              onClick={() => setType(id)}
              className="p-3 rounded-lg text-left transition-all"
              style={type === id
                ? { border: "2px solid var(--green-600)", background: "var(--green-50)" }
                : { border: "2px solid var(--green-100)" }
              }
              onMouseEnter={e => { if (type !== id) e.currentTarget.style.borderColor = "var(--green-300)"; }}
              onMouseLeave={e => { if (type !== id) e.currentTarget.style.borderColor = "var(--green-100)"; }}
            >
              <div className="text-sm font-medium text-gray-800">{label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Config */}
      {type === "monthly" && (
        <div className="bg-white rounded-xl p-4 mb-4 border border-[var(--green-100)]">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">目标月份</label>
          <input
            type="month"
            value={month}
            onChange={e => setMonth(e.target.value.replace("/", "-"))}
            className="px-3 py-1.5 rounded-lg text-sm focus:outline-none transition-colors"
            style={{ border: "1px solid var(--green-200)" }}
            onFocus={e => (e.currentTarget.style.borderColor = "var(--green-400)")}
            onBlur={e => (e.currentTarget.style.borderColor = "var(--green-200)")}
          />
          <p className="text-xs text-gray-400 mt-1.5">本月 {daysInMonth} 天，将生成 {daysInMonth} 条选题</p>
        </div>
      )}

      {type === "script" && (
        <div className="bg-white rounded-xl p-4 mb-4 border border-[var(--green-100)]">
          <p className="text-xs font-medium text-gray-600 mb-2.5">选择要生成脚本的选题</p>
          <div className="space-y-1.5 max-h-56 overflow-y-auto">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className="w-full text-left p-3 rounded-lg transition-all"
                style={selectedTopic?.id === topic.id
                  ? { border: "1px solid var(--green-400)", background: "var(--green-50)" }
                  : { border: "1px solid var(--green-100)" }
                }
                onMouseEnter={e => { if (selectedTopic?.id !== topic.id) e.currentTarget.style.borderColor = "var(--green-300)"; }}
                onMouseLeave={e => { if (selectedTopic?.id !== topic.id) e.currentTarget.style.borderColor = "var(--green-100)"; }}
              >
                <div className="flex gap-1.5 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${PILLAR_COLORS[topic.pillar]}`}>{topic.pillar}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STAGE_COLORS[topic.audience_stage]}`}>{topic.audience_stage}</span>
                </div>
                <p className="text-sm font-medium text-gray-800">{topic.title}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prompt preview */}
      {prompt && (
        <div className="bg-white rounded-xl overflow-hidden border border-[var(--green-100)]">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--green-100)]" style={{ background: "var(--green-50)" }}>
            <p className="text-sm font-medium text-gray-700">生成的提示词</p>
            <CopyButton text={prompt} />
          </div>
          <pre className="p-4 text-xs text-gray-600 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
            {prompt}
          </pre>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 rounded-xl p-4" style={{ background: "var(--green-50)", border: "1px solid var(--green-200)" }}>
        <p className="text-xs font-semibold text-gray-700 mb-1.5">使用步骤</p>
        <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
          <li>点击「复制提示词」</li>
          <li>打开 Claude.ai，新建对话，粘贴提示词发送</li>
          <li>等待 Claude 生成内容</li>
          <li>{type === "script" ? "复制结果，到排期→日期页面填入各区域" : "将选题逐条复制，在选题库中新建"}</li>
        </ol>
      </div>
    </div>
  );
}
