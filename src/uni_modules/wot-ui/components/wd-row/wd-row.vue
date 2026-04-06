<!--
 * @Author: weisheng
 * @Date: 2025-12-18 14:30:46
 * @LastEditTime: 2026-02-10 22:19:29
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-ui/src/uni_modules/wot-ui/components/wd-row/wd-row.vue
 * 记得注释
-->
<template>
  <view :class="rootClass" :style="rootStyle">
    <!-- 每一行 -->
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-row',
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
import { useChildren } from '../../composables/useChildren'
import { ROW_KEY, rowProps } from './types'
import { addUnit, objToStyle } from '../../common/util'

const props = defineProps(rowProps)
const { linkChildren } = useChildren(ROW_KEY)

linkChildren({ props })

/**
 * justify 值映射到 CSS flex justify-content
 */
const justifyMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly'
}

/**
 * align 值映射到 CSS flex align-items
 */
const alignMap: Record<string, string> = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end'
}

const rootClass = computed(() => {
  return `wd-row ${props.customClass}`
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  const { gutter, justify, align } = props

  if (gutter < 0) {
    console.error('[wot ui] warning(wd-row): attribute gutter must be greater than or equal to 0')
  } else if (gutter) {
    style.marginLeft = addUnit(-gutter / 2)
    style.marginRight = addUnit(-gutter / 2)
  }

  if (justify && justify !== 'start') {
    style.justifyContent = justifyMap[justify] || justify
  }

  if (align && align !== 'top') {
    style.alignItems = alignMap[align] || align
  }

  return `${objToStyle(style)}${props.customStyle}`
})
</script>
<style lang="scss">
@use './index.scss';
</style>
