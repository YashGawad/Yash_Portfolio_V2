/**
 * Resolves an asset path against Vite's configured base URL.
 * Essential for GitHub Pages deployment where base is `/Yash_Portfolio/`.
 */
export function getAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${cleanBase}${cleanPath}`
}

