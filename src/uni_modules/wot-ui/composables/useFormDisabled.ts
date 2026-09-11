import { computed, inject } from 'vue'
import { isDef } from '../common/util'
import { FORM_ITEM_DISABLED_KEY } from '../components/wd-form-item/types'
import { FORM_KEY } from '../components/wd-form/types'

export function useFormDisabled(props: { disabled?: boolean | null }) {
  const form = inject(FORM_KEY, null)
  const formItem = inject(FORM_ITEM_DISABLED_KEY, null)

  return computed(() => {
    if (props.disabled) {
      return true
    }
    if (formItem && isDef(formItem.disabled.value)) {
      return formItem.disabled.value
    }
    return Boolean(form?.props.disabled)
  })
}
