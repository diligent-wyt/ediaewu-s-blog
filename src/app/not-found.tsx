import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-gray-200">404</p>
      <h1 className="mt-4 text-xl font-semibold text-gray-800">
        页面不存在
      </h1>
      <p className="mt-2 text-gray-500">
        你访问的页面可能已被删除，或者地址输入有误。
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-gray-900 px-5 py-2 text-sm text-white transition-colors hover:bg-gray-700"
        >
          返回首页
        </Link>
        <Link
          href="/posts"
          className="rounded-lg border border-gray-300 px-5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
        >
          文章列表
        </Link>
      </div>
    </main>
  );
}
