import { test, expect } from '../fixtures/test'
import { openDemo, t } from '../helpers/demo'

test.use({ hasTouch: true })

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'datetimePicker', '.page-datetime-picker .wd-cell')
  await page
    .locator('.page-datetime-picker .wd-cell')
    .filter({ has: page.getByText(t('shi-fen'), { exact: true }) })
    .tap()
  // 坐标输入前等待弹层位移动画结束；opacity 在 slide-up 过程中始终为 1。
  await page.locator('.wd-datetime-picker__popup:visible .wd-datetime-picker__show .uni-picker-view-group').nth(1).hover()
})

test('触摸点击日期滚轮相邻行只前进一项并确认回填', async ({ page }) => {
  const popup = page.locator('.wd-datetime-picker__popup:visible')
  const minutes = popup.locator('.wd-datetime-picker__show .wd-picker-view__column').nth(1)
  const row = (await minutes.locator('.uni-picker-view-indicator').boundingBox())!
  await page.touchscreen.tap(row.x + row.width / 2, row.y + row.height * 1.5)
  await expect(minutes.locator('.wd-picker-view__column-item--active')).toHaveText('21')
  await popup.locator('.wd-datetime-picker__action').getByText('完成', { exact: true }).tap()
  await expect(
    page
      .locator('.page-datetime-picker .wd-cell')
      .filter({ has: page.getByText(t('shi-fen'), { exact: true }) })
      .locator('.wd-cell__value')
  ).toHaveText('09:21')
})

for (const rows of [1.8, 2, -2]) {
  test(`Chromium 连续触摸拖动日期滚轮更新分钟 ${rows} 行`, async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', '连续触摸使用 Chromium CDP；其他浏览器验证原生 tap')
    await page.clock.install()
    const minutes = page.locator('.wd-datetime-picker__popup:visible .wd-datetime-picker__show .wd-picker-view__column').nth(1)
    const row = (await minutes.locator('.uni-picker-view-indicator').boundingBox())!
    const start = { x: row.x + row.width / 2, y: row.y + row.height / 2 }
    const cdp = await page.context().newCDPSession(page)
    try {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [start] })
      for (let step = 1; step <= 8; step++) {
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: start.x, y: start.y - (row.height * rows * step) / 8 }] })
        await page.clock.runFor(50)
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
      await expect(minutes.locator('.wd-picker-view__column-item--active')).toHaveText(rows > 0 ? '22' : '18')
    } finally {
      await cdp.detach()
    }
  })
}
