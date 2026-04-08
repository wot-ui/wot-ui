<template>
  <page-wraper>
    <view class="page-sort-button">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ji-chu-yong-fa-0')">
          <wd-sort-button v-model="value1" :title="$t('jia-ge')" @change="handleChange1" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('she-zhi-allowreset-yun-xu-zhong-zhi-an-niu')">
          <wd-sort-button v-model="value2" :title="$t('jia-ge-0')" allow-reset @change="handleChange2" />
        </demo-group-item>
        <demo-group-item :title="$t('she-zhi-descfirst-you-xian-qie-huan-wei-jiang-xu')">
          <wd-sort-button v-model="value3" :title="$t('jia-ge-1')" desc-first @change="handleChange3" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('xian-shi-xia-hua-xian')">
          <wd-sort-button v-model="value4" :title="$t('jia-ge-2')" line @change="handleChange4" />
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<number>(0)
const value2 = ref<number>(0)
const value3 = ref<number>(0)
const value4 = ref<number>(0)

function handleChange1({ value }: any) {
  console.log(value)
}
function handleChange2({ value }: any) {
  console.log(value)
}
function handleChange3({ value }: any) {
  console.log(value)
}
function handleChange4({ value }: any) {
  console.log(value)
}
</script>
<style lang="scss" scoped></style>
