import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('默认 14px 与 120rpx 间距具有实际高度', async ({ page }) => {
  await openDemo(page, 'gap', '.wd-gap')
  const basic = await demoItem(page, t('ji-ben-shi-yong')).locator('.wd-gap').boundingBox()
  expect(basic!.height).toBe(14)
  const custom = await demoItem(page, t('zi-ding-yi-gao-du')).locator('.wd-gap').boundingBox()
  // uni-app 在桌面宽视口下将 rpx 基准宽度封顶为 960px。
  const expected = await page.evaluate(() => ((innerWidth > 960 ? 375 : innerWidth) * 120) / 750)
  expect(Math.abs(custom!.height - expected)).toBeLessThan(1)
})
