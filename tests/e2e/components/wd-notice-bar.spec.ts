import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('关闭通知后隐藏，其他通知仍可见', async ({ page }) => {
  await openDemo(page, 'noticeBar', '.wd-notice-bar')
  const close = demoItem(page, t('ke-guan-bi-de'))
  await expect(close.locator('.wd-notice-bar')).toBeVisible()
  await close.locator('.wd-notice-bar__suffix').click()
  await expect(close.locator('.wd-notice-bar')).toBeHidden()
  await expect(demoItem(page, t('jiBenYongFa')).locator('.wd-notice-bar')).toBeVisible()
})
test('禁止滚动时保留文本且没有位移动画', async ({ page }) => {
  await openDemo(page, 'noticeBar', '.wd-notice-bar')
  const content = demoItem(page, t('jin-zhi-gun-dong')).locator('.wd-notice-bar__content')
  await expect(content).toHaveText(t('yu-mai-gui-hua-tong-zai-jiu-zhong-bu-si-shao-nian-you'))
  await expect(content).toHaveCSS('transform', 'none')
})
