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
      @after-enter="onAfterEnter"
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
        :class="`wd-select-picker__wrapper ${loading || remoteLoading ? 'is-loading' : ''} ${customContentClass}`"
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
            <view v-for="item in filterColumns" :key="item[valueKey]" :id="'check' + item[valueKey]" class="wd-select-picker__checkbox-item">
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
            <view v-for="(item, index) in filterColumns" :key="index" :id="'radio' + item[valueKey]" class="wd-select-picker__radio-item">
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
      </scroll-view>
      <!-- loading 在 scroll-view 外部，固定不随滚动 -->
      <view v-if="loading || remoteLoading" class="wd-select-picker__loading" @touchmove="noop">
        <wd-loading :color="loadingColor" custom-class="wd-select-picker__loading-icon" />
      </view>
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
import wdSearch from '../wd-search/wd-search.vue'

import { getCurrentInstance, onBeforeMount, ref, watch, nextTick, computed } from 'vue'
import { debounce, getRect, isArray, isDef, isFunction, pause } from '../../common/util'
import { callInterceptor } from '../../common/interceptor'
import { useTranslate } from '../../composables/useTranslate'
import { selectPickerProps, type SelectPickerExpose } from './types'

const { translate } = useTranslate('select-picker')

const props = defineProps(selectPickerProps)
const emit = defineEmits(['change', 'cancel', 'confirm', 'update:modelValue', 'open', 'close', 'update:visible', 'update:columns'])

const pickerShow = ref<boolean>(false)
const selectList = ref<Array<number | boolean | string> | number | boolean | string>([])
const isConfirm = ref<boolean>(false)
const lastSelectList = ref<Array<number | boolean | string> | number | boolean | string>([])
const filterVal = ref<string>('')
const remoteLoading = ref<boolean>(false)
const filterColumns = ref<Array<Record<string, any>>>([])
const scrollTop = ref<number>(0) // 滚动位置
// 最近一次远程搜索返回的原始数据（未高亮处理），用于确认时仅缓存已选中项到 columns
const lastRemoteData = ref<Record<string, any>[]>([])

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
    // 远程搜索模式下，filterColumns 由 executeRemoteSearch 统一管理，不做任何操作
    if (props.remoteMethod) return
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
    // 找到 filterColumns 中最靠前的已选项作为滚动目标
    // （因为远程搜索会把部分选中项置顶插入，selectList.value[0] 可能不是最顶部的）
    const { valueKey } = props
    const selectedVals = new Set(selectList.value.map((v: any) => v))
    const topmost = filterColumns.value.find((item: Record<string, any>) => selectedVals.has(item[valueKey]))
    const targetVal = topmost ? topmost[valueKey] : selectList.value[0]
    targetSelector = `#check${targetVal}`
  }
  if (wraperSelector && targetSelector) {
    await pause(2000 / 30)
    try {
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
    } catch (e) {
      // 目标节点未找到（可能因远程搜索结果变更导致选中项不在当前数据集中），静默跳过滚动定位
    }
  }
}

