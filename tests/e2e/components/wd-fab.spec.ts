import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('点击悬浮按钮展开菜单，子按钮回调可见，再次点击关闭', async ({ page }) => {
  await openDemo(page, 'fab', '.wd-fab__trigger')
  await page.locator('.wd-fab__trigger').click()
  await expect(page.locator('.wd-fab__actions .wd-button')).toHaveCount(4)
  await page.locator('.wd-fab__actions .wd-button').nth(1).click()
  await expect(page.locator('.wd-toast:visible')).toContainText('我要收藏')
  await page.locator('.wd-fab__trigger').click()
  await expect(page.locator('.wd-fab__actions')).not.toBeVisible()
})

test('禁用后触发器无法展开菜单', async ({ page }) => {
  await openDemo(page, 'fab', '.wd-fab__trigger')
  await demoItem(page, t('jinYong')).locator('.wd-switch').click()
  await page.locator('.wd-fab__trigger').click()
  await expect(page.locator('.wd-fab__actions')).not.toBeVisible()
})
