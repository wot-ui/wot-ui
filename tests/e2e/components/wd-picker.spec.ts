import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { stepPickerColumn } from '../helpers/picker'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'picker', '.demo-group-item .wd-cell')
})

test('选择相邻行取消保留原值，确认后提交新值', async ({ page }) => {
  const item = demoItem(page, t('dan-lie-xuan-xiang'))
  const cell = item.locator('.wd-cell')
  const before = await cell.locator('.wd-cell__value').innerText()
  await cell.click()
  const popup = page.locator('.wd-picker__popup:visible')
  await stepPickerColumn(popup.locator('.wd-picker-view__column'), 1)
  await expect(popup.locator('.wd-picker-view__column-item--active')).toHaveText(t('xuanXiang_2-0'))
  await popup.locator('.wd-picker__action--cancel').click()
  await expect(popup).not.toBeInViewport()
  await expect(page.locator('.wd-overlay:visible')).toHaveCount(0)
  await expect(cell.locator('.wd-cell__value')).toHaveText(before)
  await cell.click()
  await stepPickerColumn(popup.locator('.wd-picker-view__column'), 1)
  await expect(popup.locator('.wd-picker-view__column-item--active')).toHaveText(t('xuanXiang_2-0'))
  await popup.locator('.wd-picker__action--confirm').click()
  await expect(popup).not.toBeInViewport()
  await expect(page.locator('.wd-overlay:visible')).toHaveCount(0)
  await expect(cell.locator('.wd-cell__value')).toHaveText(t('xuanXiang_2-0'))
})
