import Link from "next/link";
import { BlogPageIcon, BlogPageRightIcon } from "./BlogIcon";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ page, totalPages, basePath }: PaginationProps) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  // page 1 = /posts, page N = /posts/p/N
  function pageUrl(p: number): string {
    return p === 1 ? basePath : `${basePath}/p/${p}`;
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-1 text-sm">
      {hasPrev ? (
        <Link
          href={pageUrl(page - 1)}
          className="px-3 py-1.5 rounded border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          <BlogPageIcon />
          上一页
        </Link>
      ) : (
        <span className="px-3 py-1.5 rounded border border-gray-200 text-gray-300">
          <BlogPageIcon />
          上一页
        </span>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
        p === page ? (
          <span
            key={p}
            className="w-9 h-9 flex items-center justify-center rounded border border-[var(--accent)] bg-[var(--accent)] text-white text-sm font-semibold"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={pageUrl(p)}
            className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            {p}
          </Link>
        ),
      )}

      {hasNext ? (
        <Link
          href={pageUrl(page + 1)}
          className="px-3 py-1.5 rounded border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          下一页
          <BlogPageRightIcon />
        </Link>
      ) : (
        <span className="px-3 py-1.5 rounded border border-gray-200 text-gray-300">
          下一页
          <BlogPageRightIcon />
        </span>
      )}
    </nav>
  );
}
