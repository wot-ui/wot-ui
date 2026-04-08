<template>
  <page-wraper>
    <view class="page-picker-view">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ji-chu-yong-fa')" no-padding>
          <view class="page-picker-view__result">{{ $t('dang-qian-zhi-value1join', value1.join(' / ')) }}</view>
          <wd-picker-view v-model="value1" :columns="columns1" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('jin-yong-xuan-xiang')" no-padding>
          <view class="page-picker-view__result">{{ $t('dang-qian-zhi-value2join', value2.join(' / ')) }}</view>
          <wd-picker-view v-model="value2" :columns="columns2" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('li-ji-chu-fa')" no-padding>
          <view class="page-picker-view__result">{{ $t('dang-qian-zhi-value3join', value3.join(' / ')) }}</view>
          <view class="page-picker-view__result">{{ $t('bian-geng-xin-xi-changemessage', changeMessage) }}</view>
          <wd-picker-view v-model="value3" :columns="columns2" immediate-change @change="handleImmediateChange" />
        </demo-group-item>

        <demo-group-item :title="$t('duo-lie')" no-padding>
          <view class="page-picker-view__result">{{ $t('dang-qian-zhi-value4join', value4.join(' / ')) }}</view>
          <wd-picker-view v-model="value4" :columns="columns4" />
        </demo-group-item>

        <demo-group-item :title="$t('duo-ji-lian-dong')" no-padding>
          <view class="page-picker-view__result">{{ $t('dang-qian-zhi-value5join', value5.join(' / ')) }}</view>
          <wd-picker-view v-model="value5" :columns="cascadeColumns" cascade />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yong-fa')">
        <demo-group-item :title="$t('zi-ding-yi-zi-duan')" no-padding>
          <view class="page-picker-view__result">{{ $t('dang-qian-zhi-value6join', value6.join(' / ')) }}</view>
          <wd-picker-view v-model="value6" :columns="columns6" value-key="id" label-key="text" />
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const value1 = ref<string[]>([t('xuanXiang_1-0')])
const columns1 = computed(() => [
  { label: t('xuanXiang_1-0'), value: t('xuanXiang_1-0') },
  { label: t('xuanXiang_2-0'), value: t('xuanXiang_2-0') },
  { label: t('xuanXiang_3-0'), value: t('xuanXiang_3-0') },
  { label: t('xuan-xiang-4'), value: t('xuan-xiang-4') },
  { label: t('xuan-xiang-5'), value: t('xuan-xiang-5') },
  { label: t('xuan-xiang-6'), value: t('xuan-xiang-6') },
  { label: t('xuan-xiang-7'), value: t('xuan-xiang-7') }
])

const value2 = ref<string[]>([t('xuanXiang_1-0')])
const value3 = ref<string[]>([t('xuanXiang_1-0')])
const changeMessage = ref(t('wei-chu-fa'))

const columns2 = computed(() => [
  { label: t('xuanXiang_1-0'), value: t('xuanXiang_1-0') },
  { label: t('xuanXiang_2-0'), value: t('xuanXiang_2-0') },
  { label: t('xuanXiang_3-0'), value: t('xuanXiang_3-0'), disabled: true },
  { label: t('xuan-xiang-4'), value: t('xuan-xiang-4') },
  { label: t('xuan-xiang-5'), value: t('xuan-xiang-5') },
  { label: t('xuan-xiang-6'), value: t('xuan-xiang-6') },
  { label: t('xuan-xiang-7'), value: t('xuan-xiang-7') }
])

const value4 = computed(() => [t('zhong-nan-da-xue-0'), t('ruan-jian-gong-cheng-0')])
const columns4 = computed(() => [
  [
    { value: t('zhong-shan-da-xue-0'), label: t('zhong-shan-da-xue-0') },
    { value: t('zhong-nan-da-xue-0'), label: t('zhong-nan-da-xue-0') },
    { value: t('hua-nan-li-gong-da-xue-0'), label: t('hua-nan-li-gong-da-xue-0') }
  ],
  [
    { value: t('ji-suan-ji-ke-xue-yu-ji-shu-0'), label: t('ji-suan-ji-ke-xue-yu-ji-shu-0') },
    { value: t('ruan-jian-gong-cheng-0'), label: t('ruan-jian-gong-cheng-0') },
    { value: t('tong-xin-gong-cheng-0'), label: t('tong-xin-gong-cheng-0') },
    { value: t('fa-xue-0'), label: t('fa-xue-0') },
    { value: t('jing-ji-xue-0'), label: t('jing-ji-xue-0') }
  ]
])

const value5 = ref(['110000', '110100', '110102'])
const cascadeColumns = computed(() => [
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

const value6 = ref<(string | number)[]>([1])
const columns6 = computed(() => [
  { id: 1, text: t('xuan-xiang-yi') },
  { id: 2, text: t('xuan-xiang-er') },
  { id: 3, text: t('xuan-xiang-san') }
])

function handleImmediateChange({ selectedLabels, columnIndex }: any) {
  changeMessage.value = t('selectedlabelsjoin-di-columnindex-lie', selectedLabels.join(' / '), columnIndex)
}
</script>
<style lang="scss" scoped>
.page-picker-view__result {
  padding: 12px 16px 0;
  color: var(--wot-text-secondary);
  font-size: 14px;
  line-height: 20px;
}
</style>
