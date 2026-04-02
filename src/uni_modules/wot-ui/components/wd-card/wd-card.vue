<template>
  <view :class="`wd-card ${type ? `wd-card--${type}` : ''} ${customClass}`" :style="customStyle">
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

defineProps(cardProps)
</script>

<style lang="scss">
@use './index.scss';
</style>
