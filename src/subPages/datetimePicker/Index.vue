<template>
  <page-wraper>
    <view class="page-datetime-picker">
      <demo-group title="组件类型">
        <demo-group-item :title="$t('jiBenYongFa')" no-padding>
          <wd-cell-group border>
            <wd-cell
              title-width="33%"
              value-align="left"
              :title="$t('ri-qi-xuan-ze')"
              is-link
              placeholder="请选择"
              :value="value1"
              @click="show1 = true"
            />
            <wd-cell :title="$t('shi-jian-fan-wei-yi-nian')" is-link :value="formatDate(value17, 'datetime')" @click="show17 = true" />
          </wd-cell-group>
          <wd-datetime-picker v-model="value1" v-model:visible="show1" @confirm="handleConfirm1" />
          <wd-datetime-picker :minDate="minDate" :maxDate="maxDate" v-model="value17" v-model:visible="show17" @confirm="handleConfirm1" />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件状态">
        <demo-group-item title="before-confirm" no-padding>
          <wd-cell-group border>
            <wd-cell title="before-confirm" is-link :value="formatDate(value8, 'datetime')" @click="show8 = true" />
          </wd-cell-group>
          <wd-datetime-picker v-model="value8" v-model:visible="show8" :before-confirm="beforeConfirm" @confirm="handleConfirm8" />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件变体">
        <demo-group-item title="日期类型" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('ri-qi-xuan-ze-dai-miao')" is-link :value="formatDate(value18, 'datetime', true)" @click="show18 = true" />
            <wd-cell :title="$t('nian-yue-ri')" is-link :value="formatDate(value2, 'date')" @click="show2 = true" />
            <wd-cell :title="$t('nian-yue')" is-link :value="formatDate(value3, 'year-month')" @click="show3 = true" />
            <wd-cell :title="$t('nian')" is-link :value="formatDate(value16, 'year')" @click="show16 = true" />
            <wd-cell :title="$t('shi-fen')" is-link :value="value4" @click="show4 = true" />
            <wd-cell :title="$t('shi-jian-xuan-ze-dai-miao')" is-link :value="value19" @click="show19 = true" />
          </wd-cell-group>
          <wd-datetime-picker use-second v-model="value18" v-model:visible="show18" />
          <wd-datetime-picker v-model="value2" type="date" v-model:visible="show2" @confirm="handleConfirm2" />
          <wd-datetime-picker v-model="value3" type="year-month" v-model:visible="show3" @confirm="handleConfirm3" />
          <wd-datetime-picker v-model="value16" type="year" v-model:visible="show16" @confirm="handleConfirm16" />
          <wd-datetime-picker v-model="value4" type="time" v-model:visible="show4" @confirm="handleConfirm4" />
          <wd-datetime-picker v-model="value19" type="time" use-second v-model:visible="show19" />
        </demo-group-item>

        <demo-group-item :title="$t('qu-yu-xuan-ze')" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('ri-qi-xuan-ze-2')" is-link :value="formatRange(value14)" @click="show14 = true" />
            <wd-cell :title="$t('ri-qi-xuan-ze-3')" is-link :value="formatRange(value15)" @click="show15 = true" />
          </wd-cell-group>
          <wd-datetime-picker :title="$t('qing-xuan-ze-qu-jian')" v-model="value14" v-model:visible="show14" use-second @confirm="handleConfirm14" />
          <wd-datetime-picker
            v-model="value15"
            v-model:visible="show15"
            @confirm="handleConfirm15"
            :display-format-tab-label="displayFormatTabLabel"
          />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item title="展示格式与内部格式" no-padding>
          <wd-cell-group border>
            <wd-cell :title="$t('zhan-shi-ge-shi')" is-link :value="customDisplayFormat(value5)" @click="show5 = true" />
            <wd-cell :title="$t('nei-bu-ge-shi')" is-link :value="formatDate(value6, 'datetime')" @click="show6 = true" />
            <wd-cell :title="$t('guo-lv-xuan-xiang')" is-link :value="formatDate(value7, 'datetime')" @click="show7 = true" />
          </wd-cell-group>
          <wd-datetime-picker v-model="value5" v-model:visible="show5" @confirm="handleConfirm5" />
          <wd-datetime-picker v-model="value6" v-model:visible="show6" :formatter="formatter" @confirm="handleConfirm6" />
          <wd-datetime-picker v-model="value7" v-model:visible="show7" :filter="filter" @confirm="handleConfirm7" />
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import type { DatetimePickerViewFilter, DatetimePickerViewFormatter } from '@/uni_modules/wot-ui/components/wd-datetime-picker-view/types'
import type { DatetimePickerDisplayFormatTabLabel } from '@/uni_modules/wot-ui/components/wd-datetime-picker/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { isArray } from '@/uni_modules/wot-ui/common/util'
const { t } = useI18n()

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show8 = ref(false)
const show14 = ref(false)
const show15 = ref(false)
const show16 = ref(false)
const show17 = ref(false)
const show18 = ref(false)
const show19 = ref(false)

