import Link from "next/link";
import type { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article>
      <Link
        href={`/posts/${encodeURIComponent(post.slug)}`}
        className="text-xl font-semibold text-[#3b5998] hover:text-[#2d4373]"
      >
        {post.title}
      </Link>

      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <time dateTime={post.date}>{post.date}</time>
        <Link
          href={`/categories/${post.category}`}
          className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 uppercase hover:bg-blue-200"
        >
          {post.category}
        </Link>
      </div>

      {post.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="rounded border border-gray-200 px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-100"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      <p className="mt-2 text-gray-600 leading-relaxed">{post.summary}</p>
    </article>
  );
}
