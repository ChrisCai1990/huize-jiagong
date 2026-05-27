import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "桥本疗愈指南 | 汇泽健康",
  description: "汇泽健康出品·桥本疗愈完整指南：从饮食、运动、睡眠、情绪管理到营养补充剂，功能医学视角的全方位桥本干预方案。",
};

export default function GuidePage() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "64px" }}>
        <iframe
          src="/guide.html"
          style={{ width: "100%", height: "calc(100vh - 64px)", border: "none", display: "block" }}
          title="桥本疗愈指南"
          allow="fullscreen"
        />
      </div>
      <Footer />
    </>
  );
}
