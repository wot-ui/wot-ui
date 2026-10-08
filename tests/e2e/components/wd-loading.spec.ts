import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('四种加载动画结构和文字正确', async ({ page }) => {
  await openDemo(page, 'loading', '.wd-loading')
  const types = demoItem(page, t('lei-xing'))
  await expect(types.locator('.wd-loading__spinner--spinner .wd-loading__spinner-dot')).toHaveCount(12)
  await expect(types.locator('.wd-loading__spinner--dots .wd-loading__spinner-dot')).toHaveCount(3)
  await expect(types.locator('.wd-loading__spinner-wave-bar')).toHaveCount(4)
  await expect(demoItem(page, t('xian-shi-wen-zi')).locator('.wd-loading__text')).toHaveText(Array(4).fill(t('jia-zai-zhong')))
})
test('所有类型均应用指定的 20、30、50px 尺寸', async ({ page }) => {
  await openDemo(page, 'loading', '.wd-loading')
  const sizes = await demoItem(page, t('da-xiao'))
    .locator('.wd-loading__spinner')
    .evaluateAll((nodes) => nodes.map((n) => parseFloat(getComputedStyle(n).width)))
  expect(sizes).toEqual([20, 20, 20, 20, 30, 30, 30, 30, 50, 50, 50, 50])
})
