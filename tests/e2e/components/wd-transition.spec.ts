import { test, expect } from '../fixtures/test'
import { openDemo } from '../helpers/demo'

for (const name of [
  'fade',
  'fade-up',
  'fade-down',
  'fade-left',
  'fade-right',
  'slide-up',
  'slide-down',
  'slide-left',
  'slide-right',
  'zoom-in',
  'zoom-out',
  'custom'
]) {
  test(`${name} 进入后可见，离开完成后隐藏`, async ({ page }) => {
    await openDemo(page, 'transition', '.page-transition .wd-button')
    await page.locator('.page-transition .wd-button').getByText(name, { exact: true }).click()
    const block = page.locator('.page-transition__block:visible')
    await expect(block).toHaveCount(1)
    await expect(block).toBeVisible()
    await expect(block).toHaveCount(0)
  })
}
