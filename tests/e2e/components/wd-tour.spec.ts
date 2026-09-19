import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test.beforeEach(async ({ page }) => {
  await openDemo(page, 'tour', '.page-tour__button-group .wd-button')
})

test('完成四步引导，支持返回上一步', async ({ page }) => {
  await demoItem(page, t('ji-chu-yong-fa')).locator('.wd-button').click()
  const tour = page.locator('.wd-tour')
  await expect(tour.locator('.wd-tour__info')).toContainText(t('huan-ying-shi-yong-yin-dao-zu-jian-zhe-shi-di-yi-bu-de-shuo-ming'))
  await expect(tour.locator('.wd-tour__prev')).toHaveCount(0)
  await tour.locator('.wd-tour__next').click()
  await expect(tour.locator('.wd-tour__info')).toContainText(t('zhe-shi-di-er-bu-zhan-shi-le-ling-yi-ge-gong-neng-dian'))
  await tour.locator('.wd-tour__prev').click()
  await expect(tour.locator('.wd-tour__next')).toContainText('(1/4)')
  for (let step = 1; step < 4; step++) {
    await expect(tour.locator('.wd-tour__next')).toContainText(`(${step}/4)`)
    await tour.locator('.wd-tour__next').click()
  }
  await expect(tour.locator('.wd-tour__info')).toContainText(t('zhe-shi-zui-hou-yi-bu-wan-cheng-yin-dao-liu-cheng'))
  await tour.locator('.wd-tour__finish').click()
  await expect(tour).toHaveCount(0)
})

test('跳过引导后可从第一步重新开始', async ({ page }) => {
  const trigger = demoItem(page, t('ji-chu-yong-fa')).locator('.wd-button')
  await trigger.click()
  await page.locator('.wd-tour__next').click()
  await page.locator('.wd-tour__skip').click()
  await expect(page.locator('.wd-tour')).toHaveCount(0)
  await trigger.click()
  await expect(page.locator('.wd-tour__next')).toContainText('(1/4)')
})
