import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'rate', '.page-rate .wd-rate')
})

test('选择第三颗星仅点亮前三颗', async ({ page }) => {
  const rate = demoItem(page, t('jiBenYongFa')).locator('.wd-rate')
  await rate.locator('.wd-rate__item-star').nth(2).click()
  await expect(rate.locator('.wd-rate__item-star--active')).toHaveCount(3)
})

for (const [title, count] of [
  ['zhi-du-zhuang-tai-readonly', 3],
  ['jin-yong-zhuang-tai', 2]
] as const) {
  test(`${t(title)}保持原评分`, async ({ page }) => {
    const rate = demoItem(page, t(title)).locator('.wd-rate')
    await rate.locator('.wd-rate__item-star').last().click()
    await expect(rate.locator('.wd-rate__item-star--active')).toHaveCount(count)
  })
}

test('半星选择只点亮第四项左半部分', async ({ page }) => {
  const rate = demoItem(page, t('yun-xu-ban-xuan')).locator('.wd-rate')
  const fourth = rate.locator('.wd-rate__item').nth(3)
  await fourth.locator('.wd-rate__item-half').click()
  await expect(rate.locator('.wd-rate__item > .wd-rate__item-star--active')).toHaveCount(3)
  await expect(fourth.locator('.wd-rate__item-half .wd-rate__item-star')).toHaveClass(/wd-rate__item-star--active/)
})

test('clearable 重复点击最小评分清空，其他评分保持选择', async ({ page }) => {
  const rate = demoItem(page, t('yun-xu-qing-kong-ping-fen')).locator('.wd-rate').first()
  await rate.locator('.wd-rate__item-star').nth(2).click()
  await expect(rate.locator('.wd-rate__item-star--active')).toHaveCount(3)
  await rate.locator('.wd-rate__item-star').first().click()
  await expect(rate.locator('.wd-rate__item-star--active')).toHaveCount(1)
  await rate.locator('.wd-rate__item-star').first().click()
  await expect(rate.locator('.wd-rate__item-star--active')).toHaveCount(0)
})
