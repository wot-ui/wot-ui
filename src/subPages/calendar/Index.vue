<template>
  <page-wraper>
    <view class="page-calendar">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <wd-cell-group border>
          <wd-cell :title="$t('dan-ge-ri-qi-xuan-ze')" :value="formatValue(value1, 'date')" is-link @click="show1 = true" />
        </wd-cell-group>
        <wd-calendar v-model="value1" v-model:visible="show1" @confirm="handleConfirm1" :switch-mode="switchMode" />

        <wd-cell-group border>
          <wd-cell :title="$t('duo-ge-ri-qi-xuan-ze')" :value="formatValue(value2, 'dates')" is-link @click="show2 = true" />
        </wd-cell-group>
        <wd-calendar type="dates" v-model="value2" v-model:visible="show2" @confirm="handleConfirm2" :switch-mode="switchMode" />

        <wd-cell-group border>
          <wd-cell :title="$t('ri-qi-fan-wei-xuan-ze')" :value="formatValue(value3, 'daterange')" is-link @click="show3 = true" />
        </wd-cell-group>
        <wd-calendar type="daterange" v-model="value3" v-model:visible="show3" :switch-mode="switchMode" />

        <wd-cell-group border>
          <wd-cell :title="$t('ri-qi-shi-jian-xuan-ze')" :value="formatValue(value4, 'datetime')" is-link @click="show4 = true" />
        </wd-cell-group>
        <wd-calendar type="datetime" v-model="value4" v-model:visible="show4" :switch-mode="switchMode" />

        <wd-cell-group border>
          <wd-cell :title="$t('ri-qi-shi-jian-fan-wei-xuan-ze')" :value="formatValue(value5, 'datetimerange')" is-link @click="show5 = true" />
        </wd-cell-group>
        <wd-calendar type="datetimerange" v-model="value5" v-model:visible="show5" :switch-mode="switchMode" />

        <wd-cell-group border>
          <wd-cell :title="$t('zhou-xuan-ze')" :value="formatValue(value6, 'week')" is-link @click="show6 = true" />
        </wd-cell-group>
        <wd-calendar type="week" v-model="value6" v-model:visible="show6" :switch-mode="switchMode" />

        <wd-cell-group border>
          <wd-cell :title="$t('yue-xuan-ze')" :value="formatValue(value7, 'month')" is-link @click="show7 = true" />
        </wd-cell-group>
        <wd-calendar type="month" :min-date="minDate" v-model="value7" v-model:visible="show7" :switch-mode="switchMode" />

        <wd-cell-group border>
          <wd-cell :title="$t('zhou-fan-wei-xuan-ze')" :value="formatValue(value8, 'weekrange')" is-link @click="show8 = true" />
        </wd-cell-group>
        <wd-calendar :first-day-of-week="1" type="weekrange" v-model="value8" v-model:visible="show8" :switch-mode="switchMode" />

        <wd-cell-group border>
          <wd-cell :title="$t('yue-fan-wei-xuan-ze')" :value="formatValue(value9, 'monthrange')" is-link @click="show9 = true" />
        </wd-cell-group>
        <wd-calendar type="monthrange" v-model="value9" v-model:visible="show9" :switch-mode="switchMode" />
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <wd-cell-group border>
          <wd-cell :title="$t('kuai-jie-cao-zuo')" :value="formatValue(value16, 'date')" is-link @click="show16 = true" />
        </wd-cell-group>
        <wd-calendar v-model="value16" v-model:visible="show16" :show-confirm="false" :switch-mode="switchMode" />

        <wd-cell-group border>
          <wd-cell title="before-confirm" :value="formatValue(value14, 'date')" is-link @click="show14 = true" />
        </wd-cell-group>
        <wd-calendar v-model="value14" v-model:visible="show14" :before-confirm="beforeConfirm" :switch-mode="switchMode" />
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('qie-huan-mo-shi')">
          <wd-radio-group v-model="switchMode" type="button">
            <wd-radio value="none">none</wd-radio>
            <wd-radio value="month">month</wd-radio>
            <wd-radio value="year-month">year-month</wd-radio>
          </wd-radio-group>
        </demo-group-item>

        <wd-cell-group border>
          <wd-cell :title="$t('ri-zhou-yue-qie-huan')" :value="formatValue(value10, 'date')" is-link @click="show10 = true" />
        </wd-cell-group>
        <wd-calendar :first-day-of-week="1" show-type-switch v-model="value10" v-model:visible="show10" :switch-mode="switchMode" />
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <wd-cell-group border>
          <wd-cell :title="$t('ri-qi-ge-shi-hua')" :value="formatValue(value11, 'daterange')" is-link @click="show11 = true" />
        </wd-cell-group>
        <wd-calendar type="daterange" v-model="value11" v-model:visible="show11" :formatter="formatter" :switch-mode="switchMode" />

        <wd-cell-group border>
          <wd-cell :title="$t('zi-ding-yi-zhan-shi')" :value="displayFormat(value13)" is-link @click="show13 = true" />
        </wd-cell-group>
        <wd-calendar
          type="daterange"
          v-model="value13"
          v-model:visible="show13"
          :inner-display-format="innerDisplayFormat"
          :switch-mode="switchMode"
        />
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <wd-cell-group border>
          <wd-cell :title="$t('kuai-jie-xuan-xiang')" :value="formatValue(value12, 'daterange')" is-link @click="show12 = true" />
        </wd-cell-group>
        <wd-calendar
          :shortcuts="shortcuts"
          :on-shortcuts-click="onShortcutsClick"
          type="daterange"
          v-model="value12"
          v-model:visible="show12"
          @confirm="handleConfirm3"
          :switch-mode="switchMode"
        />

        <wd-cell-group border>
          <wd-cell :title="$t('tuo-zhan-que-ding-qu-yu')" :value="formatValue(value19, 'date')" is-link @click="show19 = true" />
        </wd-cell-group>
        <wd-calendar v-model="value19" v-model:visible="show19" :switch-mode="switchMode">
          <template #confirm-right>
            <wd-button block plain custom-style="margin-left: 10px;" @click="selectToday">{{ $t('xuan-ze-jin-tian') }}</wd-button>
          </template>
        </wd-calendar>
      </demo-group>
    </view>
  </page-wraper>
  <wd-toast />

  <wd-dialog />
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import dayjs from 'dayjs'
import type { CalendarDayItem, CalendarFormatter } from '@/uni_modules/wot-ui/components/wd-calendar-view/types'
import type { CalendarBeforeConfirm, CalendarOnShortcutsClickOption } from '@/uni_modules/wot-ui/components/wd-calendar/types'
import { nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getWeekNumber } from '@/uni_modules/wot-ui/components/wd-calendar-view/utils'
import { padZero } from '@/uni_modules/wot-ui/common/util'

