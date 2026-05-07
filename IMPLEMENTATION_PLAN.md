# Implementation Plan — Deligent Blog v1.0

## 总览

13 个阶段，36 个任务。每个任务包含：目标、文件、实现内容、验证命令、完成标准。

**规则**：

- 每完成一个任务后总结：1.做了什么2.修改了哪些文件3. 运行了什么验证命令4. 验证结果是什么5. 下一步建议是什么；暂停等我确认后进入下一个
- 若我说"解释一下"，用初学者能懂的语言解释当前步骤
- 若我说"继续"，进入下一个任务

---

## Phase 0：项目脚手架（4 个任务）

### 任务 0.1 — 初始化 git 仓库

**目标**：让项目具备版本控制能力，后续每一步变更都可追溯。

**要新增或修改的文件**：

- `c:\Users\14549\Desktop\deligent-blog\.gitignore`

**实现内容**：

- 在项目根目录执行 `git init`
- 创建 `.gitignore`，忽略 `node_modules/`、`.next/`、`.env*.local` 等

**验证命令**：

```bash
git status
```

**完成标准**：

- `git status` 显示 "On branch main" 且无报错
- `.gitignore` 包含 `node_modules/` 和 `.next/`

---

### 任务 0.2 — 使用 create-next-app 脚手架项目

**目标**：生成 Next.js 项目骨架，确保基础框架可运行。

**要新增或修改的文件**：

- `package.json`、`tsconfig.json`、`next.config.ts`、`tailwind.config.ts`、`src/app/layout.tsx`、`src/app/page.tsx` 等（脚手架自动生成）

**实现内容**：

- 执行 `pnpm create next-app . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack`
- 选择 App Router、TypeScript、Tailwind CSS、ESLint

**验证命令**：

```bash
pnpm dev
# 浏览器打开 http://localhost:3000
```

**完成标准**：

- `pnpm dev` 启动无报错
- 浏览器 `localhost:3000` 看到 Next.js 默认欢迎页

---

### 任务 0.3 — 安装额外依赖

**目标**：安装博客所需的第三方库。

**要新增或修改的文件**：

- `package.json`（依赖列表更新）

**实现内容**：

```bash
pnpm add gray-matter react-markdown rehype-highlight next-themes
```

**验证命令**：

```bash
pnpm list --depth=0
```

**完成标准**：

- `package.json` 的 `dependencies` 包含以上 4 个包
- `node_modules/` 下有对应目录

---

### 任务 0.4 — 创建空目录结构

**目标**：建好项目的"骨架文件夹"，为后续开发做准备。

**要新增或修改的文件**：

- `content/tech/`（空目录，放技术文章）
- `content/life/`（空目录，放生活文章）
- `data/`（空目录，放点赞数据）
- `src/lib/`（空目录，放工具函数）
- `src/components/`（空目录，放复用组件）

**实现内容**：

- 用 `mkdir` 创建以上目录
- `content/tech/` 和 `content/life/` 下各放一个 `.gitkeep` 让 git 追踪空目录

**验证命令**：

```bash
ls content/ src/
```

**完成标准**：

- 5 个目录全部存在
- git 能追踪到这些空目录

---

## Phase 1：示例文章（2 个任务）

### 任务 1.1 — 创建第一篇技术文章

**目标**：有一篇真实内容驱动后续开发。

**要新增或修改的文件**：

- `content/tech/hello-world.md`

**实现内容**：

- 写一篇 Markdown 文件，frontmatter 字段完整
- 正文包含：多级标题、段落、行内代码、一个代码块（TypeScript）、有序列表
- tag 至少包含两个（如 `React`、`TypeScript`）
- `draft: false`

**验证命令**：

- 打开文件检查 frontmatter 格式

**完成标准**：

- 文件存在，frontmatter 包含所有必填字段（title, date, category, tags, summary, draft）
- 正文有代码块供后续验证语法高亮

---

### 任务 1.2 — 创建第一篇生活文章

**目标**：有两篇不同分类的文章，验证分类筛选逻辑。

**要新增或修改的文件**：

- `content/life/my-first-post.md`

**实现内容**：

