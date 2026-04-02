<template>
  <wd-picker-view
    ref="datePickerview"
    :custom-class="customClass"
    :custom-style="customStyle"
    :immediate-change="immediateChange"
    v-model="pickerValue"
    :columns="columns"
    :item-height="itemHeight"
    :visible-item-count="visibleItemCount"
    @change="onChange"
    @pickstart="onPickStart"
    @pickend="onPickEnd"
  ></wd-picker-view>
</template>
<script lang="ts">
export default {
  name: 'wd-datetime-picker-view',
  // #ifndef MP-TOUTIAO
  virtualHost: true,
  // #endif
  addGlobalClass: true,
  styleIsolation: 'shared'
}
</script>

<script lang="ts" setup>
import wdPickerView from '../wd-picker-view/wd-picker-view.vue'
import { getCurrentInstance, onBeforeMount, ref, watch, computed } from 'vue'
import { isDef, padZero, range, isArray, isString } from '../../common/util'
import { datetimePickerViewProps, type DatetimePickerViewColumnType, type DatetimePickerViewExpose } from './types'
import type { PickerViewInstance } from '../wd-picker-view/types'
import { getPickerValue } from './util'
import { type Numeric } from '../../common/props'

// 本地时间戳
/**
 * @description 判断时间戳是否合法
 * @param {string | number | Date} date 时间
 * @returns {boolean} 是否合法
 */
const isValidDate = (date: string | number | Date) => isDef(date) && !Number.isNaN(date)

/**
 * @description 生成n个元素，并使用iterator接口进行填充
 * @param {number} n 数量
 * @param {function} iteratee 迭代函数
 * @returns {Array} 结果数组
 */
const times = (n: number, iteratee: (index: number) => number) => {
  let index: number = -1
  const length = n < 0 ? 0 : n
  const result: number[] = Array(length)
  while (++index < n) {
    result[index] = iteratee(index)
  }
  return result
}

/**
 * @description 获取某年某月有多少天
 * @param {number} year 年
 * @param {number} month 月
 * @returns {number} day 天数
 */
const getMonthEndDay = (year: number, month: number) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}

const props = defineProps(datetimePickerViewProps)
const emit = defineEmits(['change', 'pickstart', 'pickend', 'update:modelValue'])

// pickerview
const datePickerview = ref<PickerViewInstance>()
// 内部保持时间戳的
const innerValue = ref<null | string | number>(null)

// 传递给pickerView的value的数据
const pickerValue = ref<Array<Numeric>>([])
// 是否已经初始化
const created = ref<boolean>(false)

const { proxy } = getCurrentInstance() as any

/**
 * 传递给pickerView的columns的数据
 * 核心逻辑：columns 依赖 innerValue，而 innerValue 会在 onChange 中被更新
 */
const columns = computed(() => {
  const { formatter, columnFormatter } = props
  const originColumns = getOriginColumns().map((column) => {
    return column.values.map((value) => {
      return {
        label: formatter ? formatter(column.type, padZero(value)) : padZero(value),
        value
      }
    })
  })
  if (columnFormatter) {
    return columnFormatter(originColumns)
  }
  return originColumns
})

watch(
  () => props.modelValue,
  (val) => {
    const value = correctValue(val)
    if (value === innerValue.value) return
    updateColumnValue(value)
  },
  { deep: true, immediate: true }
)

watch(
  () => props.type,
  (target) => {
    const type = ['date', 'year-month', 'time', 'datetime', 'year']
    if (type.indexOf(target) === -1) {
      console.error(`type must be one of ${type}`)
    }
  },
  { deep: true, immediate: true }
)

onBeforeMount(() => {
  // 初始化完毕，打开observer触发render的开关
  created.value = true
  const innerValue = correctValue(props.modelValue)
  updateColumnValue(innerValue)
})

