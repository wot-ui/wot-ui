<template>
  <template v-if="showControls">
    <view class="wd-swiper-nav__btn wd-swiper-nav__btn--prev" @click="handleNav('prev')">
      <wd-icon name="left" custom-class="wd-swiper-nav__btn-icon"></wd-icon>
    </view>
    <view class="wd-swiper-nav__btn wd-swiper-nav__btn--next" @click="handleNav('next')">
      <wd-icon name="right" custom-class="wd-swiper-nav__btn-icon"></wd-icon>
    </view>
  </template>
  <view
    v-if="total >= minShowNum"
    :style="customStyle"
    :class="`wd-swiper-nav wd-swiper-nav--${direction} wd-swiper-nav--${type} wd-swiper-nav--${indicatorPosition} ${customClass}`"
  >
    <block v-if="type === 'dots' || type === 'dots-bar'">
      <view
        v-for="(_, index) in total"
        :key="index"
        :class="`wd-swiper-nav__item--${type} ${current === index ? 'is-active' : ''} is-${direction}`"
      ></view>
    </block>
    <block v-if="type === 'fraction'">{{ current + 1 }}/{{ total }}</block>
  </view>
</template>

<script lang="ts" setup>
import { swiperNavprops } from './types'
import wdIcon from '../wd-icon/wd-icon.vue'

defineProps(swiperNavprops)

const emit = defineEmits(['change'])

function handleNav(dir: 'prev' | 'next') {
  const source: string = 'nav'
  emit('change', { dir, source })
}
</script>

<style lang="scss">
@use './index.scss';
</style>
