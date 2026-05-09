import type { Metadata } from "next";
import { getAllPosts, paginatePosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";

export const metadata: Metadata = {
  title: "文章列表",
  description: "一个前端工程师的技术与生活文章",
};

export default function PostsPage() {
  const allPosts = getAllPosts();
  const { posts, page, totalPages } = paginatePosts(allPosts, 1);

  return (
    <main className="flex flex-1 flex-col mx-auto max-w-3xl px-4 py-12 bg-white">
      <h1 className="mb-8 text-3xl font-bold">青衫录</h1>

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

      <Pagination page={page} totalPages={totalPages} basePath="/posts" />
    </main>
  );
}
