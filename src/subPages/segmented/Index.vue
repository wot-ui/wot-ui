<template>
  <view>
    <page-wraper>
      <view class="page-segmented">
        <demo-group title="组件类型">
          <demo-group-item no-padding title="基础用法">
            <view class="section">
              <wd-segmented :options="list" v-model:value="currentBasic"></wd-segmented>
            </view>
          </demo-group-item>
        </demo-group>

        <demo-group title="组件状态">
          <demo-group-item no-padding :title="$t('jin-yong-fen-duan-qi')">
            <view class="section">
              <wd-segmented :options="list" v-model:value="currentDisabled" disabled></wd-segmented>
            </view>
          </demo-group-item>
        </demo-group>

        <demo-group title="组件变体">
          <demo-group-item no-padding title="轮廓主题">
            <view class="section">
              <wd-segmented :options="list" v-model:value="currentOutline" theme="outline"></wd-segmented>
            </view>
          </demo-group-item>
        </demo-group>

        <demo-group title="组件样式">
          <demo-group-item no-padding :title="$t('zi-ding-yi-xuan-ran-fen-duan-qi-biao-qian')">
            <view class="section">
              <wd-segmented :options="list1" v-model:value="currentCustom" :vibrate-short="true" @change="handleChange">
                <template #label="{ option }">
                  <view class="section-slot">
                    <image class="avatar" :src="option.payload.avatar" />
                    <view class="name">{{ option.value }}</view>
                  </view>
                </template>
              </wd-segmented>
            </view>
          </demo-group-item>
        </demo-group>

        <demo-group title="特殊样式">
          <demo-group-item no-padding :title="$t('dai-zhen-dong-xiao-guo-de-fen-duan-qi')">
            <view class="section">
              <wd-segmented :options="list" v-model:value="currentVibrate" :vibrate-short="true"></wd-segmented>
            </view>
          </demo-group-item>
          <wd-popup v-model="showPopup" position="bottom" @after-enter="handlePopupShow" closable custom-style="height: 200px; padding: 0 24rpx;">
            <view class="title">{{ $t('zai-dan-chu-kuang-zhong-shi-yong-0') }}</view>
            <wd-segmented :options="list" v-model:value="currentPopup" ref="segmentedRef" @change="handleChange"></wd-segmented>
          </wd-popup>
          <demo-group-item no-padding :title="$t('zai-dan-chu-kuang-zhong-shi-yong')">
            <view class="section">
              <wd-button @click="handleClick">{{ $t('da-kai-dan-chuang') }}</wd-button>
            </view>
          </demo-group-item>
        </demo-group>
      </view>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import type { SegmentedInstance, SegmentedOption } from '@/uni_modules/wot-ui/components/wd-segmented/types'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const list = computed(() => [t('pingLun'), t('dian-zan'), t('gong-xian'), t('da-shang')])

const list1 = computed(() => [
  {
    value: t('li-lei'),
    disabled: true,
    payload: {
      avatar: 'https://wot-ui.cn/assets/redpanda.jpg'
    }
  },
  {
    value: t('han-mei-mei'),
    disabled: false,
    payload: {
      avatar: 'https://wot-ui.cn/assets/capybara.jpg'
    }
  },
  {
    value: t('lin-tao'),
    disabled: true,
    payload: {
      avatar: 'https://wot-ui.cn/assets/panda.jpg'
    }
  },
  {
    value: t('tom'),
    disabled: false,
    payload: {
      avatar: 'https://wot-ui.cn/assets/meng.jpg'
    }
  }
])

const currentBasic = ref(t('xiang-qing'))
const currentOutline = ref(t('pingLun'))
const currentVibrate = ref(t('da-shang-0'))
const currentCustom = ref(t('han-mei-mei-0'))
const currentDisabled = ref(t('pingLun'))

function handleChange(option: SegmentedOption) {
  console.log(option)
}

const currentPopup = ref(t('dian-zan'))
const segmentedRef = ref<SegmentedInstance>()
const showPopup = ref(false)
function handleClick() {
  showPopup.value = true
}
function handlePopupShow() {
  segmentedRef.value?.updateActiveStyle()
}
</script>
<style lang="scss" scoped>
.section {
  width: 100%;
  padding: 0 24rpx;
  box-sizing: border-box;
  &-slot {
    padding: 4px;
  }
}

.avatar {
  border-radius: 50%;
  width: 32px;
  height: 32px;
}

.title {
  display: flex;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  padding: 24rpx 0;
}
</style>
