<template>
  <page-wraper>
    <view class="page-checkbox">
      <demo-group title="组件类型">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-checkbox-group v-model="value1">
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2">多选 2</wd-checkbox>
            <wd-checkbox :name="3" type="square">多选 3</wd-checkbox>
            <wd-checkbox :name="4" type="square">多选 4</wd-checkbox>
            <wd-checkbox :name="5" type="dot">多选 5</wd-checkbox>
            <wd-checkbox :name="6" type="dot">多选 6</wd-checkbox>
            <wd-checkbox :name="7">多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件状态">
        <demo-group-item :title="$t('jin-yong-zhuang-tai')">
          <wd-checkbox-group v-model="value8" disabled>
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2">多选 2</wd-checkbox>
          </wd-checkbox-group>
          <wd-divider dashed />
          <wd-checkbox-group v-model="value9">
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2" disabled>多选 2</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item title="半选状态">
          <wd-checkbox v-model="check" :indeterminate="indeterminate" @change="indeterminate = false">半选状态</wd-checkbox>
        </demo-group-item>

        <demo-group-item title="只读状态">
          <wd-checkbox-group v-model="value10" readonly>
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2">多选 2</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件变体">
        <demo-group-item title="勾选在右侧">
          <wd-checkbox-group v-model="value2" placement="right">
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2">多选 2</wd-checkbox>
            <wd-checkbox :name="3" type="square">多选 3</wd-checkbox>
            <wd-checkbox :name="4" type="square">多选 4</wd-checkbox>
            <wd-checkbox :name="5" type="dot">多选 5</wd-checkbox>
            <wd-checkbox :name="6" type="dot">多选 6</wd-checkbox>
            <wd-checkbox :name="7">多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('xiu-gai-xing-zhuang-button')">
          <wd-checkbox-group v-model="value4" type="button">
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2">多选 2</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('tong-hang-zhan-shi')">
          <wd-checkbox-group v-model="value5" direction="horizontal">
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2">多选 2</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('she-zhi-zui-xiao-xuan-zhong-shu-liang-he-zui-da-xuan-zhong-shu-liang')">
          <wd-checkbox-group v-model="value11" :min="1" :max="3">
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2">多选 2</wd-checkbox>
            <wd-checkbox :name="3">多选 3</wd-checkbox>
            <wd-checkbox :name="4">多选 4</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item :title="$t('xiu-gai-xuan-zhong-yan-se')">
          <wd-checkbox-group v-model="value6" checked-color="#fa4350">
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2">多选 2</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item title="修改未选中颜色">
          <wd-checkbox-group v-model="value7" unchecked-color="#fa4350">
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2">多选 2</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item title="自定义图标">
          <wd-checkbox-group v-model="value12">
            <wd-checkbox :name="1">
              自定义图标
              <template #icon="{ isChecked }">
                <wd-icon :name="isChecked ? 'star-fill' : 'star'" size="22px" :color="isChecked ? '#fa4350' : '#ccc'" />
              </template>
            </wd-checkbox>
            <wd-checkbox :name="2">
              自定义图标
              <template #icon="{ isChecked }">
                <wd-icon :name="isChecked ? 'star-fill' : 'star'" size="22px" :color="isChecked ? '#fa4350' : '#ccc'" />
              </template>
            </wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item :title="$t('da-chi-cun')">
          <wd-checkbox-group v-model="value13" size="large">
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2">多选 2</wd-checkbox>
          </wd-checkbox-group>
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊样式">
        <demo-group-item :title="$t('jie-he-cell-shi-yong')" no-padding>
          <wd-checkbox-group v-model="value14" direction="horizontal">
            <wd-cell-group border value-align="right">
              <wd-cell title="点赞" clickable @click="toggle(1)">
                <wd-checkbox :name="1" />
              </wd-cell>
              <wd-cell title="投币" clickable @click="toggle(2)">
                <wd-checkbox :name="2" />
              </wd-cell>
              <wd-cell title="一键三连" clickable @click="toggle(3)">
                <wd-checkbox :name="3" />
              </wd-cell>
            </wd-cell-group>
          </wd-checkbox-group>
        </demo-group-item>

        <demo-group-item title="全选切换">
          <wd-button custom-class="custom-button" size="small" type="info" @click="checkboxGroup?.toggleAll()">
            {{ $t('quan-bu-qie-huan') }}
          </wd-button>
          <wd-button custom-class="custom-button" size="small" type="success" @click="checkboxGroup?.toggleAll(true)">全选</wd-button>
          <wd-button custom-class="custom-button" size="small" type="primary" @click="checkboxGroup?.toggleAll(false)">全不选</wd-button>
          <wd-button custom-class="custom-button" size="small" type="warning" @click="checkboxGroup?.toggleAll({ skipDisabled: true })">
            {{ $t('quan-bu-qie-huan-tiao-guo-jin-yong') }}
          </wd-button>
          <wd-button custom-class="custom-button" size="small" type="danger" @click="checkboxGroup?.toggleAll({ checked: true, skipDisabled: true })">
            {{ $t('quan-bu-xuan-zhong-tiao-guo-jin-yong') }}
          </wd-button>

          <wd-checkbox-group v-model="value15" ref="checkboxGroup">
            <wd-checkbox :name="1">多选 1</wd-checkbox>
            <wd-checkbox :name="2">多选 2</wd-checkbox>
            <wd-checkbox :name="3" disabled>多选 3(Disabled)</wd-checkbox>
            <wd-checkbox :name="4">多选 4</wd-checkbox>
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
:deep(.custom-button) {
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>
