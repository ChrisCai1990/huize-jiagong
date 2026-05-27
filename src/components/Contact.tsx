"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", condition: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* 左侧说明 */}
          <div>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--green-700)" }}
            >
              联系我们
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-gray-900 leading-snug">
              迈出改变的
              <br />
              <span className="font-semibold" style={{ color: "var(--green-800)" }}>
                第一步
              </span>
            </h2>
            <p className="mt-6 text-gray-500 leading-relaxed text-sm">
              填写表单或直接联系我们，我们将在 1 个工作日内与您确认咨询时间。
              首次咨询前会发送简短的健康问卷，帮助我们更好地了解您的情况。
            </p>

            <div
              className="mt-8 w-12 h-1 rounded-full"
              style={{ background: "var(--green-500)" }}
            />

            <div className="mt-8 space-y-5 text-sm text-gray-600">
              {[
                { label: "微信", value: "huize_jiagong" },
                { label: "邮箱", value: "hello@huizejiagong.com" },
                { label: "咨询时间", value: "周一至周六 · 10:00–18:00" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                  <div className="font-medium" style={{ color: "var(--green-900)" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧表单 */}
          <div>
            {sent ? (
              <div
                className="rounded-2xl p-10 text-center border"
                style={{ background: "var(--green-50)", borderColor: "var(--green-200)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4"
                  style={{ background: "var(--green-700)" }}
                >
                  ✓
                </div>
                <div className="font-medium" style={{ color: "var(--green-900)" }}>
                  提交成功
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  我们已收到您的信息，将在 1 个工作日内联系您。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "您的姓名 *", key: "name", type: "text", placeholder: "请输入姓名", required: true },
                  { label: "联系电话 *", key: "phone", type: "tel", placeholder: "方便联系的手机号", required: true },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
                    <input
                      type={f.type}
                      required={f.required}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none transition-colors"
                      style={{ borderColor: "var(--green-200)" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--green-500)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--green-200)")}
                      placeholder={f.placeholder}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs text-gray-400 mb-1">主要困扰</label>
                  <select
                    value={form.condition}
                    onChange={(e) => setForm({ ...form, condition: e.target.value })}
                    className="w-full border rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none transition-colors bg-white"
                    style={{ borderColor: "var(--green-200)" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "var(--green-500)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "var(--green-200)")}
                  >
                    <option value="">请选择</option>
                    <option value="桥本甲状腺炎">桥本甲状腺炎</option>
                    <option value="甲减/亚甲减">甲减 / 亚临床甲减</option>
                    <option value="甲亢">甲亢</option>
                    <option value="自身免疫综合问题">其他自身免疫问题</option>
                    <option value="营养评估">营养状态评估</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">补充说明</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none transition-colors resize-none"
                    style={{ borderColor: "var(--green-200)" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "var(--green-500)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "var(--green-200)")}
                    placeholder="简要描述您的症状或想了解的问题（选填）"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-sm text-white py-3.5 rounded-xl transition-colors"
                  style={{ background: "var(--green-700)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--green-800)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--green-700)")}
                >
                  提交预约申请
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
