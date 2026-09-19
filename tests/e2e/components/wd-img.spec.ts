import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { expectImageLoaded } from '../helpers/media'

test('本地图片解码成功且按指定尺寸展示', async ({ page }) => {
  await openDemo(page, 'img', '.wd-img')
  const item = demoItem(page, t('ji-ben-shi-yong'))
  await expectImageLoaded(item.locator('img'))
  const box = await item.locator('.wd-img').boundingBox()
  expect(box!.width).toBe(100)
  expect(box!.height).toBe(100)
})

test('无效图片显示错误默认图标和自定义文案', async ({ page }) => {
  await openDemo(page, 'img', '.wd-img')
  const item = demoItem(page, t('jia-zai-shi-bai'))
  await expect(item.locator('.wd-img__error').first()).toBeVisible()
  await expect(item.locator('.page-img__error')).toHaveText(t('jia-zai-shi-bai'))
})
