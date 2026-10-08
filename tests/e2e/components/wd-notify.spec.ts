import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'notify', '.page-notify .wd-cell')
})

test('自定义时长通知显示后自动关闭', async ({ page }) => {
  await demoItem(page, t('zi-ding-yi-pei-zhi')).locator('.wd-cell').getByText(t('zi-ding-yi-shi-chang'), { exact: true }).click()
  const notify = page.locator('.wd-notify:visible')
  await expect(notify).toContainText(t('zi-ding-yi-shi-chang-0'))
  await expect(notify).toHaveCount(0)
})

test('常驻通知可通过关闭按钮关闭', async ({ page }) => {
  await demoItem(page, t('zi-ding-yi-pei-zhi')).locator('.wd-cell').getByText(t('xian-shi-guan-bi-an-niu'), { exact: true }).click()
  const notify = page.locator('.wd-notify:visible')
  await expect(notify).toContainText(t('tong-zhi-nei-rong'))
  await notify.locator('.wd-notify__close').click()
  await expect(notify).toHaveCount(0)
})

test('浮动通知有左右间距并可关闭', async ({ page }) => {
  await demoItem(page, t('xuan-fu-tong-zhi')).locator('.wd-cell').getByText(t('cheng-gong-tong-zhi'), { exact: true }).click()
  const notify = page.locator('.wd-notify:visible')
  await expect(notify).toContainText(t('tong-zhi-nei-rong'))
  const box = await notify.boundingBox()
  expect(box!.x).toBeGreaterThan(0)
  expect(box!.x + box!.width).toBeLessThan(page.viewportSize()!.width)
  await notify.locator('.wd-notify__close').click()
  await expect(notify).toHaveCount(0)
})
