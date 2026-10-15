<template>
  <rich-text
    v-if="node.kind === 'static'"
    :id="anchorDomId"
    class="wd-rich-text__static"
    :nodes="node.nativeNodes"
    :selectable="context?.selectable()"
    :user-select="context?.selectable()"
  />
  <text v-else-if="node.kind === 'text'" class="wd-rich-text__text" :selectable="context?.selectable()">{{ node.text }}</text>
  <text :id="anchorDomId" v-else-if="node.name === 'br'" class="wd-rich-text__break">{{ '\n' }}</text>
  <view :id="anchorDomId" v-else-if="node.kind === 'table'" class="wd-rich-text__scroll">
    <rich-text
      v-if="node.nativeNodes"
      class="wd-rich-text__static"
      :nodes="node.nativeNodes"
      :selectable="context?.selectable()"
      :user-select="context?.selectable()"
    />
    <view v-else class="wd-rich-text__table" :style="node.tableStyle || node.style">
      <template v-for="child in node.children" :key="child.id">
        <text v-if="child.kind === 'text'" class="wd-rich-text__text" :selectable="context?.selectable()">{{ child.text }}</text>
        <wd-rich-text-node v-else :node="child" :link-href="linkHref" />
      </template>
    </view>
  </view>
  <view :id="anchorDomId" v-else-if="node.kind === 'link'" class="wd-rich-text__link" :style="node.style" @tap.stop="handleLink">
    <template v-for="child in node.children" :key="child.id">
      <text v-if="child.kind === 'text'" class="wd-rich-text__text" :selectable="context?.selectable()">{{ child.text }}</text>
      <wd-rich-text-node v-else :node="child" :link-href="node.href" />
    </template>
  </view>
  <view
    v-else-if="node.kind === 'image'"
    :id="anchorDomId"
    :class="['wd-rich-text__image-box', { 'is-loading': !loaded && !failed, 'is-error': failed }]"
    :style="node.style"
    @tap.stop="handleImage"
  >
    <!-- #ifdef H5 -->
    <img
      v-if="!failed"
      class="wd-rich-text__image"
      :src="node.src"
      :alt="node.alt"
      :style="node.imageStyle"
      :loading="context?.lazyLoad() ? 'lazy' : 'eager'"
      @load="handleLoad"
      @error="handleError"
    />
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <image
      v-if="!failed"
      class="wd-rich-text__image"
      :src="node.src"
      :mode="node.fixedHeight ? 'aspectFit' : 'widthFix'"
      :style="node.imageStyle"
      :lazy-load="context?.lazyLoad()"
      @load="handleLoad"
      @error="handleError"
    />
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <img
      v-if="placeholderSrc && failedPlaceholder !== placeholderSrc"
      class="wd-rich-text__image-placeholder"
      :src="placeholderSrc"
      alt=""
      @error="failedPlaceholder = placeholderSrc"
    />
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <image
      v-if="placeholderSrc && failedPlaceholder !== placeholderSrc"
      class="wd-rich-text__image-placeholder"
      :src="placeholderSrc"
      mode="aspectFit"
      @error="failedPlaceholder = placeholderSrc"
    />
    <!-- #endif -->
    <text v-if="failed && (!placeholderSrc || failedPlaceholder === placeholderSrc)" class="wd-rich-text__image-state">{{ node.alt || '×' }}</text>
    <text v-else-if="!loaded && !failed && (!placeholderSrc || failedPlaceholder === placeholderSrc)" class="wd-rich-text__image-state">…</text>
  </view>
  <wd-rich-text-media v-else-if="node.kind === 'media'" :node="node" :anchor-id="anchorDomId" />
  <view v-else :id="anchorDomId" :class="['wd-rich-text__element', `wd-rich-text__${node.name}`]" :style="node.style">
    <!-- 纯文本没有交互或生命周期，直接输出，避免长表格和混排内容产生大量递归实例。 -->
    <text v-if="node.marker" class="wd-rich-text__marker">{{ node.marker }}</text>
    <template v-for="child in node.children" :key="child.id">
      <text v-if="child.kind === 'text'" class="wd-rich-text__text" :selectable="context?.selectable()">{{ child.text }}</text>
      <wd-rich-text-node v-else :node="child" :link-href="linkHref" />
    </template>
  </view>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref, type PropType } from 'vue'
import { measureAnchor } from '../anchor'
import WdRichTextMedia from './wd-rich-text-media.vue'
import { richTextContextKey, type RichTextRenderNode } from '../types'
// 小程序编译器需要显式导入，才能生成递归组件的 usingComponents 注册。
// #ifdef MP
import WdRichTextNode from './wd-rich-text-node.vue'
// #endif

defineOptions({
  name: 'wd-rich-text-node',
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  node: { type: Object as PropType<RichTextRenderNode>, required: true },
  linkHref: { type: String, default: undefined }
})
const context = inject(richTextContextKey)
const instance = getCurrentInstance()!
const anchorDomId = props.node.anchorId ? `wd-rt-anchor-${instance.uid}` : undefined
let unregisterAnchor: (() => void) | undefined
let disposed = false
onBeforeUnmount(() => {
  disposed = true
  unregisterAnchor?.()
})
const failedPlaceholder = ref('')
const placeholderSrc = computed(() => (failed.value ? context?.errorImage() || '' : !loaded.value ? context?.loadingImage() || '' : ''))
const loaded = ref(false)
const failed = ref(false)
onMounted(() => {
  if (props.node.anchorId && anchorDomId && props.node.kind !== 'media')
    unregisterAnchor = context?.registerAnchor(props.node.anchorId, () => measureAnchor(anchorDomId, instance.proxy!))
  if (!props.node.src && props.node.kind === 'image') handleError()
})

/** 链接由业务接管，不自动跳转。 */
function handleLink() {
  if (props.node.href) context?.linkClick({ href: props.node.href })
}
/** 图片链接优先触发链接，避免图片预览与导航重复执行。 */
function handleImage() {
  if (disposed || failed.value) return
  if (props.linkHref) context?.linkClick({ href: props.linkHref })
  else context?.imageClick({ src: props.node.src || '', index: props.node.imageIndex || 0 })
}
/** 同时支持 H5 的自然尺寸和小程序的 load.detail；占位图不参与事件。 */
function handleLoad(event: { target?: unknown; detail?: { width?: number | string; height?: number | string } }) {
  if (disposed || failed.value || loaded.value) return
  loaded.value = true
  const target = event.target as HTMLImageElement | null
  const width = Number(event.detail?.width ?? target?.naturalWidth ?? 0)
  const height = Number(event.detail?.height ?? target?.naturalHeight ?? 0)
  context?.imageLoad({ src: props.node.src || '', index: props.node.imageIndex || 0, width, height })
}
/** 单次失败只上报一次，内容更新会重新创建图片节点。 */
function handleError() {
  if (disposed || failed.value) return
  failed.value = true
  context?.imageError({ src: props.node.src || '', index: props.node.imageIndex || 0 })
}
</script>
<style lang="scss">
@use '../index.scss';
</style>