const value1 = ref<string>('')
const value2 = ref<number>(Date.now())
const value3 = ref<number>(Date.now())
const value4 = ref<string>('09:20')
const value5 = ref<number>(Date.now())
const value6 = ref<number>(Date.now())
const value7 = ref<number>(Date.now())
const value8 = ref<number>(Date.now())
const value14 = ref<any[]>(['', ''])
const value15 = ref<any[]>(['', Date.now()])
const value16 = ref(Date.now())
const value17 = ref(Date.now())
const value18 = ref(Date.now())
const value19 = ref('09:20:26')
const minDate = ref<number>(Date.now())
const now = new Date()
const maxDate = ref<number>(new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()).getTime())

const formatter: DatetimePickerViewFormatter = (type, value) => {
  let formatValue = ''

  switch (type) {
    case 'year':
      formatValue = value + t('nian-0')
      break
    case 'month':
      formatValue = value + t('yue')
      break
    case 'date':
      formatValue = value + t('ri')
      break
    case 'hour':
      formatValue = value + t('shi')
      break
    case 'minute':
      formatValue = value + t('fen')
      break
  }
  return formatValue
}
const filter: DatetimePickerViewFilter = ({ type, values }) => {
  if (type === 'minute') {
    return values.filter((value) => value % 5 === 0)
  }
  return values
}

const toast = useToast()
const beforeConfirm = (value: number | string | (number | string)[]) => {
  return new Promise<boolean>((resolve) => {
    toast.loading('处理中...')
    setTimeout(() => {
      if ((value as number) > Date.now()) {
        toast.close()
        toast.error(t('bu-neng-xuan-ze-da-yu-jin-tian-de-ri-qi'))
        resolve(false)
      } else {
        toast.close()
        resolve(true)
      }
    }, 2000)
  })
}
const displayFormatTabLabel: DatetimePickerDisplayFormatTabLabel = (items) => {
  return t('items0label-nian-items1label-yue-items2label-ri-items3labelitems4label', [
    items[0].label,
    items[1].label,
    items[2].label,
    items[3].label,
    items[4].label
  ])
}

function formatDate(value: string | number, type: string, useSecond: boolean = false) {
  if (!value) return ''
  const date = dayjs(value)
  switch (type) {
    case 'date':
      return date.format('YYYY-MM-DD')
    case 'year-month':
      return date.format('YYYY-MM')
    case 'year':
      return date.format('YYYY')
    case 'datetime':
      return date.format(useSecond ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm')
    case 'time':
      return value
    default:
      return ''
  }
}

function formatRange(value: any[]) {
  if (!isArray(value)) return ''
  const [start, end] = value
  if (!start && !end) return ''
  return `${start ? dayjs(start).format('YYYY-MM-DD HH:mm:ss') : ''} - ${end ? dayjs(end).format('YYYY-MM-DD HH:mm:ss') : ''}`
}

function customDisplayFormat(value: any) {
  if (!value) return ''
  const date = dayjs(value)
  return t('items0label-nian-items1label-yue-items2label-ri-items3labelitems4label-0', [
    date.format('YYYY'),
    date.format('MM'),
    date.format('DD'),
    date.format('HH'),
    date.format('mm')
  ])
}

function handleConfirm1({ value }: any) {
  console.log(new Date(value))
}
function handleConfirm2({ value }: any) {
  console.log(value)
}
function handleConfirm3({ value }: any) {
  console.log(value)
}
function handleConfirm4({ value }: any) {
  console.log(value)
}
function handleConfirm5({ value }: any) {
  console.log(value)
}
function handleConfirm6({ value }: any) {
  console.log(value)
}
function handleConfirm7({ value }: any) {
  console.log(value)
}

function handleConfirm8({ value }: any) {
  console.log(value)
}
function handleConfirm14({ value }: any) {
  console.log(value)
}
function handleConfirm15({ value }: any) {
  console.log(value)
}
function handleConfirm16({ value }: any) {
  console.log(value)
}
</script>
<style lang="scss" scoped>
.is-error {
  color: var(--wot-input-error-color, #f56c6c);
}
.wd-datetime-picker__clear {
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
