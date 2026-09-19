import { test, expect } from '../fixtures/test'
import { openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-09-15T12:00:00+08:00'))
  await openDemo(page, 'calendar', '.page-calendar .wd-cell')
  // 月切换模式只展示当前月份，日期位置不依赖长列表的自动滚动。
  await page.locator('.page-calendar .wd-radio').getByText('month', { exact: true }).click()
})

test('单日取消保留原日期，确认后回显新日期', async ({ page }) => {
  const cell = page.locator('.page-calendar .wd-cell').filter({ hasText: t('dan-ge-ri-qi-xuan-ze') })
  const before = await cell.locator('.wd-cell__value').innerText()
  await cell.click()
  const popup = page.locator('.wd-calendar__popup:visible')
  await popup.locator('.wd-month__day-text').getByText('20', { exact: true }).click()
  await expect(popup.locator('.wd-month__day.is-selected .wd-month__day-text')).toHaveText('20')
  await popup.locator('.wd-action-sheet__close').click()
  await expect(popup).toHaveCount(0)
  await expect(cell.locator('.wd-cell__value')).toHaveText(before)
  await cell.click()
  await popup.locator('.wd-month__day-text').getByText('20', { exact: true }).click()
  await expect(popup.locator('.wd-month__day.is-selected .wd-month__day-text')).toHaveText('20')
  await popup.locator('.wd-calendar__confirm .wd-button').click()
  await expect(popup).toHaveCount(0)
  await expect(cell.locator('.wd-cell__value')).toHaveText('2026-09-20')
})

test('范围选择起止日期，起点未完整时不能确认', async ({ page }) => {
  const cell = page.locator('.page-calendar .wd-cell').filter({ hasText: t('ri-qi-fan-wei-xuan-ze') })
  await cell.click()
  const popup = page.locator('.wd-calendar__popup:visible')
  await popup.locator('.wd-month__day-text').getByText('18', { exact: true }).click()
  await expect(popup.locator('.wd-calendar__range-item').first()).toContainText('18')
  await expect(popup.locator('.wd-calendar__confirm .wd-button')).toHaveClass(/is-disabled/)
  await popup.locator('.wd-month__day-text').getByText('20', { exact: true }).click()
  await expect(popup.locator('.wd-calendar__range-item').nth(1)).toContainText('20')
  await expect(popup.locator('.wd-calendar__confirm .wd-button')).not.toHaveClass(/is-disabled/)
  await popup.locator('.wd-calendar__confirm .wd-button').click()
  await expect(popup).toHaveCount(0)
  await expect(cell.locator('.wd-cell__value')).toContainText('2026-09-18')
  await expect(cell.locator('.wd-cell__value')).toContainText('2026-09-20')
})
