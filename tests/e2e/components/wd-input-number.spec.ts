import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'inputNumber', '.page-input-number input')
})

test('加减改变数值，最小值处不能继续减少', async ({ page }) => {
  const control = demoItem(page, t('ji-ben-shi-yong')).locator('.wd-input-number').first()
  await expect(control.locator('input')).toHaveValue('1')
  await control.locator('.wd-input-number__sub').click()
  await expect(control.locator('input')).toHaveValue('1')
  await control.locator('.wd-input-number__add').click()
  await expect(control.locator('input')).toHaveValue('2')
  await control.locator('.wd-input-number__sub').click()
  await expect(control.locator('input')).toHaveValue('1')
})

test('步长二每次增减二', async ({ page }) => {
  const item = demoItem(page, t('she-zhi-bu-chang'))
  await item.locator('.wd-input-number__add').click()
  await expect(item.locator('input')).toHaveValue('3')
  await item.locator('.wd-input-number__sub').click()
  await expect(item.locator('input')).toHaveValue('1')
})

test('禁用组件不可输入或加减，禁用输入仍能点击加号', async ({ page }) => {
  const disabled = demoItem(page, t('jinYong')).locator('.wd-input-number').first()
  // uni-app 在 iOS WebKit 上将 disabled 映射为 readonly，用户行为均应为不可编辑。
  await expect(disabled.locator('input')).not.toBeEditable()
  await disabled.locator('.wd-input-number__add').click()
  await disabled.locator('.wd-input-number__sub').click()
  await expect(disabled.locator('input')).toHaveValue('2')
  const inputDisabled = demoItem(page, t('jin-yong-shu-ru-kuang'))
  await expect(inputDisabled.locator('input')).not.toBeEditable()
  await inputDisabled.locator('.wd-input-number__add').click()
  await expect(inputDisabled.locator('input')).toHaveValue('2')
})

test('清空非空数值后失焦恢复最小值，允许空值时保留空值', async ({ page }) => {
  const required = demoItem(page, t('fei-yun-xu-kong-zhi-dan-ke-lin-shi-shan-chu'))
  await required.locator('input').fill('')
  await required.locator('.demo-group-item__title').click()
  await expect(required.locator('input')).toHaveValue('1')
  const optional = demoItem(page, t('yun-xu-kong-zhi-bing-she-zhi-placeholder'))
  await optional.locator('input').fill('5')
  await optional.locator('input').fill('')
  await optional.locator('.demo-group-item__title').click()
  await expect(optional.locator('input')).toHaveValue('')
})

test('异步 beforeChange 完成后更新数值并关闭 loading', async ({ page }) => {
  const item = demoItem(page, t('yi-bu-bian-geng'))
  await item.locator('.wd-input-number__add').click()
  await expect(page.locator('.wd-toast:visible')).toContainText('2')
  await expect(item.locator('input')).toHaveValue('1')
  await expect(item.locator('input')).toHaveValue('2')
  await expect(page.locator('.wd-toast:visible')).toHaveCount(0)
})
