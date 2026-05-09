import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于",
  description: "一个前端工程师，专注于 React 和 TypeScript 技术栈。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 bg-white">
      <h1 className="mb-10 text-3xl font-bold">灯下自叙</h1>

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <Image
          src="/avatar.jpg"
          alt="头像"
          width={96}
          height={96}
          className="shrink-0 rounded-full object-cover"
        />

        <div className="space-y-5 text-gray-600 leading-relaxed">
          <p>
            一名前端工程师，专注于 React 和 TypeScript 技术栈，目前在探索
            Next.js 全栈开发和工程化实践。
          </p>
          <p>
            这个博客是我的一方小天地——记录技术探索中的心得、踩过的坑、
            读过的书，偶尔也写写生活中的风景和故事。
          </p>
          <p>工作之外喜欢骑行、摄影和羽毛球。</p>

          <div className="space-y-3 pt-2">
            <p className="text-sm text-gray-400">
              技术栈：React · TypeScript · Next.js · Tailwind CSS
            </p>
          </div>

          <div className="flex gap-4 pt-1">
            <a
              href="https://github.com/diligent-wyt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3b5998] hover:text-[#2d4373]"
            >
              GitHub
            </a>
            <span className="text-gray-300">|</span>
            <Link href="/posts" className="text-[#3b5998] hover:text-[#2d4373]">
              文章列表
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/" className="text-[#3b5998] hover:text-[#2d4373]">
              首页
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
