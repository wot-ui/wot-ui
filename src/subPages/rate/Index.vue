<template>
  <page-wraper>
    <view class="page-rate">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-rate v-model="basicValue" @change="handleChange" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('zhi-du-zhuang-tai-readonly')">
          <wd-rate v-model="readonlyValue" readonly />
        </demo-group-item>
        <demo-group-item :title="$t('jin-yong-zhuang-tai')">
          <wd-rate v-model="disabledValue" disabled />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('xiu-gai-xuan-zhong-yan-se')">
          <view class="demo-row">
            <wd-rate
              v-model="colorValue"
              active-color="linear-gradient(180deg, rgba(255, 238, 0, 1) 0%, rgba(250, 176, 21, 1) 100%)"
              @change="handleChange"
            />
          </view>
          <view class="demo-row">
            <wd-rate
              v-model="gradientValue"
              :active-color="[
                'linear-gradient(180deg, rgba(255, 238, 0, 1) 0%, rgba(250, 176, 21, 1) 100%)',
                'linear-gradient(315deg, rgba(245, 34, 34, 1) 0%, rgba(255, 117, 102, 1) 100%)'
              ]"
            />
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('xiu-gai-icon-he-xuan-zhong-yan-se')">
          <view class="demo-row">
            <wd-rate v-model="fireValue" block icon="Fire" active-icon="Fire" active-color="var(--wot-red-6)" />
          </view>
          <view class="demo-row">
            <wd-rate v-model="thumbValue" block icon="thumb-down-fill" active-icon="thumb-up-fill" active-color="var(--wot-green-6)" />
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('xiu-gai-sizespace')">
          <wd-rate v-model="sizeValue" space="12px" size="36" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('yun-xu-ban-xuan')">
          <wd-rate v-model="halfValue" allow-half />
        </demo-group-item>
        <demo-group-item :title="$t('yun-xu-qing-kong-ping-fen')">
          <view class="demo-row">
            <wd-rate v-model="clearableValue" clearable />
          </view>
          <view class="demo-row">
            <wd-rate v-model="clearableHalfValue" clearable allow-half />
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const basicValue = ref<number>(5)
const readonlyValue = ref<number>(3)
const disabledValue = ref<number>(2)
const colorValue = ref<number>(3)
const gradientValue = ref<number>(4)
const fireValue = ref<number>(3)
const thumbValue = ref<number>(3)
const sizeValue = ref<number>(5)
const halfValue = ref<number>(2.5)
const clearableValue = ref<number>(3)
const clearableHalfValue = ref<number>(3.5)

function handleChange(event: { value: number }) {
  console.log(event.value)
}
</script>

<style lang="scss" scoped>
.page-rate {
  .demo-row {
    margin-bottom: 12px;
  }

  .demo-row:last-child {
    margin-bottom: 0;
  }
}
</style>
