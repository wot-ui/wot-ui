import { test, expect } from '../fixtures/test'
import { fillUniField, demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'search', '.page-search input')
  // 此页含延迟自动聚焦 Demo，先等其就绪，避免在 fill 选择文本后抢走键盘焦点。
  await expect(demoItem(page, t('zi-dong-ju-jiao')).locator('input')).toBeFocused()
})

test('回车搜索回传输入内容，取消触发回调', async ({ page }) => {
  const item = demoItem(page, t('ji-chu-yong-fa-0'))
  await item.locator('.wd-search__cover').click()
  await fillUniField(page, item.locator('input'), 'wot-ui')
  await item.locator('input').press('Enter')
  await expect(page.locator('uni-toast')).toContainText(t('sou-suo') + 'wot-ui')
  await item.locator('.wd-search__cancel').click()
  await expect(page.locator('uni-toast')).toContainText(t('qu-xiao'))
})

test('清空后恢复聚焦，可重新输入', async ({ page }) => {
  const item = demoItem(page, t('qing-kong-hou-zi-dong-ju-jiao'))
  await item.locator('.wd-search__cover').click()
  await fillUniField(page, item.locator('input'), '旧内容')
  await item.locator('.wd-search__clear-icon').click()
  await expect(item.locator('input')).toHaveValue('')
  await expect(item.locator('input')).toBeFocused()
  await fillUniField(page, item.locator('input'), '新内容')
  await expect(item.locator('input')).toHaveValue('新内容')
})

test('禁用搜索不可编辑且隐藏取消，长度限制为四字', async ({ page }) => {
  const disabled = demoItem(page, t('jin-yong-qie-yin-cang-qu-xiao-an-niu'))
  await disabled.locator('.wd-search__cover').click()
  await expect(disabled.locator('input')).toHaveCount(0)
  await expect(page.locator('uni-toast')).toContainText(t('jin-yong-dian-ji'))
  await expect(disabled.locator('.wd-search__cancel')).toHaveCount(0)
  const limited = demoItem(page, t('she-zhi-zui-da-chang-du')).locator('input')
  await fillUniField(page, limited, '123456')
  await expect(limited).toHaveValue('1234')
})

test('前缀菜单切换搜索类型并保留关键词', async ({ page }) => {
  const item = demoItem(page, t('zi-ding-yi-zuo-ce-cha-cao'))
  await item.locator('.wd-search__cover').click()
  await fillUniField(page, item.locator('input'), '订单')
  await item.locator('.page-search__type').click()
  await item.locator('.wd-transition .wd-popover__menu-inner').getByText(t('ding-dan-hao'), { exact: true }).click()
  await expect(item.locator('.page-search__type')).toContainText(t('ding-dan-hao'))
  await expect(item.locator('input')).toHaveValue('订单')
})
