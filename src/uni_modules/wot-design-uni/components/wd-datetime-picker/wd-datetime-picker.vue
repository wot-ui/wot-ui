<template>
  <view :class="`wd-datetime-picker ${customClass}`" :style="customStyle">
    <wd-popup
      v-model="popupShow"
      position="bottom"
      :hide-when-close="false"
      :close-on-click-modal="closeOnClickModal"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :z-index="zIndex"
      :root-portal="rootPortal"
      @close="onCancel"
      custom-class="wd-datetime-picker__popup"
    >
      <view class="wd-datetime-picker__wraper">
        <!--title-->
        <view class="wd-datetime-picker__title" @touchmove="noop">
          <!--取消按钮-->
          <view class="wd-datetime-picker__action" @click="onCancel">
            {{ cancelButtonText || translate('cancel') }}
          </view>
          <!--标题-->
          <view v-if="title" class="wd-datetime-picker__title-text">{{ title }}</view>
          <!--确定按钮-->
          <view class="wd-datetime-picker__action" @click="onConfirm">
            {{ confirmButtonText || translate('confirm') }}
          </view>
        </view>
        <view v-if="region" class="wd-datetime-picker__range">
          <view :class="`wd-datetime-picker__range-item ${showStart ? 'is-active' : ''}`" @click="onTabChange('start')">
            {{ showTabLabel[0] || translate('start') }}
          </view>
          <view class="wd-datetime-picker__range-sperator"></view>
          <view :class="`wd-datetime-picker__range-item ${!showStart ? 'is-active' : ''}`" @click="onTabChange('end')">
            {{ showTabLabel[1] || translate('end') }}
          </view>
        </view>
        <view :class="showStart ? 'wd-datetime-picker__show' : 'wd-datetime-picker__hidden'">
          <wd-datetime-picker-view
            :custom-class="customViewClass"
            :type="type"
            v-model="innerValue"
            :item-height="itemHeight"
            :visible-item-count="visibleItemCount"
            :value-key="valueKey"
            :label-key="labelKey"
            :formatter="formatter"
            :filter="filter"
            :column-formatter="isArray(modelValue) ? startColumnFormatter : undefined"
            :max-hour="maxHour"
            :min-hour="minHour"
            :max-date="maxDate"
            :min-date="minDate"
            :max-minute="maxMinute"
            :min-minute="minMinute"
            :use-second="useSecond"
            :min-second="minSecond"
            :max-second="maxSecond"
            :immediate-change="immediateChange"
            @change="onChangeStart"
            @pickstart="onPickStart"
            @pickend="onPickEnd"
          />
        </view>
        <view :class="showStart ? 'wd-datetime-picker__hidden' : 'wd-datetime-picker__show'">
          <wd-datetime-picker-view
            :custom-class="customViewClass"
            :type="type"
            v-model="endInnerValue"
            :item-height="itemHeight"
            :visible-item-count="visibleItemCount"
            :value-key="valueKey"
            :label-key="labelKey"
            :formatter="formatter"
            :filter="filter"
            :column-formatter="isArray(modelValue) ? endColumnFormatter : undefined"
            :max-hour="maxHour"
            :min-hour="minHour"
            :max-date="maxDate"
            :min-date="minDate"
            :max-minute="maxMinute"
            :min-minute="minMinute"
            :use-second="useSecond"
            :min-second="minSecond"
            :max-second="maxSecond"
            :immediate-change="immediateChange"
            @change="onChangeEnd"
            @pickstart="onPickStart"
            @pickend="onPickEnd"
          />
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-datetime-picker',
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
import wdPopup from '../wd-popup/wd-popup.vue'
import wdDatetimePickerView from '../wd-datetime-picker-view/wd-datetime-picker-view.vue'
import { getCurrentInstance, nextTick, onMounted, ref, watch, computed } from 'vue'
import { deepClone, isArray, isDef, isEqual, isFunction, padZero } from '../common/util'
import { type DatetimePickerViewColumnType, type DatetimePickerViewOption, type DatetimePickerViewColumn } from '../wd-datetime-picker-view/types'
import { useTranslate } from '../composables/useTranslate'
import { datetimePickerProps, type DatetimePickerExpose } from './types'
import { formatDate } from '../common/formatDate'
import { getPickerValue } from '../wd-datetime-picker-view/util'

