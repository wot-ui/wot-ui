<template>
  <view :class="['wd-cascader', customClass]" :style="customStyle">
    <wd-action-sheet
      v-model="pickerShow"
      :title="title || translate('title')"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :root-portal="rootPortal"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @leave="handleLeave"
      @close="handlePickerClose"
      @after-leave="handleAfterLeave"
    >
      <wd-tabs
        ref="tabsRef"
        :model-value="activeTab"
        slidable="always"
        :animated="inited"
        @click="handleTabClick"
        :line-width="lineWidth"
        :line-height="lineHeight"
        :line-theme="lineTheme"
      >
        <wd-tab
          v-for="(tab, tabIndex) in tabs"
          :key="tabIndex"
          :title="tab.selectedOption ? tab.selectedOption[textKey] : translate('select')"
          :name="tabIndex"
          :lazy="false"
        >
          <view class="wd-cascader__panel">
            <scroll-view scroll-y class="wd-cascader__list">
              <view
                v-for="(item, index) in tab.options"
                :key="index"
                :class="[
                  'wd-cascader__list-item',
                  { 'wd-cascader__list-item--selected': tab.selectedOption && item[valueKey] === tab.selectedOption[valueKey] },
                  { 'wd-cascader__list-item--disabled': item.disabled }
                ]"
                @click="chooseItem(tabIndex, index)"
              >
                <view class="wd-cascader__list-item-content">
                  <view class="wd-cascader__list-item-label">{{ item[textKey] }}</view>
                  <view v-if="item[tipKey]" class="wd-cascader__list-item-tip">{{ item[tipKey] }}</view>
                </view>
                <wd-icon
                  custom-class="wd-cascader__checked"
                  name="check"
                  v-if="tab.selectedOption && item[valueKey] === tab.selectedOption[valueKey]"
                />
              </view>
            </scroll-view>
            <view v-if="loadingTabs.includes(tabIndex)" class="wd-cascader__loading">
              <wd-loading />
            </view>
          </view>
        </wd-tab>
      </wd-tabs>
    </wd-action-sheet>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-cascader',
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
import wdIcon from '../wd-icon/wd-icon.vue'
import wdActionSheet from '../wd-action-sheet/wd-action-sheet.vue'
import wdTabs from '../wd-tabs/wd-tabs.vue'
import wdTab from '../wd-tab/wd-tab.vue'
import wdLoading from '../wd-loading/wd-loading.vue'
import { ref, watch, nextTick, computed } from 'vue'
import { isArray, isDef, isFunction } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import { cascaderProps, type CascaderExpose, type CascaderOption, type CascaderTab, type CascaderLazyLoad } from './types'
import { type TabsInstance } from '../wd-tabs/types'

const { translate } = useTranslate('cascader')

const props = defineProps(cascaderProps)
const emit = defineEmits(['close', 'update:modelValue', 'confirm', 'update:visible'])

const tabsRef = ref<TabsInstance>() // tabs组件实例
const pickerShow = ref<boolean>(false) // picker弹框是否出现
const tabs = ref<CascaderTab[]>([]) // 面板状态数据
const activeTab = ref<number>(0) // 当前停留的列下标
const inited = ref<boolean>(false)
const loadingTabs = ref<number[]>([]) // 正在异步加载数据的列下标集合
const innerOptions = ref<CascaderOption[]>(props.options as CascaderOption[]) // 内部维护的选项数据，静态模式初始化后脱离 props 响应

/**
 * 获取选中的值构成的数组，用以后续匹配全路径。
 */
function getSelectedValues(): (string | number)[] {
  const { modelValue } = props
  return isArray(modelValue) ? modelValue : isDef(modelValue) ? [modelValue] : []
}

/**
 * 核心逻辑：根据当前的初始值或重新传入的 source 建立 tabs 结构。
 * 组件会自动从叶子节点回溯全路径并展示对应的面板。
 */
