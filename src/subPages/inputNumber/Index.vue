<template>
  <page-wraper>
    <view class="page-input-number">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ji-ben-shi-yong')">
          <view class="page-input-number__grid">
            <wd-input-number v-model="themeDefault" @change="handleChange" />
            <wd-input-number v-model="themePrimary" theme="primary" @change="handleChange" />
            <wd-input-number v-model="themeOutlineSplit" theme="outline-split" @change="handleChange" />
            <wd-input-number v-model="themeOutline" theme="outline" @change="handleChange" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('jinYong')">
          <view class="page-input-number__grid">
            <wd-input-number v-model="disabled" disabled />
            <wd-input-number v-model="disabled" disabled theme="primary" />
            <wd-input-number v-model="disabled" disabled theme="outline-split" />
            <wd-input-number v-model="disabled" disabled theme="outline" />
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('jin-yong-shu-ru-kuang')">
          <wd-input-number v-model="disableInput" disable-input @change="handleChange" />
        </demo-group-item>
        <demo-group-item :title="$t('jin-yong-jian-hao-an-niu')">
          <view class="page-input-number__grid">
            <wd-input-number v-model="disableMinusDefault" disable-minus @change="handleChange" />
            <wd-input-number v-model="disableMinusPrimary" disable-minus theme="primary" @change="handleChange" />
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('jin-yong-jia-hao-an-niu')">
          <view class="page-input-number__grid">
            <wd-input-number v-model="disablePlusDefault" disable-plus @change="handleChange" />
            <wd-input-number v-model="disablePlusPrimary" disable-plus theme="primary" @change="handleChange" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('yuan-jiao-yang-shi')">
          <view class="page-input-number__grid">
            <wd-input-number v-model="roundDefault" round @change="handleChange" />
            <wd-input-number v-model="roundPrimary" round theme="primary" @change="handleChange" />
            <wd-input-number v-model="roundOutlineSplit" round theme="outline-split" @change="handleChange" />
            <wd-input-number v-model="roundOutline" round theme="outline" @change="handleChange" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('she-zhi-bu-chang')">
          <wd-input-number v-model="step" :step="2" @change="handleChange" />
        </demo-group-item>
        <demo-group-item :title="$t('xian-zhi-zui-da-zui-xiao-zhi')">
          <wd-input-number v-model="range" :min="3" :max="10" @change="handleChange" />
        </demo-group-item>
        <demo-group-item :title="$t('she-zhi-xiao-shu-jing-du')">
          <wd-input-number v-model="precision" :precision="1" :step="0.1" @change="handleChange" />
        </demo-group-item>
        <demo-group-item :title="$t('shu-ru-yan-ge-wei-bu-shu-de-bei-shu')">
          <wd-input-number v-model="stepStrict" step-strictly :step="2" @change="handleChange" />
        </demo-group-item>
        <demo-group-item :title="$t('yan-ge-bu-jin-bian-jie-xian-zhi')">
          <view class="page-input-number__section">
            <view class="page-input-number__label">{{ $t('zhi-strictbounds-bu-jin-zhi-2-zui-xiao-zhi-3-zui-da-zhi-15', strictBounds) }}</view>
            <wd-input-number v-model="strictBounds" step-strictly :step="2" :min="3" :max="15" @change="handleChange" />
            <view class="page-input-number__tip">
              {{ $t('shu-ru-1-43-de-zui-xiao-2-de-bei-shu') }}
              <br />
              {{ $t('shu-ru-5-4-zui-jie-jin-de-2-de-bei-shu') }}
              <br />
              {{ $t('shu-ru-17-1415-de-zui-da-2-de-bei-shu') }}
            </view>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('xiu-gai-shu-ru-kuang-kuan-du')">
          <wd-input-number v-model="inputWidth" input-width="70px" @change="handleChange" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yong-fa')">
        <demo-group-item :title="$t('wu-shu-ru-kuang')">
          <view class="page-input-number__row">
            <view>{{ $t('shu-liang-value5') }}{{ withoutInput }}</view>
            <wd-input-number v-model="withoutInput" without-input @change="handleChange" />
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('yun-xu-kong-zhi-bing-she-zhi-placeholder')">
          <wd-input-number v-model="allowNull" allow-null :placeholder="$t('bu-xian')" input-width="70px" @change="handleChange" />
        </demo-group-item>
        <demo-group-item :title="$t('fei-yun-xu-kong-zhi-dan-ke-lin-shi-shan-chu')">
          <view class="page-input-number__section">
            <view class="page-input-number__label">{{ $t('zhi-tempempty-shi-jiao-shi-hui-zi-dong-xiu-zheng-wei-zui-xiao-zhi', tempEmpty) }}</view>
            <wd-input-number v-model="tempEmpty" :min="1" @change="handleChange" />
            <view class="page-input-number__tip">
              {{ $t('chang-shi-shan-chu-shu-ru-kuang-zhong-de-suo-you-nei-rong-ran-hou-dian-ji-qi-ta-di-fang-shi-jiao') }}
            </view>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('jian-pan-dan-qi-bu-shang-tui-ye-mian')">
          <wd-input-number v-model="adjustPosition" :adjust-position="false" @change="handleChange" />
        </demo-group-item>
        <demo-group-item :title="$t('fei-li-ji-geng-xin-mo-shi')">
          <view class="page-input-number__section">
            <view class="page-input-number__label">{{ $t('li-ji-geng-xin-mo-shi-mo-ren-zhi-immediate', immediate) }}</view>
            <wd-input-number v-model="immediate" :immediate-change="true" @change="handleChange" />
            <view class="page-input-number__label">{{ $t('fei-li-ji-geng-xin-mo-shi-zhi-notimmediate', notImmediate) }}</view>
            <wd-input-number v-model="notImmediate" :immediate-change="false" @change="handleChange" />
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('chu-shi-hua-shi-zi-dong-xiu-zheng')">
          <view class="page-input-number__section">
            <view class="page-input-number__label">{{ $t('zi-dong-xiu-zheng-chu-shi-zhi-zhi-updateoninit', updateOnInit) }}</view>
            <wd-input-number v-model="updateOnInit" :update-on-init="true" :min="3" :max="15" :step="2" step-strictly @change="handleChange" />
            <view class="page-input-number__label">{{ $t('bu-xiu-zheng-chu-shi-zhi-zhi-noupdateoninit', noUpdateOnInit) }}</view>
            <wd-input-number v-model="noUpdateOnInit" :update-on-init="false" :min="3" :max="15" :step="2" step-strictly @change="handleChange" />
            <view class="page-input-number__tip">
              {{ $t('shang-fang-zu-jian-hui-zai-chu-shi-hua-shi-zi-dong-jiang-zhi-1-xiu-zheng-wei-43-de-zui-xiao-2-de-bei-shu') }}
            </view>
          </view>
        </demo-group-item>
        <demo-group-item :title="$t('yi-bu-bian-geng')">
          <wd-input-number v-model="asyncChange" :before-change="beforeChange" />
        </demo-group-item>
        <demo-group-item :title="$t('chang-an-jia-jian')">
          <wd-input-number v-model="longPress" long-press @change="handleChange" />
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui'
import { type InputNumberBeforeChange } from '@/uni_modules/wot-ui/components/wd-input-number/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { loading, close } = useToast()
const { t } = useI18n()

