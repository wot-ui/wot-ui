<template>
  <page-wraper>
    <wd-toast />

    <demo-group transparent :title="$t('zu-jian-lei-xing')">
      <demo-group-item no-padding :title="$t('jiBenYongFa')">
        <wd-tabs v-model="tab1" @change="handleChange">
          <block v-for="item in 4" :key="item">
            <wd-tab :title="$t('biao-qian-item') + item">
              <view class="page-tabs__content">
                {{ $t('nei-rong') }}{{ tab1 + 1 }}
                <view>
                  <wd-button @click="tab1 < 3 ? tab1++ : (tab1 = 0)">{{ $t('xia-yi-ge') }}</wd-button>
                </view>
              </view>
            </wd-tab>
          </block>
        </wd-tabs>
      </demo-group-item>
      <demo-group-item no-padding :title="$t('name-pi-pei')">
        <wd-tabs v-model="tab" @change="handleChange">
          <block v-for="item in tabs" :key="item">
            <wd-tab :title="item" :name="item">
              <view class="page-tabs__content">{{ $t('nei-rong') }}{{ tab }}</view>
            </wd-tab>
          </block>
        </wd-tabs>
      </demo-group-item>
      <demo-group-item no-padding :title="$t('shi-yong-hui-biao')">
        <wd-tabs v-model="tabWithBadge" @change="handleChange">
          <wd-tab v-for="(item, index) in tabsWithBadge" :key="index" :title="item.title" :badge-props="item.badgeProps">
            <view class="page-tabs__content">{{ item.title + $t('itemtitle-hui-biao') }}</view>
          </wd-tab>
        </wd-tabs>
      </demo-group-item>
    </demo-group>

    <demo-group transparent :title="$t('zu-jian-zhuang-tai')">
      <demo-group-item no-padding :title="$t('nian-xing-bu-ju')">
        <wd-tabs v-model="tab2" sticky @change="handleChange">
          <block v-for="item in 4" :key="item">
            <wd-tab :title="$t('biao-qian-item') + item">
              <view class="page-tabs__content">{{ $t('nei-rong') }}{{ tab2 + 1 }}</view>
            </wd-tab>
          </block>
        </wd-tabs>
      </demo-group-item>
      <demo-group-item no-padding :title="$t('jin-yong-tab')">
        <wd-tabs v-model="tab3" @change="handleChange">
          <block v-for="item in 4" :key="item">
            <wd-tab :title="$t('biao-qian-item') + item" :disabled="item === 1">
              <view class="page-tabs__content">{{ $t('nei-rong') }}{{ tab3 + 1 }}</view>
            </wd-tab>
          </block>
        </wd-tabs>
      </demo-group-item>
    </demo-group>

    <demo-group transparent :title="$t('zu-jian-yang-shi')">
      <demo-group-item no-padding :title="$t('di-bu-tiao-yang-shi')">
        <view v-for="theme in lineThemes" :key="theme" class="tabs-theme-item">
          <view class="tabs-theme-item__label">Theme: {{ theme }}</view>
          <wd-tabs v-model="tabLineTheme[theme]" :line-theme="theme" @change="handleChange">
            <block v-for="item in 4" :key="item">
              <wd-tab :title="`${theme} ${item}`">
                <view class="page-tabs__content">{{ $t('nei-rong') }}{{ item }}</view>
              </wd-tab>
            </block>
          </wd-tabs>
        </view>
      </demo-group-item>
    </demo-group>

    <demo-group transparent :title="$t('te-shu-yang-shi')">
      <demo-group-item no-padding :title="$t('dian-ji-shi-jian')">
        <wd-tabs v-model="tab4" @click="handleClick" @change="handleChange">
          <block v-for="item in 4" :key="item">
            <wd-tab :title="$t('biao-qian-item') + item">
              <view class="page-tabs__content">{{ $t('nei-rong') }}{{ tab4 + 1 }}</view>
            </wd-tab>
          </block>
        </wd-tabs>
      </demo-group-item>
      <demo-group-item no-padding :title="$t('qie-huan-dong-hua')">
        <wd-tabs v-model="tab8" animated @change="handleChange">
          <block v-for="item in 4" :key="item">
            <wd-tab :title="$t('biao-qian-item') + item">
              <view class="page-tabs__content">{{ $t('nei-rong') }}{{ tab8 + 1 }}</view>
            </wd-tab>
          </block>
        </wd-tabs>
      </demo-group-item>
      <demo-group-item no-padding :title="$t('shou-shi-hua-dong')">
        <wd-tabs v-model="tab5" swipeable animated @change="handleChange">
          <block v-for="item in 4" :key="item">
            <wd-tab :title="$t('biao-qian-item') + item">
              <view class="page-tabs__content">{{ $t('nei-rong') }}{{ tab5 + 1 }}</view>
            </wd-tab>
          </block>
        </wd-tabs>
      </demo-group-item>
      <demo-group-item no-padding :title="$t('shu-liang-da-yu-6-shi-ke-gun-dong')">
        <wd-tabs v-model="tab6" @change="handleChange">
          <block v-for="item in 7" :key="item">
            <wd-tab :title="$t('biao-qian-item') + item">
              <view class="page-tabs__content">{{ $t('nei-rong') }}{{ tab6 + 1 }}</view>
            </wd-tab>
          </block>
        </wd-tabs>
      </demo-group-item>
      <demo-group-item no-padding :title="$t('zuo-dui-qi-chao-chu-ji-ke-gun-dong')">
        <wd-tabs v-model="tab9" slidable="always" @change="handleChange">
          <block v-for="item in 5" :key="item">
            <wd-tab :title="$t('chao-da-biao-qian-item') + item">
              <view class="page-tabs__content">{{ $t('nei-rong') }}{{ tab9 + 1 }}</view>
            </wd-tab>
          </block>
        </wd-tabs>
      </demo-group-item>
      <demo-group-item no-padding :title="$t('shu-liang-da-yu-10-shi-chu-xian-dao-hang-di-tu')">
        <wd-tabs v-model="tab7" @change="handleChange">
          <block v-for="item in 11" :key="item">
            <wd-tab :title="$t('biao-qian-item') + item">
              <view class="page-tabs__content page-tabs__content--large">{{ $t('nei-rong') }}{{ tab7 + 1 }}</view>
            </wd-tab>
          </block>
        </wd-tabs>
      </demo-group-item>
      <demo-group-item no-padding :title="$t('zai-dan-chu-kuang-zhong-shi-yong-0')">
        <view class="page-tabs__section">
          <wd-button @click="handleOpenClick">{{ $t('da-kai-dan-chuang') }}</wd-button>
        </view>
      </demo-group-item>
    </demo-group>

    <wd-popup
      v-model="showPopup"
      position="bottom"
      safe-area-inset-bottom
      @after-enter="handlePopupShow"
      closable
      custom-style="padding: 0 var(--wot-padding-loose);"
    >
      <view class="page-tabs__title">{{ $t('zai-dan-chu-kuang-zhong-shi-yong-0') }}</view>
      <wd-tabs v-model="tab10" ref="tabsRef">
        <wd-tab v-for="item in tabs" :key="item" :title="item" :name="item">
          <view class="page-tabs__content">{{ $t('nei-rong') }}{{ tab10 }}</view>
        </wd-tab>
      </wd-tabs>
    </wd-popup>

    <demo-group transparent>
      <demo-group-item no-padding :title="$t('shi-yong-name-bang-ding')">
        <wd-tabs v-model="activeTab" @change="handleChange" sticky :bindUseName="true">
          <wd-tab v-for="(tab, i) in tabs2" :key="i" :title="tab.label" :name="tab.value" />
        </wd-tabs>
      </demo-group-item>
    </demo-group>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import type { TabsInstance } from '@/uni_modules/wot-ui/components/wd-tabs/types'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const tabs = ref(['this', 'is', 'a', 'individual', 'example'])
