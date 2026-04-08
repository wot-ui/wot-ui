<template>
  <page-wraper>
    <view class="page-divider">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-divider></wd-divider>
        </demo-group-item>
        <demo-group-item :title="$t('zhan-shi-wen-ben')">
          <wd-divider>{{ $t('zhan-shi-wen-ben-0') }}</wd-divider>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('nei-rong-wei-zhi')">
          <wd-divider>{{ $t('zhong-jian') }}</wd-divider>
          <wd-divider content-position="left">{{ $t('zuo-ce') }}</wd-divider>
          <wd-divider content-position="right">{{ $t('you-ce') }}</wd-divider>
        </demo-group-item>
        <demo-group-item :title="$t('xu-xian')">
          <wd-divider dashed>{{ $t('xu-xian-fen-ge') }}</wd-divider>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('zi-ding-yi-xuan-ran-nei-rong')">
          <wd-divider>
            <wd-icon name="down" size="20" />
          </wd-divider>
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-yan-se')">
          <wd-divider color="#4D80F0">{{ $t('zi-ding-yi-yan-se-0') }}</wd-divider>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('chui-zhi-fen-ge-xian')">
          <view class="content">
            {{ $t('wen-ben') }}
            <wd-divider vertical />
            {{ $t('wen-ben') }}
            <wd-divider vertical dashed />
            {{ $t('wen-ben') }}
            <wd-divider vertical :hairline="false" />
            {{ $t('wen-ben') }}
            <wd-divider vertical color="#1989fa" />
            {{ $t('wen-ben') }}
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.page-divider {
  background: $filled-oppo;
  padding-bottom: $padding-loose;
}
</style>
