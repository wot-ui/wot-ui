import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'actionSheet', '.page-action-sheet .wd-button')
})

test('选择普通选项关闭面板', async ({ page }) => {
  await demoItem(page, t('jiBenYongFa')).locator('.wd-button').click()
  const sheet = page.locator('.wd-action-sheet:visible')
  await expect(sheet.locator('.wd-action-sheet__name')).toHaveText([t('xuanXiang_1-0'), t('xuanXiang_2-0'), t('xuanXiang_3-0')])
  await sheet.locator('.wd-action-sheet__name').getByText(t('xuanXiang_2-0'), { exact: true }).click()
  await expect(sheet).toHaveCount(0)
})

test('禁用与加载选项不关闭面板，正常选项可关闭', async ({ page }) => {
  await demoItem(page, t('xuanXiangZhuangTai')).locator('.wd-button').click()
  const sheet = page.locator('.wd-action-sheet:visible')
  await sheet.locator('.wd-action-sheet__action--disabled').click()
  await expect(sheet).toBeVisible()
  await sheet.locator('.wd-action-sheet__action--loading').click()
  await expect(sheet).toBeVisible()
  await sheet.getByText(t('yanSe'), { exact: true }).click()
  await expect(sheet).toHaveCount(0)
})

test('取消按钮关闭后可重新打开', async ({ page }) => {
  const trigger = demoItem(page, t('quXiaoAnNiu')).locator('.wd-button')
  await trigger.click()
  await page.locator('.wd-action-sheet:visible .wd-action-sheet__cancel').click()
  await expect(page.locator('.wd-action-sheet:visible')).toHaveCount(0)
  await trigger.click()
  await expect(page.locator('.wd-action-sheet:visible .wd-action-sheet__cancel')).toHaveText(t('qu-xiao'))
})

test('单行面板选择后显示选中项目和索引', async ({ page }) => {
  await demoItem(page, t('ziDingYiMianBanDanHang')).locator('.wd-button').click()
  await page
    .locator('.wd-action-sheet:visible .wd-action-sheet__panel')
    .filter({ hasText: t('weiXinHaoYou') })
    .click()
  await expect(page.locator('.wd-toast:visible').first()).toContainText(t('weiXinHaoYou'))
  await expect(page.locator('.wd-toast:visible').first()).toContainText('0')
  await expect(page.locator('.wd-action-sheet:visible')).toHaveCount(0)
})
