<template>
  <view :class="rootClass" :id="slideVerifyId" :style="rootStyle">
    <!-- 背景提示文字 -->
    <view class="wd-slide-verify__text">
      <slot name="text">
        <text class="wd-slide-verify__text-inner">
          {{ slideVerifyText }}
        </text>
      </slot>
    </view>
    <!-- 滑过区域，包含滑块 -->
    <view class="wd-slide-verify__track" :style="trackStyle">
      <view class="wd-slide-verify__track-text">
        <slot name="success-text">
          {{ slideVerifySuccessText }}
        </slot>
      </view>
      <!-- 滑块 -->
      <view class="wd-slide-verify__button" @touchstart.prevent="onTouchStart" @touchmove.prevent="onTouchMove" @touchend="onTouchEnd">
        <slot v-if="isPass" name="success-icon">
          <wd-icon custom-class="wd-slide-verify__button-icon wd-slide-verify__button-icon--success" :name="successIcon" :size="successIconSize" />
        </slot>

        <slot v-else name="icon">
          <wd-icon custom-class="wd-slide-verify__button-icon" :name="icon" :size="iconSize" />
        </slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-slide-verify',
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
import { ref, computed, onMounted, onBeforeUnmount, getCurrentInstance, type CSSProperties } from 'vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import { slideVerifyProps, type SlideVerifyEmits, type SlideVerifyExpose } from './types'
import { useTouch } from '../composables/useTouch'
import { useTranslate } from '../composables/useTranslate'
import { objToStyle, isDef, getRect, uuid } from '../common/util'

const props = defineProps(slideVerifyProps)
const emit = defineEmits<SlideVerifyEmits>()

const slideVerifyId = ref<string>(`wd-slide-verify-${uuid()}`)

const { proxy } = getCurrentInstance()!

const touch = useTouch()
const { translate } = useTranslate('slideVerify')

const slideVerifyText = computed(() => {
  return isDef(props.text) && props.text !== '' ? props.text : translate('text')
})

const slideVerifySuccessText = computed(() => {
  return isDef(props.successText) && props.successText !== '' ? props.successText : translate('successText')
})

const rootClass = computed(() => {
  return [
    'wd-slide-verify',
    {
      'is-disabled': props.disabled,
      'is-success': isPass.value,
      'is-dragging': isDragging.value
    },
    props.customClass
  ]
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.backgroundColor)) {
    style.background = props.backgroundColor
  }
  return `${objToStyle(style)}${props.customStyle}`
})

const trackStyle = computed(() => {
  const style: CSSProperties = {
    width: `${currentPosition.value + containerHeight.value}px`,
    transition: isResetting.value ? 'all 0.3s ease' : 'none'
  }
  if (isDef(props.activeBackgroundColor)) {
    style.background = props.activeBackgroundColor
  }
  if (currentPosition.value === 0) {
    style.background = 'transparent'
  }
  return objToStyle(style)
})

const containerWidth = ref<number>(0)
const containerHeight = ref<number>(0)

onMounted(async () => {
  try {
    const rect = await getRect(`#${slideVerifyId.value}`, false, proxy)
    containerWidth.value = rect.width || 0
    containerHeight.value = rect.height || 0
  } catch (e) {
    // 测量失败时保持 0，禁止拖动
  }
})

// 最大位置，基于实测容器宽高计算
const maxPosition = computed(() => {
  const { value: w } = containerWidth
  const { value: h } = containerHeight
  if (w <= 0 || h <= 0) return 0
  return Math.max(0, w - h)
})

// 完成状态判断
const isComplete = computed(() => {
  const distance = Math.abs(maxPosition.value - currentPosition.value)
  return distance <= props.tolerance // 容差范围内完成
})

// 位置状态
const currentPosition = ref<number>(0)
const startPosition = ref<number>(0)
// 成功状态
const isPass = ref<boolean>(false)
// 拖动状态
const isDragging = ref<boolean>(false)
// 回弹
const isResetting = ref(false)

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))
const updatePosition = (position: number) => {
  // 限制位置在允许范围内
  currentPosition.value = clamp(position, 0, maxPosition.value)
}

const isDisabled = computed(() => props.disabled || isPass.value)
const onTouchStart = (event: TouchEvent): void => {
  if (isDisabled.value || isDragging.value) return

  touch.touchStart(event)
  startPosition.value = currentPosition.value
  isDragging.value = true
}

const onTouchMove = (event: TouchEvent): void => {
  if (isDisabled.value || !isDragging.value) return

  touch.touchMove(event)
  updatePosition(startPosition.value + touch.deltaX.value)
}
// 控制回弹
const timer = ref<ReturnType<typeof setTimeout> | null>(null)

const onTouchEnd = (): void => {
  if (isDisabled.value || !isDragging.value) return
  isDragging.value = false

  if (isComplete.value) {
    // 完成
    updatePosition(maxPosition.value)
    isPass.value = true
    emit('success')
  } else {
    isResetting.value = true
    // 失败回到起点
    updatePosition(0)
    emit('fail')

    timer.value = setTimeout(() => {
      isResetting.value = false
    }, 300)
  }
}

onBeforeUnmount(() => {
  if (timer.value !== null) {
    clearTimeout(timer.value)
    timer.value = null
  }
})

/**
 * 重置验证组件到初始状态
 */
const reset = () => {
  if (timer.value !== null) {
    clearTimeout(timer.value)
    timer.value = null
  }
  isResetting.value = true
  currentPosition.value = 0
  startPosition.value = 0
  isPass.value = false
  isDragging.value = false
  timer.value = setTimeout(() => {
    isResetting.value = false
  }, 300)
}

defineExpose<SlideVerifyExpose>({ reset })
</script>

<style lang="scss">
@use './index.scss';
</style>
