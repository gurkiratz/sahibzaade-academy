# Sahibzaade Academy

Website for [Sahibzaade Academy](https://maps.app.goo.gl/eJyyMec76BuqGWi5A), a Gurmat Kirtan and music school at Toshakhana in Brampton, Ontario. The academy offers in-person classes in Taus, Dilruba, Rabab, Jori, Tabla, Gurbani Santhya and Gurbani Calligraphy.

## Tech stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS 4 and shadcn/ui components
- Photos and videos hosted on [ImageKit](https://imagekit.io)
- Deployed on Vercel

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build to dist/
npm run preview   # preview the production build
npm run lint      # lint with oxlint
```

## Project structure

```
src/
  App.tsx            page content and sections (programs, student videos)
  App.css            page styles
  index.css          Tailwind setup and theme tokens
  components/ui/     shadcn/ui components
  lib/imagekit.ts    helpers for ImageKit image/video URLs
public/              logo, favicon, social share images, font, llms.txt
index.html           SEO and social meta tags
```

## Media

Photos and videos are not stored in this repo. They live in ImageKit under the `Sahibzaade Academy` folder (`Hero/`, `Instruments/`, `Videos/`). In code, refer to them by their path inside that folder:

```ts
image: "Instruments/rabab.jpg";
video: "Videos/video1.mp4";
```

The account is on ImageKit's free plan, so:

- **Images:** upload the original JPG/PNG. ImageKit resizes it and serves WebP/AVIF automatically.
- **Videos:** compress with ffmpeg before uploading. The site serves them as-is (`tr=orig-true`) to avoid using up the free plan's video processing allowance.

See [ASSETS.md](ASSETS.md) for the upload steps and ffmpeg commands.

## AI tooling

The repo has the ImageKit MCP servers (`.mcp.json`) and agent skills (`.claude/skills/`) set up for Claude Code. After cloning, run `/mcp` in Claude Code and sign in to `imagekit_dam` and `imagekit_admin`. `CLAUDE.md` holds the project notes for the agent.