const themeDefault = ref(1)
const themePrimary = ref(1)
const themeOutlineSplit = ref(1)
const themeOutline = ref(1)

const roundDefault = ref(1)
const roundPrimary = ref(1)
const roundOutlineSplit = ref(1)
const roundOutline = ref(1)

const step = ref(1)
const range = ref(1)

const disabled = ref(2)
const disableInput = ref(1)
const disableMinusDefault = ref(1)
const disableMinusPrimary = ref(1)
const disablePlusDefault = ref(1)
const disablePlusPrimary = ref(1)

const withoutInput = ref(1)
const precision = ref('1.2')
const stepStrict = ref(1)
const strictBounds = ref(4)

const inputWidth = ref(2)
const allowNull = ref('')
const tempEmpty = ref(1)
const adjustPosition = ref(1)

const immediate = ref(1)
const notImmediate = ref(1)
const updateOnInit = ref(1)
const noUpdateOnInit = ref(1)

const asyncChange = ref(1)
const longPress = ref(1)

function handleChange({ value }: { value: number | string }) {
  console.log('change:', value)
}

const beforeChange: InputNumberBeforeChange = (value) => {
  loading({ msg: t('zheng-zai-geng-xin-dao-value') + value })
  return new Promise((resolve) => {
    setTimeout(() => {
      close()
      resolve(true)
    }, 500)
  })
}
</script>

<style lang="scss" scoped>
.page-input-number {
  :deep(.demo-group-item__content) {
    overflow: hidden;
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: $spacing-extra-loose;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    font-size: $typography-body-size-main;
    color: $text-main;
    margin-bottom: $spacing-tight;
    font-weight: $font-weight-medium;
  }

  &__tip {
    font-size: $typography-label-size-main;
    color: $text-auxiliary;
    margin-top: $n-12;
    line-height: $typography-label-line-height-size-main;
    padding: $spacing-tight;
    background: $filled-content;
    border-radius: $radius-main;
  }

  &__section {
    :deep(.wd-input-number) {
      margin-bottom: $n-16;
    }
  }

  :deep(.wd-input-number) {
    margin-bottom: 0;
  }
}
</style>
