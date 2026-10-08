import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-09-15T12:00:00+08:00'))
  await openDemo(page, 'calendarView', '.page-calendar-view .wd-calendar-view')
  // Demo 的 9 个面板会异步滚到当前日期。WebKit 中过早点击会在按下和抬起之间被初始化滚动移走。
  const scrollViews = page.locator('.page-calendar-view .wd-month-panel__container > .uni-scroll-view > .uni-scroll-view')
  await expect(scrollViews).toHaveCount(9)
  await expect.poll(() => scrollViews.evaluateAll((elements) => elements.every((element) => element.scrollTop > 0))).toBe(true)
  const monthMode = demoItem(page, t('qie-huan-mo-shi'))
    .locator('.wd-radio')
    .filter({ has: page.getByText('month', { exact: true }) })
  await monthMode.click()
  // 切换会将每个面板的 13 个月缩为 1 个月；等更新完成再查询具体日期。
  await expect(monthMode).toHaveClass(/is-checked/)
  await expect(demoItem(page, t('duo-ge-ri-qi-xuan-ze')).locator('.wd-month-panel__controls-title')).toHaveText('2026年9月')
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
