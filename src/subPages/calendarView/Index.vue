<template>
  <page-wraper>
    <demo-group title="组件类型">
      <demo-group-item no-padding :title="$t('dan-ge-ri-qi-xuan-ze')">
        <view style="margin: 0 15px 10px">
          <view style="margin-bottom: 10px; font-size: 13px">{{ $t('qie-huan-lei-xing') }}</view>
          <wd-radio-group v-model="type1" type="button">
            <wd-radio value="date">date</wd-radio>
            <wd-radio value="week">week</wd-radio>
            <wd-radio value="month">month</wd-radio>
          </wd-radio-group>
        </view>
        <wd-calendar-view :type="type1" v-model="value1" :switch-mode="switchMode" @change="handleChange1"></wd-calendar-view>
      </demo-group-item>

      <demo-group-item no-padding :title="$t('duo-ge-ri-qi-xuan-ze')">
        <wd-calendar-view type="dates" v-model="value2" :switch-mode="switchMode" @change="handleChange2"></wd-calendar-view>
      </demo-group-item>

      <demo-group-item no-padding :title="$t('ri-qi-fan-wei-xuan-ze')">
        <view style="margin: 0 24rpx 20rpx">
          <view style="margin-bottom: 20rpx; font-size: 26rpx">{{ $t('qie-huan-lei-xing-0') }}</view>
          <wd-radio-group v-model="type2" type="button" @change="handleTypeChange2">
            <wd-radio value="daterange">daterange</wd-radio>
            <wd-radio value="weekrange">weekrange</wd-radio>
            <wd-radio value="monthrange">monthrange</wd-radio>
          </wd-radio-group>
        </view>
        <wd-calendar-view :type="type2" allow-same-day v-model="value3" :switch-mode="switchMode" @change="handleChange3"></wd-calendar-view>
      </demo-group-item>

      <demo-group-item no-padding :title="$t('shi-jian-lei-xing')">
        <wd-calendar-view type="datetime" v-model="value4" :switch-mode="switchMode"></wd-calendar-view>
      </demo-group-item>

      <demo-group-item no-padding :title="$t('shi-jian-fan-wei-lei-xing')">
        <wd-calendar-view type="datetimerange" v-model="value5" :switch-mode="switchMode"></wd-calendar-view>
      </demo-group-item>
    </demo-group>

    <demo-group title="组件状态">
      <demo-group-item no-padding title="范围选择允许选中同一日期">
        <wd-calendar-view type="daterange" allow-same-day v-model="value3" :switch-mode="switchMode"></wd-calendar-view>
      </demo-group-item>
    </demo-group>

    <demo-group title="组件变体">
      <demo-group-item title="切换模式">
        <wd-radio-group v-model="switchMode" type="button">
          <wd-radio value="none">none</wd-radio>
          <wd-radio value="month">month</wd-radio>
          <wd-radio value="year-month">year-month</wd-radio>
        </wd-radio-group>
      </demo-group-item>
    </demo-group>

    <demo-group title="组件样式">
      <demo-group-item no-padding :title="$t('zi-ding-yi-ri-qi')">
        <wd-calendar-view type="daterange" allow-same-day v-model="value6" :formatter="formatter" :switch-mode="switchMode"></wd-calendar-view>
      </demo-group-item>

      <demo-group-item no-padding :title="$t('she-zhi-zhou-qi-shi-ri')">
        <wd-calendar-view :first-day-of-week="1" v-model="value8" :switch-mode="switchMode"></wd-calendar-view>
      </demo-group-item>
    </demo-group>

    <demo-group title="特殊样式">
      <demo-group-item no-padding :title="$t('xian-zhi-zui-da-xuan-ze-fan-wei')">
        <wd-calendar-view type="daterange" :max-range="3" v-model="value7" :switch-mode="switchMode"></wd-calendar-view>
      </demo-group-item>
    </demo-group>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { CalendarFormatter } from '@/uni_modules/wot-ui/components/wd-calendar-view/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const type1 = ref<any>('date')
const type2 = ref<any>('daterange')
const switchMode = ref<any>('none')
const value1 = ref(Date.now())
const value2 = ref(null)
const value3 = ref([Date.now() - 24 * 60 * 60 * 1000 * 33, Date.now()])
const value4 = ref(Date.now())
const value5 = ref([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000])
const value6 = ref([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000])
const value7 = ref([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000])
const value8 = ref([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000])

const formatter: CalendarFormatter = (day) => {
  const date = new Date(day.date)
  const now = new Date()

  const year = date.getFullYear()
  const month = date.getMonth()
  const da = date.getDate()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDa = now.getDate()

  if (year === nowYear && month === nowMonth && da === nowDa) {
    day.topInfo = t('jin-tian')
  }

  if (month === 5 && da === 18) {
    day.topInfo = t('618-da-cu')
  }

  if (month === 10 && da === 11) {
    day.topInfo = t('jing-dong-shuang-11')
  }

  if (day.type === 'start') {
    day.bottomInfo = t('kai-shi')
  }

  if (day.type === 'end') {
    day.bottomInfo = t('jie-shu')
  }

  if (day.type === 'same') {
    day.bottomInfo = t('kai-shi-jie-shu')
  }

  return day
}

function handleTypeChange2({ value }: any) {
  type2.value = value
}
function handleChange1({ value }: any) {
  console.log(value)
  // value1.value = value
}
function handleChange2({ value }: any) {
  value2.value = value
}
function handleChange3({ value }: any) {
  value3.value = value
}
</script>
<style lang="scss" scoped></style>
