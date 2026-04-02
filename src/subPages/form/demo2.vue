<template>
  <page-wraper>
    <demo-block title="校验时机综合示例" transparent>
      <wd-form ref="form" :model="model" :schema="activeSchema" validate-trigger="change" :reset-on-change="false" :title-width="120">
        <wd-cell-group custom-class="group" title="配置">
          <wd-form-item title="校验引擎" value-align="left">
            <wd-switch v-model="useZodSchema" size="20" active-text="Zod" inactive-text="自定义" />
          </wd-form-item>
          <wd-form-item title="触发说明" value-align="left">
            <text class="tip-text">表单级 change，字段覆盖：blur/change/submit</text>
          </wd-form-item>
        </wd-cell-group>

        <wd-cell-group custom-class="group" title="输入类字段">
          <wd-form-item title="金额（change）" prop="amount">
            <wd-input-number v-model="model.amount" :min="0" :update-on-init="false" :max="9999" />
          </wd-form-item>
          <wd-form-item title="备注（change）" prop="remark">
            <wd-textarea v-model="model.remark" placeholder="请输入至少 4 个字" auto-height :maxlength="50" show-word-limit />
          </wd-form-item>
          <wd-form-item title="账号（blur）" prop="account" validate-trigger="blur">
            <wd-input v-model="model.account" clearable placeholder="失焦后触发校验" />
          </wd-form-item>
          <wd-form-item title="邀请码（change）" prop="inviteCode" validate-trigger="change">
            <wd-input v-model="model.inviteCode" clearable placeholder="值变化后触发校验" />
          </wd-form-item>
          <wd-form-item title="城市（submit）" prop="city" validate-trigger="submit">
            <wd-input v-model="model.city" clearable placeholder="仅提交时触发校验" />
          </wd-form-item>
        </wd-cell-group>

        <wd-cell-group custom-class="group" title="Picker 字段（change）">
          <wd-form-item
            title="推广平台"
            prop="platform"
            is-link
            :value="platformText"
            placeholder="请选择推广平台"
            @click="showPlatformPicker = true"
          />
          <wd-form-item
            title="优惠方式"
            prop="promotion"
            is-link
            :value="promotionText"
            placeholder="请选择优惠方式"
            @click="showPromotionPicker = true"
          />
          <wd-form-item title="时间" prop="time" is-link :value="timeText" placeholder="请选择时间" @click="showTimePicker = true" />
          <wd-form-item title="日期" prop="date" is-link :value="dateText" placeholder="请选择日期" @click="showDatePicker = true" />
        </wd-cell-group>

        <view class="footer">
          <wd-button type="primary" @click="handleSubmit" block>提交并校验</wd-button>
        </view>
      </wd-form>
    </demo-block>

    <wd-select-picker v-model="model.platform" v-model:visible="showPlatformPicker" :columns="platformList" placeholder="请选择推广平台" />
    <wd-picker v-model="model.promotion" v-model:visible="showPromotionPicker" :columns="promotionList" placeholder="请选择优惠方式" />
    <wd-datetime-picker v-model="model.time" v-model:visible="showTimePicker" placeholder="请选择时间" />
    <wd-calendar v-model="model.date" v-model:visible="showDatePicker" placeholder="请选择日期" />
  </page-wraper>
</template>

<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance, FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'
import dayjs from 'dayjs'
import { computed, reactive, ref, watch } from 'vue'
import { z } from 'zod'

const { success: showSuccess } = useToast()

const form = ref<FormInstance>()
const useZodSchema = ref(true)
const showPlatformPicker = ref(false)
const showPromotionPicker = ref(false)
const showTimePicker = ref(false)
const showDatePicker = ref(false)

const model = reactive<{
  amount: number | string
  remark: string
  account: string
  inviteCode: string
  city: string
  platform: string[]
  promotion: string[]
  time: number | string
  date: number | null
}>({
  amount: '',
  remark: '',
  account: '',
  inviteCode: '',
  city: '',
  platform: [],
  promotion: [],
  time: '',
  date: null
})

