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
  const childrenProps = getChildrenProps()
  const visibleErrors = errors.filter((error) => getMatchedChildProp(error.prop, childrenProps))
  const filteredErrors =
    propsToValidate.length > 0
      ? visibleErrors.filter((error) => propsToValidate.some((target) => isSameOrSubPath(error.prop, target)))
      : visibleErrors
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

function getChildrenProps() {
  return children.map((e) => e.prop).filter((prop): prop is string => Boolean(prop))
}

function isSameOrSubPath(prop: string, target: string) {
  return prop === target || prop.startsWith(`${target}.`) || target.startsWith(`${prop}.`)
}

function getMatchedChildProp(prop: string, childrenProps: string[]) {
  return childrenProps.find((target) => target === prop) || childrenProps.find((target) => isSameOrSubPath(prop, target))
}

function showMessage(errors: ErrorMessage[]) {
  const childrenProps = getChildrenProps()
  const messages = errors.reduce<ErrorMessage[]>((result, error) => {
    const matchedProp = getMatchedChildProp(error.prop, childrenProps)
    if (error.message && matchedProp) {
      result.push({
        prop: matchedProp,
        message: error.message
      })
    }
    return result
  }, [])
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
    Object.keys(errorMessages).forEach((key) => {
      if (isSameOrSubPath(key, prop)) {
        errorMessages[key] = ''
      }
    })
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
