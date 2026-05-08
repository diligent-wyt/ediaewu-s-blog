import { getAllPosts, paginatePosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";

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
          <ul className="divide-y divide-gray-100">
            {posts.map((post) => (
              <li key={post.slug} className="py-8 first:pt-0 last:pb-0">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} basePath="/posts" />
    </main>
  );
}
