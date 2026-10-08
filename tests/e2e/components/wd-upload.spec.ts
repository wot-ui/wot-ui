import { test, expect } from '../fixtures/test'
import { demoItem, openDemo, t } from '../helpers/demo'
import { chooseImage } from '../helpers/media'

const uploadURL = 'https://69bd04402bc2a25b22ad0a49.mockapi.io/upload'
test.beforeEach(async ({ page }) => {
  await openDemo(page, 'upload', '.wd-upload')
})

test('选择文件真实提交 multipart，成功后预览并可删除', async ({ page }) => {
  let uploaded = false
  await page.route(uploadURL, async (route) => {
    expect(route.request().method()).toBe('POST')
    expect(route.request().headers()['content-type']).toContain('multipart/form-data')
    // Playwright 的请求记录可能省略 multipart 文件字节，只断言文件字段元数据。
    expect(route.request().postData()).toContain('filename=')
    uploaded = true
    await route.fulfill({ status: 201, json: { id: 'e2e-upload' }, headers: { 'access-control-allow-origin': '*' } })
  })
  const item = demoItem(page, t('shang-chuan-zhuang-tai-gou-zi'))
  await chooseImage(page, item.locator('.wd-upload__evoke'))
  await expect(item.locator('.wd-upload__preview')).toHaveCount(1)
  await expect(item.locator('.wd-upload__mask')).toHaveCount(0)
  await expect.poll(() => uploaded).toBe(true)
  await expect(item.locator('.page-upload__status')).toContainText('上传成功')
  await item.locator('.wd-upload__close').click()
  await expect(item.locator('.wd-upload__preview')).toHaveCount(0)
})

test('手动上传失败保留文件，删除后重新选择上传成功', async ({ page }) => {
  let count = 0
  // 202 不在 success-status 内，触发组件失败逻辑且不依赖真实故障服务。
  await page.route(uploadURL, (route) => {
    count++
    return route.fulfill({ status: count === 1 ? 202 : 201, json: { attempt: count }, headers: { 'access-control-allow-origin': '*' } })
  })
  const item = demoItem(page, t('shou-dong-chu-fa-shang-chuan'))
  await chooseImage(page, item.locator('.wd-upload__evoke'))
  await expect(item.locator('.wd-upload__preview')).toHaveCount(1)
  expect(count).toBe(0)
  await item.locator('.wd-button').click()
  await expect(item.locator('.wd-upload__progress-txt')).toContainText('上传失败')
  // submit 只处理 pending 项，失败文件的恢复流程为删除后重新选择。
  await item.locator('.wd-upload__close').click()
  await chooseImage(page, item.locator('.wd-upload__evoke'))
  await item.locator('.wd-button').click()
  await expect(item.locator('.wd-upload__mask')).toHaveCount(0)
  expect(count).toBe(2)
})

test('禁用上传器不弹出文件选择且隐藏删除', async ({ page }) => {
  let opened = false
  page.on('filechooser', () => {
    opened = true
  })
  const item = demoItem(page, t('jinYong'))
  await item.locator('.wd-upload__evoke').click()
  await expect(item.locator('.wd-upload__evoke')).toHaveClass(/is-disabled/)
  await expect(item.locator('.wd-upload__close')).toHaveCount(0)
  expect(opened).toBe(false)
})
