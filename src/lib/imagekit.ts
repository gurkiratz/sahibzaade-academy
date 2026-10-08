const IMAGEKIT_BASE = "https://ik.imagekit.io/akaalijatha/Sahibzaade%20Academy";

/** URL for a file inside the "Sahibzaade Academy" ImageKit folder, e.g. ikUrl("Hero/photo.jpg", "w-800"). */
export function ikUrl(path: string, transformation?: string) {
  const url = `${IMAGEKIT_BASE}/${encodeURI(path)}`;
  return transformation ? `${url}?tr=${transformation}` : url;
}

/** Responsive srcset; c-at_max stops ImageKit from upscaling past the original width. */
export function ikSrcSet(path: string, widths: number[]) {
  return widths
    .map((width) => `${ikUrl(path, `w-${width},c-at_max`)} ${width}w`)
    .join(", ");
}

/**
 * Videos are compressed before upload and served as-is. orig-true skips
 * ImageKit's video processing, which the free plan caps at 500 units/month.
 */
export function ikVideoUrl(path: string) {
  return ikUrl(path, "orig-true");
}
