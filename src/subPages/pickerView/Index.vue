<template>
  <page-wraper>
    <demo-block :title="$t('ji-ben-yong-fa-shu-zhi-value1') + value1">
      <wd-picker-view v-model="value1" :columns="columns1" />
    </demo-block>

    <demo-block :title="$t('jin-yong-xuan-xiang-shu-zhi-value2') + value2">
      <wd-picker-view v-model="value2" :columns="columns2" />
    </demo-block>

    <demo-block :title="$t('li-ji-chu-fa-change-shu-zhi-value6') + value6">
      <wd-picker-view v-model="value6" :immediate-change="true" :columns="columns2" />
    </demo-block>

    <demo-block :title="$t('duo-lie-shu-zhi-value4') + `[${value4}]`">
      <wd-picker-view v-model="value4" :columns="columns4" />
    </demo-block>

    <demo-block :title="$t('duo-ji-lian-dong-shu-zhi-value5') + `[${value5}]`">
      <wd-picker-view v-model="value5" :columns="cascadeColumns" cascade />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const getOptions = (list: string[]) => {
  return list.map((value) => ({ value, label: value }))
}

const value1 = ref<string[]>([t('xuanXiang_1-0')])
const columns1 = ref(
  getOptions([t('xuanXiang_1-0'), t('xuanXiang_2-0'), t('xuanXiang_3-0'), t('xuan-xiang-4'), t('xuan-xiang-5'), t('xuan-xiang-6'), t('xuan-xiang-7')])
)

const value2 = ref<string[]>([t('xuanXiang_1-0')])
const value6 = ref<string[]>([t('xuanXiang_1-0')])

const columns2 = ref([
  { label: t('xuanXiang_1-0'), value: t('xuanXiang_1-0') },
  { label: t('xuanXiang_2-0'), value: t('xuanXiang_2-0') },
  {
    label: t('xuanXiang_3-0'),
    value: t('xuanXiang_3-0'),
    disabled: true
  },
  { label: t('xuan-xiang-4'), value: t('xuan-xiang-4') },
  { label: t('xuan-xiang-5'), value: t('xuan-xiang-5') },
  { label: t('xuan-xiang-6'), value: t('xuan-xiang-6') },
  { label: t('xuan-xiang-7'), value: t('xuan-xiang-7') }
])

const value4 = ref([t('zhong-nan-da-xue-0'), t('ruan-jian-gong-cheng-0')])
const columns4 = ref([
  getOptions([t('zhong-shan-da-xue-0'), t('zhong-nan-da-xue-0'), t('hua-nan-li-gong-da-xue-0')]),
  getOptions([t('ji-suan-ji-ke-xue-yu-ji-shu-0'), t('ruan-jian-gong-cheng-0'), t('tong-xin-gong-cheng-0'), t('fa-xue-0'), t('jing-ji-xue-0')])
])

// 级联模式：使用树形数据结构（带 children）
const value5 = ref(['110000', '110100', '110102'])
const cascadeColumns = ref([
  {
    label: t('bei-jing'),
    value: '110000',
    children: [
      {
        label: t('bei-jing'),
        value: '110100',
        children: [
          { label: t('dong-cheng-qu'), value: '110101' },
          { label: t('xi-cheng-qu'), value: '110102' },
          { label: t('zhao-yang-qu'), value: '110105' },
          { label: t('feng-tai-qu'), value: '110106' },
          { label: t('shi-jing-shan-qu'), value: '110107' }
        ]
      }
    ]
  },
  {
    label: t('guang-dong-sheng'),
    value: '440000',
    children: [
      {
        label: t('guang-zhou-shi'),
        value: '440100',
        children: [
          { label: t('li-wan-qu'), value: '440103' },
          { label: t('yue-xiu-qu'), value: '440104' },
          { label: t('hai-zhu-qu'), value: '440105' }
        ]
      },
      {
        label: t('shao-guan-shi'),
        value: '440200',
        children: [{ label: t('wu-jiang-qu'), value: '440203' }]
      },
      {
        label: t('shen-zhen-shi'),
        value: '440300',
        children: [
          { label: t('luo-hu-qu'), value: '440303' },
          { label: t('fu-tian-qu'), value: '440304' }
        ]
      },
      {
        label: t('zhu-hai-shi'),
        value: '440400',
        children: [
          { label: t('xiang-zhou-qu'), value: '440402' },
          { label: t('dou-men-qu'), value: '440403' },
          { label: t('jin-wan-qu'), value: '440404' }
        ]
      },
      {
        label: t('shan-tou-shi'),
        value: '440500',
        children: [
          { label: t('long-hu-qu'), value: '440507' },
          { label: t('jin-ping-qu'), value: '440511' }
        ]
      }
    ]
  }
])
</script>
<style lang="scss" scoped></style>
