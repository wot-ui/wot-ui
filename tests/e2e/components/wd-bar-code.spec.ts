import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { canvasPixels, expectImageLoaded } from '../helpers/media'

function countDarkPixels(data: number[]) {
  let count = 0
  for (let index = 0; index < data.length; index += 4) {
    if (data[index + 3] > 0 && data[index] + data[index + 1] + data[index + 2] < 300) count++
  }
  return count
}

test('基础条形码绘制真实条纹并采用默认尺寸', async ({ page }) => {
  await openDemo(page, 'barCode', '.wd-bar-code canvas')
  const canvas = demoItem(page, t('ji-chu-yong-fa')).locator('canvas')
  await expect(canvas).toHaveCSS('visibility', 'visible')
  await expect(canvas).toHaveCSS('width', '200px')
  await expect(canvas).toHaveCSS('height', '100px')

  await expect
    .poll(async () => {
      const pixels = await canvasPixels(canvas)
      return countDarkPixels(pixels.data)
    })
    .toBeGreaterThan(500)
})

test('导出图片生成可加载且包含条纹的 PNG', async ({ page }) => {
  await openDemo(page, 'barCode', '.wd-bar-code canvas')
  const item = demoItem(page, t('bar-code-dao-chu-tu-pian'))
  await item.locator('.wd-button').click()

  const image = item.locator('.page-bar-code__export-image img')
  await expectImageLoaded(image)
  await expect(image).toHaveAttribute('src', /^(blob:|data:image\/png)/)
  const darkPixels = await image.evaluate((node) => {
    const source = node as HTMLImageElement
    const canvas = document.createElement('canvas')
    canvas.width = source.naturalWidth
    canvas.height = source.naturalHeight
    const context = canvas.getContext('2d')!
    context.drawImage(source, 0, 0)
    const data = context.getImageData(0, 0, canvas.width, canvas.height).data
    let count = 0
    for (let index = 0; index < data.length; index += 4) {
      if (data[index + 3] > 0 && data[index] + data[index + 1] + data[index + 2] < 300) count++
    }
    return count
  })
  expect(darkPixels).toBeGreaterThan(500)
})
