import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { chooseImage, expectImageLoaded } from '../helpers/media'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'imgCropper', '.page-img-cropper__image-placeholder')
})

test('选择图片后取消不产生结果，再次选择完成裁剪可解码图片', async ({ page }) => {
  const item = demoItem(page, t('jiBenYongFa'))
  await chooseImage(page, item.locator('.page-img-cropper__image-placeholder'))
  await page.locator('.wd-img-cropper__cancel').click()
  await expect(page.locator('.wd-img-cropper')).toHaveCount(0)
  await expect(item.locator('.page-img-cropper__profile-image')).toHaveCount(0)
  await chooseImage(page, item.locator('.page-img-cropper__image-placeholder'))
  await expectImageLoaded(page.locator('.wd-img-cropper__img img'))
  await page.locator('.wd-img-cropper__footer .wd-button').getByText('完成', { exact: true }).click()
  await expectImageLoaded(item.locator('.page-img-cropper__profile-image img'))
  const dimensions = await item
    .locator('.page-img-cropper__profile-image img')
    .evaluate((el) => [(el as HTMLImageElement).naturalWidth, (el as HTMLImageElement).naturalHeight])
  expect(dimensions[0]).toBe(dimensions[1])
})

test('3:2 裁剪框和输出图片均保持指定比例', async ({ page }) => {
  const item = demoItem(page, t('zi-ding-yi-cai-jian-bi-li')).locator('.page-img-cropper__grid-item').first()
  await chooseImage(page, item.locator('.page-img-cropper__image-placeholder'))
  await expectImageLoaded(page.locator('.wd-img-cropper__img img'))
  const box = await page.locator('.wd-img-cropper__cut-body').boundingBox()
  expect(box!.width / box!.height).toBeCloseTo(1.5, 1)
  await page.locator('.wd-img-cropper__footer .wd-button').getByText('完成', { exact: true }).click()
  const image = item.locator('.page-img-cropper__grid-image img')
  await expectImageLoaded(image)
  expect(await image.evaluate((el) => (el as HTMLImageElement).naturalWidth / (el as HTMLImageElement).naturalHeight)).toBeCloseTo(1.5, 1)
})
