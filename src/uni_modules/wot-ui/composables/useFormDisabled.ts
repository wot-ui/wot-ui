import { computed, inject } from 'vue'
import { FORM_KEY } from '../components/wd-form/types'

export function useFormDisabled(props: { disabled?: boolean | null }) {
  const form = inject(FORM_KEY, null)

  return computed(() => {
    return Boolean(props.disabled || form?.props.disabled)
  })
}
