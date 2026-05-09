import Link from "next/link";
import {
  BlogAboutIcon,
  BlogHeaderIcon,
  BlogSearchIcon,
  BlogSubcribeIcon,
} from "@/components/BlogIcon";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <nav className="mx-auto w-full max-w-3xl px-4 flex h-11 items-center border-b border-gray-200 bg-white">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-gray-700 hover:text-black flex items-center shrink-0"
        >
          <BlogHeaderIcon />
          Ediaewu&apos;s Blog
        </Link>

        <form
          action="/search"
          method="GET"
          className="flex items-center mx-auto"
        >
          <input
            name="q"
            placeholder="搜索文章..."
            className=" border-gray-200 px-2 py-0.5 text-sm text-gray-600 placeholder-gray-400 outline-none focus:border-gray-400 w-40"
          />
          <button
            type="submit"
            className="ml-2 text-sm text-gray-500 hover:text-gray-700 shrink-0"
          >
            <BlogSearchIcon />
          </button>
        </form>

        <div className="flex items-center gap-4 text-sm text-gray-500 shrink-0">
          <Link href="/about" className="hover:text-gray-800" title="关于">
            <BlogAboutIcon />
          </Link>
          <a href="/feed.xml" className="hover:text-gray-800" title="RSS订阅">
            <BlogSubcribeIcon />
          </a>
        </div>
      </nav>

      <div className="flex-1 flex flex-col bg-white mx-auto w-full max-w-3xl">
        {children}
      </div>

      <footer className="mx-auto w-full max-w-3xl px-4 border-t border-gray-100 py-6 text-center text-xs text-gray-400 space-y-1 bg-white">
        <p>&copy; 2026 Ediaewu</p>
        <p>ICP 备案号：待申请</p>
        <p>
          <span>通过 </span>
          <a
            href="https://feedly.com/i/subscription/feed/https://ediaewu.com/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600"
          >
            Feedly
          </a>
          <span> 或 </span>
          <a href="/feed.xml" className="text-gray-400 hover:text-gray-600">
            RSS
          </a>
          <span> 订阅</span>
          <span> &middot; </span>
          <span>Powered by Next.js</span>
        </p>
      </footer>
    </div>
  );
}