- 写一篇生活类 Markdown，frontmatter 字段完整
- category 为 `life`，tag 如 `日常`、`旅行`
- 日期比技术文章稍早（验证按日期排序）
- `draft: false`

**验证命令**：

- 打开文件检查 frontmatter 格式

**完成标准**：

- 两篇文章分属不同分类（tech vs life）
- 日期不同，后续可验证排序

---

## Phase 2：Markdown 解析引擎（3 个任务）

### 任务 2.1 — 实现 getAllPosts 函数

**目标**：一个函数读取所有 Markdown 文件、解析 frontmatter、过滤草稿、按日期排序。

**要新增或修改的文件**：

- `src/lib/posts.ts`

**实现内容**：

- 用 `fs.readdirSync` 读取 `content/tech/` 和 `content/life/` 下的 `.md` 文件
- 用 `gray-matter` 解析每个文件的 frontmatter 和正文
- 过滤掉 `draft: true` 的文章
- 按 `date` 倒序排列
- 返回数组，每项包含：slug、title、date、category、tags、summary、content（正文 Markdown 字符串）
- 自动从目录名推断 category

**验证命令**：

- 暂时无法在浏览器验证（下一任务做测试页）

**完成标准**：

- 在 `src/lib/posts.ts` 中 `console.log(getAllPosts())` 能看到两篇文章的数据结构

---

### 任务 2.2 — 实现 getPostBySlug 函数

**目标**：一个函数根据 slug 找到单篇文章并返回其数据。

**要新增或修改的文件**：

- `src/lib/posts.ts`（追加函数）

**实现内容**：

- 接收 slug 参数
- 遍历 `content/tech/` 和 `content/life/` 找到匹配文件
- 返回该文章的 frontmatter + 正文
- 找不到则返回 `null`

**验证命令**：

- 同上，配合下一任务验证

**完成标准**：

- `getPostBySlug('hello-world')` 返回文章对象
- `getPostBySlug('not-exist')` 返回 `null`

---

### 任务 2.3 — 创建临时测试页验证解析

**目标**：在浏览器里验证 Markdown 解析是否工作正常。

**要新增或修改的文件**：

- `src/app/test-render/page.tsx`（临时文件，验证后删除）

**实现内容**：

- 调用 `getAllPosts()` 获取文章列表
- 在页面中渲染第一篇文章的：title、date、category、tags、summary
- 用 `react-markdown` + `rehype-highlight` 渲染正文
- 验证代码块是否高亮

**验证命令**：

```
浏览器访问 http://localhost:3000/test-render
```

**完成标准**：

- 页面显示文章标题、日期、分类、标签
- 正文中的代码块有语法高亮（不同 token 有不同颜色）
- `draft: true` 的文章不出现在列表中

---

## Phase 3：文章列表页（2 个任务）

### 任务 3.1 — 创建 /posts 页面（基础版）

**目标**：最简文章列表，验证路由和数据获取。

**要新增或修改的文件**：

- `src/app/posts/page.tsx`

**实现内容**：

- 调用 `getAllPosts()` 获取所有文章
- 渲染一个列表，每项显示：标题（链接到 `/posts/[slug]`）、日期、分类徽章、摘要
- 使用 Tailwind 排版，不求好看，只求可读

**验证命令**：

```
浏览器访问 http://localhost:3000/posts
```

**完成标准**：

- 页面显示两篇文章
- 技术文章在上（日期更新），生活文章在下
- 标题是可点击的链接，指向 `/posts/hello-world` 和 `/posts/my-first-post`

---

### 任务 3.2 — 提取 PostCard 组件

**目标**：把文章卡片的渲染逻辑抽成独立组件，后续分类页和标签页复用。

**要新增或修改的文件**：

- `src/components/PostCard.tsx`
- `src/app/posts/page.tsx`（改为调用 PostCard）

**实现内容**：

- 从 `/posts/page.tsx` 中提取文章卡片 JSX 到 `PostCard.tsx`
- PostCard 接收 `Post` 类型作为 props
- `/posts/page.tsx` 引入 PostCard，用 `.map()` 渲染列表

**验证命令**：

```
浏览器访问 http://localhost:3000/posts
```

**完成标准**：

