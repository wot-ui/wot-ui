import { test as base, expect } from '@playwright/test'
import { mockDemoAssets } from './network'

export const test = base.extend<{ browserDiagnostics: void }>({
  page: [
    async ({ context }, use) => {
      // CI 的 WebKit 首次建页可能耗时数十秒；单独计时，不占用业务用例的 30 秒预算。
      // 沿用内置 context，由其负责页面清理、Trace 和截图。
      await use(await context.newPage())
    },
    { scope: 'test', timeout: 60_000 }
  ],
  browserDiagnostics: [
    async ({ page, baseURL }, use, testInfo) => {
      const unexpectedRequests = await mockDemoAssets(page, baseURL!)
      const errors: string[] = []
      const failedRequests: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text())
      })
      page.on('requestfailed', (request) => {
        failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`)
      })
      await use()
      if (errors.length || failedRequests.length || unexpectedRequests.length) {
        await testInfo.attach('browser-diagnostics', {
          body: JSON.stringify({ errors, failedRequests, unexpectedRequests }, null, 2),
          contentType: 'application/json'
        })
      }
      expect(unexpectedRequests, '外部请求必须显式提供 fixture，不能依赖或写入真实服务').toEqual([])
      expect(errors, '页面不应出现未预期的运行异常或 console.error').toEqual([])
    },
    { auto: true }
  ]
})

export { expect }
