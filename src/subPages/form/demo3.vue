<template>
  <page-wraper>
    <wd-select-picker
      v-model="model.platform"
      v-model:visible="showPlatformPicker"
      :columns="platformList"
      :placeholder="$t('qing-xuan-ze-tui-guang-ping-tai')"
    />
    <wd-picker
      v-model="model.promotion"
      v-model:visible="showPromotionPicker"
      :columns="promotionlist"
      :placeholder="$t('qing-xuan-ze-you-hui-fang-shi')"
    />
    <wd-datetime-picker v-model="model.time" v-model:visible="showTimePicker" :placeholder="$t('qing-xuan-ze-shi-jian')" />
    <wd-calendar v-model="model.date" v-model:visible="showDatePicker" :placeholder="$t('qing-xuan-ze-ri-qi')" />
    <wd-cascader
      v-model="model.address"
      v-model:visible="showAddressPicker"
      :placeholder="$t('qing-xuan-ze-di-zhi')"
      :options="area"
      @confirm="handleAddressConfirm"
    />
    <wd-dialog />
    <wd-form ref="form" :model="model" :schema="activeSchema" :title-width="100" :layout="formItemLayout" border asterisk-position="end">
      <wd-cell-group custom-class="group" title="布局切换示例">
        <wd-form-item title="表单项布局" value-align="left">
          <wd-switch size="20" v-model="isVerticalLayout" />
          <text class="layout-tip">{{ isVerticalLayout ? '上下布局' : '左右布局' }}</text>
        </wd-form-item>
        <wd-form-item title="校验引擎" value-align="left">
          <wd-switch size="20" v-model="useZodSchema" active-text="Zod" inactive-text="自定义" />
        </wd-form-item>
      </wd-cell-group>
      <wd-cell-group custom-class="group" :title="$t('ji-chu-xin-xi')">
        <wd-form-item :title="$t('you-hui-quan-ming-cheng')" prop="couponName" required>
          <wd-input
            :maxlength="20"
            show-word-limit
            suffix-icon="question-circle"
            v-model="model.couponName"
            :placeholder="$t('qing-shu-ru-you-hui-quan-ming-cheng')"
            @clicksuffixicon="handleIconClick"
            compact
          />
        </wd-form-item>
        <wd-form-item
          ellipsis
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
        <wd-form-item prop="threshold" :title="$t('quan-mian-e')" required title-width="100px" custom-value-class="cell-left">
          <view style="text-align: left">
            <view class="inline-txt" style="margin-left: 0">{{ $t('man') }}</view>
            <wd-input
              compact
              custom-style="display: inline-block; width: 70px; vertical-align: middle"
              :placeholder="$t('qing-shu-ru-jin-e-0')"
              v-model="model.threshold"
            />
            <view class="inline-txt">{{ $t('jian') }}</view>
            <wd-input
              compact
              custom-style="display: inline-block; width: 70px; vertical-align: middle"
              :placeholder="$t('qing-shu-ru-jin-e-0')"
              v-model="model.price"
            />
          </view>
        </wd-form-item>
      </wd-cell-group>
      <wd-cell-group custom-class="group" :title="$t('shi-jian-he-di-zhi')">
        <wd-form-item
          :title="$t('shi-jian')"
          prop="time"
          is-link
          :value="timeText"
          :placeholder="$t('qing-xuan-ze-shi-jian')"
          @click="showTimePicker = true"
        />
        <wd-form-item
          :title="$t('ri-qi')"
          prop="date"
          is-link
          :value="dateText"
          :placeholder="$t('qing-xuan-ze-ri-qi')"
          @click="showDatePicker = true"
        />
        <wd-form-item
          :title="$t('di-zhi')"
          prop="address"
          is-link
          :value="addressText"
          :placeholder="$t('qing-xuan-ze-di-zhi')"
          @click="showAddressPicker = true"
        />
      </wd-cell-group>
      <wd-cell-group custom-class="group" :title="$t('qi-ta-xin-xi')">
        <wd-form-item :title="$t('huo-dong-xi-ze')" prop="content">
          <wd-textarea
            type="textarea"
            v-model="model.content"
            :maxlength="300"
            show-word-limit
            :placeholder="$t('qing-shu-ru-huo-dong-xi-ze-xin-xi')"
            clearable
            auto-height
            compact
          />
        </wd-form-item>
        <wd-form-item :title="$t('fa-huo-shu-liang')" title-width="100px" prop="count" value-align="left">
          <wd-input-number v-model="model.count" />
        </wd-form-item>
        <wd-form-item :title="$t('kai-qi-zhe-kou')" title-width="100px" prop="switchVal" value-align="left" center>
          <wd-switch v-model="model.switchVal" size="20" />
        </wd-form-item>
        <wd-form-item v-if="model.switchVal" :title="$t('zhe-kou')" prop="discount">
          <wd-input :placeholder="$t('qing-shu-ru-you-hui-jin-e')" clearable v-model="model.discount" compact />
        </wd-form-item>
        <wd-form-item :title="$t('wai-bi-ba-bu')" prop="cardId">
          <wd-input suffix-icon="camera" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')" clearable v-model="model.cardId" compact />
        </wd-form-item>
        <wd-form-item :title="$t('ma-ka-ba-ka')" prop="phone">
          <wd-input :placeholder="$t('qing-shu-ru-ma-ka-ba-ka')" clearable v-model="model.phone" compact />
        </wd-form-item>
        <wd-form-item :title="$t('huo-dong-tu-pian')" title-width="100px" prop="fileList">
          <wd-upload :file-list="model.fileList" action="https://69bd04402bc2a25b22ad0a49.mockapi.io/upload" @change="handleFileChange"></wd-upload>
        </wd-form-item>
      </wd-cell-group>
      <wd-cell-group custom-class="group" title="组合示例">
        <wd-form-item title="投放优先级" prop="priority">
          <wd-radio-group v-model="model.priority" direction="horizontal">
            <wd-radio :value="1">高</wd-radio>
            <wd-radio :value="2">中</wd-radio>
            <wd-radio :value="3">低</wd-radio>
          </wd-radio-group>
        </wd-form-item>
        <wd-form-item title="投放标签" prop="tags">
          <wd-checkbox-group v-model="model.tags" direction="horizontal">
            <wd-checkbox :name="1">新品</wd-checkbox>
            <wd-checkbox :name="2">爆款</wd-checkbox>
            <wd-checkbox :name="3">清仓</wd-checkbox>
          </wd-checkbox-group>
        </wd-form-item>
        <wd-form-item title="活动评分" prop="rate">
          <wd-rate v-model="model.rate" allow-half clearable />
        </wd-form-item>
        <wd-form-item title="预算强度" prop="budget">
          <wd-slider ref="sliderRef" v-model="model.budget" show-extreme-value />
        </wd-form-item>
        <wd-form-item title="滑块验证" prop="verified">
          <wd-slide-verify ref="slideVerifyRef" @success="handleVerifySuccess" @fail="handleVerifyFail" />
        </wd-form-item>
      </wd-cell-group>
      <view class="tip">
        <wd-form-item prop="read" title-width="0px" :border="false">
          <wd-checkbox v-model="model.read">
            {{ $t('yi-yue-du-bing-tong-yi') }}
            <text style="color: #4d80f0">{{ $t('ba-la-ba-la-ba-la-xie-yi') }}</text>
          </wd-checkbox>
        </wd-form-item>
      </view>
      <view class="footer">
        <wd-button type="primary" size="large" @click="handleSubmit" block>{{ $t('ti-jiao') }}</wd-button>
      </view>
    </wd-form>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import { isArray } from '@/uni_modules/wot-ui/common/util'
