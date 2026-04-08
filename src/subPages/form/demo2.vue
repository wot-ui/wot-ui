<template>
  <page-wraper>
    <demo-block :title="$t('xiao-yan-shi-ji-zong-he-shi-li')" transparent>
      <wd-form ref="form" :model="model" :schema="activeSchema" validate-trigger="change" :reset-on-change="false" :title-width="120">
        <wd-cell-group custom-class="group" :title="$t('pei-zhi')">
          <wd-form-item :title="$t('xiao-yan-yin-qing')" value-align="left">
            <wd-switch v-model="useZodSchema" size="20" active-text="Zod" inactive-text="自定义" />
          </wd-form-item>
          <wd-form-item :title="$t('chu-fa-shuo-ming')" value-align="left">
            <text class="tip-text">{{ $t('biao-dan-ji-change-zi-duan-fu-gai-blurchangesubmit') }}</text>
          </wd-form-item>
        </wd-cell-group>

        <wd-cell-group custom-class="group" :title="$t('shu-ru-lei-zi-duan')">
          <wd-form-item :title="$t('jinechange')" prop="amount">
            <wd-input-number v-model="model.amount" :min="0" :update-on-init="false" :max="9999" />
          </wd-form-item>
          <wd-form-item :title="$t('bei-zhu-change')" prop="remark">
            <wd-textarea v-model="model.remark" :placeholder="$t('qing-shu-ru-zhi-shao-4-ge-zi')" auto-height :maxlength="50" show-word-limit />
          </wd-form-item>
          <wd-form-item :title="$t('zhang-hao-blur')" prop="account" validate-trigger="blur">
            <wd-input v-model="model.account" clearable :placeholder="$t('shi-jiao-hou-chu-fa-xiao-yan')" />
          </wd-form-item>
          <wd-form-item :title="$t('yao-qing-ma-change')" prop="inviteCode" validate-trigger="change">
            <wd-input v-model="model.inviteCode" clearable :placeholder="$t('zhi-bian-hua-hou-chu-fa-xiao-yan')" />
          </wd-form-item>
          <wd-form-item :title="$t('cheng-shi-submit')" prop="city" validate-trigger="submit">
            <wd-input v-model="model.city" clearable :placeholder="$t('jin-ti-jiao-shi-chu-fa-xiao-yan')" />
          </wd-form-item>
        </wd-cell-group>

        <wd-cell-group custom-class="group" :title="$t('picker-zi-duan-change')">
          <wd-form-item
            :title="$t('tui-guang-ping-tai')"
            prop="platform"
            is-link
            :value="platformText"
            :placeholder="$t('qing-xuan-ze-tui-guang-ping-tai')"
            @click="showPlatformPicker = true"
          />
          <wd-form-item
            :title="$t('you-hui-fang-shi')"
            prop="promotion"
            is-link
            :value="promotionText"
            :placeholder="$t('qing-xuan-ze-you-hui-fang-shi')"
            @click="showPromotionPicker = true"
          />
          <wd-form-item
            :title="$t('shi-jian')"
            prop="time"
            is-link
            :value="timeText"
            :placeholder="$t('qing-xuan-ze-shi-jian-0')"
            @click="showTimePicker = true"
          />
          <wd-form-item
            :title="$t('ri-qi')"
            prop="date"
            is-link
            :value="dateText"
            :placeholder="$t('qing-xuan-ze-ri-qi-0')"
            @click="showDatePicker = true"
          />
        </wd-cell-group>

        <view class="footer">
          <wd-button type="primary" @click="handleSubmit" block>{{ $t('ti-jiao-bing-xiao-yan') }}</wd-button>
        </view>
      </wd-form>
    </demo-block>

    <wd-select-picker
      v-model="model.platform"
      v-model:visible="showPlatformPicker"
      :columns="platformList"
      :placeholder="$t('qing-xuan-ze-tui-guang-ping-tai')"
    />
    <wd-picker
      v-model="model.promotion"
      v-model:visible="showPromotionPicker"
      :columns="promotionList"
      :placeholder="$t('qing-xuan-ze-you-hui-fang-shi')"
    />
    <wd-datetime-picker v-model="model.time" v-model:visible="showTimePicker" :placeholder="$t('qing-xuan-ze-shi-jian-0')" />
    <wd-calendar v-model="model.date" v-model:visible="showDatePicker" :placeholder="$t('qing-xuan-ze-ri-qi-0')" />
  </page-wraper>
</template>

<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance, FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'
import dayjs from 'dayjs'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

const { t } = useI18n()

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
      issues.push({ path: ['amount'], message: t('qing-shu-ru-da-yu-0-de-jin-e') })
    }
    if (!formModel.remark || String(formModel.remark).trim().length < 4) {
      issues.push({ path: ['remark'], message: t('bei-zhu-zhi-shao-shu-ru-4-ge-zi') })
    }
    if (!formModel.account || formModel.account.length < 3) {
      issues.push({ path: ['account'], message: t('zhang-hao-zhi-shao-3-wei') })
    }
    if (!formModel.inviteCode) {
      issues.push({ path: ['inviteCode'], message: t('qing-shu-ru-yao-qing-ma') })
    }
    if (!formModel.city) {
      issues.push({ path: ['city'], message: t('qing-shu-ru-cheng-shi') })
    }
    if (!Array.isArray(formModel.platform) || !formModel.platform.length) {
      issues.push({ path: ['platform'], message: t('qing-xuan-ze-tui-guang-ping-tai') })
    }
    if (!Array.isArray(formModel.promotion) || !formModel.promotion.length) {
      issues.push({ path: ['promotion'], message: t('qing-xuan-ze-you-hui-fang-shi') })
    }
    if (!formModel.time) {
      issues.push({ path: ['time'], message: t('qing-xuan-ze-shi-jian-0') })
    }
    if (!formModel.date) {
      issues.push({ path: ['date'], message: t('qing-xuan-ze-ri-qi-0') })
    }
    return issues
  },
  isRequired(path: string) {
    return requiredFields.has(path)
  }
}

const zodSchema: FormSchema = zodAdapter(
  z.object({
    amount: z.union([z.string(), z.number()]).refine((value) => value !== '' && Number(value) > 0, t('qing-shu-ru-da-yu-0-de-jin-e-0')),
    remark: z.string().refine((value) => value.trim().length >= 4, t('bei-zhu-zhi-shao-shu-ru-4-ge-zi-0')),
    account: z.string().min(3, t('zhang-hao-zhi-shao-3-wei-0')),
    inviteCode: z.string().min(1, t('qing-shu-ru-yao-qing-ma-0')),
    city: z.string().min(1, t('qing-shu-ru-cheng-shi-0')),
    platform: z.array(z.string()).min(1, t('qing-xuan-ze-tui-guang-ping-tai')),
    promotion: z.array(z.string()).min(1, t('qing-xuan-ze-you-hui-fang-shi')),
    time: z.union([z.string(), z.number()]).refine((value) => !!value, t('qing-xuan-ze-shi-jian-0')),
    date: z.union([z.number(), z.null()]).refine((value) => !!value, t('qing-xuan-ze-ri-qi-0'))
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
  { value: '1', label: t('jing-dong') },
  { value: '2', label: t('wei-xin') },
  { value: '3', label: t('dou-yin') }
])

const promotionList = ref([
  { value: '1', label: t('man-jian') },
  { value: '2', label: t('wu-men-jian') }
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
      showSuccess(t('xiao-yan-tong-guo'))
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
