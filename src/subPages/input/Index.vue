<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')" transparent>
      <wd-input
        type="text"
        @input="handleInput"
        v-model="value"
        :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')"
        @change="handleChange"
        @blur="handleBlur"
      />
    </demo-block>
    <demo-block :title="$t('jin-yong-zhuang-tai')" transparent>
      <wd-input type="text" @input="handleInput" v-model="value1" disabled />
    </demo-block>
    <demo-block :title="$t('zhi-du-zhuang-tai')" transparent>
      <wd-input type="text" @input="handleInput" v-model="value2" readonly />
    </demo-block>
    <demo-block :title="$t('cuo-wu-zhuang-tai-0')" transparent>
      <wd-input type="text" @input="handleInput" v-model="value3" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')" error />
    </demo-block>
    <demo-block :title="$t('qing-kong-an-niu')" transparent>
      <wd-input type="text" @input="handleInput" v-model="value4" clearable @change="handleChange1" />
    </demo-block>
    <demo-block :title="$t('you-zhi-qie-ju-jiao-shi-zhan-shi-qing-kong-an-niu')" transparent>
      <wd-input type="text" clear-trigger="focus" @input="handleInput" v-model="value20" clearable @change="handleChange1" />
    </demo-block>
    <demo-block :title="$t('dian-ji-qing-chu-an-niu-shi-bu-zi-dong-ju-jiao')" transparent>
      <wd-input type="text" :focus-when-clear="false" @input="handleInput" v-model="value21" clearable @change="handleChange1" />
    </demo-block>
    <demo-block :title="$t('mi-ma-kuang')" transparent>
      <wd-input type="text" @input="handleInput" v-model="value5" clearable show-password @change="handleChange2" />
    </demo-block>
    <demo-block :title="$t('shu-zi-lei-xing')" transparent>
      <wd-input type="number" @input="handleInput" v-model="value9" />
    </demo-block>
    <demo-block :title="$t('she-zhi-qian-hou-icon')" transparent>
      <wd-input type="text" v-model="value6" @input="handleInput" prefix-icon="sound" suffix-icon="send" clearable @change="handleChange3" />
    </demo-block>
    <demo-block :title="$t('zi-shu-xian-zhi-0')" transparent>
      <wd-input type="text" v-model="value7" @input="handleInput" :maxlength="20" show-word-limit />
    </demo-block>
    <demo-block title="紧凑布局">
      <wd-input
        v-model="value8"
        @input="handleInput"
        compact
        :placeholder="$t('qing-shu-ru-jia-ge')"
        custom-style="display: inline-block; width: 70px; vertical-align: middle;"
      />
      <text class="custom-txt">{{ $t('yuan') }}</text>
    </demo-block>
    <demo-block title="结合表单使用" transparent>
      <wd-form :model="formData" border title-width="98px">
        <wd-form-item title="基本用法" prop="basic">
          <wd-input type="text" v-model="formData.basic" @input="handleInput" placeholder="请输入" compact />
        </wd-form-item>
        <wd-form-item title="禁用" prop="disabled">
          <wd-input type="text" v-model="formData.disabled" @input="handleInput" disabled placeholder="外比巴卜" compact />
        </wd-form-item>
        <wd-form-item title="清除/密码" prop="password">
          <wd-input type="text" v-model="formData.password" @input="handleInput" placeholder="请输入" clearable show-password compact />
        </wd-form-item>
        <wd-form-item title="错误状态" prop="error">
          <wd-input type="text" v-model="formData.error" @input="handleInput" placeholder="请输入外比巴卜" error compact />
        </wd-form-item>
        <wd-form-item title="必填" prop="required" required>
          <wd-input type="text" v-model="formData.required" @input="handleInput" placeholder="请输入外比巴卜" compact />
        </wd-form-item>
        <wd-form-item title="字数限制" prop="limit">
          <wd-input type="text" v-model="formData.limit" placeholder="请输入" :maxlength="20" show-word-limit clearable compact />
        </wd-form-item>
        <wd-form-item title="图标" prop="icon" prefix-icon="sound">
          <wd-input type="text" v-model="formData.icon" @input="handleInput" placeholder="请输入" compact suffix-icon="send" />
        </wd-form-item>
        <wd-form-item title="自定义插槽" prop="slot" center>
          <wd-input type="text" v-model="formData.slot" @input="handleInput" placeholder="请输入" clearable compact>
            <template #suffix>
              <wd-button size="small" custom-class="button">{{ $t('huo-qu-yan-zheng-ma') }}</wd-button>
            </template>
          </wd-input>
        </wd-form-item>
      </wd-form>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const value = ref<string>('')
const value1 = ref<string>(t('zhe-shi-jin-yong-zhuang-tai'))
const value2 = ref<string>(t('zhe-shi-zhi-du-zhuang-tai'))
const value3 = ref<string>('123456')
const value4 = ref<string>(t('zhi-chi-qing-kong'))
const value5 = ref<string>('password')
const value6 = ref<string>('')
const value7 = ref<string>('1234')
const value8 = ref<string>('')
const value9 = ref<number | ''>('')
const value20 = ref<string>('')
const value21 = ref<string>('')

// 表单数据
const formData = ref({
  basic: '',
  disabled: t('gai-shu-ru-kuang-jin-yong'),
  password: '12345678',
  error: '',
  required: '',
  limit: '',
  icon: '',
  slot: ''
})

function handleChange(event: any) {
  console.log(event)
}
function handleChange1(event: any) {
  console.log(event)
}
function handleChange2(event: any) {
  console.log(event)
}
function handleChange3(event: any) {
  console.log(event)
}
function handleBlur(event: any) {
  console.log('失焦', event)
}

function handleInput(event: any) {
  console.log(event)
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .custom-txt {
    color: $-dark-color;
  }
}
.custom-txt {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  line-height: 24px;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.suffix-slot {
  display: inline-block;
  height: 37px;
  line-height: 37px;
  margin-left: 8px;
  vertical-align: middle;
}
:deep(.button) {
  margin-left: 8px;
  vertical-align: middle;
}
</style>
