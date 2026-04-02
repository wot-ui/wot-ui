<template>
  <view :class="`wd-select-picker ${customClass}`" :style="customStyle">
    <wd-action-sheet
      v-model="pickerShow"
      :title="title || translate('title')"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :root-portal="rootPortal"
      @close="close"
      @after-enter="scrollIntoView ? setScrollIntoView() : ''"
      custom-class="wd-select-picker__popup"
    >
      <wd-search
        v-if="filterable"
        v-model="filterVal"
        :placeholder="filterPlaceholder || translate('filterPlaceholder')"
        hide-cancel
        placeholder-left
        @change="handleFilterChange"
      />
      <scroll-view
        :class="`wd-select-picker__wrapper ${loading ? 'is-loading' : ''} ${customContentClass}`"
        :scroll-y="!loading"
        :scroll-top="scrollTop"
        :scroll-with-animation="true"
      >
        <!-- 多选 -->
        <view v-if="type === 'checkbox' && isArray(selectList)" class="wd-select-picker__checkbox" id="wd-checkbox-group">
          <wd-checkbox-group
            v-model="selectList"
            :size="selectSize"
            :checked-color="checkedColor"
            :min="min"
            :max="max"
            type="square"
            placement="right"
            @change="handleChange"
          >
            <view v-for="item in filterColumns" :key="item[valueKey]" :id="'check' + item[valueKey]">
              <wd-checkbox :name="item[valueKey]" :disabled="item.disabled" custom-label-class="wd-select-picker__checkbox-label">
                <block v-if="showHighlightText">
                  <block v-for="text in item[labelKey]" :key="text.label">
                    <text v-if="text.type === 'active'" class="wd-select-picker__text-active">{{ text.label }}</text>
                    <block v-else>{{ text.label }}</block>
                  </block>
                </block>
                <block v-else>
                  {{ item[labelKey] }}
                </block>
              </wd-checkbox>
            </view>
          </wd-checkbox-group>
        </view>
        <!-- 单选 -->
        <view v-if="type === 'radio' && !isArray(selectList)" class="wd-select-picker__radio" id="wd-radio-group">
          <wd-radio-group
            v-model="selectList"
            cell
            :size="selectSize"
            :checked-color="checkedColor"
            placement="right"
            type="dot"
            @change="handleChange"
          >
            <view v-for="(item, index) in filterColumns" :key="index" :id="'radio' + item[valueKey]">
              <wd-radio :value="item[valueKey]" :disabled="item.disabled" custom-label-class="wd-select-picker__radio-label">
                <block v-if="showHighlightText">
                  <block v-for="text in item[labelKey]" :key="text.label">
                    <text :class="`${text.type === 'active' ? 'wd-select-picker__text-active' : ''}`">{{ text.label }}</text>
                  </block>
                </block>
                <block v-else>
                  {{ item[labelKey] }}
                </block>
              </wd-radio>
            </view>
          </wd-radio-group>
        </view>
        <view v-if="loading" class="wd-select-picker__loading" @touchmove="noop">
          <wd-loading :color="loadingColor" custom-class="wd-select-picker__loading-icon" />
        </view>
      </scroll-view>
      <!-- 确认按钮 -->
      <view v-if="showConfirm" class="wd-select-picker__footer">
        <wd-button block size="large" @click="onConfirm" :disabled="loading">{{ confirmButtonText || translate('confirm') }}</wd-button>
      </view>
    </wd-action-sheet>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-select-picker',
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
import wdActionSheet from '../wd-action-sheet/wd-action-sheet.vue'
import wdCheckbox from '../wd-checkbox/wd-checkbox.vue'
import wdCheckboxGroup from '../wd-checkbox-group/wd-checkbox-group.vue'
import wdRadio from '../wd-radio/wd-radio.vue'
import wdRadioGroup from '../wd-radio-group/wd-radio-group.vue'
import wdButton from '../wd-button/wd-button.vue'
import wdLoading from '../wd-loading/wd-loading.vue'

import { getCurrentInstance, onBeforeMount, ref, watch, nextTick, computed } from 'vue'
import { getRect, isArray, isDef, isFunction, pause } from '../../common/util'
import { callInterceptor } from '../../common/interceptor'
import { useTranslate } from '../../composables/useTranslate'
import { selectPickerProps, type SelectPickerExpose } from './types'

const { translate } = useTranslate('select-picker')

const props = defineProps(selectPickerProps)
const emit = defineEmits(['change', 'cancel', 'confirm', 'update:modelValue', 'open', 'close', 'update:visible'])

const pickerShow = ref<boolean>(false)
const selectList = ref<Array<number | boolean | string> | number | boolean | string>([])
const isConfirm = ref<boolean>(false)
const lastSelectList = ref<Array<number | boolean | string> | number | boolean | string>([])
const filterVal = ref<string>('')
const filterColumns = ref<Array<Record<string, any>>>([])
const scrollTop = ref<number>(0) // 滚动位置

const valueItemMap = computed(() => {
  const map = new Map<string | number | boolean, Record<string, any>>()
  const { columns, valueKey } = props
  columns.forEach((item) => {
    map.set(item[valueKey], item)
  })
  return map
})

const showHighlightText = computed(() => {
  return props.filterable && !!filterVal.value
})

function getModelValueWatchKey(value: string | number | boolean | (string | number | boolean)[]) {
  if (props.type === 'checkbox') {
    return isArray(value) ? value.join('|') : ''
  }
  return isDef(value) ? String(value) : ''
}

