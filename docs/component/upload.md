# Upload 上传

图片、视频和文件上传组件。

::: tip 提示
目前组件库已兼容的平台都支持上传视频。使用 `video` 组件实现的视频封面在 H5、微信小程序和支付宝小程序平台得到支持，而在钉钉小程序和 App 平台受限于 `video` 标签能力无法直接作为视频封面。推荐在 `change` 事件中获取视频封面并给 `fileList` 对应视频补充 `thumb` 字段。
:::

::: warning 关于微信小程序隐私协议
`upload` 在微信小程序平台使用了 `wx.chooseImage`、`wx.chooseMedia`、`wx.chooseVideo` 三个隐私接口，需要按微信隐私协议进行配置，否则会导致上传能力不可用。可参考[小程序隐私协议开发指南](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html)。
:::

## 组件类型

### 基本用法

通过 `file-list` 或 `v-model:file-list` 设置上传列表，`action` 指定上传地址。

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

### 上传视频

将 `accept` 设置为 `video` 后，可以上传视频文件。

```html
<wd-upload accept="video" multiple :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

### 上传媒体与文件

`accept="media"` 支持图片和视频，`accept="file"` 支持普通文件，`accept="all"` 支持全部类型文件。不同平台支持范围不同，详见下方 `accept` 合法值说明。

```html
<wd-upload accept="all" multiple :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

## 组件状态

### 上传状态钩子

通过 `success`、`fail` 和 `progress` 事件可以展示上传状态反馈。

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

### 禁用

```html
<wd-upload :file-list="fileList" disabled :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

### 手动触发上传 ^(1.3.8)

设置 `auto-upload="false"` 后，可通过组件实例的 `submit` 方法手动开始上传。

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

<wd-button @click="uploadRef?.submit()">开始上传</wd-button>
```

```ts [ts]
import { ref } from 'vue'
import type { UploadFile, UploadInstance } from '@/uni_modules/wot-ui/components/wd-upload/types'

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadFile[]>([])
```

:::

## 组件变体

### 最大上传数限制

通过 `limit` 限制最多上传的文件数量。

```html
<wd-upload :file-list="fileList" :limit="3" :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

### 覆盖上传 ^(1.5.0)

设置 `reupload` 后，重新选择文件会替换上一项，适合头像等单文件覆盖场景。

```html
<wd-upload reupload v-model:file-list="fileList" accept="image" image-mode="aspectFill" :action="action" :success-status="[200, 201]"></wd-upload>
```

### 多选

```html
<wd-upload :file-list="fileList" multiple :action="action" :success-status="[200, 201]" @change="handleChange"></wd-upload>
```

## 组件样式

### 自定义唤起样式

通过默认插槽可以替换默认的上传唤起区域。

```html
<wd-upload :file-list="fileList" :limit="5" :action="action" :success-status="[200, 201]" @change="handleChange">
  <wd-button>自定义唤起样式</wd-button>
</wd-upload>
```

### 自定义预览样式 ^(1.3.12)

通过 `preview-cover` 插槽可以自定义覆盖在预览区域上的内容。

::: code-group

```html [vue]
<wd-upload v-model:file-list="fileList" accept="image" image-mode="aspectFill" :action="action" :success-status="[200, 201]">
  <template #preview-cover="{ file, index }">
    <view class="preview-cover">{{ file.name || `文件${index}` }}</view>
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

## 特殊样式

### 拦截预览图片操作

`before-preview` 会在预览前触发，返回 `false` 或返回值为 `false` 的 Promise 时可阻止预览。

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-preview="beforePreview"></wd-upload>
```

### 上传前置处理

`before-upload` 会在确认选择文件后、发起上传前触发。

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-upload="beforeUpload"></wd-upload>
```

