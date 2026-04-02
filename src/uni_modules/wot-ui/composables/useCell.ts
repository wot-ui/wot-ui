import { computed } from 'vue'
import { useParent } from './useParent'
import { CELL_GROUP_KEY } from '../components/wd-cell-group/types'
import type { CellLayout, CellSize, CellValueAlign } from '../components/wd-cell/types'

export function useCell() {
  const { parent: cellGroup, index } = useParent(CELL_GROUP_KEY)

  const border = computed(() => {
    return cellGroup?.value && cellGroup.value.props.border && index.value
  })

  const center = computed(() => {
    return cellGroup.value?.props.center
  })

  const size = computed<CellSize | undefined>(() => {
    return cellGroup.value?.props.size
  })

  const titleWidth = computed(() => {
    return cellGroup.value?.props.titleWidth
  })

  const layout = computed<CellLayout | undefined>(() => {
    return cellGroup.value?.props.layout || undefined
  })

  const valueAlign = computed<CellValueAlign | undefined>(() => {
    return cellGroup.value?.props.valueAlign || undefined
  })

  return { border, center, size, titleWidth, layout, valueAlign }
}
