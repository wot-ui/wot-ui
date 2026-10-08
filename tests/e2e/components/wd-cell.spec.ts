import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('单元格标题、描述与值对应，组标题渲染', async ({ page }) => {
  await openDemo(page, 'cell', '.wd-cell')
  const item = demoItem(page, t('jiBenYongFa'))
  await expect(item.locator('.wd-cell__value')).toHaveText([t('nei-rong'), t('nei-rong')])
  await expect(item.locator('.wd-cell__label')).toHaveText(t('miaoShuXinXi-0'))
  await expect(demoItem(page, t('fen-zu-biao-ti')).locator('.wd-cell-group__title')).toContainText(t('jiao-yi-guan-li'))
})

test('有值时不显示占位提示，无值时显示占位提示', async ({ page }) => {
  await openDemo(page, 'cell', '.wd-cell')
  const cells = demoItem(page, 'Placeholder').locator('.wd-cell')
  await expect(cells.first()).toContainText(t('qing-shu-ru-yong-hu-ming'))
  await expect(cells.nth(1)).toContainText('188****8888')
  await expect(cells.nth(1)).not.toContainText(t('qing-shu-ru-shou-ji-hao'))
})
