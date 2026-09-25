import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'switch', '.page-switch .wd-switch')
})

test('基础开关往返切换', async ({ page }) => {
  const control = demoItem(page, t('jiBenYongFa')).locator('.wd-switch')
  await expect(control).toHaveClass(/is-active/)
  await control.click()
  await expect(control).toHaveClass(/is-inactive/)
  await control.click()
  await expect(control).toHaveClass(/is-active/)
})

test('自定义开关值同步到页面文案', async ({ page }) => {
  const item = demoItem(page, t('xiu-gai-zhi-activevalue-inactivevalue'))
  await expect(item.locator('.page-switch__value')).toHaveText('上班')
  await item.locator('.wd-switch').click()
  await expect(item.locator('.page-switch__value')).toHaveText('下班')
  await item.locator('.wd-switch').click()
  await expect(item.locator('.page-switch__value')).toHaveText('上班')
})

for (const title of ['jin-yong-zhuang-tai', 'jia-zai-zhuang-tai'] as const) {
  test(`${t(title)}的开关保持原值`, async ({ page }) => {
    const switches = demoItem(page, t(title)).locator('.wd-switch')
    for (const [index, state] of ['is-active', 'is-inactive'].entries()) {
      await switches.nth(index).click()
      await expect(switches.nth(index)).toHaveClass(new RegExp(state))
    }
  })
}

test('beforeChange 取消保持关闭，确认后开启', async ({ page }) => {
  const control = demoItem(page, t('beforechange-xiu-gai-qian-gou-zi-han-shu')).locator('.wd-switch')
  await control.click()
  const dialog = page.locator('.wd-dialog:visible')
  await expect(dialog).toContainText(t('shi-fou-qie-huan-kai-guan'))
  await expect(control).toHaveClass(/is-inactive/)
  await dialog.locator('.wd-button').getByText('取消', { exact: true }).click()
  await expect(dialog).toHaveCount(0)
  await expect(control).toHaveClass(/is-inactive/)
  await control.click()
  await dialog.locator('.wd-button').getByText('确定', { exact: true }).click()
  await expect(dialog).toHaveCount(0)
  await expect(control).toHaveClass(/is-active/)
})
