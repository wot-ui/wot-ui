<template>
  <view :class="`wd-navbar-capsule ${customClass}`" :style="customStyle">
    <wd-icon @click="handleBack" name="left" custom-class="wd-navbar-capsule__icon" />
    <wd-icon @click="handleBackHome" name="home" custom-class="wd-navbar-capsule__icon" />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-navbar-capsule',
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
import wdIcon from '../wd-icon/wd-icon.vue'
import { navbarCapsuleProps } from './types'

/**
 * 事件发送器
 */
const emit = defineEmits(['back', 'back-home'])

defineProps(navbarCapsuleProps)

/**
 * 处理返回事件
 */
function handleBack() {
  emit('back')
}

/**
 * 处理返回首页事件
 */
function handleBackHome() {
  emit('back-home')
}
</script>

<style lang="scss">
@use './index.scss';
</style>
