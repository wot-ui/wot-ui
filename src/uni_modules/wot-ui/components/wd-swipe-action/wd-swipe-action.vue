<template>
  <!--注意阻止横向滑动的穿透：横向移动时阻止冒泡-->
  <view
    :class="`wd-swipe-action ${customClass}`"
    :style="customStyle"
    @click.stop="handleClick()"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag"
  >
    <!--容器-->
    <view class="wd-swipe-action__wrapper" :style="wrapperStyle">
      <!--左侧操作-->
      <view class="wd-swipe-action__left" @click.stop="handleClick('left')">
        <slot name="left" />
      </view>
      <!--内容-->
      <slot />
      <!--右侧操作-->
      <view class="wd-swipe-action__right" @click.stop="handleClick('right')">
        <slot name="right" />
      </view>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-swipe-action',
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
import { getCurrentInstance, inject, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { callInterceptor } from '../../common/interceptor'
import { closeOther, pushToQueue, removeFromQueue } from '../../common/clickoutside'
import { type Queue, queueKey } from '../../composables/useQueue'
import { useTouch } from '../../composables/useTouch'
import { getRect } from '../../common/util'
import {
  swipeActionProps,
  type SwipeActionEmits,
  type SwipeActionExpose,
  type SwipeActionPosition,
  type SwipeActionReason,
  type SwipeActionStatus
} from './types'

const props = defineProps(swipeActionProps)
const emit = defineEmits<SwipeActionEmits>()

const queue = inject<Queue | null>(queueKey, null)

/** 内容容器内联样式（平移与过渡） */
const wrapperStyle = ref<string>('')

/** 本次滑动开始时容器的偏移量（px） */
const originOffset = ref<number>(0)
/** 当前容器的偏移量（px） */
const wrapperOffset = ref<number>(0)
/** 是否处于手指滑动中（用于区分程序设置与手势） */
const touching = ref<boolean>(false)

const touch = useTouch()

const { proxy } = getCurrentInstance() as any

watch(
  () => props.modelValue,
  (value, old) => {
    changeState(value, old)
  },
  {
    deep: true
  }
)

onBeforeMount(() => {
  if (queue && queue.pushToQueue) {
    queue.pushToQueue(proxy)
  } else {
    pushToQueue(proxy)
  }
  originOffset.value = 0
  wrapperOffset.value = 0
  touching.value = false
})

onMounted(() => {
  touching.value = true
  changeState(props.modelValue)
  touching.value = false
})

onBeforeUnmount(() => {
  if (queue && queue.removeFromQueue) {
    queue.removeFromQueue(proxy)
  } else {
    removeFromQueue(proxy)
  }
})

/**
 * 根据 modelValue 切换滑动状态（展开左/右或关闭）
 * @param value 目标状态
 * @param old 上一状态，用于 beforeClose 等逻辑
 */
function changeState(value: SwipeActionStatus, old?: SwipeActionStatus) {
  if (props.disabled) {
    return
  }
  getWidths().then(([leftWidth, rightWidth]) => {
    switch (value) {
      case 'close':
        // 调用此函数时，偏移量本就是0
        if (wrapperOffset.value === 0) return
        close('value', old)
        break
      case 'left':
        swipeMove(leftWidth)
        break
      case 'right':
        swipeMove(-rightWidth)
        break
    }
  })
}

/**
 * 获取左侧、右侧操作区域宽度（px）
 * @returns [左侧宽度, 右侧宽度]
 */
function getWidths(): Promise<[number, number]> {
  return Promise.all([
    getRect('.wd-swipe-action__left', false, proxy).then((rect) => {
      return rect.width ? rect.width : 0
    }),
    getRect('.wd-swipe-action__right', false, proxy).then((rect) => {
      return rect.width ? rect.width : 0
    })
  ])
}

/**
 * 设置内容容器横向偏移（带动画或跟随手指）
 * @param offset 偏移量（px），正数为向左滑出左按钮，负数为向右滑出右按钮
 */
function swipeMove(offset = 0) {
  const transform = `translate3d(${offset}px, 0, 0)`
  const transition = touching.value ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)'
  wrapperStyle.value = `
        -webkit-transform: ${transform};
        -webkit-transition: ${transition};
        transform: ${transform};
        transition: ${transition};
      `
  wrapperOffset.value = offset
}

/**
 * 处理点击：若已展开则关闭并触发 click 事件
 * @param position 点击位置（'left' | 'right' | undefined 表示内容区）
 */
