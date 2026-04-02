<template>
  <view
    @touchmove.stop.prevent="handleTouchMove"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    :class="`wd-fab ${customClass}`"
    :style="rootStyle"
    @click.stop=""
  >
    <view @click.stop="" :style="{ visibility: inited ? 'visible' : 'hidden' }" id="trigger">
      <slot name="trigger" :disabled="disabled">
        <wd-button
          @click="handleClick"
          :icon="isActive ? activeIcon : inactiveIcon"
          custom-class="wd-fab__trigger"
          round
          :type="type"
          :disabled="disabled"
        ></wd-button>
      </slot>
    </view>
    <wd-transition
      v-if="expandable"
      :enter-class="`wd-fab__transition-enter--${fabDirection}`"
      enter-active-class="wd-fab__transition-enter-active"
      :leave-to-class="`wd-fab__transition-leave-to--${fabDirection}`"
      leave-active-class="wd-fab__transition-leave-active"
      :custom-class="`wd-fab__actions wd-fab__actions--${fabDirection}`"
      :show="isActive"
      :duration="300"
    >
      <slot></slot>
    </wd-transition>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-fab',
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
import wdButton from '../wd-button/wd-button.vue'
import wdTransition from '../wd-transition/wd-transition.vue'
import { type CSSProperties, computed, ref, watch, inject, getCurrentInstance, onBeforeUnmount, onMounted, nextTick } from 'vue'
import { getRect, getSystemInfo, isDef, isH5, objToStyle } from '../../common/util'
import { type Queue, queueKey } from '../../composables/useQueue'
import { closeOther, pushToQueue, removeFromQueue } from '../../common/clickoutside'
import { fabProps, type FabExpose } from './types'
import { reactive } from 'vue'
import { useRaf } from '../../composables/useRaf'

const props = defineProps(fabProps)
const emit = defineEmits(['update:active', 'click'])

/** 是否完成初始化 */
const inited = ref<boolean>(false)
/** 是否处于激活（展开）状态 */
const isActive = ref<boolean>(false)
const queue = inject<Queue | null>(queueKey, null)
const { proxy } = getCurrentInstance() as any

watch(
  () => props.active,
  (newValue) => {
    isActive.value = newValue
  },
  { immediate: true, deep: true }
)

watch(
  () => isActive.value,
  (newValue) => {
    if (newValue) {
      if (queue && queue.closeOther) {
        queue.closeOther(proxy)
      } else {
        closeOther(proxy)
      }
    }
  }
)

const fabDirection = ref(props.direction)

watch(
  () => props.direction,
  (direction) => (fabDirection.value = direction)
)

watch(
  () => props.position,
  () => initPosition()
)

/** 浮动按钮顶部位置 */
const top = ref<number>(0)
/** 浮动按钮左侧位置 */
const left = ref<number>(0)
/** 屏幕尺寸信息 */
const screen = reactive({ width: 0, height: 0 })
/** 浮动按钮尺寸 */
const fabSize = reactive({ width: 56, height: 56 })
/** 浮动按钮可移动边界 */
const bounding = reactive({
  minTop: 0,
  minLeft: 0,
  maxTop: 0,
  maxLeft: 0
})

/**
 * 获取浮动按钮和屏幕的边界信息
 */
async function getBounding() {
  const sysInfo = getSystemInfo()
  try {
    const trigerInfo = await getRect('#trigger', false, proxy)
    fabSize.width = trigerInfo.width || 56
    fabSize.height = trigerInfo.height || 56
  } catch (error) {
    console.log(error)
  }

  const { top = 16, left = 16, right = 16, bottom = 16 } = props.gap
  screen.width = sysInfo.windowWidth
  screen.height = isH5 ? sysInfo.windowTop + sysInfo.windowHeight : sysInfo.windowHeight
  bounding.minTop = isH5 ? sysInfo.windowTop + top : top
  bounding.minLeft = left
  bounding.maxLeft = screen.width - fabSize.width - right
  bounding.maxTop = screen.height - fabSize.height - bottom
}

/**
 * 根据 position 属性初始化浮动按钮位置
 */
