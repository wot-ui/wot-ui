import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('动态进度更新文字和填充宽度，到 100 后不再增加', async ({ page }) => {
  await openDemo(page, 'progress', '.wd-progress')
  const item = demoItem(page, t('dong-tai-kong-zhi'))
  await item.getByText('+10', { exact: true }).click()
  await expect(item.locator('.wd-progress__label')).toHaveText('60%')
  await expect
    .poll(() =>
      item.evaluate(
        (el) =>
          el.querySelector('.wd-progress__inner')!.getBoundingClientRect().width /
          el.querySelector('.wd-progress__outer')!.getBoundingClientRect().width
      )
    )
    .toBeCloseTo(0.6, 2)
  for (let i = 0; i < 5; i++) await item.getByText('+10', { exact: true }).click()
  await expect(item.locator('.wd-progress__label')).toHaveText('100%')
})
