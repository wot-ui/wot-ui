<template>
  <view :class="`wd-picker ${customClass}`" :style="customStyle">
    <wd-popup
      v-model="popupShow"
      position="bottom"
      :hide-when-close="false"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :root-portal="rootPortal"
      @close="onCancel"
      custom-class="wd-picker__popup"
    >
      <view class="wd-picker__wraper">
        <view class="wd-picker__toolbar" @touchmove="noop">
          <view class="wd-picker__action wd-picker__action--cancel" @click="onCancel">
            {{ cancelButtonText || translate('cancel') }}
          </view>
          <view v-if="title" class="wd-picker__title">{{ title }}</view>
          <view class="wd-picker__action wd-picker__action--confirm" @click="onConfirm">
            {{ confirmButtonText || translate('done') }}
          </view>
        </view>
        <wd-picker-view
          ref="pickerViewRef"
          :custom-class="customViewClass"
          v-model="pickerValue"
          :columns="displayColumns"
          :item-height="itemHeight"
          :visible-item-count="visibleItemCount"
          :value-key="valueKey"
          :label-key="labelKey"
          :cascade="cascade"
          :children-key="childrenKey"
          :immediate-change="immediateChange"
          @change="pickerViewChange"
          @pickstart="onPickStart"
          @pickend="onPickEnd"
        />
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-picker',
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
import wdPickerView from '../wd-picker-view/wd-picker-view.vue'
import { getCurrentInstance, onBeforeMount, ref, watch, onMounted } from 'vue'
import { deepClone } from '../../common/util'
import { callInterceptor } from '../../common/interceptor'
import { type PickerOption, type PickerViewExpose } from '../wd-picker-view/types'
import { useTranslate } from '../../composables/useTranslate'
import { pickerProps, type PickerExpose } from './types'
import { type Numeric } from '../../common/props'
const { translate } = useTranslate('picker')

const props = defineProps(pickerProps)
const emit = defineEmits(['confirm', 'open', 'cancel', 'update:modelValue', 'update:visible'])

// 弹出层是否显示
const popupShow = ref<boolean>(false)

const pickerValue = ref<Numeric[]>([])
const pickerSelectedOptions = ref<PickerOption[]>([]) // 缓存选中的选项对象
const pickerViewRef = ref<PickerViewExpose>()
const displayColumns = ref<Array<PickerOption | Array<PickerOption>>>([]) // 传入 pickerView 的columns
const isPicking = ref<boolean>(false) // 判断pickview是否还在滑动中
const hasConfirmed = ref<boolean>(false) // 判断用户是否点击了确认按钮

watch(
  () => props.modelValue,
  (newValue) => {
    pickerValue.value = newValue as Numeric[]
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.columns,
  (newValue) => {
    displayColumns.value = deepClone(newValue)
    if (newValue.length === 0) {
      // 当 columns 变为空时，清空 pickerValue
      pickerValue.value = []
    }
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

const { proxy } = getCurrentInstance() as any

onMounted(() => {
  if (props.visible) {
    showPopup()
  }
})

onBeforeMount(() => {
  displayColumns.value = deepClone(props.columns)
})

// 对外暴露方法，打开弹框
function open() {
  showPopup()
}
// 对外暴露方法，关闭弹框
function close() {
  onCancel()
}
/**
 * 展示popup
 */
function showPopup() {
  emit('open')
  popupShow.value = true
  pickerValue.value = props.modelValue
  displayColumns.value = deepClone(props.columns)
}

/**
 * 点击取消按钮触发。关闭popup，触发cancel事件。
 */
function onCancel() {
  popupShow.value = false
  emit('cancel')
}
/**
 * 点击确定按钮触发。展示选中值，触发cancel事件。
 */
function onConfirm() {
  // 如果当前还在滑动且未停止下来，则锁住先不确认，等滑完再自动确认，避免pickview值未更新
  if (isPicking.value) {
    hasConfirmed.value = true
    return
  }

  const { beforeConfirm } = props
  callInterceptor(beforeConfirm, {
    args: [pickerValue.value],
    done: () => {
      handleConfirm()
    }
  })
}
function handleConfirm() {
  const values = pickerViewRef.value?.getSelectedValues() || pickerValue.value
  const selects = pickerViewRef.value?.getSelectedOptions() || pickerSelectedOptions.value

  popupShow.value = false
  emit('update:modelValue', values)

  emit('confirm', {
    value: values,
    selectedItems: selects
  })
}
/**
 * picker-view change事件
 * @param event
 */
function pickerViewChange({ selectedValues, selectedOptions }: any) {
  pickerValue.value = selectedValues
  pickerSelectedOptions.value = selectedOptions
}

function noop() {}
function onPickStart() {
  isPicking.value = true
}
function onPickEnd() {
  isPicking.value = false

  if (hasConfirmed.value) {
    hasConfirmed.value = false
    onConfirm()
  }
}

defineExpose<PickerExpose>({
  close,
  open
})
</script>
<style lang="scss">
@use './index.scss';
</style>
