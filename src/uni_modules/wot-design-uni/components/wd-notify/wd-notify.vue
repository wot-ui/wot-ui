<template>
  <wd-popup
    v-model="state.visible"
    :custom-style="customStyle"
    :position="state.position"
    :z-index="state.zIndex"
    :duration="250"
    :modal="false"
    :root-portal="state.rootPortal"
    @leave="onClosed"
    @enter="onOpened"
  >
    <view class="wd-notify" :class="[`wd-notify--${state.type}`]" :style="{ color: state.color, background: state.background }" @click="onClick">
      <slot name="prefix">
        <wd-icon v-if="iconName" :name="iconName" custom-class="wd-notify__prefix"></wd-icon>
      </slot>
      <view class="wd-notify__content">
        <slot>
          <text>{{ state.message }}</text>
        </slot>
      </view>
      <slot name="close" v-if="state.closable">
        <wd-icon name="close" custom-class="wd-notify__close" @click="handleClose"></wd-icon>
      </slot>
    </view>
  </wd-popup>
</template>
<script lang="ts">
export default {
  name: 'wd-notify',
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
import wdPopup from '../wd-popup/wd-popup.vue'
import { inject, computed, watch, ref } from 'vue'
import { notifyProps, type NotifyProps } from './types'
import { getNotifyOptionKey } from '.'
import { addUnit, isFunction } from '../common/util'

const props = defineProps(notifyProps)
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'click', event: MouseEvent): void
  (e: 'closed'): void
  (e: 'opened'): void
}>()
const state = inject(getNotifyOptionKey(props.selector), ref<NotifyProps>(props))

/**
 * 根据消息类型获取对应的图标
 */
const iconName = computed(() => {
  const { type } = state.value
  switch (type) {
    case 'success':
      return 'check-circle-fill'
    case 'warning':
      return 'exclamation-circle-fill'
    case 'danger':
      return 'close-circle-fill'
    default:
      return 'info-circle-fill'
  }
})

/**
 * 计算通知的自定义样式
 */
const customStyle = computed(() => {
  const { safeHeight, position } = state.value
  let customStyle: string = ''
  switch (position) {
    case 'top':
      customStyle = `top: calc(var(--window-top) + ${addUnit(safeHeight || 0)})`
      break
    case 'bottom':
      customStyle = 'bottom: var(--window-bottom)'
      break
    default:
      break
  }
  return customStyle
})

/**
 * 处理点击事件
 * @param {MouseEvent} event 鼠标事件
 */
const onClick = (event: MouseEvent) => {
  if (isFunction(state.value.onClick)) return state.value.onClick(event)
  emits('click', event)
}
/**
 * 处理关闭动画结束事件
 */
const onClosed = () => {
  if (isFunction(state.value.onClosed)) return state.value.onClosed()
  emits('closed')
}
/**
 * 处理打开动画结束事件
 */
const onOpened = () => {
  if (isFunction(state.value.onOpened)) return state.value.onOpened()
  emits('opened')
}
/**
 * 点击关闭按钮处理
 */
const handleClose = () => {
  state.value.visible = false
}

watch(
  () => state.value.visible,
  (visible) => {
    emits('update:visible', visible as boolean)
  },
  { deep: true }
)
</script>

<style lang="scss">
@use './index.scss';
</style>
