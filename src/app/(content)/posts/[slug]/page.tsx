import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Giscus } from "@/components/Giscus";
import { BackToTop } from "@/components/BackToTop";
import { BlogPageIcon, BlogPageRightIcon } from "@/components/BlogIcon";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "文章不存在" };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageParams) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 bg-white">
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold">{post.title}</h1>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <time dateTime={post.date}>{post.date}</time>
          <Link
            href={`/categories/${post.category}`}
            className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 uppercase hover:bg-blue-200"
          >
            {post.category}
          </Link>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-200"
            >
              {tag}
            </Link>
          ))}
        </div>
      </header>

      <article className="prose prose-gray max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      <hr className="my-12 border-gray-200" />

      <nav className="mb-8 flex justify-between text-sm text-gray-500">
        <div>
          {prevPost ? (
            <Link
              href={`/posts/${encodeURIComponent(prevPost.slug)}`}
              className="hover:text-[var(--accent)]"
            >
              <BlogPageIcon />
              上一篇：《{prevPost.title}》
            </Link>
          ) : null}
        </div>
        <div>
          {nextPost ? (
            <Link
              href={`/posts/${encodeURIComponent(nextPost.slug)}`}
              className="hover:text-[var(--accent)]"
            >
              《{nextPost.title}》下一篇 <BlogPageRightIcon />
            </Link>
          ) : null}
        </div>
      </nav>

      <Giscus slug={slug} />
      <BackToTop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            author: { "@type": "Person", name: "Ediaewu" },
            description: post.summary,
            url: `${process.env.SITE_URL ?? "https://ediaewu.cn"}/posts/${encodeURIComponent(post.slug)}`,
          }),
        }}
      />
    </main>
  );
}
