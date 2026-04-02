<template>
  <view :class="`wd-checkbox-group ${customClass}`" :style="customStyle">
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-checkbox-group',
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
import { watch } from 'vue'
import { checkNumRange, deepClone, isBoolean } from '../../common/util'
import { useChildren } from '../../composables/useChildren'
import { CHECKBOX_GROUP_KEY, checkboxGroupProps, type CheckboxGroupExpose, type CheckboxGroupToggleAllOptions } from './types'

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(['change', 'update:modelValue'])

const { linkChildren, children } = useChildren(CHECKBOX_GROUP_KEY)

linkChildren({ props, changeSelectState })

watch(
  () => props.modelValue,
  (newValue) => {
    // 传入的value数组中包括重复的元素，这种情况非法。
    if (new Set(newValue).size !== newValue.length) {
      // eslint-disable-next-line quotes
      console.error("checkboxGroup's bound value includes same value")
    }
    if (newValue.length < props.min) {
      // eslint-disable-next-line quotes
      console.error("checkboxGroup's bound value's length can't be less than min")
    }
    if (props.max !== 0 && newValue.length > props.max) {
      // eslint-disable-next-line quotes
      console.error("checkboxGroup's bound value's length can't be large than max")
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => props.type,
  (newValue) => {
    const type = ['circle', 'square', 'button', 'dot']
    if (type.indexOf(newValue) === -1) console.error(`type must be one of ${type.toString()}`)
  },
  { deep: true, immediate: true }
)

watch(
  () => props.min,
  (newValue) => {
    checkNumRange(newValue, 'min')
  },
  { deep: true, immediate: true }
)

watch(
  () => props.max,
  (newValue) => {
    checkNumRange(newValue, 'max')
  },
  { deep: true, immediate: true }
)

/**
 * @description 子节点通知父节点修改子节点选中状态
 * @param {any} value 子组件的标识符
 */
function changeSelectState(value: string | number | boolean) {
  const temp: (string | number | boolean)[] = deepClone(props.modelValue)
  const index = temp.indexOf(value)
  if (index > -1) {
    // 已经选中，则从 value 列表中删除子节点的标识符。
    temp.splice(index, 1)
  } else {
    // 之前未选中，则现在把加子节点的标识符加到 value 列表中。
    if (props.max !== 0 && temp.length >= props.max) {
      // Limit reached
      return
    }
    temp.push(value)
  }
  emit('update:modelValue', temp)

  emit('change', {
    value: temp
  })
}

/**
 * @description 切换所有复选框，传 true 为选中，false 为取消选中，不传参为取反
 * @param options
 */
const toggleAll = (options: CheckboxGroupToggleAllOptions = {}) => {
  const { modelValue } = props
  let checked: boolean | undefined
  let skipDisabled = false

  if (isBoolean(options)) {
    checked = options
  } else {
    checked = options.checked
    skipDisabled = options.skipDisabled || false
  }

  const newModelValue: (string | number | boolean)[] = []

  children.forEach((child: any) => {
    if (skipDisabled && child.disabled) {
      if (modelValue.includes(child.name)) {
        newModelValue.push(child.name)
      }
    } else {
      const isCurrentChecked = modelValue.includes(child.name)
      const target = checked === undefined ? !isCurrentChecked : checked

      if (target) {
        newModelValue.push(child.name)
      }
    }
  })

  emit('update:modelValue', newModelValue)
  emit('change', {
    value: newModelValue
  })
}

defineExpose<CheckboxGroupExpose>({
  toggleAll
})
</script>

<style lang="scss">
@use './index.scss';
</style>
