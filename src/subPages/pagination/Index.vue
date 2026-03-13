<!--
 * @Author: weisheng
 * @Date: 2025-07-17 10:27:32
 * @LastEditTime: 2026-01-30 17:26:18
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/subPages/pagination/Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')" transparent>
      <wd-pagination v-model="page1" :total="total1" @change="handleChange1"></wd-pagination>
    </demo-block>
    <demo-block title="幽灵按钮" transparent>
      <wd-pagination v-model="page4" :total="total4" button-variant="plain" @change="handleChange4"></wd-pagination>
    </demo-block>
    <demo-block title="虚线边框" transparent>
      <wd-pagination v-model="page5" :total="total5" button-variant="dashed" @change="handleChange5"></wd-pagination>
    </demo-block>

    <demo-block title="基础按钮" transparent>
      <wd-pagination v-model="page6" :total="total6" button-variant="base" @change="handleChange6"></wd-pagination>
    </demo-block>
    <demo-block :title="$t('icon-tu-biao-0')" transparent>
      <wd-pagination v-model="page2" :total="total2" show-icon @change="handleChange2"></wd-pagination>
    </demo-block>
    <demo-block :title="$t('wen-zi-ti-shi')" transparent>
      <wd-pagination v-model="page3" :total="total3" :page-size="pageSize3" @change="handleChange3" show-icon show-message></wd-pagination>
    </demo-block>

    <demo-block title="Custom Slots (自定义插槽)" transparent>
      <wd-pagination v-model="page7" :total="total7" show-message @change="handleChange7">
        <template #prev="{ modelValue }">
          <wd-button :disabled="modelValue <= 1" @click="page7 -= 1" size="small" type="danger">上一页</wd-button>
        </template>
        <template #next="{ modelValue, totalPageNum }">
          <wd-button :disabled="modelValue >= totalPageNum" @click="page7 += 1" size="small" type="danger">下一页</wd-button>
        </template>
        <template #size="{ modelValue, totalPageNum }">
          <view class="custom-pagination__content">
            <text class="custom-pagination__page">{{ modelValue }}</text>
            <text class="custom-pagination__separator">/</text>
            <text class="custom-pagination__total">{{ totalPageNum }}</text>
          </view>
        </template>
        <template #message="{ total }">
          <view class="custom-pagination__message">当前第{{ page7 }}页，共{{ total }}条数据</view>
        </template>
      </wd-pagination>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const page1 = ref<number>(1)
const total1 = ref<number>(190)
const page2 = ref<number>(1)
const total2 = ref<number>(19)
const page3 = ref<number>(1)
const total3 = ref<number>(160)
const pageSize3 = ref<number>(20)

function handleChange1({ value }: any) {
  console.log(value)
}
function handleChange2({ value }: any) {
  console.log(value)
}
function handleChange3({ value }: any) {
  console.log(value)
}

const page4 = ref<number>(1)
const total4 = ref<number>(190)

function handleChange4({ value }: any) {
  console.log(value)
}

const page5 = ref<number>(1)
const total5 = ref<number>(190)

function handleChange5({ value }: any) {
  console.log(value)
}

const page6 = ref<number>(1)
const total6 = ref<number>(190)

function handleChange6({ value }: any) {
  console.log(value)
}

const page7 = ref<number>(1)
const total7 = ref<number>(190)

function handleChange7({ value }: any) {
  console.log(value)
}
</script>
<style lang="scss" scoped>
.button-block {
  margin-right: 0;
}
.custom-pagination__content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.custom-pagination__page {
  color: #f00;
}
.custom-pagination__separator {
  margin: 0 5px;
}
.custom-pagination__total {
  color: #00f;
}
.custom-pagination__message {
  margin-top: 10px;
  color: #999;
  text-align: center;
}
</style>
