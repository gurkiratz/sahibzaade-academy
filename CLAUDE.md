# Sahibzaade Academy

A one-page marketing site for Sahibzaade Academy, a Gurmat Kirtan and music school in Brampton, ON. It's built with React 19, TypeScript, Vite 8, Tailwind CSS 4 and shadcn/ui (base-ui, `base-nova` style), and deployed on Vercel.

## Commands

```bash
npm run dev      # dev server
npm run build    # tsc -b && vite build
npm run lint     # oxlint (the 3 warnings in components/ui are pre-existing shadcn code)
npm run preview  # serve the build
```

There is no test suite. To verify a change, run `npx tsc -b && npm run build`.

## Layout

- `src/App.tsx`: the whole page. The `programs` and `studentVideos` arrays at the top hold the content.
- `src/App.css`: page styles. `src/index.css` holds the Tailwind and theme tokens.
- `src/components/ui/`: shadcn components. Add new ones with `npx shadcn add <name>`.
- `src/lib/imagekit.ts`: helpers that build ImageKit URLs (`ikUrl`, `ikSrcSet`, `ikVideoUrl`).
- `public/`: holds only the logo, favicon, OG images, `llms.txt`, `robots.txt` and the Gurmukhi font.
- `index.html`: SEO meta, OG tags and JSON-LD.

## Media: ImageKit

All photos and videos live in ImageKit, not in the repo.

- Account URL endpoint: `https://ik.imagekit.io/akaalijatha/`
- Only work inside the base folder `/Sahibzaade Academy/`:
  - `Hero/kid playing dilruba.jpg`: the hero image
  - `Instruments/`: program photos (`taus.jpg`, `dilruba.jpg`, `rabab.jpg`, `jori.jpg`, `tabla.jpg`, `gurbani-santhya.jpg`, `gurbani-calligraphy.jpg`)
  - `Videos/`: `videoN.mp4` plus `videoN-poster.jpg`
- In code, pass paths relative to the base folder, e.g. `image: "Instruments/rabab.jpg"`. Use `ikUrl` / `ikSrcSet` for images and `ikVideoUrl` for videos. Spaces in names are fine because the helpers URL-encode them.

### Free-plan limits (Forever Free)

| Limit | Value |
|---|---|
| Bandwidth | 20 GB / month (hard cap) |
| Storage | 3 GB |
| Video processing units (VPU) | 500 / month; 720p costs 2 VPU per second of output |
| Upload size | 25 MB image, 100 MB video |
| Image processing | max 25 MP |

### Optimization rules

- **Images: let ImageKit optimize.** Image transformations only cost bandwidth. Upload the original JPG/PNG (long edge ≤ ~2400px) and don't pre-convert to WebP. ImageKit serves WebP/AVIF automatically. Use `ikSrcSet` with `c-at_max` so images never upscale.
- **Videos: never let ImageKit process them.** Any video transformation or auto-optimization burns VPUs, and 500 VPU is only ~4 minutes of 720p. Encode locally, upload, and always serve with `tr=orig-true` (via `ikVideoUrl`). Never add `w-`, `q-`, `f-`, `sr-` or thumbnail transforms to video URLs.
- Posters are separate JPGs. Don't use ImageKit's video thumbnail feature, which costs 30 VPU per thumbnail.

### ffmpeg recipes

Compress one video (H.264, web-ready, cap at 720p):

```bash
ffmpeg -i input.mp4 -vf "scale='min(1280,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2" \
  -c:v libx264 -preset slow -crf 27 -profile:v high -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart output.mp4
```

Batch a folder into `out/`:

```bash
mkdir -p out && for f in *.mp4 *.mov; do [ -e "$f" ] || continue
  ffmpeg -nostdin -loglevel error -y -i "$f" \
    -vf "scale='min(1280,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2" \
    -c:v libx264 -preset slow -crf 27 -profile:v high -pix_fmt yuv420p \
    -c:a aac -b:a 96k -movflags +faststart "out/${f%.*}.mp4"; done
```

Make a poster from the frame at 1s:

```bash
ffmpeg -ss 1 -i output.mp4 -frames:v 1 -q:v 3 output-poster.jpg
```

Inspect a video (codec, size, bitrate, duration):

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,bit_rate -show_entries format=duration -of csv=p=0 input.mp4
```

Shrink an oversized photo before upload (macOS):

```bash
sips -Z 2400 -s formatOptions 85 big.jpg --out big-small.jpg
```

If the re-encode comes out larger than the source (already well compressed), upload the source instead.

### ImageKit MCP workflow

The MCP servers are in `.mcp.json` and the skills in `.claude/skills/`, which links into `.agents/skills/`. Read the `mcp-preflight` skill before any ImageKit call.

- `imagekit_dam` handles search, upload, move and delete. `imagekit_admin` handles usage and URL endpoints. `imagekit_devtools` handles docs (`search_docs`) and transformation URLs (`transformation_builder`).
- List a folder: `search_media_library` with `path: "/Sahibzaade Academy/Videos"` and `type: "all"`.
- Upload a local file: call `create_upload_signature` (`fileName`, `folder: "/Sahibzaade Academy/<Sub>"`, `useUniqueFileName: "false"`, `expire: 3600`), then POST it with curl:

  ```bash
  curl -s -X POST 'https://upload.imagekit.io/api/v2-alpha/files/upload' \
    -F 'file=@/path/to/file' -F 'fileName=<name>' -F 'useUniqueFileName=false' \
    -F 'folder=/Sahibzaade Academy/<Sub>' -F 'token=<token from signature>'
  ```

  One signature covers one file. Send `formFields` exactly as returned, and never inline file bytes.
- Check usage with `get_account_usage` (admin), using a date range of at most 90 days.
- Verify a video is served untouched: `curl -s -o /dev/null -w "%{size_download}\n" "<url>?tr=orig-true"` should equal the uploaded size.
- Ask before deleting files, bulk-editing, or purging the cache.

## Conventions

- Content is in English, with Punjabi (Gurmukhi) in video descriptions and the hero. Keep the Gurmukhi text exactly as given.
- Keep `public/llms.txt` and the JSON-LD in `index.html` in sync when classes or contact details change.
