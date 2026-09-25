import { test, expect } from '../fixtures/test'
import { openDemo, t, formItem, fillUniField } from '../helpers/demo'
import en from '../../../src/locale/en-US.json'

test('Provider 配置穿透 RootPortal，关闭重开保留配置', async ({ page }) => {
  await openDemo(page, 'configProvider', '.page-config-provider__preview-items')
  const control = page.locator('.wd-cell').filter({ has: page.locator('.wd-cell__title').getByText('Button.size', { exact: true }) })
  await control.locator('.wd-radio').getByText('large', { exact: true }).click()
  const preview = page.locator('.page-config-provider__preview-items .wd-button').first()
  const expectedHeight = (await preview.boundingBox())!.height
  for (let i = 0; i < 2; i++) {
    await page.locator('.wd-button').getByText(t('da-kai-popup'), { exact: true }).click()
    const popup = page.locator('.page-config-provider__popup-content:visible')
    await expect(popup).toBeVisible()
    await expect
      .poll(async () => (await popup.locator('.wd-button').getByText('button', { exact: true }).locator('..').boundingBox())!.height)
      .toBe(expectedHeight)
    await popup.locator('.wd-button').getByText(t('guan-bi'), { exact: true }).click()
    await expect(popup).toBeHidden()
    await expect(page.locator('.wd-overlay:visible')).toHaveCount(0)
  }
})

test('暗色主题下选择器确认回填表单，取消再次编辑保留值', async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'configProvider', '.wd-form')
  await page.locator('.wd-cell__title').getByText(t('tiao-zheng-zhu-ti'), { exact: true }).click()
  await page.locator('.wd-action-sheet__action').getByText('Dark', { exact: true }).click()
  await expect(page.locator('.page-wraper').locator('..')).toHaveAttribute('data-theme', 'dark')
  const name = formItem(page, t('you-hui-quan-ming-cheng'))
  await fillUniField(page, name.locator('input'), 'H5 自动化优惠券')
  const platform = formItem(page, t('tui-guang-ping-tai'))
  await platform.click()
  const popup = page.locator('.wd-select-picker__popup:visible')
  const option = popup.locator('.wd-checkbox').first()
  const label = (await option.textContent())!.trim()
  await option.click()
  await popup.locator('.wd-select-picker__footer .wd-button').click()
  await expect(platform.locator('.wd-cell__value')).toContainText(label)
  await platform.click()
  await expect(popup.locator('.wd-checkbox.is-checked')).toContainText(label)
  await popup.locator('.wd-action-sheet__close').click()
  await expect(platform.locator('.wd-cell__value')).toContainText(label)
  await expect(name.locator('input')).toHaveValue('H5 自动化优惠券')
})

test('切换英文后刷新保留语言，再切回中文', async ({ page }) => {
  await page.goto('/#/pages/about/Index')
  await page.locator('.wd-cell__title').getByText(t('yuYanQieHuan'), { exact: true }).click()
  await page.locator('.wd-action-sheet__action').getByText('English 🇺🇸', { exact: true }).click()
  await expect(page.locator('.page-about__title')).toHaveText(en.guanYuWoMen)
  await page.reload()
  await expect(page.locator('.page-about__title')).toHaveText(en.guanYuWoMen)
  await page.locator('.wd-cell__title').getByText(en.yuYanQieHuan, { exact: true }).click()
  await page.locator('.wd-action-sheet__action').getByText('中文 🇨🇳', { exact: true }).click()
  await expect(page.locator('.page-about__title')).toHaveText(t('guanYuWoMen'))
})
