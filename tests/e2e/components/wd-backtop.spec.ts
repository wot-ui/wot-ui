import { test, expect } from '../fixtures/test'
import { openDemo, t } from '../helpers/demo'

test.use({ hasTouch: false, isMobile: false })
test('滚动超过阈值后显示，点击回到顶部并隐藏', async ({ page }) => {
  await openDemo(page, 'backtop', '.page-backtop')
  await expect(page.locator('.wd-backtop')).not.toBeVisible()
  await page.mouse.wheel(0, 900)
  await expect(page.locator('.wd-backtop')).toBeVisible()
  await page.locator('.wd-backtop').click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await expect(page.locator('.wd-backtop')).not.toBeVisible()
})

test('自定义 TOP 文案随配置显示', async ({ page }) => {
  await openDemo(page, 'backtop', '.page-backtop')
  await page.locator('.wd-checkbox').getByText(t('xian-shi-wen-zi'), { exact: true }).click()
  await page.mouse.wheel(0, 900)
  await expect(page.locator('.wd-backtop')).toHaveText(/TOP/)
})
