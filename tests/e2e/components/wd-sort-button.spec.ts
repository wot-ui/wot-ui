import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

for (const [title, sequence] of [
  ['ji-chu-yong-fa-0', ['down', 'up', 'down']],
  ['she-zhi-allowreset-yun-xu-zhong-zhi-an-niu', ['down', 'up', 'none']],
  ['she-zhi-descfirst-you-xian-qie-huan-wei-jiang-xu', ['up', 'down', 'up']]
] as const) {
  test(`${title}：排序图标按配置循环`, async ({ page }) => {
    await openDemo(page, 'sortButton', '.wd-sort-button')
    const item = demoItem(page, t(title))
    for (const direction of sequence) {
      await item.locator('.wd-sort-button').click()
      await expect(item.locator('[class*="--active"]')).toHaveCount(direction === 'none' ? 0 : 1)
      if (direction !== 'none') await expect(item.locator(`.wd-sort-button__icon-${direction}--active`)).toBeVisible()
    }
  })
}
