import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, paginatePosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";

interface PageParams {
  params: Promise<{ tag: string; page: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { tag, page } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `${decodedTag} - 标签 - 第${page}页`,
    robots: { index: false, follow: true },
  };
}

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const tagSet = new Set(allPosts.flatMap((post) => post.tags));
  const result: { tag: string; page: string }[] = [];
  for (const tag of tagSet) {
    const filtered = allPosts.filter((post) => post.tags.includes(tag));
    const { totalPages } = paginatePosts(filtered, 1);
    for (let p = 2; p <= totalPages; p++) {
      result.push({ tag: encodeURIComponent(tag), page: String(p) });
    }
  }
  return result;
}

export default async function TagPageN({ params }: PageParams) {
  const { tag, page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  const decodedTag = decodeURIComponent(tag);
  const allPosts = getAllPosts().filter((post) => post.tags.includes(decodedTag));

  if (allPosts.length === 0) {
    notFound();
  }

  const { posts, page: currentPage, totalPages } = paginatePosts(allPosts, page);

  if (currentPage !== page || posts.length === 0) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col mx-auto max-w-3xl px-4 py-12 bg-white">
      <h1 className="mb-2 text-3xl font-bold">{decodedTag}</h1>
      <p className="mb-8 text-sm text-gray-500">
        标签 · {allPosts.length} 篇文章
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

      <Pagination page={currentPage} totalPages={totalPages} basePath={`/tags/${tag}`} />
    </main>
  );
}
