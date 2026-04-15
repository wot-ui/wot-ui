<template>
  <view :class="rootClass" :style="rootStyle" @click="handleClick">
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
import { computed, normalizeClass, type CSSProperties } from 'vue'
import { addUnit, isDef, objToStyle } from '../../common/util'
import { iconProps } from './types'

const props = defineProps(iconProps)
const emit = defineEmits(['click', 'touch'])

const isImage = computed(() => {
  return !props.cssIcon && isDef(props.name) && props.name.includes('/')
})

const rootClass = computed(() => {
  const clazz: Record<string, boolean> = {
    'wd-icon': true
  }

  if (props.cssIcon) {
    clazz['wd-icon--css'] = true

    if (typeof props.cssIcon === 'string') {
      clazz[props.cssIcon] = true
    } else {
      clazz[props.name] = true
    }
  } else if (isImage.value) {
    clazz['wd-icon--image'] = true
  } else {
    clazz[props.classPrefix] = true
    clazz[`${props.classPrefix}-${props.name}`] = true
  }

  return normalizeClass([clazz, props.customClass])
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
