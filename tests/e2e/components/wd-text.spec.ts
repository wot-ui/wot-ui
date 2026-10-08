import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('金额格式化、脱敏和前后缀显示正确', async ({ page }) => {
  await openDemo(page, 'text', '.wd-text')
  await expect(demoItem(page, t('jin-e')).locator('.wd-text')).toHaveText('￥16,354.16')
  await expect(demoItem(page, t('tuo-min')).locator('.wd-text')).toHaveText(['张**三', '188****8888'])
  await expect(demoItem(page, t('qian-hou-cha-cao')).locator('.wd-text').first()).toHaveText('Prefix123****8901Suffix')
})
test('两行省略限制可见高度且保留完整文本', async ({ page }) => {
  await openDemo(page, 'text', '.wd-text')
  const text = demoItem(page, 'lines').locator('.wd-text')
  await expect(text).toHaveCSS('-webkit-line-clamp', '2')
  expect((await text.textContent())!.length).toBeGreaterThan(60)
  const dimensions = await text.evaluate((el) => ({
    height: el.getBoundingClientRect().height,
    lineHeight: parseFloat(getComputedStyle(el).lineHeight)
  }))
  expect(dimensions.height).toBeLessThanOrEqual(dimensions.lineHeight * 2 + 1)
})
