---
version: 1.6.0
---

# Signature 签名

用于签名场景，基于 Canvas 实现的签名组件，支持导出图片、历史记录、笔锋效果、自定义底部操作等能力。

:::tip 提醒
如果遇到导出图片不清晰，可以将 `export-scale` 设置为 `2` 以上。
:::

## 组件类型

### 基础用法

设置 `@confirm` 监听确认事件，可在确认后获取签名结果。

```html
<wd-signature :export-scale="2" background-color="#ffffff" @confirm="handleConfirm" />
```

```ts
import type { SignatureResult } from '@/uni_modules/wot-design-uni/components/wd-signature/types'

function handleConfirm(result: SignatureResult) {
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}
```

### 历史记录

设置 `enable-history` 后，可使用撤销与恢复能力。

```html
<wd-signature enable-history background-color="#f5f5f5" />
```

## 组件变体

### 笔锋模式

设置 `pressure` 开启压感笔锋效果。

```html
<wd-signature pressure :height="300" />
```

### 笔锋模式结合历史记录

签名组件支持同时开启 `pressure` 与 `enable-history`，用于更完整的签字场景。

```html
<wd-signature pressure enable-history :height="300" :min-width="1" :max-width="6" background-color="#f5f5f5" />
```

## 组件样式

### 自定义底部按钮

设置 `footer` 插槽后，可完全自定义底部操作区。

```html
<wd-signature :disabled="disabled" enable-history :step="3">
  <template #footer="{ clear, confirm, currentStep, restore, revoke, historyList }">
    <wd-button v-if="disabled" block @click="disabled = false">开始签名</wd-button>
    <block v-else>
      <wd-button size="small" plain @click="revoke" :disabled="currentStep <= 0">撤回</wd-button>
      <wd-button size="small" plain @click="restore" :disabled="currentStep >= historyList.length">恢复</wd-button>
      <wd-button size="small" plain @click="clear">清除</wd-button>
      <wd-button size="small" @click="confirm">确定</wd-button>
    </block>
  </template>
</wd-signature>
```

```ts
const disabled = ref(true)
```

### 自定义画笔

通过 `pen-color`、`line-width` 设置画笔颜色与宽度。

```html
<wd-signature pen-color="#0083ff" :line-width="4" />
```

## 特殊样式

### 弹窗中使用

签名组件可以与 `wd-popup` 结合使用，建议在弹窗展示完成后调用实例的 `init` 方法完成初始化。

::: code-group

```html [vue]
<wd-button type="primary" @click="showPopup = true">打开签名板</wd-button>

<wd-popup
  v-model="showPopup"
  closable
  safe-area-inset-bottom
  position="bottom"
  custom-style="padding: 48px 20px 20px 20px; border-radius: 16px 16px 0 0;"
  @after-enter="signatureRef?.init()"
>
  <wd-signature ref="signatureRef" :height="300" enable-history pressure background-color="#f5f5f5" @confirm="handlePopupConfirm" />
</wd-popup>
```

```ts [ts]
import { ref } from 'vue'
import type { SignatureInstance, SignatureResult } from '@/uni_modules/wot-design-uni/components/wd-signature/types'

const showPopup = ref(false)
const signatureRef = ref<SignatureInstance>()

function handlePopupConfirm(result: SignatureResult) {
  showPopup.value = false
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}
```

:::

:::tip 提示
弹窗中使用签名板时，建议：
1. 开启 `closable` 显示关闭按钮。
2. 设置 `safe-area-inset-bottom` 适配底部安全区。
3. 使用 `custom-style` 调整弹窗内边距，为关闭按钮留出空间。
4. 在弹窗的 `after-enter` 事件中调用签名板的 `init` 方法，确保正确初始化。
:::

### 横屏签名 

支持以下两种横屏签名实现方案：

#### 1. 通用横屏方案 (推荐)

通过自定义布局和按钮旋转实现横屏效果，适用于所有平台。

:::tip 实现说明
通用横屏方案特点：
1. 使用 fixed 布局配合旋转实现左侧垂直按钮栏
2. 通过 footer 插槽自定义操作按钮
3. 使用 transform 实现按钮的旋转效果
4. 适用于所有平台,实现方式一致
5. 建议使用 inited 变量配合延迟加载避免画布初始化问题
:::

::: code-group

```html [vue]
<template>
  <view class="landscape-signature">
    <wd-signature
      v-if="inited"
      :height="height"
      :width="width"
      enable-history
      pressure
      background-color="#f5f5f5"
      @confirm="handleConfirm"
    >
      <template #footer="{ clear, confirm, restore, revoke, canUndo, canRedo }">
        <view class="custom-actions">
          <view class="button-group">
            <wd-button size="small" plain @click="revoke" :disabled="!canUndo">撤回</wd-button>
            <wd-button size="small" plain @click="restore" :disabled="!canRedo">恢复</wd-button>
            <wd-button size="small" plain @click="clear">清除</wd-button>
            <wd-button size="small" type="primary" @click="confirm">完成</wd-button>
          </view>
        </view>
      </template>
    </wd-signature>
  </view>
</template>
```