const { t } = useI18n()

const now = new Date()
const minDate = ref<number>(new Date(now.getFullYear() - 20, now.getMonth() - 6, now.getDate()).getTime())
const switchMode = ref<any>('none')

const value1 = ref<number>(Date.now())
const value2 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()])
const value3 = ref<number[]>([])
const value4 = ref<number>(Date.now())
const value5 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000])
const value6 = ref<number>(Date.now())
const value7 = ref<number>(Date.now())
const value8 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 14, Date.now()])
const value9 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 33, Date.now()])
const value10 = ref<number>(Date.now())
const value11 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()])
const value12 = ref<number[]>([])
const value13 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()])
const value14 = ref<number | null>(null)
const value16 = ref<number>(Date.now())
const value19 = ref<number>(Date.now())

const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show3 = ref<boolean>(false)
const show4 = ref<boolean>(false)
const show5 = ref<boolean>(false)
const show6 = ref<boolean>(false)
const show7 = ref<boolean>(false)
const show8 = ref<boolean>(false)
const show9 = ref<boolean>(false)
const show10 = ref<boolean>(false)
const show11 = ref<boolean>(false)
const show12 = ref<boolean>(false)
const show13 = ref<boolean>(false)
const show14 = ref<boolean>(false)
const show16 = ref<boolean>(false)
const show19 = ref<boolean>(false)

