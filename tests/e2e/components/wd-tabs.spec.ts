import type { Locator } from '@playwright/test'
import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

const numericTitle = `${t('name-pi-pei')} (${t('shu-zi-lei-xing')})`

async function expectNumericTab(item: Locator, name: number) {
  await expect(item.locator('.wd-tabs__nav-item.is-active')).toHaveText(t('biao-qian-item') + name)
  await expect(item.locator('.wd-tab:visible')).toHaveText(t('nei-rong') + name)
}

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

test('数字名称点击保持高亮与面板一致，禁用的零值不可选中', async ({ page }) => {
  const item = demoItem(page, numericTitle)
  const nav = item.locator('.wd-tabs__nav-item')
  await expectNumericTab(item, -1)

  const disabledTab = nav.filter({ hasText: t('biao-qian-item') + '0' })
  await expect(disabledTab).toHaveClass(/is-disabled/)
  await disabledTab.click()
  await expectNumericTab(item, -1)

  for (const name of [1, 3, 2, -1]) {
    await nav.getByText(t('biao-qian-item') + name, { exact: true }).click()
    await expectNumericTab(item, name)
  }
})

test('数字名称地图忽略禁用项，选择后同步面板并收起', async ({ page }) => {
  const item = demoItem(page, numericTitle)
  await item.locator('.wd-tabs__map-btn').click()
  const map = item.locator('.wd-tabs__map-body')
  await expect(map).toBeVisible()

  await map.getByText(t('biao-qian-item') + '0', { exact: true }).click()
  await expect(map).toBeVisible()
  await expectNumericTab(item, -1)

  await map.getByText(t('biao-qian-item') + '2', { exact: true }).click()
  await expect(map).not.toBeVisible()
  await expectNumericTab(item, 2)
})

test('Chromium 连续触摸按相邻数字名称切换并保留禁用和边界行为', async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== 'chromium' || !isMobile, '连续触摸使用 Chromium CDP，仅在 Chromium 移动设备模拟中验证')
  await page.clock.install()
  const item = demoItem(page, numericTitle)
  const panel = item.locator('.wd-tabs__container')
  const cdp = await page.context().newCDPSession(page)

  async function swipe(distance: number) {
    await panel.scrollIntoViewIfNeeded()
    const box = await panel.boundingBox()
    expect(box).not.toBeNull()
    const start = { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [start] })
    for (let step = 1; step <= 12; step++) {
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: start.x + (distance * step) / 12, y: start.y }]
      })
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    // 推进 setActive 的 100ms 防抖，确保“不切换”断言覆盖延迟执行。
    await page.clock.runFor(150)
  }

  try {
    await expectNumericTab(item, -1)
    await swipe(-120)
    await expectNumericTab(item, -1)

    await item
      .locator('.wd-tabs__nav-item')
      .getByText(t('biao-qian-item') + '1', { exact: true })
      .tap()
    await page.clock.runFor(150)
    await expectNumericTab(item, 1)

    for (const [distance, name] of [
      [-120, 3],
      [-120, 2],
      [-120, 2],
      [120, 3],
      [120, 1],
      [120, 1]
    ]) {
      await swipe(distance)
      await expectNumericTab(item, name)
    }
  } finally {
    await cdp.detach()
  }
})
