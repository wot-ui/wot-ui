<template>
  <view class="rich-text-performance">
    <view>富文本性能基线（仅 H5 开发环境）</view>
    <view>固定样本、同等规模替换；记录组件更新与布局，不等待图片下载，不代表真机性能。</view>
    <button :disabled="running" @click="run">{{ running ? '测量中' : '运行基线' }}</button>
    <view class="rich-text-performance__progress">{{ progress }}</view>
    <text class="rich-text-performance__report">{{ report }}</text>
    <view class="rich-text-performance__content">
      <wd-rich-text v-if="visible" ref="richText" :content="content" :enable-anchor="enableAnchor" :preview-image="false" />
    </view>
  </view>
</template>
<script setup lang="ts">
import { getCurrentInstance, nextTick, onBeforeUnmount, ref, type VNode } from 'vue'
import WdRichText from '../../../../src/uni_modules/wot-ui/components/wd-rich-text/wd-rich-text.vue'
import type { RichTextExpose } from '../../../../src/uni_modules/wot-ui/components/wd-rich-text/types'
import { performanceSamples, replacementContent } from '../../../fixtures/rich-text-performance'

const instance = getCurrentInstance()!
const richText = ref<RichTextExpose>()
const content = ref('')
const enableAnchor = ref(false)
const visible = ref(false)
const running = ref(false)
const report = ref('')
const progress = ref('等待测量')
let disposed = false
onBeforeUnmount(() => (disposed = true))

/** 统计实际创建的递归渲染实例，native rich-text 内部 DOM 不算作组件。 */
function countRenderers(node: VNode): number {
  if (node.component) return (node.component.type.name === 'wd-rich-text-node' ? 1 : 0) + countRenderers(node.component.subTree)
  return Array.isArray(node.children)
    ? node.children.reduce<number>((sum, child) => sum + (typeof child === 'object' && child !== null ? countRenderers(child as VNode) : 0), 0)
    : 0
}
const frame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
const stats = (values: number[]) => {
  values.sort((a, b) => a - b)
  return { medianMs: +values[Math.floor(values.length / 2)].toFixed(2), maxMs: +values[values.length - 1].toFixed(2) }
}

async function run() {
  if (running.value) return
  running.value = true
  report.value = ''
  const results = []
  try {
    for (const sample of performanceSamples) {
      progress.value = sample.title
      const mountTimes: number[] = []
      const updateTimes: number[] = []
      let renderers = 0
      let domElements = 0
      for (let iteration = 0; iteration < 12; iteration++) {
        if (disposed) return
        visible.value = false
        await nextTick()
        await frame()
        const start = performance.now()
        content.value = sample.html
        enableAnchor.value = sample.enableAnchor
        visible.value = true
        await nextTick()
        const root = instance.proxy!.$el as HTMLElement
        // 强制完成布局；不把帧等待与诊断遍历算入耗时。
        root.getBoundingClientRect()
        const mounted = performance.now() - start
        renderers = countRenderers(instance.subTree)
        domElements = root.querySelectorAll('.wd-rich-text *').length
        await frame()
        const updateStart = performance.now()
        content.value = replacementContent(sample)
        await nextTick()
        root.getBoundingClientRect()
        const updated = performance.now() - updateStart
        if (!richText.value?.getText().includes('更新后的内容')) throw new Error('Replacement was not rendered')
        if (iteration > 1) {
          mountTimes.push(mounted)
          updateTimes.push(updated)
        }
      }
      results.push({ sample: sample.id, renderers, domElements, mount: stats(mountTimes), update: stats(updateTimes) })
    }
    report.value = JSON.stringify({ userAgent: navigator.userAgent, warmups: 2, iterations: 10, results })
    progress.value = '测量完成'
  } catch (error) {
    progress.value = `测量失败：${String(error)}`
  } finally {
    running.value = false
  }
}
</script>
