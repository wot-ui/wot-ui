import { test, expect } from '../fixtures/test'
import { openDemo, t } from '../helpers/demo'
import { stepPickerColumn } from '../helpers/picker'

test.beforeEach(async ({ page }) => {
  await page.clock.install({ time: new Date('2026-09-15T12:00:00+08:00') })
  await openDemo(page, 'datetimePicker', '.page-datetime-picker .wd-cell')
})

test('时分选择取消保持原值，确认后回显新分钟', async ({ page }) => {
  const cell = page.locator('.page-datetime-picker .wd-cell').filter({ has: page.getByText(t('shi-fen'), { exact: true }) })
  await cell.click()
  const popup = page.locator('.wd-datetime-picker__popup:visible')
  const minutes = popup.locator('.wd-datetime-picker__show .wd-picker-view__column').nth(1)
  await stepPickerColumn(minutes, 1)
  await expect(minutes.locator('.wd-picker-view__column-item--active')).toHaveText('21')
  await popup.locator('.wd-datetime-picker__action').getByText('取消', { exact: true }).click()
  await expect(popup).not.toBeInViewport()
  await expect(page.locator('.wd-overlay:visible')).toHaveCount(0)
  await expect(cell.locator('.wd-cell__value')).toHaveText('09:20')
  await cell.click()
  await stepPickerColumn(minutes, 1)
  await expect(minutes.locator('.wd-picker-view__column-item--active')).toHaveText('21')
  await popup.locator('.wd-datetime-picker__action').getByText('完成', { exact: true }).click()
  await expect(cell.locator('.wd-cell__value')).toHaveText('09:21')
})

test('带秒时间有三列，秒数确认后保留', async ({ page }) => {
  const cell = page.locator('.page-datetime-picker .wd-cell').filter({ hasText: t('shi-jian-xuan-ze-dai-miao') })
  await cell.click()
  const popup = page.locator('.wd-datetime-picker__popup:visible')
  const columns = popup.locator('.wd-datetime-picker__show .wd-picker-view__column')
  await expect(columns).toHaveCount(3)
  await stepPickerColumn(columns.nth(2), 1)
  await expect(columns.nth(2).locator('.wd-picker-view__column-item--active')).toHaveText('27')
  await popup.locator('.wd-datetime-picker__action').getByText('完成', { exact: true }).click()
  await expect(cell.locator('.wd-cell__value')).toHaveText('09:20:27')
})

test('一年范围限制可选年月日，不出现边界外选项', async ({ page }) => {
  const cell = page.locator('.page-datetime-picker .wd-cell').filter({ hasText: t('shi-jian-fan-wei-yi-nian') })
  await cell.click()
  const popup = page.locator('.wd-datetime-picker__popup:visible')
  const columns = popup.locator('.wd-datetime-picker__show .wd-picker-view__column')
  const numbers = async (index: number) =>
    (await columns.nth(index).locator('.wd-picker-view__column-item').allTextContents()).map((text) => parseInt(text, 10))
  await expect.poll(() => numbers(0)).toEqual([2026, 2027])
  expect(await numbers(1)).toEqual([9, 10, 11, 12])
  expect(await numbers(2)).toEqual(Array.from({ length: 16 }, (_, i) => i + 15))
  await stepPickerColumn(columns.first(), 1)
  await expect.poll(() => numbers(1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  await expect.poll(() => numbers(2)).toEqual(Array.from({ length: 15 }, (_, i) => i + 1))
  await popup.locator('.wd-datetime-picker__action').getByText('完成', { exact: true }).click()
  await expect(cell.locator('.wd-cell__value')).toContainText('2027-09-15')
})
