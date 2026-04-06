# Upload

Image, video and file upload component.

::: tip Tip
Currently, all platforms compatible with the component library support video upload. Video covers implemented using the `video` component are supported on H5, WeChat Mini Program and Alipay Mini Program platforms, while DingTalk Mini Program and App platforms are limited by the `video` tag capability and cannot directly serve as video covers. It is recommended to get the video cover in the `change` event and supplement the `thumb` field for the corresponding video in `fileList`.
:::

::: warning About WeChat Mini Program Privacy Agreement
`upload` uses three privacy interfaces on the WeChat Mini Program platform: `wx.chooseImage`, `wx.chooseMedia`, `wx.chooseVideo`. It needs to be configured according to the WeChat privacy agreement, otherwise the upload capability will be unavailable. Please refer to [Mini Program Privacy Agreement Development Guide](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html).
:::

## Component Types

### Basic Usage

Set the upload list through `file-list` or `v-model:file-list`, and specify the upload address through `action`.

::: code-group

```html [vue]
<wd-upload v-model:file-list="fileList" accept="image" image-mode="aspectFill" :action="action" :success-status="[200, 201]"></wd-upload>
```

```ts [ts]
import { ref } from 'vue'
import type { UploadFile } from '@/uni_modules/wot-ui/components/wd-upload/types'

const action = 'https://69bd04402bc2a25b22ad0a49.mockapi.io/upload'

const fileList = ref<UploadFile[]>([
  {
    url: 'https://wot-ui.cn/assets/panda.jpg'
  }
])
```

:::

### Upload Video

After setting `accept` to `video`, you can upload video files.

```html
<wd-upload accept="video" multiple :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

### Upload Media and Files

`accept="media"` supports images and videos, `accept="file"` supports regular files, `accept="all"` supports all file types. Different platforms have different support ranges, see the `accept` valid values description below.

```html
<wd-upload accept="all" multiple :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

## Component States

### Upload Status Hooks

Upload status feedback can be displayed through `success`, `fail` and `progress` events.

```html
<wd-upload
  :file-list="fileList"
  :action="action"
  :success-status="[200, 201]"
  @change="handleChange"
  @success="handleSuccess"
  @fail="handleFail"
  @progress="handleProgress"
></wd-upload>
```

### Disabled

```html
<wd-upload :file-list="fileList" disabled :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

### Manual Trigger Upload

After setting `auto-upload="false"`, you can manually start upload through the component instance's `submit` method.

::: code-group

```html [vue]
<wd-upload
  ref="uploadRef"
  :auto-upload="false"
  :file-list="fileList"
  :action="action"
  :success-status="[200, 201]"
  @change="handleChange"
></wd-upload>

<wd-button @click="uploadRef?.submit()">Start Upload</wd-button>
```

```ts [ts]
import { ref } from 'vue'
import type { UploadFile, UploadInstance } from '@/uni_modules/wot-ui/components/wd-upload/types'

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadFile[]>([])
```

:::

## Component Variants

### Maximum Upload Limit

Limit the maximum number of files through `limit`.

```html
<wd-upload :file-list="fileList" :limit="3" :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

### Overwrite Upload

After setting `reupload`, re-selecting files will replace the previous item, suitable for single file overwrite scenarios like avatars.

```html
<wd-upload reupload v-model:file-list="fileList" accept="image" image-mode="aspectFill" :action="action" :success-status="[200, 201]"></wd-upload>
```

### Multiple Selection

```html
<wd-upload :file-list="fileList" multiple :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

## Component Styles

### Custom Evoke Style

The default upload evoke area can be replaced through the default slot.

```html
<wd-upload :file-list="fileList" :limit="5" :action="action" :success-status="[200, 201]" @change="handleChange">
  <wd-button>Custom Evoke Style</wd-button>
