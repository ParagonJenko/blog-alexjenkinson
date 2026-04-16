---
title: 'Building This Blog: React, TypeScript, and a Retro DOS Theme'
date: '2025-02-18'
tags: ['react', 'typescript', 'styled-components', 'vite', 'blog', 'side projects']
series: 'Personal Blog'
series_order: 1
draft: false
summary: 'How and why I built my own blog from scratch instead of using an existing platform — covering the tech stack, the theming system, and why a DOS terminal aesthetic made perfect sense.'
---

The obvious question when someone builds their own blog is: why not just use WordPress, or Ghost, or Substack?

The honest answer is that I wanted to build something, and a personal blog is a perfect canvas. There are no users to break anything for, no real consequences if I try something weird, and I get to make every decision myself. It's a playground that lives on the internet.

## What I Wanted

A few constraints going in:

- **Markdown for content** — I didn't want a CMS or a rich text editor, just files I could commit to git
- **Multiple themes** — specifically, I wanted a retro DOS terminal aesthetic because it felt right for who I am
- **No SSR complexity** — this is a static blog, I didn't need server-side rendering
- **Full control** — over routing, styling, layout, everything

That ruled out most pre-built solutions. The alternative was to build it with React and Vite, handle markdown myself, and style everything with Styled Components.

## The Stack

| Concern | Solution |
|---------|----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Styled Components |
| Content | Markdown files + custom parser |
| Routing | React Router |
| Hosting | Netlify |

Vite was the right call here. The dev server starts instantly, HMR is fast, and the build output is clean. For a project like this — no complex server-side concerns — it's ideal.

## The Theming System

The theming is probably the thing I'm most pleased with. Styled Components supports a `ThemeProvider` that makes the current theme available to any component via the `theme` prop. I defined a few themes — DOS terminal, Fallout, Tarkov — each as a TypeScript object with the same shape:

```typescript
interface Theme {
  background: string;
  text: string;
  accent: string;
  secondary: string;
  border: string;
  fontFamily: string;
}

const dosTheme: Theme = {
  background: '#000000',
  text: '#00ff00',
  accent: '#00ff00',
  secondary: '#003300',
  border: '#00ff00',
  fontFamily: '"Courier New", monospace',
};
```

Components reference the theme without knowing which theme is active:

```typescript
const Title = styled.h1`
  color: ${({ theme }) => theme.accent};
  font-family: ${({ theme }) => theme.fontFamily};
`;
```

Switching themes is a single state change that flows through the entire component tree via `ThemeProvider`. No CSS variables, no class toggling — it's all handled by the library.

The TypeScript integration is important here. The `styled.d.ts` declaration file tells TypeScript the shape of the theme, so you get autocomplete and type checking on every theme property reference.

```typescript
// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```

## Handling Markdown

I parse markdown at runtime using a custom utility. Blog posts live in `src/content/blog/` as `.md` files with YAML frontmatter for metadata — title, date, tags, series information, draft status.

```typescript
// src/utils/markdown.ts
export async function loadBlogPost(slug: string) {
  const raw = await import(`../content/blog/${slug}.md?raw`);
  const { frontmatter, content } = parseFrontmatter(raw.default);
  return { frontmatter, content };
}
```

Vite's `?raw` import suffix returns the file content as a string, which I then parse. This keeps everything in the build pipeline without needing a separate content layer.

## Content Organisation

Blog posts can live in subdirectories, which allows me to group series of posts together. The Bigmoji posts all live in `content/blog/bigmoji/`, the Tarkov Community posts in `content/blog/tarkov-community/`, and so on. The series metadata in the frontmatter (`series` and `series_order`) is used to display posts as a connected sequence.

## What I'd Change

If I were starting from scratch today, I'd probably look at Astro instead of React. For a content-heavy site where most pages are static, Astro's content collections would give me a much nicer authoring experience than my hand-rolled markdown solution. The island architecture would also mean better performance by default.

But I'm not starting from scratch — this blog exists, works, and I understand every part of it. That's worth something.

- [GitHub](https://github.com/ParagonJenko/blog-alexjenkinson)
- [Live Site](https://alexjenkinson.com)
