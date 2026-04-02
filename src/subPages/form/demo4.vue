<template>
  <page-wraper>
    <wd-form ref="form" :model="model" :schema="activeSchema" :error-type="errorType" :title-width="100" border>
      <wd-cell-group custom-class="group" title="配置切换">
        <wd-form-item title="校验引擎" value-align="left">
          <wd-switch size="20" v-model="useZodSchema" active-text="Zod" inactive-text="自定义" />
        </wd-form-item>
        <wd-form-item title="提示方式" value-align="left">
          <wd-radio-group v-model="errorType" direction="horizontal">
            <wd-radio :value="'toast'">toast</wd-radio>
            <wd-radio :value="'message'">message</wd-radio>
            <wd-radio :value="'none'">none</wd-radio>
          </wd-radio-group>
        </wd-form-item>
      </wd-cell-group>
      <wd-cell-group custom-class="group" title="表单内容">
        <wd-form-item :title="$t('wai-bi-ba-bu')" prop="value1">
          <wd-input clearable v-model="model.value1" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')" />
        </wd-form-item>
        <wd-form-item :title="$t('sha-ka-la-ka')" prop="value2">
          <wd-input show-password clearable v-model="model.value2" :placeholder="$t('qing-shu-ru-sha-ka-la-ka')" />
        </wd-form-item>
      </wd-cell-group>
      <view class="footer">
        <wd-button type="primary" size="large" @click="handleSubmit" block>{{ $t('ti-jiao') }}</wd-button>
      </view>
    </wd-form>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance, FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

const { t } = useI18n()
const { success: showSuccess } = useToast()
const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const useZodSchema = ref(true)
const errorType = ref<'toast' | 'message' | 'none'>('toast')

const customSchema: FormSchema = {
  validate(formModel) {
    const issues = []
    if (!formModel.value1) {
      issues.push({ path: ['value1'], message: t('qing-shu-ru-wai-bi-ba-bu') })
    }
    if (!formModel.value2) {
      issues.push({ path: ['value2'], message: t('qing-shu-ru-sha-ka-la-ka') })
    }
    return issues
  },
  isRequired(path: string) {
    return path === 'value1' || path === 'value2'
  }
}

const zodSchema = zodAdapter(
  z.object({
    value1: z.string().min(1, t('qing-shu-ru-wai-bi-ba-bu')),
    value2: z.string().min(1, t('qing-shu-ru-sha-ka-la-ka'))
  }),
  {
    isRequired(path: string) {
      return path === 'value1' || path === 'value2'
    }
  }
)

const activeSchema = computed<FormSchema>(() => {
  return useZodSchema.value ? zodSchema : customSchema
})

const form = ref<FormInstance>()

watch(
  () => errorType.value,
  () => {
    form.value?.reset()
  }
)

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: t('xiao-yan-tong-guo')
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
<style lang="scss" scoped>
.footer {
  padding: 16px;
}

:deep(.group) {
  &:not(:first-child) {
    margin-top: 12px;
  }
}
</style>
