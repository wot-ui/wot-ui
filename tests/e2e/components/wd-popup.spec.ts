import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'popup', '.page-popup .wd-cell')
})

test('打开基础弹层，点击遮罩关闭后可以再次打开', async ({ page }) => {
  const trigger = demoItem(page, t('ji-chu-yong-fa-0')).locator('.wd-cell')
  await trigger.click()
  const popup = page.locator('.wd-popup:visible')
  await expect(popup).toContainText(t('dan-dan-dan'))
  // H5 原生导航栏覆盖顶部 44px，选择导航栏下方的遮罩区域。
  await page.locator('.wd-overlay:visible').click({ position: { x: 10, y: 80 } })
  await expect(popup).toHaveCount(0)
  await trigger.click()
  await expect(popup).toContainText(t('dan-dan-dan'))
})

test('关闭按钮关闭底部弹层', async ({ page }) => {
  await demoItem(page, t('guan-bi-an-niu')).locator('.wd-cell').click()
  await expect(page.locator('.wd-popup:visible')).toBeVisible()
  await page.locator('.wd-popup:visible .wd-popup__close').click()
  await expect(page.locator('.wd-popup:visible')).toHaveCount(0)
})

test('禁止遮罩关闭时弹层保留，关闭按钮仍可使用', async ({ page }) => {
  await demoItem(page, t('jin-yong-zhe-zhao-dian-ji')).locator('.wd-cell').click()
  const popup = page.locator('.wd-popup:visible')
  await expect(popup).toBeVisible()
  await page.locator('.wd-overlay:visible').click({ position: { x: 10, y: 80 } })
  await expect(popup).toBeVisible()
  await popup.locator('.wd-popup__close').click()
  await expect(popup).toHaveCount(0)
})

test('无模态弹层不显示遮罩', async ({ page }) => {
  await demoItem(page, t('jin-yong-zhe-zhao')).locator('.wd-cell').click()
  await expect(page.locator('.wd-popup:visible')).toBeVisible()
  await expect(page.locator('.wd-overlay:visible')).toHaveCount(0)
  await page.locator('.wd-popup:visible .wd-popup__close').click()
  await expect(page.locator('.wd-popup:visible')).toHaveCount(0)
})
