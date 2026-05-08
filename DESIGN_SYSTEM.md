# Design System — Deligent Blog v1.0

## Design Direction: Neo-Chinese Minimalism（新中式极简）

**Core idea**: Bridge the ink-painting cover page with clean, readable content pages. Use warm paper-tones, restrained typography, and generous whitespace. No gratuitous decoration. Every element has a purpose.

**Three-word brief**: Warm. Quiet. Readable.

---

## 1. Color Tokens

### Light Mode

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--bg-page` | `#faf8f5` | — | 页面底色（宣纸暖白） |
| `--bg-surface` | `#ffffff` | — | 内容区背景 |
| `--text-primary` | `#1a1a1a` | Tailwind gray-950 | 正文标题 |
| `--text-secondary` | `#6b7280` | `text-gray-500` | 日期、元信息 |
| `--text-tertiary` | `#9ca3af` | `text-gray-400` | 占位符、次要提示 |
| `--border` | `#e5e7eb` | `border-gray-200` | 分割线、卡片边框 |
| `--accent` | `#3b5998` | — | 链接色（靛蓝，非亮蓝） |
| `--accent-hover` | `#2d4373` | — | 链接 hover |
| `--tag-bg` | `#f3f4f6` | `bg-gray-100` | 标签背景 |
| `--tag-text` | `#4b5563` | `text-gray-600` | 标签文字 |
| `--category-bg` | `#eff6ff` | `bg-blue-50` | 分类徽章背景 |
| `--category-text` | `#3b5998` | — | 分类徽章文字 |

### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-page` | `#171717` | 页面底色（深灰，不用纯黑） |
| `--bg-surface` | `#262626` | 内容区背景 |
| `--text-primary` | `#f5f5f5` | 正文标题 |
| `--text-secondary` | `#9ca3af` | 元信息 |
| `--border` | `#404040` | 分割线 |
| `--accent` | `#93c5fd` | 链接色（浅蓝，在暗底上可读） |
| `--accent-hover` | `#bfdbfe` | 链接 hover |

**Why no pure black?** Pure black (`#000`) on white creates maximum contrast that fatigues eyes during long reading. Warm paper-tone (`#faf8f5`) is easier on eyes and bridges the cover page's ink-painting warmth.

**Why indigo blue instead of bright blue?** Bright blue (`#2563eb`) feels corporate/SaaS. Indigo blue (`#3b5998`) is warmer, more literary, and fits Chinese aesthetics.

---

## 2. Typography

### Font Stack

| Role | Font | Weight | Size | Line Height |
|------|------|--------|------|-------------|
| Page title (h1) | Geist Sans | 700 (bold) | 2rem / 32px | 1.25 |
| Section heading (h2) | Geist Sans | 600 (semibold) | 1.5rem / 24px | 1.4 |
| Card title | Geist Sans | 600 | 1.25rem / 20px | 1.4 |
| Body | Geist Sans | 400 | 1rem / 16px | 1.75 (prose default) |
| Metadata (date/tags) | Geist Sans | 400 | 0.875rem / 14px | 1.5 |
| Code | Geist Mono | 400 | 0.875rem / 14px | 1.7 |
| Cover title only | Ma Shan Zheng | 400 | 3.75rem / 60px | 1.2 |

### Scale

```
text-3xl (1.875rem / 30px) — page headings only
text-2xl (1.5rem / 24px)   — article title in card, section headings
text-xl  (1.25rem / 20px)  — card title
text-base (1rem / 16px)    — body
text-sm  (0.875rem / 14px) — metadata, tags, footer
text-xs  (0.75rem / 12px)  — badges, pills
```

---

## 3. Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 0.25rem / 4px | between inline badges |
| `space-sm` | 0.5rem / 8px | between tag and text |
| `space-md` | 1rem / 16px | within a card section |
| `space-lg` | 2rem / 32px | between major sections |
| `space-xl` | 3rem / 48px | between cards in list |
| `space-2xl` | 4rem / 64px | page top/bottom padding |

**Rule**: Use Tailwind's default spacing scale (`p-4`, `py-12`, `gap-3`, `space-y-8`). Never use arbitrary pixel values for spacing.

---

## 4. Layout

```
┌──────────────────────────────────────────────┐
│  nav bar (44px height, full width)            │
│  [Blog Name]                    [About] [RSS] │
├──────────────────────────────────────────────┤
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │  content area                        │    │
│  │  max-w-3xl (768px)                  │    │
│  │  bg-surface                         │    │
│  │  无圆角、无阴影                      │    │
│  └──────────────────────────────────────┘    │
│                                              │
├──────────────────────────────────────────────┤
│  footer (copyright / ICP / RSS)              │
└──────────────────────────────────────────────┘
```

