import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, paginatePosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";

interface PageParams {
  params: Promise<{ category: string; page: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { category, page } = await params;
  return {
    title: `${CATEGORY_LABELS[category] ?? category} - 分类 - 第${page}页`,
    robots: { index: false, follow: true },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  tech: "技术",
  life: "生活",
};

export async function generateStaticParams() {
  const result: { category: string; page: string }[] = [];
  for (const category of ["tech", "life"]) {
    const filtered = getAllPosts().filter((post) => post.category === category);
    const { totalPages } = paginatePosts(filtered, 1);
    for (let p = 2; p <= totalPages; p++) {
      result.push({ category, page: String(p) });
    }
  }
  return result;
}

export default async function CategoryPageN({ params }: PageParams) {
  const { category, page: pageStr } = await params;
  const page = parseInt(pageStr, 10);

  if (!(category in CATEGORY_LABELS)) {
    notFound();
  }

  const filtered = getAllPosts().filter((post) => post.category === category);
  const { posts, page: currentPage, totalPages } = paginatePosts(filtered, page);

  if (currentPage !== page || posts.length === 0) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col mx-auto max-w-3xl px-4 py-12 bg-white">
      <h1 className="mb-2 text-3xl font-bold">
        {CATEGORY_LABELS[category]}
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        {filtered.length} 篇文章
      </p>

      <div className="flex-1">
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>

      <Pagination page={currentPage} totalPages={totalPages} basePath={`/categories/${category}`} />
    </main>
  );
}
