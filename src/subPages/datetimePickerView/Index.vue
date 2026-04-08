<template>
  <page-wraper>
    <view class="page-datetime-picker-view">
      <wd-toast />

      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ri-qi-xuan-ze-0')">
          <wd-datetime-picker-view v-model="value1" @change="onChange1" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('ri-qi-xuan-ze-dai-miao')">
          <wd-datetime-picker-view v-model="value8" use-second />
        </demo-group-item>

        <demo-group-item :title="$t('nian-yue-ri')">
          <wd-datetime-picker-view type="date" v-model="value2" @change="onChange2" />
        </demo-group-item>

        <demo-group-item :title="$t('nian-yue')">
          <wd-datetime-picker-view type="year-month" v-model="value3" @change="onChange3" />
        </demo-group-item>

        <demo-group-item :title="$t('nian-0')">
          <wd-datetime-picker-view type="year" v-model="value7" @change="onChange7" />
        </demo-group-item>

        <demo-group-item :title="$t('shi-fen')">
          <wd-datetime-picker-view type="time" v-model="value4" @change="onChange4" />
        </demo-group-item>

        <demo-group-item :title="$t('shi-jian-xuan-ze-dai-miao')">
          <wd-datetime-picker-view type="time" v-model="value9" use-second @change="onChange4" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('nei-bu-ge-shi')">
          <wd-datetime-picker-view v-model="value5" :formatter="formatter" @change="onChange5" />
        </demo-group-item>

        <demo-group-item :title="$t('guo-lv-xuan-xiang')">
          <wd-datetime-picker-view v-model="value6" :filter="filter" @change="onChange6" />
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import type { DatetimePickerViewFilter, DatetimePickerViewFormatter } from '@/uni_modules/wot-ui/components/wd-datetime-picker-view/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const value1 = ref<string>('')
const value2 = ref<number>(Date.now())
const value3 = ref<number>(Date.now())
const value4 = ref<string>('11:12')
const value5 = ref<number>(Date.now())
const value6 = ref<number>(Date.now())
const value7 = ref<string>('')
const value8 = ref<number>(Date.now())
const value9 = ref<string>('11:12:13')

const formatter: DatetimePickerViewFormatter = (type, value) => {
  switch (type) {
    case 'year':
      return value + t('nian-0')
    case 'month':
      return value + t('yue')
    case 'date':
      return value + t('ri')
    case 'hour':
      return value + t('shi')
    case 'minute':
      return value + t('fen')
    default:
      return `${value}`
  }
}
const filter: DatetimePickerViewFilter = (options) => {
  if (options.type === 'minute') {
    return options.values.filter((value) => value % 5 === 0)
  }
  return options.values
}

const toast = useToast()

function onChange1({ value }: any) {
  toast.show(t('xuan-ze-le') + new Date(value))
}
function onChange2({ value }: any) {
  console.log(value)
}
function onChange3({ value }: any) {
  console.log(value)
}
function onChange4({ value }: any) {
  console.log(value)
}
function onChange5({ value }: any) {
  console.log(value)
}
function onChange6({ value }: any) {
  console.log(value)
}
function onChange7({ value }: any) {
  console.log(new Date(value).getFullYear())
}
</script>
<style lang="scss" scoped></style>
