# Deployment Hardening Plan — Deligent Blog v1.0

基于 2026-05-07 Gap Analysis 审计结果生成。
**规则**：每个任务独立可验证，完成后暂停等确认。

---

## 总览

```
P0 (3 任务)  修复 bug + 清理 + README
P1 (5 任务)  视觉分层 + Footer + 导航 + 点赞动画 + 主题
P2 (4 任务)  分页 + 移动端 + 代码复制 + 阅读时间（后续）
```

---

## P0：部署前必须修复

### 任务 P0-1 — 文章详情页标签和分类可点击

**目标**：文章详情页的分类徽章和标签从 `<span>` 改为 `<Link>`，与 PostCard 保持一致。

**为什么**：PostCard 的标签/分类可点击（任务 9.3），但详情页的相同元素仍然是 `<span>`。同一页面里读者看到标签却点不了，体验不一致。

**涉及文件**：`src/app/posts/[slug]/page.tsx`

**具体实现**：

- category 徽章：`<span>` → `<Link href={/categories/${post.category}}>`
- 每个 tag：`<span>` → `<Link href={/tags/${tag}}>`
- 保持相同的 Tailwind 样式
- 需要 `import Link from "next/link"`

**验证命令**：

```bash
npx tsc --noEmit
curl http://localhost:3000/posts/hello-world | grep -oE 'href="/categories/|href="/tags/'
```

**验收标准**：

- 详情页分类徽章可点击，跳转到 `/categories/tech`
- 每个标签可点击，跳转到 `/tags/React`
- TypeScript 编译无错

---

### 任务 P0-2 — 清理 public/ 脚手架文件

**目标**：删除 `create-next-app` 生成的 5 个默认文件。

**为什么**：这 5 个 SVG 文件是 Next.js 脚手架生成的样板资源，博客完全用不到。属于垃圾文件，部署前清理。

**涉及文件**：

- `public/file.svg`（删除）
- `public/globe.svg`（删除）
- `public/next.svg`（删除）
- `public/vercel.svg`（删除）
- `public/window.svg`（删除）

**具体实现**：直接删除这 5 个文件。

**验证命令**：

```bash
ls public/
```

**验收标准**：`public/` 下只剩 `images/` 目录。

---

### 任务 P0-3 — 重写 README.md

**目标**：把 README 从脚手架默认内容替换为真实的项目说明。

**为什么**：GitHub 仓库首页是访问者了解项目的第一入口。当前 README 是 Next.js 默认内容，需要有真实的中文说明。

**涉及文件**：`README.md`

**具体实现**：写一份简洁 README，包含：

- 博客名称和一句话介绍
- 技术栈列表
- 本地运行命令
- 如何发布新文章
- 部署说明

不写代码示例、不写 API 文档。

**验证命令**：打开 README.md 查看。

**验收标准**：README 包含项目介绍、技术栈、运行命令、发文章步骤。

---

## P1：强烈建议优化

### 任务 P1-1 — 页面视觉分层：浅灰背景 + 白色内容卡片

> ⚠️ **需要产品决策**：以下方案是推荐方案，你需要确认颜色、是否加阴影、封面页是否保留原样。

**目标**：内容页面（文章列表、详情、分类、标签、关于）增加背景色区分，内容区用白色卡片展示。

**为什么**：当前所有页面纯白背景，中间内容区和两侧完全一样，看起来像一个未完成的页面。几乎所有博客都有视觉分层。

**涉及文件**：

| 文件                                     | 改动                                    |
| ---------------------------------------- | --------------------------------------- |
| `src/app/layout.tsx`                     | body 背景色 `bg-white` → `bg-gray-50`   |
| `src/app/posts/page.tsx`                 | main 加 `bg-white rounded-xl shadow-sm` |
| `src/app/posts/[slug]/page.tsx`          | main 加 `bg-white rounded-xl shadow-sm` |
| `src/app/categories/[category]/page.tsx` | main 加 `bg-white rounded-xl shadow-sm` |
| `src/app/tags/[tag]/page.tsx`            | main 加 `bg-white rounded-xl shadow-sm` |
| `src/app/about/page.tsx`                 | main 加 `bg-white rounded-xl shadow-sm` |
| `src/app/not-found.tsx`                  | main 加 `bg-white rounded-xl shadow-sm` |
| `src/app/page.tsx`                       | **不动**（封面页保持全屏山水画）        |