### 移除图片前置处理

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-remove="beforeRemove"></wd-upload>
```

### 选择文件前置处理

```html
<wd-upload :file-list="fileList" :action="action" :success-status="[200, 201]" @change="handleChange" :before-choose="beforeChoose"></wd-upload>
```

### 自定义上传方法 ^(1.3.8)

通过 `upload-method` 可以完全接管上传行为。

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

### 根据文件拓展名过滤 ^(1.9.0)

设置 `extension` 后，可以限制选择文件的后缀。H5 支持全部类型过滤，微信小程序支持 `all` 和 `file` 场景过滤。

```html
<wd-upload v-model:file-list="fileList" :extension="['.jpg', '.png']" :action="action" :success-status="[200, 201]"></wd-upload>
```

## 业务能力

### 上传至云存储 ^(0.1.61)

`build-form-data` 用于在真正上传前动态构建签名字段，适合对接 OSS、COS、OBS 等云存储服务。

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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| file-list / v-model:file-list ^(1.3.8) | 上传文件列表，例如 <code>[{ url: 'https://xxx.cdn.com/xxx.jpg' }]</code> | `UploadFile[]` | `[]` |
| action | 上传地址 | `string` | `''` |
| header | 上传请求头 | `Record<string, any>` | `{}` |
| multiple | 是否支持多选文件 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| limit | 最大允许上传个数 | `number` | - |
| show-limit-num | 限制上传数量时，是否显示当前数量 | `boolean` | `true` |
| max-size | 文件大小限制，单位为 byte | `number` | `Number.MAX_VALUE` |
| source-type | 选择图片来源 | `UploadSourceType[]` | <code>['album', 'camera']</code> |
| size-type | 所选图片尺寸 | `UploadSizeType[]` | <code>['original', 'compressed']</code> |
| name | 上传文件字段名 | `string` | `file` |
| form-data | HTTP 请求附带的额外表单数据 | `Record<string, any>` | `{}` |
| on-preview-fail | 预览失败回调 | `UploadOnPreviewFail` | - |
| before-upload | 上传前置钩子 | `UploadBeforeUpload` | - |
| before-choose | 选择文件前置钩子 | `UploadBeforeChoose` | - |
| before-remove | 删除文件前置钩子 | `UploadBeforeRemove` | - |
| before-preview | 图片预览前置钩子 | `UploadBeforePreview` | - |
| build-form-data ^(0.1.61) | 动态构建上传 `formData` 的钩子 | `UploadBuildFormData` | - |
| loading-type | 加载中图标类型 | `LoadingType` | `circular` |
| loading-color | 加载中图标颜色 | `string` | `#ffffff` |
| loading-size | 加载中图标尺寸 | `string` | `24px` |
| accept ^(1.3.0) | 接受的文件类型，可选值为 `image`、`video`、`media`、`all`、`file` | `UploadFileType` | `image` |
| status-key | `file` 数据结构中状态字段对应的 key | `string` | `status` |
| compressed ^(1.3.0) | 是否压缩视频，当 `accept` 为 `video` 或 `media` 时生效 | `boolean` | `true` |
| max-duration ^(1.3.0) | 拍摄视频最大时长，单位为秒 | `number` | `60` |
| camera ^(1.3.0) | 使用前置或后置相机，可选值为 `front`、`back` | `UploadCameraType` | `back` |
| image-mode | 预览图片的 `mode` 属性 | `ImageMode` | `aspectFit` |
| success-status ^(1.3.4) | 接口响应成功状态码 | <code>number &#124; number[]</code> | `200` |
| custom-evoke-class | 自定义上传按钮样式类 | `string` | `''` |
| custom-preview-class | 自定义预览列表样式类 | `string` | `''` |
| auto-upload ^(1.3.8) | 是否选择文件后自动上传，关闭后需手动调用 `submit` | `boolean` | `true` |
| reupload ^(1.5.0) | 是否开启覆盖上传，开启后会关闭图片预览 | `boolean` | `false` |
| upload-method ^(1.3.8) | 自定义上传方法 | `UploadMethod` | - |
| extension ^(1.9.0) | 根据文件拓展名过滤，H5 支持全部类型过滤，微信小程序支持 `all` 和 `file` 场景过滤 | `string[]` | - |
| custom-class | 根节点自定义样式类 | `string` | `''` |
| custom-style | 根节点自定义样式 | `string` | `''` |

## accept 的合法值

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 图片，全平台支持，微信小程序使用 `chooseMedia` 实现 | `UploadFileType` | - |
| video ^(1.3.0) | 视频，全平台支持，微信小程序使用 `chooseMedia` 实现 | `UploadFileType` | - |
| media ^(1.3.0) | 图片和视频，仅微信小程序支持，使用 `chooseMedia` 实现 | `UploadFileType` | - |
| file ^(1.3.0) | 普通文件，仅微信小程序支持，使用 `chooseMessageFile` 实现 | `UploadFileType` | - |
| all ^(1.3.0) | 全部类型文件，仅微信小程序和 H5 支持 | `UploadFileType` | - |

## file 数据结构

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| uid | 当前上传文件在列表中的唯一标识 | `number` | - |
| thumb | 缩略图地址 | `string` | - |
| name | 当前文件名称 | `string` | - |
| status | 当前文件上传状态，可选值为 `pending`、`loading`、`success`、`fail` | `UploadStatusType` | - |
| size | 文件大小 | `number` | - |
| url | 文件地址 | `string` | - |
| percent | 上传进度 | `number` | - |
| response | 后端返回内容，可能是字符串或对象 | <code>string &#124; Record&lt;string, any&gt;</code> | - |

## Upload Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义上传唤起区域 |
| preview-cover ^(1.3.12) | 自定义覆盖在预览区域上方的内容，参数为 <code>{ file, index }</code> |

## Upload Events

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| success | 上传成功时触发 | `UploadSuccessEvent` |
| fail | 上传失败时触发 | `UploadErrorEvent` |
| progress | 上传中时触发 | `UploadProgressEvent` |
| oversize | 文件大小超过限制时触发 | `UploadOversizeEvent` |
| chooseerror | 选择文件失败时触发 | `any` |
| change | 上传列表修改时触发 | `UploadChangeEvent` |
| remove | 移除文件时触发 | `UploadRemoveEvent` |
| update:fileList ^(1.3.8) | `v-model:file-list` 对应的更新事件 | `UploadFileItem[]` |

## Upload Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| submit ^(1.3.8) | 手动开始上传 | - |
| abort | 取消上传 | <code>(task?: UniApp.UploadTask) =&gt; void</code> |