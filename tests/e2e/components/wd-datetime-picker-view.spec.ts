import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { stepPickerColumn } from '../helpers/picker'

test.beforeEach(async ({ page }) => {
  await page.clock.install({ time: new Date('2026-09-15T12:00:00+08:00') })
  await openDemo(page, 'datetimePickerView', '.page-datetime-picker-view .wd-picker-view')
})

test('时分两列可独立切换，另一列值保持', async ({ page }) => {
  const columns = demoItem(page, t('shi-fen')).locator('.wd-picker-view__column')
  await expect(columns).toHaveCount(2)
  await stepPickerColumn(columns.nth(1), 1)
  await expect(columns.nth(1).locator('.wd-picker-view__column-item--active')).toHaveText('13')
  await expect(columns.nth(0).locator('.wd-picker-view__column-item--active')).toHaveText('11')
})

test('分钟过滤后仅包含五的倍数且按五递增', async ({ page }) => {
  const columns = demoItem(page, t('guo-lv-xuan-xiang')).locator('.wd-picker-view__column')
  const minute = columns.nth(4)
  await expect(minute.locator('.wd-picker-view__column-item')).toHaveCount(12)
  const labels = await minute.locator('.wd-picker-view__column-item').allTextContents()
  expect(labels.map(Number)).toEqual(Array.from({ length: 12 }, (_, index) => index * 5))
  await stepPickerColumn(minute, 1)
  await expect(minute.locator('.wd-picker-view__column-item--active')).toHaveText('05')
})
