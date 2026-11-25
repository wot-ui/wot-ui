<template>
  <view :class="`wd-card ${type ? `wd-card--${type}` : ''} ${customClass}`" :style="customStyle" @click="handleClick">
    <view :class="`wd-card__title ${customTitleClass}`" v-if="title || $slots.title">
      <slot name="title">
        <text class="wd-card__title-text" v-if="title">{{ title }}</text>
      </slot>
    </view>
    <view :class="`wd-card__content ${customContentClass}`">
      <slot></slot>
    </view>
    <view :class="`wd-card__footer ${customFooterClass}`" v-if="$slots.footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-card',
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
import { cardProps } from './types'

const emit = defineEmits(['click'])

defineProps(cardProps)

/**
 * 卡片点击事件
 * 小程序端自定义组件不会透传原生点击事件，需在根节点监听并主动抛出
 */
function handleClick() {
  emit('click')
}
</script>

<style lang="scss">
@use './index.scss';
</style>
