export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="font-semibold text-gray-900">汇泽甲功</div>
          <p className="text-xs text-gray-400 mt-2 max-w-xs leading-relaxed">
            专注自身免疫性疾病与营养医学，帮助桥本、甲减患者找回健康活力。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 text-sm text-gray-500">
          <div>
            <div className="text-xs text-gray-400 mb-3 uppercase tracking-widest">导航</div>
            <div className="space-y-2">
              {["关于我们", "服务项目", "成功案例", "联系我们"].map((item) => (
                <div key={item}>
                  <a href={`#${item === "关于我们" ? "about" : item === "服务项目" ? "services" : item === "成功案例" ? "cases" : "contact"}`} className="hover:text-gray-900 transition-colors">
                    {item}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400 mb-3 uppercase tracking-widest">联系</div>
            <div className="space-y-2 text-sm">
              <div>微信：huize_jiagong</div>
              <div>邮箱：hello@huizejiagong.com</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} 汇泽甲功. 保留所有权利.
        </p>
        <p className="text-xs text-gray-400">
          本网站内容仅供参考，不构成医疗诊断或治疗建议
        </p>
      </div>
    </footer>
  );
}