import { useCascaderAreaData } from '@vant/area-data'
import { type FormInstance, type FormSchema, type FormSchemaIssue } from '@/uni_modules/wot-ui/components/wd-form/types'
import type { SliderInstance } from '@/uni_modules/wot-ui/components/wd-slider/types'
import type { SlideVerifyInstance } from '@/uni_modules/wot-ui/components/wd-slide-verify/types'
import type { UploadFileItem } from '@/uni_modules/wot-ui/components/wd-upload/types'
import type { CascaderOption } from '@/uni_modules/wot-ui/components/wd-cascader/types'
const { t } = useI18n()

import dayjs from 'dayjs'
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

const showPlatformPicker = ref(false)
const showPromotionPicker = ref(false)
const showTimePicker = ref(false)
const showDatePicker = ref(false)
const showAddressPicker = ref(false)
const addressText = ref('')
const isVerticalLayout = ref(false)
const useZodSchema = ref(true)
const formItemLayout = computed(() => (isVerticalLayout.value ? 'vertical' : 'horizontal'))
const sliderRef = ref<SliderInstance>()
const slideVerifyRef = ref<SlideVerifyInstance>()

const model = reactive<{
  couponName: string
  platform: any[]
  promotion: any[]
  threshold: string
  price: string
  time: number | string
  date: null | number
  address: string
  count: number
  content: string
  switchVal: boolean
  cardId: string
  phone: string
  read: boolean
  fileList: UploadFileItem[]
  discount: number
  priority: number
  tags: number[]
  rate: number
  budget: number
  verified: boolean
}>({
  couponName: '',
  platform: [],
  promotion: [],
  threshold: '',
  price: '',
  date: null,
  time: '',
  address: '',
  count: 1,
  content: '',
  switchVal: true,
  cardId: '',
  phone: '',
  read: false,
  fileList: [],
  discount: 1,
  priority: 2,
  tags: [],
  rate: 3.5,
  budget: 35,
  verified: false
})