- `/posts` 页面和之前看起来一样
- PostCard 是独立的 `.tsx` 文件，可被其他页面 import

---

## Phase 4：文章详情页（3 个任务）

### 任务 4.1 — 创建 /posts/[slug] 动态路由

**目标**：让每篇文章有独立 URL，渲染正文。

**要新增或修改的文件**：

- `src/app/posts/[slug]/page.tsx`

**实现内容**：

- 创建动态路由 `src/app/posts/[slug]/page.tsx`
- 用 `generateStaticParams()` 返回所有文章的 slug 列表
- 用 `getPostBySlug(slug)` 获取文章
- 页面渲染：标题、日期、分类、标签、正文（react-markdown）

**验证命令**：

```
浏览器访问 http://localhost:3000/posts/hello-world
浏览器访问 http://localhost:3000/posts/my-first-post
```

**完成标准**：

- 两个 URL 都能正确显示对应的文章正文
- 代码块有语法高亮

---

### 任务 4.2 — 处理文章不存在的情况

**目标**：访问不存在的文章时显示 404，而不是报错。

**要新增或修改的文件**：

- `src/app/posts/[slug]/page.tsx`

**实现内容**：

- 当 `getPostBySlug(slug)` 返回 `null` 时
- 调用 Next.js 的 `notFound()` 函数触发 404 页面

**验证命令**：

```
浏览器访问 http://localhost:3000/posts/this-post-does-not-exist
```

**完成标准**：

- 不显示报错
- 显示 Next.js 默认 404 页面（后续替换为自定义 404）

---

### 任务 4.3 — 删除临时测试页

**目标**：清理 Phase 2 创建的测试文件。

**要新增或修改的文件**：

- `src/app/test-render/page.tsx`（删除）

**实现内容**：

- 直接删除 `src/app/test-render/` 目录

**验证命令**：

```
浏览器访问 http://localhost:3000/test-render → 应该 404
```

**完成标准**：

- 测试页不可访问，其他页面不受影响

---

## Phase 5：封面页（2 个任务）

### 任务 5.1 — 创建封面页骨架

**目标**：全屏封面，博客名称居中 + 入口按钮。

**要新增或修改的文件**：

- `src/app/page.tsx`（修改，覆盖脚手架默认首页）

**实现内容**：

- 全屏容器，CSS 渐变或纯色背景（先不用真实图片）
- 中间显示博客名称（大字号）
- 下方一个「进入博客」按钮
- 按钮用 Next.js `Link` 组件跳转到 `/posts`

**验证命令**：

```
浏览器访问 http://localhost:3000/
```

**完成标准**：

- 页面全屏，无滚动条
- 博客名称居中
- 点击按钮跳转到 `/posts`
- 浏览器"后退"按钮能回到封面页

---

### 任务 5.2 — 添加壁纸背景

**目标**：用你选择的图片作为封面背景。

**要新增或修改的文件**：

- `public/wallpaper.jpg`（或 .png）
- `src/app/page.tsx`（改用背景图）

**实现内容**：

- 找一张喜欢的壁纸图片
- 放到 `public/` 目录
- 修改封面页，用 CSS `background-image` 设置全屏背景
- 确保文字和按钮在背景上可读（加半透明遮罩层）

**验证命令**：

```
浏览器访问 http://localhost:3000/
```

**完成标准**：

- 背景是自定义图片
- 文字可读
- 移动端背景不变形

---

## Phase 6：评论系统（3 个任务）

### 任务 6.1 — 在 GitHub 仓库启用 Discussions

**目标**：为 Giscus 提供数据存储的基础设施。

**要新增或修改的文件**：

- 无代码修改（GitHub 后台操作）

**实现内容**：

- 在 GitHub 仓库 → Settings → Features → 勾选 Discussions
- 安装 Giscus GitHub App：https://github.com/apps/giscus
- 授权仓库访问
- 访问 https://giscus.app 获取配置（repo、repoId、category、categoryId）

**验证命令**：

- GitHub 仓库顶部出现 Discussions 标签页

**完成标准**：

- Discussions 功能已开启
- Giscus App 已授权
- 拿到 4 个配置值（repo、repoId、category、categoryId）

---

### 任务 6.2 — 创建 Giscus 评论组件

