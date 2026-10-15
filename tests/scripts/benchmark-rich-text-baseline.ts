/** pnpm exec esno tests/scripts/benchmark-rich-text-baseline.ts；不代表设备性能。 */
import { performance } from 'node:perf_hooks'
import { parseHtml, getPlainText } from '../../src/uni_modules/wot-ui/components/wd-rich-text/parser'
import { compileRichText } from '../../src/uni_modules/wot-ui/components/wd-rich-text/transform'
import type { RichTextRenderNode } from '../../src/uni_modules/wot-ui/components/wd-rich-text/types'
import { performanceSamples } from '../fixtures/rich-text-performance'

const count = (nodes: RichTextRenderNode[]): number => nodes.reduce((sum, node) => sum + 1 + count(node.children), 0)
const stats = (values: number[]) => {
  values.sort((a, b) => a - b)
  return { medianMs: +values[Math.floor(values.length / 2)].toFixed(2), p95Ms: +values[Math.ceil(values.length * 0.95) - 1].toFixed(2) }
}
const results = performanceSamples.map((sample) => {
  const stages = { parse: [] as number[], compile: [] as number[], text: [] as number[], total: [] as number[] }
  const run = (record: boolean) => {
    const start = performance.now()
    const nodes = parseHtml(sample.html, sample)
    const parsed = performance.now()
    const output = compileRichText(nodes, sample.enableAnchor)
    const compiled = performance.now()
    getPlainText(nodes)
    const end = performance.now()
    if (record) {
      stages.parse.push(parsed - start)
      stages.compile.push(compiled - parsed)
      stages.text.push(end - compiled)
      stages.total.push(end - start)
    }
    return output
  }
  for (let i = 0; i < 10; i++) run(false)
  for (let i = 0; i < 30; i++) run(true)
  const output = run(false)
  return {
    sample: sample.id,
    enableAnchor: sample.enableAnchor,
    inputCodeUnits: sample.html.length,
    outputCodeUnits: JSON.stringify(output).length,
    renderNodes: count(output.nodes),
    ...Object.fromEntries(Object.entries(stages).map(([key, values]) => [key, stats(values)]))
  }
})
console.log(
  JSON.stringify(
    {
      runtime: process.version,
      platform: process.platform,
      arch: process.arch,
      warmups: 10,
      iterations: 30,
      note: 'Synthetic host baseline; excludes UI rendering, network and device performance.',
      results
    },
    null,
    2
  )
)