function buildTabs() {
  const { lazyLoad, findPath, modelValue, childrenKey } = props

  if (lazyLoad) {
    // 异步模式：仅在有 findPath 时重建回显路径，其余情况不干预 tabs
    if (isDef(modelValue) && modelValue !== '' && findPath) {
      findPath(modelValue, (pathTabs) => {
        tabs.value = pathTabs.map((item) => ({
          options: item.options,
          selectedOption: item.selectedOption
        }))
        activeTab.value = Math.max(pathTabs.length - 1, 0)
      })
    }
    return
  }

  // 静态模式：使用 innerOptions
  if (!innerOptions.value.length) {
    tabs.value = []
    return
  }

  const values = getSelectedValues()
  const path = values.length > 0 ? findPathByValue(innerOptions.value, values[0]) || [] : []
  const newTabs: CascaderTab[] = []

  for (let opts: CascaderOption[] | undefined = innerOptions.value, i = 0; opts?.length; i++) {
    const selectedOption = path[i] || null
    newTabs.push({ options: opts, selectedOption })
    opts = selectedOption?.[childrenKey]?.length ? selectedOption[childrenKey] : undefined
  }

  tabs.value = newTabs
  activeTab.value = Math.max(newTabs.length - 1, 0)
}

/**
 * 深度优先遍历寻找单一值对应的完整节点路径。
 */
function findPathByValue(options: CascaderOption[], target: string | number): CascaderOption[] | null {
  const { valueKey, childrenKey } = props
  for (const option of options) {
    if (option[valueKey] === target) {
      return [option]
    }
    if (option[childrenKey] && option[childrenKey].length > 0) {
      const path = findPathByValue(option[childrenKey], target)
      if (path) {
        return [option, ...path]
      }
    }
  }
  return null
}

/**
 * 当前所有被选的值的数组。
 */
const selectedValues = computed(() => {
  return tabs.value.map((tab: CascaderTab) => (tab.selectedOption ? tab.selectedOption[props.valueKey] : undefined)).filter(isDef)
})

/**
 * 当前所有被选的选项对象的数组。
 */
const selectedOptions = computed(() => {
  return tabs.value.map((tab: CascaderTab) => tab.selectedOption).filter(Boolean) as CascaderOption[]
})

// props.options 变更时同步 innerOptions 并重建静态 tabs
watch(
  () => props.options,
  (newOptions) => {
    innerOptions.value = newOptions as CascaderOption[]
    if (!props.lazyLoad) {
      buildTabs()
    }
  },
  { deep: true }
)

// modelValue 变更：静态模式直接重建；异步模式仅在有 findPath 时重建以支持回显
watch(
  () => props.modelValue,
  () => {
    if (!props.lazyLoad) {
      buildTabs()
    } else if (isDef(props.modelValue) && props.modelValue !== '' && props.findPath) {
      buildTabs()
    }
  },
  { immediate: true }
)

watch(
  () => props.beforeConfirm,
  (fn) => {
    if (fn && !isFunction(fn)) {
      console.error('The type of beforeConfirm must be Function')
    }
  },
  { immediate: true }
)

watch(
  () => props.lazyLoad,
  (fn) => {
    if (fn && !isFunction(fn)) {
      console.error('The type of lazyLoad must be Function')
    }
  },
  { immediate: true }
)

watch(
  () => props.findPath,
  (fn) => {
    if (fn && !isFunction(fn)) {
      console.error('The type of findPath must be Function')
    }
  },
  { immediate: true }
)

watch(
  () => props.visible,
  (val) => {
    if (val) {
      showPicker()
    } else {
      close()
    }
  },
  { immediate: true }
)

watch(pickerShow, (val) => {
  emit('update:visible', val)
})

/**
 * 打开级联选择器弹窗。
 */
function open() {
  showPicker()
}

/**
 * 关闭级联选择器弹窗。
 */
function close() {
  pickerShow.value = false
  handlePickerClose()
}

function handleEnter() {
  tabsRef.value?.updateLineStyle()
}

function handleLeave() {
  tabsRef.value?.updateLineStyle()
}

function handleAfterEnter() {
  inited.value = true
  tabsRef.value?.updateLineStyle()
}

function handlePickerClose() {
  emit('close')
}

