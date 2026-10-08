import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.use({ hasTouch: true })
test.beforeEach(async ({ page }) => {
  await openDemo(page, 'passwordInput', '.page-password-input .wd-password-input')
})

test('密码以圆点显示，输入上限为六位且支持删除', async ({ page }) => {
  const item = demoItem(page, t('jiBenYongFa'))
  await item.locator('.wd-password-input__security').tap()
  const keyboard = page.locator('.wd-keyboard:visible')
  for (const key of '4567') await keyboard.locator('.wd-key').getByText(key, { exact: true }).tap()
  await expect(item.locator('.wd-password-input__mask:visible')).toHaveCount(6)
  await expect(item.locator('.wd-password-input__security')).not.toContainText('123456')
  await keyboard.locator('.wd-key--delete').tap()
  await expect(item.locator('.wd-password-input__mask:visible')).toHaveCount(5)
})

test('四位长度限制与明文输入分别生效', async ({ page }) => {
  const short = demoItem(page, t('zi-ding-yi-chang-du'))
  await short.locator('.wd-password-input__security').tap()
  for (const key of '345') await page.locator('.wd-keyboard:visible .wd-key').getByText(key, { exact: true }).tap()
  await expect(short.locator('.wd-password-input__item')).toHaveCount(4)
  await expect(short.locator('.wd-password-input__mask:visible')).toHaveCount(4)
  await page.locator('.wd-overlay:visible').click({ position: { x: 10, y: 80 } })
  const plain = demoItem(page, t('ming-wen-zhan-shi'))
  await plain.locator('.wd-password-input__security').tap()
  await page.locator('.wd-keyboard:visible .wd-key').getByText('4', { exact: true }).tap()
  await expect(plain.locator('.wd-password-input__security')).toHaveText('1234')
})

test('错误密码显示提示，删除并修正后清除错误', async ({ page }) => {
  const item = demoItem(page, t('ti-shi-xin-xi'))
  await item.locator('.wd-password-input__security').tap()
  const keyboard = page.locator('.wd-keyboard:visible')
  for (const key of '450') await keyboard.locator('.wd-key').getByText(key, { exact: true }).tap()
  await expect(item.locator('.wd-password-input__info')).toHaveText(t('mi-ma-cuo-wu'))
  await keyboard.locator('.wd-key--delete').tap()
  await keyboard.locator('.wd-key').getByText('6', { exact: true }).tap()
  await expect(item.locator('.wd-password-input__info')).not.toHaveClass(/is-error/)
  await expect(item.locator('.wd-password-input__info')).toHaveText('密码为 6 位数字')
})
