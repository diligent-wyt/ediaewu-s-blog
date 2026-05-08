"use client";

import { useState, useEffect, useCallback } from "react";

interface LikeButtonProps {
  slug: string;
}

const LIKED_KEY = "liked_slugs";

function getLikedSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LIKED_KEY) || "[]");
  } catch {
    return [];
  }
}

function isLiked(slug: string): boolean {
  return getLikedSlugs().includes(slug);
}

function toggleLiked(slug: string): boolean {
  const slugs = getLikedSlugs();
  const idx = slugs.indexOf(slug);
  if (idx >= 0) {
    slugs.splice(idx, 1);
    localStorage.setItem(LIKED_KEY, JSON.stringify(slugs));
    return false; // now unliked
  }
  slugs.push(slug);
  localStorage.setItem(LIKED_KEY, JSON.stringify(slugs));
  return true; // now liked
}

export function LikeButton({ slug }: LikeButtonProps) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch("/api/likes")
      .then((res) => res.json())
      .then((data) => {
        const serverCount = data[slug] ?? 0;
        setCount(serverCount);
        if (serverCount === 0) {
          // 服务器计数已归零，清除本地点赞记录
          const slugs = getLikedSlugs().filter((s) => s !== slug);
          localStorage.setItem(LIKED_KEY, JSON.stringify(slugs));
          setLiked(false);
        } else {
          setLiked(isLiked(slug));
        }
        setLoading(false);
      });
  }, [slug]);

  const handleToggle = useCallback(() => {
    if (liked && count <= 0) return;
    const nowLiked = !liked;
    toggleLiked(slug);
    setLiked(nowLiked);

    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    setCount((prev) => prev + (nowLiked ? 1 : -1));

    fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action: nowLiked ? "like" : "unlike" }),
    });
  }, [slug, liked, count]);

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      title={liked ? "取消点赞" : "点赞"}
      className="group"
    >
      <span
        className={`text-2xl inline-block transition-transform ${animating ? "scale-125" : ""}`}
      >
        ❤️
      </span>
      <span className="ml-2 text-lg font-medium text-gray-600">
        {loading ? "..." : count}
      </span>
    </button>
  );
}
