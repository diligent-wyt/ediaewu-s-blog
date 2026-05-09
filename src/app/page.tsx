import type { Metadata } from "next";
import Link from "next/link";
import { Ma_Shan_Zheng } from "next/font/google";

const maShanZheng = Ma_Shan_Zheng({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ediaewu's Blog",
  description:
    "一个前端工程师的技术与生活博客。记录技术探索、读书笔记和生活中的所见所感。",
  openGraph: {
    title: "Ediaewu's Blog",
    description:
      "一个前端工程师的技术与生活博客。记录技术探索、读书笔记和生活中的所见所感。",
    type: "website",
  },
};

export default function CoverPage() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/cover-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center px-4 pb-16">
        <h1
          className={`${maShanZheng.className} text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] text-amber-50 text-center`}
        >
          Ediaewu&apos;s Blog
        </h1>
        <p className="mt-5 text-sm sm:text-base tracking-widest text-gray-400">
          也无风雨也无晴
        </p>
        <Link
          href="/posts"
          className="mt-10 sm:mt-12 rounded-sm border border-white/25 px-6 sm:px-8 py-2.5 text-sm tracking-[0.2em] text-white/80 transition-all hover:border-amber-100/50 hover:text-amber-100"
        >
          进入博客
        </Link>
      </div>
    </main>
  );
}
