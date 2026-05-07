# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Deligent Blog — a personal tech + life blog. The author is a frontend engineer who writes in Markdown, commits via git, and publishes to Vercel. No CMS, no backend.

## Tech Stack

- **Framework**: Next.js (App Router) + React — Vercel native support, SSG/SSR built-in
- **Content parsing**: gray-matter (frontmatter) + react-markdown (rendering) + rehype-highlight (code highlighting)
- **Styling**: Tailwind CSS — utility-first, no custom CSS files
- **Comments**: Giscus — free, uses GitHub Discussions, no backend
- **Likes**: JSON file (`data/likes.json`) + API Route — simple, no database
- **Deployment**: Vercel with custom domain, CI/CD via git push
- **Package manager**: pnpm
- **RSS**: `feed` library — generates RSS XML at build time
- **Theme**: next-themes — dark/light mode toggle

## Content Model

```
content/
├── tech/           # → category "tech"
│   ├── hello-world.md
│   └── react-hooks-guide.md
├── life/           # → category "life"
│   ├── my-2025-review.md
│   └── trip-to-japan.md
```

File name = slug. Category derived from parent directory. Every Markdown file has YAML frontmatter:

```yaml
---
title: "Article Title"
date: "2026-01-15"
category: "tech"            # tech | life
tags: ["React", "TypeScript"]
summary: "One-line summary"
draft: false                # true = hidden from production
updated: "2026-03-01"       # optional
---
```

## Routes

| Page | Route |
|------|-------|
| Cover (splash) | `/` |
| Post list | `/posts` |
| Post detail | `/posts/[slug]` |
| Category filter | `/categories/[category]` |
| Tag filter | `/tags/[tag]` |
| About | `/about` |
| 404 | catch-all |

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run tests (Vitest/Jest)
```

## Reference

- [SPEC.md](SPEC.md) — Full product specification, acceptance criteria, and technical constraints.
- [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) — Step-by-step implementation tasks.

## Scope Boundaries

**In scope for v1**: Splash/cover page, Markdown rendering with code highlighting, categories/tags filtering, Giscus comments, likes, SEO (meta tags, sitemap.xml, robots.txt, Open Graph), RSS feed, dark/light theme, About page.

**Explicitly out of scope for v1**: CMS/backend, user auth, drafts scheduling, full-text search, analytics, i18n, comment moderation panel, image CDN, email newsletter.
