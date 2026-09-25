import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('水印生成背景图片且不阻挡下方开关', async ({ page }) => {
  await openDemo(page, 'watermark', '.wd-watermark')
  const item = demoItem(page, t('ju-bu-wen-zi-shui-yin'))
  await expect(item.locator('.wd-watermark')).toHaveCSS('background-image', /url\(/)
  await expect(item.locator('.wd-watermark')).toHaveCSS('pointer-events', 'none')
  const control = item.locator('.wd-switch').first()
  await expect(control).toHaveClass(/is-active/)
  await control.click()
  await expect(control).not.toHaveClass(/is-active/)
})

test('全局水印开启后覆盖视口，关闭后移除', async ({ page }) => {
  await openDemo(page, 'watermark', '.wd-watermark')
  await page.getByText('开启全局水印', { exact: true }).click()
  await expect(page.locator('.wd-watermark')).toHaveCount(4)
  const fixed = page.locator('.wd-watermark').first()
  await expect(fixed).toHaveCSS('position', 'fixed')
  await expect(fixed).toHaveCSS('background-image', /url\(/)
  await page.getByText('关闭全局水印', { exact: true }).click()
  await expect(page.locator('.wd-watermark')).toHaveCount(3)
})
