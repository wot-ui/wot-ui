import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'pagination', '.wd-pagination')
})

test('首页上一页禁用，下一页和返回更新页码', async ({ page }) => {
  const item = demoItem(page, t('jiBenYongFa'))
  await expect(item.locator('.wd-pagination__total')).toHaveText('19')
  await expect(item.locator('.wd-button').first()).toHaveClass(/is-disabled/)
  await item.locator('.wd-button').last().click()
  await expect(item.locator('.wd-pagination__current')).toHaveText('2')
  await item.locator('.wd-button').first().click()
  await expect(item.locator('.wd-pagination__current')).toHaveText('1')
})

test('不足整页向上取整，末页下一页禁用', async ({ page }) => {
  const item = demoItem(page, t('icon-tu-biao-0'))
  await expect(item.locator('.wd-pagination__total')).toHaveText('2')
  await item.locator('.wd-button').last().click()
  await expect(item.locator('.wd-pagination__current')).toHaveText('2')
  await expect(item.locator('.wd-button').last()).toHaveClass(/is-disabled/)
})

test('自定义每页数量及总数提示一致', async ({ page }) => {
  const item = demoItem(page, t('wen-zi-ti-shi'))
  await expect(item.locator('.wd-pagination__total')).toHaveText('8')
  await item.locator('.wd-button').last().click()
  await expect(item.locator('.wd-pagination__message')).toContainText('2')
  await expect(item.locator('.wd-pagination__message')).toContainText('160')
  await expect(item.locator('.wd-pagination__message')).toContainText('20')
})
