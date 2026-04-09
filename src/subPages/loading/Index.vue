<template>
  <page-wraper>
    <view class="page-loading">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('lei-xing')">
          <view class="page-loading__row">
            <wd-loading custom-class="page-loading__indicator" />
            <wd-loading custom-class="page-loading__indicator" type="spinner" />
            <wd-loading custom-class="page-loading__indicator" type="dots" />
            <wd-loading custom-class="page-loading__indicator" type="wave" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('yanSe')">
          <view class="page-loading__row">
            <wd-loading custom-class="page-loading__indicator" color="var(--wot-pink-6)" />
            <wd-loading custom-class="page-loading__indicator" type="spinner" color="var(--wot-pink-6)" />
            <wd-loading custom-class="page-loading__indicator" type="dots" color="var(--wot-pink-6)" />
            <wd-loading custom-class="page-loading__indicator" type="wave" color="var(--wot-pink-6)" />
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('da-xiao')">
          <view class="page-loading__row">
            <wd-loading custom-class="page-loading__indicator" :size="20" />
            <wd-loading custom-class="page-loading__indicator" type="spinner" :size="20" />
            <wd-loading custom-class="page-loading__indicator" type="dots" :size="20" />
            <wd-loading custom-class="page-loading__indicator" type="wave" :size="20" />
          </view>
          <view class="page-loading__row">
            <wd-loading custom-class="page-loading__indicator" :size="30" />
            <wd-loading custom-class="page-loading__indicator" type="spinner" :size="30" />
            <wd-loading custom-class="page-loading__indicator" type="dots" :size="30" />
            <wd-loading custom-class="page-loading__indicator" type="wave" :size="30" />
          </view>
          <view class="page-loading__row">
            <wd-loading custom-class="page-loading__indicator" size="50px" />
            <wd-loading custom-class="page-loading__indicator" type="spinner" size="50px" />
            <wd-loading custom-class="page-loading__indicator" type="dots" size="50px" />
            <wd-loading custom-class="page-loading__indicator" type="wave" size="50px" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('nei-rong-xing-tai')">
        <demo-group-item :title="$t('xian-shi-wen-zi')">
          <view class="page-loading__row">
            <wd-loading custom-class="page-loading__indicator" :text="$t('jia-zai-zhong')"></wd-loading>
            <wd-loading custom-class="page-loading__indicator">{{ $t('jia-zai-zhong') }}</wd-loading>
            <wd-loading custom-class="page-loading__indicator" type="spinner">{{ $t('jia-zai-zhong') }}</wd-loading>
            <wd-loading custom-class="page-loading__indicator" type="wave">{{ $t('jia-zai-zhong') }}</wd-loading>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('shui-ping-fang-xiang')">
          <view class="page-loading__row">
            <wd-loading custom-class="page-loading__indicator" direction="horizontal" :text="$t('jia-zai-zhong')"></wd-loading>
            <wd-loading custom-class="page-loading__indicator" direction="horizontal">{{ $t('jia-zai-zhong') }}</wd-loading>
            <wd-loading custom-class="page-loading__indicator" direction="horizontal" type="spinner">{{ $t('jia-zai-zhong') }}</wd-loading>
            <wd-loading custom-class="page-loading__indicator" direction="horizontal" type="wave">{{ $t('jia-zai-zhong') }}</wd-loading>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.page-loading {
  &__row {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-loose;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(.page-loading__indicator) {
    margin-right: $spacing-super-loose;
  }
}
</style>