**具体实现**：每个内容页面的 `<main>` 标签增加 `bg-white rounded-xl shadow-sm`，body 背景改为 `bg-gray-50`。封面页和 404 页不改。

**待决策**：

1. 背景色用 `bg-gray-50` 还是其他浅色？
2. 白色卡片是否加 `rounded-xl`（大圆角）还是 `rounded-lg`？
3. 封面页保持全屏山水画 vs 也统一风格？

**验证命令**：

```bash
# 所有页面 HTTP 200
for p in / /posts /posts/hello-world /categories/tech /tags/React /about; do
  curl -s -o /dev/null -w "%{http_code}" http://localhost:3000$p && echo " $p"
done
```

**验收标准**：

- 浏览器访问 `/posts`，看到浅灰背景 + 白色内容卡片
- 封面页保持全屏山水画不变
- 所有页面正常渲染

---

### 任务 P1-2 — Footer 增加版权和备案号

**目标**：Footer 在 RSS 订阅的基础上，增加版权年份和 ICP 备案号占位。

**为什么**：中国境内网站需要展示 ICP 备案号。版权声明也是博客的基本配置。

**涉及文件**：`src/app/layout.tsx`

**具体实现**：在 footer 中增加：

```html
<p>© 2026 Ediaewu</p>
<p>ICP 备案号：待申请</p>
<p>通过 Feedly 或 RSS 订阅</p>
```

> ⚠️ `ICP 备案号` 是占位文字，你需要购买域名并申请备案后才能替换为真实备案号。

**验证命令**：

```bash
curl http://localhost:3000/ | grep -o "© 2026\|ICP 备案号"
```

**验收标准**：所有页面底部都有版权年份和 ICP 占位。

---

### 任务 P1-3 — 文章详情页上一篇 / 下一篇导航

**目标**：文章正文下方增加上一篇/下一篇链接，引导读者持续阅读。

**为什么**：读者读完一篇文章后，唯一的出路是浏览器后退或手动点 `/posts`。没被引导就会离开。上一篇/下一篇是博客的标准交互。

**涉及文件**：`src/app/posts/[slug]/page.tsx`

**具体实现**：

- 调用 `getAllPosts()` 获取排序后的文章列表
- 找到当前文章在数组中的 index
- `prev = posts[index - 1]`（如果 index > 0）
- `next = posts[index + 1]`（如果 index < posts.length - 1）
- 在文章正文下方、点赞按钮上方渲染导航
- 样式：左右两个链接块，左边 ← 上一篇，右边 下一篇 →
- 如果是第一篇则只显示下一篇，最后一篇只显示上一篇

**布局**：

```
┌──────────────────────────────────┐
│  ← 上一篇             下一篇 →  │
│  周末骑行记         Hello World │
└──────────────────────────────────┘
```

**验证命令**：

```bash
# 第一篇文章（只有下一篇）
curl http://localhost:3000/posts/hello-world | grep -c "下一篇"
# 最后一篇文章（只有上一篇）
curl http://localhost:3000/posts/my-first-post | grep -c "上一篇"
```

**验收标准**：

- hello-world（第一篇）：显示"下一篇 → 周末骑行记"
- my-first-post（最后一篇）：显示"← 上一篇 Hello World"
- 只有 2 篇文章时，第一篇只有下一篇，最后一篇只有上一篇
- TypeScript 编译无错

---

### 任务 P1-4 — 点赞按钮增加动画

> ⚠️ **需要产品决策**：3 种方案，你需要选一个。

**目标**：点击点赞按钮时有一个视觉反馈，读者知道"点到了"。

**为什么**：当前点赞只是数字从 N 变成 N+1，没有任何动画。读者可能不确定是否点成功了。

**涉及文件**：`src/components/LikeButton.tsx`

