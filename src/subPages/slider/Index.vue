<template>
  <page-wraper>
    <demo-block :title="$t('ji-chu-yong-fa-0')">
      <wd-slider v-model="value1" />
    </demo-block>

    <demo-block title="显示极值">
      <wd-slider v-model="value3" show-extreme-value />
    </demo-block>

    <demo-block :title="$t('shuang-xiang-hua-kuai')">
      <wd-slider v-model="value4" range />
    </demo-block>

    <demo-block title="管道样式">
      <wd-slider v-model="value6" theme="capsule" />
    </demo-block>

    <demo-block :title="$t('zhi-ding-bu-chang')">
      <wd-slider v-model="value9" :step="10" />
    </demo-block>

    <demo-block :title="$t('zhi-ding-xuan-ze-fan-wei')">
      <wd-slider v-model="value10" :min="-10" :max="10" show-extreme-value />
    </demo-block>

    <demo-block title="刻度标记">
      <wd-slider v-model="value11" :marks="marks1" :step="25" />
    </demo-block>

    <demo-block title="刻度标记（管道）">
      <wd-slider v-model="value12" :marks="marks1" :step="25" theme="capsule" />
    </demo-block>

    <demo-block :title="$t('jin-yong-zhuang-tai')">
      <wd-slider v-model="value13" disabled />
    </demo-block>

    <demo-block title="垂直方向">
      <view class="vertical-demo">
        <wd-slider v-model="value14" vertical />
        <wd-slider v-model="value16" vertical show-extreme-value />
        <wd-slider v-model="value17" vertical range />
        <wd-slider v-model="value19" vertical :marks="marks1" :step="25" />
      </view>
    </demo-block>

    <demo-block title="垂直 + 管道">
      <view class="vertical-demo">
        <wd-slider v-model="value18" vertical theme="capsule" />
        <wd-slider v-model="value20b" vertical theme="capsule" range show-extreme-value />
        <wd-slider v-model="value21" vertical theme="capsule" :marks="marks1" :step="25" />
      </view>
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 基础用法
const value1 = ref<number>(30)

const value3 = ref<number>(25)

// 双向滑块
const value4 = ref<number[]>([20, 60])

// 管道样式
const value6 = ref<number>(65)

// 步长
const value9 = ref<number>(30)

// 范围
const value10 = ref<number>(5)

// 刻度标记
const marks1 = [0, 25, 50, 75, 100]
const value11 = ref<number>(50)
const value12 = ref<number>(50)
const value19 = ref<number>(50)
const value21 = ref<number>(50)

// 禁用
const value13 = ref<number>(70)

// 垂直方向
const value14 = ref<number>(30)
const value16 = ref<number>(25)
const value17 = ref<number[]>([20, 60])

// 垂直 + 管道
const value18 = ref<number>(65)
const value20b = ref<number[]>([20, 60])
</script>

<style lang="scss" scoped>
.vertical-demo {
  display: flex;
  gap: 40px;
  align-items: stretch;
  padding: 20px;
  height: 250px;
}
</style>
