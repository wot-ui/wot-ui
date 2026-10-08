import { test, expect } from '../fixtures/test'
import { openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'cascader', '.page-cascader .wd-cell')
})

test('逐级选择北京东城区并回显完整路径', async ({ page }) => {
  const cell = page.locator('.page-cascader .wd-cell').filter({ hasText: t('ji-chu-yong-fa') })
  await cell.click()
  const popup = page.locator('.wd-cascader__popup:visible')
  for (const [index, name] of ['北京市', '北京市', '东城区'].entries()) {
    await popup.locator('.wd-tab').nth(index).locator('.wd-cascader__list-item').getByText(name, { exact: true }).click()
  }
  await expect(popup).toHaveCount(0)
  await expect(cell.locator('.wd-cell__value')).toHaveText('北京市/北京市/东城区')
  await cell.click()
  await expect(popup.locator('.wd-tab').nth(2).locator('.wd-cascader__list-item--selected')).toHaveText('东城区')
})

test('禁用省份点击后保持第一级选择', async ({ page }) => {
  await page.locator('.page-cascader .wd-cell').getByText(t('jin-yong-xuan-xiang'), { exact: true }).click()
  const popup = page.locator('.wd-cascader__popup:visible')
  await popup.locator('.wd-cascader__list-item--disabled').first().click()
  await expect(popup.locator('.wd-tab')).toHaveCount(1)
  await expect(popup.locator('.wd-cascader__list-item--selected')).toHaveCount(0)
})

test('任意级可选允许只确认省份', async ({ page }) => {
  const cell = page.locator('.page-cascader .wd-cell').filter({ hasText: t('ren-yi-ji-ke-xuan') })
  await cell.click()
  const popup = page.locator('.wd-cascader__popup:visible')
  await popup.locator('.wd-tab:visible .wd-cascader__list-item').getByText('北京市', { exact: true }).click()
  await popup.locator('.wd-cascader__action-confirm').click()
  await expect(popup).toHaveCount(0)
  await expect(cell.locator('.wd-cell__value')).toHaveText('北京市')
})
