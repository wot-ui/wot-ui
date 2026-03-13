<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-img :width="100" :height="100" :src="imgURL" />
    </demo-block>

    <demo-block title="加载中提示">
      <view class="col">
        <wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg" />
        <view class="center">默认提示</view>
      </view>
      <view class="col">
        <wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg">
          <template #loading>
            <wd-loading />
          </template>
        </wd-img>
        <view class="center">自定义提示</view>
      </view>
    </demo-block>

    <demo-block title="加载失败提示">
      <view class="col">
        <wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg" />
        <view class="center">默认提示</view>
      </view>
      <view class="col">
        <wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg">
          <template #error>
            <view class="error-wrap">加载失败</view>
          </template>
        </wd-img>
        <view class="center">自定义提示</view>
      </view>
    </demo-block>

    <demo-block :title="$t('tian-chong')">
      <view class="col" v-for="(mode, index) in modes" :key="index">
        <wd-img width="100%" height="27vw" :src="imgURL" :mode="mode" />
        <view class="center">{{ mode }}</view>
      </view>
    </demo-block>
    <demo-block :title="$t('yuan-xing')">
      <view class="col" v-for="(mode, index) in modes" :key="index">
        <wd-img round width="100%" height="27vw" :src="imgURL" :mode="mode" />
        <view class="center">{{ mode }}</view>
      </view>
    </demo-block>
    <demo-block :title="$t('yuan-jiao')">
      <view class="col" v-for="(mode, index) in modes" :key="index">
        <wd-img width="100%" height="27vw" :radius="5" :src="imgURL" :mode="mode" />
        <view class="center">{{ mode }}</view>
      </view>
    </demo-block>

    <demo-block :title="$t('ke-yu-lan')">
      <view class="col">
        <wd-img :width="100" :height="100" :src="imgURL" :enable-preview="true" />
      </view>
      <view class="col">
        <wd-img :width="100" :height="100" :src="imgURL" :preview-src="imgURL" :enable-preview="true" />
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { ImageMode } from '@/uni_modules/wot-design-uni/components/wd-img/types'
// 小黑毛
import blackMao from './black_mao.png'

const imgURL = blackMao

const modes: ImageMode[] = [
  'top left',
  'top right',
  'bottom left',
  'bottom right',
  'right',
  'left',
  'center',
  'bottom',
  'top',
  'heightFix',
  'widthFix',
  'scaleToFill',
  'aspectFit',
  'aspectFill'
]
</script>

<style lang="scss" scoped>
.col {
  display: inline-block;
  width: 33.333%;
  box-sizing: border-box;
  min-height: 1px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;
}
.center {
  text-align: center;
}
:deep(.border) {
  border: 1px solid red;
  margin: 0 10px;
}

.error-wrap {
  width: 100%;
  height: 100%;
  background-color: red;
  color: white;
  line-height: 100px;
  text-align: center;
}

.loading-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