</wd-upload>
```

### Custom Preview Style

Content that covers the preview area can be customized through the `preview-cover` slot.

::: code-group

```html [vue]
<wd-upload v-model:file-list="fileList" accept="image" image-mode="aspectFill" :action="action" :success-status="[200, 201]">
  <template #preview-cover="{ file, index }">
    <view class="preview-cover">{{ file.name || `File${index}` }}</view>
  </template>
</wd-upload>
```

```scss [scss]
.preview-cover {
  margin-top: 10rpx;
  text-align: center;
}
```

:::

## Special Styles

### Intercept Preview Image Operation

`before-preview` is triggered before preview. Returning `false` or a Promise with value `false` can prevent preview.

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-preview="beforePreview"></wd-upload>
```

### Upload Pre-processing

`before-upload` is triggered after confirming file selection and before initiating upload.

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-upload="beforeUpload"></wd-upload>
```

### Remove Image Pre-processing

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-remove="beforeRemove"></wd-upload>
```

### Select File Pre-processing

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-choose="beforeChoose"></wd-upload>
```

### Custom Upload Method

Upload behavior can be completely taken over through `upload-method`.

::: code-group

```html [vue]
<wd-upload v-model:file-list="fileList" :upload-method="customUpload" :success-status="[200, 201]"></wd-upload>
```

```ts [ts]
import type { UploadMethod } from '@/uni_modules/wot-ui/components/wd-upload/types'

const customUpload: UploadMethod = (file, formData, options) => {
  const task = uni.uploadFile({
    url: options.action,
    name: options.name,
    filePath: file.url,
    formData,
    header: options.header,
    success: (response) => options.onSuccess(response, file, formData),
    fail: (error) => options.onError(error, file, formData)
  })

  task.onProgressUpdate((response) => {
    options.onProgress(response, file)
  })

  return task
}
```

:::

### Filter by File Extension

After setting `extension`, you can limit the suffix of selected files. H5 supports all type filtering, WeChat Mini Program supports `all` and `file` scenario filtering.

```html
<wd-upload v-model:file-list="fileList" :extension="['.jpg', '.png']" :action="action" :success-status="[200, 201]"></wd-upload>
```

## Business Capabilities

### Upload to Cloud Storage

`build-form-data` is used to dynamically build signature fields before actual upload, suitable for connecting to OSS, COS, OBS and other cloud storage services.

::: code-group

```html [vue]
<wd-upload :file-list="files" :action="host" :build-form-data="buildFormData" @change="handleChange"></wd-upload>
```

```ts [ts]
const host = 'https://examplebucket.oss-cn-zhangjiakou.aliyuncs.com'