**目标**：封装 Giscus 为 React 组件，可嵌入任何页面。

**要新增或修改的文件**：

- `src/components/Giscus.tsx`

**实现内容**：

- 用 `'use client'` 声明（Giscus 需要在浏览器运行）
- 使用 `@giscus/react` 组件
- 接收 `term` prop 作为每篇文章的标识
- 用文章 slug 作为 term 值

**验证命令**：

- 先不嵌入文章页，暂时通过下一个任务验证

**完成标准**：

- 组件文件存在，TypeScript 编译无报错

---

### 任务 6.3 — 将 Giscus 嵌入文章详情页

**目标**：每篇文章底部显示独立的评论区。

**要新增或修改的文件**：

- `src/app/posts/[slug]/page.tsx`（引入 Giscus）

**实现内容**：

- 在文章正文下方插入 `<Giscus>` 组件
- 将文章 slug 传给 Giscus 作为 term
- 确保同一 slug 的文章映射到同一讨论帖

**验证命令**：

```
浏览器访问 http://localhost:3000/posts/hello-world
```

**完成标准**：

- 文章底部出现评论区
- 可以用 GitHub 账号发表评论
- 发表后 GitHub Discussions 里出现对应帖子
- 不同文章有独立的评论区

---

## Phase 7：点赞功能（3 个任务）

### 任务 7.1 — 创建点赞数据文件

**目标**：为每篇文章初始化点赞数为 0。

**要新增或修改的文件**：

- `data/likes.json`

**实现内容**：

- 创建一个 JSON 对象，key 是 slug，value 是点赞数
- 初始值全为 0
- 格式示例：`{ "hello-world": 0, "my-first-post": 0 }`

**验证命令**：

```bash
cat data/likes.json
```

**完成标准**：

- JSON 文件格式正确
- 每篇文章有对应用记录

---

### 任务 7.2 — 创建点赞 API Route

**目标**：提供一个 HTTP 接口，前端可以调用来增加点赞数。

**要新增或修改的文件**：

- `src/app/api/likes/route.ts`

**实现内容**：

- 处理 `POST` 请求，接收 `{ "slug": "hello-world" }`
- 读取 `data/likes.json`，对应 slug 的计数 +1
- 写回 JSON 文件
- 返回更新后的点赞数
- 同时也处理 `GET` 请求，返回所有点赞数

**验证命令**：

```bash
curl -X POST http://localhost:3000/api/likes -H "Content-Type: application/json" -d '{"slug":"hello-world"}'
```

**完成标准**：

- POST 返回 `{ "slug": "hello-world", "likes": 1 }`
- `data/likes.json` 中对应值变为 1
- 再次 POST，值变为 2

---

### 任务 7.3 — 创建点赞按钮并嵌入文章页

**目标**：读者可以点击点赞按钮，看到数字变化。

**要新增或修改的文件**：

- `src/components/LikeButton.tsx`
- `src/app/posts/[slug]/page.tsx`（引入 LikeButton）

**实现内容**：

- `'use client'` 组件
- 显示心形图标 + 当前点赞数
- 点击时：前端立刻 +1（乐观更新），同时 POST 到 `/api/likes`
- 初始值从 API GET 获取

**验证命令**：

```
浏览器访问 http://localhost:3000/posts/hello-world
点击点赞按钮
```

**完成标准**：

- 点击后数字立刻 +1
- 刷新页面后数字保持（不是回到 0）
- 同一篇文章，用两个浏览器窗口打开，各自点赞后数字累计

---

## Phase 8：关于我 & 404（2 个任务）

### 任务 8.1 — 创建关于我页面

**目标**：访问 `/about` 看到作者信息。

**要新增或修改的文件**：

- `src/app/about/page.tsx`

**实现内容**：

- 静态页面
- 包含：头像占位图、你的名字/昵称、一句简介、GitHub 链接、Email 链接
- 用 Tailwind 做简单排版

**验证命令**：

```
浏览器访问 http://localhost:3000/about
```

**完成标准**：

- 页面显示个人信息
- GitHub 和 Email 链接可点击

---

### 任务 8.2 — 创建自定义 404 页面

