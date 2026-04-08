<template>
  <page-wraper>
    <view class="page-checkbox">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-checkbox-group custom-class="page-checkbox__group" v-model="value1">
            <wd-checkbox :name="1">{{ $t('duo-xuan-1') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('duo-xuan-2') }}</wd-checkbox>
            <wd-checkbox :name="3" type="square">{{ $t('duo-xuan-3') }}</wd-checkbox>
            <wd-checkbox :name="4" type="square">{{ $t('duo-xuan-4') }}</wd-checkbox>
            <wd-checkbox :name="5" type="dot">{{ $t('duo-xuan-5') }}</wd-checkbox>
            <wd-checkbox :name="6" type="dot">{{ $t('duo-xuan-6') }}</wd-checkbox>
            <wd-checkbox :name="7">
              {{
                $t(
                  'duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan'
                )
              }}
            </wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('jin-yong-zhuang-tai')">
          <wd-checkbox-group custom-class="page-checkbox__group" v-model="value8" disabled>
            <wd-checkbox :name="1">{{ $t('duo-xuan-1-0') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('duo-xuan-2-0') }}</wd-checkbox>
          </wd-checkbox-group>
          <wd-divider dashed />
          <wd-checkbox-group custom-class="page-checkbox__group" v-model="value9">
            <wd-checkbox :name="1">{{ $t('duo-xuan-1-1') }}</wd-checkbox>
            <wd-checkbox :name="2" disabled>{{ $t('duo-xuan-2-1') }}</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('ban-xuan-zhuang-tai')">
          <wd-checkbox v-model="check" :indeterminate="indeterminate" @change="indeterminate = false">{{ $t('ban-xuan-zhuang-tai-0') }}</wd-checkbox>
        </demo-group-item>

        <demo-group-item :title="$t('zhi-du-zhuang-tai')">
          <wd-checkbox-group custom-class="page-checkbox__group" v-model="value10" readonly>
            <wd-checkbox :name="1">{{ $t('duo-xuan-1-2') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('duo-xuan-2-2') }}</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('gou-xuan-zai-you-ce')">
          <wd-checkbox-group custom-class="page-checkbox__group" v-model="value2" placement="right">
            <wd-checkbox :name="1">{{ $t('duo-xuan-1-3') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('duo-xuan-2-3') }}</wd-checkbox>
            <wd-checkbox :name="3" type="square">{{ $t('duo-xuan-3-0') }}</wd-checkbox>
            <wd-checkbox :name="4" type="square">{{ $t('duo-xuan-4-0') }}</wd-checkbox>
            <wd-checkbox :name="5" type="dot">{{ $t('duo-xuan-5-0') }}</wd-checkbox>
            <wd-checkbox :name="6" type="dot">{{ $t('duo-xuan-6-0') }}</wd-checkbox>
            <wd-checkbox :name="7">
              {{
                $t(
                  'duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-duo-xuan-0'
                )
              }}
            </wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('xiu-gai-xing-zhuang-button')">
          <wd-checkbox-group v-model="value4" type="button">
            <wd-checkbox :name="1">{{ $t('duo-xuan-1-4') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('duo-xuan-2-4') }}</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('tong-hang-zhan-shi')">
          <wd-checkbox-group v-model="value5" direction="horizontal">
            <wd-checkbox :name="1">{{ $t('duo-xuan-1-5') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('duo-xuan-2-5') }}</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('she-zhi-zui-xiao-xuan-zhong-shu-liang-he-zui-da-xuan-zhong-shu-liang')">
          <wd-checkbox-group custom-class="page-checkbox__group" v-model="value11" :min="1" :max="3">
            <wd-checkbox :name="1">{{ $t('duo-xuan-1-6') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('duo-xuan-2-6') }}</wd-checkbox>
            <wd-checkbox :name="3">{{ $t('duo-xuan-3-1') }}</wd-checkbox>
            <wd-checkbox :name="4">{{ $t('duo-xuan-4-1') }}</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('xiu-gai-xuan-zhong-yan-se')">
          <wd-checkbox-group custom-class="page-checkbox__group" v-model="value6" checked-color="#fa4350">
            <wd-checkbox :name="1">{{ $t('duo-xuan-1-7') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('duo-xuan-2-7') }}</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('xiu-gai-wei-xuan-zhong-yan-se')">
          <wd-checkbox-group custom-class="page-checkbox__group" v-model="value7" unchecked-color="#fa4350">
            <wd-checkbox :name="1">{{ $t('duo-xuan-1-8') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('duo-xuan-2-8') }}</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('zi-ding-yi-tu-biao')">
          <wd-checkbox-group custom-class="page-checkbox__group" v-model="value12">
            <wd-checkbox :name="1">
              {{ $t('zi-ding-yi-tu-biao') }}
              <template #icon="{ isChecked }">
                <wd-icon :name="isChecked ? 'star-fill' : 'star'" size="22px" :color="isChecked ? '#fa4350' : '#ccc'" />
              </template>
            </wd-checkbox>
            <wd-checkbox :name="2">
              {{ $t('zi-ding-yi-tu-biao') }}
              <template #icon="{ isChecked }">
                <wd-icon :name="isChecked ? 'star-fill' : 'star'" size="22px" :color="isChecked ? '#fa4350' : '#ccc'" />
              </template>
            </wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('da-chi-cun')">
          <wd-checkbox-group custom-class="page-checkbox__group" v-model="value13" size="large">
            <wd-checkbox :name="1">{{ $t('duo-xuan-1-9') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('duo-xuan-2-9') }}</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')" transparent>
        <demo-group-item :title="$t('jie-he-cell-shi-yong')" no-padding>
          <wd-checkbox-group v-model="value14" direction="horizontal">
            <wd-cell-group border value-align="right">
              <wd-cell :title="$t('dian-zan')" clickable @click="toggle(1)">
                <wd-checkbox :name="1" />
              </wd-cell>
              <wd-cell :title="$t('tou-bi')" clickable @click="toggle(2)">
                <wd-checkbox :name="2" />
              </wd-cell>
              <wd-cell :title="$t('yi-jian-san-lian')" clickable @click="toggle(3)">
                <wd-checkbox :name="3" />
              </wd-cell>
            </wd-cell-group>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('quan-xuan-qie-huan')">
          <wd-button custom-class="custom-button" size="small" type="info" @click="checkboxGroup?.toggleAll()">
            {{ $t('quan-bu-qie-huan') }}
          </wd-button>
          <wd-button custom-class="custom-button" size="small" type="success" @click="checkboxGroup?.toggleAll(true)">
            {{ $t('quan-xuan') }}
          </wd-button>
          <wd-button custom-class="custom-button" size="small" type="primary" @click="checkboxGroup?.toggleAll(false)">
            {{ $t('quan-bu-xuan') }}
          </wd-button>
          <wd-button custom-class="custom-button" size="small" type="warning" @click="checkboxGroup?.toggleAll({ skipDisabled: true })">
            {{ $t('quan-bu-qie-huan-tiao-guo-jin-yong') }}
          </wd-button>
          <wd-button custom-class="custom-button" size="small" type="danger" @click="checkboxGroup?.toggleAll({ checked: true, skipDisabled: true })">
            {{ $t('quan-bu-xuan-zhong-tiao-guo-jin-yong') }}
          </wd-button>

          <wd-checkbox-group custom-class="page-checkbox__group" v-model="value15" ref="checkboxGroup">
            <wd-checkbox :name="1">{{ $t('duo-xuan-1-10') }}</wd-checkbox>
            <wd-checkbox :name="2">{{ $t('duo-xuan-2-10') }}</wd-checkbox>
            <wd-checkbox :name="3" disabled>{{ $t('duo-xuan-3disabled') }}</wd-checkbox>
            <wd-checkbox :name="4">{{ $t('duo-xuan-4-2') }}</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { CheckboxGroupInstance } from '@/uni_modules/wot-ui/components/wd-checkbox-group/types'

const value1 = ref<number[]>([1])
const value2 = ref<number[]>([1])
const value4 = ref<number[]>([1])
const value5 = ref<number[]>([1])
const value6 = ref<number[]>([1])
const value7 = ref<number[]>([1])
const value8 = ref<number[]>([1])
const value9 = ref<number[]>([1])
const value10 = ref<number[]>([1])
const value11 = ref<number[]>([1, 2])
const value12 = ref<number[]>([1])
const value13 = ref<number[]>([1])
const value14 = ref<number[]>([1])
const value15 = ref<number[]>([])
const check = ref<boolean>(false)
const indeterminate = ref<boolean>(true)

const checkboxGroup = ref<CheckboxGroupInstance>()

function toggle(value: number) {
  const index = value14.value.indexOf(value)
  if (index > -1) {
    value14.value.splice(index, 1)
  } else {
    value14.value.push(value)
  }
}
</script>
<style lang="scss" scoped>
.page-checkbox {
  :deep(.custom-button) {
    margin-right: 16px;
    margin-bottom: 16px;
  }

  &__group {
    .wd-checkbox {
      &:not(:last-child) {
        margin-bottom: $spacing-extra-loose;
      }
    }
  }
}
</style>
