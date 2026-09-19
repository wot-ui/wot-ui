import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { stepPickerColumn } from '../helpers/picker'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'pickerView', '.page-picker-view .wd-picker-view')
})

test('滚轮单列切换选中项，向上可返回', async ({ page }) => {
  const item = demoItem(page, t('ji-chu-yong-fa'))
  const column = item.locator('.wd-picker-view__column')
  await stepPickerColumn(column, 1)
  await expect(column.locator('.wd-picker-view__column-item--active')).toHaveText(t('xuanXiang_2-0'))
  await stepPickerColumn(column, -1)
  await expect(column.locator('.wd-picker-view__column-item--active')).toHaveText(t('xuanXiang_1-0'))
})

test('禁用选项不会成为最终选中项', async ({ page }) => {
  const column = demoItem(page, t('jin-yong-xuan-xiang')).locator('.wd-picker-view__column')
  await stepPickerColumn(column, 1)
  await expect(column.locator('.wd-picker-view__column-item--active')).toHaveText(t('xuanXiang_2-0'))
  await stepPickerColumn(column, 1)
  // 源码优先回退到前一可选项，不是向后跳过。
  await expect(column.locator('.wd-picker-view__column-item--active')).toHaveText(t('xuanXiang_2-0'))
  await expect(column.locator('.wd-picker-view__column-item--active')).not.toHaveClass(/--disabled/)
})

test('切换省份后联动更新城市与区县列', async ({ page }) => {
  const item = demoItem(page, t('duo-ji-lian-dong'))
  const columns = item.locator('.wd-picker-view__column')
  await expect(columns).toHaveCount(3)
  await stepPickerColumn(columns.first(), 1)
  await expect(columns.nth(0).locator('.wd-picker-view__column-item--active')).toHaveText(t('guang-dong-sheng'))
  await expect(columns.nth(1).locator('.wd-picker-view__column-item--active')).toHaveText(t('guang-zhou-shi'))
  await expect(columns.nth(2).locator('.wd-picker-view__column-item--active')).toHaveText(t('li-wan-qu'))
})