/**
 * @description pickerView触发change事件，同步修改pickerValue
 * @param {object} params 参数
 * @param {Array<string | number>} params.selectedValues 选中的值
 */
function onChange({ selectedValues }: { selectedValues: Array<string | number> }) {
  // 更新pickerView的value
  pickerValue.value = selectedValues
  // pickerValue => innerValue
  const result = updateInnerValue(selectedValues)

  updateColumnValue(result)
}

/**
 * @description 根据getRanges得到的范围计算所有的列的数据
 * @returns {DatetimePickerViewColumn[]} 所有的列的数据
 */
function getOriginColumns() {
  const { filter } = props
  return getRanges().map(({ type, range }) => {
    let values = times(range[1] - range[0] + 1, (index: number) => {
      return range[0] + index
    })

    if (filter) {
      values = filter({ type, values })
    }
    return {
      type,
      values
    }
  })
}

/**
 * @description 根据时间戳生成年月日时分的边界范围
 * @returns {Array<{type: DatetimePickerViewColumnType, range: number[]}>} 边界范围
 */
function getRanges(): Array<{ type: DatetimePickerViewColumnType; range: number[] }> {
  if (props.type === 'time') {
    const result: Array<{ type: DatetimePickerViewColumnType; range: number[] }> = [
      {
        type: 'hour',
        range: [props.minHour, props.maxHour]
      },
      {
        type: 'minute',
        range: [props.minMinute, props.maxMinute]
      }
    ]
    if (props.useSecond) {
      result.push({
        type: 'second',
        range: [props.minSecond, props.maxSecond]
      })
    }
    return result
  }

  const { maxYear, maxDate, maxMonth, maxHour, maxMinute, maxSecond } = getBoundary('max', innerValue.value as number)
  const { minYear, minDate, minMonth, minHour, minMinute, minSecond } = getBoundary('min', innerValue.value as number)

  const result: Array<{ type: DatetimePickerViewColumnType; range: number[] }> = [
    {
      type: 'year',
      range: [minYear, maxYear]
    },
    {
      type: 'month',
      range: [minMonth, maxMonth]
    },
    {
      type: 'date',
      range: [minDate, maxDate]
    },
    {
      type: 'hour',
      range: [minHour, maxHour]
    },
    {
      type: 'minute',
      range: [minMinute, maxMinute]
    }
  ]

  if (props.type === 'datetime' && props.useSecond) {
    result.push({
      type: 'second',
      range: [minSecond, maxSecond]
    })
  }

  if (props.type === 'date') result.splice(3, 2)
  if (props.type === 'year-month') result.splice(2, 3)
  if (props.type === 'year') result.splice(1, 4)
  return result
}

/**
 * @description 修正时间入参，判定是否为规范时间类型
 * @param {string | number | Date} value 时间
 * @returns {string | number} innerValue
 */
function correctValue(value: string | number | Date): string | number {
  const isDateType = props.type !== 'time'
  if (isDateType && !isValidDate(value)) {
    // 是Date类型，但入参不可用，使用最小时间戳代替
    value = props.minDate
  } else if (!isDateType && !value) {
    // 非Date类型，无入参，使用最小小时代替
    value = props.useSecond ? `${padZero(props.minHour)}:00:00` : `${padZero(props.minHour)}:00`
  }

  // 当type为time时
  if (!isDateType) {
    // 非Date类型，直接走此逻辑
    let [hour, minute, second = '00'] = (isString(value) ? value : value.toString()).split(':')
    hour = padZero(range(Number(hour), props.minHour, props.maxHour))
    minute = padZero(range(Number(minute), props.minMinute, props.maxMinute))
    if (props.useSecond) {
      second = padZero(range(Number(second), props.minSecond, props.maxSecond))
      return `${hour}:${minute}:${second}`
    }
    return `${hour}:${minute}`
  }

  // date type
  value = Math.min(Math.max(Number(value), props.minDate), props.maxDate)

  return value
}