function onAfterEnter() {
  // 非远程搜索时，滚动到选中项
  if (!props.remoteMethod && props.scrollIntoView) {
    setScrollIntoView()
  }
  // 始终触发远程搜索（空 keyword 时拉取默认数据，初始加载不经过防抖）
  if (props.remoteMethod) {
    remoteLoading.value = true
    executeRemoteSearch(filterVal.value)
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

// ====== 远程搜索辅助函数 ======

/** 将选中值统一转为数组 */
function toValueList(value: any): (string | number | boolean)[] {
  if (isArray(value)) return value
  return isDef(value) && value !== '' ? [value] : []
}

/** 从 lastRemoteData 查找项 */
function findInRemote(key: string | number | boolean) {
  return lastRemoteData.value.find((d) => d[props.valueKey] === key)
}

/** 高亮包装：将字符串 label 转为高亮片段数组 */
function highlightIfSearch(item: Record<string, any>, keyword: string) {
  if (keyword && typeof item[props.labelKey] === 'string') {
    return { ...item, [props.labelKey]: getFilterText(item[props.labelKey], keyword) }
  }
  return item
}

/** 根据类型构建同步到 columns 的数据 */
function buildSyncColumns(value: any): Record<string, any>[] {
  if (props.type === 'radio') {
    const item = findInRemote(value) || props.columns.find((c) => c[props.valueKey] === value)
    return item ? [{ ...item }] : []
  }
  // checkbox：累积去重
  const values = toValueList(value)
  const merged = [...props.columns]
  values.forEach((val) => {
    if (!merged.some((col) => col[props.valueKey] === val)) {
      const item = findInRemote(val)
      if (item) merged.push({ ...item })
    }
  })
  return merged
}

function handleChange({ value }: { value: string | number | boolean | (string | number | boolean)[] }) {
  selectList.value = value
  emit('change', { value })
  // 远程搜索：选中项立即双向同步到 columns（filterColumns 不受影响，保持当前搜索结果）
  if (props.remoteMethod) {
    const newColumns = buildSyncColumns(value)
    emit('update:columns', newColumns)
  }
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

  // 仅缓存已确认的选中项到 columns
  if (props.remoteMethod && lastRemoteData.value.length > 0) {
    const newColumns = buildSyncColumns(lastSelectList.value)
    if (props.type === 'radio') {
      emit('update:columns', newColumns)
    } else {
      // 多选：比较 key 列表避免无效 emit
      const oldKeys = props.columns
        .map((c) => String(c[props.valueKey]))
        .sort()
        .join(',')
      const newKeys = newColumns
        .map((c) => String(c[props.valueKey]))
        .sort()
        .join(',')
      if (oldKeys !== newKeys) emit('update:columns', newColumns)
    }
  }

  // 构建 selectedItems
  let selectedItems: Record<string, any> = {}
  if (props.type === 'checkbox') {
    const values = toValueList(lastSelectList.value)
    selectedItems = values.map((val) => {
      return findInRemote(val) ? { ...findInRemote(val)! } : getSelectedItem(val)
    })
  } else {
    const val = lastSelectList.value as string | number | boolean
    selectedItems = findInRemote(val) ? { ...findInRemote(val)! } : getSelectedItem(val)
  }
  emit('update:modelValue', lastSelectList.value)
  emit('confirm', { value: lastSelectList.value, selectedItems })
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
    if (props.remoteMethod) {
      // 空值时也触发远程搜索（常用于默认拉取数据）
      remoteLoading.value = true
      filterColumns.value = []
      executeRemoteSearch('')
    } else {
      filterColumns.value = props.columns
    }
    return
  }
  if (props.remoteMethod) {
    remoteLoading.value = true
    filterColumns.value = []
    debouncedRemoteSearch(value)
    return
  }
  formatFilterColumns(props.columns, value)
}

function executeRemoteSearch(keyword: string) {
  if (props.remoteMethod) {
    props.remoteMethod(keyword, (data: Record<string, any>[]) => {
      if (filterVal.value !== keyword) return
      remoteLoading.value = false
      lastRemoteData.value = data

      // 无搜索关键词时，将未在结果中的已选中项置顶插入
      const merged = [...data]
      if (!keyword) {
        const selectedValues = toValueList(selectList.value)
        let prependIndex = 0
        selectedValues.forEach((val) => {
          if (!merged.some((item) => item[props.valueKey] === val)) {
            const source = props.columns.find((c) => c[props.valueKey] === val)
            if (source) {
              merged.splice(prependIndex, 0, { ...source })
              prependIndex++
            }
          }
        })
      }

      // 对搜索结果项做高亮处理
      filterColumns.value = merged.map((item) => {
        if (keyword && typeof item[props.labelKey] === 'string') {
          const isSearchResult = data.some((d) => d[props.valueKey] === item[props.valueKey])
          if (isSearchResult) return highlightIfSearch(item, keyword)
        }
        return item
      })
      // 数据加载后滚动到选中项（有选中项时直接滚动，无选中项时回顶部）
      const hasSelection = toValueList(selectList.value).length > 0
      if (hasSelection && props.scrollIntoView) {
        nextTick(() => setScrollIntoView())
      } else {
        scrollTop.value = -1
        nextTick(() => {
          scrollTop.value = 0
        })
      }
    })
  }
}

const debouncedRemoteSearch = debounce(executeRemoteSearch, 500)

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