**Key decisions**:
- Content area: `max-w-3xl` centered, `bg-white` on `bg-[#faf8f5]` page background
- No border-radius on content cards — sharp edges feel more "Chinese" and match the landscape silhouette
- No box-shadow — use whitespace for hierarchy, not depth
- Cover page uses full viewport, no nav bar

---

## 5. Component Specs

### 5.1 Navigation Bar

```
┌──────────────────────────────────────────────┐
│  Ediaewu's Blog              About    RSS    │
└──────────────────────────────────────────────┘
```

- Height: 44px
- Left: Blog name (link to `/`) — `text-sm font-semibold`
- Right: About (link to `/about`), RSS (link to `/feed.xml`)
- Separator: `border-b` at bottom
- Always visible on content pages. NOT visible on cover page.

### 5.2 PostCard (Article Card)

```
┌──────────────────────────────────────────────┐
│                                              │
│  Article Title (text-xl, accent color, link)  │
│  2026-05-01 · tech · React  TypeScript 博客   │
│  文章摘要内容，两行左右，灰色文字               │
│                                              │
└──────────────────────────────────────────────┘
```

- No background fill — pure whitespace separation
- Separator: thin `border-b` between cards (not `space-y-8` gap)
- Title: `text-xl font-semibold`, link color = accent (indigo), not default blue
- Metadata row: date · category pill · tags. Date: `text-gray-500`. Category/tags: see badges below.
- Summary: `text-gray-600`, 1-2 lines

### 5.3 Badges (Category & Tags)

**Category badge**: Subtle background fill
```
[ tech ]  — pill shape, bg-blue-50 text-blue-700, text-xs, 4px border-radius
```

**Tag badge**: Outline style
```
React  — no background, border border-gray-200, text-xs, hover fills
```

**Why different styles?** Category is a primary classifier (deserves fill). Tags are secondary (outline is lighter weight). This creates information hierarchy.

### 5.4 LikeButton

```
❤️ 23
```

- Emoji + count, same as current
- On click: emoji scales to 125%, bounces back (300ms), count increments
- Color: `text-gray-500` default, no color change on click
- Position: after article content, before comments, centered or left-aligned

### 5.5 Prev/Next Navigation

```
← 上一篇：《周末骑行记》          下一篇：《React Hooks 指南》→
```

- At bottom of article detail, before LikeButton area
- Two columns: left-aligned prev, right-aligned next
- `text-sm text-gray-500`, hover accent color
- If no prev or no next, show empty space on that side (don't remove)

### 5.6 Footer

```
————————————————————————————————————————————
© 2026 Ediaewu
ICP 备案号：待申请
通过 Feedly 或 RSS 订阅 · Powered by Next.js
```

- `text-xs text-gray-400`
- Centered, minimal
- Separator: `border-t border-gray-100`

---

## 6. Interaction

### Links

| State | Behavior |
|-------|----------|
| Default | Accent indigo color |
| Hover | Darker indigo + no underline |
| Active | No special treatment (simplicity) |

### Buttons

| State | Behavior |
|-------|----------|
| Default | Outline border, transparent bg |
| Hover | Filled with border color, transition 200ms |
| Active | Scale 0.98 |
| Focus | `ring-2 ring-offset-2` (accessibility) |

### Page Transitions

No animation. Instant navigation via `<Link>`. This is a reading experience, not an app.

---

## 7. What We Are NOT Adding

- ❌ Box shadows on cards
- ❌ Rounded corners > 4px
- ❌ Gradient backgrounds (except cover page)
- ❌ Emoji as decoration (except LikeButton heart)
- ❌ Animated page transitions
- ❌ Glassmorphism / backdrop-blur effects
- ❌ Large font sizes (> 2rem except page heading)
- ❌ Bright colors (no `text-blue-500`, no `bg-green-100`)
- ❌ Animated SVGs or Lottie
- ❌ Skeleton loaders (static site, no loading states needed)
- ❌ React animation libraries (framer-motion, react-spring)

---

## 8. Dark Mode Strategy

**Phase 1 (now)**: Use CSS custom properties + `@media (prefers-color-scheme: dark)`. No JS toggle. Follow system.

**Phase 2 (future)**: Add manual toggle button in nav bar. Persist preference in `localStorage`.

All colors are defined as CSS variables on `:root`. Components reference variables, not hardcoded values. This means dark mode is a CSS-only change with zero component changes.

---

## 9. Responsive Strategy

- `max-w-3xl` (768px) content width — optimal reading line length
- `px-4` padding on all pages for small screens
- Cover page: `h-screen` with SVG `preserveAspectRatio="none"` (mountains scale horizontally)
- Nav: horizontal on desktop, could collapse on mobile (v2)
- PostCard: single column always (no multi-column grid)

---
