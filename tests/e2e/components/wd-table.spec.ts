import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.use({ isMobile: false, hasTouch: false })

test('列标题与行数据对应，隐藏表头保留数据', async ({ page }) => {
  await openDemo(page, 'table', '.wd-table')
  const table = demoItem(page, t('jiBenYongFa'))
  await expect(table.locator('.wd-table__cell--header')).toHaveText([t('xing-ming'), t('fen-shu')])
  await expect(table.locator('.wd-table-column').nth(0).locator('.wd-table__cell').first()).toHaveText(t('guan-yu'))
  await expect(table.locator('.wd-table-column').nth(1).locator('.wd-table__cell').first()).toHaveText('66')
  const hidden = demoItem(page, t('bu-zhan-shi-biao-tou'))
  await expect(hidden.locator('.wd-table__header')).toHaveCount(0)
  await expect(hidden.locator('.wd-table-column').first().locator('.wd-table__cell').first()).toHaveText(t('guan-yu'))
})

test('排序事件驱动 Demo 反转数据，再次点击恢复顺序', async ({ page }) => {
  await openDemo(page, 'table', '.wd-table')
  const table = demoItem(page, t('gu-ding-lie'))
  const names = table.locator('.wd-table-column').first().locator('.wd-table__cell')
  const original = await names.allTextContents()
  expect(original.length).toBeGreaterThan(2)
  await table.locator('.wd-sort-button').first().click()
  await expect(names).toHaveText([...original].reverse())
  await table.locator('.wd-sort-button').first().click()
  await expect(names).toHaveText(original)
})

test('合并列与合并行具有真实尺寸，隐藏被合并的单元格', async ({ page }) => {
  await openDemo(page, 'table', '.wd-table')
  const columns = demoItem(page, t('he-bing-dan-yuan-ge')).locator('.wd-table-column')
  await expect(columns.nth(0).locator('.wd-table__cell')).toHaveCount(4)
  await expect(columns.nth(1).locator('.wd-table__cell')).toHaveCount(4)
  const first = await columns.first().locator('.wd-table__cell').nth(0).boundingBox()
  const normal = await columns.first().locator('.wd-table__cell').nth(1).boundingBox()
  const merged = await columns.first().locator('.wd-table__cell').nth(2).boundingBox()
  expect(first!.width / normal!.width).toBeCloseTo(2, 1)
  expect(merged!.height / normal!.height).toBeCloseTo(2, 1)
})

test('一万行虚拟表格滚动更新行索引且 DOM 保持有限', async ({ page }) => {
  await openDemo(page, 'table', '.wd-table')
  const table = demoItem(page, t('xu-ni-gun-dong')).locator('.wd-table')
  await table.scrollIntoViewIfNeeded()
  const indices = table.locator('.wd-table-column').first().locator('.wd-table__cell')
  await expect(indices.first()).toHaveText('1')
  expect(await indices.count()).toBeLessThan(30)
  await table.hover()
  await page.mouse.wheel(0, 5000)
  await expect.poll(async () => Number(await indices.first().textContent())).toBeGreaterThan(50)
  expect(await indices.count()).toBeLessThan(30)
  await page.mouse.wheel(0, -10000)
  await expect(indices.first()).toHaveText('1')
})
