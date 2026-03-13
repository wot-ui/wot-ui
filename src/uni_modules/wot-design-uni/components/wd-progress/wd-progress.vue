<template>
  <view
    :class="`wd-progress ${percentPosition.type === 'inner' ? 'wd-progress--inner' : ''} ${status ? 'wd-progress--' + status : ''} ${
      percentage === 0 ? 'is-zero' : ''
    } ${customClass}`"
    :style="customStyle"
  >
    <view class="wd-progress__outer">
      <view class="wd-progress__inner" :style="rootStyle">
        <!-- inner 渲染到 progress__inner 内部 -->
        <template v-if="percentPosition.type === 'inner'">
          <view v-if="!hideText" :class="['wd-progress__label', percentPosition.align ? `is-align-${percentPosition.align}` : '']">
            {{ percentage }}%
          </view>
          <wd-icon
            v-else-if="status"
            :custom-class="`wd-progress__label wd-progress__icon ${hideText ? 'is-hide-text' : ''} ${
              percentPosition.align ? `is-align-${percentPosition.align}` : ''
            }`"
            :name="iconName"
            :color="isString(color) ? color : ''"
          ></wd-icon>
        </template>
      </view>
    </view>
    <!-- outer 渲染到外侧 -->
    <template v-if="percentPosition.type === 'outer'">
      <view v-if="!hideText" class="wd-progress__label">{{ percentage }}%</view>
      <wd-icon
        v-else-if="status"
        :custom-class="`wd-progress__label wd-progress__icon ${hideText ? 'is-hide-text' : ''}`"
        :name="iconName"
        :color="isString(color) ? color : ''"
      ></wd-icon>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-progress',
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
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, ref, watch } from 'vue'
import { isArray, isDef, isObj, isString, objToStyle, pause } from '../common/util'
import { progressProps, type ProgressColor } from './types'

const props = defineProps(progressProps)
// 进度条渲染颜色
const displayColor = ref<string>('')

// 进度条渲染进度比例
const displayPercentage = ref<number>(0)

// 百分比变更差值
const percentageDiff = ref<number>(0)

// 进度条延迟定时器
let animationTimer: ReturnType<typeof setTimeout> | null = null

/**
 * 根节点样式，控制进度条底色、宽度及过渡动画
 */
const rootStyle = computed(() => {
  return objToStyle({
    background: displayColor.value,
    width: `${displayPercentage.value}%`,
    'transition-duration': `${percentageDiff.value * props.duration * 0.001}s`
  })
})

/**
 * 内置或外置图标的名称，根据状态不同返回对应图标
 */
const iconName = computed(() => {
  let icon: string = ''
  switch (props.status) {
    case 'danger':
      icon = 'close-circle-fill'
      break
    case 'success':
      icon = 'check-circle-fill'
      break
    case 'warning':
      icon = 'exclamation-circle-fill'
      break
    default:
      break
  }
  return icon
})

watch(
  () => [props.percentage, props.color, props.duration],
  () => {
    validatePercentage(props.percentage)
    updateProgress()
  },
  { immediate: true }
)

/**
 * 校验 percentage 是否合法
 * @param {number} value 百分比值
 */
function validatePercentage(value: number) {
  if (Number.isNaN(value) || value < 0 || value > 100) {
    console.error('The value of percentage must be between 0 and 100')
  }
}

/**
 * 进度条前进算法
 * @param {ProgressColor[]} partList 颜色及对应进度断点数组
 * @param {number} percentage 目标进度值
 * @returns {boolean}
 */
function updateProgressForward(partList: ProgressColor[], percentage: number) {
  return partList.some((part, index) => {
    if (displayPercentage.value < part.percentage && part.percentage <= percentage) {
      renderProgressStep(part.percentage, part.color)
      return true
    } else if (index === partList.length - 1) {
      renderProgressStep(percentage, part.color)
    }
  })
}

/**
 * 进度条后退算法
 * @param {ProgressColor[]} partList 颜色及对应进度断点数组
 * @param {number} percentage 目标进度值
 * @returns {boolean}
 */
function updateProgressBackward(partList: ProgressColor[], percentage: number) {
  return partList.some((part) => {
    if (percentage <= part.percentage) {
      renderProgressStep(percentage, part.color)
      return true
    }
  })
}

/**
 * 更新进度条的显示逻辑主入口
 * @returns {Promise<void>}
 */
async function updateProgress() {
  const { percentage, color } = props
  if (!isDef(color) || (isArray(color) && color.length === 0)) {
    percentageDiff.value = Math.abs(percentage - displayPercentage.value)
    await pause()
    displayPercentage.value = percentage
    return
  }
  if (displayPercentage.value === percentage) return

  const colorArray = isArray(color) ? color : [color]
  validateColorArray(colorArray)
  const partList = createPartList(colorArray)
  displayPercentage.value > percentage ? updateProgressBackward(partList, percentage) : updateProgressForward(partList, percentage)
}

/**
 * 判断是否是复合类型的颜色及进度数组
 * @param {string[] | ProgressColor[]} array 要判断的数组
 * @returns {array is ProgressColor[]} 判定依据
 */
function isProgressColorArray(array: string[] | ProgressColor[]): array is ProgressColor[] {
  return array.every(
    (color) => isObj(color) && Object.prototype.hasOwnProperty.call(color, 'color') && Object.prototype.hasOwnProperty.call(color, 'percentage')
  )
}

/**
 * 判断是否是纯字符串形式的颜色数组
 * @param {string[] | ProgressColor[]} array 要判断的数组
 * @returns {array is string[]} 判定依据
 */
function isStringArray(array: string[] | ProgressColor[]): array is string[] {
  return array.every((item) => typeof item === 'string')
}

/**
 * 校验颜色数组结构安全性
 * @param {string[] | ProgressColor[]} colorArray 颜色数组
 * @throws {Error} 未遵循 ProgressColor | String 的数组格式将引发错误
 */
function validateColorArray(colorArray: string[] | ProgressColor[]) {
  const isStrArray = isStringArray(colorArray)
  const isObjArray = isProgressColorArray(colorArray)
  if (!isStrArray && !isObjArray) {
    throw Error('Color must be String or Object with color and percentage')
  }
  if (isObjArray && colorArray.some(({ percentage }) => Number.isNaN(percentage))) {
    throw Error('All the percentage must can be formatted to Number')
  }
}

/**
 * 创建基于刻度的颜色渲染流
 * @param {string[] | ProgressColor[]} colorArray 颜色数组
 * @returns {ProgressColor[]} 对齐进度标识后的颜色数组
 */
function createPartList(colorArray: string[] | ProgressColor[]) {
  const partNum = 100 / colorArray.length
  return isProgressColorArray(colorArray)
    ? colorArray.sort((a, b) => a.percentage - b.percentage)
    : colorArray.map((item, index) => ({
        color: item,
        percentage: (index + 1) * partNum
      }))
}

/**
 * 内部驱动方法更新渲染视图及进度
 * @param {number} targetPercent 阶段目标进度
 * @param {string} color 颜色描述
 * @returns {void}
 */
function renderProgressStep(targetPercent: number, color: string) {
  if (animationTimer) return
  const { duration } = props
  percentageDiff.value = Math.abs(targetPercent - displayPercentage.value)
  setTimeout(() => {
    displayPercentage.value = targetPercent
    displayColor.value = color
    animationTimer = setTimeout(() => {
      animationTimer && clearTimeout(animationTimer)
      animationTimer = null
      updateProgress()
    }, percentageDiff.value * duration)
  }, 50)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