const formatter: CalendarFormatter = (day: CalendarDayItem) => {
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
const shortcuts = ref<Record<string, any>[]>([
  {
    text: t('jin-7-tian'),
    id: 7
  },
  {
    text: t('jin-15-tian'),
    id: 15
  },
  {
    text: t('jin-30-tian'),
    id: 30
  }
])

const getToday = <R extends boolean = false>(range?: R): R extends true ? [number, number] : number => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  if (!range) {
    return now.getTime() as any
  }
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)
  return [now.getTime(), end.getTime()] as any
}

function selectToday() {
  value19.value = Date.now()
  nextTick(() => {
    value19.value = getToday(false)
  })
}

const toast = useToast()
const onShortcutsClick = ({ item }: CalendarOnShortcutsClickOption) => {
  const dayDiff = item.id
  const endDate = Date.now() - 24 * 60 * 60 * 1000
  const startDate = endDate - dayDiff * 24 * 60 * 60 * 1000

  return [startDate, endDate]
}
const displayFormat = (value: any) => {
  return dayjs(value[0]).format(t('yy-nian-mm-yue-dd-ri')) + ' - ' + dayjs(value[1]).format(t('yy-nian-mm-yue-dd-ri-0'))
}
const innerDisplayFormat = (value: string | number | Date | undefined, rangeType: string) => {
  if (!value) {
    return rangeType === 'start' ? t('huo-dong-kai-shi-shi-jian') : t('huo-dong-jie-shu-shi-jian')
  }

  return dayjs(value).format(t('yy-nian-mm-yue-dd-ri-1'))
}
const beforeConfirm: CalendarBeforeConfirm = (value) => {
  if (typeof value === 'number' && value > Date.now()) {
    toast.error(t('gai-ri-qi-zan-wu-shu-ju'))
    return false
  }
  return true
}

function handleConfirm1({ value }: any) {
  console.log(value)
}
function handleConfirm2({ value }: any) {
  console.log(value)
}
function handleConfirm3({ value }: any) {
  console.log(value)
}

function formatValue(value: any, type: string) {
  if (!value) return ''
  switch (type) {
    case 'date':
      return dayjs(value).format('YYYY-MM-DD')
    case 'dates':
      return (value || []).map((item: number) => dayjs(item).format('YYYY-MM-DD')).join(', ')
    case 'daterange':
      if (!Array.isArray(value)) return ''
      return `${value[0] ? dayjs(value[0]).format('YYYY-MM-DD') : ''} - ${value[1] ? dayjs(value[1]).format('YYYY-MM-DD') : ''}`
    case 'datetime':
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    case 'datetimerange':
      if (!Array.isArray(value)) return ''
      return `${value[0] ? dayjs(value[0]).format('YYYY-MM-DD HH:mm:ss') : ''} - ${value[1] ? dayjs(value[1]).format('YYYY-MM-DD HH:mm:ss') : ''}`
    case 'week': {
      const date = new Date(value)
      const year = date.getFullYear()
      const week = getWeekNumber(value)
      return t('year-di-padzeroweek-zhou', year, padZero(week))
    }
    case 'month':
      return dayjs(value).format('YYYY-MM')
    case 'weekrange': {
      if (!Array.isArray(value)) return ''
      const date1 = new Date(value[0])
      const year1 = date1.getFullYear()
      const week1 = getWeekNumber(value[0])
      const date2 = new Date(value[1])
      const year2 = date2.getFullYear()
      const week2 = getWeekNumber(value[1])
      return t('year1-di-padzeroweek1-zhou-year2-di-padzeroweek2-zhou', year1, padZero(week1), year2, padZero(week2))
    }
    case 'monthrange':
      if (!Array.isArray(value)) return ''
      return `${value[0] ? dayjs(value[0]).format('YYYY-MM') : ''} - ${value[1] ? dayjs(value[1]).format('YYYY-MM') : ''}`
    default:
      return ''
  }
}
</script>
<style lang="scss" scoped></style>
