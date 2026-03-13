<template>
  <view :class="`wd-sort-button ${line ? 'wd-sort-button--line' : ''} ${customClass}`" :style="customStyle" @click="handleClick">
    <view class="wd-sort-button__wrapper">
      <view :class="`wd-sort-button__left ${modelValue !== 0 ? 'is-active' : ''}`">
        {{ title }}
      </view>
      <view class="wd-sort-button__right">
        <wd-icon name="caret-up" :custom-class="`wd-sort-button__icon-up ${modelValue === -1 ? 'wd-sort-button__icon-up--active' : ''}`" />
        <wd-icon name="caret-down" :custom-class="`wd-sort-button__icon-down  ${modelValue === 1 ? 'wd-sort-button__icon-down--active' : ''}`" />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-sort-button',
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
import { sortButtonProps, type SortButtonEmits, type SortButtonValue } from './types'

const props = defineProps(sortButtonProps)

const emit = defineEmits<SortButtonEmits>()

/**
 * 处理点击事件，按排序循环切换排序方向
 * descFirst 开启时循环：0 → -1 → 1 → (0 或 -1)
 * descFirst 关闭时循环：0 → 1 → -1 → (0 或 1)
 */
function handleClick() {
  let { modelValue: value, allowReset, descFirst } = props
  let next: SortButtonValue
  if (descFirst) {
    if (value === 0) {
      next = -1
    } else if (value === -1) {
      next = 1
    } else {
      next = allowReset ? 0 : -1
    }
  } else {
    if (value === 0) {
      next = 1
    } else if (value === 1) {
      next = -1
    } else {
      next = allowReset ? 0 : 1
    }
  }
  emit('update:modelValue', next)
  emit('change', { value: next })
}
</script>
<style lang="scss">
@use './index.scss';
</style>
