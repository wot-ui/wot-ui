import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('Chromium 移动触摸协议拖动滑块到边界', async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== 'chromium' || !isMobile, '连续触摸使用 Chromium CDP；WebKit/Firefox 没有等价 Playwright 触摸移动 API，另有鼠标路径测试')
  await openDemo(page, 'slider', '.wd-slider')
  const item = demoItem(page, t('ji-chu-yong-fa-0'))
  const dot = item.locator('.wd-slider__dot')
  await dot.scrollIntoViewIfNeeded()
  const box = (await dot.boundingBox())!
  const bar = (await item.locator('.wd-slider__bar').boundingBox())!
  const cdp = await page.context().newCDPSession(page)
  const start = { x: box.x + box.width / 2, y: box.y + box.height / 2 }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [start] })
  for (let i = 1; i <= 12; i++) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: start.x + ((bar.x + bar.width - start.x) * i) / 12, y: start.y }]
    })
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await expect(item.locator('.wd-slider__dot-popover-text')).toHaveText('100')
  await cdp.detach()
})
