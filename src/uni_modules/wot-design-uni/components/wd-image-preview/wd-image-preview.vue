<template>
  <wd-overlay
    :show="state.show"
    :z-index="options.zIndex"
    :lock-scroll="true"
    :custom-class="`wd-image-preview ${customClass}`"
    :custom-style="customStyle"
    @enter="handleEnter"
    @after-leave="handleAfterLeave"
  >
    <!-- 关闭按钮插槽 -->
    <slot name="close" :close="close">
      <view v-if="options.closeable" :class="`wd-image-preview__close wd-image-preview__close--${options.closeIconPosition}`" @click.stop="close">
        <wd-icon custom-class="wd-image-preview__close-icon" :name="options.closeIcon" />
      </view>
    </slot>

    <!-- 图片轮播 -->
    <wd-swiper
      v-if="state.visible"
      custom-class="wd-image-preview__swiper"
      :list="state.images"
      v-model:current="state.currentIndex"
      :autoplay="false"
      :loop="options.loop"
      :show-menu-by-longpress="options.showMenuByLongpress"
      image-mode="aspectFit"
      height="100%"
      @click="handleImageClick"
      @change="handleSwiperChange"
    >
      <template #indicator="{ total, current }">
        <!-- 指示器插槽 -->
        <slot name="indicator" :total="total" :current="current">
          <view v-if="options.showIndex && total > 1" class="wd-image-preview__index">{{ current + 1 }} / {{ total }}</view>
        </slot>
      </template>
    </wd-swiper>

    <!-- 默认插槽（用于自定义底部内容等） -->
    <slot :current="state.currentIndex" :total="state.images.length" :images="state.images" :close="close"></slot>
  </wd-overlay>
</template>

<script lang="ts">
export default {
  name: 'wd-image-preview',
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
import { computed, inject, nextTick, reactive, ref, watch } from 'vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import wdOverlay from '../wd-overlay/wd-overlay.vue'
import wdSwiper from '../wd-swiper/wd-swiper.vue'
import { imagePreviewProps, type ImagePreviewExpose, type ImagePreviewOptions } from './types'
import { defaultOptions, getImagePreviewOptionKey, getImageUrl } from './index'
import { isDef, isFunction } from '../common/util'
import { type SwiperItem } from '../wd-swiper/types'

const props = defineProps(imagePreviewProps)

const emit = defineEmits<{
  open: []
  close: []
  click: [{ index: number }]
  change: [{ index: number }]
  'long-press': [{ image: string }]
}>()

// 组件状态
const state = reactive({
  show: false,
  visible: false,
  currentIndex: 0,
  images: [] as string[]
})

// 获取注入的选项
const imagePreviewOptionKey = getImagePreviewOptionKey(props.selector)
const imagePreviewOption = inject(imagePreviewOptionKey, ref<ImagePreviewOptions>(defaultOptions))

// 合并后的选项
const options = computed(() => ({
  showIndex: isDef(imagePreviewOption.value.showIndex) ? imagePreviewOption.value.showIndex : props.showIndex,
  loop: isDef(imagePreviewOption.value.loop) ? imagePreviewOption.value.loop : props.loop,
  closeable: isDef(imagePreviewOption.value.closeable) ? imagePreviewOption.value.closeable : props.closeable,
  closeIcon: isDef(imagePreviewOption.value.closeIcon) ? imagePreviewOption.value.closeIcon : props.closeIcon,
  closeIconPosition: isDef(imagePreviewOption.value.closeIconPosition) ? imagePreviewOption.value.closeIconPosition : props.closeIconPosition,
  closeOnClick: isDef(imagePreviewOption.value.closeOnClick) ? imagePreviewOption.value.closeOnClick : props.closeOnClick,
  showMenuByLongpress: isDef(imagePreviewOption.value.showMenuByLongpress) ? imagePreviewOption.value.showMenuByLongpress : props.showMenuByLongpress,
  zIndex: isDef(imagePreviewOption.value.zIndex) ? imagePreviewOption.value.zIndex! : props.zIndex,
  onOpen: imagePreviewOption.value.onOpen || props.onOpen || null,
  onClose: imagePreviewOption.value.onClose || props.onClose || null,
  onChange: imagePreviewOption.value.onChange || props.onChange || null,
  onLongPress: imagePreviewOption.value.onLongPress || props.onLongPress || null
}))

// 监听选项变化
watch(
  () => imagePreviewOption.value,
  (newVal: ImagePreviewOptions) => {
    reset(newVal)
  },
  { deep: true, immediate: true }
)

// 监听 show 变化，触发事件
watch(
  () => state.show,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      emit('open')
      if (isFunction(options.value.onOpen)) {
        options.value.onOpen()
      }
    } else if (!newVal && oldVal) {
      emit('close')
      if (isFunction(options.value.onClose)) {
        options.value.onClose()
      }
    }
  }
)

/**
 * 重置选项
 */
function reset(option: ImagePreviewOptions) {
  state.show = isDef(option.show) ? option.show! : false

  if (state.show) {
    state.images = isDef(option.images) ? option.images! : props.images || []
    state.currentIndex = isDef(option.startPosition) ? option.startPosition! : props.startPosition
  }
}

/**
 * 进入动画完成
 */
function handleEnter() {
  state.visible = true
}

/**
 * 离开动画完成
 */
function handleAfterLeave() {
  state.visible = false
  state.images = []
  state.currentIndex = 0
}

/**
 * 打开预览
 */
function open(opts?: ImagePreviewOptions | string[]) {
  if (opts) {
    if (Array.isArray(opts)) {
      state.images = opts
    } else {
      state.images = isDef(opts.images) ? opts.images! : props.images || []
      state.currentIndex = isDef(opts.startPosition) ? opts.startPosition! : props.startPosition
    }
  }
  state.show = true
}

/**
 * 关闭预览
 */
function close() {
  state.show = false
}

/**
 * 设置当前图片
 */
function setActive(index: number) {
  if (index >= 0 && index < state.images.length) {
    state.currentIndex = index
  }
}

/**
 * 处理轮播切换
 */
function handleSwiperChange({ current }: { current: number }) {
  state.currentIndex = current
  emit('change', { index: current })
  if (isFunction(options.value.onChange)) {
    options.value.onChange(current)
  }
}

/**
 * 处理图片点击
 */
function handleImageClick({ index }: { index: number }) {
  emit('click', { index })
  if (options.value.closeOnClick) {
    close()
  }
}

/**
 * 处理长按
 */
function handleLongPress(image: string | SwiperItem) {
  const url = getImageUrl(image)
  emit('long-press', { image: url })
  if (isFunction(options.value.onLongPress)) {
    options.value.onLongPress(url)
  }
}

defineExpose<ImagePreviewExpose>({
  open,
  close,
  setActive
})
</script>

<style lang="scss">
@use './index.scss';
</style>
