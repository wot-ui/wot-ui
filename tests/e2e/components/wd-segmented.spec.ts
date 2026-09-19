import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'segmented', '.wd-segmented')
})

test('基础分段往返切换', async ({ page }) => {
  const item = demoItem(page, t('ji-chu-yong-fa-0'))
  for (const key of ['dian-zan', 'pingLun'] as const) {
    await item.locator('.wd-segmented__item').getByText(t(key), { exact: true }).click()
    await expect(item.locator('.wd-segmented__item.is-active')).toHaveText(t(key))
  }
})

test('整组禁用和单项禁用均保持原值', async ({ page }) => {
  const disabled = demoItem(page, t('jin-yong-fen-duan-qi'))
  await disabled.locator('.wd-segmented__item').last().click()
  await expect(disabled.locator('.wd-segmented__item.is-active')).toHaveText(t('pingLun'))
  const custom = demoItem(page, t('zi-ding-yi-xuan-ran-fen-duan-qi-biao-qian'))
  await custom.locator('.wd-segmented__item').first().click()
  await expect(custom.locator('.wd-segmented__item.is-active')).toHaveText(t('han-mei-mei'))
})

test('带振动的分段器切换后不应产生未处理拒绝', async ({ page }) => {
  const custom = demoItem(page, t('zi-ding-yi-xuan-ran-fen-duan-qi-biao-qian'))
  await custom.locator('.wd-segmented__item').last().click()
  await expect(custom.locator('.wd-segmented__item.is-active')).toHaveText(t('tom'))
})
