import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'collapse', '.wd-collapse')
})

test('普通面板独立展开收起，禁用项保持关闭', async ({ page }) => {
  const items = demoItem(page, t('ji-chu-yong-fa')).locator('.wd-collapse-item')
  await items.nth(3).locator('.wd-collapse-item__header').click()
  await expect(items.nth(3).locator('.wd-collapse-item__wrapper')).toBeVisible()
  await expect(items.first().locator('.wd-collapse-item__header')).toHaveClass(/is-expanded/)
  await items.nth(1).locator('.wd-collapse-item__header').click()
  await expect(items.nth(1).locator('.wd-collapse-item__header')).not.toHaveClass(/is-expanded/)
  await items.nth(3).locator('.wd-collapse-item__header').click()
  await expect(items.nth(3).locator('.wd-collapse-item__wrapper')).toHaveCSS('height', '0px')
})

test('手风琴只展开一个面板，再次点击全部收起', async ({ page }) => {
  const item = demoItem(page, t('shou-feng-qin'))
  await item.locator('.wd-collapse-item__header').nth(1).click()
  await expect(item.locator('.wd-collapse-item__header.is-expanded')).toHaveCount(1)
  await expect(item.locator('.wd-collapse-item__header').nth(1)).toHaveClass(/is-expanded/)
  await item.locator('.wd-collapse-item__header').nth(1).click()
  await expect(item.locator('.wd-collapse-item__header.is-expanded')).toHaveCount(0)
})

test('全部展开可跳过禁用项，全部收起恢复', async ({ page }) => {
  const item = demoItem(page, t('ji-chu-yong-fa'))
  await page.getByText(t('quan-bu-xuan-zhong-tiao-guo-jin-yong'), { exact: true }).click()
  await expect(item.locator('.wd-collapse-item__header.is-expanded')).toHaveCount(4)
  await page.getByText(t('quan-bu-shou-qi'), { exact: true }).click()
  await expect(item.locator('.wd-collapse-item__header.is-expanded')).toHaveCount(0)
})
