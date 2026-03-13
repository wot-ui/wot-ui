<template>
  <view :class="rootClass" :style="rootStyle">
    <!-- 每一列 -->
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-col',
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
import { computed, watch } from 'vue'
import { useParent } from '../composables/useParent'
import { ROW_KEY } from '../wd-row/types'
import { colProps } from './types'
import { isDef } from '../common/util'

const props = defineProps(colProps)
const { parent: row } = useParent(ROW_KEY)

const rootClass = computed(() => {
  return `wd-col ${props.customClass}`
})

const rootStyle = computed(() => {
  const gutter = isDef(row.value) ? row.value.props.gutter || 0 : 0
  const { span, offset } = props
  const styles: string[] = []

  // gutter 间距：左右 padding
  if (gutter > 0) {
    const padding = `${gutter / 2}px`
    styles.push(`padding-left: ${padding}`)
    styles.push(`padding-right: ${padding}`)
    styles.push('background-clip: content-box')
  }

  // 栅格宽度
  if (span > 0 && span < 24) {
    const width = `${(span / 24) * 100}%`
    styles.push(`width: ${width}`)
  } else if (span === 24) {
    styles.push('width: 100%')
  }

  // 栅格偏移
  if (offset > 0) {
    const marginLeft = `${(offset / 24) * 100}%`
    styles.push(`margin-left: ${marginLeft}`)
  }

  // 追加用户自定义样式
  if (props.customStyle) {
    styles.push(props.customStyle)
  }

  return styles.join(';')
})

watch([() => props.span, () => props.offset], () => {
  check()
})

function check() {
  const { span, offset } = props
  if (span < 0 || offset < 0) {
    console.error('[wot-design] warning(wd-col): attribute span/offset must be greater than or equal to 0')
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
