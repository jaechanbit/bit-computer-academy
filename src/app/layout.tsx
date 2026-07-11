import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "비트컴퓨터학원",
  description: "남원 IT 교육과 자격증 과정을 안내하는 비트컴퓨터학원 홈페이지입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