function getColumnsWatchKey(columns: Record<string, any>[]) {
  const { valueKey, labelKey } = props
  return columns
    .map((item) => {
      const value = isDef(item[valueKey]) ? String(item[valueKey]) : ''
      const label = isDef(item[labelKey]) ? String(item[labelKey]) : ''
      return `${value}|${label}|${item.disabled ? '1' : '0'}`
    })
    .join('||')
}

watch(
  () => getModelValueWatchKey(props.modelValue),
  () => {
    const newValue = props.modelValue
    if (newValue === selectList.value) return
    selectList.value = valueFormat(newValue)
    lastSelectList.value = valueFormat(newValue)
  },
  {
    immediate: true
  }
)

watch(
  () => getColumnsWatchKey(props.columns),
  () => {
    const newValue = props.columns
    if (props.filterable && filterVal.value) {
      formatFilterColumns(newValue, filterVal.value)
    } else {
      filterColumns.value = newValue
    }
  },
  {
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

onBeforeMount(() => {
  selectList.value = valueFormat(props.modelValue)
  filterColumns.value = props.columns
})

const { proxy } = getCurrentInstance() as any

async function setScrollIntoView() {
  let wraperSelector: string = ''
  let targetSelector: string = ''
  if (isDef(selectList.value) && selectList.value !== '' && !isArray(selectList.value)) {
    wraperSelector = '#wd-radio-group'
    targetSelector = `#radio${selectList.value}`
  } else if (isArray(selectList.value) && selectList.value.length > 0) {
    wraperSelector = '#wd-checkbox-group'
    targetSelector = `#check${selectList.value[0]}`
  }
  if (wraperSelector && targetSelector) {
    await pause(2000 / 30)
    const [scrollView, wraper, target] = await Promise.all([
      getRect('.wd-select-picker__wrapper', false, proxy),
      getRect(wraperSelector, false, proxy),
      getRect(targetSelector, false, proxy)
    ])

    if (isDef(wraper) && isDef(scrollView) && isDef(target)) {
      const isVisible = target.bottom! > scrollView.top! && target.top! < scrollView.bottom!
      if (!isVisible) {
        scrollTop.value = -1
        nextTick(() => {
          scrollTop.value = Math.max(0, target.top! - wraper.top! - scrollView.height! / 2)
        })
      }
    }
  }
}

function noop() {}

function getSelectedItem(value: string | number | boolean) {
  const { valueKey, labelKey } = props
  const selected = valueItemMap.value.get(value)

  if (selected) {
    return selected
  }

  return {
    [valueKey]: value,
    [labelKey]: ''
  }
}

function valueFormat(value: string | number | boolean | (string | number | boolean)[]) {
  return props.type === 'checkbox' ? (isArray(value) ? value : []) : value
}

function handleChange({ value }: { value: string | number | boolean | (string | number | boolean)[] }) {
  selectList.value = value
  emit('change', { value })
  if (props.type === 'radio' && !props.showConfirm) {
    onConfirm()
  }
}

function close() {
  pickerShow.value = false
  emit('update:visible', false)
  // 未确定选项时，数据还原复位
  if (!isConfirm.value) {
    selectList.value = valueFormat(lastSelectList.value)
  }
  emit('cancel')
  emit('close')
}

function open() {
  selectList.value = valueFormat(props.modelValue)
  pickerShow.value = true
  emit('update:visible', true)
  isConfirm.value = false
  emit('open')
}

function onConfirm() {
  if (props.loading) {
    pickerShow.value = false
    emit('update:visible', false)
    emit('confirm')
    emit('close')
    return
  }
  callInterceptor(props.beforeConfirm, {
    args: [selectList.value],
    done: () => {
      handleConfirm()
    }
  })
}

function handleConfirm() {
  isConfirm.value = true
  pickerShow.value = false
  emit('update:visible', false)
  lastSelectList.value = valueFormat(selectList.value)
  let selectedItems: Record<string, any> = {}
  if (props.type === 'checkbox') {
    selectedItems = (isArray(lastSelectList.value) ? lastSelectList.value : []).map((item) => {
      return getSelectedItem(item)
    })
  } else {
    selectedItems = getSelectedItem(lastSelectList.value as string | number | boolean)
  }
  emit('update:modelValue', lastSelectList.value)
  emit('confirm', {
    value: lastSelectList.value,
    selectedItems
  })
  emit('close')
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getFilterText(label: string, filterVal: string): Array<{ type: 'active' | 'normal'; label: string }> {
  const reg = new RegExp(`(${escapeRegExp(filterVal)})`, 'g')

  return label.split(reg).map((text) => {
    return {
      type: text === filterVal ? 'active' : 'normal',
      label: text
    }
  })
}

function handleFilterChange({ value }: { value: string }) {
  filterVal.value = value
  if (value === '') {
    filterColumns.value = props.columns
  } else {
    formatFilterColumns(props.columns, value)
  }
}

function formatFilterColumns(columns: Record<string, any>[], filterVal: string) {
  const filterColumnsTemp = columns.filter((item) => {
    return item[props.labelKey].indexOf(filterVal) > -1
  })

  const formatFilterColumns = filterColumnsTemp.map((item) => {
    return {
      ...item,
      [props.labelKey]: getFilterText(item[props.labelKey], filterVal)
    }
  })
  filterColumns.value = formatFilterColumns
}

const showConfirm = computed(() => {
  return (props.type === 'radio' && props.showConfirm) || props.type === 'checkbox'
})

defineExpose<SelectPickerExpose>({
  close,
  open
})
</script>
<style lang="scss">
@use './index.scss';
</style>