const requiredFields = new Set([
  'couponName',
  'content',
  'threshold',
  'platform',
  'promotion',
  'time',
  'date',
  'address',
  'count',
  'cardId',
  'phone',
  'fileList',
  'discount',
  'priority',
  'tags',
  'rate',
  'budget',
  'verified'
])

const customSchema: FormSchema = {
  async validate(formModel) {
    const issues: FormSchemaIssue[] = []
    const pushIssue = (path: string, message: string) => {
      issues.push({ path: [path], message })
    }
    if (!formModel.couponName) {
      pushIssue('couponName', t('qing-shu-ru-you-hui-quan-ming-cheng'))
    } else if (!/\d{6}/.test(formModel.couponName)) {
      pushIssue('couponName', t('you-hui-quan-ming-cheng-6-ge-zi-yi-shang'))
    }
    if (!formModel.content || formModel.content.length <= 2) {
      pushIssue('content', t('qing-shu-ru-huo-dong-xi-ze-xin-xi'))
    }
    if (!formModel.threshold || !formModel.price) {
      pushIssue('threshold', t('qing-shu-ru-man-jian-jin-e'))
    }
    if (!isArray(formModel.platform) || !formModel.platform.length) {
      pushIssue('platform', t('qing-xuan-ze-tui-guang-ping-tai'))
    }
    if (!isArray(formModel.promotion) || !formModel.promotion.length) {
      pushIssue('promotion', t('qing-xuan-ze-tui-guang-ping-tai'))
    }
    if (!formModel.time) {
      pushIssue('time', t('qing-xuan-ze-shi-jian-0'))
    }
    if (!formModel.date) {
      pushIssue('date', t('qing-xuan-ze-ri-qi-0'))
    }
    if (!formModel.address) {
      pushIssue('address', t('qing-xuan-ze-di-zhi-0'))
    }
    if (formModel.count === '' || formModel.count === undefined || formModel.count === null) {
      pushIssue('count', t('fa-huo-shu-liang-xu-yao-da-yu-1'))
    } else if (Number(formModel.count) <= 1) {
      pushIssue('count', t('fa-huo-shu-liang-xu-yao-da-yu-1-0'))
    }
    if (!formModel.cardId) {
      pushIssue('cardId', t('qing-shu-ru-wai-bi-ba-bu'))
    }
    if (!formModel.phone) {
      pushIssue('phone', t('qing-shu-ru-ma-ka-ba-ka'))
    }
    if (!isArray(formModel.fileList) || !formModel.fileList.length) {
      pushIssue('fileList', t('qing-xuan-ze-huo-dong-tu-pian'))
    }
    if (!formModel.discount) {
      pushIssue('discount', t('qing-shu-ru-you-hui-jin-e-0'))
    }
    if (formModel.priority === '' || formModel.priority === undefined || formModel.priority === null) {
      pushIssue('priority', '请选择投放优先级')
    }
    if (!isArray(formModel.tags) || !formModel.tags.length) {
      pushIssue('tags', '请至少选择一个投放标签')
    }
    if (formModel.rate === '' || formModel.rate === undefined || formModel.rate === null) {
      pushIssue('rate', '请完成活动评分')
    }
    if (formModel.budget === '' || formModel.budget === undefined || formModel.budget === null) {
      pushIssue('budget', '请设置预算强度')
    }
    if (!formModel.verified) {
      pushIssue('verified', '请完成滑块验证')
    }
    return issues
  },
  isRequired(path: string) {
    return requiredFields.has(path)
  }
}

