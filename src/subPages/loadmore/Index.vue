<!--
 * @Author: weisheng
 * @Date: 2025-03-31 11:23:58
 * @LastEditTime: 2026-02-13 17:25:23
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/subPages/loadmore/Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <view class="container">
      <view v-for="index in num" :key="index" class="list-item">
        <image :src="blackMao" />
        <view class="right">{{ $t('zhe-shi-yi-tiao-ce-shi-index') + index + 1 }}</view>
      </view>
      <wd-loadmore :state="state" @reload="loadmore" />
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'
import blackMao from '../img/black_mao.png'

const state = ref<any>('loading')
const num = ref<number>(0)
const max = ref<number>(60)

onReachBottom(() => {
  if (num.value === 45) {
    state.value = 'error'
  } else if (num.value < max.value) {
    loadmore()
  } else if (num.value === max.value) {
    state.value = 'finished'
  }
})

onLoad(() => {
  loadmore()
})

function loadmore() {
  setTimeout(() => {
    num.value = num.value + 15
    state.value = 'loading'
  }, 200)
}
</script>
<style lang="scss" scoped>
.list-item {
  position: relative;
  display: flex;
  padding: $n10 $n15;
  background: $base-white;
  color: $coolgrey-8;
}

.list-item:after {
  position: absolute;
  display: block;
  content: '';
  height: $stroke-main;
  left: $n0;
  width: 100%;
  bottom: $n0;
  background: $neutralgrey-3;
  transform: scaleY(0.5);
}
image {
  display: block;
  width: 120px;
  height: 78px;
  margin-right: $n15;
}
.right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
</style>
