<template>
  <view :class="['wd-rich-text', { 'is-selectable': selectable }, customClass]" :style="customStyle">
    <wd-rich-text-node v-for="node in compiled.nodes" :key="`${revision}-${node.id}`" :node="node" />
    <slot v-if="!compiled.nodes.length" />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-rich-text',
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, provide, ref, shallowRef, watch } from 'vue'
import WdRichTextNode from './render/wd-rich-text-node.vue'
import { RichTextParseError } from './limits'
import { getPageScrollTop } from './anchor'
import { canPreviewImage, resolveResourceUrl } from './resource'
import { compileRichText } from './transform'
import { getPlainText, parseHtml } from './parser'
import {
  richTextContextKey,
  richTextProps,
  type RichTextError,
  type RichTextExpose,
  type RichTextImageClick,
  type RichTextImageLoad,
  type RichTextAnchorRect,
  type RichTextAnchorOptions,
  type RichTextLinkClick,
  type RichTextMediaEvent,
  type RichTextMediaController,
  type RichTextMediaTimeUpdate,
  type RichTextLoad
} from './types'

const props = defineProps(richTextProps)
const emit = defineEmits<{
  'image-click': [event: RichTextImageClick]
  'image-load': [event: RichTextImageLoad]
  'link-click': [event: RichTextLinkClick]
  load: [event: RichTextLoad]
  error: [event: RichTextError]
  'media-play': [event: RichTextMediaEvent]
  'media-pause': [event: RichTextMediaEvent]
  'media-ended': [event: RichTextMediaEvent]
  'media-timeupdate': [event: RichTextMediaTimeUpdate]
}>()
const revision = ref(0)
const compiled = shallowRef<ReturnType<typeof compileRichText>>({ nodes: [], images: [], previewImages: [], headings: [] })
let plainText = ''
let disposed = false
// 小程序首次 nextTick 可能早于组件 ready；load 须等实例挂载及父级 ref 可用。
let resolveMounted: () => void = () => {}
const mounted = new Promise<void>((resolve) => {
  resolveMounted = resolve
})
onMounted(resolveMounted)
const anchors = new Map<string, () => Promise<RichTextAnchorRect>>()
onBeforeUnmount(() => {
  disposed = true
  resolveMounted()
  anchors.clear()
  media.clear()
  cancelScrollWait?.()
})

/** 返回当前标题目录的副本；未启用锚点时为空。 */
function getHeadings() {
  return compiled.value.headings.map((heading) => ({ ...heading }))
}
/** 获取相对视口的位置。调用时等待节点更新；过期查询会拒绝。 */
async function getAnchorRect(id: string): Promise<RichTextAnchorRect> {
  await nextTick()
  if (disposed || !props.enableAnchor) throw new Error('Anchors are unavailable')
  const currentRevision = revision.value
  const measure = anchors.get(id)
  if (!measure) throw new Error(`Anchor not found: ${id}`)
  const rect = await measure()
  if (disposed || revision.value !== currentRevision) throw new Error('Content changed while locating anchor')
  return rect
}
let scrollOperation = 0
let cancelScrollWait: (() => void) | undefined
/** 滚动结束后再测量一次，修正动画期间图片等内容引起的位置变化。 */
async function scrollToAnchor(id: string, options: RichTextAnchorOptions = {}): Promise<void> {
  const { offset = 0, duration = 300 } = options
  if (!Number.isFinite(offset) || !Number.isFinite(duration) || duration < 0) throw new Error('Invalid anchor scroll options')
  const operation = ++scrollOperation
  cancelScrollWait?.()
  const currentRevision = revision.value
  const assertCurrent = () => {
    if (disposed || currentRevision !== revision.value || operation !== scrollOperation) throw new Error('Anchor scroll was interrupted')
  }
  const scroll = (scrollTop: number, animation: number) =>
    new Promise<void>((resolve, reject) => {
      uni.pageScrollTo({ scrollTop: Math.max(0, scrollTop), duration: animation, success: () => resolve(), fail: reject })
    })
  const [rect, scrollTop] = await Promise.all([getAnchorRect(id), getPageScrollTop()])
  assertCurrent()
  await scroll(scrollTop + rect.top - offset, duration)
  assertCurrent()
  // success 只表示平台接收滚动指令；动画完成后再作一次校正。
  if (duration) {
    await new Promise<void>((resolve) => {
      const done = () => {
        clearTimeout(timer)
        if (cancelScrollWait === done) cancelScrollWait = undefined
        resolve()
      }
      const timer = setTimeout(done, duration)
      cancelScrollWait = done
    })
  }
  assertCurrent()
  const [latest, latestScrollTop] = await Promise.all([getAnchorRect(id), getPageScrollTop()])
  assertCurrent()
  if (Math.abs(latest.top - offset) > 1) await scroll(latestScrollTop + latest.top - offset, 0)
  assertCurrent()
}
const media = new Map<string, RichTextMediaController>()
/** 重复或缺失 ID 不选择任意一个媒体，避免控制错误的播放器。 */
function findMedia(id: string) {
  if (disposed || !id) return
  const matches = [...media.values()].filter((controller) => controller.id === id)
  return matches.length === 1 ? matches[0] : undefined
}
/** 向唯一匹配的媒体发送播放指令；返回值不代表资源已就绪或实际开始播放。 */
function playMedia(id: string): boolean {
  return findMedia(id)?.play() ?? false
}
/** 暂停当前组件内的音视频，供页面隐藏时调用。 */
function pauseMedia(id?: string): boolean {
  if (id !== undefined) return findMedia(id)?.pause() ?? false
  let accepted = false
  media.forEach((controller) => {
    if (controller.pause()) accepted = true
  })
  return accepted
}
/** 将非负有限秒数传给指定媒体，由平台处理超出时长或资源未就绪的情况。 */
function seekMedia(id: string, seconds: number): boolean {
  if (!Number.isFinite(seconds) || seconds < 0) return false
  return findMedia(id)?.seek(seconds) ?? false
}

