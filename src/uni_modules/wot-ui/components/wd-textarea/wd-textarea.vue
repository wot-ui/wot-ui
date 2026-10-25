<template>
  <view :class="rootClass" :style="customStyle">
    <view class="wd-textarea__body">
      <wd-icon v-if="hasPrefixIcon" custom-class="wd-textarea__prefix" :name="prefixIcon" :class-prefix="iconPrefix" :css-icon="cssIcon" />
      <textarea
        ref="textareaRef"
        :class="`wd-textarea__inner ${customTextareaClass}`"
        v-model="inputValue"
        :show-count="false"
        :placeholder="placeholderValue"
        :disabled="isDisabled || readonly"
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
      <!-- #ifdef H5 -->
      <!-- H5 需在按下清空图标时阻止 textarea 失焦，避免随后用 focus 属性把仍显示的长文本重新滚入视口 -->
      <view
        v-if="showClear && props.focusWhenClear"
        class="wd-textarea__clear-trigger"
        @mousedown="onClearMouseDown"
        @touchstart.prevent="onClearTouchStart"
        @click="onClearClick"
      >
        <wd-icon custom-class="wd-textarea__clear" name="close-circle" />
      </view>
      <view v-else-if="showClear" class="wd-textarea__clear-trigger" @click="onClearClick">
        <wd-icon custom-class="wd-textarea__clear" name="close-circle" />
      </view>
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <wd-icon v-if="showClear" custom-class="wd-textarea__clear" name="close-circle" @click="handleClear" />
      <!-- #endif -->
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
import { computed, nextTick, onBeforeMount, ref, watch } from 'vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import { isDef, isH5, isString, pause } from '../../common/util'
import { useParent } from '../../composables/useParent'
import { useTranslate } from '../../composables/useTranslate'
import { useFormDisabled } from '../../composables/useFormDisabled'
import { textareaProps } from './types'
import { FORM_ITEM_VALIDATE_KEY } from '../wd-form-item/types'

const { translate } = useTranslate('textarea')

const props = defineProps(textareaProps)
const emit = defineEmits(['update:modelValue', 'clear', 'blur', 'focus', 'input', 'keyboardheightchange', 'confirm', 'linechange', 'click'])
const { parent: formItemValidate } = useParent(FORM_ITEM_VALIDATE_KEY)
const isDisabled = useFormDisabled(props)

const hasPrefixIcon = computed(() => Boolean(props.prefixIcon || (isString(props.cssIcon) && props.cssIcon)))

const placeholderValue = computed(() => {
  return isDef(props.placeholder) ? props.placeholder : translate('placeholder')
})

const clearing = ref<boolean>(false)
const focused = ref<boolean>(false) // 控制聚焦
const focusing = ref<boolean>(false) // 当前是否激活状态
const inputValue = ref<string>('') // 输入框的值
const textareaRef = ref<any>(null)
// 触摸清空后短时间内忽略 click，避免 touchstart 与 click 各清空一次
let ignoreClickUntil = 0
// 回焦后补上 handleBlur 尚未走完的窗口。序号用来避免上一次的复位定时器清掉新一次清空的 clearing。
let h5ClearBlurGuard = 0

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
  const { readonly, clearable, clearTrigger } = props
  if (
    clearable &&
    !readonly &&
    !isDisabled.value &&
    inputValue.value &&
    (clearTrigger === 'always' || (props.clearTrigger === 'focus' && focusing.value))
  ) {
    return true
  } else {
    return false
  }
})

/**
 * 展示字数统计
 */
