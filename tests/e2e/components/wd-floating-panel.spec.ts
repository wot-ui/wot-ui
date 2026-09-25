import { test, expect } from '../fixtures/test'
import { openDemo } from '../helpers/demo'
import { dragBy } from '../helpers/gesture'

test.use({ hasTouch: false })
test('拖动面板头部展开再收起，位置实际变化', async ({ page }) => {
  await openDemo(page, 'floatingPanel', '.wd-floating-panel__header')
  const panel = page.locator('.wd-floating-panel:visible')
  const initialY = (await panel.boundingBox())!.y
  await dragBy(page, panel.locator('.wd-floating-panel__header'), 0, -300)
  await expect.poll(async () => (await panel.boundingBox())!.y).toBeLessThan(initialY - 100)
  await dragBy(page, panel.locator('.wd-floating-panel__header'), 0, 400)
  await expect.poll(async () => (await panel.boundingBox())!.y).toBeCloseTo(initialY, 0)
})

test('禁止内容拖动时位置保持，头部仍可拖动', async ({ page }) => {
  await openDemo(page, 'floatingPanel', '.wd-tabs__nav-item')
  await page.locator('.wd-tabs__nav-item').nth(2).click()
  const panel = page.locator('.wd-floating-panel:visible')
  const initialY = (await panel.boundingBox())!.y
  await dragBy(page, panel.locator('.page-floating-panel__content'), 0, -150)
  await expect.poll(async () => (await panel.boundingBox())!.y).toBeCloseTo(initialY, 0)
  await dragBy(page, panel.locator('.wd-floating-panel__header'), 0, -300)
  await expect.poll(async () => (await panel.boundingBox())!.y).toBeLessThan(initialY - 100)
})
