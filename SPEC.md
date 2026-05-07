# 产品规格说明 — Deligent Blog v1.0

## 1. 项目目标

构建一个**个人技术+生活博客**，满足三个核心诉求：

- **表达**：以 Markdown 写作，发布技术文章和生活随笔
- **连接**：读者可通过评论和点赞与作者互动
- **学习**：完整走完从需求 → 设计 → 开发 → 部署的软件工程流程

最终交付物：一个可通过个人域名访问的、可被搜索引擎索引的线上博客。

## 2. 目标用户

| 用户角色 | 描述 |
|----------|------|
| 博主（你自己） | 前端工程师，在本地编辑器用 Markdown 写作，git push 发布 |
| 读者 | 主要是中文技术社区的同行、同行学习者，以及对你生活内容感兴趣的朋友 |

读者典型行为：
- 从搜索引擎/社交媒体点进文章
- 浏览技术文章解决自己的问题
- 阅读生活类内容了解你的近况
- 对喜欢的文章点赞或留言

## 3. 页面清单

| 页面 | 路由 | 说明 |
|------|------|------|
| 封面页 | `/` | 全屏壁纸 + 博客名称 + 「进入博客」入口按钮，第一印象页 |
| 文章列表 | `/posts` | 所有已发布文章，按时间倒序，显示标题、日期、分类、摘要、标签 |
| 文章详情页 | `/posts/[slug]` | Markdown 渲染正文，底部 Giscus 评论区，点赞按钮 |
| 分类列表页 | `/categories/[category]` | 按分类筛选文章（tech / life） |
| 标签列表页 | `/tags/[tag]` | 按标签筛选文章 |
| 关于我 | `/about` | 个人介绍，头像，社交链接 |
| 404 页 | 任意不存在的路由 | 友好的 404 提示 |

## 4. 核心功能

### 4.0 封面页 — P0
- 全屏展示一张高质量壁纸（可替换）
- 居中显示博客名称
- 「进入博客」按钮，点击跳转到 `/posts`
- 营造个人品牌第一印象

### 4.1 文章列表 — P0
- 路由 `/posts`，按发布时间倒序排列
- 每篇文章显示：标题、发布日期、分类标签、摘要、标签列表
- 分页或"加载更多"

### 4.2 文章详情 — P0
- 从 Markdown 文件渲染 HTML
- 代码块语法高亮（支持常见编程语言）
- 支持 Markdown 图片
- 显示 frontmatter 中的元信息（标题、日期、分类、标签）

### 4.3 分类与标签 — P0
- 文章分为「技术」和「生活」两个主分类
- 每篇文章可有多个标签（如：React, TypeScript, 旅行）
- 分类页和标签页均展示对应文章列表

### 4.4 评论系统（Giscus）— P1
- 使用 Giscus，基于 GitHub Discussions，免费、无后端
- 每篇文章底部嵌入评论区
- 读者使用 GitHub 账号评论（天然过滤垃圾评论）
- 新评论通过 GitHub 通知提醒博主

### 4.5 点赞 — P1
- 每篇文章可点赞
- 显示点赞数

### 4.6 SEO 基础 — P1
- 每页有独立的 `<title>` 和 `<meta description>`
- Open Graph 标签（用于社交分享预览）
- 生成 `sitemap.xml` 和 `robots.txt`
- 语义化 HTML 结构

### 4.7 RSS 订阅 — P2
- 生成 RSS/Atom feed，方便读者用阅读器订阅

### 4.8 深色/浅色主题 — P2
- 支持手动切换深色/浅色模式
- 默认跟随系统主题

### 4.9 关于我 — P1
- 静态页面，介绍个人信息
- 头像、简介、社交链接（GitHub、Email 等）

## 5. 暂不做的功能（v1 范围外）

- 后台管理界面 / CMS
- 用户注册与登录
- 草稿与定时发布
- 文章全文搜索（初期靠分类和标签定位）
- 访问统计 / 数据分析
- 多语言国际化
- 评论审核面板
- 图片 CDN / 图床
- 邮件订阅 / Newsletter

## 6. 技术选型（已确认）

