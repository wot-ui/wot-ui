<template>
  <view :class="['wd-loadmore', customClass]" :style="customStyle" @click="reload">
    <slot v-if="state === 'finished'" name="finished">
      <wd-divider custom-class="wd-loadmore__divider">{{ finishedText || translate('finished') }}</wd-divider>
    </slot>
    <slot v-else-if="state === 'error'" name="error">
      <text class="wd-loadmore__text">{{ errorText || translate('error') }}</text>
      <text class="wd-loadmore__refresh-text">{{ translate('retry') }}</text>
      <wd-icon name="refresh" custom-class="wd-loadmore__refresh" />
    </slot>
    <slot v-else-if="state === 'loading'" name="loading">
      <wd-loading v-bind="customLoadingProps" />
      <text class="wd-loadmore__text">{{ loadingText || translate('loading') }}</text>
    </slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-loadmore',
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
import wdDivider from '../wd-divider/wd-divider.vue'
import wdLoading from '../wd-loading/wd-loading.vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, ref } from 'vue'
import { useTranslate } from '../composables/useTranslate'
import { loadmoreProps, type LoadMoreState } from './types'
import type { LoadingProps } from '../wd-loading/types'
import { isDef, isUndefined, omitBy } from '../common/util'

// 计算 Loading 组件的属性 - 合并用户传入的属性和组件需要的自定义样式
const customLoadingProps = computed(() => {
  const loadingProps: Partial<LoadingProps> = isDef(props.loadingProps) ? omitBy(props.loadingProps, isUndefined) : {}
  loadingProps.customClass = `wd-loadmore__loading ${loadingProps.customClass || ''}`
  return loadingProps
})

const props = defineProps(loadmoreProps)
const emit = defineEmits(['reload'])

const { translate } = useTranslate('loadmore')

/** 当前加载状态 */
const currentState = ref<LoadMoreState | null>(null)

/**
 * 处理重新加载操作 - 当加载失败时，点击可触发 reload 事件
 */
function reload() {
  if (props.state !== 'error') return
  currentState.value = 'loading'
  emit('reload')
}
</script>

<style lang="scss">
@use './index.scss';
</style>
