import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'curtain', '.page-curtain .wd-button')
})

test('幕帘图片加载且宽度正确，关闭图标可关闭', async ({ page }) => {
  await demoItem(page, t('jiBenYongFa')).locator('.wd-button').click()
  const curtain = page.locator('.wd-curtain:visible')
  const image = curtain.locator('img')
  await expect(image).toBeVisible()
  await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  await expect.poll(async () => (await curtain.locator('.wd-curtain__content-img').boundingBox())?.width).toBeCloseTo(280, 0)
  await curtain.locator('.wd-curtain__content-close').click()
  await expect(curtain).toHaveCount(0)
})

test('开启遮罩关闭后可以点击外部区域关闭', async ({ page }) => {
  await demoItem(page, t('dian-ji-zhe-zhao-guan-bi')).locator('.wd-button').click()
  await expect(page.locator('.wd-curtain:visible')).toBeVisible()
  await page.locator('.wd-overlay:visible').click({ position: { x: 10, y: 80 } })
  await expect(page.locator('.wd-curtain:visible')).toHaveCount(0)
})

test('自定义关闭插槽可关闭幕帘', async ({ page }) => {
  await demoItem(page, t('zi-ding-yi-guan-bi-an-niu')).locator('.wd-button').click()
  const curtain = page.locator('.wd-curtain:visible')
  await curtain.locator('.page-curtain__close').click()
  await expect(curtain).toHaveCount(0)
})
