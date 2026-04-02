<template>
  <view
    :class="`wd-checkbox wd-checkbox--${placementValue} ${isButton ? 'is-button' : 'wd-checkbox--' + directionValue} ${
      isChecked ? 'is-checked' : ''
    } ${indeterminate ? 'is-indeterminate' : ''} ${disabledValue ? 'is-disabled' : ''} ${customClass}`"
    :style="customStyle"
    @click="toggle"
  >
    <view :class="`wd-checkbox__label ${customLabelClass || ''}`" v-if="$slots.default">
      <slot></slot>
    </view>

    <template v-if="isButton">
      <slot name="icon" :is-checked="isChecked">
        <view v-if="isChecked" class="wd-checkbox__shape">
          <wd-icon custom-class="wd-checkbox__icon" :custom-style="iconStyle" :name="iconValue"></wd-icon>
        </view>
      </slot>
    </template>
    <view v-else class="wd-checkbox__shape">
      <slot name="icon" :is-checked="isChecked">
        <wd-icon custom-class="wd-checkbox__icon" :custom-style="iconStyle" :name="iconValue"></wd-icon>
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-checkbox',
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
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, getCurrentInstance, onBeforeMount, watch } from 'vue'
import { useParent } from '../../composables/useParent'
import { CHECKBOX_GROUP_KEY } from '../wd-checkbox-group/types'
import { getPropByPath, isDef } from '../../common/util'
import { checkboxProps, type CheckboxExpose, type CheckboxDirection, type CheckboxPlacement, type CheckboxType } from './types'

const props = defineProps(checkboxProps)
const emit = defineEmits(['change', 'update:modelValue'])

defineExpose<CheckboxExpose>({
  toggle
})

const { parent: checkboxGroup } = useParent(CHECKBOX_GROUP_KEY)
const { proxy } = getCurrentInstance() as any

const isChecked = computed(() => {
  if (checkboxGroup.value) {
    return checkboxGroup.value.props.modelValue.indexOf(props.name) > -1
  } else {
    return props.modelValue === props.trueValue
  }
})

const typeValue = computed(() => {
  return props.type || getPropByPath(checkboxGroup.value, 'props.type') || 'circle'
})

const isButton = computed(() => {
  return typeValue.value === 'button'
})

const iconValue = computed(() => {
  // indeterminate 状态下，且非 button 类型，使用 minus-circle-fill
  if (props.indeterminate && !isButton.value) {
    return 'minus-circle-fill'
  }
  let icon = ''
  switch (typeValue.value) {
    case 'circle':
      icon = isChecked.value ? 'check-circle-fill' : 'uncheck-circle'
      break
    case 'square':
      icon = isChecked.value ? 'check-square-fill' : 'uncheck-square'
      break
    case 'dot':
      icon = isChecked.value ? 'check-circle-radio-fill' : 'uncheck-circle'
      break
    case 'button':
      icon = isChecked.value ? 'check' : ''
      break
  }
  return icon
})

const checkedColorValue = computed(() => {
  return props.checkedColor || getPropByPath(checkboxGroup.value, 'props.checkedColor')
})

const uncheckedColorValue = computed(() => {
  return props.uncheckedColor || getPropByPath(checkboxGroup.value, 'props.uncheckedColor')
})

const disabledValue = computed(() => {
  if (isDef(props.disabled)) {
    return props.disabled
  }
  if (checkboxGroup.value) {
    const { max, min, modelValue, disabled } = checkboxGroup.value.props
    if ((max && modelValue.length >= max && !isChecked.value) || (min && modelValue.length <= min && isChecked.value) || disabled) {
      return true
    }
  }
  return false
})

const readonlyValue = computed(() => {
  if (isDef(props.readonly)) {
    return props.readonly
  } else {
    return getPropByPath(checkboxGroup.value, 'props.readonly')
  }
})

const directionValue = computed(() => {
  if (isDef(props.direction)) {
    return props.direction
  } else {
    return getPropByPath(checkboxGroup.value, 'props.direction') as CheckboxDirection
  }
})

const placementValue = computed<CheckboxPlacement>(() => {
  if (isDef(props.placement)) {
    return props.placement
  } else {
    return getPropByPath(checkboxGroup.value, 'props.placement')
  }
})

const iconStyle = computed(() => {
  if (isButton.value) return ''
  if ((isChecked.value || props.indeterminate) && checkedColorValue.value) {
    return `color: ${checkedColorValue.value}`
  }
  if (!isChecked.value && uncheckedColorValue.value) {
    return `color: ${uncheckedColorValue.value}`
  }
  return ''
})

watch(
  () => props.name,
  () => {
    // 组合使用走这个逻辑
    if (checkboxGroup.value) {
      checkName()
    }
  }
)

watch(
  () => props.type,
  (newValue) => {
    const type = ['circle', 'square', 'button', 'dot']
    if (isDef(newValue) && type.indexOf(newValue) === -1) console.error(`type must be one of ${type.toString()}`)
  }
)

onBeforeMount(() => {
  // eslint-disable-next-line quotes
  if (props.modelValue === null && !checkboxGroup.value) console.warn("checkbox's value must be set")
  if (checkboxGroup.value && !props.name) {
    // eslint-disable-next-line quotes
    console.warn("checkbox's name must be set when used in checkbox-group")
  }
})

/**
 * @description 检测checkbox绑定的value是否和其它checkbox的value冲突
 * @param {Object} self 自身
 * @param  myName 自己的标识符
 */
function checkName() {
  checkboxGroup.value &&
    checkboxGroup.value.children &&
    checkboxGroup.value.children.forEach((child: any) => {
      if (child.$.uid !== proxy.$.uid && child.name === props.name) {
        console.error(`The checkbox's bound value: ${props.name} has been used`)
      }
    })
}

/**
 * @description 点击checkbox的Event handle
 */
function toggle() {
  if (disabledValue.value || readonlyValue.value) return
  // 复选框单独使用时点击反选，并且在checkbox上触发change事件
  if (checkboxGroup.value) {
    checkboxGroup.value.changeSelectState(props.name)
  } else {
    const newVal = props.modelValue === props.trueValue ? props.falseValue : props.trueValue
    emit('update:modelValue', newVal)
    emit('change', {
      value: newVal
    })
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
