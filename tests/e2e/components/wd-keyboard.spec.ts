import { test, expect } from '../fixtures/test'
import { openDemo, t } from '../helpers/demo'

// 组件按键的公开交互是 touchstart/touchend，桌面项目也显式启用触摸模拟。
test.use({ hasTouch: true })
test.beforeEach(async ({ page }) => {
  await openDemo(page, 'keyboard', '.page-keyboard .wd-cell')
})

test('数字输入、长度限制、删除和关闭回显', async ({ page }) => {
  const cell = page.locator('.page-keyboard .wd-cell').filter({ hasText: t('shuang-xiang-bang-ding') })
  await cell.click()
  const keyboard = page.locator('.wd-keyboard:visible')
  for (const key of '1234567') await keyboard.locator('.wd-key').getByText(key, { exact: true }).tap()
  await expect(cell.locator('.wd-cell__value')).toHaveText('123456')
  await keyboard.locator('.wd-key--delete').tap()
  await expect(cell.locator('.wd-cell__value')).toHaveText('12345')
  await keyboard.locator('.wd-keyboard__close').click()
  await expect(keyboard).toHaveCount(0)
  await expect(cell.locator('.wd-cell__value')).toHaveText('12345')
})

test('随机数字键完整且每个数字仅出现一次', async ({ page }) => {
  await page.locator('.page-keyboard .wd-cell').getByText(t('sui-ji-shu-zi-jian-pan'), { exact: true }).click()
  const keyboard = page.locator('.wd-keyboard:visible')
  const digits = keyboard.locator('.wd-key').filter({ hasText: /^\d$/ })
  await expect(digits).toHaveCount(10)
  expect((await digits.allTextContents()).map((value) => value.trim()).sort()).toEqual('0123456789'.split(''))
  await digits.filter({ hasText: /^7$/ }).tap()
  await expect(page.locator('.wd-toast:visible').first()).toContainText('7')
})

test('车牌首位选择省份后自动切换英文键盘', async ({ page }) => {
  const cell = page.locator('.page-keyboard .wd-cell').filter({ hasText: t('che-pai-hao-jian-pan-fei-shou-kong') })
  await cell.click()
  const keyboard = page.locator('.wd-keyboard:visible')
  await keyboard.locator('.wd-key').getByText('京', { exact: true }).tap()
  await expect(cell.locator('.wd-cell__value')).toHaveText('京')
  await keyboard.locator('.wd-key').getByText('A', { exact: true }).tap()
  await expect(cell.locator('.wd-cell__value')).toHaveText('京A')
})
