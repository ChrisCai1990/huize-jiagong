export default function Footer() {
  return (
    <footer className="border-t py-12 px-6" style={{ background: "var(--green-900)", borderColor: "var(--green-800)" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">

        {/* 品牌 */}
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-5 rounded-sm" style={{ background: "var(--green-500)" }} />
            <span className="font-semibold text-white">汇泽甲功健康</span>
          </div>
          <p className="text-xs mt-3 max-w-xs leading-relaxed" style={{ color: "var(--green-300)" }}>
            专注自身免疫性疾病与营养医学，帮助桥本、甲减患者找回健康活力。
          </p>
        </div>

        {/* 导航 + 联系 */}
        <div className="flex flex-col sm:flex-row gap-10 text-sm">
          <div>
            <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--green-500)" }}>
              导航
            </div>
            <div className="space-y-2">
              {[
                { label: "关于我们", href: "#about" },
                { label: "服务项目", href: "#services" },
                { label: "成功案例", href: "#cases" },
                { label: "联系我们", href: "#contact" },
              ].map((item) => (
                <div key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors"
                    style={{ color: "var(--green-300)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--green-300)")}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--green-500)" }}>
              联系
            </div>
            <div className="space-y-2 text-sm" style={{ color: "var(--green-300)" }}>
              <div>微信：huize_jiagong</div>
              <div>邮箱：hello@huizejiagong.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      <div
        className="max-w-6xl mx-auto mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2"
        style={{ borderColor: "var(--green-800)" }}
      >
        <p className="text-xs" style={{ color: "var(--green-500)" }}>
          © {new Date().getFullYear()} 汇泽甲功健康. 保留所有权利.
        </p>
        <p className="text-xs" style={{ color: "var(--green-500)" }}>
          本网站内容仅供参考，不构成医疗诊断或治疗建议
        </p>
      </div>
    </footer>
  );
}
