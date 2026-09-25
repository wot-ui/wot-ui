import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { dragBy } from '../helpers/gesture'

test.use({ hasTouch: false })

test('签名笔迹改变 canvas，清除后恢复空白', async ({ page }) => {
  await openDemo(page, 'signature', '.wd-signature')
  const item = demoItem(page, t('ji-chu-yong-fa-0'))
  const canvas = item.locator('canvas')
  const original = await canvas.evaluate((node) => (node as HTMLCanvasElement).toDataURL())
  await dragBy(page, item.locator('uni-canvas'), 80, 40)
  await expect.poll(() => canvas.evaluate((node) => (node as HTMLCanvasElement).toDataURL())).not.toBe(original)
  await item.locator('.wd-button').getByText('清空', { exact: true }).click()
  await expect.poll(() => canvas.evaluate((node) => (node as HTMLCanvasElement).toDataURL())).toBe(original)
})

test('签名历史撤销恢复笔迹', async ({ page }) => {
  await openDemo(page, 'signature', '.wd-signature')
  const item = demoItem(page, t('li-shi-ji-lu'))
  const canvas = item.locator('canvas')
  const original = await canvas.evaluate((node) => (node as HTMLCanvasElement).toDataURL())
  await dragBy(page, item.locator('uni-canvas'), 80, 40)
  await expect.poll(() => canvas.evaluate((node) => (node as HTMLCanvasElement).toDataURL())).not.toBe(original)
  const drawn = await canvas.evaluate((node) => (node as HTMLCanvasElement).toDataURL())
  await item.locator('.wd-button').getByText('撤销', { exact: true }).click()
  await expect.poll(() => canvas.evaluate((node) => (node as HTMLCanvasElement).toDataURL())).toBe(original)
  await item.locator('.wd-button').getByText('恢复', { exact: true }).click()
  await expect.poll(() => canvas.evaluate((node) => (node as HTMLCanvasElement).toDataURL())).toBe(drawn)
})

test('横屏签名页绘制后完成，生成可解码的预览图片', async ({ page }) => {
  await page.goto('/#/subPages/signature/Landscape')
  await expect(page.locator('uni-canvas')).toBeVisible()
  await dragBy(page, page.locator('uni-canvas'), 70, 40)
  await page.locator('.wd-button').getByText(t('wan-cheng'), { exact: true }).click()
  const image = page.locator('img[src^="data:image/png"]:visible').first()
  await expect(image).toBeVisible()
  await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(100)
  await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalHeight)).toBeGreaterThan(100)
  const darkPixels = await image.evaluate((el: HTMLImageElement) => {
    const canvas = document.createElement('canvas')
    canvas.width = el.naturalWidth
    canvas.height = el.naturalHeight
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(el, 0, 0)
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let count = 0
    for (let i = 0; i < data.length; i += 4) if (data[i] < 80 && data[i + 3] > 0) count++
    return count
  })
  expect(darkPixels).toBeGreaterThan(20)
})
