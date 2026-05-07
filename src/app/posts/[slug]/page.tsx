import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PageParams) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold">{post.title}</h1>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <time dateTime={post.date}>{post.date}</time>
          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 uppercase">
            {post.category}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <article className="prose prose-gray max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
