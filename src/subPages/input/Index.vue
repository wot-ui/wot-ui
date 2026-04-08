<template>
  <page-wraper>
    <view class="page-input">
      <demo-group :title="$t('zu-jian-lei-xing')" transparent>
        <demo-group-item :title="$t('ji-ben-shi-yong')" no-padding>
          <wd-input v-model="value" type="text" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')" @input="handleEvent" @blur="handleEvent" />
        </demo-group-item>
        <demo-group-item :title="$t('shu-zi-lei-xing')" no-padding>
          <wd-input v-model="value9" type="number" @input="handleEvent" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')" transparent>
        <demo-group-item :title="$t('jin-yong-zhuang-tai')" no-padding>
          <wd-input v-model="value1" type="text" disabled @input="handleEvent" />
        </demo-group-item>
        <demo-group-item :title="$t('zhi-du-zhuang-tai')" no-padding>
          <wd-input v-model="value2" type="text" readonly @input="handleEvent" />
        </demo-group-item>
        <demo-group-item :title="$t('cuo-wu-zhuang-tai-0')" no-padding>
          <wd-input v-model="value3" type="text" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')" error @input="handleEvent" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')" transparent>
        <demo-group-item :title="$t('qing-kong-an-niu')" no-padding>
          <wd-input v-model="value4" type="text" clearable @input="handleEvent" @clear="handleEvent" />
        </demo-group-item>
        <demo-group-item :title="$t('you-zhi-qie-ju-jiao-shi-zhan-shi-qing-kong-an-niu')" no-padding>
          <wd-input v-model="value20" type="text" clear-trigger="focus" clearable @input="handleEvent" @clear="handleEvent" />
        </demo-group-item>
        <demo-group-item :title="$t('dian-ji-qing-chu-an-niu-shi-bu-zi-dong-ju-jiao')" no-padding>
          <wd-input v-model="value21" type="text" :focus-when-clear="false" clearable @input="handleEvent" @clear="handleEvent" />
        </demo-group-item>
        <demo-group-item :title="$t('mi-ma-kuang')" no-padding>
          <wd-input v-model="value5" type="text" clearable show-password @input="handleEvent" />
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('nei-rong-xing-tai')" transparent>
        <demo-group-item :title="$t('she-zhi-qian-hou-icon')" no-padding>
          <wd-input
            v-model="value6"
            type="text"
            prefix-icon="sound"
            suffix-icon="send"
            clearable
            @input="handleEvent"
            @clickprefixicon="handleEvent"
            @clicksuffixicon="handleEvent"
          />
        </demo-group-item>
        <demo-group-item :title="$t('hou-zhui-cha-cao')" no-padding>
          <wd-input v-model="slotValue" type="text" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')" clearable @input="handleEvent">
            <template #suffix>
              <wd-button size="small" custom-class="button">{{ $t('huo-qu-yan-zheng-ma') }}</wd-button>
            </template>
          </wd-input>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')" transparent>
        <demo-group-item :title="$t('zi-shu-xian-zhi-0')" no-padding>
          <wd-input v-model="value7" type="text" :maxlength="20" show-word-limit @input="handleEvent" />
        </demo-group-item>
        <demo-group-item :title="$t('jin-cou-bu-ju')">
          <view class="compact-row">
            <wd-input
              v-model="value8"
              compact
              :placeholder="$t('qing-shu-ru-jia-ge')"
              custom-style="display: inline-block; width: 70px; vertical-align: middle;"
              @input="handleEvent"
            />
            <text class="custom-txt">{{ $t('yuan') }}</text>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yong-fa')" transparent>
        <demo-group-item :title="$t('jie-he-biao-dan-shi-yong')" transparent no-padding>
          <wd-form :model="formData" border title-width="98px">
            <wd-form-item :title="$t('ji-chu-yong-fa')" prop="basic">
              <wd-input v-model="formData.basic" type="text" :placeholder="$t('qing-shu-ru-5')" compact @input="handleEvent" />
            </wd-form-item>
            <wd-form-item :title="$t('jinYong')" prop="disabled">
              <wd-input v-model="formData.disabled" type="text" disabled :placeholder="$t('wai-bi-ba-bu-0')" compact @input="handleEvent" />
            </wd-form-item>
            <wd-form-item :title="$t('qing-chu-mi-ma-0')" prop="password">
              <wd-input
                v-model="formData.password"
                type="text"
                :placeholder="$t('qing-shu-ru-6')"
                clearable
                show-password
                compact
                @input="handleEvent"
              />
            </wd-form-item>
            <wd-form-item :title="$t('cuo-wu-zhuang-tai-0')" prop="error">
              <wd-input v-model="formData.error" type="text" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu-0')" error compact @input="handleEvent" />
            </wd-form-item>
            <wd-form-item :title="$t('bi-tian')" prop="required" required>
              <wd-input v-model="formData.required" type="text" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu-1')" compact @input="handleEvent" />
            </wd-form-item>
            <wd-form-item :title="$t('zi-shu-xian-zhi-0')" prop="limit">
              <wd-input v-model="formData.limit" type="text" :placeholder="$t('qing-shu-ru-7')" :maxlength="20" show-word-limit clearable compact />
            </wd-form-item>
            <wd-form-item :title="$t('tu-biao')" prop="icon" prefix-icon="sound">
              <wd-input v-model="formData.icon" type="text" :placeholder="$t('qing-shu-ru-8')" compact suffix-icon="send" @input="handleEvent" />
            </wd-form-item>
            <wd-form-item :title="$t('zi-ding-yi-cha-cao')" prop="slot" center>
              <wd-input v-model="formData.slot" type="text" :placeholder="$t('qing-shu-ru-9')" clearable compact @input="handleEvent">
                <template #suffix>
                  <wd-button size="small" custom-class="button">{{ $t('huo-qu-yan-zheng-ma') }}</wd-button>
                </template>
              </wd-input>
            </wd-form-item>
          </wd-form>
        </demo-group-item>
      </demo-group>
    </view>
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
const slotValue = ref<string>('')
const value20 = ref<string>('')
const value21 = ref<string>('')

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

function handleEvent(event: any) {
  console.log(event)
}
</script>
<style lang="scss" scoped>
.page-input {
  :deep(.demo-group-item__content) {
    overflow: hidden;
  }
}

.compact-row {
  display: flex;
  align-items: center;
}

.wot-theme-dark {
  .custom-txt {
    color: $-dark-color;
  }
}
.custom-txt {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  margin-left: 8px;
}
:deep(.button) {
  margin-left: 8px;
  vertical-align: middle;
}
</style>
