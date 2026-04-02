<template>
  <view :class="`wd-picker-view ${customClass}`" :style="customStyle">
    <picker-view
      class="wd-picker-view__main"
      mask-class="wd-picker-view__mask"
      indicator-class="wd-picker-view__roller"
      :style="pickerViewStyle"
      :value="selectedIndex"
      :immediate-change="immediateChange"
      @change="onChange"
      @pickstart="onPickStart"
      @pickend="onPickEnd"
    >
      <picker-view-column v-for="(col, colIndex) in formatColumns" :key="colIndex" class="wd-picker-view__column">
        <block v-for="(row, rowIndex) in col" :key="rowIndex">
          <view :class="getItemClass(row['disabled'], colIndex, rowIndex)">
            {{ row[labelKey] }}
          </view>
        </block>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-picker-view',
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
import { watch, nextTick, computed } from 'vue'
import { addUnit, isDef, isEqual, isArray, isObj } from '../../common/util'
import { pickerViewProps, type PickerViewExpose, type PickerOption } from './types'

import { useSelection } from './useSelection'
import { type Numeric } from '../../common/props'

const props = defineProps(pickerViewProps)
const emit = defineEmits(['change', 'pickstart', 'pickend', 'update:modelValue'])

// 使用 selection hooks 管理数据处理逻辑
const {
  formatColumns,
  selectedIndex,
  selectedOptions,
  selectedValues,
  selectedLabels,
  selectWithValue,
  correctSelected,
  getChangeColumnIndex,
  getColumnIndex,
  getColumnData,
  getColumnsData,
  resetColumns,
  buildCascadeColumns,
  updateCascadeColumns
} = useSelection(props.valueKey, props.labelKey, props.childrenKey, props.cascade)

watch(
  [() => props.modelValue, () => props.columns, () => props.cascade],
  (newValue, oldValue) => {
    const [newModelValue, newColumns, newCascade] = newValue
    const [, oldColumns] = oldValue

    // 列数据变化时重置
    if (!isEqual(oldColumns, newColumns)) {
      resetColumns(newColumns)

      // 级联模式且有选中值：构建多列数据
      if (newCascade && isDef(newModelValue) && (newModelValue as any[]).length > 0 && newColumns.length > 0) {
        const cascadeColumns = buildCascadeColumns(newColumns as PickerOption[], newModelValue as any[])
        formatColumns.value = cascadeColumns
      }
    }

    // modelValue 变化时更新选中
    if (isDef(newModelValue)) {
      selectWithValue(newModelValue)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const pickerViewStyle = computed(() => {
  return `height: ${addUnit(props.itemHeight * props.visibleItemCount)};`
})

/**
 * 获取 column item 的类名
 * @param disabled 是否禁用
 * @param colIndex 列索引
 * @param rowIndex 行索引
 */
function getItemClass(disabled: boolean | undefined, colIndex: number, rowIndex: number) {
  const classes = ['wd-picker-view__column-item']
  if (disabled) {
    classes.push('wd-picker-view__column-item--disabled')
  }
  if (selectedIndex.value[colIndex] === rowIndex) {
    classes.push('wd-picker-view__column-item--active')
  }
  return classes.join(' ')
}

/**
 * 选择器选中项变化时触发
 * @param {object} event 事件对象
 * @param {object} event.detail 事件详情
 * @param {number[]} event.detail.value 选中值索引数组
 */
function onChange({ detail: { value } }: { detail: { value: number[] } }) {
  // 将值转换为数字数组
  const normalizedValue = value.map((v) => Number(v || 0))
  const origin = [...selectedIndex.value]

  // 先将picker选择器的值赋给selectedIndex，然后重新赋予修正后的值，防止两次操作修正结果一致时pikcer视图不刷新
  selectedIndex.value = [...normalizedValue]

  nextTick(() => {
    // 重新赋予修正后的值
    selectedIndex.value = correctSelected(normalizedValue)
    // 获取变化的列索引
    const columnIndex = getChangeColumnIndex(selectedIndex.value, origin)

    // 级联模式：自动更新后续列
    if (props.cascade && columnIndex !== -1 && props.columns.length > 0) {
      // 判断是否为树形数据
      const firstColumn = props.columns[0]
      if (!isArray(firstColumn) && isObj(firstColumn)) {
        updateCascadeColumns(props.columns as PickerOption[], columnIndex, selectedIndex.value)
      }
    }

    handleChange(columnIndex)
  })
}

/**
 * 触发 change 事件
 * @param columnIndex 列索引
 */
function handleChange(columnIndex: number) {
  // 避免多次触发change
  if (isEqual(selectedValues.value, props.modelValue)) return

  emit('update:modelValue', selectedValues.value)
  nextTick(() => {
    emit('change', {
      selectedValues: selectedValues.value,
      selectedOptions: selectedOptions.value,
      selectedLabels: selectedLabels.value,
      selectedIndexes: selectedIndex.value,
      columnIndex
    })
  })
}

/**
 * 获取选中数据
 * @returns {number[]} 选中值索引数组
 */
function getSelectedIndex(): number[] {
  return selectedIndex.value
}

/**
 * 滚动开始
 */
function onPickStart() {
  emit('pickstart')
}

/**
 * 滚动结束
 */
function onPickEnd() {
  emit('pickend')
}

/**
 * 获取所有列选中项
 * @returns {PickerOption[]} 选中项
 */
function getSelectedOptions(): PickerOption[] {
  return selectedOptions.value
}

/**
 * 获取所有列的选中值
 * @returns {Numeric[]} 选中值
 */
function getSelectedValues(): Numeric[] {
  return selectedValues.value
}

/**
 * 获取所有列选中项的label，返回值为一个数组
 * @returns {string[]} label数组
 */
function getSelectedLabels(): string[] {
  return selectedLabels.value
}

defineExpose<PickerViewExpose>({
  getSelectedOptions,
  getSelectedValues,
  getColumnsData,
  getColumnData,
  getColumnIndex,
  getSelectedLabels,
  getSelectedIndex,
  resetColumns
})
</script>
<style lang="scss">
@use './index.scss';
</style>
