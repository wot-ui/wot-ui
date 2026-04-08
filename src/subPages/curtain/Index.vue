<template>
  <page-wraper>
    <view class="page-curtain">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-button @click="handleClick(1)">{{ $t('guan-bi-an-niu-zai-nei-bu') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('xiu-gai-an-niu-wei-zhi')">
          <wd-button @click="handleClick(2)">{{ $t('zuo-shang') }}</wd-button>
          <wd-button @click="handleClick(3)">{{ $t('ding-bu') }}</wd-button>
          <wd-button @click="handleClick(4)">{{ $t('you-shang') }}</wd-button>
          <wd-button @click="handleClick(5)">{{ $t('zuo-xia') }}</wd-button>
          <wd-button @click="handleClick(6)">{{ $t('di-bu') }}</wd-button>
          <wd-button @click="handleClick(7)">{{ $t('you-xia') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('dian-ji-zhe-zhao-guan-bi')">
          <wd-button @click="handleClick(8)">{{ $t('dian-ji-zhe-zhao-guan-bi-0') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('zi-ding-yi-guan-bi-an-niu')">
          <wd-button @click="handleClick(9)">{{ $t('zi-ding-yi-guan-bi-an-niu-0') }}</wd-button>
        </demo-group-item>
      </demo-group>
    </view>

    <wd-curtain v-model="value[1]" :src="img" :to="link" :width="280"></wd-curtain>
    <wd-curtain v-model="value[2]" :src="img" :to="link" close-position="top-left" :width="280"></wd-curtain>
    <wd-curtain v-model="value[3]" :src="img" :to="link" close-position="top" :width="280"></wd-curtain>
    <wd-curtain v-model="value[4]" :src="img" :to="link" close-position="top-right" :width="280"></wd-curtain>
    <wd-curtain v-model="value[5]" :src="img" :to="link" close-position="bottom-left" :width="280"></wd-curtain>
    <wd-curtain v-model="value[6]" :src="img" :to="link" close-position="bottom" :width="280"></wd-curtain>
    <wd-curtain v-model="value[7]" :src="img" :to="link" close-position="bottom-right" :width="280"></wd-curtain>
    <wd-curtain v-model="value[8]" :src="img" :to="link" close-position="bottom-right" :width="280" :close-on-click-modal="true"></wd-curtain>
    <wd-curtain v-model="value[9]" :src="img" :width="280">
      <template #close>
        <view class="custom-close" @click="handleClose(9)">{{ $t('guan-bi') }}</view>
      </template>
    </wd-curtain>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import blackMao from '../img/black_mao_1.png'

const img = blackMao
const link = ref<string>('/pages/index/index')

const value = ref<Record<number, boolean>>({
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false
})

function handleClick(index: number) {
  value.value[index] = true
}

function handleClose(index: number) {
  value.value[index] = false
}
</script>

<style lang="scss" scoped>
.page-curtain {
  :deep(.wd-button) {
    margin: 0 10px 10px 0;
  }
}
.custom-close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ffffff;
  font-size: 32rpx;
}
</style>
