import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'tabbar', '.wd-tabbar')
})

for (const title of ['ji-chu-yong-fa-0', 'tong-guo-ming-cheng-pi-pei'] as const) {
  test(`${title}：切换后仅目标子项激活`, async ({ page }) => {
    const item = demoItem(page, t(title))
    await item.locator('.wd-tabbar-item').last().click()
    await expect(item.locator('.wd-tabbar-item__body-title.is-active')).toHaveText(t('wo-de'))
    await item.locator('.wd-tabbar-item').first().click()
    await expect(item.locator('.wd-tabbar-item__body-title.is-active')).toHaveText(t('shou-ye'))
  })
}

test('异步切换完成后激活目标项', async ({ page }) => {
  const item = demoItem(page, t('yi-bu-que-ren'))
  await item.locator('.wd-tabbar-item').last().click()
  await expect(page.locator('uni-toast')).toContainText('Loading...')
  await expect(item.locator('.wd-tabbar-item__body-title.is-active')).toHaveText(t('ke-fu'))
})

test('发布插槽被 before-change 拦截，关闭弹窗后保留选择', async ({ page }) => {
  const item = demoItem(page, t('mo-ren-cha-cao'))
  await item.locator('.page-tabbar__raised-button').click()
  await expect(page.locator('.wd-dialog:visible')).toContainText(t('fa-bu-dong-tai'))
  await page.locator('.wd-dialog__actions .wd-button').getByText(t('que-ding'), { exact: true }).click()
  await expect(item.locator('.wd-tabbar-item__body-title.is-active')).toHaveText(t('fen-lei'))
})
