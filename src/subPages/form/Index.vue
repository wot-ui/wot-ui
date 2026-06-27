<template>
  <page-wraper :demo-config="{ transparent: true }">
    <view class="page-form">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ji-chu-biao-dan')" transparent no-padding>
          <wd-form ref="form1" :model="model1" :schema="schema1" :title-width="100">
            <wd-form-item :title="$t('wai-bi-ba-bu')" prop="value1">
              <wd-input type="text" v-model="model1.value1" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')" />
            </wd-form-item>

            <wd-form-item :title="$t('sha-ka-la-ka')" prop="value2">
              <wd-input type="text" v-model="model1.value2" :placeholder="$t('qing-shu-ru-sha-ka-la-ka')" />
            </wd-form-item>
            <view class="page-form__footer">
              <wd-button type="primary" size="large" @click="handleSubmit1" block>{{ $t('ti-jiao') }}</wd-button>
            </view>
          </wd-form>
        </demo-group-item>

        <demo-group-item :title="$t('dong-tai-biao-dan')" transparent>
          <view class="page-form__button-wrap">
            <wd-button @click="handleClick1" :round="false" block size="large">{{ $t('dong-tai-biao-dan-0') }}</wd-button>
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('fu-za-biao-dan')" transparent>
          <view class="page-form__button-wrap">
            <wd-button @click="handleClick3" :round="false" block size="large">{{ $t('fu-za-biao-dan-0') }}</wd-button>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-pei-zhi')">
        <demo-group-item :title="$t('xiao-yan-ti-shi-fang-shi')" transparent>
          <view class="page-form__button-wrap">
            <wd-button @click="handleClick4" :round="false" block size="large">{{ $t('xiao-yan-ti-shi-fang-shi') }}</wd-button>
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('xiao-yan-chu-fa-shi-ji')" transparent>
          <view class="page-form__button-wrap">
            <wd-button @click="handleClick2" :round="false" block size="large">{{ $t('xiao-yan-chu-fa-shi-ji-0') }}</wd-button>
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('yin-cang-zi-duan-xiao-yan')" transparent no-padding>
          <wd-form ref="hiddenForm" :model="hiddenModel" :schema="hiddenSchema" :title-width="110">
            <wd-form-item :title="$t('xian-shi-yin-cang-zi-duan')" value-align="left">
              <wd-switch v-model="showHiddenField" size="20" />
            </wd-form-item>
            <wd-form-item :title="$t('ke-jian-zi-duan')" prop="visibleValue">
              <wd-input v-model="hiddenModel.visibleValue" :placeholder="$t('qing-shu-ru-ke-jian-zi-duan')" />
            </wd-form-item>
            <wd-form-item v-if="showHiddenField" :title="$t('yin-cang-zi-duan')" prop="hiddenValue">
              <wd-input v-model="hiddenModel.hiddenValue" :placeholder="$t('qing-shu-ru-yin-cang-zi-duan')" />
            </wd-form-item>
            <view class="page-form__footer">
              <wd-button type="primary" size="large" @click="handleHiddenSubmit" block>{{ $t('ti-jiao') }}</wd-button>
            </view>
          </wd-form>
        </demo-group-item>

        <demo-group-item :title="$t('fu-lu-jing-xiao-yan')" transparent no-padding>
          <wd-form ref="nestedForm" :model="nestedModel" :schema="nestedSchema" :title-width="110">
            <wd-form-item :title="$t('yong-hu-ming')" prop="user">
              <wd-input v-model="nestedModel.user.name" :placeholder="$t('qing-shu-ru-yong-hu-ming')" />
            </wd-form-item>
            <view class="page-form__footer">
              <wd-button type="primary" size="large" @click="handleNestedSubmit" block>{{ $t('ti-jiao') }}</wd-button>
            </view>
          </wd-form>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance } from '@/uni_modules/wot-ui/components/wd-form/types'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'
const { t } = useI18n()

const model1 = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const hiddenModel = reactive<{
  visibleValue: string
  hiddenValue: string
}>({
  visibleValue: 'wot-ui',
  hiddenValue: ''
})

const nestedModel = reactive<{
  user: {
    name: string
  }
}>({
  user: {
    name: ''
  }
})

const { success: showSuccess, loading: showLoading, close: closeToast } = useToast()
const form1 = ref<FormInstance>()
const hiddenForm = ref<FormInstance>()
const nestedForm = ref<FormInstance>()
const showHiddenField = ref(false)

const schema1 = zodAdapter(
  z
    .object({
      value1: z.string().min(1, t('qing-shu-ru-wai-bi-ba-bu')),
      value2: z.string().min(1, t('qing-shu-ru-sha-ka-la-ka'))
    })
    .superRefine((data, ctx) => {
      if (data.value1 === data.value2) return
      const message = t('liang-ge-shu-ru-kuang-de-nei-rong-bi-xu-yi-zhi')
      ctx.addIssue({
        code: 'custom',
        message,
        path: ['value1']
      })
      ctx.addIssue({
        code: 'custom',
        message,
        path: ['value2']
      })
    })
)

const hiddenSchema = zodAdapter(
  z.object({
    visibleValue: z.string().min(1, t('qing-shu-ru-ke-jian-zi-duan')),
    hiddenValue: z.string().min(1, t('qing-shu-ru-yin-cang-zi-duan'))
  })
)

const nestedSchema = zodAdapter(
  z.object({
    user: z.object({
      name: z.string().min(1, t('qing-shu-ru-yong-hu-ming'))
    })
  })
)

function handleSubmit1() {
  form1
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: t('ti-jiao-cheng-gong')
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleHiddenSubmit() {
  hiddenForm.value?.validate().then(({ valid }) => {
    if (valid) {
      showSuccess({
        msg: t('xiao-yan-tong-guo')
      })
    }
  })
}

function handleNestedSubmit() {
  nestedForm.value?.validate().then(({ valid }) => {
    if (valid) {
      showSuccess({
        msg: t('xiao-yan-tong-guo')
      })
    }
  })
}

function handleClick1() {
  uni.navigateTo({ url: '/subPages/form/demo1' })
}

function handleClick3() {
  uni.navigateTo({ url: '/subPages/form/demo3' })
}

function handleClick4() {
  uni.navigateTo({ url: '/subPages/form/demo4' })
}

function handleClick2() {
  uni.navigateTo({ url: '/subPages/form/demo2' })
}
</script>
<style lang="scss" scoped>
.page-form {
  &__button-wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 0 $padding-loose;
  }

  &__footer {
    padding: $padding-main;
  }
}
</style>
