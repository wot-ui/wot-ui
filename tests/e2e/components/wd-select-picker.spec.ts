import { test, expect } from '../fixtures/test'
import { demoItem, fillUniField, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'selectPicker', '.page-select-picker .wd-cell')
})

test('多选取消不提交，再打开确认后回显所选项', async ({ page }) => {
  const item = demoItem(page, t('xuan-ze-di-zhi'))
  const cell = item.locator('.wd-cell')
  await cell.click()
  const popup = page.locator('.wd-select-picker__popup:visible')
  await popup.locator('.wd-checkbox').getByText(t('nv-zhuang'), { exact: true }).click()
  await popup.locator('.wd-action-sheet__close').click()
  await expect(popup).toHaveCount(0)
  await expect(cell.locator('.wd-cell__value')).toHaveText(t('nan-zhuang'))
  await cell.click()
  await expect(popup.locator('.wd-checkbox.is-checked')).toHaveCount(1)
  await popup.locator('.wd-checkbox').getByText(t('nv-zhuang'), { exact: true }).click()
  await popup.locator('.wd-select-picker__footer .wd-button').click()
  await expect(popup).toHaveCount(0)
  await expect(cell.locator('.wd-cell__value')).toHaveText(`${t('nan-zhuang')}, ${t('nv-zhuang')}`)
})

test('禁选项无法选中，其他选项正常确认', async ({ page }) => {
  const item = demoItem(page, t('jin-yong-xuan-xiang'))
  await item.locator('.wd-cell').click()
  const popup = page.locator('.wd-select-picker__popup:visible')
  await popup.locator('.wd-checkbox.is-disabled').click()
  await expect(popup.locator('.wd-checkbox.is-checked')).toHaveCount(0)
  await popup.locator('.wd-checkbox').getByText(t('she-chi-pin'), { exact: true }).click()
  await popup.locator('.wd-select-picker__footer .wd-button').click()
  await expect(item.locator('.wd-cell__value')).toHaveText(t('she-chi-pin'))
})

test('搜索筛选并高亮匹配文本，清空恢复列表与原有勾选', async ({ page }) => {
  await demoItem(page, t('ke-sou-suo')).locator('.wd-cell').click()
  const popup = page.locator('.wd-select-picker__popup:visible')
  await fillUniField(page, popup.locator('input'), '女装')
  await expect(popup.locator('.wd-checkbox')).toHaveCount(1)
  await expect(popup.locator('.wd-select-picker__text-active')).toHaveText('女装')
  await fillUniField(page, popup.locator('input'), '')
  await expect(popup.locator('.wd-checkbox')).toHaveCount(12)
  await expect(popup.locator('.wd-checkbox.is-checked')).toHaveText(t('she-chi-pin'))
})

test('before-confirm 拒绝后保持打开，清空选择后可关闭', async ({ page }) => {
  await demoItem(page, 'before-confirm').locator('.wd-cell').click()
  const popup = page.locator('.wd-select-picker__popup:visible')
  const option = popup.locator('.wd-checkbox').first()
  await option.click()
  await popup.locator('.wd-button').click()
  await expect(page.locator('.wd-toast:visible').first()).toContainText(t('zan-shi-wu-fa-xuan-ze-shang-pin'))
  await expect(popup).toBeVisible()
  await option.click()
  await popup.locator('.wd-button').click()
  await expect(popup).toHaveCount(0)
})

test('单选自动完成，无需确认按钮', async ({ page }) => {
  const item = demoItem(page, t('zi-dong-wan-cheng'))
  await item.locator('.wd-cell').click()
  const popup = page.locator('.wd-select-picker__popup:visible')
  await expect(popup.locator('.wd-select-picker__footer')).toHaveCount(0)
  await popup.locator('.wd-radio').getByText(t('nv-zhuang'), { exact: true }).click()
  await expect(popup).toHaveCount(0)
  await expect(item.locator('.wd-cell__value')).toHaveText(t('nv-zhuang'))
})
