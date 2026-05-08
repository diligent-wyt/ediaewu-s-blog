"use client";

import GiscusReact from "@giscus/react";

interface GiscusProps {
  slug: string;
}

export function Giscus({ slug }: GiscusProps) {
  return (
    <GiscusReact
      repo="diligent-wyt/ediaewu-s-blog"
      repoId="R_kgDOSWvJqw"
      category="General"
      categoryId="DIC_kwDOSWvJq84C8gUS"
      mapping="specific"
      term={slug}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="zh-CN"
      loading="lazy"
    />
  );
}
