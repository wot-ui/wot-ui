<template>
  <!-- #ifdef APP-PLUS -->
  <view v-if="state.show" :class="`wd-video-preview ${customClass}`" :style="`z-index: ${options.zIndex}; ${customStyle}`" @click="close">
    <!-- #endif -->
    <!-- #ifndef APP-PLUS -->
    <wd-overlay
      :show="state.show"
      :z-index="options.zIndex"
      :lock-scroll="true"
      :custom-class="`wd-video-preview ${customClass}`"
      :custom-style="customStyle"
      @click="close"
      @enter="handleEnter"
      @after-leave="handleAfterLeave"
    >
      <!-- #endif -->

      <view :class="videoClass" @click.stop="">
        <video
          :id="videoId"
          class="wd-video-preview__video-player"
          v-if="state.visible && previewVideo.url"
          :controls="true"
          :poster="previewVideo.poster"
          :title="previewVideo.title"
          play-btn-position="center"
          :enableNative="true"
          :src="previewVideo.url"
          :enable-progress-gesture="false"
          @fullscreenchange="handleFullscreenChange"
        ></video>
      </view>
      <!-- #ifndef APP-PLUS -->
      <view :class="closeClass" @click.stop="close">
        <wd-icon name="close" custom-class="wd-video-preview__close-icon" />
      </view>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS -->
      <view v-if="!isFullScreen" :class="closeClass" @click.stop="close">
        <wd-icon name="close" custom-class="wd-video-preview__close-icon" />
      </view>
      <!-- #endif -->
      <!-- #ifndef APP-PLUS -->
    </wd-overlay>
    <!-- #endif -->
    <!-- #ifdef APP-PLUS -->
  </view>
  <!-- #endif -->
</template>

<script lang="ts">
export default {
  name: 'wd-video-preview',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import wdOverlay from '../wd-overlay/wd-overlay.vue'
import { reactive, ref, inject, watch, computed, getCurrentInstance, nextTick } from 'vue'
import { videoPreviewProps, type PreviewVideo, type VideoPreviewOptions, type VideoPreviewExpose } from './types'
import { defaultOptions, getVideoPreviewOptionKey } from './index'
import { isDef, isFunction, uuid } from '../../common/util'

const props = defineProps(videoPreviewProps)

const emit = defineEmits<{
  open: []
  close: []
}>()

const state = reactive({
  show: false,
  visible: false
})

const previewVideo = reactive<PreviewVideo>({ url: '', poster: '', title: '' })
const fullScreenValue = ref<boolean | undefined>()
const closePositionValue = ref<VideoPreviewOptions['closePosition']>()

// App 端原生 video 走系统全屏，需要唯一 id 创建上下文
const videoId = `wd-video-preview-${uuid()}`
const { proxy } = getCurrentInstance() as any

// 获取注入的选项
const videoPreviewOptionKey = getVideoPreviewOptionKey(props.selector)
const videoPreviewOption = inject(videoPreviewOptionKey, ref<VideoPreviewOptions>(defaultOptions))

const options = computed(() => ({
  zIndex: isDef(videoPreviewOption.value.zIndex) ? videoPreviewOption.value.zIndex! : props.zIndex,
  onOpen: videoPreviewOption.value.onOpen || props.onOpen || null,
  onClose: videoPreviewOption.value.onClose || props.onClose || null
}))

const isFullScreen = computed(() => {
  const optionFullScreen = videoPreviewOption.value.fullScreen
  if (isDef(optionFullScreen)) return optionFullScreen!
  return isDef(fullScreenValue.value) ? fullScreenValue.value! : props.fullScreen
})

const closePosition = computed(() => {
  const optionClosePosition = videoPreviewOption.value.closePosition
  if (isDef(optionClosePosition)) return optionClosePosition!
  return isDef(closePositionValue.value) ? closePositionValue.value! : props.closePosition
})

const videoClass = computed(() => ['wd-video-preview__video', isFullScreen.value ? 'is-fullscreen' : ''])
const closeClass = computed(() => ['wd-video-preview__close', `is-${closePosition.value}`])

// 监听选项变化
watch(
  () => videoPreviewOption.value,
  (newVal: VideoPreviewOptions) => {
    reset(newVal)
  },
  { deep: true, immediate: true }
)

// 监听 show 变化，触发事件
watch(
  () => state.show,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      // #ifdef APP-PLUS
      // App 端不使用 overlay，直接驱动 video 渲染并进入系统全屏
      state.visible = true
      enterFullScreen()
      // #endif
      emit('open')
      if (isFunction(options.value.onOpen)) {
        options.value.onOpen()
      }
    } else if (!newVal && oldVal) {
      // #ifdef APP-PLUS
      // App 端关闭时重置 video 渲染与预览数据
      state.visible = false
      previewVideo.url = ''
      previewVideo.poster = ''
      previewVideo.title = ''
      // #endif
      emit('close')
      if (isFunction(options.value.onClose)) {
        options.value.onClose()
      }
    }
  }
)

function reset(option: VideoPreviewOptions) {
  state.show = isDef(option.show) ? option.show! : false
  if (state.show) {
    previewVideo.url = option.url
    previewVideo.poster = option.poster
    previewVideo.title = option.title
    fullScreenValue.value = option.fullScreen
    closePositionValue.value = option.closePosition
  }
}

// #ifndef APP-PLUS
function handleEnter() {
  state.visible = true
}

function handleAfterLeave() {
  state.visible = false
  previewVideo.url = ''
  previewVideo.poster = ''
  previewVideo.title = ''
}
// #endif

// App 端全屏预览时进入原生全屏播放，规避原生 video 同层渲染遮挡自定义浮层的问题
function enterFullScreen() {
  // #ifdef APP-PLUS
  if (!isFullScreen.value) return
  nextTick(() => {
    const videoContext = uni.createVideoContext(videoId, proxy)
    videoContext && videoContext.requestFullScreen({ direction: 0 })
  })
  // #endif
}

// 监听原生全屏状态变化，全屏预览模式下退出全屏时关闭预览
function handleFullscreenChange(event: any) {
  // #ifdef APP-PLUS
  if (isFullScreen.value && event && event.detail && !event.detail.fullScreen) {
    close()
  }
  // #endif
}

function close() {
  state.show = false
}

function open(video: VideoPreviewOptions) {
  previewVideo.url = video.url
  previewVideo.poster = video.poster
  previewVideo.title = video.title
  fullScreenValue.value = video.fullScreen
  closePositionValue.value = video.closePosition
  state.show = true
}

defineExpose<VideoPreviewExpose>({
  open,
  close
})
</script>
<style lang="scss">
@use './index.scss';
</style>