/**
 * @description 根据时间戳，计算所有选项的范围
 * @param {'min' | 'max'} type 类型
 * @param {number} innerValue 时间戳
 * @returns {object} 边界范围
 */
function getBoundary(type: 'min' | 'max', innerValue: number) {
  const value = new Date(innerValue)
  const boundary = new Date(props[`${type}Date`])
  const year = boundary.getFullYear()
  let month: number = 1
  let date: number = 1
  let hour: number = 0
  let minute: number = 0
  let second: number = 0

  if (type === 'max') {
    month = 12
    date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1)
    hour = 23
    minute = 59
    second = 59
  }

  if (value.getFullYear() === year) {
    month = boundary.getMonth() + 1
    if (value.getMonth() + 1 === month) {
      date = boundary.getDate()
      if (value.getDate() === date) {
        hour = boundary.getHours()
        if (value.getHours() === hour) {
          minute = boundary.getMinutes()
          if (value.getMinutes() === minute) {
            second = boundary.getSeconds()
          }
        }
      }
    }
  }
  return {
    [`${type}Year`]: year,
    [`${type}Month`]: month,
    [`${type}Date`]: date,
    [`${type}Hour`]: hour,
    [`${type}Minute`]: minute,
    [`${type}Second`]: second
  }
}

/**
 * @description 根据传入的value以及type，初始化innerValue，期间会使用format格式化数据
 * @param {string | number} value 时间
 */
function updateColumnValue(value: string | number) {
  const values = getPickerValue(value, props.type, props.useSecond)
  if (props.modelValue !== value) {
    emit('update:modelValue', value)
    emit('change', {
      value,
      columns: getOriginColumns()
    })
  }
  innerValue.value = value
  pickerValue.value = values
}

/**
 * @description 根据当前的选中项 处理innerValue
 * @param {Array<string | number>} indexes 选中的索引
 * @returns {string | number} innerValue
 */
function updateInnerValue(indexes: Array<string | number>) {
  const { type, useSecond } = props
  let innerValue: string | number = ''
  const values = indexes

  if (type === 'time') {
    if (useSecond) {
      innerValue = `${padZero(values[0])}:${padZero(values[1])}:${padZero(values[2])}`
    } else {
      innerValue = `${padZero(values[0])}:${padZero(values[1])}`
    }
    return innerValue
  }

  // 处理年份 索引位0
  const year = values[0] && parseInt(String(values[0]))

  // 处理月 索引位1
  const month = type === 'year' ? 1 : values[1] && parseInt(String(values[1]))

  const maxDate = getMonthEndDay(Number(year), Number(month))

  // 处理 date 日期 索引位2
  let date: string | number = 1
  if (type !== 'year-month' && type !== 'year') {
    date = (Number(values[2]) && parseInt(String(values[2]))) > maxDate ? maxDate : values[2] && parseInt(String(values[2]))
  }

  // 处理 时分秒 索引位3，4，5
  let hour = 0
  let minute = 0
  let second = 0

  if (type === 'datetime') {
    hour = Number(values[3]) && parseInt(String(values[3]))
    minute = Number(values[4]) && parseInt(String(values[4]))
    if (useSecond) {
      second = Number(values[5]) && parseInt(String(values[5]))
    }
  }
  const value = new Date(Number(year), Number(month) - 1, Number(date), hour, minute, second).getTime()

  innerValue = correctValue(value)
  return innerValue
}

function onPickStart() {
  emit('pickstart')
}
function onPickEnd() {
  emit('pickend')
}

function getSelectedOptions() {
  const pickerVal = datePickerview.value?.getSelectedOptions()
  if (pickerVal == null) return undefined
  if (isArray(pickerVal)) return pickerVal
  return [pickerVal]
}

defineExpose<DatetimePickerViewExpose>({
  getSelectedOptions,
  correctValue,
  getOriginColumns
})
</script>
