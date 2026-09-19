import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Page } from '@playwright/test'

const image = readFileSync(resolve('src/subPages/img/black_mao.png'))
const video = readFileSync(resolve('tests/e2e/fixtures/assets/sample.mp4'))
const font = readFileSync(resolve('tests/e2e/fixtures/assets/fish.woff2'))
const icons = readFileSync(resolve('tests/e2e/fixtures/assets/wd-icons.woff'))
const shadow = readFileSync(resolve('tests/e2e/fixtures/assets/shadow-grey.png'))
const imageHosts = new Set(['wot-ui.cn', 'img10.360buyimg.com', 'img12.360buyimg.com', 'avatars.githubusercontent.com'])

/** 固定 Demo 的外部素材，避免 CDN 变动影响功能回归。应用自身资源不拦截。 */
export async function mockDemoAssets(page: Page, baseURL: string) {
  const unexpectedRequests: string[] = []
  // 后注册的素材路由优先匹配；剩余外部请求必须在用例中显式 mock。
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url())
    if (url.origin === new URL(baseURL).origin) return route.continue()
    unexpectedRequests.push(`${route.request().method()} ${url.href}`)
    return route.abort('blockedbyclient')
  })
  await page.route(
    (url) => imageHosts.has(url.hostname) && (/\.(png|jpe?g|svg|webp)$/i.test(url.pathname) || url.hostname === 'avatars.githubusercontent.com'),
    (route) => route.fulfill({ status: 200, contentType: 'image/png', body: image, headers: { 'access-control-allow-origin': '*' } })
  )
  // Img Demo 刻意展示加载失败；使用不可解码的本地响应保留错误态，不访问不存在的域名。
  await page.route('https://www.123.wot.com/a.jpg', (route) => route.fulfill({ status: 200, contentType: 'image/png', body: 'invalid-image' }))
  await page.route(/https?:\/\/at\.alicdn\.com\/t\/c\/font_4626013_vwpx4thmin\.woff2\?t=1721314121733$/, (route) =>
    route.fulfill({ status: 200, contentType: 'font/woff2', body: font, headers: { 'access-control-allow-origin': '*' } })
  )
  await page.route('https://at.alicdn.com/t/c/font_5024693_esasb18zrbp.woff?t=1773909649753', (route) =>
    route.fulfill({ status: 200, contentType: 'font/woff', body: icons, headers: { 'access-control-allow-origin': '*' } })
  )
  await page.route('https://cdn.dcloud.net.cn/img/shadow-grey.png', (route) => route.fulfill({ status: 200, contentType: 'image/png', body: shadow }))
  await page.route(/https:\/\/unpkg\.com\/wot-design-uni-assets@1\.0\.3\/VID_(115503|150752|155516)\.mp4$/, (route) => {
    // WebKit 会先请求少量字节探测媒体，必须提供正确的 Range 响应。
    const range = route
      .request()
      .headers()
      .range?.match(/^bytes=(\d+)-(\d*)$/)
    const headers = { 'access-control-allow-origin': '*', 'accept-ranges': 'bytes' }
    if (!range) return route.fulfill({ status: 200, contentType: 'video/mp4', body: video, headers })
    const start = Number(range[1])
    const end = Math.min(range[2] ? Number(range[2]) : video.length - 1, video.length - 1)
    if (start > end) return route.fulfill({ status: 416, headers: { ...headers, 'content-range': `bytes */${video.length}` } })
    return route.fulfill({
      status: 206,
      contentType: 'video/mp4',
      body: video.subarray(start, end + 1),
      headers: { ...headers, 'content-range': `bytes ${start}-${end}/${video.length}` }
    })
  })
  return unexpectedRequests
}
