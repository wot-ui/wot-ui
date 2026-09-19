import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('24 栅格按 span 等比分配列宽', async ({ page }) => {
  await openDemo(page, 'layout', '.wd-row')
  const rows = demoItem(page, t('ji-chu-yong-fa-0')).locator('.wd-row')
  for (const [rowIndex, count] of [1, 2, 3, 4].entries()) {
    const row = rows.nth(rowIndex)
    await expect(row.locator('.wd-col')).toHaveCount(count)
    const width = (await row.boundingBox())!.width
    for (const col of await row.locator('.wd-col').all()) {
      expect((await col.boundingBox())!.width).toBeCloseTo(width / count, 0)
      await expect(col).toHaveText(`span: ${24 / count}`)
    }
  }
})

test('gutter 使相邻内容间距为 20px', async ({ page }) => {
  await openDemo(page, 'layout', '.wd-row')
  const cells = demoItem(page, t('fen-lan-jian-ge')).locator('.page-layout__cell')
  const gaps = await cells.evaluateAll((nodes) =>
    nodes.slice(1).map((node, i) => node.getBoundingClientRect().left - nodes[i].getBoundingClientRect().right)
  )
  expect(gaps[0]).toBeCloseTo(20, 0)
  expect(gaps[1]).toBeCloseTo(20, 0)
})
