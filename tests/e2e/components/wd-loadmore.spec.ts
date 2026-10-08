import { test, expect } from '../fixtures/test'
import { openDemo } from '../helpers/demo'

test.use({ isMobile: false, hasTouch: false })
test('触底逐批加载、失败重试及没有更多数据', async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'loadmore', '.page-loadmore__item')
  const items = page.locator('.page-loadmore__item')
  await expect(items).toHaveCount(15)
  for (const count of [30, 45]) {
    // uni-h5 触底回调有 350ms 锁；推进虚拟时钟后再发下一次真实 wheel。
    await page.clock.runFor(400)
    const before = await page.evaluate(() => scrollY)
    if (before > 0) {
      await page.mouse.wheel(0, -300)
      await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(before)
    }
    await page.mouse.wheel(0, 10000)
    await expect(items).toHaveCount(count)
  }
  await page.clock.runFor(400)
  await page.mouse.wheel(0, 10000)
  await expect(page.locator('.wd-loadmore__refresh-text')).toBeVisible()
  await page.locator('.wd-loadmore__refresh-text').click()
  await expect(items).toHaveCount(60)
  await page.clock.runFor(400)
  await page.mouse.wheel(0, 10000)
  await expect(page.locator('.wd-loadmore__divider')).toBeVisible()
  await page.mouse.wheel(0, 10000)
  await expect(items).toHaveCount(60)
})
