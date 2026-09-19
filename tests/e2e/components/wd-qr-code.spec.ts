import { decodeQr } from '../helpers/qr'
import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { canvasPixels, expectImageLoaded } from '../helpers/media'

test('独立解码器从实际 canvas 读出二维码 URL', async ({ page }) => {
  await openDemo(page, 'qrCode', '.wd-qr-code')
  const canvas = demoItem(page, t('qrcode-ji-ben')).locator('canvas')
  await expect
    .poll(async () => {
      const { data, width, height } = await canvasPixels(canvas)
      return decodeQr({ data, width, height })
    })
    .toBe('https://wot-ui.cn')
})

test('导出的带 Logo 图片可解码且内容一致', async ({ page }) => {
  await openDemo(page, 'qrCode', '.wd-qr-code')
  await page.getByText(t('qrcode-dao-chu-an-niu'), { exact: true }).click()
  const image = page.locator('.page-qr-code__result-image img')
  await expectImageLoaded(image)
  const pixels = await image.evaluate((node) => {
    const image = node as HTMLImageElement
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    const context = canvas.getContext('2d')!
    context.drawImage(image, 0, 0, 200, 200)
    return { width: canvas.width, height: canvas.height, data: Array.from(context.getImageData(0, 0, canvas.width, canvas.height).data) }
  })
  expect(decodeQr(pixels)).toBe('https://wot-ui.cn')
})
