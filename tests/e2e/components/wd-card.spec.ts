import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('卡片标题、正文、页脚按顺序展示', async ({ page }) => {
  await openDemo(page, 'card', '.wd-card')
  const card = demoItem(page, t('ji-ben-shi-yong')).locator('.wd-card').first()
  await expect(card.locator('.wd-card__title')).toHaveText(t('yue-yang-lou-ji'))
  await expect(card.locator('.wd-card__content')).toContainText('春和景明')
  await expect(card.locator('.wd-card__footer')).toHaveText(t('yue-du-quan-wen'))
  const positions = await card.evaluate((el) =>
    ['.wd-card__title', '.wd-card__content', '.wd-card__footer'].map((selector) => el.querySelector(selector)!.getBoundingClientRect().top)
  )
  expect(positions[0]).toBeLessThan(positions[1])
  expect(positions[1]).toBeLessThan(positions[2])
})
