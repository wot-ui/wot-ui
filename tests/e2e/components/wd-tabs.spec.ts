import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'tabs', '.wd-tabs')
})

test('标签与面板同步切换，面板内按钮可驱动下一页', async ({ page }) => {
  const item = demoItem(page, t('jiBenYongFa'))
  await item.locator('.wd-tabs__nav-item').nth(2).click()
  await expect(item.locator('.wd-tabs__nav-item.is-active')).toHaveText(t('biao-qian-item') + '3')
  await expect(item.locator('.wd-tab:visible')).toContainText(t('nei-rong') + '3')
  await item.locator('.wd-tab:visible .wd-button').click()
  await expect(item.locator('.wd-tab:visible')).toContainText(t('nei-rong') + '4')
})

test('禁用标签保持原面板，可用标签正常切换', async ({ page }) => {
  const item = demoItem(page, t('jin-yong-tab'))
  await item.locator('.wd-tabs__nav-item').first().click()
  await expect(item.locator('.wd-tabs__nav-item.is-active')).toHaveText(t('biao-qian-item') + '2')
  await item.locator('.wd-tabs__nav-item').nth(3).click()
  await expect(item.locator('.wd-tab:visible')).toContainText(t('nei-rong') + '4')
})

test('name 匹配更新对应内容', async ({ page }) => {
  const item = demoItem(page, t('name-pi-pei'))
  await item.locator('.wd-tabs__nav-item').getByText('example', { exact: true }).click()
  await expect(item.locator('.wd-tab:visible')).toHaveText(t('nei-rong') + 'example')
})

test('导航地图选择最后一项并收起', async ({ page }) => {
  const item = demoItem(page, t('shu-liang-da-yu-10-shi-chu-xian-dao-hang-di-tu'))
  await item.locator('.wd-tabs__map-btn').click()
  await item.locator('.wd-tabs__map-nav-item').last().click()
  await expect(item.locator('.wd-tabs__map-body')).not.toBeVisible()
  await expect(item.locator('.wd-tab:visible')).toContainText(t('nei-rong') + '11')
})
