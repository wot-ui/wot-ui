import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'toast', '.page-toast__button-group .wd-button')
})

test('普通提示展示消息并自动消失', async ({ page }) => {
  await demoItem(page, t('jiBenYongFa')).locator('.wd-button').getByText('toast', { exact: true }).click()
  await expect(page.locator('.wd-toast:visible')).toContainText(t('ti-shi-xin-xi'))
  await expect(page.locator('.wd-toast:visible')).toHaveCount(0)
})

for (const [trigger, message] of [
  ['cheng-gong-toast', 'cao-zuo-cheng-gong'],
  ['cuo-wu-toast', 'cuo-wu-ti-shi-cuo-wu-ti-shi'],
  ['jing-gao-toast', 'ti-shi-xin-xi'],
  ['chang-gui-toast', 'chang-gui-ti-shi-chang-gui-ti-shi']
] as const) {
  test(`${t(trigger)}显示消息及图标`, async ({ page }) => {
    await demoItem(page, t('lei-xing-toast')).locator('.wd-button').getByText(t(trigger), { exact: true }).click()
    const toast = page.locator('.wd-toast:visible')
    await expect(toast).toContainText(t(message))
    await expect(toast.locator('.wd-toast__icon')).toBeVisible()
  })
}

test('Loading 显示加载指示器，业务计时结束后主动关闭', async ({ page }) => {
  await demoItem(page, t('loading')).locator('.wd-button').filter({ hasText: 'circular' }).click()
  const toast = page.locator('.wd-toast:visible')
  await expect(toast.locator('.wd-loading')).toBeVisible()
  await expect(toast).toContainText(t('3s-hou-zi-dong-guan-bi'))
  await expect(toast).toHaveCount(0)
})
