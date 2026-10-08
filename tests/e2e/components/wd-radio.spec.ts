import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'radio', '.page-radio .wd-radio')
})

test('组内互斥选择，重复点击保持选中', async ({ page }) => {
  const group = demoItem(page, t('jiBenYongFa')).locator('.wd-radio-group')
  const options = group.locator('.wd-radio')
  await options.nth(1).click()
  await expect(options.nth(1)).toHaveClass(/is-checked/)
  await expect(options.first()).not.toHaveClass(/is-checked/)
  await expect(group.locator('.wd-radio.is-checked')).toHaveCount(1)
  await options.nth(1).click()
  await expect(options.nth(1)).toHaveClass(/is-checked/)
})

for (const title of ['jinYong', 'zhi-du-zhuang-tai'] as const) {
  test(`${t(title)}不能切换单选项`, async ({ page }) => {
    const options = demoItem(page, t(title)).locator('.wd-radio-group').first().locator('.wd-radio')
    await options.nth(1).click()
    await expect(options.nth(1)).not.toHaveClass(/is-checked/)
    await expect(options.first()).toHaveClass(/is-checked/)
  })
}

test('allow-uncheck 支持取消后重新选择', async ({ page }) => {
  const item = demoItem(page, t('yun-xu-qu-xiao-xuan-zhong'))
  const first = item.locator('.wd-radio').first()
  await expect(first).toHaveClass(/is-checked/)
  await first.click()
  await expect(item.locator('.wd-radio.is-checked')).toHaveCount(0)
  await first.click()
  await expect(first).toHaveClass(/is-checked/)
})

test('子项 disabled=false 覆盖组禁用，未覆盖的子项保持禁用', async ({ page }) => {
  const item = demoItem(page, t('radio-de-props-bi-radiogroup-de-you-xian-ji-gao'))
  const options = item.locator('.wd-radio')
  await options.nth(1).click()
  await expect(options.nth(1)).toHaveClass(/is-checked/)
  await options.nth(2).click()
  await expect(options.nth(2)).not.toHaveClass(/is-checked/)
  await expect(options.nth(1)).toHaveClass(/is-checked/)
})
