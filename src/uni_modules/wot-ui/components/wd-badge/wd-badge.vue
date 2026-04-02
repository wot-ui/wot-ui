<template>
  <view :class="['wd-badge', customClass]" :style="customStyle">
    <slot></slot>
    <view
      v-if="shouldShowBadge"
      :class="[
        'wd-badge__content',
        props.border ? 'is-border' : '',
        'is-fixed',
        type ? 'wd-badge__content--' + type : '',
        isDot ? 'is-dot' : '',
        shape ? 'is-' + shape : ''
      ]"
      :style="contentStyle"
    >
      {{ content }}
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-badge',
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
import { computed, type CSSProperties } from 'vue'
import { badgeProps } from './types'
import { addUnit, isDef, isNumber, objToStyle } from '../../common/util'

const props = defineProps(badgeProps)

/**
 * 计算徽标显示内容
 */
const content = computed(() => {
  const { value, max, isDot } = props
  if (isDot) return ''
  if (value && max && isNumber(value) && !Number.isNaN(value) && !Number.isNaN(max)) {
    return max < value ? `${max}+` : value
  }
  return value
})

/**
 * 计算徽标样式
 */
const contentStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.bgColor)) {
    style.backgroundColor = props.bgColor
  }

  if (isDef(props.top)) {
    style.top = addUnit(props.top)
  }

  if (isDef(props.right)) {
    style.right = addUnit(props.right)
  }
  return objToStyle(style)
})

/**
 * 是否展示徽标
 */
const shouldShowBadge = computed(() => !props.hidden && (content.value || (content.value === 0 && props.showZero) || props.isDot))
</script>

<style lang="scss">
@use './index.scss';
</style>
