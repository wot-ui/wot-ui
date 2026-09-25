import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('切换侧边栏子项，禁用项不触发异步切换', async ({ page }) => {
  await openDemo(page, 'sidebar', '.wd-sidebar')
  const basic = demoItem(page, t('ji-chu-yong-fa-0')).locator('.wd-sidebar-item')
  await basic.nth(2).click()
  await expect(basic.nth(2)).toHaveClass(/wd-sidebar-item--active/)
  await expect(basic.first()).not.toHaveClass(/wd-sidebar-item--active/)
  const guarded = demoItem(page, t('hui-biao-yu-jin-yong')).locator('.wd-sidebar').last()
  await guarded.locator('.wd-sidebar-item').nth(1).click()
  await expect(guarded.locator('.wd-sidebar-item').first()).toHaveClass(/wd-sidebar-item--active/)
  await guarded.locator('.wd-sidebar-item').last().click()
  await expect(guarded.locator('.wd-sidebar-item').last()).toHaveClass(/wd-sidebar-item--active/)
})

for (const demo of ['demo1', 'demo2', 'demo3']) {
  test(`${demo}：分类选择后对应内容进入视口`, async ({ page }) => {
    await page.goto(`/#/subPages/sidebar/${demo}`)
    const items = page.locator('.wd-sidebar-item')
    await expect(items).toHaveCount(7)
    await items.nth(2).click()
    await expect(items.nth(2)).toHaveClass(/wd-sidebar-item--active/)
    await expect(page.locator('.wd-cell-group__title').getByText(t('biao-ti-san'), { exact: true })).toBeInViewport()
    if (demo === 'demo2') {
      await items.last().click()
      await expect(items.nth(2)).toHaveClass(/wd-sidebar-item--active/)
    }
    if (demo === 'demo3') await expect(items.nth(2).locator('.wd-icon-location')).toBeVisible()
    // 原生 scroll-view 动画未结束时，新滚动请求可能被合并；先等目标标题到达容器顶部。
    if (demo !== 'demo2') {
      await expect
        .poll(async () => {
          const container = await page.locator(`.page-sidebar-${demo}__content`).boundingBox()
          const category = await page.locator(`.page-sidebar-${demo}__category`).nth(2).boundingBox()
          return Math.abs(category!.y - container!.y)
        })
        .toBeLessThan(2)
    }
    await items.first().click()
    await expect(page.locator('.wd-cell-group__title').getByText(t('biao-ti-yi'), { exact: true })).toBeInViewport()
  })
}
