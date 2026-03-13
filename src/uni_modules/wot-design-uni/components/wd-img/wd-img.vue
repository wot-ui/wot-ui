<template>
  <view :class="rootClass" @click="handleClick" :style="rootStyle">
    <image
      v-if="status !== 'error'"
      :class="`wd-img__image ${customImage}`"
      :src="src"
      :mode="mode"
      :show-menu-by-longpress="showMenuByLongpress"
      :lazy-load="lazyLoad"
      @load="handleLoad"
      @error="handleError"
    />
    <view v-if="status === 'loading' && showLoading" class="wd-img__loading">
      <slot name="loading">
        <wd-icon name="image" custom-class="wd-img__loading-icon" />
      </slot>
    </view>
    <view v-if="status === 'error' && showError" class="wd-img__error">
      <slot name="error">
        <wd-icon name="image-failloading" custom-class="wd-img__error-icon" />
      </slot>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-img',
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
import { computed, ref } from 'vue'
import { addUnit, isDef, objToStyle } from '../common/util'
import { imgProps } from './types'

const props = defineProps(imgProps)
const emit = defineEmits<{
  (e: 'error', event: Event): void
  (e: 'click', event: MouseEvent): void
  (e: 'load', event: Event): void
}>()

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (isDef(props.height)) {
    style['height'] = addUnit(props.height)
  }
  if (isDef(props.width)) {
    style['width'] = addUnit(props.width)
  }
  if (isDef(props.radius)) {
    style['border-radius'] = addUnit(props.radius)
    style['overflow'] = 'hidden'
  }
  return `${objToStyle(style)}${props.customStyle}`
})

const rootClass = computed(() => {
  return `wd-img  ${props.round ? 'is-round' : ''} ${props.customClass}`
})

const status = ref<'loading' | 'error' | 'success'>('loading')

function handleError(event: any) {
  status.value = 'error'
  emit('error', event)
}
function handleClick(event: MouseEvent) {
  if (props.enablePreview && props.src && status.value == 'success') {
    uni.previewImage({
      urls: [props.previewSrc || props.src]
    })
  }
  emit('click', event)
}
function handleLoad(event: any) {
  status.value = 'success'
  emit('load', event)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
