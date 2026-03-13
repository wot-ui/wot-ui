<template>
  <view :class="['wd-cell-group', border ? 'is-border' : '', customClass, insert ? 'wd-cell-group--insert' : '']" :style="customStyle">
    <view v-if="title || value || $slots.title || $slots.value" class="wd-cell-group__title">
      <!--左侧标题-->
      <view class="wd-cell-group__left">
        <text v-if="!$slots.title">{{ title }}</text>
        <slot v-else name="title"></slot>
      </view>
      <!--右侧标题-->
      <view class="wd-cell-group__right">
        <text v-if="!$slots.value">{{ value }}</text>
        <slot v-else name="value"></slot>
      </view>
    </view>
    <view class="wd-cell-group__body">
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-cell-group',
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
import { useChildren } from '../composables/useChildren'
import { CELL_GROUP_KEY, cellGroupProps } from './types'

const props = defineProps(cellGroupProps)

const { linkChildren } = useChildren(CELL_GROUP_KEY)

// 向子组件提供共享属性
linkChildren({ props })
</script>

<style lang="scss">
@use './index.scss';
</style>