const showWordCount = computed(() => {
  const { readonly, maxlength, showWordLimit } = props
  return Boolean(!isDisabled.value && !readonly && isDef(maxlength) && maxlength > -1 && showWordLimit)
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
  return `wd-textarea ${props.error ? 'is-error' : ''} ${isDisabled.value ? 'is-disabled' : ''} ${props.autoHeight ? 'is-auto-height' : ''} ${
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

/**
 * 把 H5 原生 textarea 的显示值立刻清空。
 * uni-h5 会把 modelValue debounce 约 100ms 后才写入内部 state，这段时间节点仍画着旧文本。
 */
function getH5TextareaElement() {
  const instance = textareaRef.value as { $el?: HTMLElement } | HTMLElement | null
  if (!instance) return null
  const root = (instance as { $el?: HTMLElement }).$el ?? (instance as HTMLElement)
  if (!root || typeof root.tagName !== 'string') return null
  return root.tagName === 'TEXTAREA' ? (root as HTMLTextAreaElement) : root.querySelector?.('textarea') ?? null
}

function syncH5ClearedValue() {
  const textarea = getH5TextareaElement()
  if (textarea) textarea.value = ''
}

function readActiveElement() {
  if (typeof document === 'undefined') return null
  return document.activeElement
}

/** 以原生 textarea 是否持有焦点为准。focusing 要等 handleBlur 的 150ms，不能用来决定要不要回焦。 */
function textareaHasNativeFocus() {
  const textarea = getH5TextareaElement()
  const active = readActiveElement()
  if (!textarea || !active) return false
  return active === textarea || textarea.contains(active)
}

function isOtherFocusableControl(active: Element | null) {
  if (!active || typeof document === 'undefined') return false
  if (active === document.body || active === document.documentElement) return false

  const textarea = getH5TextareaElement()
  if (textarea && (active === textarea || textarea.contains(active))) return false
  const element = active as HTMLElement
  if (typeof element.closest === 'function' && element.closest('.wd-textarea__clear, .wd-textarea__clear-trigger')) return false
  if (typeof element.matches !== 'function') return false
  return element.matches('input, textarea, select, button, a[href], [contenteditable="true"], [tabindex]:not([tabindex="-1"])')
}

/**
 * 回焦会把 focused 置回 true。若此时 handleBlur 还在 150ms 等待里，它会把 focusing 清掉。
 * 只在确实回焦时挡住这次在途 blur，并在窗口结束后自己复位，避免没有 blur 时 clearing 粘住。
 */
function holdClearingForInFlightBlur() {
  const guard = ++h5ClearBlurGuard
  clearing.value = true
  // 回焦发生在清空后约 100ms，再留 80ms 盖住同时开始的 150ms blur。
  void pause(80).then(() => {
    if (guard !== h5ClearBlurGuard) return
    clearing.value = false
  })
}

/**
 * H5 清空。
 * 已聚焦时不再把 focus 置 false 再置 true：切换发生时内部 state 往往还是旧长文本，
 * 重新 focus 会把内容滚进视口，表现为闪烁。按下图标时已 preventDefault 保住焦点。
 * 未聚焦且 focusWhenClear 为 true 时，等空值写入后再聚焦，避免聚焦到旧内容。
 * 清空前焦点已在其他输入框上时仍要回焦；只有等待这 100ms 期间焦点转移到了别的控件才放弃。
 * 小程序 / App 仍走 focus 属性切换，因为那里无法用 preventDefault 保住键盘。
 */
async function clearOnH5() {
  const shouldFocus = props.focusWhenClear
  const wasNativelyFocused = textareaHasNativeFocus()
  const activeBeforeWait = readActiveElement()
  focusing.value = false
  inputValue.value = ''
  await nextTick()
  syncH5ClearedValue()

  if (shouldFocus && !wasNativelyFocused) {
    // 比 uni-h5 的 100ms debounce 略晚，确保 focus 切换时内部值已是空字符串。
    await pause(100)
    syncH5ClearedValue()
    const activeAfterWait = readActiveElement()
    const focusMovedDuringWait = activeAfterWait !== activeBeforeWait && isOtherFocusableControl(activeAfterWait)
    if (!focusMovedDuringWait) {
      if (focused.value) {
        focused.value = false
        await nextTick()
        syncH5ClearedValue()
      }
      holdClearingForInFlightBlur()
      focused.value = true
      focusing.value = true
    }
  } else if (shouldFocus) {
    focusing.value = true
  }

  emit('update:modelValue', inputValue.value)
  emit('clear')
}

async function clearByFocusToggle() {
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

function onClearMouseDown(event?: { preventDefault?: () => void }) {
  if (!isH5 || !props.focusWhenClear) return
  event?.preventDefault?.()
}

function onClearTouchStart() {
  if (!isH5 || !props.focusWhenClear) return
  ignoreClickUntil = Date.now() + 400
  void handleClear()
}

function onClearClick() {
  if (Date.now() < ignoreClickUntil) return
  void handleClear()
}

async function handleClear() {
  if (isH5) {
    await clearOnH5()
    return
  }
  await clearByFocusToggle()
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
