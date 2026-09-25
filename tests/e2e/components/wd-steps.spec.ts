import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('推进步骤后前一步完成、下一步进行中，最终全部完成', async ({ page }) => {
  await openDemo(page, 'steps', '.wd-steps')
  const item = demoItem(page, t('biao-ti-he-miao-shu-xin-xi'))
  await expect(item.locator('.wd-step--process .wd-step__title')).toHaveText(t('bu-zhou-1'))
  for (let finished = 1; finished <= 3; finished++) {
    await item.locator('.wd-button').click()
    await expect(item.locator('.wd-step--finished')).toHaveCount(finished)
  }
  await expect(item.locator('.wd-step--process')).toHaveCount(0)
  await expect(item.locator('.wd-step__description')).toHaveText([
    t('zhu-ce-1-ge-zhang-hao'),
    t('deng-lu-zhang-hao-bin-ding-shou-ji'),
    t('wan-shan-ge-ren-xin-xi')
  ])
})

test('错误步骤显示错误图标，竖向布局从上到下排列', async ({ page }) => {
  await openDemo(page, 'steps', '.wd-steps')
  await expect(demoItem(page, t('xiu-gai-zhuang-tai')).locator('.wd-step--error .wd-step__error-icon')).toBeVisible()
  const items = demoItem(page, t('shu-xiang-bu-zhou-tiao')).locator('.wd-step')
  const boxes = await items.evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().top))
  expect(boxes[0]).toBeLessThan(boxes[1])
  expect(boxes[1]).toBeLessThan(boxes[2])
})