**目标**：访问不存在的路由时显示友好提示。

**要新增或修改的文件**：

- `src/app/not-found.tsx`

**实现内容**：

- 创建 `not-found.tsx`（Next.js 约定文件名）
- 显示 "页面不存在" + 返回首页链接 + 返回文章列表链接

**验证命令**：

```
浏览器访问 http://localhost:3000/随机乱打
```

**完成标准**：

- 显示自定义 404 而非默认 Next.js 错误页
- 链接可点击跳转

---

## Phase 9：分类页 & 标签页（3 个任务）

### 任务 9.1 — 创建分类筛选页

**目标**：访问 `/categories/tech` 只看到技术文章，`/categories/life` 只看到生活文章。

**要新增或修改的文件**：

- `src/app/categories/[category]/page.tsx`

**实现内容**：

- 动态路由 `[category]`
- `generateStaticParams` 返回 `['tech', 'life']`
- 调用 `getAllPosts()` 后用 `filter` 筛选 category 匹配的文章
- 复用 PostCard 组件渲染列表
- 页面顶部显示当前分类名称

**验证命令**：

```
浏览器访问 http://localhost:3000/categories/tech
浏览器访问 http://localhost:3000/categories/life
```

**完成标准**：

- `/categories/tech` 只有 tech 分类文章
- `/categories/life` 只有 life 分类文章
- 文章列表可点击进入详情

---

### 任务 9.2 — 创建标签筛选页

**目标**：访问 `/tags/react` 只看到含该标签的文章。

**要新增或修改的文件**：

- `src/app/tags/[tag]/page.tsx`

**实现内容**：

- 动态路由 `[tag]`
- `generateStaticParams` 从所有文章中提取所有不重复的标签
- 调用 `getAllPosts()` 后筛选 `tags` 数组包含当前 tag 的文章
- 复用 PostCard 组件
- 页面顶部显示"标签：XXX"

**验证命令**：

```
浏览器访问 http://localhost:3000/tags/React
```

**完成标准**：

- 只显示包含对应标签的文章
- 不存在的标签返回空列表（不报错）

---

### 任务 9.3 — 让 PostCard 的分类和标签可点击

**目标**：文章卡片上的分类徽章和标签，点击后跳转到对应筛选页。

**要新增或修改的文件**：

- `src/components/PostCard.tsx`

**实现内容**：

- 分类徽章变成 Link：`/categories/{category}`
- 每个标签变成 Link：`/tags/{tag}`

**验证命令**：

```
浏览器访问 http://localhost:3000/posts
点击一个分类徽章 → 跳转到分类页
点击一个标签 → 跳转到标签页
```

**完成标准**：

- 点击分类/标签能正确跳转并筛选
- 分类页和标签页有返回文章列表的导航

---

## Phase 10：深色/浅色主题（2 个任务）

### 任务 10.1 — 集成 next-themes

**目标**：全局提供主题切换能力。

**要新增或修改的文件**：

- `src/app/layout.tsx`（包裹 ThemeProvider）

**实现内容**：

- 在 RootLayout 中用 `next-themes` 的 `ThemeProvider` 包裹 `{children}`
- 设置 `attribute="class"`（配合 Tailwind `dark:` 前缀）
- 设置 `defaultTheme="system"`（跟随系统）

**验证命令**：

- 无可见变化，下一任务加切换按钮后验证

**完成标准**：

- 应用启动无报错
- 打开浏览器开发者工具，`<html>` 标签的 class 包含 `light` 或 `dark`

---

### 任务 10.2 — 添加主题切换按钮

**目标**：用户可以手动切换深色/浅色模式。

**要新增或修改的文件**：

- `src/components/ThemeToggle.tsx`
- `src/app/layout.tsx`（在导航或底部加入 ThemeToggle）

**实现内容**：

- `'use client'` 组件
- 使用 `useTheme` hook 获取当前主题和 `setTheme`
- 显示一个按钮（太阳/月亮图标，或纯文字）
- 点击在 `light` / `dark` / `system` 之间循环

**验证命令**：

```
浏览器访问 http://localhost:3000/
点击切换按钮
```

**完成标准**：

