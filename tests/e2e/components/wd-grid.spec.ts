import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('三列宫格每行三个子项且第二行正确换行', async ({ page }) => {
  await openDemo(page, 'grid', '.wd-grid')
  const items = demoItem(page, t('zi-ding-yi-lie-shu')).locator('.wd-grid-item')
  await expect(items).toHaveCount(6)
  const rects = await items.evaluateAll((nodes) =>
    nodes.map((node) => {
      const r = node.getBoundingClientRect()
      return { x: r.x, y: r.y, width: r.width }
    })
  )
  expect(rects[0].y).toBe(rects[2].y)
  expect(rects[3].y).toBeGreaterThan(rects[0].y)
  expect(rects[3].x).toBe(rects[0].x)
  expect(rects[0].width).toBeCloseTo(rects[1].width, 0)
})
