<template>
  <view
    :class="['wd-cell', isBorder ? 'is-border' : '', cellSize ? 'is-' + cellSize : '', isCenter ? 'is-center' : '', customClass]"
    :style="customStyle"
    :hover-class="isLink || clickable ? 'is-hover' : 'none'"
    :hover-stay-time="70"
    @click="onClick"
  >
    <view :class="`wd-cell__wrapper wd-cell__wrapper--${cellLayout}`">
      <view
        v-if="showLeft"
        class="wd-cell__left"
        :style="cellTitleWidth ? 'min-width:' + addUnit(cellTitleWidth) + ';max-width:' + addUnit(cellTitleWidth) + ';' : ''"
      >
        <text v-if="required && !hideAsterisk && asteriskPosition === 'start'" class="wd-cell__required wd-cell__required--left">*</text>
        <!--前置图标-->
        <slot name="prefix">
          <wd-icon
            v-if="prefixIcon"
            :name="prefixIcon"
            :size="iconSize"
            :class-prefix="iconPrefix"
            :custom-class="`wd-cell__prefix ${customPrefixClass}`"
          ></wd-icon>
        </slot>

        <view class="wd-cell__title">
          <!--title BEGIN-->
          <slot v-if="useTitleSlot && $slots.title" name="title"></slot>
          <text v-else-if="title" :class="customTitleClass">{{ title }}</text>

          <!--title END-->

          <!--label BEGIN-->
          <slot name="label">
            <view v-if="label" :class="`wd-cell__label ${customLabelClass}`">{{ label }}</view>
          </slot>
          <!--label END-->
        </view>
        <text v-if="required && !hideAsterisk && asteriskPosition === 'end'" class="wd-cell__required">*</text>
      </view>
      <!--right content BEGIN-->
      <view class="wd-cell__right">
        <view class="wd-cell__body">
          <!--文案内容-->
          <view
            :class="`wd-cell__value ${customValueClass} wd-cell__value--${cellValueAlign} ${ellipsis ? 'wd-cell__value--ellipsis' : ''} ${
              showPlaceholder ? 'wd-cell__placeholder' : ''
            }`"
          >
            <slot>
              {{ showPlaceholder ? placeholder : value }}
            </slot>
          </view>
          <!--后置图标/箭头-->
          <wd-icon v-if="isLink" custom-class="wd-cell__arrow-right" :name="arrowDirection" :class-prefix="iconPrefix" />
          <slot v-else name="suffix">
            <wd-icon
              v-if="suffixIcon"
              :name="suffixIcon"
              :size="iconSize"
              :class-prefix="iconPrefix"
              :custom-class="`wd-cell__suffix ${customSuffixClass}`"
            ></wd-icon>
          </slot>
        </view>
      </view>
      <!--right content END-->
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-cell',
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
import { computed, useSlots } from 'vue'
import { useCell } from '../composables/useCell'

import { cellProps } from './types'
import { addUnit, isDef } from '../common/util'

const props = defineProps(cellProps)
const emit = defineEmits<{
  (e: 'click'): void
}>()

// 获取插槽
const slots = useSlots()

const cell = useCell()

const isBorder = computed(() => {
  return Boolean(isDef(props.border) ? props.border : cell.border.value)
})

// 支持 cell-group 公共配置，子组件属性优先
const isCenter = computed(() => {
  return isDef(props.center) ? props.center : cell.center?.value
})

// 支持 cell-group 公共配置，子组件属性优先
const cellSize = computed(() => {
  return isDef(props.size) ? props.size : cell.size?.value
})

// 支持 cell-group 公共配置，子组件属性优先
const cellTitleWidth = computed(() => {
  return isDef(props.titleWidth) ? props.titleWidth : cell.titleWidth?.value
})

// 支持 cell-group 公共配置，子组件属性优先
const cellLayout = computed(() => {
  return isDef(props.layout) ? props.layout : cell.layout?.value || 'horizontal'
})

// 支持 cell-group 公共配置，子组件属性优先
const cellValueAlign = computed(() => {
  return isDef(props.valueAlign) ? props.valueAlign : cell.valueAlign?.value || 'right'
})

// 是否展示左侧部分
const showLeft = computed(() => {
  // 插槽优先级高于props
  // 有prefix插槽或prefixIcon属性
  const hasPrefix = slots.prefix || props.prefixIcon
  // 有title插槽或title属性
  const hasTitle = (slots.title && props.useTitleSlot) || props.title
  // 有label插槽或label属性
  const hasLabel = slots.label || props.label

  return hasPrefix || hasTitle || hasLabel
})

const showPlaceholder = computed(() => {
  return Boolean(props.placeholder && (props.value === '' || props.value === undefined || props.value === null) && !slots.default)
})

/**
 * 点击单元格时触发
 * 处理点击事件和页面跳转
 */
function onClick() {
  const url = props.to

  if (props.clickable || props.isLink) {
    emit('click')
  }
  if (url && props.isLink) {
    if (props.replace) {
      uni.redirectTo({ url })
    } else {
      uni.navigateTo({ url })
    }
  }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
