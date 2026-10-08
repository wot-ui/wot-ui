import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('加载结束替换为真实插槽，重新加载恢复骨架', async ({ page }) => {
  await openDemo(page, 'skeleton', '.wd-skeleton')
  const item = demoItem(page, t('cha-cao-nei-rong'))
  await expect(item.locator('.wd-grid')).toHaveCount(0)
  await item.locator('.wd-switch').click()
  await expect(item.locator('.wd-grid-item')).toHaveCount(5)
  await expect(item.locator('.wd-skeleton__content')).toHaveCount(0)
  await item.locator('.wd-switch').click()
  await expect(item.locator('.wd-grid')).toHaveCount(0)
  await expect(item.locator('.wd-skeleton__content')).toBeVisible()
})
