import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

// 第一参数来自 playwright test --list --reporter=json；其后为要登记的实际执行报告。
const [listPath, ...reportPaths] = process.argv.slice(2)
if (!listPath) throw new Error('Usage: node tests/e2e/scripts/update-coverage-matrix.mjs <list.json> [results.json ...]')
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))
const plan = readFileSync('.github/E2E-H5-PLAN.md', 'utf8')
const routes = readJson('tests/e2e/fixtures/routes.json')
const mappings = [...plan.matchAll(/^\|\s*(wd-[\w-]+)\s*\|\s*\[([^\]]+)\]\([^\n]+?\s*\|\s*(M\d+)\s*\|\s*([^|]+)\|/gm)]
const componentNames = readdirSync('src/uni_modules/wot-ui/components')
  .filter((name) => name.startsWith('wd-'))
  .sort()
if (JSON.stringify(mappings.map((match) => match[1]).sort()) !== JSON.stringify(componentNames)) {
  throw new Error('组件目录与 E2E-H5-PLAN.md 不一致，请先登记新增/删除的组件')
}

function specs(suite) {
  return [...(suite.specs || []), ...(suite.suites || []).flatMap(specs)]
}
const scenarioId = (file, title) => createHash('sha256').update(`${file}:${title}`).digest('hex').slice(0, 12)
const scenarios = new Map()
for (const spec of specs(readJson(listPath))) {
  const id = scenarioId(spec.file, spec.title)
  if (!scenarios.has(id)) scenarios.set(id, { id, file: `tests/e2e/${spec.file}`, title: spec.title, results: {} })
}
for (const reportPath of reportPaths) {
  const report = readJson(reportPath)
  const recorded = new Map()
  for (const spec of specs(report)) {
    const scenario = scenarios.get(scenarioId(spec.file, spec.title))
    if (!scenario) continue
    for (const test of spec.tests) {
      const results = test.results || []
      if (!results.length) continue
      const result = results[results.length - 1]
      const status =
        test.status === 'unexpected' ? 'unexpected' : result.status === 'failed' && test.expectedStatus === 'failed' ? 'known-defect' : result.status
      const key = `${scenario.id}:${test.projectName}`
      const previous = recorded.get(key)
      const entry = {
        status,
        expectedStatus: test.expectedStatus,
        runs: (previous?.runs || 0) + results.length,
        date: result.startTime,
        evidence: reportPath,
        annotations: test.annotations || []
      }
      // 重复验证中任何一次非预期失败都不能被后一次成功覆盖。
      if (previous?.status === 'unexpected') entry.status = 'unexpected'
      recorded.set(key, entry)
      scenario.results[test.projectName] = entry
    }
  }
}

// 只给确实有组内/字段断言的子组件登记对应父组件文件。
const combinedFiles = {
  'wd-checkbox-group': ['wd-checkbox'],
  'wd-radio-group': ['wd-radio'],
  'wd-form-item': ['wd-form'],
  'wd-tab': ['wd-tabs'],
  'wd-tabbar-item': ['wd-tabbar'],
  'wd-collapse-item': ['wd-collapse'],
  'wd-step': ['wd-steps'],
  'wd-sidebar-item': ['wd-sidebar'],
  'wd-navbar-capsule': ['wd-navbar'],
  'wd-drop-menu-item': ['wd-drop-menu'],
  'wd-avatar-group': ['wd-avatar'],
  'wd-cell-group': ['wd-cell'],
  'wd-col': ['wd-row'],
  'wd-grid-item': ['wd-grid'],
  'wd-index-anchor': ['wd-index-bar'],
  'wd-sticky-box': ['wd-sticky'],
  'wd-swiper-nav': ['wd-swiper', 'wd-image-preview'],
  'wd-table-column': ['wd-table'],
  'wd-popup': ['wd-popup', 'wd-popup-advanced']
}
const scenarioList = [...scenarios.values()]
const components = mappings.map(([, name, demo, phase, mode]) => {
  const files = (combinedFiles[name] || [name]).map((file) => `tests/e2e/components/${file}.spec.ts`)
  const ids = scenarioList.filter((scenario) => files.includes(scenario.file)).map((scenario) => scenario.id)
  return {
    name,
    phase,
    demo: `src/subPages/${demo}/Index.vue`,
    mode: mode.trim(),
    routes: routes.filter((route) => route.path.startsWith(`subPages/${demo}/`)).map((route) => route.path),
    coverageStatus: ids.length ? 'partial-functional' : 'smoke-only',
    scenarios: ids
  }
})
writeFileSync(
  'tests/e2e/coverage-matrix.json',
  JSON.stringify(
    {
      schemaVersion: 1,
      scope: 'H5',
      generatedAt: new Date().toISOString(),
      note: '功能用例存在不代表完整覆盖；known-defect 不计入正常通过，smoke-only 尚未实现功能场景。结果仅对应 evidence 所指运行。',
      components,
      scenarios: scenarioList
    },
    null,
    2
  ) + '\n'
)
console.log(`已登记 ${components.length} 个组件、${scenarioList.length} 个场景`)
