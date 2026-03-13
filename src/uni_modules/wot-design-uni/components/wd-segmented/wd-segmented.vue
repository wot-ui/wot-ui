<template>
  <view :class="`wd-segmented ${theme ? `wd-segmented--${theme}` : ''} ${customClass}`" :style="customStyle">
    <view
      :class="`wd-segmented__item ${state.activeIndex === index ? 'is-active' : ''} ${
        disabled || (isObj(option) ? option.disabled : false) ? 'is-disabled' : ''
      }`"
      @click="handleClick(option, index)"
      v-for="(option, index) in options"
      :key="index"
    >
      <view class="wd-segmented__item-label">
        <slot name="label" v-if="$slots.label" :option="isObj(option) ? option : { value: option }"></slot>
        <template v-else>
          {{ isObj(option) ? option.value : option }}
        </template>
      </view>
    </view>
    <view :class="`wd-segmented__slider ${activeDisabled ? 'is-disabled' : ''}`" :style="state.activeStyle" v-if="theme === 'card'"></view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-segmented',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, watch } from 'vue'
import { getRect, isObj, objToStyle, addUnit, pause, isEqual } from '../common/util'
import type { CSSProperties } from 'vue'
import { segmentedProps, type SegmentedExpose, type SegmentedOption } from './types'
/** 分段器选项元素的选择器 */
const $item = '.wd-segmented__item'

const props = defineProps(segmentedProps)
const emit = defineEmits(['update:value', 'change', 'click'])

/**
 * 组件内部状态
 */
const state = reactive({
  /** 当前选中项的索引 */
  activeIndex: 0,
  /** 滑块的样式字符串 */
  activeStyle: ''
})

/**
 * 当前激活项是否处于禁用状态
 * 检查全局禁用或第一个选项的禁用状态
 */
const activeDisabled = computed(() => {
  return props.disabled || (props.options[0] && isObj(props.options[0]) ? props.options[0].disabled : false)
})

watch(
  () => props.value,
  () => {
    updateCurrentIndex()
    updateActiveStyle()
    if (props.vibrateShort) {
      uni.vibrateShort({})
    }
  },
  {
    immediate: false
  }
)

const { proxy } = getCurrentInstance() as any

onMounted(async () => {
  updateCurrentIndex()
  await pause()
  updateActiveStyle(false)
})

/**
 * 更新滑块的位置和样式
 * 仅在 card 主题下执行,outline 主题下滑块隐藏无需更新
 * @param {boolean} animation 是否启用过渡动画,默认为 true
 */
function updateActiveStyle(animation: boolean = true) {
  // outline 模式下滑块隐藏，无需计算样式
  if (props.theme === 'outline') {
    return
  }

  getRect($item, true, proxy).then((rects) => {
    const rect = rects[state.activeIndex]
    const style: CSSProperties = {
      position: 'absolute',
      width: addUnit(rect.width!),
      'z-index': 0
    }
    const left = rects.slice(0, state.activeIndex).reduce((prev, curr) => prev + Number(curr.width), 0)
    if (left) {
      style.transform = `translateX(${left}px)`
    }
    if (animation) {
      style.transition = 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)'
    }
    state.activeStyle = objToStyle(style)
  })
}

/**
 * 更新选中值并触发相应事件
 * @param {string | number} newValue 新的选中值
 * @param {string | number | SegmentedOption} option 对应的选项数据
 */
function updateValue(newValue: string | number, option: string | number | SegmentedOption) {
  if (!isEqual(newValue, props.value)) {
    emit('update:value', newValue)
    emit('change', isObj(option) ? option : { value: newValue })
  }
}

/**
 * 根据当前值更新激活项的索引
 * 如果未找到匹配项,则默认选中第一项
 */
function updateCurrentIndex() {
  const index = props.options.findIndex((option: string | number | SegmentedOption) => {
    const value = isObj(option) ? option.value : option
    return isEqual(value, props.value)
  })
  if (index >= 0) {
    state.activeIndex = index
  } else {
    const value = isObj(props.options[0]) ? props.options[0].value : props.options[0]
    updateValue(value, props.options[0])
  }
}

/**
 * 处理选项点击事件
 * @param {string | number | SegmentedOption} option 被点击的选项
 * @param {number} index 选项索引
 */
function handleClick(option: string | number | SegmentedOption, index: number) {
  const disabled = props.disabled || (isObj(option) ? option.disabled : false)
  if (disabled) {
    return
  }
  const value = isObj(option) ? option.value : option

  state.activeIndex = index
  updateActiveStyle()
  updateValue(value, option)
  emit('click', isObj(option) ? option : { value })
}

defineExpose<SegmentedExpose>({
  updateActiveStyle
})
</script>

<style lang="scss">
@use './index.scss';
</style>
