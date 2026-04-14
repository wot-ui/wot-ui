<template>
  <view :class="['demo-group', mergedCustomClass]" :style="rootStyle">
    <view class="demo-group__title">{{ title }}</view>
    <view class="demo-group__container">
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
import { useParent } from '@/uni_modules/wot-ui/composables/useParent'
import { DEMO_GROUP_KEY } from './types'

interface Props {
  customClass?: string
  title?: string
  customStyle?: string
  transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  transparent: undefined,
  customClass: '',
  customStyle: ''
})

// 注入全局配置
const { parent } = useParent(DEMO_GROUP_KEY)

// 合并全局配置和局部配置，局部配置优先级更高
const mergedTransparent = computed(() => {
  if (props.transparent !== undefined) {
    return props.transparent
  }
  return parent.value?.props.transparent ?? false
})

const mergedCustomClass = computed(() => {
  const globalClass = parent.value?.props.customClass || ''
  return props.customClass ? `${globalClass} ${props.customClass}`.trim() : globalClass
})

const mergedCustomStyle = computed(() => {
  const globalStyle = parent.value?.props.customStyle || ''
  const localStyle = props.customStyle || ''
  const transparentStyle = mergedTransparent.value ? 'background: transparent;' : ''
  return `${transparentStyle} ${globalStyle} ${localStyle}`.trim()
})

const rootStyle = computed(() => {
  return mergedCustomStyle.value
})
</script>
<style lang="scss" scoped>
.demo-group {
  width: 100%;
  position: relative;
  background: $filled-oppo;
  &:last-child {
    padding-bottom: $padding-loose;
  }

  &__title {
    box-sizing: border-box;
    font-size: $typography-body-size-extra-large;
    font-weight: $font-weight-medium;
    color: $text-main;
    line-height: $typography-body-line-height-size-large;
    padding: $padding-loose;
  }

  &__container {
    padding-bottom: $padding-loose;
  }
}
</style>
