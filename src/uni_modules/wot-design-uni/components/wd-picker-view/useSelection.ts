import { computed, ref } from 'vue'
import { getType, isArray, isDef, range, isObj, deepClone } from '../common/util'
import type { PickerOption } from './types'
import { type Numeric } from '../common/props'

/**
 * 格式化传入的列数据
 * 列数据统一格式化为二维数组
 * @param {Array<string | number | PickerOption | Array<string | number | PickerOption>>} array 列数据
 * @param {string} valueKey value 对应的 key
 * @param {string} labelKey label 对应的 key
 * @returns {PickerOption[][]} 格式化后的二维数组
 */
function formatArray(
  array: Array<string | number | PickerOption | Array<string | number | PickerOption>>,
  valueKey: string,
  labelKey: string
): PickerOption[][] {
  let tempArray: Array<string | number | PickerOption | Array<string | number | PickerOption>> = isArray(array) ? array : [array]
  // 判断数组第一层的数据类型，如果存在多种类型，则抛错
  const firstLevelTypeList = new Set(array.map(getType))
  /**
   * 存在三种类型的合法数据
   * 1.数组是一维元素，所有元素都是原始值
   * 2.数组是一维元素，所有元素都是object
   * 3.数组是二维元素，二维元素可以是任意内容
   */
  if (firstLevelTypeList.size !== 1 && firstLevelTypeList.has('object')) {
    // 原始值和引用类型不用混用
    throw Error('The columns are correct')
  }
  /**
   * 简单处理，如果数组第一项不是数组则认为它是一个一维数组
   * 所以需要把一维的转成二维，这样方便统一处理
   */
  if (!isArray(array[0])) {
    tempArray = [tempArray as Array<string | number | PickerOption>]
  }
  // 转化为二维数组后需要将每一项包装成PickerOption
  const result: Array<Array<PickerOption>> = (tempArray as Array<Array<string | number | PickerOption>>).map((col) => {
    return col.map((row) => {
      // 非对象类型直接将值作为label和value
      if (!isObj(row)) {
        return {
          [valueKey]: row,
          [labelKey]: row
        } as PickerOption
      }
      /**
       * 针对已经是object的，修补成{valueKey,labelKey}
       * 如果没有labelKey，用valueKey代替
       * 如果没有valueKey，用labelKey代替
       * valueKey,labelKey都没有，直接抛错
       */
      // eslint-disable-next-line no-prototype-builtins
      if (!row.hasOwnProperty(valueKey) && !row.hasOwnProperty(labelKey)) {
        // eslint-disable-next-line prettier/prettier
        throw Error('Can\'t find valueKey and labelKey in columns')
      }
      // eslint-disable-next-line no-prototype-builtins
      if (!row.hasOwnProperty(labelKey)) {
        row[labelKey] = row[valueKey]
      }
      // eslint-disable-next-line no-prototype-builtins
      if (!row.hasOwnProperty(valueKey)) {
        row[valueKey] = row[labelKey]
      }
      return row as PickerOption
    })
  })

  return result
}

/**
 * 选择器数据处理 hooks
 * 负责管理列数据、选中索引以及相关的数据处理逻辑
 * @param {string} valueKey 选项对象中，value对应的 key
 * @param {string} labelKey 选项对象中，展示的文本对应的 key
 * @param {string} childrenKey 选项对象中，children对应的 key
 * @param {boolean} cascade 是否启用级联模式
 */
