<template>
  <view class="wd-month-panel">
    <!-- 切换模式导航控制栏 -->
    <view class="wd-month-panel__controls" v-if="switchMode !== 'none'">
      <view class="wd-month-panel__control">
        <wd-icon
          v-if="switchMode === 'year-month'"
          name="double-left"
          :custom-class="`wd-month-panel__control-icon ${isPrevYearDisabled ? 'is-disabled' : ''}`"
          @click="!isPrevYearDisabled && changeYear(-1)"
        />
        <wd-icon
          name="left"
          :custom-class="`wd-month-panel__control-icon ${isPrevMonthDisabled ? 'is-disabled' : ''}`"
          @click="!isPrevMonthDisabled && changeMonth(-1)"
        />
      </view>
      <text class="wd-month-panel__controls-title">{{ controlsTitle }}</text>
      <view class="wd-month-panel__control">
        <wd-icon
          name="right"
          :custom-class="`wd-month-panel__control-icon ${isNextMonthDisabled ? 'is-disabled' : ''}`"
          @click="!isNextMonthDisabled && changeMonth(1)"
        />
        <wd-icon
          v-if="switchMode === 'year-month'"
          name="double-right"
          :custom-class="`wd-month-panel__control-icon ${isNextYearDisabled ? 'is-disabled' : ''}`"
          @click="!isNextYearDisabled && changeYear(1)"
        />
      </view>
    </view>

    <view class="wd-month-panel__weeks">
      <view v-for="item in 7" :key="item" class="wd-month-panel__week">{{ weekLabel(item + firstDayOfWeek) }}</view>
    </view>

    <!-- 面板标题（仅滚动模式显示） -->
    <view v-if="showPanelTitle && switchMode === 'none'" class="wd-month-panel__title">
      {{ title }}
    </view>

    <scroll-view
      :class="`wd-month-panel__container ${!!timeType ? 'wd-month-panel__container--time' : ''}`"
      :style="containerStyle"
      :scroll-y="true"
      :scroll-top="scrollTop"
      @scroll="switchMode === 'none' ? monthScroll($event) : undefined"
    >
      <view v-for="(item, index) in displayMonths" :key="index" :id="`month${index}`">
        <month
          :type="type"
          :date="item.date"
          :value="value"
          :min-date="minDate"
          :max-date="maxDate"
          :first-day-of-week="firstDayOfWeek"
          :formatter="formatter"
          :max-range="maxRange"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          :showTitle="switchMode === 'none' && index !== 0"
          @change="handleDateChange"
        />
      </view>
    </scroll-view>

    <view v-if="timeType" class="wd-month-panel__time">
      <view v-if="type === 'datetimerange'" class="wd-month-panel__time-label">
        <view class="wd-month-panel__time-text">{{ timeType === 'start' ? translate('startTime') : translate('endTime') }}</view>
      </view>
      <view class="wd-month-panel__time-picker">
        <wd-datetime-picker-view
          v-model="timeValue"
          type="time"
          :item-height="itemHeight"
          :visible-item-count="visibleItemCount"
          :immediate-change="immediateChange"
          :filter="timeFilter"
          :formatter="internalTimeFormatter"
          :use-second="!hideSecond"
          @change="handleTimeChange"
          @pickstart="handlePickStart"
          @pickend="handlePickEnd"
        />
      </view>
    </view>
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
import wdDatetimePickerView from '../../wd-datetime-picker-view/wd-datetime-picker-view.vue'
import { computed, ref, watch, onMounted, type CSSProperties } from 'vue'
import { debounce, isArray, isEqual, isNumber, pause, padZero, addUnit, objToStyle } from '../../../common/util'
import { compareMonth, formatMonthTitle, getMonthEndDay, getMonths, getWeekLabel } from '../utils'
import Month from '../month/month.vue'
import { monthPanelProps, type MonthInfo, type MonthPanelTimeType, type MonthPanelExpose } from './types'
import { useTranslate } from '../../../composables/useTranslate'
import { type CalendarTimeFormatter } from '../types'
const props = defineProps(monthPanelProps)
const emit = defineEmits(['change', 'pickstart', 'pickend'])

