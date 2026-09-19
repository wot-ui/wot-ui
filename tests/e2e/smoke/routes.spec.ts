import { readFileSync, readdirSync } from 'node:fs'
import JSON5 from 'json5'
import { test, expect } from '../fixtures/test'
import routes from '../fixtures/routes.json'
import matrix from '../coverage-matrix.json'

const pages = JSON5.parse(readFileSync('src/pages.json', 'utf8')) as {
  pages: Array<{ path: string }>
  subPackages: Array<{ root: string; pages: Array<{ path: string }> }>
}
const registeredPaths = [
  ...pages.pages.map((page) => page.path),
  ...pages.subPackages.flatMap((group) => group.pages.map((page) => `${group.root}/${page.path}`))
]

// 新增/删除路由时要求同步清单，不能静默遗漏页面。
expect(routes.map((route) => route.path).sort()).toEqual(registeredPaths.sort())
expect(new Set(routes.map((route) => route.path)).size).toBe(routes.length)
expect(matrix.components.map((component) => component.name).sort()).toEqual(
  readdirSync('src/uni_modules/wot-ui/components')
    .filter((name) => name.startsWith('wd-'))
    .sort()
)

for (const route of routes) {
  test(`页面冒烟：${route.path}`, async ({ page }) => {
    await page.goto(`/#/${route.path}`)
    await expect(page).toHaveURL(new RegExp(`#/${route.path}$`))
    const content = page.locator(route.ready).first()
    await expect(content, '页面自己的内容应完成渲染，不能只有公共外壳').toBeVisible()
    const box = await content.boundingBox()
    expect(box?.width).toBeGreaterThan(0)
    expect(box?.height).toBeGreaterThan(0)
  })
}
