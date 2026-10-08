import { defineConfig, devices } from '@playwright/test'

const preview = process.env.E2E_SERVER === 'preview'
const baseURL = 'http://127.0.0.1:4173'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  // 视觉基线按操作系统保存；显式启用以免在未审阅 Linux 基线时自动接受新图。
  testIgnore: process.env.E2E_VISUAL ? [] : ['**/visual/**'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : 2,
  timeout: 30_000,
  expect: { timeout: 8_000 },
  outputDir: 'test-results/e2e',
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }], ['json', { outputFile: 'test-results/e2e-results.json' }]],
  use: {
    baseURL,
    locale: 'zh-CN',
    timezoneId: 'Asia/Shanghai',
    colorScheme: 'light',
    serviceWorkers: 'block',
    actionTimeout: 8_000,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium-mobile', use: { ...devices['Pixel 7'] } },
    { name: 'webkit-mobile', use: { ...devices['iPhone 13'] } },
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'firefox-desktop',
      use: { ...devices['Desktop Firefox'] },
      testMatch: [
        '**/smoke/*.spec.ts',
        '**/flows/*.spec.ts',
        '**/components/wd-button.spec.ts',
        '**/components/wd-input.spec.ts',
        '**/components/wd-popup.spec.ts'
      ]
    }
  ],
  webServer: {
    command: preview ? 'pnpm exec vite preview --config tests/e2e/vite-preview.config.ts' : 'pnpm dev:h5 --host 127.0.0.1 --port 4173 --strictPort',
    url: baseURL,
    // 专用端口始终启动新服务，避免连到其他任务或过期产物。
    reuseExistingServer: false,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe'
  }
})
