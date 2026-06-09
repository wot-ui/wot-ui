import { computed, inject, type ComputedRef } from 'vue'
import { CONFIG_PROVIDER_KEY, type ConfigProviderProvide } from '../components/wd-config-provider/types'
import { DEFAULT_GLOBAL_CONFIG, type GlobalConfig } from '../components/wd-config-provider/global-config'

export function useGlobalConfig(): ComputedRef<GlobalConfig> {
  const injected = inject<ConfigProviderProvide | null>(CONFIG_PROVIDER_KEY, null)
  if (injected) return injected.globalConfig
  return computed(() => ({ ...DEFAULT_GLOBAL_CONFIG }))
}
