<template>
  <view class="wd-year-panel">
    <!-- 切换模式导航控制栏 -->
    <view class="wd-year-panel__controls" v-if="switchMode !== 'none'">
      <view class="wd-year-panel__control">
        <wd-icon
          name="left"
          :custom-class="`wd-year-panel__control-icon ${isPrevYearDisabled ? 'is-disabled' : ''}`"
          @click="!isPrevYearDisabled && changeYear(-1)"
        />
      </view>
      <text class="wd-year-panel__controls-title">{{ controlsTitle }}</text>
      <view class="wd-year-panel__control">
        <wd-icon
          name="right"
          :custom-class="`wd-year-panel__control-icon ${isNextYearDisabled ? 'is-disabled' : ''}`"
          @click="!isNextYearDisabled && changeYear(1)"
        />
      </view>
    </view>

    <!-- 面板标题（仅滚动模式显示） -->
    <view v-if="showPanelTitle && switchMode === 'none'" class="wd-year-panel__title">{{ title }}</view>

    <scroll-view
      class="wd-year-panel__container"
      :style="`height: ${scrollHeight}px`"
      :scroll-y="true"
      :scroll-top="scrollTop"
      @scroll="switchMode === 'none' ? yearScroll($event) : undefined"
    >
      <view v-for="(item, index) in displayYears" :key="index" :id="`year${index}`">
        <year
          :type="type"
          :date="item.date"
          :value="value"
          :min-date="minDate"
          :max-date="maxDate"
          :max-range="maxRange"
          :formatter="formatter"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          :showTitle="switchMode === 'none' && index !== 0"
          @change="handleDateChange"
        />
      </view>
    </scroll-view>
  </view>
</template>
<script lang="ts">
export default {
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
import { computed, ref, onMounted } from 'vue'
import { compareYear, formatYearTitle, getYears } from '../utils'
import { isArray, isNumber, pause } from '../../../common/util'
import Year from '../year/year.vue'
import { yearPanelProps, type YearInfo, type YearPanelExpose } from './types'

const props = defineProps(yearPanelProps)
const emit = defineEmits(['change'])

const scrollTop = ref<number>(0) // 滚动位置
const scrollIndex = ref<number>(0) // 当前显示的年份索引

/**
 * 当前显示的年份（仅在 switchMode !== 'none' 时使用）
 */
const currentDisplayYear = ref<number>(new Date().getFullYear())

// 滚动区域的高度
const scrollHeight = computed(() => {
  const scrollHeight: number = props.panelHeight + (props.showPanelTitle ? 26 : 16)
  return scrollHeight
})

// 年份信息（滚动模式）
const years = computed<YearInfo[]>(() => {
  return getYears(props.minDate, props.maxDate).map((year, index) => {
    return {
      date: year,
      height: index === 0 ? 188 : 228
    }
  })
})

/**
 * 当前显示年份的时间戳（仅在 switchMode !== 'none' 时使用）
 */
const currentYearDate = computed(() => {
  return new Date(currentDisplayYear.value, 0, 1).getTime()
})

/**
 * 用于渲染的年份列表
 * - switchMode = 'none'：返回所有年份（滚动模式）
 * - switchMode = 'month' | 'year-month'：返回当前显示年份（固定模式）
 */
const displayYears = computed<YearInfo[]>(() => {
  if (props.switchMode === 'none') {
    return years.value
  }
  // 固定模式：只返回当前显示的年份
  return [
    {
      date: currentYearDate.value,
      height: 188
    }
  ]
})

/**
 * 控制栏标题（切换模式下显示的年份）
 */
const controlsTitle = computed(() => {
  return formatYearTitle(currentYearDate.value)
})

// 标题（滚动模式下显示的年份）
const title = computed(() => {
  return formatYearTitle(years.value[scrollIndex.value].date)
})

/**
 * 是否禁用上一年按钮
 */
const isPrevYearDisabled = computed(() => {
  const minYear = new Date(props.minDate).getFullYear()
  return currentDisplayYear.value <= minYear
})

/**
 * 是否禁用下一年按钮
 */
const isNextYearDisabled = computed(() => {
  const maxYear = new Date(props.maxDate).getFullYear()
  return currentDisplayYear.value >= maxYear
})

/**
 * 切换年份
 * @param delta 偏移量，-1 表示上一年，1 表示下一年
 */
function changeYear(delta: number) {
  currentDisplayYear.value += delta
}

onMounted(() => {
  // 初始化当前显示年份（switchMode !== 'none' 时使用）
  if (props.switchMode !== 'none') {
    initCurrentDisplayYear()
  }
  scrollIntoView()
})

/**
 * 初始化当前显示年份
 * 根据选中值或当前日期设置初始年份
 */
function initCurrentDisplayYear() {
  let activeDate: number | null = null

  if (isArray(props.value)) {
    activeDate = props.value![0]
  } else if (isNumber(props.value)) {
    activeDate = props.value
  }

  if (!activeDate) {
    activeDate = Date.now()
  }

  currentDisplayYear.value = new Date(activeDate).getFullYear()
}

async function scrollIntoView() {
  await pause()
  let activeDate: number | null = null
  if (isArray(props.value)) {
    activeDate = props.value![0]
  } else if (isNumber(props.value)) {
    activeDate = props.value
  }

  if (!activeDate) {
    activeDate = Date.now()
  }

  let top: number = 0
  for (let index = 0; index < years.value.length; index++) {
    if (compareYear(years.value[index].date, activeDate) === 0) {
      break
    }
    top += years.value[index] ? Number(years.value[index].height) : 0
  }
  scrollTop.value = 0
  if (top > 0) {
    await pause()
    scrollTop.value = top + 40
  }
}

const yearScroll = (event: { detail: { scrollTop: number } }) => {
  if (years.value.length <= 1) {
    return
  }
  const scrollTop = Math.max(0, event.detail.scrollTop)
  doSetSubtitle(scrollTop)
}

/**
 * 设置小标题
 * scrollTop 滚动条位置
 */
function doSetSubtitle(scrollTop: number) {
  let height: number = 0 // 月份高度和
  for (let index = 0; index < years.value.length; index++) {
    height = height + years.value[index].height
    if (scrollTop < height) {
      scrollIndex.value = index
      return
    }
  }
}

function handleDateChange({ value }: { value: number[] }) {
  emit('change', {
    value
  })
}

defineExpose<YearPanelExpose>({
  scrollIntoView
})
</script>

<style lang="scss">
@use './index.scss';
</style>
