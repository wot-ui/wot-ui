<template>
  <view :class="`wd-calendar ${customClass}`" :style="customStyle">
    <wd-action-sheet
      v-model="pickerShow"
      :duration="duration"
      :close-on-click-modal="closeOnClickModal"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :z-index="zIndex"
      :root-portal="rootPortal"
      :title="title || translate('title')"
      custom-class="wd-calendar__popup"
      @close="close"
      @after-enter="handleOpened"
      @after-leave="handleClosed"
    >
      <view class="wd-calendar__header">
        <view v-if="showTypeSwitch" class="wd-calendar__tabs">
          <wd-tabs ref="calendarTabs" v-model="currentTab" @change="handleTypeChange">
            <wd-tab :title="translate('day')" :name="translate('day')" />
            <wd-tab :title="translate('week')" :name="translate('week')" />
            <wd-tab :title="translate('month')" :name="translate('month')" />
          </wd-tabs>
        </view>
        <view v-if="shortcuts.length > 0" class="wd-calendar__shortcuts">
          <wd-tag
            v-for="(item, index) in shortcuts"
            :key="index"
            :custom-class="`wd-calendar__tag ${index === shortcuts.length - 1 ? 'is-last-tag' : ''}`"
            :type="activeShortcutIndex === index ? 'primary' : 'default'"
            :variant="activeShortcutIndex === index ? 'dark' : 'light'"
            @click="handleShortcutClick(index)"
          >
            {{ item.text }}
          </wd-tag>
        </view>
      </view>
      <view
        v-if="inited"
        :class="`wd-calendar__view  ${currentType.indexOf('range') > -1 ? 'is-range' : ''} ${showConfirm ? 'is-show-confirm' : ''}`"
      >
        <view v-if="isRange(currentType)" class="wd-calendar__range">
          <view :class="`wd-calendar__range-item ${!calendarValue || !isArray(calendarValue) || !calendarValue[0] ? 'is-placeholder' : ''}`">
            {{ rangeLabel[0] }}
          </view>
          <view class="wd-calendar__range-sperator"></view>
          <view :class="`wd-calendar__range-item ${!calendarValue || !isArray(calendarValue) || !calendarValue[1] ? 'is-placeholder' : ''}`">
            {{ rangeLabel[1] }}
          </view>
        </view>
        <wd-calendar-view
          ref="calendarViewRef"
          v-model="calendarValue"
          :type="currentType"
          :min-date="minDate"
          :max-date="maxDate"
          :first-day-of-week="firstDayOfWeek"
          :formatter="formatter"
          :panel-height="panelHeight"
          :max-range="maxRange"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          :time-filter="timeFilter"
          :hide-second="hideSecond"
          :show-panel-title="showPanelTitle"
          :immediate-change="immediateChange"
          :switch-mode="switchMode"
          @change="handleChange"
        />
      </view>
      <view v-if="showConfirm" class="wd-calendar__confirm">
        <slot name="confirm-left"></slot>
        <view class="wd-calendar__confirm-btn-wrapper">
          <wd-button size="large" block :disabled="confirmBtnDisabled" @click="handleConfirm">{{ confirmText || translate('confirm') }}</wd-button>
        </view>
        <slot name="confirm-right"></slot>
      </view>
    </wd-action-sheet>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-calendar',
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
import { ref, computed, watch } from 'vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import wdCalendarView from '../wd-calendar-view/wd-calendar-view.vue'
import wdActionSheet from '../wd-action-sheet/wd-action-sheet.vue'
import wdButton from '../wd-button/wd-button.vue'
import wdTabs from '../wd-tabs/wd-tabs.vue'
import wdTab from '../wd-tab/wd-tab.vue'
import wdTag from '../wd-tag/wd-tag.vue'
import { formatDate } from '../common/formatDate'
import { deepClone, isArray, isEqual, padZero, pause } from '../common/util'
import { getWeekNumber, isRange } from '../wd-calendar-view/utils'
import { useTranslate } from '../composables/useTranslate'
import { calendarProps, type CalendarExpose } from './types'
import type { CalendarType } from '../wd-calendar-view/types'

const props = defineProps(calendarProps)
const emit = defineEmits(['cancel', 'change', 'update:modelValue', 'confirm', 'open', 'update:visible'])
const { translate } = useTranslate('calendar')

const pickerShow = ref<boolean>(false)
const calendarValue = ref<null | number | number[]>(null)
const lastCalendarValue = ref<null | number | number[]>(null)
const confirmBtnDisabled = ref<boolean>(true)
const currentTab = ref<number>(0)
const lastTab = ref<number>(0)
const currentType = ref<CalendarType>('date')
const lastCurrentType = ref<CalendarType>()
const inited = ref<boolean>(false)
const calendarViewRef = ref()
const calendarTabs = ref()
const isConfirming = ref<boolean>(false)
/** 当前激活的快捷选项索引，-1 表示无激活项 */
const activeShortcutIndex = ref<number>(-1)

