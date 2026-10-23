<template>
  <view :class="`wd-password-input ${customClass}`" :style="customStyle">
    <view @touchstart="onTouchStart" class="wd-password-input__security">
      <view
        v-for="(_, index) in length"
        :key="index"
        :class="`wd-password-input__item ${gutter ? '' : 'is-border'}`"
        :style="{ marginLeft: index !== 0 && gutter ? addUnit(gutter) : 0 }"
      >
        <view v-if="cursorActive && index === modelValue.length" class="wd-password-input__cursor"></view>
        <view v-else :class="`wd-password-input__value`">
          <view :style="{ visibility: mask && modelValue[index] ? 'visible' : 'hidden' }" class="wd-password-input__mask"></view>
          <text v-if="!mask && modelValue[index]">{{ modelValue[index] }}</text>
        </view>
      </view>
      <input
        v-if="nativeInput"
        class="wd-password-input__native"
        :type="nativeKeyboardType"
        inputmode="numeric"
        :maxlength="nativePasteMaxLength"
        :autocomplete="nativeAutocomplete"
        :text-content-type="nativeTextContentType"
        :value="nativeValue"
        @input="handleNativeInput"
        @paste="handleNativePaste"
        @focus="handleNativeFocus"
        @blur="handleNativeBlur"
      />
    </view>
    <view v-if="info || errorInfo" :class="`wd-password-input__info ${errorInfo ? 'is-error' : ''}`">
      {{ errorInfo || info }}
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-password-input',
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
import { computed, ref, watch } from 'vue'
import { addUnit } from '../../common/util'
import { passwordInputProps } from './types'

interface NativeFieldTarget {
  value?: string | number
}

interface NativeInputEvent {
  detail?: {
    value?: string | number
  }
  target?: NativeFieldTarget
  currentTarget?: NativeFieldTarget
}

interface NativePasteEvent {
  clipboardData?: {
    getData?: (type: string) => string
  }
  preventDefault?: () => void
  target?: NativeFieldTarget
  currentTarget?: NativeFieldTarget
}

const props = defineProps(passwordInputProps)

const emit = defineEmits(['focus', 'update:modelValue'])

const nativeFocused = ref(false)
const nativeValue = ref(props.modelValue)
// 仅用于识别粘贴后的原文回写。与某次剪贴板原文一致、且不是在当前值上的逐字修改时才忽略。
const pendingPasteRaws = new Set<string>()
// 小程序用 digit 调出数字键盘；H5 的 digit 会被映射成 number，会丢掉前导 0，因此 H5 用 text + inputmode。
let nativeKeyboardType = 'digit'
// #ifdef H5
nativeKeyboardType = 'text'
// #endif
// 短信验证码自动填充跟 native-input 走，不看 mask。掩码只影响格子展示。
// H5 认 autocomplete="one-time-code"。uni-app H5 还会把 text-content-type 转成原生 autocomplete，所以同时带上 oneTimeCode。
// text-content-type 仅 App-nvue-iOS 支持。Vue 文件里的 APP-IOS 条件编译不可靠，因此不在 App-vue 上设置。
let nativeAutocomplete: string | undefined
let nativeTextContentType: string | undefined
// #ifdef H5
nativeAutocomplete = 'one-time-code'
nativeTextContentType = 'oneTimeCode'
// #endif
// 大于格子长度，避免短信原文在过滤数字前被原生 maxlength 截断。
const nativePasteMaxLength = 500

const cursorActive = computed(() => (props.nativeInput ? nativeFocused.value : props.focused))

watch(
  () => props.modelValue,
  (value) => {
    nativeValue.value = value
  }
)

function onTouchStart(event: Event) {
  if (props.nativeInput) return
  emit('focus', event)
}

/**
 * 只保留数字，并截断到密码长度。全角数字会先转成半角。
 */
function sanitizePassword(value: unknown) {
  const normalized = String(value ?? '').replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
  const maxLength = Number(props.length)
  const limit = Number.isFinite(maxLength) && maxLength > 0 ? Math.floor(maxLength) : 0
  return normalized.replace(/\D/g, '').slice(0, limit)
}

function readNativeValue(event: NativeInputEvent) {
  const detailValue = event.detail?.value
  if (detailValue != null) return String(detailValue)
  const targetValue = event.target?.value ?? event.currentTarget?.value
  if (targetValue != null) return String(targetValue)
  return ''
}

function commitNativeValue(raw: string) {
  const next = sanitizePassword(raw)
  nativeValue.value = next
  if (next !== props.modelValue) {
    emit('update:modelValue', next)
  }
}

function writeNativeField(event: NativeInputEvent | NativePasteEvent, value: string) {
  const target = event.target ?? event.currentTarget
  if (target) target.value = value
}

/**
 * 当前值上的单次按键或退格。这种输入即使和剪贴板原文相同，也要立即生效。
 */
function isDirectEdit(current: string, raw: string) {
  const next = sanitizePassword(raw)
  if (next.length === current.length + 1 && next.startsWith(current)) return true
  if (next.length + 1 === current.length && current.startsWith(next)) return true
  return false
}

function handleNativeInput(event: NativeInputEvent) {
  const raw = readNativeValue(event)
  const current = nativeValue.value
  if (pendingPasteRaws.has(raw) && !isDirectEdit(current, raw)) {
    writeNativeField(event, current)
    // 微信小程序会用 @input 的返回值替换输入框内容。
    return current
  }
  pendingPasteRaws.delete(raw)
  commitNativeValue(raw)
  writeNativeField(event, nativeValue.value)
  return nativeValue.value
}

function handleNativePaste(event: NativePasteEvent) {
  const text = event.clipboardData?.getData?.('text')
  if (text == null || text === '') return
  // 读得到剪贴板时自己追加，避免原生粘贴把已有内容整段换成剪贴板原文。
  event.preventDefault?.()
  pendingPasteRaws.add(String(text))
  // 用已提交的值追加。父级 v-model 尚未回写时，props 仍是旧值，不能拿它当基准。
  commitNativeValue(`${nativeValue.value}${text}`)
  writeNativeField(event, nativeValue.value)
}

function handleNativeFocus(event: Event) {
  nativeFocused.value = true
  emit('focus', event)
}

function handleNativeBlur() {
  nativeFocused.value = false
}
</script>

<style lang="scss">
@use './index.scss';
</style>
