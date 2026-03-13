<template>
  <view :class="rootClass" :style="rootStyle" @click="handleClick">
    <input
      v-if="dynamicInput && dynamic"
      class="wd-tag__input"
      :placeholder="translate('placeholder')"
      placeholder-class="wd-tag__placeholder"
      type="text"
      :focus="true"
      v-model="dynamicValue"
      @blur="handleBlur"
      @confirm="handleConfirm"
    />
    <view v-else-if="dynamic" class="wd-tag__text" :style="textStyle" @click.stop="handleAdd">
      <slot name="add">
        <wd-icon name="plus" custom-class="wd-tag__add" />
        <text>{{ translate('add') }}</text>
      </slot>
    </view>

    <template v-else>
      <slot name="icon" v-if="$slots.icon || icon">
        <wd-icon :name="icon" custom-class="wd-tag__icon" />
      </slot>
      <text class="wd-tag__text" :style="textStyle" v-if="$slots.default">
        <slot />
      </text>
      <view class="wd-tag__close" v-if="closable" @click.stop="handleClose">
        <wd-icon name="close" custom-class="wd-tag__close-icon"></wd-icon>
      </view>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-tag',
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
import { objToStyle } from '../common/util'
import { computed, ref } from 'vue'
import { useTranslate } from '../composables/useTranslate'
import { tagProps } from './types'

const props = defineProps(tagProps)
const emit = defineEmits(['click', 'close', 'confirm'])

const { translate } = useTranslate('tag')

const dynamicValue = ref<string>('')
const dynamicInput = ref<boolean>(false)

/**
 * 根节点类名
 */
const rootClass = computed<string>(() => {
  const { type, variant, size, round, mark, customClass } = props
  const classList: string[] = []
  type && classList.push(`is-${type}`)
  variant && classList.push(`is-${variant}`)
  size && classList.push(`is-${size}`)
  round && classList.push('is-round')
  mark && classList.push('is-mark')
  return `wd-tag ${customClass} ${classList.join(' ')}`
})

/**
 * 根节点样式
 */
const rootStyle = computed<string>(() => {
  const rootStyle: Record<string, any> = {}
  if (props.variant !== 'plain' && props.variant !== 'dashed' && props.variant !== 'text' && props.bgColor) {
    rootStyle['background'] = props.bgColor
  }
  if (props.bgColor) {
    rootStyle['border-color'] = props.bgColor
  }
  return `${objToStyle(rootStyle)}${props.customStyle}`
})

/**
 * 文本样式
 */
const textStyle = computed<string>(() => {
  const textStyle: Record<string, any> = {}
  if (props.color) {
    textStyle['color'] = props.color
  }
  return objToStyle(textStyle)
})

/**
 * 处理点击事件
 * @param {MouseEvent} event 鼠标事件对象
 * @returns {void}
 */
function handleClick(event: MouseEvent) {
  emit('click', event)
}

/**
 * 处理关闭事件
 * @param {MouseEvent} event 鼠标事件对象
 * @returns {void}
 */
function handleClose(event: MouseEvent): void {
  emit('close', event)
}

/**
 * 处理添加事件
 * @returns {void}
 */
function handleAdd(): void {
  dynamicInput.value = true
  dynamicValue.value = ''
}

/**
 * 处理输入框失焦事件
 * @returns {void}
 */
function handleBlur(): void {
  setDynamicInput()
}

/**
 * 处理输入完成事件
 * @param {any} event 回车或完成事件对象
 * @returns {void}
 */
function handleConfirm(event: any): void {
  setDynamicInput()
  emit('confirm', {
    value: event.detail.value
  })
}

/**
 * 重置动态输入框状态
 * @returns {void}
 */
function setDynamicInput() {
  dynamicInput.value = false
}
</script>
<style lang="scss">
@use './index.scss';
</style>
