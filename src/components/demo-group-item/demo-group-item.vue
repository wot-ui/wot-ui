<template>
  <view :class="['demo-group-item', customClass, noPadding ? 'is-no-padding' : '']">
    <view class="demo-group-item__title">{{ title }}</view>
    <view class="demo-group-item__container">
      <slot />
    </view>
  </view>
</template>
<script lang="ts">
export default {
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
interface Props {
  customClass?: string
  title?: string
  noPadding?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  customClass: '',
  noPadding: false
})
</script>
<style lang="scss" scoped>
.demo-group-item {
  position: relative;

  &__title {
    padding: $padding-main $padding-loose;
    font-size: $typography-body-size-main;
    font-weight: $font-weight-medium;
    color: $text-main;
    line-height: $typography-body-line-height-size-main;
  }

  &__container {
    padding: $padding-zero $padding-loose;
  }

  &.is-no-padding {
    .demo-group-item__container {
      padding: 0;
    }
  }
}
</style>