const formatRange = (value: number, rangeType: 'start' | 'end', type: CalendarType) => {
  switch (type) {
    case 'daterange':
      if (!value) {
        return rangeType === 'end' ? translate('endTime') : translate('startTime')
      }
      return formatDate(value, translate('dateFormat'))
    case 'datetimerange':
      if (!value) {
        return rangeType === 'end' ? translate('endTime') : translate('startTime')
      }
      return formatDate(value, translate('timeFormat'))
    case 'weekrange': {
      if (!value) {
        return rangeType === 'end' ? translate('endWeek') : translate('startWeek')
      }
      const date = new Date(value)
      const year = date.getFullYear()
      const week = getWeekNumber(value)
      return translate('weekFormat', year, padZero(week))
    }
    case 'monthrange':
      if (!value) {
        return rangeType === 'end' ? translate('endMonth') : translate('startMonth')
      }
      return formatDate(value, translate('monthFormat'))
  }
}

const rangeLabel = computed(() => {
  const [start, end] = deepClone(isArray(calendarValue.value) ? calendarValue.value : [])
  return [start, end].map((item, index) => {
    return (props.innerDisplayFormat || formatRange)(item, index === 0 ? 'start' : 'end', currentType.value)
  })
})

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (isEqual(val, oldVal)) return
    calendarValue.value = deepClone(val)
    confirmBtnDisabled.value = getConfirmBtnStatus(val)
  },
  {
    immediate: true
  }
)

watch(
  () => props.type,
  (newValue) => {
    if (props.showTypeSwitch) {
      const tabs = ['date', 'week', 'month']
      const rangeTabs = ['daterange', 'weekrange', 'monthrange']

      const index = newValue.indexOf('range') > -1 ? rangeTabs.indexOf(newValue) || 0 : tabs.indexOf(newValue)
      currentTab.value = index
    }
    currentType.value = deepClone(newValue)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.visible,
  (val) => {
    pickerShow.value = val
  },
  {
    immediate: true
  }
)

function handleOpened() {
  if (props.showTypeSwitch) {
    calendarTabs.value && calendarTabs.value.scrollIntoView()
    calendarTabs.value && calendarTabs.value.updateLineStyle(false)
  }
}

function handleClosed() {
  if (isConfirming.value) {
    isConfirming.value = false
  } else {
    calendarValue.value = deepClone(lastCalendarValue.value)
    currentTab.value = lastTab.value
    currentType.value = lastCurrentType.value || 'date'
    confirmBtnDisabled.value = getConfirmBtnStatus(lastCalendarValue.value)
  }
}

watch(pickerShow, async (val) => {
  emit('update:visible', val)
  if (val) {
    inited.value = true
    lastCalendarValue.value = deepClone(calendarValue.value)
    lastTab.value = currentTab.value
    lastCurrentType.value = currentType.value

    await pause()
    scrollIntoView()
    emit('open')
  } else {
    if (!isConfirming.value) {
      emit('cancel')
    }
  }
})

function scrollIntoView() {
  calendarViewRef.value && calendarViewRef.value.scrollIntoView()
}

// 对外暴露方法
function open() {
  pickerShow.value = true
}

// 对外暴露方法
function close() {
  pickerShow.value = false
}

function handleTypeChange({ index }: { index: number }) {
  const tabs = ['date', 'week', 'month']
  const rangeTabs = ['daterange', 'weekrange', 'monthrange']
  const type = props.type.indexOf('range') > -1 ? rangeTabs[index] : tabs[index]
  currentTab.value = index
  currentType.value = type as CalendarType
}

function getConfirmBtnStatus(value: number | number[] | null) {
  let confirmBtnDisabled = false
  // 范围选择未选择满，或者多日期选择未选择日期，按钮置灰不可点击
  if (
    (props.type.indexOf('range') > -1 && (!isArray(value) || !value[0] || !value[1] || !value)) ||
    (props.type === 'dates' && (!isArray(value) || value.length === 0 || !value)) ||
    !value
  ) {
    confirmBtnDisabled = true
  }

  return confirmBtnDisabled
}

function handleChange({ value }: { value: number | number[] | null }) {
  calendarValue.value = deepClone(value)
  confirmBtnDisabled.value = getConfirmBtnStatus(value)
  // 用户手动切换日期时重置快捷选项激活状态
  activeShortcutIndex.value = -1

  emit('change', {
    value
  })

  if (!props.showConfirm && !confirmBtnDisabled.value) {
    handleConfirm()
  }
}

function handleConfirm() {
  if (props.beforeConfirm) {
    props.beforeConfirm({
      value: calendarValue.value,
      resolve: (isPass: boolean) => {
        isPass && onConfirm()
      }
    })
  } else {
    onConfirm()
  }
}

function onConfirm() {
  isConfirming.value = true
  pickerShow.value = false
  lastCurrentType.value = currentType.value
  emit('update:modelValue', calendarValue.value)
  emit('confirm', {
    value: calendarValue.value,
    type: currentType.value
  })
}

function handleShortcutClick(index: number) {
  // 设置激活的快捷选项
  activeShortcutIndex.value = index

  if (props.onShortcutsClick && typeof props.onShortcutsClick === 'function') {
    calendarValue.value = deepClone(
      props.onShortcutsClick({
        item: props.shortcuts[index],
        index
      })
    )
    confirmBtnDisabled.value = getConfirmBtnStatus(calendarValue.value)
  }

  if (!props.showConfirm) {
    handleConfirm()
  }
}

defineExpose<CalendarExpose>({
  close,
  open
})
</script>

<style lang="scss">
@use './index.scss';
</style>
