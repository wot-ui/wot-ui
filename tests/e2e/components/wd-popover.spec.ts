import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import en from '../../../src/locale/en-US.json'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'popover', '.page-popover .wd-button')
})

test('点击打开气泡，点击外部标题关闭', async ({ page }) => {
  const item = demoItem(page, t('jiBenYongFa'))
  await item.locator('.wd-button').click()
  const content = item.locator('.wd-transition .wd-popover__inner')
  await expect(content).toHaveText(t('zhe-shi-yi-duan-nei-rong'))
  await expect(content).toBeVisible()
  await item.locator('.demo-group-item__title').click()
  await expect(content).toBeHidden()
})

test('菜单选择显示对应回调文案', async ({ page }) => {
  const item = demoItem(page, t('lie-biao-zhan-shi'))
  await item.locator('.wd-button').click()
  await item
    .locator('.wd-transition .wd-popover__menu-inner')
    .filter({ hasText: t('quan-bu-biao-ji-yi-du') })
    .click()
  await expect(page.locator('.wd-toast:visible')).toContainText(t('xuan-ze-le') + t('quan-bu-biao-ji-yi-du'))
})

test('关闭按钮隐藏气泡', async ({ page }) => {
  const item = demoItem(page, t('xian-shi-guan-bi-an-niu'))
  await item.locator('.wd-button').click()
  await item.locator('.wd-popover__close-icon').click()
  await expect(item.locator('.wd-transition')).toBeHidden()
})

test('动态内容变宽后实际气泡宽度同步更新', async ({ page }) => {
  const item = demoItem(page, t('dong-tai-nei-rong-yu-wei-zhi-geng-xin'))
  await item.locator('.wd-popover__target .wd-button').click()
  const content = item.locator('.wd-transition .page-popover__content')
  await expect(content).toBeVisible()
  await expect(content).toHaveCSS('width', '150px')
  const before = (await content.boundingBox())!.width
  await content.locator('.wd-button').click()
  await expect(content).toHaveCSS('width', '250px')
  await expect.poll(async () => (await content.boundingBox())!.width - before).toBeCloseTo(100, 0)
  await content.locator('.wd-button').click()
  await expect(content).toHaveCSS('width', '150px')
  await expect.poll(async () => (await content.boundingBox())!.width).toBeCloseTo(before, 0)
})

test('动态宽度文案显示当前数值', async ({ page }) => {
  const item = demoItem(page, t('dong-tai-nei-rong-yu-wei-zhi-geng-xin'))
  await item.locator('.wd-popover__target .wd-button').click()
  const status = item.locator('.wd-transition .page-popover__status')
  await expect(status).toBeVisible()
  await expect(status).toContainText('150')
  await item.locator('.page-popover__content .wd-button').click()
  await expect(status).toContainText('250')
  await item.locator('.page-popover__content .wd-button').click()
  await expect(status).toContainText('150')
})

test('英文动态宽度文案与布局同步变化', async ({ page }) => {
  await page.goto('/#/pages/about/Index')
  await page.locator('.wd-cell__title').getByText(t('yuYanQieHuan'), { exact: true }).click()
  await page.locator('.wd-action-sheet__action').getByText('English 🇺🇸', { exact: true }).click()
  await openDemo(page, 'popover', '.page-popover .wd-button')
  const item = demoItem(page, en['dong-tai-nei-rong-yu-wei-zhi-geng-xin'])
  await item.locator('.wd-popover__target .wd-button').click()
  const content = item.locator('.page-popover__content')
  for (const [index, width] of [150, 250, 150].entries()) {
    await expect(content.locator('.page-popover__status')).toHaveText(`Current width: ${width}px`)
    await expect(content).toHaveCSS('width', `${width}px`)
    if (index < 2) {
      await content.locator('.wd-button').click()
    }
  }
})
