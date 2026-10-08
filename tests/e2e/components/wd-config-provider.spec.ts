import { test, expect } from '../fixtures/test'
import { openDemo } from '../helpers/demo'

test('全局按钮尺寸更新预览，unset 恢复默认', async ({ page }) => {
  await openDemo(page, 'configProvider', '.page-config-provider__preview-items')
  const control = page.locator('.wd-cell').filter({ has: page.locator('.wd-cell__title').getByText('Button.size', { exact: true }) })
  const button = page.locator('.page-config-provider__preview-items .wd-button').first()
  const initial = (await button.boundingBox())!.height
  await control.locator('.wd-radio').getByText('large', { exact: true }).click()
  await expect.poll(async () => (await button.boundingBox())!.height).toBeGreaterThan(initial)
  await expect(page.locator('.page-config-provider__config-preview')).toContainText('large')
  await control.locator('.wd-radio').getByText('unset', { exact: true }).click()
  await expect.poll(async () => (await button.boundingBox())!.height).toBe(initial)
})
