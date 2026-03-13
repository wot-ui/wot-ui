<!--
 * @Author: weisheng
 * @Date: 2025-12-18 14:30:46
 * @LastEditTime: 2026-02-10 16:59:28
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-tabbar/wd-tabbar.vue
 * 记得注释
-->
<template>
  <view :class="{ 'wd-tabbar__placeholder': fixed && placeholder && safeAreaInsetBottom && shape === 'round' }" :style="{ height: addUnit(height) }">
    <view
      :class="`wd-tabbar wd-tabbar--${shape} ${customClass} ${fixed ? 'is-fixed' : ''} ${safeAreaInsetBottom ? 'is-safe' : ''} ${
        bordered ? 'is-border' : ''
      }`"
      :style="rootStyle"
    >
      <slot></slot>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-tabbar',
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
import { getCurrentInstance, onMounted, ref, watch, nextTick, computed, type CSSProperties } from 'vue'
import type { TabbarItem } from '../wd-tabbar-item/types'
import { addUnit, getRect, isDef, objToStyle } from '../common/util'
import { useChildren } from '../composables/useChildren'
import { TABBAR_KEY, tabbarProps } from './types'
import { callInterceptor } from '../common/interceptor'

const props = defineProps(tabbarProps)
const emit = defineEmits(['change', 'update:modelValue'])

const height = ref<number | string>('') // 占位高度
const { proxy } = getCurrentInstance() as any

const { linkChildren } = useChildren(TABBAR_KEY)

linkChildren({
  props,
  setChange
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.zIndex)) {
    style['z-index'] = props.zIndex
  }
  return `${objToStyle(style)}${props.customStyle}`
})

watch(
  [() => props.fixed, () => props.placeholder],
  () => {
    setPlaceholderHeight()
  },
  { deep: true, immediate: false }
)

onMounted(() => {
  if (props.fixed && props.placeholder) {
    nextTick(() => {
      setPlaceholderHeight()
    })
  }
})

/**
 * 子项状态变更
 * @param child 子项
 */
function setChange(child: TabbarItem) {
  let active = child.name
  if (active === props.modelValue) {
    return
  }
  const change = () => {
    emit('update:modelValue', active)
    emit('change', {
      value: active
    })
  }
  callInterceptor(props.beforeChange, { args: [active], done: change })
}

function setPlaceholderHeight() {
  if (!props.fixed || !props.placeholder) {
    return
  }

  getRect('.wd-tabbar', false, proxy).then((res) => {
    height.value = Number(res.height)
  })
}
</script>
<style lang="scss">
@use './index.scss';
</style>
