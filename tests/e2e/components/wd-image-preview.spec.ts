import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { dragBy } from '../helpers/gesture'

test.use({ hasTouch: false })
test.beforeEach(async ({ page }) => {
  await openDemo(page, 'imagePreview', '.page-image-preview .wd-button')
})

test('从第二张开始，滑动后更新页码并可关闭', async ({ page }) => {
  await demoItem(page, t('zhi-ding-qi-shi-wei-zhi')).locator('.wd-button').click()
  const preview = page.locator('.wd-image-preview:visible')
  await expect(preview.locator('.wd-image-preview__index')).toHaveText('2 / 5')
  // 页码在进入动画开始时就更新；真正展开并定位完成后再开始手势。
  await expect(preview).toHaveCSS('opacity', '1')
  await expect
    .poll(async () => Math.abs((await preview.locator('uni-swiper-item').nth(1).boundingBox())!.x - (await preview.boundingBox())!.x))
    .toBeLessThan(1)
  await dragBy(page, preview.locator('uni-swiper'), -180, 0)
  await expect(preview.locator('.wd-image-preview__index')).toHaveText('3 / 5')
  await preview.locator('.wd-image-preview__close').click()
  await expect(preview).toHaveCount(0)
})

test('禁用点击关闭时图片点击保持打开，关闭按钮仍有效', async ({ page }) => {
  await demoItem(page, t('jin-yong-dian-ji-guan-bi')).locator('.wd-button').click()
  const preview = page.locator('.wd-image-preview:visible')
  await expect(preview).toHaveCSS('opacity', '1')
  await preview.locator('uni-swiper').click()
  await expect(preview.locator('.wd-image-preview__index')).toHaveText('1 / 5')
  await preview.locator('.wd-image-preview__close').click()
  await expect(preview).toHaveCount(0)
})

test('自定义插槽随切换同步图片说明与指示器', async ({ page }) => {
  await demoItem(page, t('shi-yong-cha-cao')).locator('.wd-button').click()
  const preview = page.locator('.wd-image-preview:visible')
  await expect(preview.locator('.page-image-preview__bottom-text')).toHaveText(t('xiao-xiong-mao-0'))
  await expect(preview).toHaveCSS('opacity', '1')
  await dragBy(page, preview.locator('uni-swiper'), -180, 0)
  await expect(preview.locator('.page-image-preview__bottom-text')).toHaveText(t('shui-tun'))
  await expect(preview.locator('.wd-swiper-nav__item--dots-bar').nth(1)).toHaveClass(/is-active/)
})
