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
    :clickable="clickable"
    :is-link="isLink"
    :asterisk-position="formItemAsteriskPosition"
    :border="formItemBorder"
    :hide-asterisk="formItemHideAsterisk"
    :layout="formItemLayout"
    :custom-prefix-class="customPrefixClass"
    :custom-label-class="customLabelClass"
    :custom-title-class="customTitleClass"
    :custom-value-class="customValueClass"
    @click="emit('click')"
  >
    <template #title v-if="$slots.title">
      <slot name="title"></slot>
    </template>

    <slot>
      <text v-if="showPlaceholder" class="wd-form-item__placeholder">{{ placeholder }}</text>
      <text v-else-if="isDef(value)">{{ value }}</text>
    </slot>
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
import { computed, watch } from 'vue'
import { useChildren } from '../../composables/useChildren'
import { useParent } from '../../composables/useParent'
import WdCell from '../wd-cell/wd-cell.vue'
import { FORM_KEY, FORM_VALIDATE_EVENTS, type FormValidateEvent, type FormValidateTrigger } from '../wd-form/types'
import { FORM_ITEM_VALIDATE_KEY, formItemProps } from './types'
import { getPropByPath, isDef } from '../../common/util'

const props = defineProps(formItemProps)

const { parent: form, index } = useParent(FORM_KEY)
const { linkChildren } = useChildren(FORM_ITEM_VALIDATE_KEY)

const emit = defineEmits(['click'])

function normalizeValidateTrigger(trigger?: FormValidateTrigger | FormValidateTrigger[]): FormValidateEvent[] {
  const triggerList = Array.isArray(trigger) ? trigger : trigger ? [trigger] : []
  return triggerList.filter((item): item is FormValidateEvent => {
    return FORM_VALIDATE_EVENTS.includes(item as FormValidateEvent)
  })
}

const validateTriggerSet = computed(() => {
  const formTrigger = form.value?.props.validateTrigger
  const currentTrigger = isDef(props.validateTrigger) ? props.validateTrigger : formTrigger
  return new Set(normalizeValidateTrigger(currentTrigger))
})

function shouldTrigger(event: FormValidateEvent): boolean {
  return validateTriggerSet.value.has(event)
}

async function validateByTrigger(event: FormValidateEvent): Promise<void> {
  if (!props.prop || !shouldTrigger(event)) {
    return
  }
  await form.value?.validate?.(props.prop)
}

const propValue = computed(() => {
  if (!props.prop) {
    return undefined
  }
  return getPropByPath(form.value?.props.model, props.prop)
})

watch(
  () => propValue.value,
  async () => {
    await validateByTrigger('change')
  },
  {
    deep: true
  }
)

linkChildren({
  prop: props.prop,
  shouldTrigger,
  validateByTrigger
})

const errorMessage = computed(() => {
  if (form.value && props.prop && form.value.errorMessages && form.value.errorMessages[props.prop]) {
    return form.value.errorMessages[props.prop]
  } else {
    return ''
  }
})

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

const showPlaceholder = computed(() => {
  return Boolean(props.placeholder && (props.value === '' || props.value === undefined || props.value === null))
})

const isRequired = computed(() => {
  if (props.required === true) {
    return true
  }
  if (!props.prop || !form.value?.props.schema?.isRequired) {
    return false
  }
  return !!form.value.props.schema.isRequired(props.prop)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
