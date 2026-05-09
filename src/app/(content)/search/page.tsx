import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "搜索",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

function search(query: string, posts: ReturnType<typeof getAllPosts>) {
  if (!query.trim()) return [];
  const words = query.trim().toLowerCase().split(/\s+/);
  return posts.filter((post) => {
    const haystack = `${post.title} ${post.summary} ${post.tags.join(" ")}`.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const allPosts = getAllPosts();
  const results = q ? search(q, allPosts) : [];

  return (
    <main className="flex flex-1 flex-col mx-auto max-w-3xl px-4 py-12 bg-white">
      <h1 className="mb-2 text-3xl font-bold">
        {q ? `搜索结果：${q}` : "搜索"}
      </h1>

      {q ? (
        <p className="mb-8 text-sm text-gray-500">
          找到 {results.length} 篇文章
        </p>
      ) : (
        <p className="mb-8 text-sm text-gray-500">
          请输入关键词搜索文章
        </p>
      )}

      <div className="flex-1">
        {results.length === 0 && q ? (
          <p className="text-gray-500">未找到相关文章。</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {results.map((post) => (
              <li key={post.slug} className="py-8 first:pt-0 last:pb-0">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
