import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 bg-white">
      <h1 className="mb-10 text-3xl font-bold">灯下自叙</h1>

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        {/* Avatar placeholder */}
        <div className="h-24 w-24 shrink-0 rounded-full bg-gradient-to-br from-slate-700 to-slate-500" />

        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            一名前端工程师，专注于 React 和 TypeScript 技术栈。
            这个博客记录我在技术上的探索和生活中的趣事。
          </p>
          <p>工作之外喜欢骑行、摄影和瞎逛，偶尔在路上发现一些有趣的东西。</p>

          <div className="flex gap-4 pt-2">
            <a
              href="https://github.com/diligent-wyt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              GitHub
            </a>
            <span className="text-gray-300">|</span>
            <Link href="/posts" className="text-blue-600 hover:text-blue-800">
              文章列表
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              首页
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
