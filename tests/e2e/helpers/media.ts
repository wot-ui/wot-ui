import { expect, type Locator, type Page } from '@playwright/test'
import { resolve } from 'node:path'

export const sampleImage = resolve('src/subPages/img/black_mao.png')

export async function chooseImage(page: Page, trigger: Locator) {
  const chooser = page.waitForEvent('filechooser')
  await trigger.click()
  await (await chooser).setFiles(sampleImage)
}

export async function expectImageLoaded(image: Locator) {
  await expect(image).toBeVisible()
  await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
}

/** 读取用户实际看见的 canvas 像素，用于输出与清除验证，不调用组件内部方法。 */
export async function canvasPixels(canvas: Locator) {
  return canvas.evaluate((node) => {
    const source = node as HTMLCanvasElement
    // 在 CSS 展示尺寸读取，避免不同 DPR 的抗锯齿采样让 jsQR 对同一码产生不同结果。
    const el = document.createElement('canvas')
    el.width = Math.round(source.getBoundingClientRect().width)
    el.height = Math.round(source.getBoundingClientRect().height)
    el.getContext('2d')!.drawImage(source, 0, 0, el.width, el.height)
    return { width: el.width, height: el.height, data: Array.from(el.getContext('2d')!.getImageData(0, 0, el.width, el.height).data) }
  })
}
