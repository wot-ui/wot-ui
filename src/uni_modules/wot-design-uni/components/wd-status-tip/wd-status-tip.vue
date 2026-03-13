<template>
  <view :class="`wd-status-tip  ${customClass}`" :style="customStyle">
    <slot name="image">
      <wd-icon :name="icon" custom-class="wd-status-tip__icon" :custom-style="iconStyle"></wd-icon>
    </slot>
    <view v-if="tip" class="wd-status-tip__text">{{ tip }}</view>
    <slot name="bottom" />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-status-tip',
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
import { computed, type CSSProperties } from 'vue'
import { addUnit, objToStyle } from '../common/util'
import { statusTipProps } from './types'

const props = defineProps(statusTipProps)

/**
 * 图标样式
 */
const iconStyle = computed(() => {
  let style: CSSProperties = {}
  if (props.iconSize) {
    style['font-size'] = addUnit(props.iconSize)
    style['width'] = addUnit(props.iconSize)
    style['height'] = addUnit(props.iconSize)
  }
  return `${objToStyle(style)}`
})
</script>
<style lang="scss">
@use './index.scss';
</style>
