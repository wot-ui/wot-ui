<template>
  <view :class="rootClass" :style="customStyle">
    <view class="wd-textarea__body">
      <textarea
        :class="`wd-textarea__inner ${customTextareaClass}`"
        v-model="inputValue"
        :show-count="false"
        :placeholder="placeholderValue"
        :disabled="disabled || readonly"
        :enable-native="enableNative"
        :maxlength="maxlength"
        :focus="focused"
        :auto-focus="autoFocus"
        :placeholder-style="placeholderStyle"
        :placeholder-class="inputPlaceholderClass"
        :auto-height="autoHeight"
        :cursor-spacing="cursorSpacing"
        :fixed="fixed"
        :cursor="cursor"
        :show-confirm-bar="showConfirmBar"
        :selection-start="selectionStart"
        :selection-end="selectionEnd"
        :adjust-position="adjustPosition"
        :hold-keyboard="holdKeyboard"
        :confirm-type="confirmType"
        :confirm-hold="confirmHold"
        :disable-default-padding="disableDefaultPadding"
        :ignoreCompositionEvent="ignoreCompositionEvent"
        :inputmode="inputmode"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
        @linechange="handleLineChange"
        @keyboardheightchange="handleKeyboardheightchange"
      />
      <view v-if="props.readonly" class="wd-textarea__readonly-mask" />
      <wd-icon v-if="showClear" custom-class="wd-textarea__clear" name="close-circle" @click="handleClear" />
    </view>
    <view v-if="showWordCount" class="wd-textarea__count">{{ currentLength }}/{{ maxlength }}</view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-textarea',
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
import { computed, onBeforeMount, ref, watch } from 'vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import { isDef, pause } from '../../common/util'
import { useParent } from '../../composables/useParent'
import { useTranslate } from '../../composables/useTranslate'
import { textareaProps } from './types'
import { FORM_ITEM_VALIDATE_KEY } from '../wd-form-item/types'

const { translate } = useTranslate('textarea')

const props = defineProps(textareaProps)
const emit = defineEmits(['update:modelValue', 'clear', 'blur', 'focus', 'input', 'keyboardheightchange', 'confirm', 'linechange', 'click'])
const { parent: formItemValidate } = useParent(FORM_ITEM_VALIDATE_KEY)

const placeholderValue = computed(() => {
  return isDef(props.placeholder) ? props.placeholder : translate('placeholder')
})

const clearing = ref<boolean>(false)
const focused = ref<boolean>(false) // 控制聚焦
const focusing = ref<boolean>(false) // 当前是否激活状态
const inputValue = ref<string>('') // 输入框的值

watch(
  () => props.focus,
  (newValue) => {
    focused.value = newValue
  },
  { immediate: true, deep: true }
)

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = isDef(newValue) ? String(newValue) : ''
  },
  { immediate: true, deep: true }
)

/**
 * 展示清空按钮
 */
const showClear = computed(() => {
  const { disabled, readonly, clearable, clearTrigger } = props
  if (clearable && !readonly && !disabled && inputValue.value && (clearTrigger === 'always' || (props.clearTrigger === 'focus' && focusing.value))) {
    return true
  } else {
    return false
  }
})

/**
 * 展示字数统计
 */
const showWordCount = computed(() => {
  const { disabled, readonly, maxlength, showWordLimit } = props
  return Boolean(!disabled && !readonly && isDef(maxlength) && maxlength > -1 && showWordLimit)
})

// 当前文本域文字长度
const currentLength = computed(() => {
  /**
   * 使用Array.from处理多码元字符以获取正确的长度
   * @link https://github.com/Moonofweisheng/wot-design-uni/issues/933
   */
  return Array.from(String(formatValue(props.modelValue))).length
})

const rootClass = computed(() => {
  return `wd-textarea ${props.error ? 'is-error' : ''} ${props.disabled ? 'is-disabled' : ''} ${props.autoHeight ? 'is-auto-height' : ''} ${
    isCompact.value ? 'is-compact' : ''
  } ${props.customClass}`
})

const isCompact = computed(() => {
  return isDef(props.compact) ? props.compact : isDef(formItemValidate.value)
})

const inputPlaceholderClass = computed(() => {
  return `wd-textarea__placeholder  ${props.placeholderClass}`
})

onBeforeMount(() => {
  initState()
})

// 状态初始化
function initState() {
  inputValue.value = formatValue(inputValue.value)
  emit('update:modelValue', inputValue.value)
}

function formatValue(value: string | number) {
  if (value === null || value === undefined) return ''
  const { maxlength, showWordLimit } = props
  if (showWordLimit && maxlength !== -1 && String(value).length > maxlength) {
    return value.toString().substring(0, maxlength)
  }
  return `${value}`
}

async function handleClear() {
  focusing.value = false
  inputValue.value = ''
  if (props.focusWhenClear) {
    clearing.value = true
    focused.value = false
  }
  await pause()
  if (props.focusWhenClear) {
    focused.value = true
    focusing.value = true
  }
  emit('update:modelValue', inputValue.value)
  emit('clear')
}
async function handleBlur({ detail }: any) {
  // 等待150毫秒，clear执行完毕
  await pause(150)

  if (clearing.value) {
    clearing.value = false
    return
  }

  focusing.value = false
  emit('blur', {
    value: inputValue.value,
    cursor: detail.cursor ? detail.cursor : null
  })
  await formItemValidate.value?.validateByTrigger('blur')
}
function handleFocus({ detail }: any) {
  focusing.value = true
  emit('focus', detail)
}
function handleInput({ detail }: any) {
  inputValue.value = formatValue(inputValue.value as string)
  emit('update:modelValue', inputValue.value)
  emit('input', detail)
}
function handleKeyboardheightchange({ detail }: any) {
  emit('keyboardheightchange', detail)
}
function handleConfirm({ detail }: any) {
  emit('confirm', detail)
}
function handleLineChange({ detail }: any) {
  emit('linechange', detail)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
