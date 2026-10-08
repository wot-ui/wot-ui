import { expect, type Locator, type Page } from '@playwright/test'

/** 浏览器鼠标输入经应用已有 @vant/touch-emulator 转成触摸事件。调用文件需 hasTouch: false。 */
export async function dragBy(page: Page, target: Locator, dx: number, dy: number) {
  await target.scrollIntoViewIfNeeded()
  const box = await target.boundingBox()
  expect(box).not.toBeNull()
  const x = box!.x + box!.width / 2
  const y = box!.y + box!.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x + dx, y + dy, { steps: 16 })
  await page.mouse.up()
}

/** 只读取 DOM 中的实际位移。 */
export async function translateX(target: Locator) {
  return target.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41)
}
