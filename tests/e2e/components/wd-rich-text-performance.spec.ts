import { test, expect } from '../fixtures/test'

test.skip(process.env.E2E_SERVER === 'preview', '性能入口仅 H5 开发环境提供。')

test('长内容首次挂载与同等规模更新基线', async ({ page }, testInfo) => {
  test.setTimeout(90_000)
  await page.goto('/#/subPages/richText/Index?__rich_text_performance=1')
  await page.getByText('运行基线', { exact: true }).click()
  await expect(page.locator('.rich-text-performance__progress')).toHaveText('测量完成', { timeout: 60_000 })
  const report = JSON.parse((await page.locator('.rich-text-performance__report').textContent())!)
  expect(report.results.map((result: { sample: string }) => result.sample)).toEqual(['article', 'images', 'table', 'mixed'])
  // 时间只记录，不设受宿主负载影响的 CI 阈值；静态长文必须保持一次合并。
  expect(report.results[0].renderers).toBe(1)
  expect(report.results[1].renderers).toBeLessThanOrEqual(240)
  expect(report.results[2].renderers).toBeLessThanOrEqual(1250)
  expect(report.results[3].renderers).toBeLessThanOrEqual(750)
  expect(
    report.results.every(
      (result: { mount: { medianMs: number }; update: { medianMs: number } }) => result.mount.medianMs > 0 && result.update.medianMs > 0
    )
  ).toBe(true)
  await testInfo.attach('rich-text-performance', { body: JSON.stringify(report, null, 2), contentType: 'application/json' })
  console.log(JSON.stringify(report))
})
