<template>
  <page-wraper>
    <!-- 主题样式 -->
    <demo-block :title="$t('jiBenYongFa')">
      <view class="demo-grid">
        <wd-input-number v-model="themeDefault" @change="handleChange" />
        <wd-input-number v-model="themePrimary" theme="primary" @change="handleChange" />
        <wd-input-number v-model="themeOutlineSplit" theme="outline-split" @change="handleChange" />
        <wd-input-number v-model="themeOutline" theme="outline" @change="handleChange" />
        <wd-input-number v-model="roundDefault" round @change="handleChange" />
        <wd-input-number v-model="roundPrimary" round theme="primary" @change="handleChange" />
        <wd-input-number v-model="roundOutlineSplit" round theme="outline-split" @change="handleChange" />
        <wd-input-number v-model="roundOutline" round theme="outline" @change="handleChange" />
      </view>
    </demo-block>

    <!-- 步长设置 -->
    <demo-block :title="$t('she-zhi-bu-chang')">
      <wd-input-number v-model="step" :step="2" @change="handleChange" />
    </demo-block>

    <!-- 范围限制 -->
    <demo-block :title="$t('xian-zhi-zui-da-zui-xiao-zhi')">
      <wd-input-number v-model="range" :min="3" :max="10" @change="handleChange" />
    </demo-block>

    <!-- 禁用状态 -->
    <demo-block :title="$t('jinYong')">
      <view class="demo-grid">
        <wd-input-number v-model="disabled" disabled />
        <wd-input-number v-model="disabled" disabled theme="primary" />
        <wd-input-number v-model="disabled" disabled theme="outline-split" />
        <wd-input-number v-model="disabled" disabled theme="outline" />
      </view>
    </demo-block>

    <demo-block :title="$t('jin-yong-shu-ru-kuang')">
      <wd-input-number v-model="disableInput" disable-input @change="handleChange" />
    </demo-block>

    <demo-block title="禁用减号按钮">
      <view class="demo-grid">
        <wd-input-number v-model="disableMinusDefault" disable-minus @change="handleChange" />
        <wd-input-number v-model="disableMinusPrimary" disable-minus theme="primary" @change="handleChange" />
      </view>
    </demo-block>

    <demo-block title="禁用加号按钮">
      <view class="demo-grid">
        <wd-input-number v-model="disablePlusDefault" disable-plus @change="handleChange" />
        <wd-input-number v-model="disablePlusPrimary" disable-plus theme="primary" @change="handleChange" />
      </view>
    </demo-block>

    <!-- 无输入框 -->
    <demo-block :title="$t('wu-shu-ru-kuang')">
      <view class="demo-row">
        <view>{{ $t('shu-liang-value5') }}{{ withoutInput }}</view>
        <wd-input-number v-model="withoutInput" without-input @change="handleChange" />
      </view>
    </demo-block>

    <!-- 精度设置 -->
    <demo-block :title="$t('she-zhi-xiao-shu-jing-du')">
      <wd-input-number v-model="precision" :precision="1" :step="0.1" @change="handleChange" />
    </demo-block>

    <!-- 严格步进 -->
    <demo-block :title="$t('shu-ru-yan-ge-wei-bu-shu-de-bei-shu')">
      <wd-input-number v-model="stepStrict" step-strictly :step="2" @change="handleChange" />
    </demo-block>

    <demo-block title="严格步进+边界限制">
      <view class="demo-section">
        <view class="demo-label">值：{{ strictBounds }}（步进值2，最小值3，最大值15）</view>
        <wd-input-number v-model="strictBounds" step-strictly :step="2" :min="3" :max="15" @change="handleChange" />
        <view class="demo-tip">
          输入1 → 4（≥3的最小2的倍数）
          <br />
          输入5 → 4（最接近的2的倍数）
          <br />
          输入17 → 14（≤15的最大2的倍数）
        </view>
      </view>
    </demo-block>

    <!-- 输入框宽度 -->
    <demo-block :title="$t('xiu-gai-shu-ru-kuang-kuan-du')">
      <wd-input-number v-model="inputWidth" input-width="70px" @change="handleChange" />
    </demo-block>

    <!-- 允许空值 -->
    <demo-block :title="$t('yun-xu-kong-zhi-bing-she-zhi-placeholder')">
      <wd-input-number v-model="allowNull" allow-null :placeholder="$t('bu-xian')" input-width="70px" @change="handleChange" />
    </demo-block>

    <demo-block title="非允许空值但可临时删除">
      <view class="demo-section">
        <view class="demo-label">值：{{ tempEmpty }}（失焦时会自动修正为最小值）</view>
        <wd-input-number v-model="tempEmpty" :allow-null="false" :min="1" @change="handleChange" />
        <view class="demo-tip">尝试删除输入框中的所有内容，然后点击其他地方失焦</view>
      </view>
    </demo-block>

    <!-- 键盘设置 -->
    <demo-block title="键盘弹起不上推页面">
      <wd-input-number v-model="adjustPosition" :adjust-position="false" @change="handleChange" />
    </demo-block>

    <!-- 更新模式 -->
    <demo-block title="非立即更新模式">
      <view class="demo-section">
        <view class="demo-label">立即更新模式（默认）- 值：{{ immediate }}</view>
        <wd-input-number v-model="immediate" :immediate-change="true" @change="handleChange" />
        <view class="demo-label">非立即更新模式 - 值：{{ notImmediate }}</view>
        <wd-input-number v-model="notImmediate" :immediate-change="false" @change="handleChange" />
        <view class="demo-tip">输入时，上方的值会立即更新，下方的值仅在失焦或点击按钮时更新</view>
      </view>
    </demo-block>

    <!-- 初始化修正 -->
    <demo-block title="初始化时自动修正">
      <view class="demo-section">
        <view class="demo-label">自动修正初始值 - 值：{{ updateOnInit }}</view>
        <wd-input-number v-model="updateOnInit" :update-on-init="true" :min="3" :max="15" :step="2" step-strictly @change="handleChange" />
        <view class="demo-label">不修正初始值 - 值：{{ noUpdateOnInit }}</view>
        <wd-input-number v-model="noUpdateOnInit" :update-on-init="false" :min="3" :max="15" :step="2" step-strictly @change="handleChange" />
        <view class="demo-tip">上方组件会在初始化时自动将值1修正为4（≥3的最小2的倍数）</view>
      </view>
    </demo-block>

    <!-- 异步变更 -->
    <demo-block :title="$t('yi-bu-bian-geng')">
      <wd-input-number v-model="asyncChange" :before-change="beforeChange" />
    </demo-block>

    <!-- 长按 -->
    <demo-block :title="$t('chang-an-jia-jian')">
      <wd-input-number v-model="longPress" long-press @change="handleChange" />
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { type InputNumberBeforeChange } from '@/uni_modules/wot-design-uni/components/wd-input-number/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { loading, close } = useToast()
const { t } = useI18n()