| 层面 | 选型 | 理由 |
|------|------|------|
| 框架 | **Next.js (App Router)** | React 生态，Vercel 原生支持，SSG/SSR 内置 |
| 内容解析 | **gray-matter + react-markdown** | 手写组合，轻量可控，理解 Markdown→HTML 过程 |
| 代码高亮 | **rehype-highlight** | remark/rehype 插件生态，构建时高亮 |
| 样式 | **Tailwind CSS** | Utility-first，无需手写 CSS 文件 |
| 评论 | **Giscus** | 基于 GitHub Discussions，免费无后端 |
| 点赞 | **JSON 文件 + API Route** | 简单可追溯，无需外部存储 |
| 部署 | **Vercel + 自定义域名** | 自动 CI/CD，git push 即部署 |
| 包管理器 | **pnpm** | 快，节省磁盘空间 |
| RSS | **feed 库（rss）** | 构建时生成 RSS XML |
| 主题切换 | **next-themes** | Next.js 生态标准方案 |

## 7. 内容模型

### 7.1 文章（Post）

```
content/
├── tech/           # 技术分类
│   ├── hello-world.md
│   └── react-hooks-guide.md
├── life/           # 生活分类
│   ├── my-2025-review.md
│   └── trip-to-japan.md
```

- 文件名即 slug（如 `hello-world` → `/posts/hello-world`）
- 分类由目录决定（`tech/` → 技术类，`life/` → 生活类）
- 一篇 Markdown 文件 = 一篇完整文章

### 7.2 静态页面（About）

关于我页面是一份单独的 Markdown 文件（或直接在代码中写死），不参与文章列表。

## 8. 每篇文章的 Frontmatter 字段

每篇 Markdown 文件顶部使用 YAML frontmatter，字段如下：

```yaml
---
title: "文章标题"             # 必填，文章的 h1 标题
date: "2026-01-15"            # 必填，发布日期，ISO 8601 格式
category: "tech"              # 必填，tech 或 life
tags: ["React", "TypeScript"] # 可选，标签列表，用于筛选
summary: "一句话摘要"          # 必填，用于首页列表和 SEO description
draft: false                  # 可选，draft: true 的文章不显示
updated: "2026-03-01"         # 可选，最后更新日期
---
```

## 9. SEO 要求

### 每篇文章页面
- `<title>` = `{文章标题} - Deligent Blog`
- `<meta name="description">` = `{文章 summary}`
- Open Graph：`og:title`, `og:description`, `og:type=article`, `og:url`
- 如文章有头图（未来扩展），加 `og:image`
- 使用 `<article>` 语义标签包裹正文

### 封面页
- `<title>` = `Deligent Blog`
- `<meta name="description">` = 博客简介（可配置）

### 文章列表页
- `<title>` = `文章 - Deligent Blog`

### 全局
- `sitemap.xml`：列出所有公开文章和页面
- `robots.txt`：允许爬虫，指向 sitemap
- 所有 `<a>` 使用语义化的 href（非 SPA 路由），确保爬虫可追踪

## 10. 验收标准

### 功能验收

| # | 验收项 | 验收方式 |
|---|--------|----------|
| 1 | 封面页显示壁纸和「进入博客」入口 | 浏览器访问 `localhost:3000` |
| 2 | 文章列表 `/posts` 展示所有已发布文章 | 点击「进入博客」按钮或直接访问 `/posts` |
| 3 | 点击文章标题进入详情页，Markdown 正确渲染 | 查看代码块高亮、图片显示、排版正常 |
| 4 | 分类页 `/categories/tech` 只显示技术文章 | 浏览器验证 |
| 5 | 标签页 `/tags/react` 只显示含该标签的文章 | 浏览器验证 |
| 6 | 文章底部可评论 | 实际发表一条评论并看到显示 |
| 7 | 文章可点赞，点赞数变化 | 点击点赞按钮，数字 +1 |
| 8 | `/about` 页面正常显示 | 浏览器验证 |
| 9 | 不存在的路由显示 404 页面 | 访问 `/random-path` |

### 内容验收

| # | 验收项 | 验收方式 |
|---|--------|----------|
| 10 | 至少有一篇技术文章和一篇生活文章 | 查看文章列表 |
| 11 | 每篇文章 frontmatter 字段完整 | 检查 Markdown 文件 |

### 部署验收

| # | 验收项 | 验收方式 |
|---|--------|----------|
| 12 | Vercel 部署成功 | 访问 Vercel 分配的域名看到博客 |
| 13 | 自定义域名可访问 | 浏览器输入个人域名，博客正常显示 |
| 14 | `sitemap.xml` 可访问 | 浏览器访问 `/sitemap.xml` |
| 15 | RSS feed 可访问 | 浏览器/RSS 阅读器访问 `/feed.xml`（如做了 RSS） |

### 学习验收

| # | 验收项 |
|---|--------|
| 16 | 能向别人解释：为什么要做需求访谈 → spec → 技术选型 → plan → 小步实现的顺序 |
| 17 | 能独立完成一次 `git push` → Vercel 自动部署的完整流程 |
