<template>
  <page-wraper>
    <demo-block transparent>
      <wd-cell-group border>
        <wd-cell :title="$t('dan-lie-xuan-xiang')" placeholder="请选择" :value="value0[0]" is-link @click="show0 = true" />
        <wd-picker v-model="value0" v-model:visible="show0" :columns="columns0" />

        <wd-cell title="loading" :value="value3[0]" is-link @click="show3 = true" />
        <wd-picker v-model="value3" v-model:visible="show3" loading :columns="columns3" />

        <wd-cell :title="$t('duo-lie')" :value="displayValue4" is-link @click="show4 = true" />
        <wd-picker v-model="value4" v-model:visible="show4" :columns="columns4" @confirm="handleConfirm4" />

        <wd-cell :title="$t('duo-ji-lian-dong')" :value="displayValue5" is-link @click="show5 = true" />
        <wd-picker v-model="value5" v-model:visible="show5" :columns="cascadeColumns" cascade @confirm="handleConfirm5" />

        <wd-cell :title="$t('fen-ge-fu')" :value="displayValue6" is-link @click="show6 = true" />
        <wd-picker v-model="value6" v-model:visible="show6" :columns="columns6" :display-format="displayFormat" @confirm="handleConfirm6" />

        <wd-cell :title="$t('biaoTi-0')" :value="value9[0]" is-link @click="show9 = true" />
        <wd-picker v-model="value9" v-model:visible="show9" :columns="columns7" :title="$t('wen-an-biao-ti')" />

        <wd-cell title="before-confirm" :value="value7[0]" is-link @click="show7 = true" />
        <wd-picker :columns="columns0" v-model="value7" v-model:visible="show7" :before-confirm="beforeConfirm" />

        <wd-cell :title="$t('cuo-wu')" :value="value10[0]" is-link custom-value-class="is-error" @click="show10 = true" />
        <wd-picker v-model="value10" v-model:visible="show10" :columns="columns0" />

        <wd-cell :title="$t('bi-tian')" :value="value11[0]" is-link required @click="show11 = true" />
        <wd-picker v-model="value11" v-model:visible="show11" :columns="columns0" />

        <wd-cell :title="$t('bi-tian-xing-hao-zai-you-ce')" :value="value16[0]" is-link required asterisk-position="end" @click="show16 = true" />
        <wd-picker v-model="value16" v-model:visible="show16" :columns="columns0" />

        <wd-cell :title="$t('duo-ji-lian-dong-ke-qing-kong')" :value="displayValue15" is-link @click="show15 = true">
          <template v-if="displayValue15" #right-icon>
            <wd-icon name="error-fill" custom-class="wd-picker__clear" @click.stop="handleClear" />
          </template>
        </wd-cell>
        <wd-picker v-model="value15" v-model:visible="show15" :columns="cascadeColumns" cascade @confirm="handleConfirmClear" />
      </wd-cell-group>
    </demo-block>
    <demo-block :title="$t('label-bu-chuan-0')" transparent>
      <wd-cell :value="value12[0] ? value12[0] : '请选择'" is-link @click="show12 = true" />
      <wd-picker :columns="columns0" v-model="value12" v-model:visible="show12" />
    </demo-block>
    <demo-block :title="$t('da-xiao')" transparent>
      <wd-cell :title="$t('dan-lie-xuan-xiang')" :value="value13[0]" size="large" is-link @click="show13 = true" />
      <wd-picker v-model="value13" v-model:visible="show13" :columns="columns0" />
    </demo-block>
    <demo-block :title="$t('zhi-kao-you-xian-shi')" transparent>
      <wd-cell :title="$t('dan-lie-xuan-xiang')" :value="value14[0]" is-link @click="show14 = true" />
      <wd-picker v-model="value14" v-model:visible="show14" :columns="columns0" />
    </demo-block>
    <wd-toast />
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { PickerOption } from '@/uni_modules/wot-design-uni/components/wd-picker-view/types'
import type { PickerBeforeConfirm, PickerDisplayFormat } from '@/uni_modules/wot-design-uni/components/wd-picker/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const toast = useToast()

const { t } = useI18n()

// Visibility refs
const show0 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show9 = ref(false)
const show10 = ref(false)
const show11 = ref(false)
const show12 = ref(false)
const show13 = ref(false)
const show14 = ref(false)
const show15 = ref(false)
const show16 = ref(false)

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

