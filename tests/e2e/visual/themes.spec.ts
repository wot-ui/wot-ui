import { test, expect } from '../fixtures/test'
import { openDemo, t } from '../helpers/demo'

for (const theme of ['Default', 'Dark']) {
  test(`按钮尺寸控件在 ${theme} 主题下的布局`, async ({ page }) => {
    await openDemo(page, 'configProvider', '.page-config-provider__preview-items')
    if (theme === 'Dark') {
      await page.locator('.wd-cell__title').getByText(t('tiao-zheng-zhu-ti'), { exact: true }).click()
      await page.locator('.wd-action-sheet__action').getByText('Dark', { exact: true }).click()
      await expect(page.locator('.wd-overlay:visible')).toHaveCount(0)
      await expect(page.locator('.page-wraper').locator('..')).toHaveAttribute('data-theme', 'dark')
    }
    const preview = page
      .locator('.wd-cell-group')
      .filter({ has: page.locator('.wd-cell-group__title').getByText(t('kong-zhi-mian-ban'), { exact: true }) })
      .locator('.wd-cell')
      .filter({ has: page.locator('.wd-cell__title').getByText('Button.size', { exact: true }) })
    await preview.scrollIntoViewIfNeeded()
    await page.evaluate(() => document.fonts.ready)
    await expect(preview).toHaveScreenshot(`config-controls-${theme.toLowerCase()}.png`, {
      animations: 'disabled',
      scale: 'css',
      maxDiffPixelRatio: 0.001
    })
  })
}
