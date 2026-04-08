<template>
  <page-wraper>
    <view class="page-select-picker">
      <demo-group :title="$t('zu-jian-lei-xing')" transparent>
        <demo-group-item :title="$t('xuan-ze-di-zhi')" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('xuan-ze-di-zhi')" :value="getDisplayValue(value1)" is-link @click="show1 = true" />
          </wd-cell-group>
          <wd-select-picker v-model="value1" v-model:visible="show1" :columns="columns1" @confirm="handleConfirm" />
        </demo-group-item>
        <demo-group-item :title="$t('lei-xing-qie-huan')" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('lei-xing-qie-huan')" :value="getRadioDisplayValue(value2)" is-link @click="show2 = true" />
          </wd-cell-group>
          <wd-select-picker type="radio" v-model="value2" v-model:visible="show2" :columns="columns1" @confirm="handleConfirm" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')" transparent>
        <demo-group-item :title="$t('jin-yong-xuan-xiang')" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('jin-yong-xuan-xiang')" :value="getDisplayValue(value5)" is-link @click="show5 = true" />
          </wd-cell-group>
          <wd-select-picker v-model="value5" v-model:visible="show5" :columns="columns2" @confirm="handleConfirm" />
        </demo-group-item>
        <demo-group-item title="loading" no-padding>
          <wd-cell-group border>
            <wd-cell title="loading" :value="getDisplayValue(value6)" is-link @click="show6 = true" />
          </wd-cell-group>
          <wd-select-picker loading v-model="value6" v-model:visible="show6" :columns="columns1" @confirm="handleConfirm" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')" transparent>
        <demo-group-item :title="$t('biaoTi-0')" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('biaoTi-0')" :value="getDisplayValue(value10)" is-link @click="show10 = true" />
          </wd-cell-group>
          <wd-select-picker v-model="value10" v-model:visible="show10" :title="$t('duo-xuan')" :columns="columns1" @confirm="handleConfirm" />
        </demo-group-item>
        <demo-group-item :title="$t('ke-sou-suo')" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('ke-sou-suo')" :value="getDisplayValue(value13)" is-link @click="show13 = true" />
          </wd-cell-group>
          <wd-select-picker filterable v-model="value13" v-model:visible="show13" :columns="columns1" @confirm="handleConfirm" />
        </demo-group-item>
        <demo-group-item :title="$t('dan-xuan-ke-sou-suo')" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('dan-xuan-ke-sou-suo')" :value="getRadioDisplayValue(value18)" is-link @click="show18 = true" />
          </wd-cell-group>
          <wd-select-picker filterable v-model="value18" v-model:visible="show18" type="radio" :columns="columns1" @confirm="handleConfirm" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')" transparent>
        <demo-group-item :title="$t('xuan-ze-qi-change')" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('xuan-ze-qi-change')" :value="getDisplayValue(value7)" is-link @click="show7 = true" />
          </wd-cell-group>
          <wd-select-picker v-model="value7" v-model:visible="show7" :columns="columns1" @change="handleChange" @confirm="handleConfirm" />
        </demo-group-item>
        <demo-group-item title="before-confirm" no-padding>
          <wd-cell-group border>
            <wd-cell title="before-confirm" :value="getDisplayValue(value9)" is-link @click="show9 = true" />
          </wd-cell-group>
          <wd-select-picker v-model="value9" v-model:visible="show9" :columns="columns1" :before-confirm="beforeConfirm" @confirm="handleConfirm" />
        </demo-group-item>
        <demo-group-item :title="$t('zi-dong-wan-cheng')" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('zi-dong-wan-cheng')" :value="getRadioDisplayValue(value19)" is-link @click="show19 = true" />
          </wd-cell-group>
          <wd-select-picker
            type="radio"
            :show-confirm="false"
            v-model="value19"
            v-model:visible="show19"
            :columns="columns1"
            @confirm="handleConfirm"
          />
        </demo-group-item>
      </demo-group>
    </view>
    <wd-toast />
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import type { SelectPickerBeforeConfirm } from '@/uni_modules/wot-ui/components/wd-select-picker/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const columns1 = ref<Record<string, any>[]>([
  {
    value: '101',
    label: t('nan-zhuang')
  },
  {
    value: '102',
    label: t('she-chi-pin')
  },
  {
    value: '103',
    label: t('nv-zhuang')
  },
  {
    value: '104',
    label: t('xie-xue')
  },
  {
    value: '105',
    label: t('nei-yi-pei-shi')
  },
  {
    value: '106',
    label: t('xiang-bao')
  },
  {
    value: '107',
    label: t('mei-zhuang-hu-fu')
  },
  {
    value: '108',
    label: t('ge-xing-qing-jie')
  },
  {
    value: '109',
    label: t('zhong-biao-zhu-bao')
  },
  {
    value: '110',
    label: t('shou-ji')
  },
  {
    value: '111',
    label: t('shu-ma')
  },
  {
    value: '112',
    label: t('dian-nao-ban-gong')
  }
])
const columns2 = ref<Record<string, any>[]>([
  {
    value: '101',
    label: t('nan-zhuang-0'),
    disabled: true
  },
  {
    value: '102',
    label: t('she-chi-pin')
  },
  {
    value: '103',
    label: t('nv-zhuang-0')
  }
])
const value1 = ref<string[]>(['101'])
const value2 = ref<string>('101')
const value5 = ref<string[]>([])
const value6 = ref<string[]>([])
const value7 = ref<string[]>([])
const value9 = ref<string[]>([])
const value10 = ref<string[]>([])
const value13 = ref<string[]>(['102'])
const value18 = ref<string>('102')
const value19 = ref<string>('101')

const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show5 = ref<boolean>(false)
const show6 = ref<boolean>(false)
const show7 = ref<boolean>(false)
const show9 = ref<boolean>(false)
const show10 = ref<boolean>(false)
const show13 = ref<boolean>(false)
const show18 = ref<boolean>(false)
const show19 = ref<boolean>(false)

const toast = useToast()

/**
 * 获取多选的展示值
 */
function getDisplayValue(values: string[]) {
  if (!values || values.length === 0) return ''
  return values
    .map((val) => {
      const item = columns1.value.find((col) => col.value === val) || columns2.value.find((col) => col.value === val)
      return item ? item.label : val
    })
    .join(', ')
}

/**
 * 获取单选的展示值
 */
function getRadioDisplayValue(value: string) {
  if (!value) return ''
  const item = columns1.value.find((col) => col.value === value)
  return item ? item.label : value
}

const beforeConfirm: SelectPickerBeforeConfirm = (value) => {
  return new Promise<boolean>((resolve) => {
    if ((value as string[]).length > 0) {
      toast.error(t('zan-shi-wu-fa-xuan-ze-shang-pin'))
      resolve(false)
    } else {
      resolve(true)
    }
  })
}

function handleChange({ value }: any) {
  toast.show(t('xuan-ze-le') + value)
}
function handleConfirm({ value }: any) {
  console.log(value)
}
</script>
<style lang="scss" scoped>
.page-select-picker {
  :deep(.wd-cell-group) {
    margin-bottom: 0;
  }
}
</style>
