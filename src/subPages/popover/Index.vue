<template>
  <page-wraper>
    <wd-toast />
    <view @click="closeOutside" class="page-popover">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <view class="page-popover__center">
            <wd-popover id="pop1" :content="$t('zhe-shi-yi-duan-nei-rong')" :placement="placement" v-model="show1">
              <wd-button data-id="pop1">{{ $t('dian-ji-zhan-shi') }}</wd-button>
            </wd-popover>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('lie-biao-zhan-shi')">
          <view class="page-popover__center">
            <wd-popover v-model="show3" mode="menu" :placement="placement" :content="menu" @menuclick="link">
              <wd-button>{{ $t('lie-biao') }}</wd-button>
            </wd-popover>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('wei-zhi')">
          <wd-radio-group v-model="placement" direction="horizontal" type="dot">
            <wd-radio v-for="item in placementItems" :key="item" :value="item" custom-class="page-popover__radio">{{ item }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('qian-tao-xin-xi')">
          <view class="page-popover__center">
            <wd-popover v-model="show2" :placement="placement">
              <template #content>
                <view class="page-popover__content">{{ $t('zhe-shi-yi-duan-zi-ding-yi-yang-shi-de-nei-rong') }}</view>
              </template>
              <wd-button>{{ $t('dian-ji-zhan-shi-0') }}</wd-button>
            </wd-popover>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('xian-shi-guan-bi-an-niu')">
          <view class="page-popover__center">
            <wd-popover v-model="show5" :content="$t('zhe-shi-yi-duan-nei-rong')" :placement="placement" show-close>
              <wd-button>{{ $t('xian-shi-guan-bi-an-niu') }}</wd-button>
            </wd-popover>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('dong-tai-nei-rong-yu-wei-zhi-geng-xin')">
          <view class="page-popover__center">
            <wd-popover v-model="show4" ref="popoverRef" :placement="placement">
              <template #content>
                <view class="page-popover__content" :style="{ width: dynamicWidth + 'px' }">
                  <view class="page-popover__status">{{ $t('dang-qian-kuan-du-dynamicwidth-px', dynamicWidth) }}</view>
                  <wd-button custom-class="page-popover__btn" size="small" @click="changeSize">{{ $t('gai-bian-da-xiao-bing-geng-xin') }}</wd-button>
                </view>
              </template>
              <wd-button>{{ $t('dong-tai-nei-rong') }}</wd-button>
            </wd-popover>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import { nextTick, ref } from 'vue'
import { useQueue } from '@/uni_modules/wot-ui'
import type { PlacementType, PopoverInstance, PopoverMenuItem } from '@/uni_modules/wot-ui/components/wd-popover/types'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { closeOutside } = useQueue()
const toast = useToast()

const placementItems = [
  'bottom',
  'bottom-start',
  'bottom-end',
  'top',
  'top-start',
  'top-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end'
] as const

const placement = ref<PlacementType>('bottom')

const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show3 = ref<boolean>(false)
const show4 = ref<boolean>(false)
const show5 = ref<boolean>(false)
const dynamicWidth = ref<number>(150)
const popoverRef = ref<PopoverInstance | null>(null)

const menu = ref<Array<PopoverMenuItem>>([
  {
    iconClass: 'check', // 替换了不存在的 'read' 图标
    content: t('quan-bu-biao-ji-yi-du')
  },
  {
    iconClass: 'delete',
    content: t('qing-kong-zui-jin-hui-hua')
  },
  {
    iconClass: 'subscribe', // 原本使用的是不匹配且不存在的 'detection'，根据文案替换为 'subscribe'
    content: t('xiao-xi-ding-yue-she-zhi')
  },
  {
    iconClass: 'scan', // 原本使用的是 'subscribe'，根据异常检测文案替换为 'scan'
    content: t('xiao-xi-yi-chang-jian-ce')
  }
])

function link(e: any) {
  toast.show(t('xuan-ze-le') + e.item.content)
}

function changeSize() {
  dynamicWidth.value = dynamicWidth.value === 150 ? 250 : 150
  nextTick(() => {
    popoverRef.value?.updatePosition()
  })
}
</script>
<style lang="scss">
@use '@/uni_modules/wot-ui/styles/variable.scss' as *;

.page-popover {
  width: 100%;

  &__center {
    text-align: center;
    padding-bottom: $spacing-super-loose;
  }

  &__status {
    margin-bottom: 10px;
  }

  &__content {
    /* 必填 开始 */
    position: relative;
    z-index: 500;
    border-radius: $radius-main;
    /* 必填 结束 */
    background: $filled-oppo;
    color: $purple-6;
    font-weight: $font-weight-semibold;
    padding: $padding-main;
    width: 150px;
  }

  :deep(.page-popover__demo) {
    overflow: visible !important;
    padding: $padding-main;
  }

  :deep(.page-popover__radio) {
    height: $n-32 !important;
    line-height: $n-32 !important;
  }

  :deep(.page-popover__btn) {
    margin: 0 !important;
  }
}
</style>
