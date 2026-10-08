import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'

for (const title of ['ji-chu-yong-fa', 'zu-jian-shi-li-tiao-yong'] as const) {
  test(`${title}：视频加载到可播放状态，关闭后移除播放器`, async ({ page }) => {
    await openDemo(page, 'videoPreview', '.page-video-preview .wd-button')
    await demoItem(page, t(title)).locator('.wd-button').click()
    const video = page.locator('.wd-video-preview:visible video')
    await expect(video).toBeVisible()
    await expect.poll(() => video.evaluate((el) => (el as HTMLVideoElement).readyState)).toBeGreaterThanOrEqual(2)
    const duration = await video.evaluate((el) => (el as HTMLVideoElement).duration)
    expect(duration).toBeCloseTo(2, 0)
    await page.locator('.wd-video-preview__close:visible').click()
    await expect(page.locator('.wd-video-preview:visible')).toHaveCount(0)
  })
}
