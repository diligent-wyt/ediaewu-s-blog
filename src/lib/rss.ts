import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";

export function generateFeedXml(): string {
  const baseUrl = "https://ediaewu.com";
  const posts = getAllPosts();

  const feed = new Feed({
    title: "Ediaewu's Blog",
    description: "一个前端工程师的技术与生活",
    id: baseUrl,
    link: baseUrl,
    language: "zh-CN",
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    author: {
      name: "Ediaewu",
      link: baseUrl,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${baseUrl}/posts/${post.slug}`,
      link: `${baseUrl}/posts/${post.slug}`,
      description: post.summary,
      date: new Date(post.date),
    });
  }

  return feed.rss2();
}
