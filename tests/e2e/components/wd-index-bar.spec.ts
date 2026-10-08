import { test, expect } from '../fixtures/test'
import { openDemo, t } from '../helpers/demo'

test.use({ hasTouch: true })
test('点击索引 B 跳到北京，选城市回传索引和城市名', async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'indexBar', '.wd-index-bar__index')
  // IndexBar 在挂载 100ms 后测量索引栏，推进虚拟时间完成初始化。
  await page.clock.runFor(150)
  await page.locator('.wd-index-bar__index').getByText('B', { exact: true }).tap()
  await expect(page.locator('.wd-index-bar__index.is-active')).toHaveText('B')
  const beijing = page.locator('.wd-cell').getByText(t('bei-jing'), { exact: true })
  await expect(beijing).toBeInViewport()
  await beijing.click()
  await expect(page.locator('.wd-toast:visible')).toContainText('B')
  await expect(page.locator('.wd-toast:visible')).toContainText(t('bei-jing'))
})
