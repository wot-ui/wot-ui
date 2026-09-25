import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'overlay', '.page-overlay .wd-button')
})

test('点击基础遮罩关闭，并恢复 body 滚动样式', async ({ page }) => {
  const before = await page.locator('body').evaluate((body) => body.style.overflow)
  await demoItem(page, t('jiBenYongFa')).locator('.wd-button').click()
  await expect(page.locator('.wd-overlay:visible')).toBeVisible()
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  await page.locator('.wd-overlay:visible').click({ position: { x: 10, y: 80 } })
  await expect(page.locator('.wd-overlay:visible')).toHaveCount(0)
  await expect.poll(() => page.locator('body').evaluate((body) => body.style.overflow)).toBe(before)
})

test('嵌入内容点击不关闭，动态解除锁定后内层具备滚动空间', async ({ page }) => {
  await demoItem(page, t('qian-ru-nei-rong-0')).locator('.wd-button').click()
  const overlay = page.locator('.wd-overlay:visible')
  await overlay.locator('.page-overlay__block').first().click()
  await expect(overlay).toBeVisible()
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  await overlay.locator('.wd-switch').click()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
  const scroll = overlay.locator('.page-overlay__scroll')
  await expect(scroll).toHaveCSS('overflow-y', 'auto')
  expect(await scroll.evaluate((element) => element.scrollHeight - element.clientHeight)).toBeGreaterThan(0)
  await overlay.click({ position: { x: 10, y: 80 } })
  await expect(overlay).toHaveCount(0)
})

test('滚轮可以滚动内层内容 @wheel', async ({ page, browserName, isMobile }) => {
  test.skip(browserName === 'webkit' && isMobile, 'Playwright 移动 WebKit 不支持 mouse.wheel；真实触摸滚动另需设备验证')
  await demoItem(page, t('qian-ru-nei-rong-0')).locator('.wd-button').click()
  const overlay = page.locator('.wd-overlay:visible')
  await overlay.locator('.wd-switch').click()
  const scroll = overlay.locator('.page-overlay__scroll')
  await scroll.hover()
  await page.mouse.wheel(0, 300)
  await expect.poll(() => scroll.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
})
