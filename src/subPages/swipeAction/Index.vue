<template>
  <page-wraper>
    <view class="swipe-action-demo" @click="closeOutside">
      <demo-group transparent title="组件类型">
        <demo-group-item no-padding :title="$t('jiBenYongFa')">
          <wd-swipe-action>
            <wd-cell :title="$t('biao-ti-wen-zi-10')" value="内容" />
            <template #right>
              <view class="swipe-action-demo__action">
                <view class="swipe-action-demo__button swipe-action-demo__button--danger" @click="handleAction('操作1')">{{ $t('cao-zuo-1') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--warning" @click="handleAction('操作2')">{{ $t('cao-zuo-2') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--primary" @click="handleAction('操作3')">{{ $t('cao-zuo-3') }}</view>
              </view>
            </template>
          </wd-swipe-action>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('zuo-you-hua-dong')">
          <wd-swipe-action>
            <template #left>
              <view class="swipe-action-demo__action">
                <view class="swipe-action-demo__button swipe-action-demo__button--danger">{{ $t('cao-zuo-1-0') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--warning">{{ $t('cao-zuo-2-0') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--primary">{{ $t('cao-zuo-3-0') }}</view>
              </view>
            </template>
            <wd-cell :title="$t('biao-ti-wen-zi-10')" value="内容" />
            <template #right>
              <view class="swipe-action-demo__action">
                <view class="swipe-action-demo__button swipe-action-demo__button--danger">{{ $t('cao-zuo-4') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--warning">{{ $t('cao-zuo-5') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--primary">{{ $t('cao-zuo-6') }}</view>
              </view>
            </template>
          </wd-swipe-action>
        </demo-group-item>
      </demo-group>

      <demo-group transparent title="组件状态">
        <demo-group-item no-padding :title="$t('jin-yong-hua-dong-an-niu')">
          <wd-swipe-action disabled>
            <wd-cell :title="$t('biao-ti-wen-zi-10')" value="内容" />
            <template #right>
              <view class="swipe-action-demo__action">
                <view class="swipe-action-demo__button swipe-action-demo__button--danger">{{ $t('cao-zuo-1-3') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--warning">{{ $t('cao-zuo-2-3') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--primary">{{ $t('cao-zuo-3-3') }}</view>
              </view>
            </template>
          </wd-swipe-action>
        </demo-group-item>
      </demo-group>

      <demo-group transparent title="特殊样式">
        <demo-group-item no-padding :title="$t('qie-huan-an-niu')">
          <wd-swipe-action v-model="value">
            <template #left>
              <view class="swipe-action-demo__action">
                <view class="swipe-action-demo__button swipe-action-demo__button--danger">{{ $t('cao-zuo-1-1') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--warning">{{ $t('cao-zuo-2-1') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--primary">{{ $t('cao-zuo-3-1') }}</view>
              </view>
            </template>
            <wd-cell :title="$t('biao-ti-wen-zi-10')" value="内容" />
            <template #right>
              <view class="swipe-action-demo__action">
                <view class="swipe-action-demo__button swipe-action-demo__button--danger">{{ $t('cao-zuo-4-0') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--warning">{{ $t('cao-zuo-5-0') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--primary">{{ $t('cao-zuo-6-0') }}</view>
              </view>
            </template>
          </wd-swipe-action>
          <view class="swipe-action-demo__button-group">
            <view @click.stop="noop">
              <wd-button size="small" @click="changeState('left')">{{ $t('da-kai-zuo-bian') }}</wd-button>
            </view>
            <view @click.stop="noop">
              <wd-button size="small" @click="changeState('close')">{{ $t('guan-bi-suo-you') }}</wd-button>
            </view>
            <view @click.stop="noop">
              <wd-button size="small" @click="changeState('right')">{{ $t('da-kai-you-bian') }}</wd-button>
            </view>
          </view>
        </demo-group-item>
        <demo-group-item no-padding title="关闭前拦截">
          <wd-swipe-action :before-close="beforeClose">
            <wd-cell title="标题文字" value="阻止点击内容区关闭" />
            <template #right>
              <view class="swipe-action-demo__action">
                <view class="swipe-action-demo__button swipe-action-demo__button--danger">删除</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--warning">标记</view>
              </view>
            </template>
          </wd-swipe-action>
        </demo-group-item>
        <demo-group-item no-padding :title="$t('dian-ji-shi-jian')">
          <wd-swipe-action @click="handleClick">
            <wd-cell :title="$t('biao-ti-wen-zi-10')" value="内容" />
            <template #right>
              <view class="swipe-action-demo__action">
                <view class="swipe-action-demo__button swipe-action-demo__button--danger">{{ $t('cao-zuo-1-2') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--warning">{{ $t('cao-zuo-2-2') }}</view>
                <view class="swipe-action-demo__button swipe-action-demo__button--primary">{{ $t('cao-zuo-3-2') }}</view>
              </view>
            </template>
          </wd-swipe-action>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast, useQueue } from '@/uni_modules/wot-ui'
import type { SwipeActionBeforeClose, SwipeActionStatus } from '@/uni_modules/wot-ui/components/wd-swipe-action/types'
const { t } = useI18n()
const { closeOutside } = useQueue()

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const toast = useToast()
const value = ref<SwipeActionStatus>('close')

const beforeClose: SwipeActionBeforeClose = (reason, position) => {
  return new Promise((resolve) => {
    const shouldClose = !(reason === 'click' && position === 'inside')

    if (!shouldClose) {
      toast.show('已拦截点击内容区导致的关闭')
      resolve(false)
    } else {
      toast.loading('处理中...')
      setTimeout(() => {
        toast.close()
        if (reason === 'click') {
          toast.show(t('reason-position-dao-zhi-hua-dong-an-niu-guan-bi', [reason, position]))
        } else {
          toast.show(t('reason-dao-zhi-position-hua-dong-an-niu-guan-bi', [reason, position]))
        }
        resolve(true)
      }, 3000)
    }
  })
}
function changeState(position: SwipeActionStatus) {
  value.value = position
}
function handleClick({ value }: any) {
  toast.show(t('dian-ji-value-guan-bi-cao-zuo-an-niu', [value]))
}
function handleAction(action: string) {
  toast.show(t('dian-ji-le-action') + action)
}

function noop() {}
</script>
<style lang="scss" scoped>
/* Block: swipe-action-demo */
.swipe-action-demo {
  /* Element: 左右滑出的操作区容器 */
  &__action {
    height: 100%;
  }

  /* Element: 操作按钮 */
  &__button {
    display: inline-block;
    padding: 0 $n-15;
    height: 100%;
    color: $text-white;
    line-height: $n-44;

    &--danger {
      background: $danger-main;
    }

    &--warning {
      background: $warning-main;
    }

    &--primary {
      background: $primary-5;
    }
  }

  /* Element: 底部切换状态按钮组 */
  &__button-group {
    padding: $padding-main;
    background: $filled-oppo;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
