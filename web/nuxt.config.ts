import { env } from 'node:process'
const appBaseURL = env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  srcDir: 'src/',
  compatibilityDate: '2026-10-10',
  devtools: { enabled: false },
  telemetry: false,
  debug: false,
  css: ['~/assets/styles/main.css'],
  app: { baseURL: appBaseURL, head: { htmlAttrs: { lang: 'ru' }, meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    { name: 'theme-color', content: '#F2EFE8' },
    { name: 'robots', content: 'noindex, nofollow' },
  ], link: [{ rel: 'icon', type: 'image/svg+xml', href: `${appBaseURL.replace(/\/?$/, '/')}favicon.svg` }] } },
})

