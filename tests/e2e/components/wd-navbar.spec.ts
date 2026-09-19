import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('禁用两侧按钮后仍停留当前页面', async ({ page }) => {
  await openDemo(page, 'navbar', '.page-navbar')
  const item = demoItem(page, t('jin-yong-an-niu'))
  await item.locator('.wd-navbar__left').click()
  await item.locator('.wd-navbar__right').click()
  await expect(page).toHaveURL(/navbar\/Index$/)
  await expect(item.locator('.wd-navbar__title')).toHaveText(t('biaoTi-0'))
})

test('胶囊首页按钮重新进入首页', async ({ page }) => {
  await openDemo(page, 'navbar', '.page-navbar')
  await demoItem(page, t('jiao-nang-yang-shi')).locator('.wd-navbar-capsule .wd-icon-home').click()
  await expect(page).toHaveURL(/#\/$/)
  await expect(page.locator('.page-home__title-name')).toHaveText('Wot UI')
})
