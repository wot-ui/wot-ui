import { expect, type Locator, type Page } from '@playwright/test'
import messages from '../../../src/locale/zh-CN.json'

export function t(key: keyof typeof messages): string {
  return messages[key]
}

export async function openDemo(page: Page, name: string, readySelector: string) {
  await page.goto(`/#/subPages/${name}/Index`)
  await expect(page.locator(readySelector).first()).toBeVisible()
}

export function demoItem(page: Page, title: string) {
  return page.locator('.demo-group-item').filter({
    has: page.locator('.demo-group-item__title').getByText(title, { exact: true })
  })
}

export function formItem(page: Page, title: string) {
  return page.locator('.wd-form-item').filter({
    has: page.locator('.wd-cell__title').getByText(title, { exact: true })
  })
}

/** 调用前需 page.clock.install()。uni-h5 的输入事件节流为 100ms，推进虚拟时钟处理尾部事件。 */
export async function fillUniField(page: Page, field: Locator, value: string) {
  await field.fill(value)
  await page.clock.runFor(150)
}
