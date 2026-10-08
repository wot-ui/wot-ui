import { test, expect } from '../fixtures/test'
import { demoItem, fillUniField, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'input', '.page-input input')
})

test('输入文字并失焦后保留值', async ({ page }) => {
  const input = demoItem(page, t('ji-ben-shi-yong')).locator('input')
  await fillUniField(page, input, 'Wot UI 输入测试')
  await input.press('Tab')
  await expect(input).toHaveValue('Wot UI 输入测试')
})

test('禁用和只读输入框不可编辑', async ({ page }) => {
  for (const key of ['jin-yong-zhuang-tai', 'zhi-du-zhuang-tai'] as const) {
    const input = demoItem(page, t(key)).locator('input')
    await expect(input).not.toBeEditable()
    await expect(input).not.toHaveValue('')
  }
})

test('清空按钮清除已输入的内容', async ({ page }) => {
  const item = demoItem(page, t('qing-kong-an-niu'))
  await fillUniField(page, item.locator('input'), '待清空内容')
  await item.locator('.wd-input__clear').click()
  await expect(item.locator('input')).toHaveValue('')
  await expect(item.locator('.wd-input__clear')).toBeHidden()
})

test('密码显隐切换保留原值', async ({ page }) => {
  const item = demoItem(page, t('mi-ma-kuang'))
  const input = item.locator('input')
  await expect(input).toHaveAttribute('type', 'password')
  await item.locator('.wd-input__icon').click()
  await expect(input).toHaveAttribute('type', 'text')
  await expect(input).toHaveValue('password')
  await item.locator('.wd-input__icon').click()
  await expect(input).toHaveAttribute('type', 'password')
})

test('输入超过字数上限时截断并更新计数', async ({ page }) => {
  const item = demoItem(page, t('zi-shu-xian-zhi-0'))
  await fillUniField(page, item.locator('input'), '1234567890123456789012345')
  await expect(item.locator('input')).toHaveValue('12345678901234567890')
  await expect(item.locator('.wd-input__count')).toHaveText('20/20')
})