function buildFormData({ file, formData }) {
  const imageName = file.url.substring(file.url.lastIndexOf('/') + 1)

  return {
    ...formData,
    key: `20231120/${imageName}`,
    OSSAccessKeyId: 'your-access-key',
    policy: 'your-policy',
    signature: 'your-signature',
    success_action_status: '200'
  }
}
```

:::

## Upload Attributes

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| file-list / v-model:file-list | Upload file list, for example `[{ url: 'https://xxx.cdn.com/xxx.jpg' }]` | `UploadFile[]` | `[]` |
| action | Upload address | `string` | `''` |
| header | Upload request header | `Record<string, any>` | `{}` |
| multiple | Whether to support multiple file selection | `boolean` | `false` |
| disabled | Whether disabled | `boolean` | `false` |
| limit | Maximum allowed upload count | `number` | - |
| show-limit-num | When limiting upload quantity, whether to show current quantity | `boolean` | `true` |
| max-size | File size limit, in bytes | `number` | `Number.MAX_VALUE` |
| source-type | Select image source | `UploadSourceType[]` | `['album', 'camera']` |
| size-type | Selected image size | `UploadSizeType[]` | `['original', 'compressed']` |
| name | Upload file field name | `string` | `file` |
| form-data | Additional form data attached to HTTP request | `Record<string, any>` | `{}` |
| on-preview-fail | Preview failure callback | `UploadOnPreviewFail` | - |
| before-upload | Upload pre-hook | `UploadBeforeUpload` | - |
| before-choose | Select file pre-hook | `UploadBeforeChoose` | - |
| before-remove | Delete file pre-hook | `UploadBeforeRemove` | - |
| before-preview | Image preview pre-hook | `UploadBeforePreview` | - |
| build-form-data | Hook for dynamically building upload `formData` | `UploadBuildFormData` | - |
| loading-type | Loading icon type | `LoadingType` | `circular` |
| loading-color | Loading icon color | `string` | `#ffffff` |
| loading-size | Loading icon size | `string` | `24px` |
| accept | Accepted file types, optional values are `image`, `video`, `media`, `all`, `file` | `UploadFileType` | `image` |
| status-key | The key corresponding to the status field in `file` data structure | `string` | `status` |
| compressed | Whether to compress video, effective when `accept` is `video` or `media` | `boolean` | `true` |
| max-duration | Maximum video recording duration, in seconds | `number` | `60` |
| camera | Use front or back camera, optional values are `front`, `back` | `UploadCameraType` | `back` |
| image-mode | `mode` property for preview image | `ImageMode` | `aspectFit` |
| success-status | Interface response success status code | `number \| number[]` | `200` |
| custom-evoke-class | Custom upload button style class | `string` | `''` |
| custom-preview-class | Custom preview list style class | `string` | `''` |
| auto-upload | Whether to auto-upload after selecting files, needs to manually call `submit` when closed | `boolean` | `true` |
| reupload | Whether to enable overwrite upload, will close image preview when enabled | `boolean` | `false` |
| upload-method | Custom upload method | `UploadMethod` | - |
| extension | Filter by file extension, H5 supports all type filtering, WeChat Mini Program supports `all` and `file` scenario filtering | `string[]` | - |
| custom-class | Root node custom style class | `string` | `''` |
| custom-style | Root node custom style | `string` | `''` |

## accept Valid Values

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| image | Image, supported on all platforms, WeChat Mini Program uses `chooseMedia` implementation | `UploadFileType` | - |
| video | Video, supported on all platforms, WeChat Mini Program uses `chooseMedia` implementation | `UploadFileType` | - |
| media | Image and video, only supported on WeChat Mini Program, uses `chooseMedia` implementation | `UploadFileType` | - |
| file | Regular file, only supported on WeChat Mini Program, uses `chooseMessageFile` implementation | `UploadFileType` | - |
| all | All file types, only supported on WeChat Mini Program and H5 | `UploadFileType` | - |

## file Data Structure

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| uid | Unique identifier of current upload file in the list | `number` | - |
| thumb | Thumbnail address | `string` | - |
| name | Current file name | `string` | - |
| status | Current file upload status, optional values are `pending`, `loading`, `success`, `fail` | `UploadStatusType` | - |
| size | File size | `number` | - |
| url | File address | `string` | - |
| percent | Upload progress | `number` | - |
| response | Backend returned content, may be string or object | `string \| Record<string, any>` | - |

## Upload Slots

| Name | Description |
| --- | --- |
| default | Custom upload evoke area |
| preview-cover | Custom content covering above the preview area, parameters are `{ file, index }` |

## Upload Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| success | Triggered when upload succeeds | `UploadSuccessEvent` |
| fail | Triggered when upload fails | `UploadErrorEvent` |
| progress | Triggered during upload | `UploadProgressEvent` |
| oversize | Triggered when file size exceeds limit | `UploadOversizeEvent` |
| chooseerror | Triggered when file selection fails | `any` |
| change | Triggered when upload list changes | `UploadChangeEvent` |
| remove | Triggered when file is removed | `UploadRemoveEvent` |
| update:fileList | Update event corresponding to `v-model:file-list` | `UploadFileItem[]` |

## Upload Methods

| Method Name | Description | Parameters |
| --- | --- | --- |
| submit | Manually start upload | - |
| abort | Cancel upload | `(task?: UniApp.UploadTask) => void` |
