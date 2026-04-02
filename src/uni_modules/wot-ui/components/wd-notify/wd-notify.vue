<template>
  <wd-popup
    v-model="state.visible"
    :custom-style="popupStyle"
    :position="state.position"
    :z-index="state.zIndex"
    :modal="false"
    :root-portal="state.rootPortal"
    @leave="onClosed"
    @enter="onOpened"
  >
    <view
      :class="[
        'wd-notify',
        `wd-notify--${state.type}`,
        `wd-notify--${state.position}`,
        state.variant === 'floating' ? 'wd-notify--floating' : '',
        customClass
      ]"
      :style="rootStyle"
      @click="onClick"
    >
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
import { inject, computed, watch, ref, type CSSProperties } from 'vue'
import { notifyProps, type NotifyProps } from './types'
import { getNotifyOptionKey } from '.'
import { addUnit, isFunction, objToStyle } from '../../common/util'

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
const popupStyle = computed(() => {
  const { safeHeight, position, variant } = state.value
  const styles: CSSProperties = {
    overflow: 'unset',
    background: 'transparent'
  }
  switch (position) {
    case 'top':
      styles['top'] = `calc(var(--window-top) + ${addUnit(safeHeight || 0)})`
      break
    case 'bottom':
      styles['bottom'] = 'var(--window-bottom)'
      break
    default:
      break
  }
  if (variant === 'floating') {
    styles['left'] = '12px'
    styles['right'] = '12px'
    styles['width'] = 'auto'
  }
  return objToStyle(styles)
})

const rootStyle = computed(() => {
  const { customStyle } = props
  const style: CSSProperties = {}
  if (state.value.color) {
    style.color = state.value.color
  }
  if (state.value.background) {
    style.background = state.value.background
  }
  return `${objToStyle(style)};${customStyle}`
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
