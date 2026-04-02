<template>
  <page-wraper>
    <demo-group transparent title="基础用法">
      <!-- 基础用法 (单列) -->
      <demo-group-item no-padding :title="$t('dan-lie-xuan-xiang')">
        <wd-cell-group border>
          <wd-cell :title="$t('dan-lie-xuan-xiang')" placeholder="请选择" :value="value0[0]" is-link @click="show0 = true" />
        </wd-cell-group>
        <wd-picker v-model="value0" v-model:visible="show0" :columns="columns0" />
      </demo-group-item>

      <!-- 多列 -->
      <demo-group-item no-padding :title="$t('duo-lie')">
        <wd-cell-group border>
          <wd-cell :title="$t('duo-lie')" :value="displayValue4" is-link @click="show4 = true" />
        </wd-cell-group>
        <wd-picker v-model="value4" v-model:visible="show4" :columns="columns4" @confirm="handleConfirm4" />
      </demo-group-item>

      <!-- 多级联动 -->
      <demo-group-item no-padding :title="$t('duo-ji-lian-dong')">
        <wd-cell-group border>
          <wd-cell :title="$t('duo-ji-lian-dong')" :value="displayValue5" is-link @click="show5 = true" />
        </wd-cell-group>
        <wd-picker v-model="value5" v-model:visible="show5" :columns="cascadeColumns" cascade @confirm="handleConfirm5" />
      </demo-group-item>
    </demo-group>

    <demo-group transparent title="内容形态">
      <!-- 标题 -->
      <demo-group-item no-padding :title="$t('wen-an-biao-ti')">
        <wd-cell-group border>
          <wd-cell :title="$t('biaoTi-0')" :value="value9[0]" is-link @click="show9 = true" />
        </wd-cell-group>
        <wd-picker v-model="value9" v-model:visible="show9" :columns="columns7" :title="$t('wen-an-biao-ti')" />
      </demo-group-item>
    </demo-group>

    <demo-group transparent title="组件样式">
      <!-- 大小 -->
      <demo-group-item no-padding :title="$t('da-xiao')">
        <wd-cell-group border>
          <wd-cell :title="$t('dan-lie-xuan-xiang')" :value="value13[0]" size="large" is-link @click="show13 = true" />
        </wd-cell-group>
        <wd-picker v-model="value13" v-model:visible="show13" :columns="columns0" />
      </demo-group-item>

      <!-- 靠右 -->
      <demo-group-item no-padding :title="$t('zhi-kao-you-xian-shi')">
        <wd-cell-group border>
          <wd-cell :title="$t('dan-lie-xuan-xiang')" :value="value14[0]" is-link @click="show14 = true" />
        </wd-cell-group>
        <wd-picker v-model="value14" v-model:visible="show14" :columns="columns0" />
      </demo-group-item>
    </demo-group>

    <demo-group transparent title="特殊交互">
      <!-- 格式化展示 -->
      <demo-group-item no-padding :title="$t('fen-ge-fu')">
        <wd-cell-group border>
          <wd-cell :title="$t('fen-ge-fu')" :value="displayValue6" is-link @click="show6 = true" />
        </wd-cell-group>
        <wd-picker v-model="value6" v-model:visible="show6" :columns="columns6" :display-format="displayFormat" @confirm="handleConfirm6" />
      </demo-group-item>

      <!-- 确定前校验 -->
      <demo-group-item no-padding title="确定前校验">
        <wd-cell-group border>
          <wd-cell title="before-confirm" :value="value7[0]" is-link @click="show7 = true" />
        </wd-cell-group>
        <wd-picker :columns="columns0" v-model="value7" v-model:visible="show7" :before-confirm="beforeConfirm" />
      </demo-group-item>
    </demo-group>

    <wd-toast />
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import type { PickerOption } from '@/uni_modules/wot-ui/components/wd-picker-view/types'
import type { PickerBeforeConfirm } from '@/uni_modules/wot-ui/components/wd-picker/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const toast = useToast()

const { t } = useI18n()

// Visibility refs
const show0 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show9 = ref(false)
const show13 = ref(false)
const show14 = ref(false)

const getOptions = (list: string[]) => {
  return list.map((value) => ({ value, label: value }))
}

// 级联模式：使用树形数据结构（带 children）
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

const columns0 = ref(
  getOptions([
    t(
      'xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1'
    ),
    t('xuanXiang_2-0'),
    t('xuanXiang_3-0'),
    t('xuan-xiang-4'),
    t('xuan-xiang-5'),
    t('xuan-xiang-6'),
    t('xuan-xiang-7')
  ])
)
const value0 = ref<string[]>([])

const value4 = ref([])
const displayValue4 = ref('')
const columns4 = ref([
  getOptions([t('zhong-shan-da-xue'), t('zhong-nan-da-xue'), t('hua-nan-li-gong-da-xue')]),
  getOptions([t('ji-suan-ji-ke-xue-yu-ji-shu'), t('ruan-jian-gong-cheng'), t('tong-xin-gong-cheng'), t('fa-xue'), t('jing-ji-xue')])
])

const value5 = ref(['110000', '110100', '110102'])
const displayValue5 = ref(t('bei-jing') + ' - ' + t('bei-jing') + ' - ' + t('xi-cheng-qu'))

const value6 = ref([t('zhong-nan-da-xue-0'), t('ruan-jian-gong-cheng-0')])
const displayValue6 = ref(t('zhong-nan-da-xue-0') + '-' + t('ruan-jian-gong-cheng-0'))
const value9 = ref([t('xuanXiang_1-0')])
const value13 = ref([t('xuanXiang_3-0')])
const value14 = ref([t('xuanXiang_3-0')])

const columns6 = ref([
  getOptions([t('zhong-shan-da-xue-0'), t('zhong-nan-da-xue-1'), t('hua-nan-li-gong-da-xue-0')]),
  getOptions([t('ji-suan-ji-ke-xue-yu-ji-shu-0'), t('ruan-jian-gong-cheng-1'), t('tong-xin-gong-cheng-0'), t('fa-xue-0'), t('jing-ji-xue-0')])
])

const columns7 = ref(
  getOptions([t('xuanXiang_1-0'), t('xuanXiang_2-0'), t('xuanXiang_3-0'), t('xuan-xiang-4'), t('xuan-xiang-5'), t('xuan-xiang-6'), t('xuan-xiang-7')])
)

const value7 = ref<string[]>([])

const displayFormat = (items: PickerOption | PickerOption[]) => {
  return (items as PickerOption[])
    .map((item) => {
      return item.label
    })
    .join('-')
}

const beforeConfirm: PickerBeforeConfirm = (value) => {
  toast.loading('处理中...')
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      if ([t('xuanXiang_2-0'), t('xuanXiang_3-0')].indexOf((value as string[])[0]) > -1) {
        toast.close()
        toast.error(t('xuan-xiang-xiao-yan-bu-tong-guo-qing-zhong-xin-xuan-ze'))
        resolve(false)
      } else {
        toast.close()
        resolve(true)
      }
    }, 2000)
  })
}

function handleConfirm4({ selectedItems }: any) {
  displayValue4.value = selectedItems.map((item: any) => item.label).join(', ')
}

function handleConfirm5({ selectedItems }: any) {
  displayValue5.value = selectedItems.map((item: any) => item.label).join(' - ')
}

function handleConfirm6({ selectedItems }: any) {
  displayValue6.value = displayFormat(selectedItems)
}
</script>
<style lang="scss" scoped></style>