const { translate } = useTranslate('calendar-view')

const scrollTop = ref<number>(0) // 滚动位置
const scrollIndex = ref<number>(0) // 当前显示的月份索引
const timeValue = ref<string>('') // 当前选中的时分秒 HH:mm:ss

/**
 * 当前显示的月份（仅在 switchMode !== 'none' 时使用）
 * 存储格式：{ year: number, month: number }
 */
const currentDisplayMonth = ref<{ year: number; month: number }>({
  year: new Date().getFullYear(),
  month: new Date().getMonth()
})

const timeType = ref<MonthPanelTimeType>('') // 当前时间类型，是开始还是结束
const innerValue = ref<string | number | (number | null)[]>('') // 内部保存一个值，用于判断新老值，避免监听器触发

const handleChange = debounce((value) => {
  emit('change', {
    value
  })
}, 50)

/**
 * 当前显示月份的时间戳（仅在 switchMode !== 'none' 时使用）
 */
const currentMonthDate = computed(() => {
  return new Date(currentDisplayMonth.value.year, currentDisplayMonth.value.month, 1).getTime()
})

/**
 * 控制栏标题（切换模式下显示的年月）
 */
const controlsTitle = computed(() => {
  return formatMonthTitle(currentMonthDate.value)
})

// 标题（滚动模式下显示的年月）
const title = computed(() => {
  return formatMonthTitle(months.value[scrollIndex.value].date)
})

/**
 * 获取月份的起始时间戳（当月1日 00:00:00）
 */
function getMonthStart(year: number, month: number): number {
  return new Date(year, month, 1).getTime()
}

/**
 * 是否禁用上个月按钮
 */
const isPrevMonthDisabled = computed(() => {
  const { year, month } = currentDisplayMonth.value
  const prevMonthStart = getMonthStart(year, month - 1)
  const minMonthStart = getMonthStart(new Date(props.minDate).getFullYear(), new Date(props.minDate).getMonth())
  return prevMonthStart < minMonthStart
})

/**
 * 是否禁用下个月按钮
 */
const isNextMonthDisabled = computed(() => {
  const { year, month } = currentDisplayMonth.value
  const nextMonthStart = getMonthStart(year, month + 1)
  const maxMonthStart = getMonthStart(new Date(props.maxDate).getFullYear(), new Date(props.maxDate).getMonth())
  return nextMonthStart > maxMonthStart
})

/**
 * 是否禁用上一年按钮
 */
const isPrevYearDisabled = computed(() => {
  const { year, month } = currentDisplayMonth.value
  const prevYear = year - 1
  const minYear = new Date(props.minDate).getFullYear()
  const minMonth = new Date(props.minDate).getMonth()

  // 如果上一年小于最小年份，禁用
  if (prevYear < minYear) {
    return true
  }

  // 如果上一年等于最小年份，且当前月份小于最小月份，禁用
  if (prevYear === minYear && month < minMonth) {
    return true
  }

  return false
})

/**
 * 是否禁用下一年按钮
 */
const isNextYearDisabled = computed(() => {
  const { year, month } = currentDisplayMonth.value
  const nextYear = year + 1
  const maxYear = new Date(props.maxDate).getFullYear()
  const maxMonth = new Date(props.maxDate).getMonth()

  // 如果下一年大于最大年份，禁用
  if (nextYear > maxYear) {
    return true
  }

  // 如果下一年等于最大年份，且当前月份大于最大月份，禁用
  if (nextYear === maxYear && month > maxMonth) {
    return true
  }

  return false
})

/**
 * 切换月份
 * @param delta 偏移量，-1 表示上个月，1 表示下个月
 */
function changeMonth(delta: number) {
  const { year, month } = currentDisplayMonth.value
  const newDate = new Date(year, month + delta, 1)
  currentDisplayMonth.value = {
    year: newDate.getFullYear(),
    month: newDate.getMonth()
  }
}

/**
 * 切换年份
 * @param delta 偏移量，-1 表示上一年，1 表示下一年
 */
function changeYear(delta: number) {
  const { year, month } = currentDisplayMonth.value
  const newDate = new Date(year + delta, month, 1)
  currentDisplayMonth.value = {
    year: newDate.getFullYear(),
    month: newDate.getMonth()
  }
}

