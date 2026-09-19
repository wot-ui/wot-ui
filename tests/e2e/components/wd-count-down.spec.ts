import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('手动倒计时开始、暂停、重置及到零停止', async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'countDown', '.wd-count-down')
  const item = demoItem(page, t('shou-dong-kong-zhi'))
  const count = item.locator('.wd-count-down')
  await expect(count).toHaveText('03:000')
  await item.getByText(t('kai-shi'), { exact: true }).click()
  await page.clock.runFor(1000)
  await item.getByText(t('zan-ting'), { exact: true }).click()
  const paused = await count.textContent()
  expect(paused).not.toBe('03:000')
  await page.clock.runFor(500)
  await expect(count).toHaveText(paused!)
  await item.getByText(t('zhong-zhi'), { exact: true }).click()
  await expect(count).toHaveText('03:000')
  await item.getByText(t('kai-shi'), { exact: true }).click()
  await page.clock.runFor(3100)
  await expect(count).toHaveText('00:000')
})
