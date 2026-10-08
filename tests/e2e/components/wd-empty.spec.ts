import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('自定义图片实际加载，空态说明与底部操作可见', async ({ page }) => {
  await openDemo(page, 'empty', '.wd-empty')
  const custom = demoItem(page, t('zi-ding-yi-tu-pian'))
  await expect(custom.locator('.wd-empty')).toContainText('查看我的头像')
  await expect.poll(() => custom.locator('img').evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
  const footer = demoItem(page, t('di-bu-cha-cao'))
  await expect(footer.locator('.wd-empty')).toContainText('当前搜索无结果')
  await expect(footer.locator('.wd-button')).toHaveText(t('zhong-xin-jia-zai'))
  await expect(demoItem(page, t('sou-suo-wu-jie-guo')).locator('.wd-empty')).toContainText(t('dang-qian-sou-suo-wu-jie-guo'))
})
