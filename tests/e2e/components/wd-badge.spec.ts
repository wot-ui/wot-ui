import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('徽标展示数量、最大值截断及自定义文本', async ({ page }) => {
  await openDemo(page, 'badge', '.wd-badge')
  await expect(demoItem(page, t('zhanShiXiaoXiShuLiang')).locator('.wd-badge__content')).toHaveText(['12', '3', '1', '2', '1', '2'])
  await expect(demoItem(page, t('keDingYiXiaoXiZuiDaZhi')).locator('.wd-badge__content')).toHaveText(['99+', '10+'])
  await expect(demoItem(page, t('ziDingYiNeiRong')).locator('.wd-badge__content')).toHaveText(['new', 'hot'])
})

test('零值默认隐藏，show-zero 显示 0', async ({ page }) => {
  await openDemo(page, 'badge', '.wd-badge')
  const items = demoItem(page, t('xianShi_0Zhi')).locator('.wd-badge')
  await expect(items.first().locator('.wd-badge__content')).toHaveText('0')
  await expect(items.nth(1).locator('.wd-badge__content')).toHaveCount(0)
})
