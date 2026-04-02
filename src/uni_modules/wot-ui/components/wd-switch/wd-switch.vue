<template>
  <view :class="rootClass" :style="rootStyle" @click="switchValue">
    <view class="wd-switch__inner" :style="innerStyle">
      <wd-icon custom-class="wd-switch__inner-icon" :name="innerIcon" v-if="innerIcon" :class-prefix="classPrefix"></wd-icon>
      <text v-else class="wd-switch__inner-text">{{ isActive ? activeText : inactiveText }}</text>
    </view>
    <view class="wd-switch__action">
      <wd-loading v-bind="customLoadingProps" v-if="loading"></wd-loading>
      <wd-icon custom-class="wd-switch__action-icon" :name="actionIcon" v-else-if="actionIcon" :class-prefix="classPrefix"></wd-icon>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-switch',
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
import { computed, type CSSProperties, onBeforeMount } from 'vue'
import { callInterceptor } from '../../common/interceptor'
import { addUnit, isDef, isUndefined, objToStyle, omitBy } from '../../common/util'
import { switchProps } from './types'
import { type LoadingProps } from '../wd-loading/types'

const props = defineProps(switchProps)
const emit = defineEmits(['change', 'update:modelValue'])

const isActive = computed(() => {
  return props.modelValue === props.activeValue
})

const rootClass = computed(() => {
  return `wd-switch ${props.customClass} ${props.disabled ? 'is-disabled' : ''} ${props.loading ? 'is-loading' : ''} wd-switch--${props.shape} is-${
    isActive.value ? 'active' : 'inactive'
  }`
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.size) {
    style['font-size'] = addUnit(props.size)
  }
  return `${objToStyle(style)}${props.customStyle}`
})

const innerStyle = computed(() => {
  const style: CSSProperties = {
    background: isActive.value ? props.activeColor : props.inactiveColor
  }
  return `${objToStyle(style)}$`
})

const innerIcon = computed(() => {
  return isActive.value ? props.activeIcon : props.inactiveIcon
})

const actionIcon = computed(() => {
  return isActive.value ? props.activeActionIcon : props.inactiveActionIcon
})

const customLoadingProps = computed<Partial<LoadingProps>>(() => {
  const overrides: Partial<LoadingProps> = isDef(props.loadingProps) ? omitBy(props.loadingProps, isUndefined) : {}
  const customSpinnerClass = [isDef(overrides.customSpinnerClass) ? overrides.customSpinnerClass : '', 'wd-switch__action-loading']
    .filter(Boolean)
    .join(' ')

  const type = isDef(overrides.type) ? overrides.type : 'spinner'

  return { ...overrides, customSpinnerClass, type }
})

function switchValue() {
  if (props.disabled || props.loading) return
  const newVal = isActive.value ? props.inactiveValue : props.activeValue
  const doSwitch = () => {
    emit('update:modelValue', newVal)
    emit('change', {
      value: newVal
    })
  }

  callInterceptor(props.beforeChange, {
    args: [newVal],
    done: doSwitch
  })
}

onBeforeMount(() => {
  if ([props.activeValue, props.inactiveValue].indexOf(props.modelValue) === -1) {
    emit('update:modelValue', props.inactiveValue)
    emit('change', {
      value: props.inactiveValue
    })
  }
})
</script>
<style lang="scss">
@use './index.scss';
</style>
