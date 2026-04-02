<template>
  <view :class="`wd-form ${customClass}`" :style="customStyle">
    <slot></slot>
    <wd-toast v-if="props.errorType === 'toast'" selector="wd-form-toast" />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-form',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdToast from '../wd-toast/wd-toast.vue'
import { reactive, watch } from 'vue'
import { isArray, isDef } from '../../common/util'
import { useChildren } from '../../composables/useChildren'
import { useToast } from '../wd-toast'
import { FORM_KEY, type ErrorMessage, formProps, type FormExpose, type FormSchemaIssue } from './types'

const { show: showToast } = useToast('wd-form-toast')
const props = defineProps(formProps)

const { children, linkChildren } = useChildren(FORM_KEY)
let errorMessages = reactive<Record<string, string>>({})

linkChildren({ props, errorMessages, validate })

watch(
  () => props.model,
  () => {
    if (props.resetOnChange) {
      clearMessage()
    }
  },
  { immediate: true, deep: true }
)

/**
 * 表单校验
 * @param prop 指定校验字段或字段数组
 */
async function validate(prop?: string | string[]): Promise<{ valid: boolean; errors: ErrorMessage[] }> {
  const propsToValidate = isArray(prop) ? prop : isDef(prop) ? [prop] : []
  const rawIssues: FormSchemaIssue[] = props.schema ? await Promise.resolve(props.schema.validate(props.model)) : []
  const errors = rawIssues
    .filter((issue) => issue.path && issue.path.length > 0 && issue.message)
    .map((issue) => ({
      prop: issue.path.map((item) => String(item)).join('.'),
      message: issue.message
    }))
  const filteredErrors =
    propsToValidate.length > 0
      ? errors.filter((error) =>
          propsToValidate.some((target) => error.prop === target || error.prop.startsWith(`${target}.`) || target.startsWith(`${error.prop}.`))
        )
      : errors
  const valid = filteredErrors.length === 0

  showMessage(filteredErrors)

  if (valid) {
    if (propsToValidate.length) {
      propsToValidate.forEach(clearMessage)
    } else {
      clearMessage()
    }
  }

  return {
    valid,
    errors: filteredErrors
  }
}

function showMessage(errors: ErrorMessage[]) {
  const childrenProps = children.map((e) => e.prop).filter(Boolean)
  const messages = errors.filter((error) => error.message && childrenProps.includes(error.prop))
  if (messages.length) {
    messages.sort((a, b) => {
      return childrenProps.indexOf(a.prop) - childrenProps.indexOf(b.prop)
    })
    if (props.errorType === 'toast') {
      showToast(messages[0].message)
    } else if (props.errorType === 'message') {
      messages.forEach((error) => {
        errorMessages[error.prop] = error.message
      })
    }
  }
}

function clearMessage(prop?: string) {
  if (prop) {
    errorMessages[prop] = ''
  } else {
    Object.keys(errorMessages).forEach((key) => {
      errorMessages[key] = ''
    })
  }
}

/**
 * 重置表单项的验证提示
 */
function reset() {
  clearMessage()
}

defineExpose<FormExpose>({ validate, reset })
</script>

<style lang="scss" scoped></style>
