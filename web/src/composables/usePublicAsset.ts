// Public assets must work at / locally and at /nerud/ on GitHub Pages.
export function usePublicAsset() {
  const baseURL = useRuntimeConfig().app.baseURL
  return (path: string) => `${baseURL.replace(/\/?$/, '/')}${path.replace(/^\/+/, '')}`
}
