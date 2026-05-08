# Ediaewu's Blog

个人技术 + 生活博客。用 Markdown 写作，git push 发布，Vercel 自动部署。

## 技术栈

- **框架**：Next.js 16 (App Router) + React 19
- **语言**：TypeScript
- **样式**：Tailwind CSS v4
- **内容**：Markdown (gray-matter + react-markdown + rehype-highlight)
- **评论**：Giscus（基于 GitHub Discussions）
- **部署**：Vercel

## 本地运行

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # 生产构建
pnpm start      # 启动生产服务器
```

## 发布文章

1. 在 `content/tech/` 或 `content/life/` 下新建 `.md` 文件
2. 填写 frontmatter（标题、日期、分类、标签、摘要）
3. `git commit` → `git push`
4. Vercel 自动部署

```yaml
---
title: "文章标题"
date: "2026-05-01"
category: "tech"
tags: ["React", "TypeScript"]
summary: "一句话摘要"
draft: false
---
```

## 项目结构

```
content/         # Markdown 文章
src/app/         # Next.js 路由页面
src/components/  # 复用组件
src/lib/         # 工具函数
data/            # 运行时数据（点赞数）
public/          # 静态资源
```
