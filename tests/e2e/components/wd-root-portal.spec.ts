import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'rootPortal', '.page-root-portal .wd-button')
})

test('内容传送到 body，关闭后移除节点', async ({ page }) => {
  await demoItem(page, t('ji-chu-yong-fa')).locator('.wd-button').click()
  const modal = page.locator('body > .wd-root-portal .page-root-portal__modal')
  await expect(modal).toBeVisible()
  await expect(modal).toContainText(t('ji-ben-tan-chuang'))
  await modal.locator('.wd-button').click()
  await expect(modal).toHaveCount(0)
})

test('传送内容继承页面的暗色主题', async ({ page }) => {
  await page.locator('.page-wraper > .wd-cell').getByText(t('tiao-zheng-zhu-ti'), { exact: true }).click()
  await page.locator('.wd-action-sheet:visible').getByText('Dark', { exact: true }).click()
  await expect(page.locator('.wd-action-sheet:visible')).toHaveCount(0)
  await demoItem(page, t('ji-chu-yong-fa')).locator('.wd-button').click()
  const portal = page.locator('body > .wd-root-portal').filter({ has: page.locator('.page-root-portal__modal') })
  await expect(portal).toHaveClass(/wot-theme-dark/)
  await expect(portal.locator('.page-root-portal__modal-title')).toBeVisible()
  await portal.locator('.wd-button').click()
  await expect(portal).toHaveCount(0)
})
