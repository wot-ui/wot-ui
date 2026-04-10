<template>
  <page-wraper>
    <view class="page-button">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('lei-xing')">
          <wd-button v-for="item in typeItems" :key="`base-${item.type}`" :type="item.type">{{ $t(item.textKey) }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('jinYong')">
          <wd-button v-for="item in typeItems" :key="`disabled-${item.type}`" :type="item.type" disabled>{{ $t(item.textKey) }}</wd-button>
        </demo-group-item>
        <demo-group-item :title="$t('jia-zai')">
          <view class="page-button__row">
            <wd-button v-for="item in typeItems" :key="`loading-${item.type}`" :type="item.type" loading>{{ $t('jia-zai-zhong-0') }}</wd-button>
          </view>
          <view class="page-button__row">
            <wd-button v-for="item in plainLoadingItems" :key="`loading-plain-${item.type}`" :type="item.type" variant="plain" loading>
              {{ $t('jia-zai-zhong-0') }}
            </wd-button>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('bian-ti-jin-yong')">
          <wd-button variant="plain" disabled>{{ $t('zhu-yao-an-niu') }}</wd-button>
          <wd-button type="success" variant="plain" disabled>{{ $t('cheng-gong-an-niu-0') }}</wd-button>
          <wd-button type="info" variant="dashed" disabled>{{ $t('xin-xi-an-niu') }}</wd-button>
          <wd-button type="warning" variant="dashed" disabled>{{ $t('jing-gao-an-niu-0') }}</wd-button>
          <wd-button type="danger" variant="text" disabled>{{ $t('wei-xian-an-niu') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item v-for="variant in variantItems" :key="variant.variant" :title="variant.title">
          <wd-button v-for="item in typeItems" :key="`${variant.variant}-${item.type}`" :type="item.type" :variant="variant.variant">
            {{ variant.variant === 'text' ? $t('an-niu-0') : $t(item.textKey) }}
          </wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('chi-cun')">
          <wd-button v-for="item in sizeItems" :key="item.size" :size="item.size">{{ item.text }}</wd-button>
        </demo-group-item>
        <demo-group-item :title="$t('xi-bian-kuang-yu-yuan-jiao')">
          <view class="page-button__row">
            <wd-button v-for="item in typeItems" :key="`hairline-${item.type}`" :type="item.type" variant="plain" hairline>
              {{ $t(item.textKey) }}
            </wd-button>
          </view>
          <view class="page-button__row">
            <wd-button v-for="item in typeItems" :key="`hairline-round-${item.type}`" :type="item.type" variant="plain" hairline round>
              {{ $t(item.textKey) }}
            </wd-button>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('yuan-jiao-dui-bi')">
          <view class="page-button__row">
            <wd-button v-for="item in typeItems" :key="`plain-round-${item.type}`" :type="item.type" variant="plain" round>
              {{ $t(item.textKey) }}
            </wd-button>
          </view>
          <view class="page-button__row">
            <wd-button v-for="item in typeItems" :key="`dashed-round-${item.type}`" :type="item.type" variant="dashed" round>
              {{ $t(item.textKey) }}
            </wd-button>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('customclass-yin-ying')">
          <wd-button v-for="item in typeItems" :key="`shadow-${item.type}`" :type="item.type" custom-class="page-button__shadow">
            {{ $t(item.textKey) }}
          </wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('nei-rong-xing-tai')">
        <demo-group-item :title="$t('text-shu-xing')">
          <wd-button :text="$t('mo-ren-an-niu')"></wd-button>
          <wd-button type="success" :text="$t('cheng-gong-an-niu-0')"></wd-button>
        </demo-group-item>
        <demo-group-item :title="$t('chun-tu-biao-an-niu')">
          <view class="page-button__row">
            <wd-button v-for="item in typeItems" :key="`icon-base-${item.type}`" icon="delete" :type="item.type"></wd-button>
          </view>
          <view class="page-button__row">
            <wd-button v-for="item in typeItems" :key="`icon-plain-${item.type}`" icon="delete" :type="item.type" variant="plain"></wd-button>
          </view>
          <view class="page-button__row">
            <wd-button v-for="item in typeItems" :key="`icon-round-${item.type}`" icon="delete" :type="item.type" variant="plain" round></wd-button>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('tu-wen-an-niu')">
          <wd-button icon="download">{{ $t('xia-zai') }}</wd-button>
          <wd-button icon="settings">{{ $t('she-zhi') }}</wd-button>
          <wd-button classPrefix="fish" icon="kehuishouwu">{{ $t('ke-hui-shou') }}</wd-button>
          <wd-button icon="download" size="small">{{ $t('xia-zai') }}</wd-button>
          <wd-button icon="settings" size="small">{{ $t('she-zhi') }}</wd-button>
          <wd-button icon="download" size="large">{{ $t('xia-zai') }}</wd-button>
          <wd-button icon="settings" size="large">{{ $t('she-zhi') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('bu-ju-neng-li')">
        <demo-group-item :title="$t('kuai-ji-an-niu')">
          <wd-button v-for="item in typeItems" :key="`block-${item.type}`" :type="item.type" block size="large" custom-class="page-button__block">
            {{ $t(item.textKey) }}
          </wd-button>
        </demo-group-item>
        <demo-group-item :title="$t('kuai-ji-yuan-jiao-zu-he')">
          <wd-button block size="large" round disabled custom-class="page-button__block">{{ $t('zhu-yao-an-niu') }}</wd-button>
          <wd-button block size="large" round custom-class="page-button__block">{{ $t('zhu-yao-an-niu') }}</wd-button>
          <wd-button block size="large" round loading custom-class="page-button__block">{{ $t('zhu-yao-an-niu') }}</wd-button>
          <wd-button type="info" block round size="large" disabled custom-class="page-button__block">{{ $t('xin-xi-an-niu') }}</wd-button>
          <wd-button type="info" block round size="large" custom-class="page-button__block">{{ $t('xin-xi-an-niu') }}</wd-button>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { type ButtonVariant, type ButtonType, type ButtonSize } from '@/uni_modules/wot-ui/components/wd-button/types'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const typeItems = [
  { type: 'primary', textKey: 'zhu-yao-an-niu' },
  { type: 'success', textKey: 'cheng-gong-an-niu-0' },
  { type: 'info', textKey: 'xin-xi-an-niu' },
  { type: 'warning', textKey: 'jing-gao-an-niu-0' },
  { type: 'danger', textKey: 'wei-xian-an-niu' }
] as const

const sizeItems = computed<Array<{ size: ButtonSize; text: string }>>(() => [
  { size: 'mini', text: t('mi-ni-an-niu') },
  { size: 'small', text: t('xiao-xing-an-niu') },
  { size: 'medium', text: t('pu-tong-an-niu') },
  { size: 'large', text: t('da-xing-an-niu') }
])

const variantItems = computed<Array<{ title: string; variant: ButtonVariant }>>(() => [
  { title: t('lou-kong'), variant: 'plain' },
  { title: t('xu-xian'), variant: 'dashed' },
  { title: t('rou-he'), variant: 'soft' },
  { title: t('wen-zi-10'), variant: 'text' }
])

const plainLoadingItems = computed<Array<{ type: ButtonType }>>(() => [
  { type: 'success' },
  { type: 'warning' },
  { type: 'danger' },
  { type: 'info' }
])
</script>
<style lang="scss">
.page-button {
  :deep(.demo-group-item__container) {
    padding-bottom: $spacing-super-tight;
  }

  .wd-button {
    margin: 0 $spacing-main $spacing-main 0;
  }

  &__row {
    margin-bottom: $spacing-loose;
  }

  :deep(.page-button__shadow) {
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  }

  :deep(.page-button__block) {
    margin-right: 0;
  }
}
</style>