const requiredFields = new Set(['amount', 'remark', 'account', 'inviteCode', 'city', 'platform', 'promotion', 'time', 'date'])

const customSchema: FormSchema = {
  validate(formModel) {
    const issues = []
    if (formModel.amount === '' || Number(formModel.amount) <= 0) {
      issues.push({ path: ['amount'], message: '请输入大于 0 的金额' })
    }
    if (!formModel.remark || String(formModel.remark).trim().length < 4) {
      issues.push({ path: ['remark'], message: '备注至少输入 4 个字' })
    }
    if (!formModel.account || formModel.account.length < 3) {
      issues.push({ path: ['account'], message: '账号至少 3 位' })
    }
    if (!formModel.inviteCode) {
      issues.push({ path: ['inviteCode'], message: '请输入邀请码' })
    }
    if (!formModel.city) {
      issues.push({ path: ['city'], message: '请输入城市' })
    }
    if (!Array.isArray(formModel.platform) || !formModel.platform.length) {
      issues.push({ path: ['platform'], message: '请选择推广平台' })
    }
    if (!Array.isArray(formModel.promotion) || !formModel.promotion.length) {
      issues.push({ path: ['promotion'], message: '请选择优惠方式' })
    }
    if (!formModel.time) {
      issues.push({ path: ['time'], message: '请选择时间' })
    }
    if (!formModel.date) {
      issues.push({ path: ['date'], message: '请选择日期' })
    }
    return issues
  },
  isRequired(path: string) {
    return requiredFields.has(path)
  }
}

const zodSchema: FormSchema = zodAdapter(
  z.object({
    amount: z.union([z.string(), z.number()]).refine((value) => value !== '' && Number(value) > 0, '请输入大于 0 的金额'),
    remark: z.string().refine((value) => value.trim().length >= 4, '备注至少输入 4 个字'),
    account: z.string().min(3, '账号至少 3 位'),
    inviteCode: z.string().min(1, '请输入邀请码'),
    city: z.string().min(1, '请输入城市'),
    platform: z.array(z.string()).min(1, '请选择推广平台'),
    promotion: z.array(z.string()).min(1, '请选择优惠方式'),
    time: z.union([z.string(), z.number()]).refine((value) => !!value, '请选择时间'),
    date: z.union([z.number(), z.null()]).refine((value) => !!value, '请选择日期')
  }),
  {
    isRequired(path: string) {
      return requiredFields.has(path)
    }
  }
)

const activeSchema = computed<FormSchema>(() => {
  return useZodSchema.value ? zodSchema : customSchema
})

const platformList = ref([
  { value: '1', label: '京东' },
  { value: '2', label: '微信' },
  { value: '3', label: '抖音' }
])

const promotionList = ref([
  { value: '1', label: '满减' },
  { value: '2', label: '无门槛' }
])

const platformText = computed(() => {
  if (!model.platform.length) return ''
  return model.platform
    .map((value) => {
      const item = platformList.value.find((option) => option.value === value)
      return item ? item.label : value
    })
    .join('、')
})

const promotionText = computed(() => {
  if (!model.promotion.length) return ''
  return model.promotion
    .map((value) => {
      const item = promotionList.value.find((option) => option.value === value)
      return item ? item.label : value
    })
    .join('、')
})

const timeText = computed(() => {
  if (!model.time) return ''
  if (typeof model.time === 'number') {
    return dayjs(model.time).format('YYYY-MM-DD HH:mm')
  }
  return model.time
})

const dateText = computed(() => {
  if (!model.date) return ''
  return dayjs(model.date).format('YYYY-MM-DD')
})

watch(
  () => useZodSchema.value,
  () => {
    form.value?.reset()
  }
)

function handleSubmit() {
  form.value?.validate().then(({ valid }) => {
    if (valid) {
      showSuccess('校验通过')
    }
  })
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 16px;
}

.tip-text {
  color: #666;
  font-size: 14px;
}

:deep(.group) {
  &:not(:first-child) {
    margin-top: 12px;
  }
}
</style>
