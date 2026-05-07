import Link from "next/link";
import type { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article>
      <Link
        href={`/posts/${post.slug}`}
        className="text-xl font-semibold text-blue-600 hover:text-blue-800"
      >
        {post.title}
      </Link>

      <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
        <time dateTime={post.date}>{post.date}</time>
        <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 uppercase">
          {post.category}
        </span>
      </div>

      <p className="mt-2 text-gray-600">{post.summary}</p>
    </article>
  );
}