export function useSelection(valueKey: string, labelKey: string, childrenKey: string = 'children', cascade: boolean = false) {
  // 格式化后的列数据
  const formatColumns = ref<PickerOption[][]>([])
  // 每列选中的下标集合
  const selectedIndex = ref<number[]>([])
  /**
   * 所有列选中项
   */
  const selectedOptions = computed(() => {
    return selectedIndex.value.map((row, col) => formatColumns.value[col][row])
  })

  /**
   * 获取所有列的选中值
   * @returns {Numeric[]} 选中值
   */
  const selectedValues = computed(() => {
    const values = selectedIndex.value.map((row, col) => {
      return formatColumns.value[col][row][valueKey] as Numeric
    })
    return values
  })

  /**
   * 获取所有列选中项的label，返回值为一个数组
   * @returns {string[]} label数组
   */
  const selectedLabels = computed(() => {
    return selectedIndex.value.map((row, col) => String(formatColumns.value[col][row][labelKey] ?? ''))
  })

  /**
   * 根据传入的value，寻找对应的索引，并传递给原生选择器。
   * 需要保证formatColumns先设置，之后会修改selectedIndex。
   * @param {Numeric[]} value 选中值
   */
  function selectWithValue(value: Numeric | Numeric[]) {
    if (formatColumns.value.length === 0) {
      selectedIndex.value = [] // 如果列为空，直接清空选中索引
      return
    }

    // 标准化 value 为数组形式
    let normalizedValue: Numeric[]

    // 使其默认选中首项
    if (!isDef(value) || (isArray(value) && value.length === 0)) {
      normalizedValue = formatColumns.value.map((col) => {
        return col[0][valueKey] as Numeric
      })
    } else {
      normalizedValue = isArray(value) ? (value as Numeric[]) : [value as Numeric]
    }

    /**
     * 1.单key转为Array<key>
     * 2.根据formatColumns的长度截取Array<String>，保证下面的遍历不溢出
     * 3.根据每列的key值找到选项中value为此key的下标并记录
     */
    const slicedValue = normalizedValue.slice(0, formatColumns.value.length)

    // 使用浅拷贝替代深拷贝，因为 selectedIndex 是简单数字数组
    let selected: number[] = [...selectedIndex.value]
    slicedValue.forEach((target, col) => {
      let row = formatColumns.value[col].findIndex((row) => {
        return row[valueKey]?.toString() === target.toString()
      })
      row = row === -1 ? 0 : row
      selected = correctSelectedIndex(col, row, selected)
    })
    /** 根据formatColumns的长度去除selectWithIndex无用的部分。
     * 始终保持value、selectWithIndex、formatColumns长度一致
     */
    selectedIndex.value = selected.slice(0, slicedValue.length)
  }

  /**
   * 修正选中项的值
   * @param {number[]} value 当前picker选择器选中的值
   * @returns {number[]} 修正后的选中值
   */
  function correctSelected(value: number[]): number[] {
    let selected = [...value]
    value.forEach((row, col) => {
      row = range(row, 0, formatColumns.value[col].length - 1)
      selected = correctSelectedIndex(col, row, selected)
    })
    return selected
  }

  /**
   * 修正选中项指定列行的值
   * @param {number} columnIndex 列下标
   * @param {number} rowIndex 行下标
   * @param {number[]} selected 选中值列表
   * @returns {number[]} 修正后的选中值列表
   */
  function correctSelectedIndex(columnIndex: number, rowIndex: number, selected: number[]): number[] {
    const col = formatColumns.value[columnIndex]
    if (!col || !col[rowIndex]) {
      console.error(`[wd-picker-view] The value to select with Col:${columnIndex} Row:${rowIndex} is incorrect`)
      // 返回原始 selected 而不是抛出错误，提供降级策略
      return selected
    }
    const select: number[] = [...selected]
    select[columnIndex] = rowIndex

    // 被禁用的无法选中，选中距离它最近的未被禁用的
    if (col[rowIndex].disabled) {
      // 寻找向前最近的未被禁用的节点的索引
      const prev = col
        .slice(0, rowIndex)
        .reverse()
        .findIndex((s) => !s.disabled)
      // 寻找向后最近的未被禁用的节点的索引
      const next = col.slice(rowIndex + 1).findIndex((s) => !s.disabled)

      if (prev !== -1) {
        // 找到了向前的可选项
        select[columnIndex] = rowIndex - 1 - prev
      } else if (next !== -1) {
        // 找到了向后的可选项
        select[columnIndex] = rowIndex + 1 + next
      } else {
        // 所有选项都被禁用时，仍然选中当前行并给出警告
        console.warn(`[wd-picker-view] All options in column ${columnIndex} are disabled, selecting disabled item at index ${rowIndex}`)
        select[columnIndex] = rowIndex
      }
    }
    return select
  }

  /**
   * 获取选中项变化的列的下标
   * @param {number[]} now 当前选中项值
   * @param {number[]} origin 旧选中项值
   * @returns {number} 变化的列下标，无变化返回 -1
   */
  function getChangeColumnIndex(now: number[], origin: number[]): number {
    if (!now || !origin) return -1
    const index = now.findIndex((row, index) => row !== origin[index])
    return index
  }

  /**
   * 获取某一列的选中项下标
   * @param {number} columnIndex 列的下标
   * @returns {number} 下标
   */
  function getColumnIndex(columnIndex: number): number {
    return selectedIndex.value[columnIndex]
  }

  /**
   * 获取某一列的选项
   * @param {number} columnIndex 列的下标
   * @returns {PickerOption[]} 当前列的集合
   */
  function getColumnData(columnIndex: number): PickerOption[] {
    return formatColumns.value[columnIndex]
  }

  /**
   * 获取列数据
   * @returns {PickerOption[][]} 列数据
   */
  function getColumnsData(): PickerOption[][] {
    return deepClone(formatColumns.value)
  }

  /**
   * 从树形数据（带 children）构建多列数组
   * @param {PickerOption[]} data 树形数据
   * @param {Numeric[]} selectedValues 选中值数组
   * @returns {PickerOption[][]} 多列数据
   */
  function buildCascadeColumns(data: PickerOption[], selectedValues: Numeric[]): PickerOption[][] {
    const result: PickerOption[][] = []
    let currentLevel = data

    // 第一列始终是根数据
    if (currentLevel.length > 0) {
      result.push(currentLevel)
    }

    // 根据选中值逐级构建后续列
    for (let i = 0; i < selectedValues.length; i++) {
      const value = selectedValues[i]
      const selected = currentLevel.find((item) => item[valueKey]?.toString() === value.toString())

      if (selected && selected[childrenKey] && (selected[childrenKey] as PickerOption[]).length > 0) {
        currentLevel = selected[childrenKey] as PickerOption[]
        result.push(currentLevel)
      } else {
        // 如果没有 children 或 children 为空，停止构建
        break
      }
    }

    return result
  }

  /**
   * 更新级联模式下的列数据
   * @param {PickerOption[]} rootData 根级数据
   * @param {number} changedColumnIndex 变化的列索引
   * @param {number[]} currentSelectedIndex 当前选中索引数组
   */
  function updateCascadeColumns(rootData: PickerOption[], changedColumnIndex: number, currentSelectedIndex: number[]) {
    // 从根级开始重新构建到变化列的数据
    const newColumns: PickerOption[][] = [rootData]
    let currentLevel = rootData
    const newSelectedIndex: number[] = []

    // 重新构建到变化列（包括变化列）
    for (let i = 0; i <= changedColumnIndex && i < currentSelectedIndex.length; i++) {
      const selectedIndex = currentSelectedIndex[i]
      const selected = currentLevel[selectedIndex]

      newSelectedIndex.push(selectedIndex)

      if (selected && selected[childrenKey] && (selected[childrenKey] as PickerOption[]).length > 0) {
        currentLevel = selected[childrenKey] as PickerOption[]
        newColumns.push(currentLevel)
      } else {
        // 当前选中项没有子级，停止构建
        break
      }
    }

    // 继续构建变化列之后的列，每次选中第一个可用项（非禁用）
    while (currentLevel.length > 0) {
      // 找到第一个非禁用项的索引
      const firstEnabledIndex = currentLevel.findIndex((item) => !item.disabled)

      // 如果所有项都被禁用，选中第一项
      const nextIndex = firstEnabledIndex !== -1 ? firstEnabledIndex : 0
      const selected = currentLevel[nextIndex]

      if (selected && selected[childrenKey] && (selected[childrenKey] as PickerOption[]).length > 0) {
        newSelectedIndex.push(nextIndex)
        currentLevel = selected[childrenKey] as PickerOption[]
        newColumns.push(currentLevel)
      } else {
        // 如果最后一个选中项有子级，需要添加其索引
        if (newColumns.length > newSelectedIndex.length) {
          newSelectedIndex.push(nextIndex)
        }
        // 没有更多子级了，停止构建
        break
      }
    }

    // 更新 formatColumns 和 selectedIndex
    formatColumns.value = newColumns
    selectedIndex.value = newSelectedIndex
  }

  /**
   * 用于重置列数据为指定列数据
   * @param {(string | number | PickerOption | Array<string | number | PickerOption>)[]} columns 新列数据
   */
  function resetColumns(columns: Array<string | number | PickerOption | Array<string | number | PickerOption>>) {
    if (isArray(columns) && columns.length > 0) {
      // 级联模式：判断是否为树形数据（检查第一项是否有 children）
      if (cascade && isArray(columns) && columns.length > 0 && !isArray(columns[0])) {
        const firstItem = columns[0] as PickerOption
        // 如果是对象且包含 childrenKey，则认为是级联数据
        if (isObj(firstItem) && childrenKey in firstItem) {
          // 树形数据，需要根据当前选中值构建多列
          const cascadeData = columns as PickerOption[]
          // 初始化时，如果没有选中值，只显示第一列
          formatColumns.value = [formatArray([cascadeData], valueKey, labelKey)[0]]
          return
        }
      }

      // 非级联模式或普通二维数组：使用原有逻辑
      formatColumns.value = formatArray(columns, valueKey, labelKey)
    } else {
      formatColumns.value = []
      selectedIndex.value = []
    }
  }

  return {
    formatColumns,
    selectedIndex,
    selectedOptions,
    selectedValues,
    selectedLabels,
    selectWithValue,
    correctSelected,
    correctSelectedIndex,
    getChangeColumnIndex,
    getColumnIndex,
    getColumnData,
    getColumnsData,
    resetColumns,
    buildCascadeColumns,
    updateCascadeColumns
  }
}
