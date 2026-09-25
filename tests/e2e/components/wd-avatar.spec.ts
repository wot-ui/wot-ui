import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { expectImageLoaded } from '../helpers/media'

test('图片、文字、图标头像分别渲染，点击有反馈', async ({ page }) => {
  await openDemo(page, 'avatar', '.wd-avatar')
  const items = demoItem(page, t('ji-chu-yong-fa-0')).locator('.wd-avatar')
  await expectImageLoaded(items.first().locator('img'))
  await expect(items.nth(1)).toHaveText('U')
  await expect(items.nth(2).locator('.wd-icon-user')).toBeVisible()
  await demoItem(page, t('ke-dian-ji')).locator('.wd-avatar').first().click()
  await expect(page.locator('.wd-toast:visible')).toContainText(t('dian-ji-tou-xiang'))
})

test('头像组 max-count 隐藏多余项并显示折叠数量', async ({ page }) => {
  await openDemo(page, 'avatar', '.wd-avatar')
  const group = demoItem(page, t('tou-xiang-zu-zui-da-shu-liang')).locator('.wd-avatar-group')
  await expect(group.locator('.wd-avatar:visible')).toHaveCount(4)
  await expect(group.locator('.wd-avatar:visible').last()).toHaveText('+2')
})
