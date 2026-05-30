import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://39.106.218.225"),
  title: "汇泽健康 | 自免·桥本·营养医学",
  description: "汇泽健康专注自身免疫性疾病、桥本甲状腺炎及营养医学领域的综合健康管理服务。",
  openGraph: {
    title: "汇泽健康 | 自免·桥本·营养医学",
    description: "功能医学视角的精准健康管理，专注桥本甲状腺炎、自身免疫性疾病及营养医学。",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "汇泽健康" }],
    type: "website",
    siteName: "汇泽健康",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
