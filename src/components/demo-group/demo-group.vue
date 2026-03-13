<!--
 * @Author: weisheng
 * @Date: 2026-01-16 17:48:12
 * @LastEditTime: 2026-02-05 11:59:43
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/components/demo-group/demo-group.vue
 * 记得注释
-->
<template>
  <view :class="['demo-group', transparent ? 'is-transparent' : '', customClass]">
    <view class="demo-group__title">{{ title }}</view>
    <view class="demo-group__container" :style="transparent ? '' : style">
      <slot />
    </view>
  </view>
</template>
<script lang="ts">
export default {
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
import { computed } from 'vue'

interface Props {
  customClass?: string
  title?: string
  ver?: number | string
  hor?: number | string
  transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  customClass: '',
  ver: 10,
  hor: 15,
  transparent: false
})

const style = computed(() => {
  return `margin: 0 ${props.hor}px;padding:${props.ver}px 0;`
})
</script>
<style lang="scss" scoped>
.demo-group {
  position: relative;
  background: $filled-oppo;

  &.is-transparent {
    background: transparent;
  }
}
</style>
