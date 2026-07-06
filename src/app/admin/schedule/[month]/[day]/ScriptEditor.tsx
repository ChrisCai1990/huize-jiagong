"use client";

import { useState, useTransition } from "react";
import { saveScript, savePublishCopy, updateDayStatus } from "@/app/actions";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/types";
import type { Script, PublishCopy, DayStatus } from "@/lib/types";
import { Edit2, Check, Copy, CheckCheck } from "lucide-react";

type Tab = "weixin_script" | "xhs" | "shoot" | "publish";

interface Props {
  scheduleDayId: number;
  month: string;
  dayNumber: number;
  status: DayStatus;
  script: Script | null;
  publishCopy: PublishCopy | null;
  scriptPrompt: string;
  publishPrompt: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors"
      style={{ border: "1px solid var(--green-200)", color: "var(--green-700)" }}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--green-50)")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      {copied ? <CheckCheck size={11} /> : <Copy size={11} />}
      {copied ? "已复制" : "复制"}
    </button>
  );
}

function EditableSection({
  label, value, placeholder, rows = 6, onSave,
}: {
  label: string; value: string | null; fieldName: string;
  placeholder?: string; rows?: number;
  onSave: (val: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value || "");
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => { await onSave(text); setEditing(false); });
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</label>
        <div className="flex items-center gap-1.5">
          {value && !editing && <CopyButton text={value} />}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors text-gray-500 hover:text-gray-700"
              style={{ border: "1px solid var(--green-200)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--green-50)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <Edit2 size={11} />编辑
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex items-center gap-1 text-xs text-white px-2 py-1 rounded transition-colors disabled:opacity-50"
              style={{ background: "var(--green-700)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--green-800)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--green-700)")}
            >
              <Check size={11} />{isPending ? "保存…" : "保存"}
            </button>
          )}
        </div>
      </div>

      {editing ? (
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none resize-y transition-colors"
          style={{ border: "1px solid var(--green-200)" }}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--green-400)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--green-200)")}
        />
      ) : value ? (
        <div className="rounded-lg px-3 py-2 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed min-h-[48px]"
          style={{ background: "var(--green-50)" }}>
          {value}
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
          className="rounded-lg px-3 py-5 text-center text-xs text-gray-400 cursor-pointer transition-colors"
          style={{ border: "2px dashed var(--green-200)" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--green-400)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--green-200)")}
        >
          点击添加，或使用 AI 生成后粘贴
        </div>
      )}
    </div>
  );
}

const STATUS_STEPS: DayStatus[] = ["planned", "scripted", "filmed", "published"];