**3 种方案**：

|        | 方案 A：心跳                   | 方案 B：粒子         | 方案 C：烟花         |
| ------ | ------------------------------ | -------------------- | -------------------- |
| 效果   | ❤️ 放大再弹回                  | 小圆点从爱心散出     | canvas 绘制烟花      |
| 复杂度 | 低，1 个 state + CSS animation | 中，多个绝对定位 div | 高，canvas API + ref |
| 代码量 | +5 行                          | +30 行               | +60 行               |
| 视觉   | 简洁、清晰                     | 活泼、有趣           | 华丽、炫酷           |

**推荐方案 A**，理由：实现最简，效果明确。

**方案 A 具体实现**：

- 添加 `animating` state
- 点击时 `setAnimating(true)`，300ms 后 `setAnimating(false)`
- CSS：`animating ? "scale-125" : "scale-100"` + `transition-transform duration-300`

**验证命令**：

```bash
npx tsc --noEmit
# 浏览器点击 ❤️，观察动画
```

**验收标准**：点击 ❤️ 后图标短暂放大再弹回，数字 +1，整个过程流畅。

---

### 任务 P1-5 — CSS 变量主题（跟随系统）

> ⚠️ **需要产品决策**：之前的 next-themes 方案已撤销。此方案是纯 CSS 方案，不需要 JS。后续如需手动切换可再加。

**目标**：博客的颜色跟随系统深色/浅色模式切换。

**为什么**：读者如果在深夜打开你的博客，一个全白的页面会刺眼。跟随系统主题是基本的阅读体验。

**涉及文件**：

| 文件                  | 改动                                                 |
| --------------------- | ---------------------------------------------------- |
| `src/app/globals.css` | 整理 CSS 变量，确保 light/dark 覆盖所有关键颜色      |
| `src/app/layout.tsx`  | body 使用 CSS 变量而不是硬编码 `bg-white text-black` |
| 所有页面的 `.tsx`     | 检查是否有硬编码的颜色需要替换                       |

**具体实现**：

```
不用 next-themes（无 JS，零 'use client'）
只用 CSS 媒体查询：@media (prefers-color-scheme: dark)

globals.css:
  :root {
    --bg-primary: #ffffff;
    --bg-secondary: #f9fafb;
    --text-primary: #171717;
    ...
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg-primary: #0a0a0a;
      ...
    }
  }

所有 .tsx 中：把硬编码的 bg-white 等替换为 CSS 变量驱动的背景色
```

> 注意：Tailwind v4 的 CSS 变量和 `dark:` 前缀需要配合使用，不能直接在 className 中使用任意 CSS 变量语法。推荐方案是保持 body 背景跟随系统，其余用 Tailwind `dark:` 前缀，但不引入 next-themes。这需要 Tailwind 的 `darkMode: 'media'` 配置。

**修改文件**：`src/app/globals.css`、`src/app/layout.tsx`、所有页面/组件的 `.tsx`。

**验证命令**：

```bash
# 在 Chrome DevTools → Rendering → Emulate CSS prefers-color-scheme: dark
# 观察页面颜色变化
```

**验收标准**：

- 系统切换为深色模式时，博客背景变暗、文字变亮
- 切换回浅色模式时恢复正常
- 封面页也需要适配深色模式（山脉颜色、月亮在暗色下更明显）

---

## P2：后续迭代

| 任务            | 触发条件         |
| --------------- | ---------------- |
| 分页 / 加载更多 | 文章 ≥ 10 篇     |
| 移动端实测      | 部署前过一遍     |
| 代码块复制按钮  | 用户反馈需求     |
| 阅读时间估计    | 文章 ≥ 5 篇      |
| 回到顶部按钮    | 文章超过 3000 字 |

---

## 第一个最小任务

> **任务 P0-1 — 文章详情页标签和分类可点击**
>
> 修改 `src/app/posts/[slug]/page.tsx`，把 tag 和 category 从 `<span>` 改为 `<Link>`。
> 预计 5 分钟，1 个文件。

准备好了就说"开始 P0-1"。
