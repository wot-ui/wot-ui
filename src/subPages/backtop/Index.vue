<template>
  <page-wraper>
    <view class="page-backtop">
      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('xing-zhuang-yu-wen-zi')">
          <view class="option-list">
            <wd-checkbox shape="square" size="large" v-model="isSquare">{{ $t('xianShiFangXing') }}</wd-checkbox>
            <wd-checkbox shape="square" size="large" v-model="isText">{{ $t('xian-shi-wen-zi') }}</wd-checkbox>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('ziDingYiTuBiao')">
          <view class="option-list">
            <wd-checkbox shape="square" size="large" v-model="isCustomIcon">{{ $t('ziDingYiTuBiao') }}</wd-checkbox>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('ziDingYiJuLi')">
          <view class="option-list">
            <wd-checkbox shape="square" size="large" v-model="isTop">{{ $t('ziDingYiJuLi') }}</wd-checkbox>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('ziDingYiYangShi')">
          <view class="option-list">
            <wd-checkbox shape="square" size="large" v-model="isStyle">{{ $t('ziDingYiYangShi') }}</wd-checkbox>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('ziDingYiFanHuiDingBuGunDongShiJian')">
          <view class="option-list">
            <wd-checkbox shape="square" size="large" v-model="isDuration">{{ $t('ziDingYiFanHuiDingBuGunDongShiJian') }}</wd-checkbox>
          </view>
        </demo-group-item>
      </demo-group>

      <view class="page-backtop__spacer"></view>

      <wd-backtop
        v-if="isCustomIcon"
        :scrollTop="scrollTop"
        :shape="isSquare ? 'square' : undefined"
        :top="isTop ? 600 : undefined"
        :custom-style="isStyle ? 'background: #007aff;color:white;' : undefined"
        :duration="isDuration ? 1000 : undefined"
        :text="isText ? 'TOP' : undefined"
      >
        <text :class="['custom-backtop-icon', { 'is-custom-style': isStyle }]">TOP</text>
      </wd-backtop>
      <wd-backtop
        v-else
        :scrollTop="scrollTop"
        :shape="isSquare ? 'square' : undefined"
        :top="isTop ? 600 : undefined"
        :custom-style="isStyle ? 'background: #007aff;color:white;' : undefined"
        :duration="isDuration ? 1000 : undefined"
        :text="isText ? 'TOP' : undefined"
      ></wd-backtop>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { onPageScroll } from '@dcloudio/uni-app'
import { ref } from 'vue'

const scrollTop = ref(0)
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})

const isSquare = ref(false)
const isCustomIcon = ref(false)
const isTop = ref(false)
const isStyle = ref(false)
const isDuration = ref(false)
const isText = ref(false)
</script>
<style lang="scss" scoped>
.option-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.page-backtop__spacer {
  height: 2000px;
}

.custom-backtop-icon {
  color: #333;
}

.is-custom-style {
  color: #fff;
}
</style>
