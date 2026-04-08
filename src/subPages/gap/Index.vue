<template>
  <page-wraper>
    <view class="page-gap">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ji-ben-shi-yong')">
          <wd-gap bg-color="red"></wd-gap>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('zi-ding-yi-bei-jing-yan-se')">
          <wd-gap bg-color="#4D80F0"></wd-gap>
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-gao-du')">
          <wd-gap bg-color="#4D80F0" height="120rpx"></wd-gap>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('ziDingYiYangShi')">
          <wd-gap custom-class="custom-gap"></wd-gap>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item custom-class="custom-safe-area-bottom" :title="$t('di-bu-an-quan-qu')">
          <wd-gap bg-color="#FFFFFF" safe-area-bottom height="120rpx"></wd-gap>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
:deep(.custom-safe-area-bottom) {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
:deep(.custom-gap) {
  padding-bottom: 120rpx;
  background: #34d19d !important;
}
</style>