```ts [ts]
import { pause } from '@/uni_modules/wot-design-uni/common/util'

const height = ref(0)
const width = ref(0)
const inited = ref(false)

onMounted(() => {
  const { windowWidth, windowHeight } = uni.getSystemInfoSync()
  width.value = windowWidth - 48
  height.value = windowHeight - 48
  
  pause(100).then(() => {
    inited.value = true
  })
})
```

```scss [css]
.landscape-signature {
  height: 100vh;
  // #ifdef H5
  height: calc(100vh - 44px);
  // #endif
  background: #fff;
  position: relative;
  padding: 24px 0;
  padding-left: 48px;
  box-sizing: border-box;

  .custom-actions {
    position: fixed;
    left: 0;
    top: 50%;
    width: 48px;
    transform: translateY(-50%) rotate(90deg);
    transform-origin: center;
    z-index: 10;

    .button-group {
      display: flex;
      flex-direction: row;
      gap: 12px;
      white-space: nowrap;
      width: max-content;
      transform: translateX(-50%);
    }
  }
}
```
:::


#### 2. 原生横屏方案 (仅微信小程序)

微信小程序提供了原生的横屏支持，使用时需要注意区分平台:

:::warning 注意事项
1. `pageOrientation` 配置仅在微信小程序端生效
2. 使用条件编译区分不同平台的布局结构
3. 微信小程序页面会自动旋转，按钮布局不需要特殊处理
4. 预留底部按钮空间时需要考虑横屏布局
5. 其他平台请使用通用横屏方案
:::

::: code-group

```json [json]
{
  "path": "pages/signature/landscape",
  "style": {
    "navigationBarTitleText": "横屏签名",
    // #ifdef MP-WEIXIN
    "pageOrientation": "landscape"
    // #endif
  }
}
```

```html [vue]
<template>
  <view class="landscape-signature">
    <wd-signature
      v-if="inited"
      ref="signatureRef"
      :height="height" 
      :width="width"
      enable-history
      pressure
      background-color="#f5f5f5"
      @confirm="handleConfirm"
    >
    </wd-signature>
  </view>
</template>
```

```ts [ts]
import { pause } from '@/uni_modules/wot-design-uni/common/util'

const height = ref(0)
const width = ref(0)
const inited = ref(false)

onMounted(() => {
  const { windowWidth, windowHeight } = uni.getSystemInfoSync()
  width.value = windowWidth
  height.value = windowHeight - 60 // 预留底部按钮空间

  pause(100).then(() => {
    inited.value = true
  })
})
```

```scss [css]
.landscape-signature {
  height: 100vh;
  background: #fff;
  position: relative;
  box-sizing: border-box;

  // #ifdef MP-WEIXIN
  padding: 0;
  display: flex;
  flex-direction: column;

  .weixin-actions {
    padding: 12px;
    background-color: #f8f8f8;
    
    .button-group {
      display: flex;
      justify-content: center;
      gap: 12px;
    }
  }
  // #endif
}
```
:::


## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pen-color | 签名笔颜色 | `string` | `'#000'` |
| line-width | 签名笔宽度 | `number` | `3` |
| confirm-text | 确认按钮文本 | `string` | 内置文案 |
| clear-text | 清空按钮文本 | `string` | 内置文案 |
| revoke-text | 撤回按钮文本 | `string` | 内置文案 |
| restore-text | 恢复按钮文本 | `string` | 内置文案 |
| file-type | 导出图片类型，可选值为 `png`、`jpg` | `'png' \| 'jpg'` | `'png'` |
| quality | 导出图片质量，取值范围为 `0` 到 `1` | `number` | `1` |
| export-scale | 导出图片缩放比例 | `number` | `1` |
| disabled | 是否禁用签名板 | `boolean` | `false` |
| height | 画布高度 | `string \| number` | - |
| width | 画布宽度 | `string \| number` | - |
| background-color | 画板背景色 | `string` | - |
| disable-scroll | 是否禁用画布滚动 | `boolean` | `true` |
| enable-history | 是否开启历史记录 | `boolean` | `false` |
| step | 撤回和恢复的步长 | `number` | `1` |
| undo-text | 撤销按钮文本 | `string` | 内置文案 |
| redo-text | 恢复按钮文本 | `string` | 内置文案 |
| pressure | 是否开启压感模式 | `boolean` | `false` |
| max-width | 压感模式下的最大笔触宽度 | `number` | `6` |
| min-width | 压感模式下的最小笔触宽度 | `number` | `2` |
| min-speed | 压感模式下的最小速度阈值 | `number` | `1.5` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始签名时触发 | event |
| end | 结束签名时触发 | event |
| signing | 签名过程中持续触发 | event |
| confirm | 确认签名时触发 | `SignatureResult` |
| clear | 清空签名时触发 | - |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| init | 初始化签名板 | `forceUpdate?: boolean` |
| confirm | 确认并导出签名图片 | - |
| clear | 清空签名 | - |
| restore | 恢复上一步 | - |
| revoke | 撤销上一步 | - |

## Slots

| name | 说明 | 参数 |
| --- | --- | --- |
| footer | 自定义底部操作区 | `{ clear, confirm, currentStep, revoke, restore, canUndo, canRedo, historyList }` |