// 周标题
const weekLabel = computed(() => {
  return (index: number) => {
    return getWeekLabel(index - 1)
  }
})

// 滚动区域的高度
const containerStyle = computed(() => {
  const style: CSSProperties = {
    height: timeType.value ? addUnit(props.panelHeight - 120) : addUnit(props.panelHeight)
  }
  return objToStyle(style)
})

// 月份日期和月份高度
const months = computed<MonthInfo[]>(() => {
  return getMonths(props.minDate, props.maxDate).map((month, index) => {
    const offset = (7 + new Date(month).getDay() - props.firstDayOfWeek) % 7
    const totalDay = getMonthEndDay(new Date(month).getFullYear(), new Date(month).getMonth() + 1)
    const rows = Math.ceil((offset + totalDay) / 7)
    return {
      height: rows * 60 + (rows - 1) * 4 + (index === 0 ? 0 : 40), // 每行60px高度,除最后一行外每行加4px margin,加上标题40px
      date: month
    }
  })
})

/**
 * 用于渲染的月份列表
 * - switchMode = 'none'：返回所有月份（滚动模式）
 * - switchMode = 'month' | 'year-month'：返回当前显示月份（固定模式）
 */
const displayMonths = computed<MonthInfo[]>(() => {
  if (props.switchMode === 'none') {
    return months.value
  }
  // 固定模式：只返回当前显示的月份
  const offset = (7 + new Date(currentMonthDate.value).getDay() - props.firstDayOfWeek) % 7
  const totalDay = getMonthEndDay(currentDisplayMonth.value.year, currentDisplayMonth.value.month + 1)
  const rows = Math.ceil((offset + totalDay) / 7)
  return [
    {
      height: rows * 60 + (rows - 1) * 4,
      date: currentMonthDate.value
    }
  ]
})

