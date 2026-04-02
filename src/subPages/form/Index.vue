<template>
  <page-wraper>
    <view class="page-form">
      <demo-group title="组件类型">
        <demo-group-item :title="$t('ji-chu-biao-dan')" transparent no-padding>
          <wd-form ref="form1" :model="model1" :schema="schema1" :title-width="100">
            <wd-form-item :title="$t('wai-bi-ba-bu')" prop="value1">
              <wd-input type="text" v-model="model1.value1" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')" />
            </wd-form-item>

            <wd-form-item :title="$t('sha-ka-la-ka')" prop="value2">
              <wd-input type="text" v-model="model1.value2" :placeholder="$t('qing-shu-ru-sha-ka-la-ka')" />
            </wd-form-item>
            <view class="footer">
              <wd-button type="primary" size="large" @click="handleSubmit1" block>{{ $t('ti-jiao') }}</wd-button>
            </view>
          </wd-form>
        </demo-group-item>

        <demo-group-item :title="$t('dong-tai-biao-dan')" transparent>
          <view class="demo-button">
            <wd-button @click="handleClick1" :round="false" block size="large">{{ $t('dong-tai-biao-dan-0') }}</wd-button>
          </view>
        </demo-group-item>

        <demo-group-item :title="$t('fu-za-biao-dan')" transparent>
          <view class="demo-button">
            <wd-button @click="handleClick3" :round="false" block size="large">{{ $t('fu-za-biao-dan-0') }}</wd-button>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件配置">
        <demo-group-item :title="$t('xiao-yan-ti-shi-fang-shi')" transparent>
          <view class="demo-button">
            <wd-button @click="handleClick4" :round="false" block size="large">{{ $t('xiao-yan-ti-shi-fang-shi') }}</wd-button>
          </view>
        </demo-group-item>

        <demo-group-item title="校验触发时机" transparent>
          <view class="demo-button">
            <wd-button @click="handleClick2" :round="false" block size="large">校验触发时机</wd-button>
          </view>
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

const { success: showSuccess, loading: showLoading, close: closeToast } = useToast()
const form1 = ref<FormInstance>()

const schema1 = zodAdapter(
  z
    .object({
      value1: z.string().min(1, t('qing-shu-ru-wai-bi-ba-bu')),
      value2: z.string().min(1, t('qing-shu-ru-sha-ka-la-ka'))
    })
    .superRefine((data, ctx) => {
      if (data.value1 === data.value2) return
      const message = '两个输入框的内容必须一致'
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
.demo-button {
  width: 100%;
  box-sizing: border-box;
  padding: 0 24rpx;
}
.footer {
  padding: 16px;
}
</style>
