import { test, expect } from '../fixtures/test'
import { openDemo, t } from '../helpers/demo'
import { stepPickerColumn } from '../helpers/picker'

// 所有浏览器均在无触摸输入配置下验证，包括 WebKit。
test.use({ hasTouch: false, isMobile: false })

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'datetimePicker', '.page-datetime-picker .wd-cell')
  const cell = page.locator('.page-datetime-picker .wd-cell').filter({ has: page.getByText(t('shi-fen'), { exact: true }) })
  await cell.click()
  // 坐标输入前等待弹层位移动画结束；opacity 在 slide-up 过程中始终为 1。
  await page.locator('.wd-datetime-picker__popup:visible .wd-datetime-picker__show .uni-picker-view-group').nth(1).hover()
})

test('桌面鼠标点击滚轮相邻行只前进一项', async ({ page }) => {
  const popup = page.locator('.wd-datetime-picker__popup:visible')
  const minutes = popup.locator('.wd-datetime-picker__show .wd-picker-view__column').nth(1)
  await expect(minutes.locator('.wd-picker-view__column-item--active')).toHaveText('20')
  await stepPickerColumn(minutes, 1)
  await expect(minutes.locator('.wd-picker-view__column-item--active')).toHaveText('21')
  await stepPickerColumn(minutes, -1)
  await expect(minutes.locator('.wd-picker-view__column-item--active')).toHaveText('20')
  await stepPickerColumn(minutes, 1)
  await popup.locator('.wd-datetime-picker__action').getByText('完成', { exact: true }).click()
  const cell = page.locator('.page-datetime-picker .wd-cell').filter({ has: page.getByText(t('shi-fen'), { exact: true }) })
  await expect(cell.locator('.wd-cell__value')).toHaveText('09:21')
})

for (const rows of [1.8, 2, -2]) {
  test(`桌面鼠标拖动滚轮后仍能点击相邻行 ${rows} 行`, async ({ page }) => {
    await page.clock.install()
    const minutes = page.locator('.wd-datetime-picker__popup:visible .wd-datetime-picker__show .wd-picker-view__column').nth(1)
    const row = (await minutes.locator('.uni-picker-view-indicator').boundingBox())!
    const x = row.x + row.width / 2
    const y = row.y + row.height / 2
    await page.mouse.move(x, y)
    await page.mouse.down()
    for (let step = 1; step <= 8; step++) {
      await page.mouse.move(x, y - (row.height * rows * step) / 8)
      await page.clock.runFor(50)
    }
    await page.mouse.up()
    await expect(minutes.locator('.wd-picker-view__column-item--active')).toHaveText(rows > 0 ? '22' : '18')
    // 选中值先于吸附动画更新，动画结束后 uni-h5 才接受下一次点击。
    await minutes.locator('.uni-picker-view-content').evaluate(async (el) => {
      await Promise.all(el.getAnimations().map((animation) => animation.finished))
    })
    await stepPickerColumn(minutes, -1)
    await expect(minutes.locator('.wd-picker-view__column-item--active')).toHaveText(rows > 0 ? '21' : '17')
  })
}

test('桌面鼠标滚轮上下滚动各切换一项', async ({ page }) => {
  const minutes = page.locator('.wd-datetime-picker__popup:visible .wd-datetime-picker__show .wd-picker-view__column').nth(1)
  await minutes.locator('.uni-picker-view-group').hover()
  await page.mouse.wheel(0, 60)
  await expect(minutes.locator('.wd-picker-view__column-item--active')).toHaveText('21')
  await page.mouse.wheel(0, -60)
  await expect(minutes.locator('.wd-picker-view__column-item--active')).toHaveText('20')
})
