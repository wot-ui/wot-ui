import { readFileSync } from 'node:fs'

const path = process.argv[2] || 'test-results/e2e-results.json'
const report = JSON.parse(readFileSync(path, 'utf8'))
const counts = {}
function visit(suite) {
  for (const spec of suite.specs || []) {
    for (const test of spec.tests) {
      const row = (counts[test.projectName] ||= { passed: 0, knownDefect: 0, skipped: 0, unexpected: 0, flaky: 0 })
      const result = test.results.at(-1)
      if (test.status === 'unexpected' || !result) row.unexpected++
      else if (test.status === 'flaky') row.flaky++
      else if (result.status === 'skipped') row.skipped++
      else if (result.status === 'failed' && test.expectedStatus === 'failed') row.knownDefect++
      else if (result.status === 'passed' && test.expectedStatus === 'passed') row.passed++
      else row.unexpected++
    }
  }
  for (const child of suite.suites || []) visit(child)
}
visit(report)
console.log(JSON.stringify({ evidence: path, startTime: report.stats.startTime, durationMs: report.stats.duration, projects: counts }, null, 2))
// 已知缺陷单列统计；意外通过、真实失败和重试后才通过都不能当成正常通过。
if (report.errors.length || Object.values(counts).some((row) => row.unexpected || row.flaky)) process.exitCode = 1
