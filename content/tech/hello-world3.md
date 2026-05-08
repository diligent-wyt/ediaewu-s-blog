---
title: "Hello World — 我的第一篇技术博客"
date: "2026-05-01"
category: "tech"
tags: ["React", "TypeScript", "博客"]
summary: "搭建个人博客的第一篇文章，聊聊为什么选择 Markdown + Next.js 来写博客。"
draft: false
---

## 为什么要写博客

作为一名前端工程师，我一直想找个地方记录自己学到的东西。不是发在掘金或知乎，而是**完全属于自己**的一亩三分地。

## 技术选型

选技术栈时主要考虑了三个因素：

1. **写作体验**：用 Markdown 写作，在 VS Code 里写，舒服
2. **部署成本**：不要服务器，不要数据库，最好免费
3. **代码展示**：技术文章少不了代码块，语法高亮要好

最终选了这套组合：

| 工具 | 用途 |
|------|------|
| Next.js | 框架，负责页面渲染 |
| Markdown | 写作格式 |
| Vercel | 免费部署 |

## 一个简单的 React 组件

写博客离不开展示代码，下面是一个计数器组件：

```tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4">
      <span className="text-2xl font-bold">{count}</span>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => setCount((c) => c + 1)}
      >
        +1
      </button>
    </div>
  );
}
```

组件的核心逻辑：

- `useState(0)` 初始化计数为 `0`
- 点击按钮时 `setCount` 更新状态
- React 自动重新渲染新的计数值

## 写作流程

我给自己定的写文章流程很简单：

1. 在 `content/tech/` 下新建 `.md` 文件
2. 写完 → `git commit`
3. `git push` → Vercel 自动部署

从写完到上线，不超过两分钟。

## 后续计划

接下来我会写更多关于 React、TypeScript 和前端工程化的内容。这篇文章只是一个开始。
