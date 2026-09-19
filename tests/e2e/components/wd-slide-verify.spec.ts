import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { dragBy } from '../helpers/gesture'

test.use({ hasTouch: false })
test.beforeEach(async ({ page }) => {
  await openDemo(page, 'slideVerify', '.wd-slide-verify')
})

test('未拖到终点失败并复位，拖到终点成功', async ({ page }) => {
  const item = demoItem(page, t('ji-chu-yong-fa'))
  const button = item.locator('.wd-slide-verify__button')
  await dragBy(page, button, 50, 0)
  await expect(page.locator('.wd-toast:visible')).toContainText(t('yan-zheng-shi-bai-qing-chong-shi'))
  await expect(item.locator('.wd-slide-verify__button-icon--success')).toHaveCount(0)
  const width = (await item.locator('.wd-slide-verify').boundingBox())!.width
  await dragBy(page, button, width, 0)
  await expect(item.locator('.wd-slide-verify__button-icon--success')).toBeVisible()
  await expect(page.locator('.wd-toast:visible')).toContainText(t('yan-zheng-cheng-gong'))
})

test('禁用验证不能成功，已成功实例可以重置', async ({ page }) => {
  const disabled = demoItem(page, t('jin-yong-zhuang-tai'))
  await dragBy(page, disabled.locator('.wd-slide-verify__button'), 250, 0)
  await expect(disabled.locator('.wd-slide-verify__button-icon--success')).toHaveCount(0)
  const reset = demoItem(page, t('zhong-zhi-fang-fa'))
  await dragBy(page, reset.locator('.wd-slide-verify__button'), (await reset.locator('.wd-slide-verify').boundingBox())!.width, 0)
  await expect(reset.locator('.wd-slide-verify__button-icon--success')).toBeVisible()
  await reset.locator('.wd-button').click()
  await expect(reset.locator('.wd-slide-verify__button-icon--success')).toHaveCount(0)
  await expect(page.locator('.wd-toast:visible')).toContainText(t('yi-zhong-zhi'))
})
