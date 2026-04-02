<template>
  <page-wraper>
    <wd-form ref="form" :model="model" :schema="activeSchema" :title-width="120" border>
      <wd-form-item title="校验引擎">
        <wd-switch v-model="useZod" size="20" active-text="Zod" inactive-text="自定义" />
      </wd-form-item>
      <wd-form-item :title="$t('wai-bi-ba-bu-ming')" prop="name">
        <wd-input clearable v-model="model.name" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')" />
      </wd-form-item>
      <wd-form-item
        v-for="(item, index) in model.phoneNumbers"
        :key="item.key"
        :title="$t('ma-ka-ba-ka-dan-hao-index') + index"
        :prop="'phoneNumbers.' + index + '.value'"
      >
        <wd-input clearable v-model="item.value" :placeholder="$t('ma-ka-ba-ka-dan-hao')" />
      </wd-form-item>

      <wd-cell title-width="0px">
        <view class="footer">
          <wd-button size="small" type="info" plain @click="addPhone">{{ $t('tian-jia') }}</wd-button>
          <wd-button size="small" type="info" plain @click="removePhone">{{ $t('shan-chu') }}</wd-button>
          <wd-button size="small" type="info" plain @click="reset">{{ $t('zhong-zhi') }}</wd-button>
          <wd-button type="primary" size="small" @click="submit">{{ $t('ti-jiao') }}</wd-button>
        </view>
      </wd-cell>
    </wd-form>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast, zodAdapter } from '@/uni_modules/wot-ui'
import type { FormInstance, FormSchema } from '@/uni_modules/wot-ui/components/wd-form/types'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

const { t } = useI18n()

interface PhoneItem {
  key: number
  value: string
}

const model = reactive<{
  name: string
  phoneNumbers: PhoneItem[]
}>({
  name: '',
  phoneNumbers: [
    {
      key: Date.now(),
      value: ''
    }
  ]
})

const { success: showSuccess } = useToast()
const form = ref<FormInstance>()
const useZod = ref(true)

const customSchema: FormSchema = {
  validate(formModel) {
    const issues = []
    if (!formModel.name) {
      issues.push({ path: ['name'], message: t('qing-shu-ru-wai-bi-ba-bu') })
    }
    formModel.phoneNumbers.forEach((item: PhoneItem, index: number) => {
      if (!item.value) {
        issues.push({ path: ['phoneNumbers', index, 'value'], message: t('ma-ka-ba-ka-dan-hao') + index })
      }
    })
    return issues
  },
  isRequired(path: string) {
    return path === 'name' || /^phoneNumbers\.\d+\.value$/.test(path)
  }
}

const zodSchema = zodAdapter(
  z
    .object({
      name: z.string().min(1, t('qing-shu-ru-wai-bi-ba-bu')),
      phoneNumbers: z.array(
        z.object({
          key: z.number(),
          value: z.string()
        })
      )
    })
    .superRefine((formModel, ctx) => {
      formModel.phoneNumbers.forEach((item, index) => {
        if (!item.value) {
          ctx.addIssue({
            code: 'custom',
            path: ['phoneNumbers', index, 'value'],
            message: t('ma-ka-ba-ka-dan-hao') + index
          })
        }
      })
    }),
  {
    isRequired(path: string) {
      return path === 'name' || /^phoneNumbers\.\d+\.value$/.test(path)
    }
  }
)

const activeSchema = computed<FormSchema>(() => {
  return useZod.value ? zodSchema : customSchema
})

const removePhone = () => {
  model.phoneNumbers.splice(model.phoneNumbers.length - 1, 1)
}

const addPhone = () => {
  model.phoneNumbers.push({
    key: Date.now(),
    value: ''
  })
}

const reset = () => {
  form.value!.reset()
}

const submit = () => {
  form.value!.validate().then(({ valid, errors }) => {
    if (valid) {
      showSuccess(t('xiao-yan-tong-guo'))
    }
  })
}
</script>
<style lang="scss" scoped>
.footer {
  text-align: left;
  :deep(.wd-button) {
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
}
</style>
