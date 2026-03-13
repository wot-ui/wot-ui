<template>
  <wd-cell
    :custom-class="`wd-form-item ${customClass}`"
    :custom-style="customStyle"
    :use-title-slot="!!$slots.title"
    :title="title"
    :title-width="formItemTitleWidth"
    :prefix-icon="prefixIcon"
    :icon-size="iconSize"
    :icon-prefix="iconPrefix"
    :required="isRequired"
    :size="formItemSize"
    :value-align="formItemValueAlign"
    :center="formItemCenter"
    :ellipsis="formItemEllipsis"
    :asterisk-position="formItemAsteriskPosition"
    :border="formItemBorder"
    :hide-asterisk="formItemHideAsterisk"
    :layout="formItemLayout"
    :custom-prefix-class="customPrefixClass"
    :custom-label-class="customLabelClass"
    :custom-title-class="customTitleClass"
    :custom-value-class="customValueClass"
  >
    <template #title v-if="$slots.title">
      <slot name="title"></slot>
    </template>

    <slot></slot>
    <view v-if="errorMessage" class="wd-form-item__error-message">{{ errorMessage }}</view>
  </wd-cell>
</template>
<script lang="ts">
export default {
  name: 'wd-form-item',
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
import { useParent } from '../composables/useParent'
import WdCell from '../wd-cell/wd-cell.vue'
import { FORM_KEY } from '../wd-form/types'
import { formItemProps } from './types'
import { isDef } from '../common/util'

const props = defineProps(formItemProps)

const { parent: form, index } = useParent(FORM_KEY)

const errorMessage = computed(() => {
  if (form.value && props.prop && form.value.errorMessages && form.value.errorMessages[props.prop]) {
    return form.value.errorMessages[props.prop]
  } else {
    return ''
  }
})

// ========== 属性继承逻辑：子组件属性优先 ==========
const formItemBorder = computed(() => {
  if (isDef(props.border)) {
    return props.border
  }
  if (index.value > 0 && form.value && form.value.props.border) {
    return true
  }
  return false
})

const formItemCenter = computed(() => {
  return isDef(props.center) ? props.center : form.value?.props.center
})

const formItemSize = computed(() => {
  return isDef(props.size) ? props.size : form.value?.props.size
})

const formItemTitleWidth = computed(() => {
  return isDef(props.titleWidth) ? props.titleWidth : form.value?.props.titleWidth || '98px'
})

const formItemLayout = computed(() => {
  return isDef(props.layout) ? props.layout : form.value?.props.layout || 'horizontal'
})

const formItemValueAlign = computed(() => {
  return isDef(props.valueAlign) ? props.valueAlign : form.value?.props.valueAlign || 'left'
})

const formItemEllipsis = computed(() => {
  return isDef(props.ellipsis) ? props.ellipsis : form.value?.props.ellipsis
})

const formItemAsteriskPosition = computed(() => {
  return isDef(props.asteriskPosition) ? props.asteriskPosition : form.value?.props.asteriskPosition || 'start'
})

const formItemHideAsterisk = computed(() => {
  return isDef(props.hideAsterisk) ? props.hideAsterisk : form.value?.props.hideAsterisk
})

// 是否展示必填
const isRequired = computed(() => {
  let formRequired = false
  if (form.value && form.value.props.rules) {
    const rules = form.value.props.rules
    for (const key in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
        formRequired = rules[key].some((rule) => rule.required)
      }
    }
  }
  return props.required || (props.rules && props.rules.some((rule) => rule.required)) || formRequired
})
</script>

<style lang="scss">
@use './index.scss';
</style>
