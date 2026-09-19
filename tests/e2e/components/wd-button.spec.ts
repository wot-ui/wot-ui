import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'button', '.page-button .wd-button')
})

test('五种按钮类型均展示对应文案', async ({ page }) => {
  const buttons = demoItem(page, t('lei-xing')).locator('.wd-button')
  await expect(buttons).toHaveText([t('zhu-yao-an-niu'), t('cheng-gong-an-niu-0'), t('xin-xi-an-niu'), t('jing-gao-an-niu-0'), t('wei-xian-an-niu')])
  for (const button of await buttons.all()) await expect(button).toBeVisible()
})

test('按钮尺寸在浏览器中依次增大', async ({ page }) => {
  const buttons = demoItem(page, t('chi-cun')).locator('.wd-button')
  await expect(buttons).toHaveCount(4)
  const heights = await buttons.evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().height))
  expect(heights[0]).toBeGreaterThan(0)
  for (let index = 1; index < heights.length; index++) expect(heights[index]).toBeGreaterThan(heights[index - 1])
})

test('块级按钮占满示例容器宽度', async ({ page }) => {
  const item = demoItem(page, t('kuai-ji-an-niu'))
  const container = item.locator('.demo-group-item__container')
  const button = item.locator('.wd-button').first()
  await button.scrollIntoViewIfNeeded()
  const containerBox = await container.boundingBox()
  const buttonBox = await button.boundingBox()
  expect(containerBox).not.toBeNull()
  expect(buttonBox).not.toBeNull()
  // 比较内容区宽度，示例容器本身有左右内边距。
  const padding = await container.evaluate((element) => {
    const style = getComputedStyle(element)
    return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
  })
  expect(Math.abs(buttonBox!.width - (containerBox!.width - padding))).toBeLessThanOrEqual(1)
})
