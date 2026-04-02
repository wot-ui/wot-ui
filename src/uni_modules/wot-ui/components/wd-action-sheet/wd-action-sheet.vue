<template>
  <view class="wd-action-sheet-wrapper">
    <wd-popup
      custom-class="wd-action-sheet-wrapper__popup"
      :custom-style="`${(actions && actions.length) || (panels && panels.length) ? 'background: transparent;' : ''}`"
      v-model="showPopup"
      :duration="duration"
      position="bottom"
      :close-on-click-modal="closeOnClickModal"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :lazy-render="lazyRender"
      :root-portal="rootPortal"
      round
      @close="close"
      @enter="emit('enter')"
      @after-enter="emit('after-enter')"
      @leave="emit('leave')"
      @after-leave="emit('after-leave')"
      @click-modal="handleClickModal"
      :z-index="zIndex"
    >
      <view
        :class="`wd-action-sheet ${customClass}`"
        :style="`${(actions && actions.length) || (panels && panels.length) ? ' ' : ''} ${customStyle}`"
      >
        <view v-if="title" :class="`wd-action-sheet__title ${customTitleClass}`">
          {{ title }}
          <slot name="close" :close="close">
            <wd-icon custom-class="wd-action-sheet__close" name="close" @click="close" />
          </slot>
        </view>

        <slot>
          <view class="wd-action-sheet__actions" v-if="actions && actions.length">
            <view
              v-for="(action, rowIndex) in actions"
              :key="rowIndex"
              :class="`wd-action-sheet__action ${title ? '' : 'is-border'} ${action.disabled ? 'wd-action-sheet__action--disabled' : ''}  ${
                action.loading ? 'wd-action-sheet__action--loading' : ''
              }`"
              :style="`color: ${action.color}`"
              @click="select(rowIndex, 'action')"
            >
              <wd-loading custom-class="`wd-action-sheet__action-loading" v-if="action.loading" />
              <view v-else class="wd-action-sheet__name">{{ action.name }}</view>
              <view v-if="!action.loading && action.description" class="wd-action-sheet__description">{{ action.description }}</view>
            </view>
          </view>
          <view v-if="isArray(formatPanels) && formatPanels.length" class="wd-action-sheet__panels-wrap">
            <view v-for="(panel, rowIndex) in formatPanels" :key="rowIndex" class="wd-action-sheet__panels">
              <view class="wd-action-sheet__panels-content">
                <view v-for="(col, colIndex) in panel" :key="colIndex" class="wd-action-sheet__panel" @click="select(rowIndex, 'panels', colIndex)">
                  <wd-icon custom-class="wd-action-sheet__panel-img" :name="col.icon" />
                  <view class="wd-action-sheet__panel-title">{{ col.title }}</view>
                </view>
              </view>
            </view>
          </view>
        </slot>
        <view v-if="cancelText" class="wd-action-sheet__gap"></view>
        <view v-if="cancelText" class="wd-action-sheet__cancel" @click="handleCancel">{{ cancelText }}</view>
      </view>
    </wd-popup>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-action-sheet',
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
import wdPopup from '../wd-popup/wd-popup.vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import wdLoading from '../wd-loading/wd-loading.vue'
import { watch, ref } from 'vue'
import { actionSheetProps, type Panel } from './types'
import { isArray } from '../../common/util'

const props = defineProps(actionSheetProps)
const emit = defineEmits(['select', 'click-modal', 'cancel', 'leave', 'after-leave', 'close', 'enter', 'after-enter', 'update:modelValue'])

const formatPanels = ref<Array<Panel[]>>([])

const showPopup = ref<boolean>(false)

watch(() => props.panels, computedValue, { deep: true, immediate: true })

watch(
  () => props.modelValue,
  (newValue) => {
    showPopup.value = newValue
  },
  { deep: true, immediate: true }
)

/**
 * 判断 panels 是否为一维数组
 */
function isPanelArray() {
  return props.panels.length && !isArray(props.panels[0])
}

/**
 * 计算面板数据
 */
function computedValue() {
  formatPanels.value = isPanelArray() ? [props.panels as Panel[]] : (props.panels as Panel[][])
}

/**
 * 点击选项
 * @param rowIndex 行索引
 * @param type 类型
 * @param colIndex 列索引
 */
function select(rowIndex: number, type: 'action' | 'panels', colIndex?: number) {
  if (type === 'action') {
    if (props.actions[rowIndex].disabled || props.actions[rowIndex].loading) {
      return
    }
    emit('select', {
      item: props.actions[rowIndex],
      index: rowIndex
    })
  } else if (isPanelArray()) {
    emit('select', {
      item: props.panels[Number(colIndex)],
      index: colIndex
    })
  } else {
    emit('select', {
      item: (props.panels as Panel[][])[rowIndex][Number(colIndex)],
      rowIndex,
      colIndex
    })
  }
  if (props.closeOnClickAction) {
    emit('update:modelValue', false)
  }
}

/**
 * 点击遮罩层
 */
function handleClickModal() {
  emit('click-modal')
}

/**
 * 点击取消按钮
 */
function handleCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}

/**
 * 关闭动作面板
 */
function close() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style lang="scss">
@use './index.scss';
</style>
