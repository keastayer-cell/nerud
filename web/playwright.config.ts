import { defineConfig } from '@playwright/test'
import { existsSync, mkdirSync, symlinkSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const appBaseURL = process.env.NUXT_APP_BASE_URL || '/'
if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(appBaseURL)) throw new Error('Invalid NUXT_APP_BASE_URL')
const previewRoot = appBaseURL === '/' ? '.output/public' : '.output/preview'
if (appBaseURL !== '/') {
  const mount = resolve(previewRoot, appBaseURL.slice(1, -1))
  mkdirSync(dirname(mount), { recursive: true })
  if (!existsSync(mount)) symlinkSync(resolve('.output/public'), mount, 'dir')
}
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  use: { reducedMotion: 'reduce', baseURL: `http://127.0.0.1:3100${appBaseURL}` },
  webServer: { command: `python3 -m http.server 3100 --bind 127.0.0.1 --directory ${previewRoot}`, url: `http://127.0.0.1:3100${appBaseURL}`, reuseExistingServer: false },
  projects: [
    { name: 'android-compact', use: { browserName: 'chromium', viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true } },
    { name: 'android-modern', use: { browserName: 'chromium', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'android-wide', use: { browserName: 'chromium', viewport: { width: 430, height: 932 }, isMobile: true, hasTouch: true } },
    { name: 'ios', use: { browserName: 'webkit', viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
    { name: 'tablet', use: { browserName: 'chromium', viewport: { width: 768, height: 1024 } } },
    { name: 'desktop', use: { browserName: 'chromium', viewport: { width: 1440, height: 1000 } } },
  ],
})

