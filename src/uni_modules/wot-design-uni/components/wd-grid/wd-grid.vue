<template>
  <view :class="`wd-grid ${customClass}`" :style="rootStyle">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-grid',
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
import { useChildren } from '../composables/useChildren'
import { GRID_KEY, gridProps } from './types'
import { addUnit, isDef, objToStyle } from '../common/util'

const props = defineProps(gridProps)

const { linkChildren } = useChildren(GRID_KEY)
linkChildren({ props })

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.gutter)) {
    style.paddingLeft = addUnit(props.gutter)
    console.log(props.square)

    if (props.square) {
      style.marginBottom = addUnit(-props.gutter)
    }
  }

  return `${objToStyle(style)}${props.customStyle || ''}`
})
</script>

<style lang="scss">
@use './index.scss';
</style>
