import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  draft: boolean;
  updated?: string;
  content: string;
}

function readMarkdownFiles(dir: string): Post[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const posts: Post[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subdir = path.join(dir, entry.name);
      const files = fs.readdirSync(subdir);

      for (const file of files) {
        if (!file.endsWith(".md")) continue;

        const filePath = path.join(subdir, file);
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(raw);
        const slug = file.replace(/\.md$/, "");
        const category = entry.name;

        posts.push({
          slug,
          title: data.title ?? slug,
          date: data.date ?? "",
          category,
          tags: data.tags ?? [],
          summary: data.summary ?? "",
          draft: data.draft ?? false,
          updated: data.updated,
          content,
        });
      }
    }
  }

  return posts;
}

export function getAllPosts(): Post[] {
  const posts = readMarkdownFiles(CONTENT_ROOT);
  return posts
    .filter((post) => !post.draft)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(slug: string): Post | null {
  const posts = readMarkdownFiles(CONTENT_ROOT);
  return posts.find((post) => post.slug === slug) ?? null;
}

