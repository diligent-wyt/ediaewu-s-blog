import type { Metadata } from "next";
import { getAllPosts, paginatePosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";

interface PageParams {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `文章列表 - 第${page}页`,
    robots: { index: false, follow: true },
  };
}

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const { totalPages } = paginatePosts(allPosts, 1);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export default async function PostsPageN({ params }: PageParams) {
  const { page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  const allPosts = getAllPosts();
  const { posts, page: currentPage, totalPages } = paginatePosts(allPosts, page);

  return (
    <main className="flex flex-1 flex-col mx-auto max-w-3xl px-4 py-12 bg-white">
      <h1 className="mb-8 text-3xl font-bold">文章</h1>

      <div className="flex-1">
        {posts.length === 0 ? (
          <p className="text-gray-500">还没有文章。</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>

      <Pagination page={currentPage} totalPages={totalPages} basePath="/posts" />
    </main>
  );
}