- 点击后主题即时切换
- 刷新页面后主题保持
- 在浏览器开发者工具中检查 `<html>` 的 class 变化
- Tailwind `dark:` 前缀的样式开始生效

---

## Phase 11：SEO & RSS（4 个任务）

### 任务 11.1 — 添加全局 Meta 信息

**目标**：每个页面至少有基本的 `<title>` 和 `<meta description>`。

**要新增或修改的文件**：

- `src/app/layout.tsx`（添加 metadata export）

**实现内容**：

- 在 RootLayout 中导出 `metadata` 对象
- 设置全局默认的 `title`、`description`、`openGraph` 等
- 使用 Next.js 的 Metadata API

**验证命令**：

```
浏览器访问任意页面 → 右键 → 查看网页源代码 → 查看 <head>
```

**完成标准**：

- 源代码中有 `<title>` 和 `<meta name="description">`
- 有 `og:` 标签

---

### 任务 11.2 — 文章详情页的动态 SEO

**目标**：每篇文章有独立的标题和描述。

**要新增或修改的文件**：

- `src/app/posts/[slug]/page.tsx`（添加 generateMetadata）

**实现内容**：

- 导出 `generateMetadata` 函数
- 根据 slug 获取文章
- 返回 `{ title: "{文章标题} - Deligent Blog", description: "{文章summary}", openGraph: { ... } }`

**验证命令**：

```
浏览器访问 http://localhost:3000/posts/hello-world
右键查看源代码
```

**完成标准**：

- `<title>` 是该文章的标题而非全局默认标题
- `<meta name="description">` 是该文章的 summary

---

### 任务 11.3 — 生成 sitemap.xml 和 robots.txt

**目标**：让搜索引擎知道哪些页面可以爬取。

**要新增或修改的文件**：

- `src/app/sitemap.ts`
- `src/app/robots.ts`

**实现内容**：

- `sitemap.ts` 中调用 `getAllPosts()` 生成所有文章 URL
- 加上固定页面：`/`、`/posts`、`/about`、`/categories/tech`、`/categories/life`
- `robots.ts` 中允许所有爬虫，指向 sitemap URL

**验证命令**：

```
浏览器访问 http://localhost:3000/sitemap.xml
浏览器访问 http://localhost:3000/robots.txt
```

**完成标准**：

- sitemap.xml 列出所有页面和文章
- robots.txt 包含 sitemap 链接

---

### 任务 11.4 — 生成 RSS Feed

**目标**：让读者可以用 RSS 阅读器订阅你的博客。

**要新增或修改的文件**：

- `src/lib/rss.ts`
- `src/app/feed.xml/route.ts`

**实现内容**：

- 用 `feed` 库（npm 包 `feed`）生成 RSS XML
- 包含所有文章，每项有标题、链接、摘要、日期
- 通过 `/feed.xml` 路由返回 XML

**验证命令**：

```
浏览器访问 http://localhost:3000/feed.xml
```

**完成标准**：

- 返回标准 RSS XML 格式
- 包含两篇示例文章

---

## Phase 12：部署（3 个任务）

### 任务 12.1 — 创建 GitHub 仓库并推送代码

**目标**：代码上线到远程仓库，为 Vercel 部署做准备。

**要新增或修改的文件**：

- 无（所有文件通过 git 推送）

**实现内容**：

- `git add .`
- `git commit -m "feat: Deligent Blog v1 — 个人博客初始化"`
- 在 GitHub 创建仓库
- `git remote add origin <仓库地址>`
- `git push -u origin main`

**验证命令**：

```bash
git log --oneline
git remote -v
```

**完成标准**：

- GitHub 仓库能看到所有文件
- 包括 content/ 下的文章、src/ 下的代码

---

### 任务 12.2 — Vercel 导入项目并部署

**目标**：博客可以通过 URL 公网访问。

**要新增或修改的文件**：

- 无代码修改（Vercel 平台操作）

**实现内容**：

- 打开 vercel.com → Import Project → 选择 GitHub 仓库
- Vercel 自动识别 Next.js，无需手动配置构建命令
- 点击 Deploy
- 观察构建日志：确认 SSG 在构建时生成了所有页面

**验证命令**：

```
浏览器访问 Vercel 分配的域名（如 xxx.vercel.app）
```

