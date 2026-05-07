import Link from "next/link";
import { Ma_Shan_Zheng } from "next/font/google";

const maShanZheng = Ma_Shan_Zheng({
  weight: "400",
  subsets: ["latin"],
});

export default function CoverPage() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-950 via-slate-900 to-gray-800">
      {/* Far mountains */}
      <div className="absolute bottom-0 w-full">
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="block w-full h-[20vh]"
        >
          <path
            d="M0 200 L0 90 L80 60 L160 110 L250 45 L350 95 L430 30 L530 75 L620 20 L720 70 L810 35 L910 80 L1000 25 L1100 65 L1200 50 L1200 200 Z"
            fill="#334155"
          />
        </svg>
      </div>

      {/* Mid mountains */}
      <div className="absolute bottom-0 w-full">
        <svg
          viewBox="0 0 1200 250"
          preserveAspectRatio="none"
          className="block w-full h-[28vh]"
        >
          <path
            d="M0 250 L0 130 L70 90 L140 150 L230 60 L320 140 L400 75 L490 120 L570 45 L660 110 L740 30 L820 100 L910 55 L1000 85 L1080 20 L1200 65 L1200 250 Z"
            fill="#1e293b"
          />
        </svg>
      </div>

      {/* Near mountains */}
      <div className="absolute bottom-0 w-full">
        <svg
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          className="block w-full h-[35vh]"
        >
          <path
            d="M0 300 L0 180 L60 120 L130 170 L210 80 L290 150 L360 50 L440 130 L520 25 L610 100 L690 55 L780 140 L870 70 L950 110 L1030 35 L1120 95 L1200 45 L1200 300 Z"
            fill="#0f172a"
          />
        </svg>
      </div>

      {/* Moon */}
      <div className="absolute right-[15%] top-[12%] h-16 w-16 rounded-full bg-amber-100/80 shadow-[0_0_60px_30px_rgba(254,243,199,0.15)]" />

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center px-4 pb-20">
        <h1
          className={`${maShanZheng.className} text-6xl tracking-[0.15em] text-amber-50`}
        >
          Ediaewu's Blog
        </h1>
        <p className="mt-5 text-base tracking-widest text-gray-400">
          笔墨之间的技术与生活
        </p>
        <Link
          href="/posts"
          className="mt-12 rounded-sm border border-white/25 px-8 py-2.5 text-sm tracking-[0.2em] text-white/80 transition-all hover:border-amber-100/50 hover:text-amber-100"
        >
          进入博客
        </Link>
      </div>
    </main>
  );
}
