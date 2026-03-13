<template>
  <wd-transition
    :show="show"
    name="fade"
    :custom-class="`wd-overlay ${customClass}`"
    :duration="duration"
    :custom-style="`z-index: ${zIndex}; ${customStyle}`"
    :disable-touch-move="lockScroll"
    @before-enter="emit('before-enter')"
    @enter="emit('enter')"
    @after-enter="emit('after-enter')"
    @before-leave="emit('before-leave')"
    @leave="emit('leave')"
    @after-leave="emit('after-leave')"
    @click="handleClick"
  >
    <slot></slot>
  </wd-transition>
</template>
<script lang="ts">
export default {
  name: 'wd-overlay',
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
import wdTransition from '../wd-transition/wd-transition.vue'
import { overlayProps } from './types'
// #ifdef H5
import { useLockScroll } from '../composables/useLockScroll'
// #endif

const props = defineProps(overlayProps)

const emit = defineEmits(['click', 'before-enter', 'enter', 'after-enter', 'before-leave', 'leave', 'after-leave'])

function handleClick() {
  emit('click')
}

// #ifdef H5
useLockScroll(() => props.show && props.lockScroll)
// #endif
</script>

<style lang="scss">
@use './index.scss';
</style>