const value3 = ref([t('xuan-xiang-4')])
const columns3 = ref(
  getOptions([t('xuanXiang_1-0'), t('xuanXiang_2-0'), t('xuanXiang_3-0'), t('xuan-xiang-4'), t('xuan-xiang-5'), t('xuan-xiang-6'), t('xuan-xiang-7')])
)
const value4 = ref([])
const displayValue4 = ref('')
const columns4 = ref([
  getOptions([t('zhong-shan-da-xue'), t('zhong-nan-da-xue'), t('hua-nan-li-gong-da-xue')]),
  getOptions([t('ji-suan-ji-ke-xue-yu-ji-shu'), t('ruan-jian-gong-cheng'), t('tong-xin-gong-cheng'), t('fa-xue'), t('jing-ji-xue')])
])

const value5 = ref(['110000', '110100', '110102'])
const displayValue5 = ref(t('bei-jing') + ' - ' + t('bei-jing') + ' - ' + t('xi-cheng-qu'))
const value15 = ref(['110000', '110100', '110102'])
const displayValue15 = ref(t('bei-jing') + ' - ' + t('bei-jing') + ' - ' + t('xi-cheng-qu'))

const value6 = ref([t('zhong-nan-da-xue-0'), t('ruan-jian-gong-cheng-0')])
const displayValue6 = ref(t('zhong-nan-da-xue-0') + '-' + t('ruan-jian-gong-cheng-0'))
const value8 = ref([t('xuanXiang_2-0')])
const value9 = ref([t('xuanXiang_1-0')])
const value10 = ref([t('xuanXiang_2-0')])

const value11 = ref([t('xuanXiang_3-0')])
const value12 = ref([t('xuanXiang_3-0')])
const value13 = ref([t('xuanXiang_3-0')])
const value14 = ref([t('xuanXiang_3-0')])
const value16 = ref([t('xuanXiang_2-0')])

const columns6 = ref([
  getOptions([t('zhong-shan-da-xue-0'), t('zhong-nan-da-xue-1'), t('hua-nan-li-gong-da-xue-0')]),
  getOptions([t('ji-suan-ji-ke-xue-yu-ji-shu-0'), t('ruan-jian-gong-cheng-1'), t('tong-xin-gong-cheng-0'), t('fa-xue-0'), t('jing-ji-xue-0')])
])

const columns7 = ref(
  getOptions([t('xuanXiang_1-0'), t('xuanXiang_2-0'), t('xuanXiang_3-0'), t('xuan-xiang-4'), t('xuan-xiang-5'), t('xuan-xiang-6'), t('xuan-xiang-7')])
)

const value7 = ref<string[]>([])

const displayFormat: PickerDisplayFormat = (items) => {
  return (items as PickerOption[])
    .map((item) => {
      return item.label
    })
    .join('-')
}

const beforeConfirm: PickerBeforeConfirm = (value, resolve, picker) => {
  picker.setLoading(true)
  setTimeout(() => {
    picker.setLoading(false)
    if ([t('xuanXiang_2-0'), t('xuanXiang_3-0')].indexOf((value as string[])[0]) > -1) {
      resolve(false)
      toast.error(t('xuan-xiang-xiao-yan-bu-tong-guo-qing-zhong-xin-xuan-ze'))
    } else {
      resolve(true)
    }
  }, 2000)
}

function handleConfirm({ value }: any) {
  value8.value = value
}

function handleConfirm4({ value }: any) {
  displayValue4.value = value.join(', ')
}

function handleConfirm5({ selectedItems }: any) {
  displayValue5.value = selectedItems.map((item: any) => item.label).join(' - ')
}

function handleConfirm6({ selectedItems }: any) {
  displayValue6.value = displayFormat(selectedItems, { valueKey: 'value', labelKey: 'label' })
}

function handleClear() {
  value15.value = []
  displayValue15.value = ''
  toast.success(t('xuan-xiang-yi-jing-qing-kong'))
}

function handleConfirmClear({ selectedItems }: any) {
  displayValue15.value = selectedItems.map((item: any) => item.label).join(' - ')
  toast.success(t('xuan-xiang-yi-jing-qing-kong'))
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .default-slot {
    background: $-dark-background2;
  }
  .default-slot-txt {
    color: $-dark-color3;
  }
}
.default-slot {
  background: #fff;
  padding: 15px;
}

.default-slot-txt {
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.45);
}
.is-error {
  color: var(--wot-input-error-color, #f56c6c);
}
.wd-picker__clear {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  font-size: 16px;
  color: var(--wot-cell-icon-color, #c8c9cc);
  z-index: 2;
}
</style>
