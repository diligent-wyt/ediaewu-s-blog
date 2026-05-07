import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">文章</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">还没有文章。</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
