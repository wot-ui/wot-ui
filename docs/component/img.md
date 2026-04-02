# Img 图片

增强版图片组件，支持填充模式、懒加载、加载态/失败态插槽，以及点击预览。

## 组件类型

### 基本用法

基础用法与原生 `image` 标签一致，可以设置 `src`、`width`、`height` 等属性。

使用本地资源时，建议通过文件导入方式传入 `src`。在微信小程序中，`image` 标签支持二进制数据和 base64 编码，单独使用导入路径时需要结合构建配置处理。

```html
<wd-img :width="100" :height="100" :src="imgURL" />
```

```typescript
import blackMao from './black_mao.png'

const imgURL = blackMao
```

:::tip 提示
可以配置 `transformAssetUrls`，让 `wd-img` 的 `src` 属性获得与原生 `image` 一致的资源转换体验。

```typescript
import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    uni({
      vueOptions: {
        template: {
          transformAssetUrls: {
            tags: {
              'wd-img': ['src']
            }
          }
        }
      }
    })
  ]
})
```

修改完成后重启开发服务即可生效，更多背景可参考 [uni-app issue#4997](https://github.com/dcloudio/uni-app/issues/4997#issuecomment-2456851123)。
:::

## 组件状态

### 加载中提示

图片加载时会显示默认占位内容，也可以通过 `loading` 插槽自定义加载态。若不希望显示默认加载态，可将 `show-loading` 设为 `false`。

```html
<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg" />

<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg">
  <template #loading>
    <wd-loading />
  </template>
</wd-img>
```

### 加载失败提示

图片加载失败时会显示默认占位内容，也可以通过 `error` 插槽自定义失败态。若不希望显示默认失败态，可将 `show-error` 设为 `false`。

```html
<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg" />

<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg">
  <template #error>
    <view class="error-wrap">加载失败</view>
  </template>
</wd-img>
```

```css
.error-wrap {
  width: 100%;
  height: 100%;
  background-color: red;
  color: white;
  line-height: 100px;
  text-align: center;
}
```

## 组件样式

### 填充模式

通过 `mode` 设置图片填充模式。可选值为 `top left`、`top right`、`bottom left`、`bottom right`、`right`、`left`、`center`、`bottom`、`top`、`heightFix`、`widthFix`、`scaleToFill`、`aspectFit`、`aspectFill`。

```html
<wd-img :width="100" :height="100" :src="imgURL" mode="center" />
```

### 圆形

通过 `round` 将图片显示为圆形。

```html
<wd-img :width="100" :height="100" :src="imgURL" round />
```

### 圆角

通过 `radius` 设置图片圆角，默认单位为 `px`。

```html
<wd-img :width="100" :height="100" :src="imgURL" :radius="8" />
```

## 特殊用法

### 可预览

通过 `enable-preview` 开启点击预览，内部调用 `uni.previewImage` 实现。组件仅在图片加载成功后才会触发预览。

```html
<wd-img :width="100" :height="100" :src="imgURL" :enable-preview="true" />
```

### 指定预览图片

通过 `preview-src` 指定预览时展示的图片，可与组件当前显示的图片不同。

```html
<wd-img :width="100" :height="100" :src="imgURL" :preview-src="previewURL" :enable-preview="true" />
```

```typescript
import blackMao from './black_mao.png'
import blackMaoPreview from './black_mao_1.png'

const imgURL = blackMao
const previewURL = blackMaoPreview
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片链接 | `string` | - |
| preview-src | 预览图片链接 | `string` | - |
| width | 宽度，支持数字（单位 `px`）或字符串 | `string \| number` | - |
| height | 高度，支持数字（单位 `px`）或字符串 | `string \| number` | - |
| mode | 填充模式，可选值为 `top left`、`top right`、`bottom left`、`bottom right`、`right`、`left`、`center`、`bottom`、`top`、`heightFix`、`widthFix`、`scaleToFill`、`aspectFit`、`aspectFill` | `ImageMode` | `scaleToFill` |
| round | 是否显示为圆形 | `boolean` | `false` |
| radius | 圆角大小，默认单位为 `px` | `string \| number` | - |
| lazy-load | 是否开启图片懒加载 | `boolean` | `false` |
| enable-preview | 是否支持点击预览 | `boolean` | `false` |
| show-menu-by-longpress | 是否开启长按图片显示识别小程序码菜单，仅微信小程序平台有效 | `boolean` | `false` |
| show-loading | 是否展示默认加载态 | `boolean` | `true` |
| show-error | 是否展示默认失败态 | `boolean` | `true` |
| custom-class | 根节点自定义类名 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |
| custom-image | 内部 `image` 节点自定义类名 | `string` | `''` |

## Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击图片时触发 | `event: MouseEvent` |
| load | 图片加载完成时触发，返回图片加载事件对象 | `event: Event` |
| error | 图片加载失败时触发，返回图片错误事件对象 | `event: Event` |

## Slots

| 名称 | 说明 |
| --- | --- |
| loading | 自定义图片加载中的展示内容 |
| error | 自定义图片加载失败后的展示内容 |
