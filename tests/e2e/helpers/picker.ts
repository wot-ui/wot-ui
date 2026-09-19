import { expect, type Locator } from '@playwright/test'

/** 点击滚轮中间选中行的相邻行；坐标来自实际列尺寸，不穿透遮罩或伪造 change。 */
export async function stepPickerColumn(column: Locator, offset: -1 | 1) {
  const group = column.locator('.uni-picker-view-group')
  const indicator = column.locator('.uni-picker-view-indicator')
  await expect(indicator).toBeVisible()
  const box = (await group.boundingBox())!
  const row = (await indicator.boundingBox())!
  await group.click({ position: { x: box.width / 2, y: box.height / 2 + offset * row.height } })
  // H5 滚轮用 requestAnimationFrame 更新 transform；等它启动，再检查选中行落入指示框。
  await group.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
  await expect
    .poll(async () => {
      const active = (await column.locator('.wd-picker-view__column-item--active').boundingBox())!
      const target = (await indicator.boundingBox())!
      return Math.abs(active.y + active.height / 2 - target.y - target.height / 2)
    })
    .toBeLessThan(1)
}