// 基础用法 - 主题
const themeDefault = ref(1)
const themePrimary = ref(1)
const themeOutlineSplit = ref(1)
const themeOutline = ref(1)

// 基础用法 - 圆角
const roundDefault = ref(1)
const roundPrimary = ref(1)
const roundOutlineSplit = ref(1)
const roundOutline = ref(1)

// 步长和范围
const step = ref(1)
const range = ref(1)

// 禁用状态
const disabled = ref(2)
const disableInput = ref(1)
const disableMinusDefault = ref(1)
const disableMinusPrimary = ref(1)
const disablePlusDefault = ref(1)
const disablePlusPrimary = ref(1)

// 特殊模式
const withoutInput = ref(1)
const precision = ref('1.2')
const stepStrict = ref(1)
const strictBounds = ref(4)

// 输入配置
const inputWidth = ref(2)
const allowNull = ref('')
const tempEmpty = ref(1)
const adjustPosition = ref(1)

// 更新模式
const immediate = ref(1)
const notImmediate = ref(1)
const updateOnInit = ref(1)
const noUpdateOnInit = ref(1)

// 其他
const asyncChange = ref(1)
const longPress = ref(1)

// 统一的 change 处理
function handleChange({ value }: { value: number | string }) {
  console.log('change:', value)
}

// 异步变更拦截
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
.demo-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-section {
  .demo-label {
    font-size: 14px;
    color: #333;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .demo-tip {
    font-size: 12px;
    color: #999;
    margin-top: 12px;
    line-height: 1.6;
    padding: 8px;
    background: #f5f5f5;
    border-radius: 4px;
  }

  :deep(.wd-input-number) {
    margin-bottom: 16px;
  }
}
</style>
