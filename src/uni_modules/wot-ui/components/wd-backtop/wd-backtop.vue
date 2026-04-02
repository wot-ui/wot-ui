<template>
  <wd-transition :show="show" name="fade">
    <view
      :class="`wd-backtop ${customClass} is-${shape}`"
      :style="`z-index: ${zIndex}; bottom: ${bottom}px; right: ${right}px; ${customStyle}`"
      @click="handleBacktop"
    >
      <slot>
        <view class="wd-backtop__content">
          <wd-icon custom-class="wd-backtop__backicon" name="to-top" :custom-style="iconStyle" />
          <text class="wd-backtop__text" v-if="text">{{ text }}</text>
        </view>
      </slot>
    </view>
  </wd-transition>
</template>

<script lang="ts">
export default {
  name: 'wd-backtop',
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
import wdTransition from '../wd-transition/wd-transition.vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed } from 'vue'
import { backtopProps } from './types'

const props = defineProps(backtopProps)

/**
 * 是否显示回到顶部按钮
 */
const show = computed(() => props.scrollTop > props.top)

/**
 * 处理点击回到顶部
 */
function handleBacktop() {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: props.duration
  })
}
</script>

<style lang="scss">
@use './index.scss';
</style>
