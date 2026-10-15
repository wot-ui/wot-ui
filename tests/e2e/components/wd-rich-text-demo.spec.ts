import { test, expect } from '../fixtures/test'
import { openDemo, t } from '../helpers/demo'

test('编辑器示例单块切换，列宽与合并表格可交互', async ({ page }, testInfo) => {
  await openDemo(page, 'richText', '.page-rich-text__article')
  const editor = page.locator('.page-rich-text__editor')
  await expect(editor.locator('.wd-rich-text')).toHaveCount(1)
  await expect(editor).toContainText('给周末，一点留白')
  await editor.getByText('wangEditor', { exact: true }).click()
  await expect(editor).toContainText('一份轻装出行提案')
  await expect(editor).not.toContainText('给周末，一点留白')
  await editor.getByText('TinyMCE', { exact: true }).click()
  await expect(editor).toContainText('WeekendJournal_AWalkByTheLake')
  // 换行验证需要窄视口；桌面宽屏允许链接完整显示在一行。
  const viewport = page.viewportSize()!
  await page.setViewportSize({ ...viewport, width: Math.min(viewport.width, 390) })
  await expect.poll(() => editor.locator('.wd-rich-text__link').evaluate((element) => element.getClientRects().length)).toBeGreaterThan(1)
  await page.setViewportSize(viewport)
  await editor.locator('.wd-rich-text__link').click()
  await expect(editor).toContainText('清单已备好')
  await testInfo.attach('editor-sample', { body: await editor.screenshot(), contentType: 'image/png' })
  const table = page.locator('.page-rich-text__merged-table')
  await table.locator('.wd-rich-text__link').click()
  await expect(page.getByText('轻徒步准备：舒适的鞋、饮水和一件外套。', { exact: true })).toBeVisible()
  await testInfo.attach('column-table-demo', { body: await table.screenshot(), contentType: 'image/png' })
})

