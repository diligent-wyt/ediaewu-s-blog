# UI/UX Implementation Plan — Deligent Blog v1.0

Based on [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). Each task is self-contained and independently verifiable.

**Rules**:
- One page or one component per task
- No random color/space/animation changes
- Each task: what files, why, verify command, completion criteria
- Stop after each task, wait for confirmation

---

## Phase 1: Design Tokens (Foundation)

### Task D1 — Define CSS custom properties in globals.css

**Why**: All subsequent tasks reference these tokens. Without this, colors get copy-pasted and inconsistent.

**Files**: `src/app/globals.css`

**What**:
- Add `:root` block with all light mode color tokens from Design System §1
- Add `@media (prefers-color-scheme: dark)` block with dark tokens
- Replace hardcoded `body { background: var(--background); color: var(--foreground); }` with design system tokens
- Keep `@import "tailwindcss"` and `@import "highlight.js/styles/github-dark.css"`

**Critical**: Do NOT change any `.tsx` files yet. Only CSS variables. This task alone should have zero visual impact because nothing references the new tokens yet.

**Verify**:
```bash
pnpm build   # must succeed
pnpm dev     # must start without CSS errors
# Visual: all pages look identical to before
```

**Completion**: Build succeeds. No visual changes. CSS variables defined and inspectable in DevTools.

---

## Phase 2: Global Shell (Nav + Footer)

### Task D2 — Add Navigation Bar

**Why**: P1 issue 7.1 — no global nav. Readers can't navigate between pages.

**Files**: `src/app/layout.tsx`

**What**:
- Add `<nav>` above `{children}`, inside `<body>`
- Left: Blog name "Ediaewu's Blog" (link to `/`)
- Right: "About" (link to `/about`), "RSS" (link to `/feed.xml`)
- Separator: `border-b` at bottom
- Height: 44px
- Font: `text-sm`
- **NOT visible on cover page** — cover page renders its own full-screen layout, nav only appears on content pages

**Verify**:
```bash
curl http://localhost:3000/posts | grep -o "<nav"
curl http://localhost:3000/ | grep -c "<nav"  # should be 0 on cover
```

**Completion**: Nav bar visible on `/posts`, `/about`, `/categories/*`, `/tags/*`, `/posts/*`. NOT on `/`.

---

### Task D3 — Redesign Footer

**Why**: P1 issues 6.1, 6.2 — footer lacks copyright and ICP placeholder.

**Files**: `src/app/layout.tsx`

**What**: Replace current footer with design from Design System §5.6:
```
© 2026 Ediaewu
ICP 备案号：待申请
通过 Feedly 或 RSS 订阅 · Powered by Next.js
```

**Verify**:
```bash
curl http://localhost:3000/posts | grep -o "© 2026"
curl http://localhost:3000/posts | grep -o "ICP 备案号"
```

**Completion**: Footer shows copyright + ICP placeholder on all content pages.

---

## Phase 3: Page Background & Content Area

### Task D4 — Apply Page Background Color

**Why**: P0 issue 1.1 — bridge the cover page's warmth to content pages. Replace pure white with warm paper-tone.

**Files**: `src/app/layout.tsx`, `src/app/globals.css`

**What**:
- Body background: `bg-white` → reference CSS variable `--bg-page` (`#faf8f5`)
- All content page `<main>` elements: keep white (`#ffffff`) — creates subtle warmth difference between page and content
- Cover page: unchanged (keeps dark gradient)

**Verify**:
```bash
pnpm build
# Visual: body background is warm off-white (#faf8f5), content area is pure white
# Cover page: unchanged dark gradient
```

**Completion**: 2-level visual hierarchy visible (page bg ≠ content bg). Cover unchanged.

---

## Phase 4: PostCard Redesign

### Task D5 — Redesign PostCard Component

**Why**: P0 issue 2.1, 2.2 — cards have no visual boundary, link colors inconsistent.

**Files**: `src/components/PostCard.tsx`

**What** (per Design System §5.2):
- Add `border-b` separator between cards instead of `space-y-8`
- Title color: `text-blue-600` → accent indigo color
- Category badge: add subtle hover state
- Tag badges: current `bg-gray-100` → outline style (`border border-gray-200`)
- Date: `text-gray-500 text-sm`
- Summary: `text-gray-600` leading-relaxed

**Verify**:
```bash
curl http://localhost:3000/posts | grep -o "border-b"
```

**Completion**: Cards separated by thin border. Title uses indigo blue. Tags are outline style.

---

## Phase 5: Article Detail Enhancements

### Task D6 — Add Previous/Next Navigation

**Why**: P0 issue 3.1 — no navigation after finishing an article.

**Files**: `src/app/posts/[slug]/page.tsx`

**What** (per Design System §5.5):
- Call `getAllPosts()` to get sorted array
- Find current post index → prev = index-1, next = index+1
- Render prev/next links between article body and LikeButton
- Left: `← 上一篇：《title》`, Right: `《title》下一篇 →`

