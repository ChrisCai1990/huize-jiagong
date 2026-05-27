export const metadata = {
  title: "桥本疗愈指南 | 汇泽甲功健康",
  description: "汇泽甲功出品·桥本疗愈完整指南：从饮食、运动、睡眠、情绪管理到营养补充剂，功能医学视角的全方位桥本干预方案。",
};

export default function GuidePage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/guide.html"
        className="w-full h-full border-0"
        title="桥本疗愈指南"
        allow="fullscreen"
      />
    </div>
  );
}
