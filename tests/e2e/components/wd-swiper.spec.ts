import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { dragBy } from '../helpers/gesture'

test.use({ hasTouch: false })
test.beforeEach(async ({ page }) => {
  await openDemo(page, 'swiper', '.wd-swiper')
})

test('导航按钮切换到末项，非循环模式不越界且可返回', async ({ page }) => {
  const item = demoItem(page, t('shou-dong-qie-huan'))
  const dots = item.locator('.wd-swiper-nav__item--dots')
  await expect(dots).toHaveCount(5)
  await expect(dots.nth(3)).toHaveClass(/is-active/)
  await item.locator('.wd-swiper-nav__btn--next').click()
  await expect(dots.last()).toHaveClass(/is-active/)
  await item.locator('.wd-swiper-nav__btn--next').click()
  await expect(dots.last()).toHaveClass(/is-active/)
  await item.locator('.wd-swiper-nav__btn--prev').click()
  await expect(dots.nth(3)).toHaveClass(/is-active/)
})

test('鼠标拖动轮播内容切换图片及指示器', async ({ page }) => {
  const item = demoItem(page, t('shou-dong-qie-huan'))
  await dragBy(page, item.locator('uni-swiper'), -160, 0)
  await expect(item.locator('.wd-swiper-nav__item--dots').last()).toHaveClass(/is-active/)
})
