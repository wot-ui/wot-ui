import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.use({ hasTouch: false, isMobile: false })
test('页面滚动后吸顶在 H5 导航栏下方，回顶后恢复文档流', async ({ page }) => {
  await openDemo(page, 'sticky', '.wd-sticky__container')
  const sticky = demoItem(page, t('jiBenYongFa')).locator('.wd-sticky__container')
  await page.mouse.wheel(0, 600)
  await expect(sticky).toHaveCSS('position', 'fixed')
  await expect.poll(async () => (await sticky.boundingBox())!.y).toBe(44)
  await page.mouse.wheel(0, -2000)
  await expect(sticky).toHaveCSS('position', 'absolute')
  await expect.poll(async () => (await sticky.boundingBox())!.y).toBeGreaterThan(44)
})

test('相对容器的吸顶元素不会越过容器底部', async ({ page }) => {
  await openDemo(page, 'sticky', '.wd-sticky-box')
  const item = demoItem(page, t('xiang-dui-rong-qi'))
  const box = item.locator('.wd-sticky-box')
  const sticky = item.locator('.wd-sticky__container')
  // 先进入吸顶状态再离开容器，避免跳过整个可见区时观测回调与初始化交错。
  const initialY = (await box.boundingBox())!.y
  await page.mouse.wheel(0, initialY - 20)
  await expect(sticky).toHaveCSS('position', 'fixed')
  await expect.poll(async () => (await sticky.boundingBox())!.y).toBe(44)
  await page.mouse.wheel(0, 300)
  await expect
    .poll(async () => {
      const rect = (await box.boundingBox())!
      return rect.y + rect.height
    })
    .toBeLessThan(0)
  await expect
    .poll(() =>
      item.evaluate((element) => {
        const box = element.querySelector('.wd-sticky-box')!.getBoundingClientRect()
        const child = element.querySelector('.wd-sticky__container .wd-button')!.getBoundingClientRect()
        return child.bottom - box.bottom
      })
    )
    .toBeLessThanOrEqual(1)
})

test('快速滚过容器后内容仍受底边约束，返回顶部恢复', async ({ page }) => {
  await openDemo(page, 'sticky', '.wd-sticky-box')
  const item = demoItem(page, t('xiang-dui-rong-qi'))
  const box = item.locator('.wd-sticky-box')
  const content = item.locator('.wd-sticky__container .wd-button')
  // 以实际内容尺寸确认 Resize 已完成初始测量。
  await expect.poll(async () => (await item.locator('.wd-sticky').boundingBox())!.height).toBe((await content.boundingBox())!.height)
  const initial = (await box.boundingBox())!
  await page.mouse.wheel(0, initial.y + initial.height + 100)
  await expect
    .poll(async () => {
      const rect = (await box.boundingBox())!
      return rect.y + rect.height
    })
    .toBeLessThan(0)
  await expect
    .poll(() =>
      item.evaluate((el) => {
        const box = el.querySelector('.wd-sticky-box')!.getBoundingClientRect()
        const child = el.querySelector('.wd-sticky__container .wd-button')!.getBoundingClientRect()
        return child.bottom - box.bottom
      })
    )
    .toBeLessThanOrEqual(1)
  // 向上返回容器中间区域后，应重新吸顶，而不是一直锁在底边。
  await page.mouse.wheel(0, (await box.boundingBox())!.y - 20)
  await expect(item.locator('.wd-sticky__container')).toHaveCSS('position', 'fixed')
  await expect.poll(async () => (await content.boundingBox())!.y).toBe(44)
  await page.mouse.wheel(0, -3000)
  await expect(item.locator('.wd-sticky__container')).toHaveCSS('position', 'absolute')
  await expect.poll(async () => (await content.boundingBox())!.y).toBeGreaterThan(44)
})
