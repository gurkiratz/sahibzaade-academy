# Sahibzaade Academy asset guide

Photos and videos live in ImageKit under the `Sahibzaade Academy` folder
(`https://ik.imagekit.io/akaalijatha/Sahibzaade%20Academy/`). The site builds
their URLs with the helpers in `src/lib/imagekit.ts`.

## ImageKit folders

- `Hero/kid playing dilruba.jpg` — hero image
- `Instruments/` — program photos: `taus.jpg`, `dilruba.jpg`, `rabab.jpg`,
  `jori.jpg`, `tabla.jpg`, `gurbani-santhya.jpg`, `gurbani-calligraphy.jpg`
- `Videos/` — `video1.mp4` through `video8.mp4` and `video1-poster.jpg`
  through `video8-poster.jpg`

## Adding images

Upload the original JPG/PNG (under 25 MB, ideally no wider than ~2400px).
Don't convert to WebP yourself: ImageKit resizes and serves WebP/AVIF
automatically, and image transformations don't count against any monthly
quota on the free plan, only bandwidth.

## Adding videos

The free plan allows only 500 video processing units a month (about 4
minutes of 720p), so videos are compressed locally and served untouched
with `tr=orig-true`. Before uploading, run:

```bash
ffmpeg -i input.mp4 -vf "scale='min(1280,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2" \
  -c:v libx264 -preset slow -crf 27 -profile:v high -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart output.mp4
```

This caps portrait and landscape videos at 720p. Make a poster with
`ffmpeg -ss 1 -i output.mp4 -frames:v 1 -q:v 3 output-poster.jpg` and
upload it next to the video. Keep videos under 100 MB (free plan upload limit).

## Kept in `public/`

- `logo.png`, `favicon.svg` — brand and favicon
- `og-image.png`, `og-image-1.png` — social share images
- `fonts/Puratan_Hastlikhat.ttf` — used only for the Punjabi line in the hero
