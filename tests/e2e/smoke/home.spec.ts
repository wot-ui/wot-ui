import { test, expect } from '../fixtures/test'

test('首页展示组件分类，进入 Button 后刷新仍可访问', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.page-home__title-name')).toHaveText('Wot UI')
  await page.locator('.page-home__body-item-header').filter({ hasText: '基础' }).click()
  await page.locator('.wd-cell').filter({ hasText: 'Button 按钮' }).click()
  await expect(page).toHaveURL(/#\/subPages\/button\/Index$/)
  await expect(page.locator('.page-button .wd-button').first()).toBeVisible()
  await page.reload()
  await expect(page.locator('.page-button .wd-button').first()).toBeVisible()
  await page.goBack()
  await expect(page.locator('.page-home__title-name')).toHaveText('Wot UI')
})