export default function ScriptEditor({
  scheduleDayId, month, dayNumber, status, script, publishCopy, scriptPrompt, publishPrompt
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("weixin_script");
  const [, startTransition] = useTransition();
  const [showPrompt, setShowPrompt] = useState<"script" | "publish" | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  function setStatus(s: DayStatus) {
    startTransition(async () => { await updateDayStatus(month, dayNumber, s); });
  }

  async function saveScriptField(field: keyof Script, value: string) {
    await saveScript(scheduleDayId, month, dayNumber, { [field]: value });
  }

  async function savePublishField(field: keyof PublishCopy, value: string) {
    await savePublishCopy(scheduleDayId, month, dayNumber, { [field]: value });
  }

  function copyPrompt(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "weixin_script", label: "视频号脚本" },
    { id: "xhs", label: "小红书图文" },
    { id: "shoot", label: "拍摄提示" },
    { id: "publish", label: "发布文案" },
  ];

  return (
    <div className="space-y-4">
      {/* Status stepper */}
      <div className="bg-white rounded-xl p-4 border border-[var(--green-100)]">
        <p className="text-xs text-gray-400 mb-2.5">内容状态</p>
        <div className="flex items-center gap-1.5">
          {STATUS_STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1.5 flex-1">
              <button
                onClick={() => setStatus(s)}
                className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-colors ${status === s ? STATUS_COLORS[s] + " border border-transparent" : ""}`}
                style={
                  STATUS_STEPS.indexOf(status) > i && status !== s
                    ? { background: "var(--green-50)", color: "var(--green-700)", border: "1px solid var(--green-200)" }
                    : status !== s
                    ? { border: "1px solid var(--green-100)", color: "#9ca3af" }
                    : {}
                }
              >
                {STATUS_LABELS[s]}
              </button>
              {i < STATUS_STEPS.length - 1 && (
                <div className="w-3 h-px shrink-0"
                  style={{ background: STATUS_STEPS.indexOf(status) > i ? "var(--green-400)" : "var(--green-100)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Generate prompt */}
      <div className="rounded-xl p-4" style={{ background: "var(--green-50)", border: "1px solid var(--green-200)" }}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">用 Claude 生成内容</p>
          <div className="flex gap-1.5">
            {(["script", "publish"] as const).map(type => (
              <button
                key={type}
                onClick={() => setShowPrompt(showPrompt === type ? null : type)}
                className="text-xs px-2.5 py-1 text-white rounded-lg transition-colors"
                style={{ background: "var(--green-700)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--green-800)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--green-700)")}
              >
                {type === "script" ? "脚本提示词" : "发布文案提示词"}
              </button>
            ))}
          </div>
        </div>

        {showPrompt && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs text-gray-500">复制提示词，粘贴到 Claude.ai 生成后填入对应区域</p>
              <button
                onClick={() => copyPrompt(showPrompt === "script" ? scriptPrompt : publishPrompt)}
                className="flex items-center gap-1 text-xs text-white px-2.5 py-1 rounded-lg transition-colors shrink-0 ml-2"
                style={{ background: "var(--green-700)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--green-800)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--green-700)")}
              >
                {copiedPrompt ? <CheckCheck size={12} /> : <Copy size={12} />}
                {copiedPrompt ? "已复制！" : "复制"}
              </button>
            </div>
            <pre className="text-xs rounded-lg p-3 overflow-x-auto whitespace-pre-wrap max-h-40 overflow-y-auto"
              style={{ background: "white", color: "var(--green-900)", border: "1px solid var(--green-200)" }}>
              {showPrompt === "script" ? scriptPrompt : publishPrompt}
            </pre>
          </div>
        )}
      </div>

      {/* Content tabs */}
      <div className="bg-white rounded-xl overflow-hidden border border-[var(--green-100)]">
        <div className="flex border-b border-[var(--green-100)]">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex-1 py-2.5 text-xs font-medium transition-colors"
              style={activeTab === id
                ? { color: "var(--green-700)", borderBottom: "2px solid var(--green-700)" }
                : { color: "#9ca3af" }
              }
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-4 space-y-4">
          {activeTab === "weixin_script" && (
            <>
              <EditableSection label="开场钩子" value={script?.weixin_script?.split("\n")[0] || null} fieldName="weixin_hook" rows={2}
                onSave={async (v) => {
                  const rest = (script?.weixin_script || "").split("\n").slice(1).join("\n");
                  await saveScriptField("weixin_script", v + (rest ? "\n" + rest : ""));
                }}
              />
              <EditableSection label="完整脚本" value={script?.weixin_script || null} fieldName="weixin_script" rows={10}
                placeholder="粘贴从 Claude 生成的视频号口播脚本"
                onSave={v => saveScriptField("weixin_script", v)}
              />
              <div className="grid grid-cols-2 gap-3">
                <EditableSection label="视频号标题" value={script?.weixin_title || null} fieldName="weixin_title" rows={2}
                  placeholder="15-20字，含关键词"
                  onSave={v => saveScriptField("weixin_title", v)}
                />
                <EditableSection label="封面文字" value={script?.weixin_cover || null} fieldName="weixin_cover" rows={2}
                  placeholder="5-8字，视觉冲击"
                  onSave={v => saveScriptField("weixin_cover", v)}
                />
              </div>
            </>
          )}
          {activeTab === "xhs" && (
            <>
              <EditableSection label="小红书标题" value={script?.xhs_title || null} fieldName="xhs_title" rows={2}
                placeholder="20-30字，含emoji，搜索词前置"
                onSave={v => saveScriptField("xhs_title", v)}
              />
              <EditableSection label="图文正文" value={script?.xhs_script || null} fieldName="xhs_script" rows={12}
                placeholder="300-500字，分点展示，结尾引导收藏"
                onSave={v => saveScriptField("xhs_script", v)}
              />
              <EditableSection label="标签" value={script?.xhs_tags || null} fieldName="xhs_tags" rows={3}
                placeholder="#桥本甲状腺炎 #备孕 …（15个）"
                onSave={v => saveScriptField("xhs_tags", v)}
              />
            </>
          )}
          {activeTab === "shoot" && (
            <EditableSection label="拍摄提示" value={script?.shoot_tips || null} fieldName="shoot_tips" rows={8}
              placeholder="景别建议、道具、情绪节奏、注意事项"
              onSave={v => saveScriptField("shoot_tips", v)}
            />
          )}
          {activeTab === "publish" && (
            <>
              <EditableSection label="视频号发布文案" value={publishCopy?.weixin_caption || null} fieldName="weixin_caption" rows={6}
                placeholder="150-300字，结尾有互动问题"
                onSave={v => savePublishField("weixin_caption", v)}
              />
              <EditableSection label="视频号话题标签" value={publishCopy?.weixin_tags || null} fieldName="weixin_tags" rows={2}
                onSave={v => savePublishField("weixin_tags", v)}
              />
              <EditableSection label="小红书发布文案" value={publishCopy?.xhs_caption || null} fieldName="xhs_caption" rows={8}
                placeholder="300-500字，分点，emoji"
                onSave={v => savePublishField("xhs_caption", v)}
              />
              <EditableSection label="小红书标签" value={publishCopy?.xhs_tags || null} fieldName="xhs_tags" rows={2}
                onSave={v => savePublishField("xhs_tags", v)}
              />
              <EditableSection label="最佳发布时间" value={publishCopy?.best_time || null} fieldName="best_time" rows={1}
                placeholder="例：20:00-22:00（情绪类），07:00-09:00（实用类）"
                onSave={v => savePublishField("best_time", v)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
