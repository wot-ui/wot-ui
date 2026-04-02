<template>
  <view :class="`wd-loading wd-loading--${direction} ${customClass}`" :style="rootStyle">
    <view :class="`wd-loading__spinner wd-loading__spinner--${type} ${customSpinnerClass}`" :style="spinnerStyle">
      <template v-if="type === 'circular'">
        <view class="wd-loading__spinner-wraper"></view>
      </template>
      <template v-if="type === 'spinner'">
        <view class="wd-loading__spinner-wraper">
          <view class="wd-loading__spinner-dot" v-for="i in dots" :key="i"></view>
        </view>
      </template>
      <template v-else-if="type === 'dots'">
        <view class="wd-loading__spinner-wraper">
          <view class="wd-loading__spinner-dot" v-for="i in 3" :key="i"></view>
        </view>
      </template>
    </view>
    <view class="wd-loading__text" v-if="$slots.default || text">
      <slot>{{ text }}</slot>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-loading',
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
import { computed, type CSSProperties } from 'vue'

import { objToStyle, addUnit, isDef } from '../../common/util'
import { loadingProps } from './types'

const props = defineProps(loadingProps)

// 长度为 12 的数组
const dots = Array.from({ length: 12 }, (_, i) => i)

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.color)) {
    style.color = props.color
  }
  if (props.inheritColor) {
    style.color = 'inherit'
  }
  return `${objToStyle(style)} ${props.customStyle}`
})

const spinnerStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.size)) {
    style.height = addUnit(props.size)
    style.width = addUnit(props.size)
  }
  return objToStyle(style)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
