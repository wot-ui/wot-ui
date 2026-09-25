import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

test('文本位置、虚线和垂直分隔线按配置渲染', async ({ page }) => {
  await openDemo(page, 'divider', '.wd-divider')
  const positions = demoItem(page, t('nei-rong-wei-zhi'))
  for (const [position, key] of [
    ['center', 'zhong-jian'],
    ['left', 'zuo-ce'],
    ['right', 'you-ce']
  ] as const) {
    await expect(positions.locator('.wd-divider--' + position)).toHaveText(t(key))
  }
  await expect(demoItem(page, t('xu-xian')).locator('.wd-divider')).toHaveClass(/is-dashed/)
  const vertical = demoItem(page, t('chui-zhi-fen-ge-xian')).locator('.wd-divider').first()
  const box = await vertical.boundingBox()
  expect(box!.height).toBeGreaterThan(box!.width)
})
