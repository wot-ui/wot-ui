<template>
  <page-wraper>
    <view class="page-radio">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-radio-group custom-class="page-radio__group" v-model="valueBasic" @change="change">
            <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
            <wd-radio type="square" :value="3">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
            <wd-radio type="dot" :value="5">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
        <demo-group-item :title="$t('xiu-gai-xing-zhuang-button-0')">
          <wd-radio-group v-model="valueButton" type="button" @change="change">
            <wd-radio :value="1" placement="right">{{ $t('xuanXiang_1-0') }}</wd-radio>
            <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('jinYong')">
          <wd-radio-group custom-class="page-radio__group" v-model="valueDisabled" disabled type="dot">
            <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
            <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
          </wd-radio-group>
          <wd-divider dashed></wd-divider>
          <wd-radio-group custom-class="page-radio__group" v-model="valueDisabled" disabled>
            <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
            <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
          </wd-radio-group>
          <wd-divider dashed></wd-divider>
          <wd-radio-group custom-class="page-radio__group" v-model="valueDisabled" disabled type="button">
            <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
            <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
          </wd-radio-group>
          <wd-divider dashed></wd-divider>
          <wd-radio-group custom-class="page-radio__group" v-model="valueDisabled" disabled type="square">
            <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
            <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
        <demo-group-item :title="$t('zhi-du-zhuang-tai')">
          <wd-radio-group custom-class="page-radio__group" v-model="valueReadonly" readonly>
            <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
            <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
        <demo-group-item :title="$t('yun-xu-qu-xiao-xuan-zhong')">
          <wd-radio-group custom-class="page-radio__group" v-model="valueAllowUncheck" allow-uncheck @change="change">
            <wd-radio :value="1">{{ $t('zhi-chi-qu-xiao-xuan-zhong') }}</wd-radio>
            <wd-radio :value="2">{{ $t('zhi-chi-qu-xiao-xuan-zhong-0') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('tu-biao-wei-zhi')">
          <wd-radio-group custom-class="page-radio__group" v-model="valuePlacement" @change="change">
            <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
            <wd-radio type="square" :value="3">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
            <wd-radio type="dot" :value="5">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
          </wd-radio-group>
          <wd-divider dashed></wd-divider>
          <wd-radio-group custom-class="page-radio__group" v-model="valuePlacementRight" placement="right" @change="change">
            <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
            <wd-radio type="square" :value="3">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
            <wd-radio type="dot" :value="5">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
        <demo-group-item :title="$t('xiu-gai-xuan-zhong-yan-se')">
          <wd-radio-group custom-class="page-radio__group" v-model="valueCheckedColor" checked-color="#fa4350" @change="change">
            <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
            <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
          </wd-radio-group>
          <wd-divider dashed></wd-divider>
          <wd-radio-group custom-class="page-radio__group" v-model="valueCheckedColorDot" type="dot" checked-color="#fa4350" @change="change">
            <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
            <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
        <demo-group-item :title="$t('xiu-gai-wei-xuan-zhong-yan-se')">
          <wd-radio-group custom-class="page-radio__group" v-model="valueUnchecked" unchecked-color="#fa4350" @change="change">
            <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
            <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('radio-de-props-bi-radiogroup-de-you-xian-ji-gao')">
          <wd-radio-group v-model="valuePriority" type="button" disabled checked-color="#fa4350" @change="change">
            <wd-radio :value="1" checked-color="#000" :disabled="false">{{ $t('xuanXiang_1-0') }}</wd-radio>
            <wd-radio :value="2" :disabled="false">{{ $t('xuanXiang_2-0') }}</wd-radio>
            <wd-radio :value="3">{{ $t('xuanXiang_3-0') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
        <demo-group-item :title="$t('jie-he-cell-shi-yong-0')" no-padding>
          <wd-radio-group v-model="valueCell" checked-color="#fa4350" @change="change">
            <wd-cell-group border>
              <wd-cell :title="$t('dan-xuan-kuang-1-0')" clickable @click="valueCell = 1">
                <template #suffix>
                  <wd-radio :value="1" />
                </template>
              </wd-cell>
              <wd-cell :title="$t('dan-xuan-kuang-2-0')" clickable @click="valueCell = 2">
                <template #suffix>
                  <wd-radio :value="2" />
                </template>
              </wd-cell>
            </wd-cell-group>
          </wd-radio-group>
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-tu-biao')">
          <wd-radio-group custom-class="page-radio__group" v-model="valueCustom">
            <wd-radio :value="1">
              {{ $t('zi-ding-yi-tu-biao') }}
              <template #icon="{ isChecked }">
                <wd-icon :name="isChecked ? 'star-fill' : 'star'" size="22px" :color="isChecked ? '#fa4350' : '#ccc'" />
              </template>
            </wd-radio>
            <wd-radio :value="2">
              {{ $t('zi-ding-yi-tu-biao') }}
              <template #icon="{ isChecked }">
                <wd-icon :name="isChecked ? 'star-fill' : 'star'" size="22px" :color="isChecked ? '#fa4350' : '#ccc'" />
              </template>
            </wd-radio>
          </wd-radio-group>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('bu-ju-neng-li')">
        <demo-group-item :title="$t('tong-hang-zhan-shi')">
          <wd-radio-group v-model="valueHorizontal" direction="horizontal">
            <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
            <wd-radio :value="2">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
            <wd-radio :value="3" placement="right">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
          </wd-radio-group>
          <wd-divider dashed></wd-divider>
          <wd-radio-group v-model="valueHorizontalDot" direction="horizontal" type="dot">
            <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
            <wd-radio :value="2">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
          </wd-radio-group>
          <wd-divider dashed></wd-divider>
          <wd-radio-group v-model="valueHorizontalSquare" direction="horizontal" type="square" placement="right">
            <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
            <wd-radio :value="2">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
          </wd-radio-group>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const valueBasic = ref<number>(1)
const valueButton = ref<number>(1)
const valueDisabled = ref<number>(1)
const valueReadonly = ref<number>(1)
const valueAllowUncheck = ref<number>(1)
const valuePlacement = ref<number>(1)
const valuePlacementRight = ref<number>(1)
const valueCheckedColor = ref<number>(1)
const valueCheckedColorDot = ref<number>(1)
const valueUnchecked = ref<number>(1)
const valuePriority = ref<number>(1)
const valueCell = ref<number>(1)
const valueCustom = ref<number>(1)
const valueHorizontal = ref<number>(1)
const valueHorizontalDot = ref<number>(1)
const valueHorizontalSquare = ref<number>(1)

function change(event: { value: string | number | boolean | null }) {
  console.log(event)
}
</script>

<style lang="scss">
.page-radio {
  :deep(.wd-divider) {
    margin: $spacing-loose 0;
  }

  &__group {
    .wd-radio {
      &:not(:last-child) {
        margin-bottom: $spacing-extra-loose;
      }
    }
  }
}
</style>