function handleAfterLeave() {
  if (props.lazyLoad) {
    // 仅在有 findPath 且 modelValue 有值时重建回显路径
    // 无 findPath 时保留 tabs，showPicker 会在 tabs 为空时重新加载根节点
    if (props.findPath && isDef(props.modelValue) && props.modelValue !== '') {
      buildTabs()
    }
  } else {
    buildTabs()
  }
}

function showPicker() {
  pickerShow.value = true
  // 异步模式：弹窗打开时，若 tabs 为空则按需加载根节点
  if (props.lazyLoad && !tabs.value.length) {
    tabs.value = [{ options: [], selectedOption: null }]
    loadingTabs.value = [0]
    props.lazyLoad(null, 0, (children) => {
      tabs.value = [{ options: children, selectedOption: null }]
      loadingTabs.value = loadingTabs.value.filter((i) => i !== 0)
    })
  }
}

/**
 * 选择某一列中的一项。
 * @param tabIndex 当前点击的列下标
 * @param index 当前点击的项下标
 */
function chooseItem(tabIndex: number, index: number) {
  const currentTab = tabs.value[tabIndex]
  const item = currentTab.options[index]

  if (item.disabled) return

  // 设置选中状态
  currentTab.selectedOption = item

  const { childrenKey, lazyLoad, isLeafKey } = props

  // 显式标识为叶子节点，直接触发 confirm
  if (item[isLeafKey] === true) {
    tabs.value = tabs.value.slice(0, tabIndex + 1)
    handleFinish()
    return
  }

  if (lazyLoad) {
    // 异步模式：追加占位 tab 并触发加载
    const nextTabIndex = tabIndex + 1
    const nextTabs = tabs.value.slice(0, tabIndex + 1)
    nextTabs.push({ options: [], selectedOption: null })
    tabs.value = nextTabs
    loadingTabs.value = [...loadingTabs.value, nextTabIndex]
    nextTick(() => {
      activeTab.value = nextTabIndex
    })
    ;(lazyLoad as CascaderLazyLoad)(item, nextTabIndex, (children) => {
      loadingTabs.value = loadingTabs.value.filter((i) => i !== nextTabIndex)
      if (children.length === 0) {
        // 返回空数组，视为叶子节点
        tabs.value = tabs.value.slice(0, tabIndex + 1)
        handleFinish()
      } else {
        if (tabs.value[nextTabIndex]) {
          tabs.value[nextTabIndex].options = children
        }
      }
    })
    return
  }

  // 静态模式：检查 children
  if (item[childrenKey] && item[childrenKey].length > 0) {
    const nextTabs = tabs.value.slice(0, tabIndex + 1)
    nextTabs.push({
      options: item[childrenKey],
      selectedOption: null
    })
    tabs.value = nextTabs
    nextTick(() => {
      activeTab.value = tabIndex + 1
    })
  } else {
    tabs.value = tabs.value.slice(0, tabIndex + 1)
    handleFinish()
  }
}

/**
 * 处理确认逻辑，包含 beforeConfirm 校验。
 */
function handleFinish() {
  const { beforeConfirm } = props
  const values = selectedValues.value
  const options = selectedOptions.value
  const finalValue = values.length > 0 ? values[values.length - 1] : ''

  if (beforeConfirm) {
    beforeConfirm(finalValue, options, (isPass: boolean) => {
      if (isPass) {
        onConfirm(values, options)
      }
    })
  } else {
    onConfirm(values, options)
  }
}

/**
 * 最终确认并发出 confirm 事件。
 */
function onConfirm(selectedValues: (string | number)[], selectedOptions: CascaderOption[]) {
  pickerShow.value = false
  const finalValue = selectedValues.length > 0 ? selectedValues[selectedValues.length - 1] : ''
  tabsRef.value?.updateLineStyle()
  emit('update:modelValue', finalValue)
  emit('confirm', {
    value: finalValue,
    selectedOptions
  })
}

/**
 * Tabs 导航项点击回调，用于切换当前显示的列。
 */
function handleTabClick({ name }: { name: number }) {
  activeTab.value = name
}

defineExpose<CascaderExpose>({
  close,
  open
})
</script>

<style lang="scss">
@use './index.scss';
</style>
