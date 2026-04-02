<template>
  <view
    v-if="currentStatus"
    :class="`wd-step wd-step--${currentStatus} ${customClass} ${canAlignCenter ? 'is-center' : ''}  ${vertical ? 'is-vertical' : ''}`"
    :style="rootStyle"
  >
    <view :class="`wd-step__header ${dot ? 'is-dot' : ''}`">
      <view :class="`wd-step__indicator  ${dot ? 'is-dot' : !!icon || $slots.icon ? 'is-icon' : 'is-text'}`">
        <view v-if="dot" class="wd-step__dot"></view>
        <slot v-else-if="$slots.icon || icon" name="icon">
          <wd-icon v-if="icon" custom-class="wd-step__icon" :name="icon" />
        </slot>
        <view v-else class="wd-step__circle">
          <wd-icon custom-class="wd-step__finished-icon" v-if="currentStatus === 'finished'" name="check" />
          <wd-icon custom-class="wd-step__error-icon" v-else-if="currentStatus === 'error'" name="close" />
          <text class="wd-step__circle-text" v-else>{{ index + 1 }}</text>
        </view>
      </view>
      <view v-if="index < childrenLength - 1" class="wd-step__line"></view>
    </view>
    <view class="wd-step__content" v-if="$slots.title || currentTitle || $slots.description || description">
      <slot name="title" v-if="$slots.title || currentTitle">
        <text class="wd-step__title">{{ currentTitle }}</text>
      </slot>
      <slot name="description" v-if="$slots.description || description">
        <text class="wd-step__description">{{ description }}</text>
      </slot>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-step',
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
import { computed } from 'vue'
import { useParent } from '../../composables/useParent'
import { STEPS_KEY } from '../wd-steps/types'
import { isDef, objToStyle } from '../../common/util'
import { useTranslate } from '../../composables/useTranslate'
import { stepProps, type StepStatus } from './types'
import type { CSSProperties } from 'vue'

const props = defineProps(stepProps)

const { parent: steps, index } = useParent(STEPS_KEY)

const { translate } = useTranslate('steps')

/**
 * 获取当前步骤的状态
 */
const currentStatus = computed<StepStatus | ''>(() => {
  return getCurrentStatus(index.value)
})

/**
 * 获取当前步骤的标题
 */
const currentTitle = computed<string>(() => {
  return getCurrentTitle(currentStatus.value)
})

/**
 * 根节点样式
 */
const rootStyle = computed<string>(() => {
  const style: CSSProperties = {}
  if (steps.value) {
    const { vertical, space } = steps.value.props
    if (vertical) {
      if (space && space !== '') {
        style['height'] = space
      }
    } else {
      style['width'] = space && space !== '' ? space : 100 / steps.value.children.length + '%'
    }
  }
  return `${objToStyle(style)}${props.customStyle}`
})

/**
 * 是否居中对齐
 */
const canAlignCenter = computed<boolean>(() => {
  if (isDef(steps.value)) {
    const { vertical, alignCenter } = steps.value.props
    return Boolean(!vertical && alignCenter)
  } else {
    return false
  }
})

/**
 * 是否垂直布局
 */
const vertical = computed<boolean>(() => {
  if (isDef(steps.value)) {
    return Boolean(steps.value.props.vertical)
  } else {
    return false
  }
})

/**
 * 是否使用点状指示器
 */
const dot = computed<boolean>(() => {
  if (isDef(steps.value)) {
    return Boolean(steps.value.props.dot)
  } else {
    return false
  }
})

/**
 * 步骤总数量
 */
const childrenLength = computed<number>(() => {
  if (isDef(steps.value)) {
    return Number(steps.value.children.length)
  } else {
    return 0
  }
})

/**
 * 获取状态
 * @param index 索引
 */
function getCurrentStatus(index: number): StepStatus | '' {
  if (props.status) {
    return props.status
  }

  if (steps.value) {
    const { active } = steps.value.props
    if (Number(active) > index) {
      return 'finished'
    } else if (Number(active) === index) {
      return 'process'
    } else {
      return 'wait'
    }
  } else {
    return 'wait' // 默认如果不在Steps中，直接渲染等待
  }
}

/**
 * 获取默认标题
 * @param currentStatus 当前状态
 */
function getCurrentTitle(currentStatus: string): string {
  if (props.title) return props.title

  switch (currentStatus) {
    case 'finished':
      return translate('finished')
    case 'error':
      return translate('failed')
    case 'process':
      return translate('process')
    case 'wait':
    default:
      return translate('wait')
  }
}
</script>
<style lang="scss">
@use './index.scss';
</style>
