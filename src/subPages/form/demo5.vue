<template>
  <page-wraper>
    <wd-select-picker v-model="model.platform" v-model:visible="showPlatformPicker" :columns="platformList" />
    <wd-picker v-model="model.promotion" v-model:visible="showPromotionPicker" :columns="promotionList" />
    <wd-datetime-picker v-model="model.time" v-model:visible="showTimePicker" />
    <wd-calendar v-model="model.date" v-model:visible="showDatePicker" />
    <wd-cascader v-model="model.address" v-model:visible="showAddressPicker" :options="area" @confirm="handleAddressConfirm" />

    <wd-cell-group custom-class="page-form-demo5__group" :title="$t('pei-zhi-qie-huan')">
      <wd-cell :title="$t('jin-yong-biao-dan-kong-jian')" title-width="110px" value-align="left" center>
        <view class="page-form-demo5__switch">
          <wd-switch v-model="disabled" size="20" />
          <text class="page-form-demo5__status">{{ disabled ? $t('yi-kai-qi') : $t('yi-guan-bi') }}</text>
        </view>
      </wd-cell>
    </wd-cell-group>

    <wd-form :model="model" :disabled="disabled" :title-width="110" border>
      <wd-cell-group custom-class="page-form-demo5__group" :title="$t('biao-dan-nei-rong')">
        <wd-form-item :title="$t('yong-hu-ming')" prop="username">
          <wd-input v-model="model.username" clearable :placeholder="$t('qing-shu-ru-yong-hu-ming')" />
        </wd-form-item>
        <wd-form-item :title="$t('huo-dong-xi-ze')" prop="content">
          <wd-textarea
            v-model="model.content"
            clearable
            auto-height
            show-word-limit
            :maxlength="120"
            :placeholder="$t('qing-shu-ru-huo-dong-xi-ze-xin-xi')"
          />
        </wd-form-item>
        <wd-form-item :title="$t('fa-huo-shu-liang')" prop="count" value-align="left">
          <wd-input-number v-model="model.count" />
        </wd-form-item>
        <wd-form-item :title="$t('xiao-xi-tong-zhi')" prop="notice" value-align="left">
          <wd-switch v-model="model.notice" size="20" />
        </wd-form-item>
        <wd-form-item :title="$t('tou-fang-you-xian-ji')" prop="priority">
          <wd-radio-group v-model="model.priority" direction="horizontal">
            <wd-radio :value="1">{{ $t('gao') }}</wd-radio>
            <wd-radio :value="2">{{ $t('zhong') }}</wd-radio>
            <wd-radio :value="3">{{ $t('di') }}</wd-radio>
          </wd-radio-group>
        </wd-form-item>
        <wd-form-item :title="$t('tou-fang-biao-qian')" prop="tags">
          <wd-checkbox-group v-model="model.tags" direction="horizontal">
            <wd-checkbox :name="1">{{ $t('xin-pin') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('bao-kuan') }}</wd-checkbox>
            <wd-checkbox :name="3">{{ $t('qing-cang') }}</wd-checkbox>
          </wd-checkbox-group>
        </wd-form-item>
        <wd-form-item :title="$t('huo-dong-ping-fen')" prop="rate">
          <wd-rate v-model="model.rate" allow-half clearable />
        </wd-form-item>
        <wd-form-item :title="$t('yu-suan-qiang-du')" prop="budget">
          <wd-slider v-model="model.budget" show-extreme-value />
        </wd-form-item>
        <wd-form-item :title="$t('huo-dong-tu-pian')" prop="fileList">
          <wd-upload :file-list="model.fileList" action="https://69bd04402bc2a25b22ad0a49.mockapi.io/upload" @change="handleFileChange" />
        </wd-form-item>
      </wd-cell-group>

      <wd-cell-group custom-class="page-form-demo5__group" :title="$t('picker-zi-duan-change')">
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
    </wd-form>
  </page-wraper>
</template>

<script lang="ts" setup>
import type { CascaderOption } from '@/uni_modules/wot-ui/components/wd-cascader/types'
import type { UploadFileItem } from '@/uni_modules/wot-ui/components/wd-upload/types'
import { useCascaderAreaData } from '@vant/area-data'
import dayjs from 'dayjs'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const disabled = ref(true)
const showPlatformPicker = ref(false)
const showPromotionPicker = ref(false)
const showTimePicker = ref(false)
const showDatePicker = ref(false)
const showAddressPicker = ref(false)
const addressText = ref('')

const model = reactive<{
  username: string
  content: string
  count: number
  notice: boolean
  priority: number
  tags: number[]
  rate: number
  budget: number
  fileList: UploadFileItem[]
  platform: string[]
  promotion: string[]
  time: number | string
  date: number | null
  address: string
}>({
  username: 'wot-ui',
  content: '',
  count: 2,
  notice: true,
  priority: 2,
  tags: [1, 2],
  rate: 3.5,
  budget: 60,
  fileList: [],
  platform: ['1'],
  promotion: ['1'],
  time: '',
  date: null,
  address: ''
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

const area = ref(useCascaderAreaData())

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
  if (typeof model.time === 'number') return dayjs(model.time).format('YYYY-MM-DD HH:mm')
  return model.time
})

const dateText = computed(() => {
  if (!model.date) return ''
  return dayjs(model.date).format('YYYY-MM-DD')
})

function handleFileChange({ fileList }: { fileList: UploadFileItem[] }) {
  model.fileList = fileList
}

function handleAddressConfirm({ selectedOptions }: { selectedOptions: CascaderOption[] }) {
  addressText.value = selectedOptions.map((item) => item.label).join('')
}
</script>

<style lang="scss" scoped>
:deep(.page-form-demo5__group) {
  &:not(:first-child) {
    margin-top: $spacing-tight;
  }
}

.page-form-demo5__status {
  display: inline-block;
  margin-left: $spacing-tight;
  color: var(--wot-cell-value-color, #666);
  font-size: var(--wot-cell-value-font-size, 14px);
  vertical-align: middle;
}

.page-form-demo5__switch {
  display: flex;
  align-items: center;
}
</style>
