<!--
 * @Author: weisheng
 * @Date: 2026-01-09 16:05:24
 * @LastEditTime: 2026-02-26 14:41:35
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-ui/src/uni_modules/wot-ui/components/wd-steps/wd-steps.vue
 * 记得注释
-->
<template>
  <view :class="`wd-steps ${customClass} ${vertical ? 'is-vertical' : ''}`" :style="customStyle">
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-steps',
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
import { useChildren } from '../../composables/useChildren'
import { STEPS_KEY, stepsProps } from './types'

const props = defineProps(stepsProps)

const { linkChildren } = useChildren(STEPS_KEY)

linkChildren({ props })
</script>
<style lang="scss">
@use './index.scss';
</style>