function handleClick(position?: SwipeActionPosition) {
  if (props.disabled || wrapperOffset.value === 0) {
    return
  }

  const clickPosition = position || 'inside'
  close('click', clickPosition, () => {
    emit('click', {
      value: clickPosition
    })
  })
}

/**
 * 触摸开始：记录初始偏移并关闭其他已展开的滑动项
 * @param event 触摸事件
 */
function startDrag(event: TouchEvent) {
  if (props.disabled) return

  originOffset.value = wrapperOffset.value
  touch.touchStart(event)
  if (queue && queue.closeOther) {
    queue.closeOther(proxy)
  } else {
    closeOther(proxy)
  }
}

/**
 * 触摸移动：根据横向位移更新容器偏移，展示左/右操作按钮
 * @param event 触摸事件
 */
function onDrag(event: TouchEvent) {
  if (props.disabled) return

  touch.touchMove(event)
  if (touch.direction.value === 'vertical') {
    return
  } else {
    event.preventDefault()
    event.stopPropagation()
  }

  touching.value = true

  const offset = originOffset.value + touch.deltaX.value
  getWidths().then(([leftWidth, rightWidth]) => {
    if ((leftWidth === 0 && offset > 0) || (rightWidth === 0 && offset < 0)) {
      swipeMove(0)
      return startDrag(event)
    }
    if (leftWidth !== 0 && offset >= leftWidth) {
      swipeMove(leftWidth)
      return startDrag(event)
    } else if (rightWidth !== 0 && -offset >= rightWidth) {
      swipeMove(-rightWidth)
      return startDrag(event)
    }
    swipeMove(offset)
  })
}

/**
 * 触摸结束：根据滑动距离与阈值决定保持展开或收起
 */
function endDrag() {
  if (props.disabled) return
  const THRESHOLD = 0.3
  touching.value = false

  getWidths().then(([leftWidth, rightWidth]) => {
    if (
      originOffset.value < 0 && // 之前展示的是右按钮
      wrapperOffset.value < 0 && // 目前仍然是右按钮
      wrapperOffset.value - originOffset.value < rightWidth * THRESHOLD // 并且滑动的范围不超过右边框阀值
    ) {
      swipeMove(-rightWidth) // 回归右按钮
      emit('update:modelValue', 'right')
    } else if (
      originOffset.value > 0 && // 之前展示的是左按钮
      wrapperOffset.value > 0 && // 现在仍然是左按钮
      originOffset.value - wrapperOffset.value < leftWidth * THRESHOLD // 并且滑动的范围不超过左按钮阀值
    ) {
      swipeMove(leftWidth) // 回归左按钮
      emit('update:modelValue', 'left')
    } else if (
      rightWidth > 0 &&
      originOffset.value >= 0 && // 之前是初始状态或者展示左按钮显
      wrapperOffset.value < 0 && // 现在展示右按钮
      Math.abs(wrapperOffset.value) > rightWidth * THRESHOLD // 视图中已经展示的右按钮长度超过阀值
    ) {
      swipeMove(-rightWidth)
      emit('update:modelValue', 'right')
    } else if (
      leftWidth > 0 &&
      originOffset.value <= 0 && // 之前初始状态或者右按钮显示
      wrapperOffset.value > 0 && // 现在左按钮
      Math.abs(wrapperOffset.value) > leftWidth * THRESHOLD // 视图中已经展示的左按钮长度超过阀值
    ) {
      swipeMove(leftWidth)
      emit('update:modelValue', 'left')
    } else {
      // 回归初始状态
      close('swipe')
    }
  })
}

/**
 * 关闭已展开的操作按钮并同步 modelValue；会调用 beforeClose 钩子
 * @param reason 关闭原因
 * @param position 关闭时的操作位置（swipe 时根据当前偏移推断）
 * @param afterClose 关闭成功后的回调
 */
function close(reason: SwipeActionReason, position?: SwipeActionPosition, afterClose?: () => void) {
  if (reason === 'swipe' && originOffset.value === 0) {
    return swipeMove(0)
  }

  let closePosition = position

  if (reason === 'swipe' && originOffset.value > 0) {
    closePosition = 'left'
  } else if (reason === 'swipe' && originOffset.value < 0) {
    closePosition = 'right'
  }

  const doClose = () => {
    swipeMove(0)
    if (props.modelValue !== 'close') {
      emit('update:modelValue', 'close')
    }
    afterClose?.()
  }

  if (reason && closePosition) {
    callInterceptor(props.beforeClose, {
      args: [reason, closePosition],
      done: doClose
    })
  } else {
    doClose()
  }
}

defineExpose<SwipeActionExpose>({ close })
</script>
<style lang="scss">
@use './index.scss';
</style>
