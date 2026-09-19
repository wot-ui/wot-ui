import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t, fillUniField } from '../helpers/demo'

test('关闭标签只移除目标项', async ({ page }) => {
  await openDemo(page, 'tag', '.wd-tag')
  const item = demoItem(page, t('ke-guan-bi'))
  const count = await item.locator('.wd-tag').count()
  const firstText = await item.locator('.wd-tag__text').first().textContent()
  await item.locator('.wd-tag__close').first().click()
  await expect(item.locator('.wd-tag')).toHaveCount(count - 1)
  await expect(item).not.toContainText(firstText!)
})

test('动态标签输入确认后新增，可再次删除', async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'tag', '.wd-tag')
  const item = demoItem(page, t('xin-zeng-biao-qian'))
  await item.locator('.wd-tag__add').first().click()
  await fillUniField(page, item.locator('input'), 'E2E标签')
  await item.locator('input').press('Enter')
  const tag = item.locator('.wd-tag').filter({ hasText: 'E2E标签' })
  await expect(tag).toHaveCount(1)
  await tag.locator('.wd-tag__close').click()
  await expect(tag).toHaveCount(0)
})
