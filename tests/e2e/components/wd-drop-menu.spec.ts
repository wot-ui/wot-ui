import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'dropMenu', '.wd-drop-menu')
})

test('选择选项后收起，菜单标题与重开勾选一致', async ({ page }) => {
  const item = demoItem(page, t('jiBenYongFa'))
  await item.locator('.wd-drop-menu__option').first().click()
  await page.locator('.wd-drop-item__option:visible').getByText(t('quan-bu-shang-pin'), { exact: true }).click()
  await expect(item.locator('.wd-drop-menu__option').first()).toHaveText(t('quan-bu-shang-pin'))
  await expect(page.locator('.wd-drop-item__option:visible')).toHaveCount(0)
  await item.locator('.wd-drop-menu__option').first().click()
  await expect(page.locator('.wd-drop-item__option.is-active:visible')).toHaveText(t('quan-bu-shang-pin'))
})

test('禁用菜单不展开，可用菜单可展开', async ({ page }) => {
  const item = demoItem(page, t('jinYong'))
  await item.locator('.wd-drop-menu__option').first().click()
  await expect(page.locator('.wd-drop-item__option:visible')).toHaveCount(0)
  await item.locator('.wd-drop-menu__option').last().click()
  await expect(page.locator('.wd-drop-item__option:visible')).toHaveCount(3)
})

test('异步打开取消保持关闭，确认才显示选项', async ({ page }) => {
  const item = demoItem(page, t('yi-bu-da-kai-guan-bi'))
  await item.locator('.wd-drop-menu__option').click()
  await page.locator('.wd-dialog__actions .wd-button').getByText('取消', { exact: true }).click()
  await expect(page.locator('.wd-drop-item__option:visible')).toHaveCount(0)
  await item.locator('.wd-drop-menu__option').click()
  await page.locator('.wd-dialog__actions .wd-button').getByText('确定', { exact: true }).click()
  await expect(page.locator('.wd-drop-item__option:visible')).toHaveCount(3)
})
