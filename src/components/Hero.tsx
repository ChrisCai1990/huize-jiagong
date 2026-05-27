export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-16 bg-white"
    >
      <div className="max-w-3xl mx-auto">
        <span className="inline-block text-xs tracking-widest text-gray-400 uppercase mb-6 border border-gray-200 rounded-full px-4 py-1">
          自身免疫 · 桥本甲状腺炎 · 营养医学
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 leading-tight mb-6">
          重新认识
          <br />
          <span className="font-semibold">甲状腺健康</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          汇泽甲功聚焦自身免疫性疾病根源，以循证营养医学为核心，
          帮助桥本、甲减患者系统改善症状、恢复活力。
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#services"
            className="bg-gray-900 text-white text-sm px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
          >
            了解服务
          </a>
          <a
            href="#contact"
            className="border border-gray-300 text-gray-700 text-sm px-8 py-3 rounded-full hover:border-gray-500 transition-colors"
          >
            预约咨询
          </a>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto">
          {[
            { num: "3000+", label: "服务案例" },
            { num: "8年+", label: "专注自免领域" },
            { num: "95%", label: "症状改善率" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{s.num}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 flex flex-col items-center gap-1 animate-bounce">
        <div className="w-px h-8 bg-gray-300" />
      </div>
    </section>
  );
}
