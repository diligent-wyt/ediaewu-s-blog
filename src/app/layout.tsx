import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://ediaewu.cn"),
  title: {
    default: "Ediaewu's Blog",
    template: "%s - Ediaewu's Blog",
  },
  description: "一个前端工程师的技术与生活",
  openGraph: {
    title: "Ediaewu's Blog",
    description: "一个前端工程师的技术与生活",
    url: process.env.SITE_URL ?? "https://ediaewu.cn",
    siteName: "Ediaewu's Blog",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary",
    title: "Ediaewu's Blog",
    description: "一个前端工程师的技术与生活",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Ediaewu's Blog"
          href="/feed.xml"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