const props = defineProps(datetimePickerProps)
const emit = defineEmits(['change', 'open', 'toggle', 'cancel', 'confirm', 'update:modelValue', 'update:visible'])

const { translate } = useTranslate('datetime-picker')

const popupShow = ref<boolean>(false)
const showStart = ref<boolean>(true)
const region = ref<boolean>(false)
const innerValue = ref<string | number>('')
const endInnerValue = ref<string | number>('')

const showTabLabel = computed(() => {
  if (region.value) {
    const items = (innerValue.value && getPickerSelectedItems('before')) || []
    const endItems = (endInnerValue.value && getPickerSelectedItems('after')) || []
    return [defaultDisplayFormat(items as Record<string, any>[], true), defaultDisplayFormat(endItems as Record<string, any>[], true)]
  }
  return []
})

const isPicking = ref<boolean>(false) // 判断pickview是否还在滑动中
const hasConfirmed = ref<boolean>(false) // 判断用户是否点击了确认按钮

const { proxy } = getCurrentInstance() as any

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (isEqual(val, oldVal)) return

    resetInnerValue()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  [() => props.filter, () => props.formatter, () => props.beforeConfirm, () => props.displayFormatTabLabel],
  (values) => {
    const propNames = ['filter', 'formatter', 'beforeConfirm', 'displayFormatTabLabel']
    values.forEach((fn, index) => {
      if (fn && !isFunction(fn)) {
        console.error(`The type of ${propNames[index]} must be Function`)
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.visible,
  (val) => {
    if (val) {
      showPopup()
    } else {
      popupShow.value = false
    }
  }
)

watch(popupShow, (val) => {
  emit('update:visible', val)
})

function resetInnerValue() {
  const { modelValue } = props
  if (isArray(modelValue)) {
    region.value = true
    innerValue.value = deepClone(getDefaultInnerValue(true))
    endInnerValue.value = deepClone(getDefaultInnerValue(true, true))
  } else {
    // 每次value更新时都需要刷新整个列表
    innerValue.value = deepClone(getDefaultInnerValue())
  }
}

/**
 * @description 处理时间边界值判断
 * @param {boolean} isStart 是否是开始时间
 * @param {DatetimePickerViewColumnType} columnType 当前列类型
 * @param {number} value 当前值
 * @param {number[]} currentArray 当前完整选择的数组
 * @param {number[]} boundary 边界值数组
 * @returns {boolean} 是否超出边界
 */
function isOutOfBoundary(
  isStart: boolean,
  columnType: DatetimePickerViewColumnType,
  value: number,
  currentArray: number[],
  boundary: number[]
): boolean {
  const { type, useSecond } = props

  // 定义各类型的列顺序
  const typeColumns: Record<string, DatetimePickerViewColumnType[]> = {
    datetime: useSecond ? ['year', 'month', 'date', 'hour', 'minute', 'second'] : ['year', 'month', 'date', 'hour', 'minute'],
    'year-month': ['year', 'month'],
    year: ['year'],
    date: ['year', 'month', 'date'],
    time: useSecond ? ['hour', 'minute', 'second'] : ['hour', 'minute']
  }

  const columns = typeColumns[type]
  const columnIndex = columns.indexOf(columnType)

  // 如果当前列不在类型定义中，直接返回 false
  if (columnIndex === -1) return false

  // 检查当前列之前的所有列是否都在边界上
  // 例如：检查 'date' 时，必须 'year' 和 'month' 都等于边界值
  const isPreColumnsBoundary = columns.slice(0, columnIndex).every((col, index) => {
    return currentArray[index] === boundary[index]
  })

  if (isPreColumnsBoundary) {
    const boundaryValue = boundary[columnIndex]
    return isStart ? value > boundaryValue : value < boundaryValue
  }

  return false
}

/**
 * @description 开始时间列格式化
 * @param {DatetimePickerViewOption[][]} columns 列选项
 * @returns {DatetimePickerViewOption[][]} 格式化后的列选项
 */
function startColumnFormatter(columns: DatetimePickerViewOption[][]) {
  return customColumnFormatter(columns, 'start')
}

/**
 * @description 结束时间列格式化
 * @param {DatetimePickerViewOption[][]} columns 列选项
 * @returns {DatetimePickerViewOption[][]} 格式化后的列选项
 */
function endColumnFormatter(columns: DatetimePickerViewOption[][]) {
  return customColumnFormatter(columns, 'end')
}

/**
 * @description 自定义列项筛选规则
 * @param {DatetimePickerViewOption[][]} columns 列选项
 * @param {'start' | 'end'} pickerType 选择器类型
 * @returns {DatetimePickerViewOption[][]} 格式化后的列选项
 */
const customColumnFormatter = (columns: DatetimePickerViewOption[][], pickerType: 'start' | 'end') => {
  const { type } = props
  const startSymbol = pickerType === 'start'

  const start = innerValue.value
  const end = endInnerValue.value

  const currentValue = startSymbol ? getPickerValue(start, type, props.useSecond) : getPickerValue(end, type, props.useSecond)
  const boundary = startSymbol ? getPickerValue(end, type, props.useSecond) : getPickerValue(start, type, props.useSecond)

  // 定义各类型的列顺序
  const typeColumns: Record<string, DatetimePickerViewColumnType[]> = {
    datetime: props.useSecond ? ['year', 'month', 'date', 'hour', 'minute', 'second'] : ['year', 'month', 'date', 'hour', 'minute'],
    'year-month': ['year', 'month'],
    year: ['year'],
    date: ['year', 'month', 'date'],
    time: props.useSecond ? ['hour', 'minute', 'second'] : ['hour', 'minute']
  }
  const currentColumnTypes = typeColumns[type]

  return columns.map((column, index) => {
    const columnType = currentColumnTypes[index]
    return column.map((option) => {
      const disabled = isOutOfBoundary(startSymbol, columnType, option.value, currentValue, boundary)
      return {
        ...option,
        disabled
      }
    })
  })
}

onMounted(() => {
  if (props.visible) {
    showPopup()
  }
})

/**
 * @description 根据传入的picker，picker组件获取当前cell展示值。
 * @param {'before' | 'after'} picker picker类型
 * @returns {Record<string, any>[]} 选中项
 */
function getPickerSelectedItems(picker: 'before' | 'after') {
  let value = picker === 'before' ? innerValue.value : endInnerValue.value
  let selected: number[] = []
  if (value) {
    selected = getPickerValue(value, props.type, props.useSecond)
  }

  const typeColumns: Record<string, DatetimePickerViewColumnType[]> = {
    datetime: props.useSecond ? ['year', 'month', 'date', 'hour', 'minute', 'second'] : ['year', 'month', 'date', 'hour', 'minute'],
    'year-month': ['year', 'month'],
    year: ['year'],
    date: ['year', 'month', 'date'],
    time: props.useSecond ? ['hour', 'minute', 'second'] : ['hour', 'minute']
  }
  const currentColumnTypes = typeColumns[props.type]

  let selects = selected.map((value, index) => {
    const type = currentColumnTypes[index]
    return {
      [props.labelKey]: props.formatter ? props.formatter(type, padZero(value)) : padZero(value),
      [props.valueKey]: value
    }
  })
  return selects
}

function noop() {}

/**
 * @description 获取默认内部值
 * @param {boolean} [isRegion] 是否是区域选择
 * @param {boolean} [isEnd] 是否是结束时间
 * @returns {string | number} 默认值
 */
function getDefaultInnerValue(isRegion?: boolean, isEnd?: boolean): string | number {
  const { modelValue: value, maxDate, minDate, type } = props
  if (isRegion) {
    const index = isEnd ? 1 : 0
    const targetValue = isArray(value) ? (value[index] as string) : ''
    const maxValue = type === 'time' ? formatDate(maxDate, 'HH:mm') : maxDate
    const minValue = type === 'time' ? formatDate(minDate, 'HH:mm') : minDate
    return targetValue || (isEnd ? maxValue : minValue)
  } else {
    return isDef(value) ? (value as string) : ''
  }
}

/**
 * @description 对外暴露接口，打开弹框
 */
function open() {
  showPopup()
}

/**
 * @description 对外暴露接口，关闭弹框
 */
function close() {
  onCancel()
}

/**
 * @description 显示弹窗
 */
function showPopup() {
  if (popupShow.value) return
  emit('open')
  resetInnerValue()
  popupShow.value = true
  showStart.value = true
}

/**
 * @description 区域选择时tab标签切换时触发
 */
function onTabChange(tab: 'start' | 'end') {
  const isStart = tab === 'start'
  if (showStart.value === isStart) return
  showStart.value = isStart
  emit('toggle', showStart.value ? innerValue.value : endInnerValue.value)
}

/**
 * @description datetimePickerView change 事件
 * @param {object} params 参数
 * @param {number | string} params.value 值
 * @param {DatetimePickerViewColumn[]} params.columns 列
 */
function onChangeStart({ value, columns }: { value: number | string; columns: DatetimePickerViewColumn[] }) {
  if (region.value) {
    const currentArray = getPickerValue(value, props.type, props.useSecond)
    const boundaryArray = getPickerValue(endInnerValue.value, props.type, props.useSecond)

    const needsAdjust = columns.some((column, index) => {
      return isOutOfBoundary(true, column.type, currentArray[index], currentArray, boundaryArray)
    })

    innerValue.value = deepClone(needsAdjust ? endInnerValue.value : value)

    nextTick(() => {
      emit('change', {
        value: [innerValue.value, endInnerValue.value]
      })
    })
  } else {
    // 非区间选择直接设置值即可
    innerValue.value = deepClone(value)
    emit('change', {
      value: innerValue.value
    })
  }
}

/**
 * @description 区域选择 下方 datetimePickerView change 事件
 * @param {object} params 参数
 * @param {number | string} params.value 值
 * @param {DatetimePickerViewColumn[]} params.columns 列
 */
function onChangeEnd({ value, columns }: { value: number | string; columns: DatetimePickerViewColumn[] }) {
  const currentArray = getPickerValue(value, props.type, props.useSecond)
  const boundaryArray = getPickerValue(innerValue.value, props.type, props.useSecond)

  // 检查是否有任何列超出边界
  const needsAdjust = columns.some((column, index) => {
    return isOutOfBoundary(false, column.type, currentArray[index], currentArray, boundaryArray)
  })

  endInnerValue.value = deepClone(needsAdjust ? innerValue.value : value)

  nextTick(() => {
    emit('change', {
      value: [innerValue.value, endInnerValue.value]
    })
  })
}

/**
 * @description 点击取消按钮触发。关闭popup，触发cancel事件。
 */
function onCancel() {
  popupShow.value = false
  emit('cancel')
}

/**
 * @description picker触发confirm事件，同步触发confirm事件
 */
function onConfirm() {
  // 如果当前还在滑动且未停止下来，则锁住先不确认，等滑完再自动确认，避免pickview值未更新
  if (isPicking.value) {
    hasConfirmed.value = true
    return
  }

  const { beforeConfirm } = props
  if (beforeConfirm) {
    beforeConfirm(
      region.value ? [innerValue.value, endInnerValue.value] : innerValue.value,
      (isPass: boolean) => {
        isPass && handleConfirm()
      },
      proxy.$.exposed
    )
  } else {
    handleConfirm()
  }
}

function onPickStart() {
  isPicking.value = true
}

function onPickEnd() {
  isPicking.value = false

  // 延迟一会，因为组件层级嵌套过多，日期的计算时间也较长
  setTimeout(() => {
    if (hasConfirmed.value) {
      hasConfirmed.value = false
      onConfirm()
    }
  }, 50)
}

function handleConfirm() {
  const value = region.value ? [innerValue.value, endInnerValue.value] : innerValue.value
  popupShow.value = false
  emit('update:modelValue', value)
  emit('confirm', {
    value
  })
}

/**
 * @description 设置展示值
 * @param {Record<string, any>[]} items 获取到的选中项 包含 { value, label }
 * @param {boolean} [tabLabel=false] 当前返回的是否是展示tab上的标签
 * @returns {string} showValue / showTabLabel
 */
function defaultDisplayFormat(items: Record<string, any>[], tabLabel: boolean = false) {
  if (items.length === 0) return ''

  if (tabLabel && props.displayFormatTabLabel) {
    return props.displayFormatTabLabel(items)
  }

  switch (props.type) {
    case 'year':
      return items[0].label
    case 'date':
      return `${items[0].label}-${items[1].label}-${items[2].label}`
    case 'year-month':
      return `${items[0].label}-${items[1].label}`
    case 'time':
      return props.useSecond ? `${items[0].label}:${items[1].label}:${items[2].label}` : `${items[0].label}:${items[1].label}`
    case 'datetime':
      return props.useSecond
        ? `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}:${items[5].label}`
        : `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}`
  }
}

defineExpose<DatetimePickerExpose>({
  open,
  close
})
</script>

<style lang="scss">
@use './index.scss';
</style>
