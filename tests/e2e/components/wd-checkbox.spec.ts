import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'checkbox', '.page-checkbox .wd-checkbox')
})

test('组内可选多个选项，取消一项保留其他项', async ({ page }) => {
  const group = demoItem(page, t('jiBenYongFa')).locator('.wd-checkbox-group')
  const options = group.locator('.wd-checkbox')
  await expect(group.locator('.is-checked')).toHaveCount(1)
  await options.nth(1).click()
  await expect(group.locator('.is-checked')).toHaveCount(2)
  await options.first().click()
  await expect(options.first()).not.toHaveClass(/is-checked/)
  await expect(options.nth(1)).toHaveClass(/is-checked/)
})

test('独立复选框切换，半选点击后转为全选', async ({ page }) => {
  const standalone = demoItem(page, t('dan-du-shi-yong')).locator('.wd-checkbox')
  await standalone.click()
  await expect(standalone).toHaveClass(/is-checked/)
  await standalone.click()
  await expect(standalone).not.toHaveClass(/is-checked/)
  const partial = demoItem(page, t('ban-xuan-zhuang-tai')).locator('.wd-checkbox')
  await expect(partial).toHaveClass(/is-indeterminate/)
  await partial.click()
  await expect(partial).not.toHaveClass(/is-indeterminate/)
  await expect(partial).toHaveClass(/is-checked/)
})

for (const title of ['jin-yong-zhuang-tai', 'zhi-du-zhuang-tai'] as const) {
  test(`${t(title)}不改变组内选中项`, async ({ page }) => {
    const group = demoItem(page, t(title)).locator('.wd-checkbox-group').first()
    await group.locator('.wd-checkbox').nth(1).click()
    await expect(group.locator('.wd-checkbox').nth(1)).not.toHaveClass(/is-checked/)
    await group.locator('.wd-checkbox').first().click()
    await expect(group.locator('.wd-checkbox').first()).toHaveClass(/is-checked/)
  })
}

test('最少一项最多三项，达到边界后阻止继续修改', async ({ page }) => {
  const item = demoItem(page, t('she-zhi-zui-xiao-xuan-zhong-shu-liang-he-zui-da-xuan-zhong-shu-liang'))
  const options = item.locator('.wd-checkbox')
  await options.first().click()
  await options.nth(1).click()
  await expect(item.locator('.wd-checkbox.is-checked')).toHaveCount(1)
  await expect(options.nth(1)).toHaveClass(/is-checked/)
  await options.nth(2).click()
  await options.nth(3).click()
  await options.first().click()
  await expect(item.locator('.wd-checkbox.is-checked')).toHaveCount(3)
  await expect(options.first()).not.toHaveClass(/is-checked/)
})

test('toggleAll 跳过禁用项，可批量选中与反选', async ({ page }) => {
  const item = demoItem(page, t('quan-xuan-qie-huan'))
  await item.locator('.wd-button').getByText(t('quan-bu-xuan-zhong-tiao-guo-jin-yong'), { exact: true }).click()
  await expect(item.locator('.wd-checkbox.is-checked')).toHaveCount(3)
  await expect(item.locator('.wd-checkbox.is-disabled')).not.toHaveClass(/is-checked/)
  await item.locator('.wd-button').getByText(t('quan-bu-qie-huan-tiao-guo-jin-yong'), { exact: true }).click()
  await expect(item.locator('.wd-checkbox.is-checked')).toHaveCount(0)
})