const tabs2 = [
  { label: '全部', value: -1, disabled: false },
  { label: '待兑换', value: 0, disabled: true },
  { label: '已兑换', value: 1, disabled: false },
  { label: '已拒绝', value: 3, disabled: false },
  { label: '已取消', value: 2, disabled: false }
]

const activeTab = ref(0)

const tab = ref('a')

const tabWithBadge = ref(0)

const tabsWithBadge = computed(() => {
  return [
    {
      title: t('pu-tong-shu-zhi'),
      badgeProps: {
        modelValue: 10,
        right: '-8px'
      }
    },
    {
      title: t('zui-da-zhi-0'),
      badgeProps: {
        modelValue: 100,
        max: 99,
        right: '-8px'
      }
    },
    {
      title: t('dian-zhuang-0'),
      badgeProps: {
        isDot: true,
        right: '-8px',
        showZero: true
      }
    }
  ]
})

const lineThemes = ['normal', 'text', 'underline', 'dot'] as const
const tabLineTheme = reactive<Record<(typeof lineThemes)[number], number>>({
  normal: 0,
  text: 0,
  underline: 0,
  dot: 0
})

const tab1 = ref<number>(0)
const tab2 = ref<number>(0)
const tab3 = ref<number>(1)
const tab4 = ref<number>(2)
const tab5 = ref<number>(0)
const tab6 = ref<number>(0)
const tab7 = ref<number>(0)
const tab8 = ref<number>(0)
const tab9 = ref<number>(0)
const tab10 = ref<number>(3)

const toast = useToast()
function handleClick({ index, name }: any) {
  console.log('event', { index, name })
  toast.show(t('dian-ji-le-biao-qian-name') + name)
}
function handleChange(event: any) {
  console.log('change', event)
}

const showPopup = ref(false) // 控制popup显示
const tabsRef = ref<TabsInstance>() // 获取分段器实例

/**
 * 点击按钮打开popup
 */
function handleOpenClick() {
  showPopup.value = true
}
/**
 * popup打开后更新分段器样式
 */
function handlePopupShow() {
  tabsRef.value?.updateLineStyle(false)
}
</script>
<style lang="scss" scoped>
.tabs-theme-item {
  margin-bottom: $spacing-super-loose;

  &__label {
    margin-bottom: $spacing-main;
    padding-left: 15px;
    font-size: $typography-body-size-main;
    color: $text-auxiliary;
  }
}

.page-tabs {
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    text-align: center;

    &--large {
      line-height: 320px;
    }
  }

  &__section {
    padding: 0 $padding-loose;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $padding-loose 0;
    font-size: $typography-body-size-extra-large;
    color: $text-main;
  }
}
</style>