function initPosition() {
  const pos = props.position
  const { minLeft, minTop, maxLeft, maxTop } = bounding
  const centerY = (maxTop + minTop) / 2
  const centerX = (maxLeft + minLeft) / 2

  switch (pos) {
    case 'left-top':
      top.value = minTop
      left.value = minLeft
      break
    case 'right-top':
      top.value = minTop
      left.value = maxLeft
      break
    case 'left-bottom':
      top.value = maxTop
      left.value = minLeft
      break
    case 'right-bottom':
      top.value = maxTop
      left.value = maxLeft
      break
    case 'left-center':
      top.value = centerY
      left.value = minLeft
      break
    case 'right-center':
      top.value = centerY
      left.value = maxLeft
      break
    case 'top-center':
      top.value = minTop
      left.value = centerX
      break
    case 'bottom-center':
      top.value = maxTop
      left.value = centerX
      break
  }
}

/** 按下时触摸点相对于元素的偏移量 */
const touchOffset = reactive({ x: 0, y: 0 })
/** 是否启用吸附动画 */
const attractTransition = ref<boolean>(false)

/**
 * 处理触摸开始事件
 * @param {TouchEvent} e 触摸事件对象
 */
function handleTouchStart(e: TouchEvent) {
  if (props.draggable === false) return

  const touch = e.touches[0]
  touchOffset.x = touch.clientX - left.value
  touchOffset.y = touch.clientY - top.value
  attractTransition.value = false
}

/**
 * 处理触摸移动事件，实现拖动功能
 * @param {TouchEvent} e 触摸事件对象
 */
function handleTouchMove(e: TouchEvent) {
  if (props.draggable === false) return

  const touch = e.touches[0]
  const { minLeft, minTop, maxLeft, maxTop } = bounding
  let x = touch.clientX - touchOffset.x
  let y = touch.clientY - touchOffset.y

  if (x < minLeft) x = minLeft
  else if (x > maxLeft) x = maxLeft

  if (y < minTop) y = minTop
  else if (y > maxTop) y = maxTop

  top.value = y
  left.value = x
}

/**
 * 处理触摸结束事件，实现吸附效果
 */
function handleTouchEnd() {
  if (props.draggable === false) return

  const screenCenterX = screen.width / 2
  const fabCenterX = left.value + fabSize.width / 2
  attractTransition.value = true
  if (fabCenterX < screenCenterX) {
    left.value = bounding.minLeft
    fabDirection.value = 'right'
  } else {
    left.value = bounding.maxLeft
    fabDirection.value = 'left'
  }
}

/**
 * 计算浮动按钮的根元素样式
 */
const rootStyle = computed(() => {
  const style: CSSProperties = {
    top: top.value + 'px',
    left: left.value + 'px',
    transition: attractTransition.value ? 'all ease 0.3s' : 'none'
  }
  if (isDef(props.zIndex)) {
    style['z-index'] = props.zIndex
  }
  return `${objToStyle(style)}${props.customStyle}`
})

onMounted(() => {
  if (queue && queue.pushToQueue) {
    queue.pushToQueue(proxy)
  } else {
    pushToQueue(proxy)
  }

  const { start } = useRaf(async () => {
    await getBounding()
    initPosition()
    inited.value = true
  })
  start()
})

onBeforeUnmount(() => {
  if (queue && queue.removeFromQueue) {
    queue.removeFromQueue(proxy)
  } else {
    removeFromQueue(proxy)
  }
})

/**
 * 处理点击事件
 */
function handleClick() {
  if (props.disabled) {
    return
  }
  if (!props.expandable) {
    emit('click')
    return
  }
  isActive.value = !isActive.value
  emit('update:active', isActive.value)
}

/**
 * 展开菜单
 */
function open() {
  isActive.value = true
  emit('update:active', true)
}

/**
 * 收起菜单
 */
function close() {
  isActive.value = false
  emit('update:active', false)
}

defineExpose<FabExpose>({
  open,
  close
})
</script>

<style lang="scss">
@use './index.scss';
</style>