watch(
  () => props.type,
  (val) => {
    if (
      (val === 'datetime' && props.value) ||
      (val === 'datetimerange' && isArray(props.value) && props.value && props.value.length > 0 && props.value[0])
    ) {
      setTime(props.value, 'start')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.value,
  (val) => {
    if (isEqual(val, innerValue.value)) return

    if ((props.type === 'datetime' && val) || (props.type === 'datetimerange' && val && isArray(val) && val.length > 0 && val[0])) {
      setTime(val, 'start')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

onMounted(() => {
  // 初始化当前显示月份（switchMode !== 'none' 时使用）
  if (props.switchMode !== 'none') {
    initCurrentDisplayMonth()
  }
  scrollIntoView()
})

/**
 * 初始化当前显示月份
 * 根据选中值或当前日期设置初始月份
 */
function initCurrentDisplayMonth() {
  let activeDate: number | null = null

  if (isArray(props.value)) {
    const sortedValue = [...props.value].sort((a, b) => (a || 0) - (b || 0))
    activeDate = sortedValue[0]
  } else if (isNumber(props.value)) {
    activeDate = props.value
  }

  if (!activeDate) {
    activeDate = Date.now()
  }

  // 确保日期在 minDate 和 maxDate 范围内
  if (activeDate < props.minDate) {
    activeDate = props.minDate
  } else if (activeDate > props.maxDate) {
    activeDate = props.maxDate
  }

  const date = new Date(activeDate)
  currentDisplayMonth.value = {
    year: date.getFullYear(),
    month: date.getMonth()
  }
}

/**
 * 使当前日期或者选中日期滚动到可视区域
 */
async function scrollIntoView() {
  // 等待渲染完毕
  await pause()
  let activeDate: number | null = 0
  if (isArray(props.value)) {
    // 对数组按时间排序,取第一个值
    const sortedValue = [...props.value].sort((a, b) => (a || 0) - (b || 0))
    activeDate = sortedValue[0]
  } else if (isNumber(props.value)) {
    activeDate = props.value
  }

  if (!activeDate) {
    activeDate = Date.now()
  }

  let top: number = 0
  let activeMonthIndex = -1
  for (let index = 0; index < months.value.length; index++) {
    if (compareMonth(months.value[index].date, activeDate) === 0) {
      activeMonthIndex = index
      // 找到选中月份后,计算选中日期在月份中的位置
      const date = new Date(activeDate)
      const day = date.getDate()
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
      const offset = (7 + firstDay.getDay() - props.firstDayOfWeek) % 7
      const row = Math.floor((offset + day - 1) / 7)
      // 每行高度60px,每行加4px margin
      top += row * 60 + row * 4
      break
    }
    top += months.value[index] ? Number(months.value[index].height) : 0
  }
  scrollTop.value = 0
  if (top > 0) {
    await pause()
    // 如果不是第一个月才加45
    scrollTop.value = top + (activeMonthIndex > 0 ? 40 : 0)
  }
}

const internalTimeFormatter: CalendarTimeFormatter = (type, value) => {
  if (props.timeFormatter) {
    return props.timeFormatter(type, value)
  }
  return translate(type, value)
}

/**
 * 获取 date 的时分秒字符串 HH:mm:ss
 * @param {timestamp} date 时间
 * @param {string} type 类型，是开始还是结束
 */
function getTimeValue(date: number | (number | null)[], type: MonthPanelTimeType) {
  let dateValue: Date = new Date()
  if (props.type === 'datetime') {
    dateValue = new Date(date as number)
  } else if (isArray(date)) {
    if (type === 'start') {
      dateValue = new Date(date[0] || '')
    } else {
      dateValue = new Date(date[1] || '')
    }
  }

  const hour = padZero(dateValue.getHours())
  const minute = padZero(dateValue.getMinutes())
  const second = padZero(dateValue.getSeconds())
  return props.hideSecond ? `${hour}:${minute}` : `${hour}:${minute}:${second}`
}

function setTime(value: number | (number | null)[], type?: MonthPanelTimeType) {
  if (isArray(value) && value[0] && value[1] && type === 'start' && timeType.value === 'start') {
    type = 'end'
  }
  timeType.value = type || ''
  timeValue.value = getTimeValue(value, type || '')
}
function handleDateChange({ value, type }: { value: number | (number | null)[]; type?: MonthPanelTimeType }) {
  if (!isEqual(value, props.value)) {
    // 内部保存一个值，用于判断新老值，避免监听器触发
    innerValue.value = value
    handleChange(value)
  }
  // datetime 和 datetimerange 类型，需要展示时间
  if (props.type.indexOf('time') > -1) {
    setTime(value, type)
  }
}

function handleTimeChange({ value }: { value: string }) {
  if (!props.value) {
    return
  }
  const [hour, minute, second] = value.split(':').map(Number)

  if (props.type === 'datetime' && isNumber(props.value)) {
    const date = new Date(props.value)
    date.setHours(hour)
    date.setMinutes(minute)
    date.setSeconds(props.hideSecond ? 0 : second || 0)
    const dateTime = date.getTime()
    handleChange(dateTime)
  } else if (isArray(props.value) && props.type === 'datetimerange') {
    const [start, end] = props.value!
    const dataValue = timeType.value === 'start' ? start : end
    const date = new Date(dataValue || '')
    date.setHours(hour)
    date.setMinutes(minute)
    date.setSeconds(props.hideSecond ? 0 : second || 0)
    const dateTime = date.getTime()

    if (dateTime === dataValue) return

    const finalValue = [start, end]
    if (timeType.value === 'start') {
      finalValue[0] = dateTime
    } else {
      finalValue[1] = dateTime
    }
    innerValue.value = finalValue // 内部保存一个值，用于判断新老值，避免监听器触发
    handleChange(finalValue)
  }
}

function handlePickStart() {
  emit('pickstart')
}
function handlePickEnd() {
  emit('pickend')
}

const monthScroll = (event: { detail: { scrollTop: number } }) => {
  if (months.value.length <= 1) {
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
  for (let index = 0; index < months.value.length; index++) {
    height = height + months.value[index].height
    if (scrollTop < height) {
      scrollIndex.value = index
      return
    }
  }
}

defineExpose<MonthPanelExpose>({
  scrollIntoView
})
</script>

<style lang="scss">
@use './index.scss';
</style>
