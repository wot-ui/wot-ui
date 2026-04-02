<template>
  <view :class="`wd-rate ${disabled ? 'is-disabled' : ''} ${block ? 'is-block' : ''} ${customClass}`" :style="customStyle" @touchmove="onTouchMove">
    <view
      v-for="(rate, index) in rateList"
      :key="index"
      :data-index="index"
      class="wd-rate__item"
      :style="`${isDef(space) ? `margin-right: ${index == rateList.length - 1 ? 0 : addUnit(space)}` : ''}`"
    >
      <wd-icon
        :custom-class="`wd-rate__item-star ${rate === '100%' ? 'wd-rate__item-star--active' : ''}`"
        :name="isActive(rate) ? activeIcon : icon"
        :custom-style="`${rate === '100%' ? iconActiveStyle : iconStyle} ${iconSize}`"
        @click="handleClick(index, false)"
      />
      <view v-if="props.allowHalf" class="wd-rate__item-half" @click.stop="handleClick(index, true)">
        <wd-icon
          :custom-class="`wd-rate__item-star ${rate !== '0' ? 'wd-rate__item-star--active' : ''}`"
          :name="isActive(rate) ? activeIcon : icon"
          :custom-style="`${rate !== '0' ? iconActiveStyle : iconStyle} ${iconSize}`"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-rate',
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
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { rateProps } from './types'
import { addUnit, getRect, isDef } from '../../common/util'
const { proxy } = getCurrentInstance() as any

const props = defineProps(rateProps)
const emit = defineEmits(['update:modelValue', 'change'])

const rateList = ref<Array<string>>([])
const iconStyle = computed(() => {
  if (!props.color) return ''
  return `background:${props.color};`
})

const iconSize = computed(() => {
  if (isDef(props.size)) {
    return `font-size:${addUnit(props.size)};`
  }
  return ''
})

const iconActiveStyle = computed(() => {
  const { activeColor, modelValue, num } = props
  let color = ''
  if (Array.isArray(activeColor)) {
    if (activeColor.length === 0) {
      console.error('activeColor cannot be an empty array')
    } else {
      color = Number(modelValue) <= num * 0.6 || !activeColor[1] ? activeColor[0] : activeColor[1]
    }
  } else {
    color = activeColor as string
  }
  return `background:${color};`
})

watch(
  [() => props.num, () => props.modelValue],
  () => {
    computeRateList()
  },
  {
    immediate: true,
    deep: true
  }
)

// 当前选项是否为激活状态
const isActive = (rate: string) => {
  return rate !== '0'
}

/**
 * @description 计算当前应当展示的rate数量
 */
function computeRateList() {
  const { modelValue, num, allowHalf } = props
  // value和num都准备好才能计算
  if (modelValue === null || !num) return
  if (typeof modelValue !== 'number') {
    console.error('[wot ui] error(wd-rate): the value of wd-rate should be a number')
    return
  }
  const tempRateList: string[] = []
  const fullLength = Math.floor(modelValue)
  for (let i = 0; i < num; i++) {
    if (i < fullLength) {
      tempRateList.push('100%')
    } else if (i === fullLength && allowHalf && modelValue % 1 !== 0) {
      tempRateList.push('50%')
    } else {
      tempRateList.push('0')
    }
  }
  rateList.value = tempRateList
}

/**
 * @description 处理点击事件
 * @param index 点击的索引
 * @param isHalf 是否为半星
 */
function handleClick(index: number, isHalf: boolean) {
  const { readonly, disabled, clearable, allowHalf, modelValue } = props
  if (readonly || disabled) return
  let value = isHalf ? index + 0.5 : index + 1
  // 点击清空逻辑：当点击的值与当前modelValue相等且等于最小值时允许清空
  if (clearable) {
    const minValue = allowHalf ? 0.5 : 1
    if (value === modelValue && value === minValue) {
      value = 0
    }
  }
  updateValue(value)
}

/**
 * @description 设置评分值并触发事件
 */
function updateValue(value: number) {
  emit('update:modelValue', value)
  emit('change', {
    value
  })
}

async function onTouchMove(event: TouchEvent) {
  if (props.readonly || props.disabled) return
  const { clientX } = event.touches[0]
  const rateItems = await getRect('.wd-rate__item', true, proxy)
  const targetIndex = Array.from(rateItems).findIndex((rect) => {
    return clientX >= rect.left! && clientX <= rect.right!
  })
  if (targetIndex !== -1) {
    const target = rateItems[targetIndex]
    const itemWidth = target.width!
    const isHalf = props.allowHalf && clientX - target.left! < itemWidth / 2
    const value = isHalf ? targetIndex + 0.5 : targetIndex + 1
    if (value >= 0.5) {
      const value = isHalf ? targetIndex + 0.5 : targetIndex + 1
      updateValue(value)
    }
  }
}
</script>
<style lang="scss">
@use './index.scss';
</style>