/** 按映射内容监听，避免父组件重建等值内联对象时重置图片和媒体。 */
function serializeStyleMap(value: Record<string, string>) {
  return JSON.stringify(
    Object.keys(value)
      .sort()
      .map((key) => [key, value[key]])
  )
}

watch(
  [
    () => props.content,
    () => props.baseUrl,
    () => props.allowDataImage,
    () => props.enableAnchor,
    () => serializeStyleMap(props.tagStyle),
    () => serializeStyleMap(props.classStyles)
  ],
  async ([content]) => {
    const currentRevision = ++revision.value
    anchors.clear()
    media.clear()
    cancelScrollWait?.()
    let error: RichTextError | undefined
    try {
      const nodes = parseHtml(content, props)
      compiled.value = compileRichText(nodes, props.enableAnchor)
      plainText = getPlainText(nodes)
    } catch (cause) {
      compiled.value = { nodes: [], images: [], previewImages: [], headings: [] }
      plainText = ''
      error = {
        source: 'parse',
        message: cause instanceof Error ? cause.message : String(cause),
        ...(cause instanceof RichTextParseError ? { code: cause.code } : {})
      }
    }
    await mounted
    await nextTick()
    // 连续更新内容时，不上报已被替换内容的加载结果。
    if (disposed || currentRevision !== revision.value) return
    if (error) emit('error', error)
    else emit('load', { imageCount: compiled.value.images.length })
  },
  { immediate: true }
)

provide(richTextContextKey, {
  selectable: () => props.selectable,
  lazyLoad: () => props.lazyLoad,
  loadingImage: () => resolveResourceUrl(props.loadingImage, props.baseUrl, props.allowDataImage),
  errorImage: () => resolveResourceUrl(props.errorImage, props.baseUrl, props.allowDataImage),
  imageLoad: (event) => emit('image-load', event),
  registerAnchor: (id, measure) => {
    anchors.set(id, measure)
    return () => {
      if (anchors.get(id) === measure) anchors.delete(id)
    }
  },
  imageClick: (event) => {
    const images = compiled.value.previewImages
    const previewSrc = images[event.index] || ''
    const enabled = props.previewImage
    emit('image-click', event)
    if (enabled && canPreviewImage(previewSrc)) {
      uni.previewImage({ urls: images.filter(canPreviewImage), current: images.slice(0, event.index).filter(canPreviewImage).length })
    }
  },
  linkClick: (event) => emit('link-click', event),
  imageError: (event) => emit('error', { source: 'image', ...event }),
  registerMedia: (id, controller) => {
    media.set(id, controller)
    return () => {
      if (media.get(id) === controller) media.delete(id)
    }
  },
  mediaEvent: (id, event, detail) => {
    if (event === 'play') {
      media.forEach((controller, otherId) => {
        if (otherId !== id) controller.pause()
      })
      emit('media-play', detail)
    } else if (event === 'pause') emit('media-pause', detail)
    else emit('media-ended', detail)
  },
  mediaTimeUpdate: (event) => emit('media-timeupdate', event),
  mediaError: (event) => emit('error', event)
})
defineExpose<RichTextExpose>({ getText: () => plainText, playMedia, pauseMedia, seekMedia, getHeadings, getAnchorRect, scrollToAnchor })
</script>
<style lang="scss">
@use './index.scss';
</style>
