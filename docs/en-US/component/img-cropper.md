# ImgCropper

Image cropping component for image cropping, supporting drag, zoom, rotate, and other operations.

## Component Type

### Basic Usage

The image cropping component needs to bind `v-model` to control the component's display and hide, and control the displayed image resource through the `img-src` property. After entering the component, you can drag, pinch-zoom, rotate, and other operations on the image. Listen to the `confirm` event to get the cropping result.

> *Note: It is recommended to use the image cropping component in a new page, keeping `show` as true, and return to the previous page after cropping is complete.*

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
<view class="profile">
  <view v-if="!imgSrc" class="img" @click="upload">
    <wd-icon name="fill-camera" custom-class="img-icon"></wd-icon>
  </view>
  <wd-img v-if="imgSrc" round width="200px" height="200px" :src="imgSrc" mode="aspectFit" custom-class="profile-img" @click="upload" />
  <view style="font-size: 14px;">Click to upload avatar</view>
</view>
```

```typescript
const src = ref<string>('')
const imgSrc = ref<string>('')
const show = ref<boolean>(false)

function upload() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePaths = res.tempFilePaths[0]
      src.value = tempFilePaths
      show.value = true
    }
  })
}
function handleConfirm(event) {
  const { tempFilePath } = event
  imgSrc.value = tempFilePath
}
function imgLoaderror(res) {
  console.log('Loading failed', res)
}
function imgLoaded(res) {
  console.log('Loading successful', res)
}
function handleCancel(event) {
  console.log('Cancel', event)
}
```

## Component Configuration

### Custom Crop Ratio

Set the crop frame's aspect ratio through the `aspect-ratio` property, in the format `width:height`.

#### 3:2 Suitable for Photography

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  aspect-ratio="3:2"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

#### 16:9 Film Ratio

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  aspect-ratio="16:9"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

#### 16:10 So Wide, Very Stylish

The 16:10 display ratio is very suitable for displaying landscape photos or movie posters and other widescreen content.

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  aspect-ratio="16:10"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

## Special Usage

### Upload After Cropping

Combined with `useUpload`, you can achieve automatic image upload after cropping is complete.

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  @confirm="handleConfirmUpload"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

```typescript
import { ref } from 'vue'
import { useUpload, useToast } from '@/uni_modules/wot-ui'
import { type UploadFileItem } from '@/uni_modules/wot-ui/components/wd-upload/types'

const { startUpload, UPLOAD_STATUS } = useUpload()
const { show: showToast } = useToast()

const show = ref(false)
const src = ref('')
const imgSrc = ref('')

async function handleConfirmUpload(event) {
  const { tempFilePath } = event
  
  // Build upload file object
  const file: UploadFileItem = {
    url: tempFilePath,
    status: UPLOAD_STATUS.PENDING,
    percent: 0,
    uid: new Date().getTime()
  }

  try {
    // Start upload
    await startUpload(file, {
      action: 'https://your-upload-url',
      onSuccess() {
        imgSrc.value = tempFilePath
        showToast({
          msg: 'Upload successful'
        })
      },
      onError() {
        showToast({
          msg: 'Upload failed'
        })
      },
      onProgress(res) {
        console.log('Upload progress:', res.progress)
      }
    })
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
```

## Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| v-model | Open image cropping component | `boolean` | `false` |
| img-src | Image resource link | `string` | - |
| img-width | Initial width of the screenshot preview image; `1. If width is set but height is not, scale proportionally according to width; 2. If neither is set, the preview image size will be scaled proportionally according to the crop frame size, with edge locking processing;`; `string` type only supports `%` unit, `number` type unit is `px` | `number \| string` | - |
| img-height | Initial height of the screenshot preview image; `1. If height is set but width is not, scale proportionally according to height; 2. If neither is set, the preview image size will be scaled proportionally according to the crop frame size, with edge locking processing;`; `string` type only supports `%` unit, `number` type unit is `px` | `number \| string` | - |
| disabled-rotate | Disable image rotation | `boolean` | `false` |
| export-scale | Set exported image size | `number` | `2` |
| max-scale | Maximum zoom multiple | `number` | `3` |
| cancel-button-text | Cancel button text | `string` | `Cancel` |
| confirm-button-text | Confirm button text | `string` | `Done` |
| quality | Generated image quality [wx.canvasToTempFilePath property introduction](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html#%E5%8F%82%E6%95%B0) | `number` | `1` |
| file-type | Target file type, [wx.canvasToTempFilePath property introduction](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html#%E5%8F%82%E6%95%B0) | `string` | `png` |
| aspect-ratio | Crop frame aspect ratio, format is `width:height` | `string` | `1:1` |

## Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| confirm | Triggered when screenshot is complete | `{tempFilePath, width, height}` are the temporary path (local path) of the generated file, the width of the generated image, and the height of the generated image respectively |
| cancel | Triggered when screenshot is cancelled | - |
| imgloaderror | Triggered when image loading fails | `{err}` |
| imgloaded | Triggered when image loading is complete | `{res}` |

## Methods

Expose internal component functions through `ref`:

| Method Name | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| setRotate | Set image rotation angle | `deg` (the rotation angle to be set) | - |
| resetImg | Reset image angle, zoom, and position | - | - |
| revertIsAnimation | Toggle image transition animation effect | `animation` (whether to enable animation) | - |

## External Style Classes

| Class Name | Description |
| --- | --- |
| custom-class | Root node style |
