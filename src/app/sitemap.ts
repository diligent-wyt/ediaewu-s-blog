import type { MetadataRoute } from "next";
import { getAllPosts, paginatePosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL ?? "https://ediaewu.cn";
  const allPosts = getAllPosts();

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/posts`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  // Category pages
  for (const category of ["tech", "life"]) {
    const filtered = allPosts.filter((p) => p.category === category);
    const { totalPages } = paginatePosts(filtered, 1);
    staticRoutes.push({
      url: `${baseUrl}/categories/${category}`,
      lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6,
    });
    for (let p = 2; p <= totalPages; p++) {
      staticRoutes.push({
        url: `${baseUrl}/categories/${category}/p/${p}`,
        lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3,
      });
    }
  }

  // Tag pages
  const tagSet = new Set(allPosts.flatMap((p) => p.tags));
  for (const tag of tagSet) {
    const filtered = allPosts.filter((p) => p.tags.includes(tag));
    const { totalPages } = paginatePosts(filtered, 1);
    const encodedTag = encodeURIComponent(tag);
    staticRoutes.push({
      url: `${baseUrl}/tags/${encodedTag}`,
      lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5,
    });
    for (let p = 2; p <= totalPages; p++) {
      staticRoutes.push({
        url: `${baseUrl}/tags/${encodedTag}/p/${p}`,
        lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3,
      });
    }
  }

  // Post pages
  const postRoutes = allPosts.map((post) => ({
    url: `${baseUrl}/posts/${encodeURIComponent(post.slug)}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 1.0,
  }));

  // Paginated post list
  const { totalPages: postPages } = paginatePosts(allPosts, 1);
  const paginatedRoutes = [];
  for (let p = 2; p <= postPages; p++) {
    paginatedRoutes.push({
      url: `${baseUrl}/posts/p/${p}`,
      lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4,
    });
  }

  return [...staticRoutes, ...postRoutes, ...paginatedRoutes];
}
