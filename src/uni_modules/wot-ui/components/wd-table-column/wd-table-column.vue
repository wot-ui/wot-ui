<template>
  <view class="wd-table-column">
    <view v-for="config in cellConfigs" :key="config.rowIndex" :class="config.class" :style="config.style" @click="handleRowClick(config.rowIndex)">
      <template v-if="config.visible">
        <slot name="value" v-if="$slots.value" :row="getScope(config.rowIndex)" :index="config.rowIndex"></slot>
        <text :class="['wd-table__value', { 'is-ellipsis': ellipsis }]" v-else>{{ config.value }}</text>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-table-column',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { type CSSProperties, computed, ref } from 'vue'
import { isDef, objToStyle, isOdd, isFunction } from '../../common/util'
import { tableColumnProps, type SortDirection } from './types'
import { useParent } from '../../composables/useParent'
import { TABLE_KEY } from '../wd-table/types'
import type { SpanMethodResult } from '../wd-table/types'

const props = defineProps(tableColumnProps)

const { parent: table, index: columnIndex } = useParent(TABLE_KEY)

/** 当前列的排序方向 */
const sortDirection = ref<SortDirection>(0)

/** 是否开启斑马纹（从父级 table 继承） */
const stripe = computed(() => {
  return isDef(table.value) ? table.value.props.stripe : false
})

/** 是否显示边框（从父级 table 继承） */
const border = computed(() => {
  return isDef(table.value) ? table.value.props.border : false
})

/** 是否超出省略（从父级 table 继承） */
const ellipsis = computed(() => {
  return isDef(table.value) ? table.value.props.ellipsis : false
})

/** 当前列是否为最后一个固定列（用于显示右侧阴影） */
const isLastFixed = computed(() => {
  if (props.fixed && isDef(table.value)) {
    return table.value.getIsLastFixed(props)
  }
  return false
})

/**
 * 当前列的数据数组，从父级 table 的 data 中按 prop 提取
 * @returns 当前列 prop 对应的数据值数组
 */
const column = computed(() => {
  if (!isDef(table.value) || !isDef(table.value.props.data) || !Array.isArray(table.value.props.data)) {
    return []
  }
  return table.value.props.data.map((item) => item[props.prop])
})

/**
 * 固定列的 left 偏移值（缓存，避免每个单元格重复调用 getFixedLeft）
 * @returns CSS left 值字符串，非固定列返回空字符串
 */
const fixedLeft = computed(() => {
  if (props.fixed && isDef(table.value) && isFunction(table.value.getFixedLeft)) {
    return table.value.getFixedLeft(columnIndex.value)
  }
  return ''
})

/**
 * 是否为最后一列（用于去除外边框）
 */
const isLastColumn = computed(() => {
  return isDef(table.value) ? columnIndex.value === table.value.children.length - 1 : false
})

/**
 * 预计算可视区域单元格的 class、style、visible 配置
 * 虚拟滚动时只生成 visibleRange 范围内的单元格
 * @returns 每行单元格的渲染配置数组
 */
const cellConfigs = computed(() => {
  const configs: Array<{ rowIndex: number; value: any; class: any; style: string; visible: boolean }> = []
  const data = isDef(table.value) && Array.isArray(table.value.props.data) ? table.value.props.data : []
  if (data.length === 0) return configs

  const range = isDef(table.value) ? table.value.visibleRange.value : { start: 0, end: data.length - 1 }
  const colIdx = columnIndex.value
  const colStart = colIdx + 1
  const hasScrollLeft = isDef(table.value) && table.value.state.scrollLeft
  const isFixed = props.fixed
  const isLast = isLastFixed.value
  const isLastCol = isLastColumn.value
  const left = fixedLeft.value
  const align = props.align
  const stripeVal = stripe.value
  const borderVal = border.value
  const propKey = props.prop

  for (let rowIndex = range.start; rowIndex <= range.end; rowIndex++) {
    const span = getSpanResult(rowIndex)
    const hidden = span.rowspan === 0 || span.colspan === 0

    const cls = [
      'wd-table__cell',
      {
        'is-stripe': stripeVal && isOdd(rowIndex),
        'is-border': borderVal,
        'is-fixed': isFixed,
        'is-shadow': isLast && hasScrollLeft,
        'is-hidden': hidden,
        'is-last': isLastCol
      },
      `is-${align}`
    ]

    const style: CSSProperties = {}
    if (hidden) {
      style['display'] = 'none'
    } else {
      if (span.colspan > 1) {
        style['grid-column'] = `${colStart} / span ${span.colspan}`
      } else {
        style['grid-column'] = `${colStart}`
      }
      const rowStart = rowIndex + 1
      if (span.rowspan > 1) {
        style['grid-row'] = `${rowStart} / span ${span.rowspan}`
      } else {
        style['grid-row'] = `${rowStart}`
      }
    }
    if (isFixed && left) {
      style['left'] = left
    }

    configs.push({
      rowIndex,
      value: data[rowIndex]?.[propKey],
      class: cls,
      style: objToStyle(style),
      visible: !hidden
    })
  }
  return configs
})

/**
 * 获取指定行的单元格合并信息
 * @param rowIndex - 行索引
 * @returns 合并配置 { rowspan, colspan }
 */
function getSpanResult(rowIndex: number): SpanMethodResult {
  if (!isDef(table.value) || !isFunction(table.value.getSpan)) {
    return { rowspan: 1, colspan: 1 }
  }
  return table.value.getSpan(rowIndex, columnIndex.value)
}

/**
 * 处理单元格点击事件，转发给父级 table 的 rowClick
 * @param index - 被点击行的索引
 */
function handleRowClick(index: number) {
  if (!isDef(table.value)) return
  isFunction(table.value.rowClick) && table.value.rowClick(index)
}

/**
 * 获取指定行的完整数据对象，用于 #value 插槽的 row 参数
 * @param index - 行索引
 * @returns 该行的数据对象
 */
function getScope(index: number) {
  if (!isDef(table.value) || !isDef(table.value.props.data) || !Array.isArray(table.value.props.data)) {
    return {}
  }
  return table.value.props.data[index] || {}
}

defineExpose({ sortDirection })
</script>

<style lang="scss">
@use './index.scss';
</style>
