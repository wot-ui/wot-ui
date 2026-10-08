import { test, expect } from '../fixtures/test'
import { fillUniField, openDemo, t } from '../helpers/demo'

test('筛选图标、空结果和清空恢复全部列表', async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'icon', '.icon-page__item')
  const items = page.locator('.icon-page__item-name')
  const total = await items.count()
  expect(total).toBeGreaterThan(100)
  await page.locator('.wd-search__cover').click()
  await fillUniField(page, page.locator('.wd-search input'), 'arrow')
  await expect.poll(() => items.count()).toBeLessThan(total)
  expect((await items.allTextContents()).every((text) => text.includes('arrow'))).toBe(true)
  await fillUniField(page, page.locator('.wd-search input'), 'nonexistent-icon-e2e')
  await expect(items).toHaveCount(0)
  await expect(page.locator('.wd-empty')).toContainText(t('dang-qian-wu-xiang-guan-tu-biao'))
  await page.locator('.wd-search__clear-icon').click()
  await expect(items).toHaveCount(total)
})