test('从首页数据展示目录进入富文本示例', async ({ page }) => {
  await page.goto('/')
  await page.locator('.page-home__body-item-header').getByText(t('shu-ju-zhan-shi'), { exact: true }).click()
  await page.locator('.page-home .wd-cell').getByText(t('rich-text-title'), { exact: true }).click()
  await expect(page).toHaveURL(/#\/subPages\/richText\/Index$/)
  await expect(page.locator('.page-rich-text__article')).toContainText('周末出走')
})

test('旅行图文展示本地照片、链接反馈与主题，页面不横向溢出', async ({ page }, testInfo) => {
  await openDemo(page, 'richText', '.page-rich-text__article')
  const article = page.locator('.page-rich-text__article')
  await expect(article).toContainText('周末出走')
  const photo = article.locator('img')
  await expect.poll(() => photo.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBe(1200)
  await testInfo.attach('journal-article', { body: await article.screenshot(), contentType: 'image/png' })
  await article.locator('.wd-rich-text__link').click()
  await expect(page.getByText('行前准备：舒适的鞋、饮水、轻食和随身垃圾袋。', { exact: true })).toBeVisible()
  await expect(page.locator('.page-rich-text__events')).toHaveCount(0)
  const theme = page.locator('.page-rich-text__theme .wd-rich-text')
  const before = await theme.evaluate((el) => getComputedStyle(el).color)
  await page.getByText('切换深色', { exact: true }).click()
  await expect.poll(() => theme.evaluate((el) => getComputedStyle(el).color)).not.toBe(before)
  await testInfo.attach('journal-theme', { body: await page.locator('.page-rich-text__theme').screenshot(), contentType: 'image/png' })
  await testInfo.attach('journal-invitation', { body: await page.locator('.page-rich-text__invitation').screenshot(), contentType: 'image/png' })
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1)
})

test('长文按需挂载与收起，播放器直接展示但不自动播放，内容可以更新和清空', async ({ page }, testInfo) => {
  await openDemo(page, 'richText', '.page-rich-text__article')
  await expect(page.locator('.page-rich-text__long')).toHaveCount(0)
  await expect(page.locator('.page-rich-text__media .wd-rich-text')).toHaveCount(1)
  const video = page.locator('.page-rich-text__media video')
  await expect(video).toHaveCount(1)
  await expect(video).toHaveAttribute('poster', /^https:\/\/images\.unsplash\.com\/photo-1536686984648-9bcaa70abf45/)
  await expect(video).toHaveJSProperty('autoplay', false)
  await expect(video).toHaveJSProperty('paused', true)
  await expect(page.locator('.wd-rich-text__audio-control')).toHaveText('▶ 阅读时，听一段轻音乐')
  await expect(page.getByText('加载视频', { exact: true })).toHaveCount(0)
  await expect(page.getByText('加载音频', { exact: true })).toHaveCount(0)
  for (const [index, media] of (await page.locator('.page-rich-text__media').all()).entries()) {
    await testInfo.attach(`media-${index}`, { body: await media.screenshot(), contentType: 'image/png' })
  }
  await page.getByText('更新来信', { exact: true }).click()
  await expect(page.locator('.page-rich-text__dynamic')).toContainText('计划已更新')
  await page.getByText('清空内容', { exact: true }).click()
  await expect(page.locator('.page-rich-text__dynamic')).toHaveText('还没有新的来信，去看看窗外吧。')
  await page.getByText('恢复来信', { exact: true }).click()
  await expect(page.locator('.page-rich-text__dynamic')).toContainText('周末来信')
  await page.getByText('展开完整手记', { exact: true }).click()
  await expect(page.locator('.page-rich-text__long .wd-rich-text__h3')).toHaveCount(6)
  await testInfo.attach('journal-directory', { body: await page.locator('.page-rich-text__directory').screenshot(), contentType: 'image/png' })
  await page.locator('.page-rich-text__directory').getByText('03 / 见湖', { exact: true }).click()
  const pageHeader = await page.locator('uni-page-head .uni-page-head').boundingBox()
  const targetTop = (pageHeader ? pageHeader.y + pageHeader.height : 0) + 60
  const lake = page.locator('.page-rich-text__long .wd-rich-text__h3').filter({ hasText: '03 / 见湖' })
  await expect.poll(async () => Math.abs((await lake.boundingBox())!.y - targetTop)).toBeLessThan(3)
  await page.locator('.page-rich-text__long .wd-rich-text__link').click()
  const firstChapter = page.locator('.page-rich-text__long .wd-rich-text__h3').first()
  await expect.poll(async () => Math.abs((await firstChapter.boundingBox())!.y - targetTop)).toBeLessThan(3)
  await page.getByText('收起手记，回到开头', { exact: true }).click()
  await expect(page.locator('.page-rich-text__long')).toHaveCount(0)
  await expect(page.getByText('展开完整手记', { exact: true })).toBeInViewport()
})

test('媒体目录只定位，外部按钮控制音视频并显示实际进度', async ({ page }, testInfo) => {
  // 为本用例提供 12 秒 PCM 静音，测试实际 seek，不依赖外部资源或模拟播放事件。
  const pcmLength = 8000 * 2 * 12
  const audio = Buffer.alloc(44 + pcmLength)
  audio.write('RIFF', 0)
  audio.writeUInt32LE(audio.length - 8, 4)
  audio.write('WAVEfmt ', 8)
  audio.writeUInt32LE(16, 16)
  audio.writeUInt16LE(1, 20)
  audio.writeUInt16LE(1, 22)
  audio.writeUInt32LE(8000, 24)
  audio.writeUInt32LE(16000, 28)
  audio.writeUInt16LE(2, 32)
  audio.writeUInt16LE(16, 34)
  audio.write('data', 36)
  audio.writeUInt32LE(pcmLength, 40)
  await page.route('https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3', (route) => {
    const range = route
      .request()
      .headers()
      .range?.match(/^bytes=(\d+)-(\d*)$/)
    const headers = { 'access-control-allow-origin': '*', 'accept-ranges': 'bytes' }
    if (!range) return route.fulfill({ status: 200, contentType: 'audio/wav', body: audio, headers })
    const start = Number(range[1])
    const end = Math.min(Number(range[2] || audio.length - 1), audio.length - 1)
    return route.fulfill({
      status: 206,
      contentType: 'audio/wav',
      body: audio.subarray(start, end + 1),
      headers: { ...headers, 'content-range': `bytes ${start}-${end}/${audio.length}` }
    })
  })
  await openDemo(page, 'richText', '.page-rich-text__article')
  const media = page.locator('.page-rich-text__media')
  const video = media.locator('video')
  const controls = media.locator('.page-rich-text__media-controls')
  await media.getByText('旅途片段', { exact: true }).click()
  const header = await page.locator('uni-page-head .uni-page-head').boundingBox()
  const targetTop = (header ? header.y + header.height : 0) + 60
  // 页尾无法继续滚动时，目标由页面最大滚动量约束。
  await expect
    .poll(() =>
      media
        .locator('.wd-rich-text__media')
        .first()
        .evaluate((element, offset) => {
          const top = element.getBoundingClientRect().top
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight
          const expectedTop = Math.max(offset, top + window.scrollY - maxScroll)
          return Math.abs(top - expectedTop)
        }, targetTop)
    )
    .toBeLessThan(3)
  await expect(video).toHaveJSProperty('paused', true)
  await controls.getByText('播放片段', { exact: true }).click()
  await expect(video).toHaveJSProperty('paused', false)
  await controls.getByText('暂停片段', { exact: true }).click()
  await expect(video).toHaveJSProperty('paused', true)
  await expect(controls).toContainText('旅途片段 · 已暂停')
  await media.getByText('阅读时光', { exact: true }).click()
  await expect(media.locator('.wd-rich-text__audio-control')).toContainText('▶')
  await expect(controls).toContainText('阅读时光 · 待播放')
  await controls.getByText('播放片段', { exact: true }).click()
  await expect(controls).toContainText('阅读时光 · 播放中')
  await expect(controls).toContainText('/ 12 秒')
  await controls.getByText('暂停片段', { exact: true }).click()
  await expect(controls).toContainText('阅读时光 · 已暂停')
  await controls.getByText('跳至 5 秒', { exact: true }).click()
  await expect(controls).toContainText('5 / 12 秒')
  await expect(media.locator('.wd-rich-text__audio-control')).toContainText('▶')
  await testInfo.attach('media-controls', { body: await media.screenshot(), contentType: 'image/png' })
})

for (const mediaType of ['video', 'audio'] as const) {
  test(`${mediaType} 加载失败可手动重试，恢复后不自动播放`, async ({ page }, testInfo) => {
    const url = mediaType === 'video' ? '**/VID_115503.mp4' : 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3'
    let unavailable = true
    await page.route(url, (route) =>
      unavailable
        ? route.fulfill({ status: 200, contentType: mediaType === 'video' ? 'video/mp4' : 'audio/mpeg', body: 'invalid-media-fixture' })
        : route.fallback()
    )
    await openDemo(page, 'richText', '.page-rich-text__article')
    const media = page.locator('.page-rich-text__media')
    const controls = media.locator('.page-rich-text__media-controls')
    const title = mediaType === 'video' ? '旅途片段' : '阅读时光'
    await media.getByText(title, { exact: true }).click()
    await controls.getByText('播放片段', { exact: true }).click()
    await expect(controls).toContainText(`${title} · 加载失败`)
    const reload = controls.getByText('重新加载音视频', { exact: true })
    await expect(reload).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1)
    await testInfo.attach(`${mediaType}-reload`, { body: await controls.screenshot(), contentType: 'image/png' })
    // 失败操作不会影响同页其他富文本；目录切换也不能隐藏重试入口。
    await media.getByText(mediaType === 'video' ? '阅读时光' : '旅途片段', { exact: true }).click()
    await expect(reload).toBeVisible()
    unavailable = false
    await reload.click()
    await expect(reload).toHaveCount(0)
    await expect(controls).toContainText('待播放 · 0 / 0 秒')
    const video = media.locator('video')
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.readyState)).toBeGreaterThan(0)
    await expect(video).toHaveJSProperty('paused', true)
    await expect(media.locator('.wd-rich-text__audio-control')).toContainText('▶')
    await expect(page.locator('.page-rich-text__article')).toContainText('周末出走')
    // 原失败媒体恢复后仍可通过原来的 HTML ID 控制。
    await media.getByText(title, { exact: true }).click()
    await controls.getByText('播放片段', { exact: true }).click()
    await expect(controls).toContainText(`${title} · 播放中`)
    await controls.getByText('暂停片段', { exact: true }).click()
    await expect(controls).toContainText(`${title} · 已暂停`)
  })
}
