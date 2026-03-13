<template>
  <view @click="handleClick" :class="rootClass" :style="rootStyle">
    <image v-if="isImage" class="wd-icon__image" :src="name"></image>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-icon',
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    externalClasses: ['custom-class'],
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue'
import { addUnit, isDef, objToStyle } from '../common/util'
import { iconProps } from './types'

const props = defineProps(iconProps)
const emit = defineEmits(['click', 'touch'])

const isImage = computed(() => {
  return !props.cssIcon && isDef(props.name) && props.name.includes('/')
})

const rootClass = computed(() => {
  if (props.cssIcon) {
    // CSS 图标模式：name 直接作为 class，不使用 iconfont
    return `wd-icon wd-icon--css ${props.name} ${props.customClass}`
  }
  const prefix = props.classPrefix
  return `wd-icon ${prefix} ${props.customClass} ${isImage.value ? 'wd-icon--image' : prefix + '-' + props.name}`
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.color) {
    style['color'] = props.color
  }
  if (props.size) {
    const sizeValue = addUnit(props.size)
    style['font-size'] = sizeValue
    // CSS 图标模式下，同步设置 width/height
    if (props.cssIcon) {
      style['width'] = sizeValue
      style['height'] = sizeValue
    }
  }
  return `${objToStyle(style)} ${props.customStyle}`
})

function handleClick(event: any) {
  emit('click', event)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
