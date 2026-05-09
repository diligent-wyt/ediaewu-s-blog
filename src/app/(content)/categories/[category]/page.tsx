import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, paginatePosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";

interface PageParams {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return [{ category: "tech" }, { category: "life" }];
}

const CATEGORY_LABELS: Record<string, string> = {
  tech: "技术",
  life: "生活",
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category] ?? category;
  return {
    title: `${label} - 分类`,
    description: `${label}相关的文章列表`,
  };
}

export default async function CategoryPage({ params }: PageParams) {
  const { category } = await params;

  if (!(category in CATEGORY_LABELS)) {
    notFound();
  }

  const filtered = getAllPosts().filter((post) => post.category === category);
  const { posts, page, totalPages } = paginatePosts(filtered, 1);

  return (
    <main className="flex flex-1 flex-col mx-auto max-w-3xl px-4 py-12 bg-white">
      <h1 className="mb-2 text-3xl font-bold">
        {CATEGORY_LABELS[category]}
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        {filtered.length} 篇文章
      </p>

      <div className="flex-1">
        {posts.length === 0 ? (
          <p className="text-gray-500">该分类下还没有文章。</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} basePath={`/categories/${category}`} />
    </main>
  );
}
