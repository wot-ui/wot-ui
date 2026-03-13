<!--
 * @Author: weisheng
 * @Date: 2025-07-17 10:34:02
 * @LastEditTime: 2026-03-13 13:44:31
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/components/demo-block/demo-block.vue
 * 记得注释
-->
<template>
  <view :class="['demo-block', transparent ? 'demo-block--transparent' : '', customClass]">
    <view class="demo-block__title">{{ title }}</view>
    <view class="demo-block__container" :style="transparent ? '' : style">
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
import { ref, watch } from 'vue'

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

const style = ref<string>('')

watch(
  [() => props.ver, () => props.hor],
  () => {
    setStyle()
  },
  { deep: true, immediate: true }
)

function setStyle() {
  style.value = `padding: ${props.ver}px ${props.hor}px;`
}
</script>
<style lang="scss" scoped>
// demo-block 文本颜色
$demo-block-color: var(--wot-demo-block-color, $text-secondary) !default;
// demo-block 区块背景色
$demo-block-bg: var(--wot-demo-block-bg, $filled-oppo) !default;
// demo-block 上下外边距
$demo-block-margin-vertical: var(--wot-demo-block-margin-vertical, $spacing-extra-loose) !default;
// demo-block 标题内边距
$demo-block-title-padding: var(--wot-demo-block-title-padding, #{$padding-main} #{$padding-extra-loose}) !default;
// demo-block 标题字号
$demo-block-title-font-size: var(--wot-demo-block-title-font-size, $typography-label-size-large) !default;

.demo-block {
  position: relative;
  color: $demo-block-color;
  background: $demo-block-bg;

  &:not(:first-child) {
    margin-top: $demo-block-margin-vertical;
  }

  &:not(:last-child) {
    margin-bottom: $demo-block-margin-vertical;
  }

  &--transparent {
    background: transparent;
  }

  &__title {
    padding: $demo-block-title-padding;
    font-size: $demo-block-title-font-size;
  }
}
</style>
