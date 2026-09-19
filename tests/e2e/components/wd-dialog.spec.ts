import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'dialog', '.page-dialog .wd-button')
})

test('Alert 展示消息，确认后关闭', async ({ page }) => {
  await demoItem(page, t('ji-chu-yong-fa-0'))
    .locator('.wd-button')
    .filter({ hasText: t('alert-dan-chuang') })
    .click()
  const dialog = page.locator('.wd-dialog:visible')
  await expect(dialog).toContainText('这是一条消息提示')
  await expect(dialog.locator('.wd-dialog__actions .wd-button')).toHaveCount(1)
  await dialog.locator('.wd-button').filter({ hasText: '确定' }).click()
  await expect(dialog).toHaveCount(0)
})

for (const action of ['确定', '取消']) {
  test(`Confirm ${action}后显示对应结果`, async ({ page }) => {
    await demoItem(page, t('ji-chu-yong-fa-0'))
      .locator('.wd-button')
      .filter({ hasText: t('confirm-dan-chuang') })
      .click()
    const dialog = page.locator('.wd-dialog:visible')
    await expect(dialog).toContainText('确认执行此操作吗？')
    await dialog.locator('.wd-button').filter({ hasText: action }).click()
    await expect(page.locator('.wd-toast:visible')).toContainText(`点击了${action}`)
    await expect(dialog).toHaveCount(0)
  })
}

test('Prompt 校验失败保留输入，修正后确认返回新值', async ({ page }) => {
  await page
    .locator('.page-dialog .wd-button')
    .filter({ hasText: t('zheng-ze-xiao-yan') })
    .click()
  const dialog = page.locator('.wd-dialog:visible')
  await dialog.locator('input').fill('123')
  await dialog.locator('.wd-button').filter({ hasText: '确定' }).click()
  await expect(dialog.locator('.wd-dialog__input-error')).toHaveText('输入内容不能少于5个字符')
  await expect(dialog.locator('input')).toHaveValue('123')
  await dialog.locator('input').fill('12345')
  await dialog.locator('.wd-button').filter({ hasText: '确定' }).click()
  await expect(page.locator('.wd-toast:visible')).toContainText('输入内容：12345')
  await expect(dialog).toHaveCount(0)
})

test('确认前异步处理完成后才关闭弹窗', async ({ page }) => {
  await page.locator('.page-dialog .wd-button').getByText('确认前钩子', { exact: true }).click()
  const dialog = page.locator('.wd-dialog:visible')
  await dialog.locator('.wd-button').filter({ hasText: '确定' }).click()
  await expect(page.locator('.wd-toast:visible')).toContainText('删除中...')
  await expect(dialog).toBeVisible()
  await expect(page.locator('.wd-toast:visible')).toContainText('删除成功')
  await expect(dialog).toHaveCount(0)
})

test('禁用确认按钮不能关闭弹窗', async ({ page }) => {
  await page.locator('.page-dialog .wd-button').getByText('禁用按钮', { exact: true }).click()
  const dialog = page.locator('.wd-dialog:visible')
  await dialog.locator('.wd-button').filter({ hasText: '确定' }).click()
  await expect(dialog).toContainText('该操作暂时不可用')
})

test('禁用按钮示例取消时不应产生未处理拒绝', async ({ page }) => {
  await page.locator('.page-dialog .wd-button').getByText('禁用按钮', { exact: true }).click()
  const dialog = page.locator('.wd-dialog:visible')
  await dialog.locator('.wd-button').filter({ hasText: '取消' }).click()
  await expect(dialog).toHaveCount(0)
  await page.locator('.page-dialog .wd-button').getByText('禁用按钮', { exact: true }).click()
  await expect(dialog).toContainText('该操作暂时不可用')
  await dialog.locator('.wd-button').filter({ hasText: '取消' }).click()
  await expect(dialog).toHaveCount(0)
})

test('纵向按钮示例取消后正常关闭', async ({ page }) => {
  await page.locator('.page-dialog .wd-button').getByText('垂直排列按钮', { exact: true }).click()
  const dialog = page.locator('.wd-dialog:visible')
  await dialog.locator('.wd-button').getByText('稍后再说', { exact: true }).click()
  await expect(dialog).toHaveCount(0)
})

test('默认禁止遮罩关闭，关闭图标返回 close 原因', async ({ page }) => {
  await page.locator('.page-dialog .wd-button').getByText('显示关闭按钮', { exact: true }).click()
  const dialog = page.locator('.wd-dialog:visible')
  await expect(dialog).toBeVisible()
  await page.locator('.wd-overlay:visible').click({ position: { x: 10, y: 80 } })
  await expect(dialog).toContainText('系统公告')
  await dialog.locator('.wd-dialog__close').click()
  await expect(page.locator('.wd-toast:visible')).toContainText('关闭方式：close')
  await expect(dialog).toHaveCount(0)
})

test('自定义 Actions 点击后执行对应回调并关闭', async ({ page }) => {
  await page.locator('.page-dialog .wd-button').getByText('多个按钮（Actions）', { exact: true }).click()
  const dialog = page.locator('.wd-dialog:visible')
  await expect(dialog.locator('.wd-dialog__actions .wd-button')).toHaveCount(3)
  await dialog.locator('.wd-button').getByText('忽略此版本', { exact: true }).click()
  await expect(page.locator('.wd-toast:visible')).toContainText('已忽略')
  await expect(dialog).toHaveCount(0)
})
