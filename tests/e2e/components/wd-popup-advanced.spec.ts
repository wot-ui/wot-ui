import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'popup', '.page-popup .wd-cell')
})

test('锁定背景滚动，关闭后恢复滚动能力 @wheel', async ({ page, browserName, isMobile }) => {
  test.skip(browserName === 'webkit' && isMobile, 'Playwright 移动 WebKit 不支持 mouse.wheel；锁定样式由 Overlay 跨浏览器用例覆盖')
  await demoItem(page, t('suo-ding-gun-dong')).locator('.wd-cell').click()
  const popup = page.locator('.wd-popup:visible')
  await expect(popup).toBeVisible()
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  const before = await page.evaluate(() => window.scrollY)
  await page.mouse.move(10, 150)
  await page.mouse.wheel(0, -500)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(before)
  await page.locator('.wd-overlay:visible').click({ position: { x: 10, y: 80 } })
  await expect(popup).toHaveCount(0)
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
  await page.mouse.wheel(0, -500)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(before)
})

test('RootPortal 子弹层脱离父容器，关闭后父弹层仍可操作', async ({ page }) => {
  await demoItem(page, t('qian-tao-dan-chuang-yu-rootportal')).locator('.wd-cell').click()
  await page.locator('.wd-button').getByText(t('da-kai-chuan-song-zi-dan-chuang'), { exact: true }).click()
  const child = page.locator('body > .wd-root-portal .wd-popup:visible')
  await expect(child).toContainText(t('zi-dan-chuang-chuan-song-mo-shi'))
  await child.locator('.wd-button').getByText(t('guan-bi'), { exact: true }).click()
  await expect(child).toHaveCount(0)
  await expect(page.locator('.nested-popup__title').getByText(t('fu-dan-chuang-pu-tong-mo-shi'), { exact: true })).toBeVisible()
  await page.locator('.wd-button').getByText(t('da-kai-chuan-song-zi-dan-chuang'), { exact: true }).click()
  await expect(child).toBeVisible()
})
