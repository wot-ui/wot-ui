<template>
  <page-wraper>
    <view class="page-loading">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('lei-xing')">
          <view class="demo-row">
            <wd-loading custom-class="loading" />
            <wd-loading custom-class="loading" type="spinner" />
            <wd-loading custom-class="loading" type="dots" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('yanSe')">
          <view class="demo-row">
            <wd-loading custom-class="loading" color="#fa34aa" />
            <wd-loading custom-class="loading" type="spinner" color="#fa34aa" />
            <wd-loading custom-class="loading" type="dots" color="#fa34aa" />
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('da-xiao')">
          <view class="demo-row">
            <wd-loading custom-class="loading" :size="20" />
            <wd-loading custom-class="loading" type="spinner" :size="20" />
            <wd-loading custom-class="loading" type="dots" :size="20" />
          </view>
          <view class="demo-row">
            <wd-loading custom-class="loading" :size="30" />
            <wd-loading custom-class="loading" type="spinner" :size="30" />
            <wd-loading custom-class="loading" type="dots" :size="30" />
          </view>
          <view class="demo-row">
            <wd-loading custom-class="loading" size="50px" />
            <wd-loading custom-class="loading" type="spinner" size="50px" />
            <wd-loading custom-class="loading" type="dots" size="50px" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('nei-rong-xing-tai')">
        <demo-group-item :title="$t('xian-shi-wen-zi')">
          <view class="demo-row">
            <wd-loading custom-class="loading" :text="$t('jia-zai-zhong')"></wd-loading>
            <wd-loading custom-class="loading">{{ $t('jia-zai-zhong') }}</wd-loading>
            <wd-loading custom-class="loading" type="spinner">{{ $t('jia-zai-zhong') }}</wd-loading>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('shui-ping-fang-xiang')">
          <view class="demo-row">
            <wd-loading custom-class="loading" direction="horizontal" :text="$t('jia-zai-zhong')"></wd-loading>
            <wd-loading custom-class="loading" direction="horizontal">{{ $t('jia-zai-zhong') }}</wd-loading>
            <wd-loading custom-class="loading" direction="horizontal" type="spinner">{{ $t('jia-zai-zhong') }}</wd-loading>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.page-loading {
  .demo-row {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(.loading) {
    margin-right: 20px;
  }
}
</style>