**完成标准**：

- 所有页面可访问
- 封面页 / 正常显示
- 文章列表 /posts 显示文章
- 文章详情页 /posts/hello-world 正常渲染

---

### 任务 12.3 — 绑定自定义域名

**目标**：博客通过你自己的域名访问。

**要新增或修改的文件**：

- 无代码修改（DNS 配置）

**实现内容**：

- 在 Vercel Dashboard → Settings → Domains 添加自定义域名
- 按 Vercel 提示在域名提供商处配置 DNS 记录（A 记录或 CNAME）
- 等待 DNS 生效（几分钟到几小时）

**验证命令**：

```
浏览器访问你的自定义域名
```

**完成标准**：

- 输入你的域名 → 显示博客
- 自动跳转 HTTPS
- 所有路由正常工作

---

## Phase 13：收尾与回顾

### 任务 13.1 — 补充 README.md

**目标**：项目有基本的说明文档，其他人（或未来的你）能快速了解。

**要新增或修改的文件**：

- `README.md`

**实现内容**：

- 博客名称和一句话介绍
- 技术栈列表
- 本地运行命令
- 发布文章的步骤
- 部署说明（Vercel + 域名）

**验证命令**：

- 打开 README.md 检查

**完成标准**：

- 新 clone 仓库的人看完 README 能跑起项目

---

## 进度追踪表

| Phase | 任务 | 名称                    | 状态 |
| ----- | ---- | ----------------------- | ---- |
| 0     | 0.1  | 初始化 git 仓库         | ⬜   |
| 0     | 0.2  | create-next-app 脚手架  | ⬜   |
| 0     | 0.3  | 安装额外依赖            | ⬜   |
| 0     | 0.4  | 创建空目录结构          | ⬜   |
| 1     | 1.1  | 第一篇技术文章          | ⬜   |
| 1     | 1.2  | 第一篇生活文章          | ⬜   |
| 2     | 2.1  | getAllPosts 函数        | ⬜   |
| 2     | 2.2  | getPostBySlug 函数      | ⬜   |
| 2     | 2.3  | 临时测试页              | ⬜   |
| 3     | 3.1  | /posts 文章列表页       | ⬜   |
| 3     | 3.2  | 提取 PostCard 组件      | ⬜   |
| 4     | 4.1  | /posts/[slug] 动态路由  | ⬜   |
| 4     | 4.2  | 文章不存在 404 处理     | ⬜   |
| 4     | 4.3  | 删除临时测试页          | ⬜   |
| 5     | 5.1  | 封面页骨架              | ⬜   |
| 5     | 5.2  | 添加壁纸背景            | ⬜   |
| 6     | 6.1  | GitHub 启用 Discussions | ⬜   |
| 6     | 6.2  | Giscus 评论组件         | ⬜   |
| 6     | 6.3  | 嵌入文章详情页          | ⬜   |
| 7     | 7.1  | 点赞数据文件            | ⬜   |
| 7     | 7.2  | 点赞 API Route          | ⬜   |
| 7     | 7.3  | 点赞按钮组件            | ⬜   |
| 8     | 8.1  | 关于我页面              | ⬜   |
| 8     | 8.2  | 自定义 404 页面         | ⬜   |
| 9     | 9.1  | 分类筛选页              | ⬜   |
| 9     | 9.2  | 标签筛选页              | ⬜   |
| 9     | 9.3  | PostCard 链接可点击     | ⬜   |
| 10    | 10.1 | 集成 next-themes        | ⬜   |
| 10    | 10.2 | 主题切换按钮            | ⬜   |
| 11    | 11.1 | 全局 Meta 信息          | ⬜   |
| 11    | 11.2 | 文章页动态 SEO          | ⬜   |
| 11    | 11.3 | sitemap + robots.txt    | ⬜   |
| 11    | 11.4 | RSS Feed                | ⬜   |
| 12    | 12.1 | GitHub 仓库 + 推送      | ⬜   |
| 12    | 12.2 | Vercel 导入部署         | ⬜   |
| 12    | 12.3 | 绑定自定义域名          | ⬜   |
| 13    | 13.1 | 补充 README.md          | ⬜   |
