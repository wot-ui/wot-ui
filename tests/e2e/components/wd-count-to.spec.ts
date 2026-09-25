import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('计数完成后保留精度、千位分隔与前后缀', async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'countTo', '.wd-count-to')
  await page.clock.runFor(3200)
  await expect(demoItem(page, t('jiBenYongFa')).locator('.wd-count-to')).toHaveText(['2,024年', '￥186.32%', '￥21,286.32%', '￥21,286.32%'])
})

test('手动计数可暂停并重置到初值', async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'countTo', '.wd-count-to')
  const item = demoItem(page, t('shou-dong-kong-zhi'))
  const count = item.locator('.wd-count-to')
  await expect(count).toHaveText('￥1,000.000%')
  await item.getByText(t('kai-shi'), { exact: true }).click()
  await page.clock.runFor(800)
  await item.getByText(t('zan-ting'), { exact: true }).click()
  const paused = await count.textContent()
  await page.clock.runFor(500)
  await expect(count).toHaveText(paused!)
  await item.getByText(t('zhong-zhi'), { exact: true }).click()
  await expect(count).toHaveText('￥1,000.000%')
})
