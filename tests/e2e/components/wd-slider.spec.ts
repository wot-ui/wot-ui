import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { dragBy } from '../helpers/gesture'

// 这些场景验证 H5 桌面指针路径，手机视口不等于原生触摸。
test.use({ hasTouch: false })
test.beforeEach(async ({ page }) => {
  await openDemo(page, 'slider', '.wd-slider')
})

test('拖动滑块到两端被限制在 0 和 100', async ({ page }) => {
  const item = demoItem(page, t('ji-chu-yong-fa-0'))
  const bar = item.locator('.wd-slider__bar')
  const width = (await bar.boundingBox())!.width
  await dragBy(page, item.locator('.wd-slider__dot'), width, 0)
  await expect(item.locator('.wd-slider__dot-popover-text')).toHaveText('100')
  await dragBy(page, item.locator('.wd-slider__dot'), -width, 0)
  await expect(item.locator('.wd-slider__dot-popover-text')).toHaveText('0')
})

test('禁用滑块拖动保持 70', async ({ page }) => {
  const item = demoItem(page, t('jin-yong-zhuang-tai'))
  await dragBy(page, item.locator('.wd-slider__dot'), -80, 0)
  await expect(item.locator('.wd-slider__dot-popover-text')).toHaveText('70')
})

test('指定步长的轨道点击吸附到十的倍数', async ({ page }) => {
  const item = demoItem(page, t('zhi-ding-bu-chang'))
  const bar = item.locator('.wd-slider__bar')
  const box = await bar.boundingBox()
  await bar.click({ position: { x: box!.width * 0.64, y: box!.height / 2 } })
  await expect(item.locator('.wd-slider__dot-popover-text')).toHaveText('60')
})

test('范围滑块交叉后保持升序，原右端成为左端', async ({ page }) => {
  const item = demoItem(page, t('shuang-xiang-hua-kuai'))
  const width = (await item.locator('.wd-slider__bar').boundingBox())!.width
  await dragBy(page, item.locator('.wd-slider__dot--left'), width * 0.7, 0)
  const values = (await item.locator('.wd-slider__dot-popover-text').allTextContents()).map(Number)
  expect(values[0]).toBeLessThanOrEqual(values[1])
  expect(values[0]).toBe(60)
  expect(values[1]).toBeGreaterThan(60)
  expect(values[1]).toBeLessThanOrEqual(100)
})
