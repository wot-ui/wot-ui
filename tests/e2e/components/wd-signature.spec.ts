import type { Locator } from '@playwright/test'
import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { dragBy } from '../helpers/gesture'

test.use({ hasTouch: false })

/** 比较笔迹像素，允许重绘时少量边缘像素的抗锯齿差异。 */
async function expectRestoredStroke(canvas: Locator, original: string, drawn: string) {
  await expect
    .poll(
      () =>
        canvas.evaluate(
          async (node, { original, drawn }) => {
            const current = node as HTMLCanvasElement
            const readImage = async (src: string) => {
              const image = new Image()
              image.src = src
              await image.decode()
              const buffer = document.createElement('canvas')
              buffer.width = image.naturalWidth
              buffer.height = image.naturalHeight
              const ctx = buffer.getContext('2d')!
              ctx.drawImage(image, 0, 0)
              return { width: buffer.width, height: buffer.height, pixels: ctx.getImageData(0, 0, buffer.width, buffer.height).data }
            }
            const [blank, expected] = await Promise.all([readImage(original), readImage(drawn)])
            if (current.width !== expected.width || current.height !== expected.height) return Infinity
            const actual = current.getContext('2d')!.getImageData(0, 0, current.width, current.height).data
            let inkPixels = 0
            let changedPixels = 0
            for (let i = 0; i < actual.length; i += 4) {
              let isInk = false
              let changed = false
              for (let channel = 0; channel < 4; channel++) {
                const delta = Math.abs(actual[i + channel] - expected.pixels[i + channel])
                // 透明度必须一致；边缘 RGB 混色差异统一计入变化像素数。
                if (channel === 3 && delta > 0) return Infinity
                changed ||= delta > 0
                isInk ||= expected.pixels[i + channel] !== blank.pixels[i + channel]
              }
              if (isInk) inkPixels++
              if (changed) changedPixels++
            }
            // 以实际笔迹面积为基准，避免空白画布稀释缺笔或偏移；最多 1% 的笔迹像素可有轻微差异。
            return inkPixels > 0 ? changedPixels / inkPixels : Infinity
          },
          { original, drawn }
        ),
      { message: '恢复后的差异像素不应超过原笔迹面积的 1%，尺寸和透明度必须一致' }
    )
    .toBeLessThanOrEqual(0.01)
}

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
  await expectRestoredStroke(canvas, original, drawn)
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
