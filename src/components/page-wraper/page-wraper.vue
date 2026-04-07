<template>
  <wd-config-provider :custom-class="customClass" :custom-style="customStyle" :theme="configProviderTheme">
    <view class="page-wraper" @click="closeOutside">
      <wd-cell
        title="调整主题"
        title-width="240px"
        is-link
        :value="currentThemeLabel"
        v-if="showThemeSelector"
        @click="showPresetThemeSheet = true"
      ></wd-cell>
      <slot />
      <!-- #ifdef MP-WEIXIN -->
      <!-- 横幅广告和格子广告可以共存，但插屏广告展示时，不显示横幅广告和格子广告 -->
      <template v-if="useWxAd && !showWxAd3 && !isFree">
        <ad-custom v-if="showWxAd" unit-id="adunit-06191d6d3d1ddfc4"></ad-custom>
        <ad-custom
          v-if="showWxAd2"
          style="width: 120rpx; height: auto; position: fixed; right: 12rpx; top: 160rpx; z-index: 999"
          unit-id="adunit-95aad07aafad3619"
        ></ad-custom>
      </template>
      <!-- #endif -->

      <wd-gap height="0" v-if="safeAreaInsetBottom" safe-area-bottom></wd-gap>
    </view>
    <wd-notify />
    <wd-toast />
    <wd-action-sheet
      v-model="showPresetThemeSheet"
      :actions="presetThemeActions"
      :cancel-text="$t('qu-xiao')"
      :title="$t('qie-huan-zhu-ti-se')"
      @select="handlePresetThemeSelect"
    />
    <!-- #ifdef MP-WEIXIN -->
    <wd-fab v-model:active="fabActive" draggable type="danger" :gap="{ bottom: 58 }" direction="left" v-if="enableRewardFab">
      <wd-button type="danger" round @click="goToReward">
        <view style="display: flex; align-items: center">
          <wd-icon name="thumb-up" size="22px"></wd-icon>
          <text>{{ $t('kan-shi-pin-mian-guang-gao') }}</text>
        </view>
      </wd-button>
    </wd-fab>
    <!-- #endif -->
  </wd-config-provider>
</template>
<script lang="ts">
export default {
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
import { computed, ref, onMounted, nextTick } from 'vue'
import { setNotifyDefaultOptions, useConfigProvider, useQueue } from '@/uni_modules/wot-ui'
import type { Action } from '@/uni_modules/wot-ui/components/wd-action-sheet/types'
import { useDark } from '../../store'
import { useRewardAd } from '@/store/useRewardAd'
import { useChildren } from '@/uni_modules/wot-ui/composables/useChildren'
import { DEMO_GROUP_KEY, type DemoGroupGlobalConfig } from '../demo-group/types'

const presetThemeOptions = [
  { label: 'Shadcn', value: 'shadcn' },
  { label: 'Illustration', value: 'illustration' },
  { label: 'Cartoon', value: 'cartoon' },
  { label: 'NutUI', value: 'nutui' },
  { label: 'TDesign', value: 'tdesign' },
  { label: 'Vant', value: 'vant' }
] as const

type PresetThemeName = (typeof presetThemeOptions)[number]['value'] | 'default'
type SelectableThemeName = PresetThemeName | 'dark'

interface Props {
  showDarkMode?: boolean
  safeAreaInsetBottom?: boolean
  useWxAd?: boolean
  useRewardFab?: boolean
  enablePresetTheme?: boolean
  customClass?: string
  customStyle?: string
  /**
   * 全局控制 demo-group 的配置
   */
  demoConfig?: DemoGroupGlobalConfig
}

const props = withDefaults(defineProps<Props>(), {
  showDarkMode: false,
  safeAreaInsetBottom: true,
  useWxAd: process.env.NODE_ENV === 'development' ? false : true,
  useRewardFab: false,
  enablePresetTheme: false
})

// 使用 useChildren 提供 demo-group 全局配置
const { linkChildren } = useChildren(DEMO_GROUP_KEY)

const demoGroupGlobalConfig = computed<DemoGroupGlobalConfig>(() => ({
  transparent: props.demoConfig?.transparent ?? false,
  customClass: props.demoConfig?.customClass ?? '',
  customStyle: props.demoConfig?.customStyle ?? ''
}))

linkChildren({ props: demoGroupGlobalConfig.value })

const enableRewardFab = computed(() => {
  return props.useRewardFab && (process.env.NODE_ENV === 'development' ? false : true)
})
const { isFree } = useRewardAd()
const darkMode = useDark()
const { closeOutside } = useQueue()
const showPresetThemeSheet = ref(false)
const currentTheme = ref<SelectableThemeName>('default')
// #ifdef MP-WEIXIN
const fabActive = ref<boolean>(false)
// 横幅广告和格子广告可以共存，但插屏广告展示时，不显示横幅广告和格子广告
const showWxAd = ref<boolean>(Math.random() > 0.5) // 横幅广告
const showWxAd2 = ref<boolean>(Math.random() > 0.33) // 格子广告
const showWxAd3 = ref<boolean>(Math.random() > 0.66) // 插屏广告
let interstitialAd: UniApp.InterstitialAdContext | null = null
// #endif

const showThemeSelector = computed(() => props.showDarkMode || props.enablePresetTheme)

const presetThemeSelections = computed<Array<{ label: string; value: SelectableThemeName }>>(() => {
  const options: Array<{ label: string; value: SelectableThemeName }> = [{ label: 'Default', value: 'default' }]

  if (props.showDarkMode) {
    options.push({ label: 'Dark', value: 'dark' })
  }

  if (props.enablePresetTheme) {
    options.push(...presetThemeOptions)
  }

  return options
})

const presetThemeActions = computed<Action[]>(() => {
  return presetThemeSelections.value.map((option) => ({
    name: option.label,
    value: option.value
  }))
})

const currentThemeLabel = computed(() => {
  if (currentTheme.value === 'default') {
    return resolvedTheme.value === 'dark' ? 'Dark' : 'Default'
  }
  return presetThemeSelections.value.find((item) => item.value === currentTheme.value)?.label || 'Default'
})

const resolvedTheme = computed<string>(() => {
  if (currentTheme.value === 'default') {
    return darkMode.isDark.value ? 'dark' : 'light'
  }

  return currentTheme.value
})

const configProviderTheme = computed(() => {
  return resolvedTheme.value
})

useConfigProvider({ theme: configProviderTheme })

function handlePresetThemeSelect({ item }: { item: Action }) {
  const selectedTheme = item.value as SelectableThemeName | undefined

  if (selectedTheme && presetThemeSelections.value.some((option) => option.value === selectedTheme)) {
    currentTheme.value = selectedTheme
  }
}

function goToReward() {
  fabActive.value = false
  uni.navigateTo({
    url: '/subPages/wxRewardAd/Index'
  })
}

onMounted(() => {
  setNotifyDefaultOptions({
    onClick: (event) => console.log('onClick', event),
    onClosed: () => console.log('onClosed'),
    onOpened: () => console.log('onOpened')
  })
  // #ifdef MP-WEIXIN
  // 微信广告
  if (uni.createInterstitialAd && showWxAd3.value && props.useWxAd && !isFree.value) {
    interstitialAd = uni.createInterstitialAd({ adUnitId: 'adunit-fc8522e2b1185c89' })
    nextTick(() => {
      interstitialAd && interstitialAd.show()
    })
  }

  if (enableRewardFab.value) {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      fabActive.value = true
    }, 500)
  }

  // #endif
})
</script>
<style lang="scss" scoped>
.page-wraper {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  box-sizing: border-box;
  background: $filled-bottom;
}
</style>