**Verify**:
```bash
# hello-world is first (latest) article — should have prev only (points to my-first-post)
curl http://localhost:3000/posts/hello-world | grep "上一篇"
# my-first-post is last article — should have next only (points to hello-world)
curl http://localhost:3000/posts/my-first-post | grep "下一篇"
```

**Completion**: Both articles show correct prev/next links. First article: prev only. Last article: next only.

---

### Task D7 — Add Back to Top Button

**Why**: P1 issue — long articles have no quick way to return to top.

**Files**: `src/components/BackToTop.tsx`, `src/app/(content)/posts/[slug]/page.tsx`

**What** (per design review):
- `'use client'` component, `position: fixed`
- Show when page is scrollable AND scrolled > 200px
- Arrow icon `↑`, hover expands "回到顶部" text above button
- 40x40, rounded-[5px], white bg, border
- Click → smooth scroll to top
- Hidden when near top or page not scrollable

**Verify**:
```bash
pnpm build
curl -s http://localhost:3000/posts | grep -c "back-to-top"  # 0 on list
curl -s http://localhost:3000/posts/hello-world | grep -c "back-to-top"  # >0 on article
```

**Completion**: Button appears on scroll, hover shows text, click scrolls to top.

---

## Phase 6: Category & Tag Pages

### Task D8 — Unify Heading Format

**Why**: P1 issue 4.1 — category page shows "技术", tag page shows "标签：React". Inconsistent.

**Files**: `src/app/tags/[tag]/page.tsx`

**What**: Change tag page heading from "标签：React" → "React" (same format as category page). Add subtitle "标签 · X 篇文章".

**Verify**:
```bash
curl http://localhost:3000/tags/React | grep -o "<h1[^>]*>React</h1>"
```

**Completion**: Tag page heading matches category page style.

---

## Phase 7: LikeButton Animation

### Task D9 — Add Click Animation + Like/Unlike Logic

**Why**: P2 issue from audit — no feedback when clicking like. Also need one-like-per-person restriction.

**Files**: `src/components/LikeButton.tsx`, `src/app/api/likes/route.ts`

**What**:
- Add `animating` state: heart scales to 125% then bounces back over 300ms
- localStorage tracks which slugs this browser has liked (`liked_slugs`)
- Click to like; click again to unlike (cancel)
- Hover on liked: `title="取消点赞"`
- API supports `action: "unlike"` to decrement (min 0)
- initialize: if server count is 0, clear localStorage liked flag

**Verify**:
```bash
npx tsc --noEmit  # must pass
curl -X POST http://localhost:3000/api/likes -H "Content-Type: application/json" -d '{"slug":"my-first-post"}'
curl -X POST http://localhost:3000/api/likes -H "Content-Type: application/json" -d '{"slug":"my-first-post","action":"unlike"}'
```

**Completion**: Click heart → scale animation + count increments. Click again → unlike. Hover on liked shows "取消点赞".

---

## Phase 8: Dark Mode (CSS Only)

### Task D10 — Enable System-Following Dark Mode

**Why**: P1 issue from audit — dark mode CSS exists but is overridden by hardcoded colors.

**Files**: `src/app/globals.css` (already done in Task D1), `src/app/layout.tsx`, all page `.tsx` files

**What**: 
- Remove hardcoded `bg-white text-black` from `<body>` — use CSS variables instead
- Ensure every component that uses a color references a CSS variable or Tailwind class that will be overridden
- Test with Chrome DevTools → Rendering → "Emulate CSS prefers-color-scheme: dark"

**Note**: This task is LAST because it depends on all previous tasks using the right color tokens.

**Verify**:
```bash
pnpm build
# Visual: change OS to dark mode → all pages respond
```

**Completion**: System dark mode → blog shows dark theme. System light mode → blog shows light theme.

---

## Task Dependency Graph

```
D1 (CSS tokens)
 ├─ D2 (nav bar)
 ├─ D3 (footer)
 ├─ D4 (page bg)
 │    └─ D5 (PostCard)
 ├─ D6 (prev/next)
 ├─ D7 (back to top)
 ├─ D8 (unify headings)
 └─ D9 (like animation + like/unlike)

D10 (dark mode) depends on ALL above tasks being complete
```

---

## Progress Tracker

| Task | Name | Status |
|------|------|--------|
| D1 | CSS Design Tokens | ✅ |
| D2 | Navigation Bar | ✅ |
| D3 | Footer Redesign | ✅ |
| D4 | Page Background Color | ✅ |
| D5 | PostCard Redesign | ✅ |
| D6 | Prev/Next Navigation | ✅ |
| D7 | Back to Top Button | ✅ |
| D8 | Unify Heading Format | ✅ |
| D9 | LikeButton Animation + Like/Unlike | ✅ |
| D10 | Dark Mode (CSS only) | ⬜ |

---

## First Task

**D1 — CSS Design Tokens in globals.css**

Add light/dark CSS custom properties. Zero visual impact. Build must pass. One file.

Ready to start D1?
