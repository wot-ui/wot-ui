import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'tooltip', '.page-tooltip .wd-button')
})

test('切换目标时旧提示关闭，新提示出现在按钮下方', async ({ page }) => {
  const item = demoItem(page, t('jiBenYongFa'))
  await item.locator('.wd-button').getByText('bottom-start', { exact: true }).click()
  const previous = item.locator('.wd-transition .wd-tooltip__inner').getByText('bottom-start 提示文字', { exact: true })
  await expect(previous).toBeVisible()
  const target = item.locator('.wd-button').filter({ hasText: /^bottom$/ })
  await target.click()
  const content = item.locator('.wd-transition .wd-tooltip__inner').getByText('bottom 提示文字', { exact: true })
  await expect(content).toBeVisible()
  await expect(previous).toBeHidden()
  await expect
    .poll(async () => (await content.boundingBox())!.y - ((await target.boundingBox())!.y + (await target.boundingBox())!.height))
    .toBeGreaterThanOrEqual(0)
})

test('禁用提示不展示内容', async ({ page }) => {
  const item = demoItem(page, t('jinYong'))
  await item.locator('.wd-button').click()
  await expect(item.locator('.wd-transition')).toBeHidden()
})

test('关闭图标隐藏提示', async ({ page }) => {
  const item = demoItem(page, t('xian-shi-guan-bi-an-niu'))
  await item.locator('.wd-button').click()
  await expect(item.locator('.wd-transition')).toBeVisible()
  await item.locator('.wd-tooltip__close-icon').click()
  await expect(item.locator('.wd-transition')).toBeHidden()
})

test('外部按钮通过 v-model 控制提示显隐', async ({ page }) => {
  const item = demoItem(page, t('kong-zhi-xian-yin'))
  await item.locator('.page-tooltip__button-control').click()
  await expect(item.locator('.wd-transition')).toBeVisible()
  await expect(item.locator('.page-tooltip__button-control')).toHaveText('关闭')
  await item.locator('.page-tooltip__button-control').click()
  await expect(item.locator('.wd-transition')).toBeHidden()
  await expect(item.locator('.page-tooltip__button-control')).toHaveText('打开')
})
