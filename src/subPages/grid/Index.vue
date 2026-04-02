<template>
  <view>
    <page-wraper>
      <wd-toast />
      <view class="page-grid">
        <demo-group title="组件类型">
          <demo-group-item :title="$t('jiBenYongFa')" transparent no-padding>
            <wd-grid clickable>
              <wd-grid-item icon="image" :text="$t('wen-zi')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-0')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-1')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-2')" />
            </wd-grid>
          </demo-group-item>

          <demo-group-item :title="$t('nei-rong-cha-cao')" transparent no-padding>
            <wd-grid>
              <wd-grid-item>
                <image class="img" :src="img" />
              </wd-grid-item>
              <wd-grid-item>
                <image class="img" :src="img" />
              </wd-grid-item>
              <wd-grid-item use-slot>
                <image class="img" :src="img" />
              </wd-grid-item>
            </wd-grid>
          </demo-group-item>
        </demo-group>

        <demo-group title="组件变体">
          <demo-group-item :title="$t('zi-ding-yi-lie-shu')" transparent no-padding>
            <wd-grid :column="3">
              <wd-grid-item icon="image" :text="$t('wen-zi-3')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-4')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-5')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-6')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-7')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-8')" />
            </wd-grid>
          </demo-group-item>

          <demo-group-item :title="$t('zheng-fang-xing-ge-zi')" transparent no-padding>
            <wd-grid square :column="4" border :gutter="10">
              <wd-grid-item icon="image" :text="$t('wen-zi-22')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-23')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-24')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-25')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-26')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-27')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-28')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-29')" />
            </wd-grid>
          </demo-group-item>
        </demo-group>

        <demo-group title="组件样式">
          <demo-group-item :title="$t('zi-ding-yi-bei-jing-yan-se')" transparent no-padding>
            <wd-grid class="custom-bg-grid">
              <wd-grid-item icon="image" :text="$t('wen-zi-9')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-10')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-11')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-12')" />
            </wd-grid>
          </demo-group-item>

          <demo-group-item :title="$t('xian-shi-border')">
            <wd-grid :column="3" border>
              <wd-grid-item icon="image" :text="$t('wen-zi-13')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-14')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-15')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-16')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-17')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-18')" />
            </wd-grid>
          </demo-group-item>

          <demo-group-item :title="$t('she-ding-ge-jian-xi')" transparent no-padding>
            <wd-grid :gutter="10" :column="4">
              <wd-grid-item icon="image" :text="$t('wen-zi-30')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-31')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-32')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-33')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-34')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-35')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-36')" />
              <wd-grid-item icon="image" :text="$t('wen-zi-37')" />
            </wd-grid>
          </demo-group-item>

          <demo-group-item :title="$t('ti-shi-xin-xi')" transparent no-padding>
            <wd-grid>
              <wd-grid-item is-dot icon="gift" :text="$t('wen-zi-38')" />
              <wd-grid-item :value="100" :max="99" icon="desktop" :text="$t('wen-zi-39')" />
            </wd-grid>
          </demo-group-item>
        </demo-group>

        <demo-group title="布局能力">
          <demo-group-item title="横向布局" transparent no-padding>
            <wd-grid direction="horizontal" :column="2">
              <wd-grid-item icon="image" text="图标居左" />
              <wd-grid-item icon="settings" text="设置选项" />
              <wd-grid-item icon="tag" text="卡券中心" />
              <wd-grid-item icon="list" text="订单列表" />
            </wd-grid>
          </demo-group-item>
          <demo-group-item title="横向布局 + 图标调换" transparent no-padding>
            <wd-grid direction="horizontal" reverse :column="2" border>
              <wd-grid-item icon="image" text="图标居右" />
              <wd-grid-item icon="settings" text="设置选项" />
              <wd-grid-item icon="tag" text="卡券中心" />
              <wd-grid-item icon="list" text="订单列表" />
            </wd-grid>
          </demo-group-item>
        </demo-group>

        <demo-group title="特殊样式">
          <demo-group-item :title="$t('tu-biao-cha-cao')" transparent no-padding>
            <wd-grid>
              <wd-grid-item :text="$t('wen-zi-19')" icon-size="36px">
                <template #icon>
                  <image class="slot-img" :src="img" />
                </template>
              </wd-grid-item>
              <wd-grid-item :text="$t('wen-zi-20')" icon-size="36px">
                <template #icon>
                  <image class="slot-img" :src="img" />
                </template>
              </wd-grid-item>
              <wd-grid-item :text="$t('wen-zi-21')" icon-size="36px">
                <template #icon>
                  <image class="slot-img" :src="img" />
                </template>
              </wd-grid-item>
            </wd-grid>
          </demo-group-item>

          <demo-group-item :title="$t('wen-zi-cha-cao')" transparent no-padding>
            <wd-grid>
              <wd-grid-item icon="image">
                <template #text>
                  <view class="text">{{ $t('zi-ding-yi-wen-zi-cha-cao') }}</view>
                </template>
              </wd-grid-item>
              <wd-grid-item icon="image">
                <template #text>
                  <view class="text">{{ $t('zi-ding-yi-wen-zi-cha-cao-0') }}</view>
                </template>
              </wd-grid-item>
              <wd-grid-item icon="image">
                <template #text>
                  <view class="text">{{ $t('zi-ding-yi-wen-zi-cha-cao-1') }}</view>
                </template>
              </wd-grid-item>
            </wd-grid>
          </demo-group-item>

          <demo-group-item :title="$t('ziDingYiYangShi')" transparent no-padding>
            <wd-grid>
              <wd-grid-item
                custom-class="custom-item"
                ellipsis
                icon="search-line"
                :text="$t('wot-ui-yi-ge-gao-yan-zhi-qing-liang-hua-de-uniapp-zu-jian-ku')"
              />
              <wd-grid-item
                custom-class="custom-item"
                ellipsis
                icon="settings"
                :text="$t('ji-yu-vue3ts-kai-fa-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti')"
              />
            </wd-grid>
          </demo-group-item>

          <demo-group-item :title="$t('ye-mian-dao-hang')" transparent no-padding>
            <wd-grid clickable>
              <wd-grid-item link-type="redirectTo" url="/pages/button/Index" @itemclick="click" icon="edit" :text="$t('redirect-to')" />
              <wd-grid-item link-type="navigateTo" url="/pages/button/Index" @itemclick="click" icon="edit" :text="$t('navigate-to')" />
            </wd-grid>
          </demo-group-item>
        </demo-group>
      </view>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import blackMao from '../img/black_mao.png'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const img = ref<string>(blackMao)

const toast = useToast()
function click() {
  toast.show(t('cheng-gong-tiao-zhuan'))
}
</script>
<style lang="scss" scoped>
:deep(.custom-item) {
  color: $danger-main;
  text-align: left !important;
  padding: 0 $padding-main;
  background: $base-white;
}

.custom-bg-grid {
  :deep(.wd-grid-item__content) {
    background: $coolgrey-1;
  }
}

.img {
  width: 100%;
  height: 90px;
  display: inline-block;
  background-size: cover;
  vertical-align: middle;
}

.slot-img {
  height: $n-36;
  width: $n-36;
  border-radius: $radius-main;
}

.text {
  color: $warning-main;
  margin-top: $spacing-tight;
}
</style>
