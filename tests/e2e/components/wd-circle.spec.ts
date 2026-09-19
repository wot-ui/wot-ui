import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('环形进度增减同步文本，最低保持零', async ({ page }) => {
  await openDemo(page, 'circle', '.wd-circle')
  const circles = demoItem(page, t('ji-chu-yong-fa')).locator('.wd-circle__text')
  const buttons = demoItem(page, t('jin-du-kong-zhi')).locator('.wd-button')
  await expect(circles).toHaveText(['20%', '20%', '20%'])
  await buttons.first().click()
  await expect(circles).toHaveText(['30%', '30%', '30%'])
  for (let i = 0; i < 4; i++) await buttons.last().click()
  await expect(circles).toHaveText(['0%', '0%', '0%'])
})
