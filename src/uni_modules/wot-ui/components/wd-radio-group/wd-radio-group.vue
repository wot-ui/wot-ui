<template>
  <view :class="`wd-radio-group  ${customClass}`" :style="customStyle">
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-radio-group',
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
import { watch } from 'vue'
import { useChildren } from '../../composables/useChildren'
import { RADIO_GROUP_KEY, radioGroupProps } from './types'

const props = defineProps(radioGroupProps)
const emit = defineEmits(['change', 'update:modelValue'])

const { linkChildren } = useChildren(RADIO_GROUP_KEY)

linkChildren({ props, updateValue })

watch(
  () => props.type,
  (newValue) => {
    // type: 'dot', 'button', 'circle', 'square'
    const type = ['circle', 'dot', 'button', 'square']
    if (type.indexOf(newValue) === -1) console.error(`type must be one of ${type.toString()}`)
  },
  { deep: true, immediate: true }
)

/**
 * @description 处理radio子节点通知
 */
function updateValue(value: string | number | boolean | null) {
  emit('update:modelValue', value)
  emit('change', {
    value
  })
}
</script>
<style lang="scss">
@use './index.scss';
</style>
