import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, paginatePosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";

interface PageParams {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tagSet = new Set(posts.flatMap((post) => post.tags));
  return [...tagSet].map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `${decodedTag} - 标签`,
    description: `包含"${decodedTag}"标签的文章列表`,
  };
}

export default async function TagPage({ params }: PageParams) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const allPosts = getAllPosts().filter((post) => post.tags.includes(decodedTag));

  if (allPosts.length === 0) {
    notFound();
  }

  const { posts, page, totalPages } = paginatePosts(allPosts, 1);

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

      <Pagination page={page} totalPages={totalPages} basePath={`/tags/${tag}`} />
    </main>
  );
}
