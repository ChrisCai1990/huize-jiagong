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
          <div>
            <span className="text-xs tracking-widest text-gray-400 uppercase">联系我们</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-gray-900 leading-snug">
              迈出改变的
              <br />
              <span className="font-semibold">第一步</span>
            </h2>
            <p className="mt-6 text-gray-500 leading-relaxed text-sm">
              填写表单或直接联系我们，我们将在 1 个工作日内与您确认咨询时间。
              首次咨询前会发送简短的健康问卷，帮助我们更好地了解您的情况。
            </p>

            <div className="mt-10 space-y-5 text-sm text-gray-600">
              <div>
                <div className="text-xs text-gray-400 mb-1">微信</div>
                <div className="font-medium text-gray-800">huize_jiagong</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">邮箱</div>
                <div className="font-medium text-gray-800">hello@huizejiagong.com</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">咨询时间</div>
                <div className="font-medium text-gray-800">周一至周六 · 10:00–18:00</div>
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100">
                <div className="text-2xl mb-3">✓</div>
                <div className="font-medium text-gray-900">提交成功</div>
                <p className="text-sm text-gray-500 mt-2">
                  我们已收到您的信息，将在 1 个工作日内联系您。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">您的姓名 *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="请输入姓名"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">联系电话 *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="方便联系的手机号"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">主要困扰</label>
                  <select
                    value={form.condition}
                    onChange={(e) => setForm({ ...form, condition: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400 transition-colors bg-white"
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
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                    placeholder="简要描述您的症状或想了解的问题（选填）"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white text-sm py-3.5 rounded-xl hover:bg-gray-700 transition-colors"
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
