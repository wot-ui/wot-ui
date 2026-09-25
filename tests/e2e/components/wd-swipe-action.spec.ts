import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { dragBy, translateX } from '../helpers/gesture'

test.use({ hasTouch: false })
test.beforeEach(async ({ page }) => {
  await openDemo(page, 'swipeAction', '.wd-swipe-action')
})

test('左滑露出操作按钮，点击操作显示回调并关闭', async ({ page }) => {
  const item = demoItem(page, t('jiBenYongFa'))
  await dragBy(page, item.locator('.wd-cell'), -160, 0)
  await expect.poll(() => translateX(item.locator('.wd-swipe-action__wrapper'))).toBeLessThan(-100)
  await item.getByText(t('cao-zuo-1'), { exact: true }).click()
  await expect(page.locator('.wd-toast:visible')).toContainText('操作1')
  await expect.poll(() => translateX(item.locator('.wd-swipe-action__wrapper'))).toBe(0)
})

test('禁用时拖动保持关闭', async ({ page }) => {
  const item = demoItem(page, t('jin-yong-hua-dong-an-niu'))
  await dragBy(page, item.locator('.wd-cell'), -160, 0)
  await expect.poll(() => translateX(item.locator('.wd-swipe-action__wrapper'))).toBe(0)
})

test('控制按钮可打开左右操作区并关闭', async ({ page }) => {
  const item = demoItem(page, t('qie-huan-an-niu'))
  const wrapper = item.locator('.wd-swipe-action__wrapper')
  await item.getByText(t('da-kai-zuo-bian'), { exact: true }).click()
  await expect.poll(() => translateX(wrapper)).toBeGreaterThan(100)
  await item.getByText(t('guan-bi-suo-you'), { exact: true }).click()
  await expect.poll(() => translateX(wrapper)).toBe(0)
  await item.getByText(t('da-kai-you-bian'), { exact: true }).click()
  await expect.poll(() => translateX(wrapper)).toBeLessThan(-100)
})
