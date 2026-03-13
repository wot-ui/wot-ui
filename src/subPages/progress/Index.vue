<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-progress :percentage="percentage" />
    </demo-block>

    <demo-block title="内置百分比 (Inner)">
      <wd-progress :percent-position="{ type: 'inner', align: 'center' }" :percentage="percentage" />
      <view style="height: 10px"></view>
      <wd-progress :percent-position="{ type: 'inner', align: 'right' }" :percentage="percentage" status="success" />
      <view style="height: 10px"></view>
      <wd-progress :percent-position="{ type: 'inner', align: 'left' }" :percentage="percentage" status="danger" />
      <view style="height: 10px"></view>
      <wd-progress :percent-position="{ type: 'inner', align: 'center' }" :percentage="0" />
    </demo-block>

    <demo-block :title="$t('bu-xian-shi-jin-du-wen-zi')">
      <wd-progress :percentage="percentage" hide-text />
    </demo-block>

    <demo-block :title="$t('jin-du-tiao-zhuang-tai')">
      <wd-progress :percentage="percentage" status="success" hide-text />
      <view style="height: 10px"></view>
      <wd-progress :percentage="percentage" status="danger" hide-text />
      <view style="height: 10px"></view>
      <wd-progress :percentage="percentage" status="warning" hide-text />
    </demo-block>

    <demo-block :title="$t('xiu-gai-yan-se')">
      <wd-progress :percentage="percentage" color="var(--wot-color-theme, #0083ff)" />
      <view style="height: 10px"></view>
      <wd-progress :percentage="percentage" color="var(--wot-purple-6, #8059F3)" />
      <view style="height: 10px"></view>
      <wd-progress :percentage="percentage" color="var(--wot-pink-6, #FF357C)" />
    </demo-block>

    <demo-block :title="$t('yan-se-shu-zu')">
      <wd-progress :percentage="percentage" :color="['#00c740', '#ffb300', '#e2231a', '#0083ff']" />
      <view style="height: 10px"></view>
      <wd-progress :percentage="percentage" :color="colorObject" />
    </demo-block>

    <view class="action-container">
      <wd-button custom-style="margin-right: 10px;" @click="reduce" type="danger" size="small">-10</wd-button>
      <wd-button @click="add" type="success" size="small">+10</wd-button>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { ProgressColor } from '@/uni_modules/wot-design-uni/components/wd-progress/types'
import { ref } from 'vue'

// 动态进度 变量
const percentage = ref<number>(50)

// 动态变量加10
const add = () => {
  percentage.value = Math.min(percentage.value + 10, 100)
}

// 动态变量减10
const reduce = () => {
  percentage.value = Math.max(percentage.value - 10, 0)
}

const colorObject = ref<ProgressColor[]>([
  {
    color: 'yellow',
    percentage: 30
  },
  {
    color: 'red',
    percentage: 60
  },
  {
    color: 'blue',
    percentage: 80
  },
  {
    color: 'black',
    percentage: 90
  }
])
</script>
<style lang="scss" scoped>
.action-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 30px;
}
</style>
