import { test, expect } from '../fixtures/test'
import { fillUniField, demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await page.clock.install()
  await openDemo(page, 'textarea', '.page-textarea textarea')
})

test('多行输入保留换行，清空按钮重置数值与计数', async ({ page }) => {
  const item = demoItem(page, t('qing-kong-an-niu-he-zi-shu-xian-zhi'))
  await fillUniField(page, item.locator('textarea'), '第一行\n第二行')
  await expect(item.locator('textarea')).toHaveValue('第一行\n第二行')
  await expect(item.locator('.wd-textarea__count')).toHaveText('7/120')
  await item.locator('.wd-textarea__clear').click()
  await expect(item.locator('textarea')).toHaveValue('')
  await expect(item.locator('.wd-textarea__count')).toHaveText('0/120')
})

test('输入超过 maxlength 时截断到一百二十字', async ({ page }) => {
  const item = demoItem(page, t('qing-kong-an-niu-he-zi-shu-xian-zhi'))
  await fillUniField(page, item.locator('textarea'), '测'.repeat(125))
  await expect(item.locator('textarea')).toHaveValue('测'.repeat(120))
  await expect(item.locator('.wd-textarea__count')).toHaveText('120/120')
})

for (const title of ['zhi-du', 'jinYong'] as const) {
  test(`${t(title)}文本域不可编辑且无清空按钮`, async ({ page }) => {
    const item = demoItem(page, t(title))
    await expect(item.locator('textarea')).not.toBeEditable()
    await expect(item.locator('.wd-textarea__clear')).toHaveCount(0)
  })
}

test('auto-height 随多行内容增加，清空后缩小', async ({ page }) => {
  const input = demoItem(page, t('gao-du-zi-shi-ying')).locator('textarea')
  await fillUniField(page, input, '短文')
  const before = (await input.boundingBox())!.height
  await fillUniField(page, input, Array.from({ length: 10 }, () => '多行内容').join('\n'))
  await expect.poll(async () => (await input.boundingBox())!.height).toBeGreaterThan(before * 2)
  await fillUniField(page, input, '短文')
  await expect.poll(async () => (await input.boundingBox())!.height).toBeCloseTo(before, 0)
})

test('clear-trigger=focus 仅在聚焦且有值时显示清空', async ({ page }) => {
  const item = demoItem(page, t('you-zhi-qie-ju-jiao-shi-zhan-shi-qing-kong-an-niu'))
  await fillUniField(page, item.locator('textarea'), '测试')
  await expect(item.locator('.wd-textarea__clear')).toBeVisible()
  await item.locator('.demo-group-item__title').click()
  await expect(item.locator('.wd-textarea__clear')).toHaveCount(0)
  await expect(item.locator('textarea')).toHaveValue('测试')
})