const zodSchema: FormSchema = zodAdapter(
  z.object({
    couponName: z.string().regex(/\d{6}/, t('you-hui-quan-ming-cheng-6-ge-zi-yi-shang')),
    content: z.string().min(3, t('qing-shu-ru-huo-dong-xi-ze-xin-xi')),
    threshold: z.string().min(1, t('qing-shu-ru-man-jian-jin-e')),
    price: z.string().optional(),
    platform: z.array(z.any()).min(1, t('qing-xuan-ze-tui-guang-ping-tai')),
    promotion: z.array(z.any()).min(1, t('qing-xuan-ze-tui-guang-ping-tai')),
    time: z.union([z.string(), z.number()]).refine((value) => !!value, t('qing-xuan-ze-shi-jian-0')),
    date: z.union([z.number(), z.null()]).refine((value) => !!value, t('qing-xuan-ze-ri-qi-0')),
    address: z.string().min(1, t('qing-xuan-ze-di-zhi-0')),
    count: z.number().gt(1, t('fa-huo-shu-liang-xu-yao-da-yu-1')),
    switchVal: z.boolean().optional(),
    discount: z.number().optional(),
    cardId: z.string().min(1, t('qing-shu-ru-wai-bi-ba-bu')),
    phone: z.string().min(1, t('qing-shu-ru-ma-ka-ba-ka')),
    fileList: z.array(z.any()).min(1, t('qing-xuan-ze-huo-dong-tu-pian')),
    priority: z.number(),
    tags: z.array(z.number()).min(1, '请至少选择一个投放标签'),
    rate: z.number(),
    budget: z.number(),
    verified: z.boolean().refine((value) => value, '请完成滑块验证')
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

const platformList = ref<any>([
  {
    value: '1',
    label: t('jing-dong')
  },
  {
    value: '2',
    label: t('kai-pu-le')
  },
  {
    value: '3',
    label: t('shou-q')
  },
  {
    value: '4',
    label: t('wei-xin')
  },
  {
    value: '5',
    label: t('1-hao-dian')
  },
  {
    value: '6',
    label: t('shi-yuan-jie')
  },
  {
    value: '7',
    label: t('jing-dong-ji-su-ban')
  }
])
const promotionlist = ref<any[]>([
  {
    value: '1',
    label: t('man-jian')
  },
  {
    value: '2',
    label: t('wu-men-jian')
  }
])

const area = ref(useCascaderAreaData())
const toast = useToast()
const form = ref<FormInstance>()

watch(
  () => isVerticalLayout.value,
  async () => {
    await nextTick()
    sliderRef.value?.initSlider()
    await slideVerifyRef.value?.init()
    slideVerifyRef.value?.reset()
  }
)

const platformText = computed(() => {
  if (!isArray(model.platform) || !model.platform.length) return ''
  return model.platform
    .map((val: string) => {
      const item = platformList.value.find((option: any) => option.value === val)
      return item ? item.label : val
    })
    .join('、')
})

const promotionText = computed(() => {
  if (!isArray(model.promotion) || !model.promotion.length) return ''
  return model.promotion
    .map((val: string) => {
      const item = promotionlist.value.find((option: any) => option.value === val)
      return item ? item.label : val
    })
    .join('、')
})

const timeText = computed(() => {
  if (!model.time) return ''
  if (typeof model.time === 'number') return dayjs(model.time).format('YYYY-MM-DD HH:mm')
  return model.time
})

const dateText = computed(() => {
  if (!model.date) return ''
  return dayjs(model.date).format('YYYY-MM-DD')
})

function handleAddressConfirm({ selectedOptions }: { selectedOptions: CascaderOption[] }) {
  addressText.value = selectedOptions.map((item) => item.text).join('/')
}

function handleVerifySuccess() {
  model.verified = true
}

function handleVerifyFail() {
  model.verified = false
}

function handleFileChange({ fileList }: any) {
  model.fileList = fileList
}

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        toast.success(t('ti-jiao-cheng-gong'))
      }
      console.log(valid)
      console.log(errors)
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleIconClick() {
  toast.info(t('you-hui-quan-ti-shi-xin-xi'))
}
</script>
<style lang="scss" scoped>
.inline-txt {
  display: inline-block;
  font-size: 14px;
  margin: 0 8px;
  color: rgba(0, 0, 0, 0.45);
  vertical-align: middle;
}
:deep(.group) {
  &:not(:first-child) {
    margin-top: 12px;
  }
}
.tip {
  margin: 12px 0 12px;
  color: #999;
  font-size: 12px;
}
.footer {
  padding: 0 24px 20px;
}
.layout-tip {
  margin-left: 8px;
  color: #666;
  font-size: 14px;
}
:deep(.label-class) {
  color: #999 !important;
  font-size: 12px !important;
}
</style>
