import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-09-15T12:00:00+08:00'))
  await openDemo(page, 'calendarView', '.page-calendar-view .wd-calendar-view')
  await demoItem(page, t('qie-huan-mo-shi')).locator('.wd-radio').getByText('month', { exact: true }).click()
})

test('多日期可添加并取消单个日期', async ({ page }) => {
  const item = demoItem(page, t('duo-ge-ri-qi-xuan-ze'))
  await item.locator('.wd-month__day-text').getByText('18', { exact: true }).click()
  await expect(item.locator('.wd-month__day.is-multiple-selected')).toHaveCount(1)
  await item.locator('.wd-month__day-text').getByText('20', { exact: true }).click()
  await expect(item.locator('.wd-month__day.is-multiple-selected')).toHaveCount(2)
  await item.locator('.wd-month__day-text').getByText('18', { exact: true }).click()
  await expect(item.locator('.wd-month__day.is-multiple-selected .wd-month__day-text')).toHaveText(['20'])
})

test('月导航改变标题并可返回原月份', async ({ page }) => {
  const item = demoItem(page, t('dan-ge-ri-qi-xuan-ze'))
  await expect(item.locator('.wd-month-panel__controls-title')).toHaveText('2026年9月')
  await item.locator('.wd-month-panel__control .wd-icon-right').click()
  await expect(item.locator('.wd-month-panel__controls-title')).toHaveText('2026年10月')
  await item.locator('.wd-month-panel__control .wd-icon-left').click()
  await expect(item.locator('.wd-month-panel__controls-title')).toHaveText('2026年9月')
})
