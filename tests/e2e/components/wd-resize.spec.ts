import { test, expect } from '../fixtures/test'
import { openDemo } from '../helpers/demo'

test('元素尺寸变化后页面收到宽高 100 的通知', async ({ page }) => {
  await openDemo(page, 'resize', '.page-resize__tip-item')
  const target = page.locator('.page-resize__target')
  await expect(target).toHaveCSS('width', '100px')
  await expect(target).toHaveCSS('height', '100px')
  await expect(page.locator('.page-resize__tip-item').nth(0)).toHaveText(/width:.*100$/)
  await expect(page.locator('.page-resize__tip-item').nth(1)).toHaveText(/height:.*100$/)
})
