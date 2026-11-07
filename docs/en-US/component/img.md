# Img

Enhanced image component that supports fill modes, lazy loading, loading/failed state slots, and click-to-preview.

## Component Type

### Basic Usage

Basic usage is consistent with the native `image` tag. You can set `src`, `width`, `height`, and other properties.

When using local resources, it is recommended to pass `src` through file import. In WeChat Mini Programs, the `image` tag supports binary data and base64 encoding. When using import paths alone, you need to combine with build configuration processing.

```html
<wd-img :width="100" :height="100" :src="imgURL" />
```

```typescript
import blackMao from './black_mao.png'

const imgURL = blackMao
```

:::tip Tip
You can configure `transformAssetUrls` to give `wd-img`'s `src` property the same resource conversion experience as the native `image`.

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

After modification, restart the development service to take effect. For more background, please refer to [uni-app issue#4997](https://github.com/dcloudio/uni-app/issues/4997#issuecomment-2456851123).
:::

## Component State

### Loading Indicator

When the image is loading, default placeholder content is displayed. You can also customize the loading state through the `loading` slot. If you don't want to display the default loading state, set `show-loading` to `false`.

```html
<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg" />

<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg">
  <template #loading>
    <wd-loading />
  </template>
</wd-img>
```

### Load Failure Indicator

When the image fails to load, default placeholder content is displayed. You can also customize the failed state through the `error` slot. If you don't want to display the default failed state, set `show-error` to `false`.

```html
<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg" />

<wd-img width="100%" height="27vw" src="https://www.123.wot.com/a.jpg">
  <template #error>
    <view class="error-wrap">Loading failed</view>
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

## Component Style

### Fill Mode

Set the image fill mode through `mode`. Optional values are `top left`, `top right`, `bottom left`, `bottom right`, `right`, `left`, `center`, `bottom`, `top`, `heightFix`, `widthFix`, `scaleToFill`, `aspectFit`, `aspectFill`.

```html
<wd-img :width="100" :height="100" :src="imgURL" mode="center" />
```

### Round

Display the image as a circle through `round`.

```html
<wd-img :width="100" :height="100" :src="imgURL" round />
```

### Border Radius

Set the image border radius through `radius`. The default unit is `px`.

```html
<wd-img :width="100" :height="100" :src="imgURL" :radius="8" />
```

## Special Usage

### Preview Enabled

Enable click-to-preview through `enable-preview`. Internally implemented using `uni.previewImage`. The component only triggers preview after the image is successfully loaded.

```html
<wd-img :width="100" :height="100" :src="imgURL" :enable-preview="true" />
```

### Specify Preview Image

Specify the image to display during preview through `preview-src`, which can be different from the image currently displayed by the component.

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

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| src | Image link | `string` | - |
| preview-src | Preview image link | `string` | - |
| width | Width, supports numbers (unit `px`) or strings | `string \| number` | - |
| height | Height, supports numbers (unit `px`) or strings | `string \| number` | - |
| mode | Fill mode, optional values are `top left`, `top right`, `bottom left`, `bottom right`, `right`, `left`, `center`, `bottom`, `top`, `heightFix`, `widthFix`, `scaleToFill`, `aspectFit`, `aspectFill` | `ImageMode` | `scaleToFill` |
| round | Whether to display as a circle | `boolean` | `false` |
| radius | Border radius size, default unit is `px` | `string \| number` | - |
| lazy-load | Whether to enable image lazy loading | `boolean` | `false` |
| enable-preview | Whether to support click-to-preview | `boolean` | `false` |
| show-menu-by-longpress | Whether to enable long-press image to show识别小程序码 menu, only valid for WeChat Mini Programs | `boolean` | `false` |
| show-loading | Whether to display default loading state | `boolean` | `true` |
| show-error | Whether to display default failed state | `boolean` | `true` |
| glass | Enable glassmorphism (glass) style | boolean | `false` |
| custom-class | Root node custom class name | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |
| custom-image | Internal `image` node custom class name | `string` | `''` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Triggered when clicking the image | `event: MouseEvent` |
| load | Triggered when image loading is complete, returns the image loading event object | `event: Event` |
| error | Triggered when image loading fails, returns the image error event object | `event: Event` |

## Slots

| Name | Description |
| --- | --- |
| loading | Customize the display content when the image is loading |
| error | Customize the display content after the image fails to load |
