# Upload

Component for uploading images, videos and files

::: tip Note
All currently supported platforms in the component library support video uploading. Video covers implemented using the `video` component are supported on `H5`, `WeChat Mini Program` and `Alipay Mini Program` platforms, while on `DingTalk Mini Program` and `App` platforms, they are limited by the capabilities of the `video` tag on these two platforms and cannot be used as video covers. Therefore, it is recommended to get the video cover in the `change` event and add a cover: `thumb` to the corresponding video in `fileList` (when uploading to various cloud servers, each vendor should provide video cover functionality).
:::

::: warning About WeChat Mini Program Privacy Agreement
`upload` uses three privacy interfaces on the WeChat Mini Program platform: `wx.chooseImage`, `wx.chooseMedia`, and `wx.chooseVideo`, which require configuration of the WeChat privacy agreement. You can refer to the [Mini Program Privacy Agreement Development Guide](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html) for related configuration and development, otherwise the upload function will not work. It is recommended to use [WeChat Mini Program Privacy Protection Pop-up](https://ext.dcloud.net.cn/plugin?id=14346) or the [WeChat Privacy Agreement Pop-up](https://github.com/wot-ui/wot-ui/tree/master/src/components/wd-privacy-popup) used in the component library demo.
:::

## Basic Usage

`file-list` sets the upload list, with array as the data type;

After data changes, assign values to fileList through binding the `change` event.

`action` sets the upload address;

```html
<wd-upload :file-list="fileList" image-mode="aspectFill" :action="action" @change="handleChange"></wd-upload>
```

```typescript
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const action: string = 'https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload'

function handleChange({ fileList: files }) {
  fileList.value = files
}
```

## Two-way Binding `1.3.8`

`file-list` supports two-way binding using `v-model`.

Operations such as uploading and deleting will synchronize data, no need to bind through the `change` event

```html
<wd-upload v-model:file-list="fileList1" image-mode="aspectFill" :action="action"></wd-upload>
```

```typescript
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const action: string = 'https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload'
```

## Disabled

Set `disabled` to enable disabled upload

```html
<wd-upload
  :file-list="fileList"
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
  disabled
></wd-upload>
```

## Multiple Selection Upload

Enable multiple file selection upload by setting `multiple`.

```html
<wd-upload
  :file-list="fileList"
  multiple
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
></wd-upload>
```

## Maximum Upload Limit

The upload component can limit the number of uploaded files by setting `limit`.

```html
<wd-upload
  :file-list="fileList"
  :limit="3"
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
></wd-upload>
```

## Overwrite Upload

The upload component can automatically replace the previous file when selected by setting `reupload`.

```html
<wd-upload
  :file-list="fileList"
  reupload
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
></wd-upload>
```

## Intercept Preview

Set the `before-preview` function. When the user clicks the image to preview, the `before-preview` function will be executed. It receives `{ file: previewed file, index: current preview index, imgList: all image url list }`. It supports returning a `boolean` or a `Promise<boolean>` to control whether to pass the option. If it does not pass, the image preview operation will not be executed.

```html
<wd-upload
  :file-list="fileList"
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
  :before-preview="beforePreview"
></wd-upload>
```

```typescript
import { useToast, useDialog } from '@/uni_modules/wot-ui'

const messageBox = useDialog()
const toast = useToast()
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const beforePreview = ({ file }) => {
  return new Promise<boolean>((resolve) => {
    messageBox
      .confirm({
        msg: 'Are you sure to preview the image?',
        title: 'Prompt'
      })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        toast.show('Preview canceled')
        resolve(false)
      })
  })
}

function handleChange({ fileList }) {
  fileList.value = fileList
}
```

## Setup Before Uploading

Set the `before-upload` function. When the user selects an image and clicks confirm, the `before-upload` function will be executed. It receives `{ files: current upload file, fileList: file list }`. It supports returning a `boolean` or a `Promise<boolean>` to control whether to pass the option. If it does not pass, the upload operation will not be executed.

```html
<wd-upload
  :file-list="fileList"
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
  :before-upload="beforeUpload"
></wd-upload>
```

```typescript
import { useToast, useDialog } from '@/uni_modules/wot-ui'

const messageBox = useDialog()
const toast = useToast()
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const beforeUpload = ({ files }) => {
  return new Promise<boolean>((resolve) => {
    messageBox
      .confirm({
        msg: 'Are you sure to upload?',
        title: 'Prompt'
      })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        toast.show('Upload canceled')
        resolve(false)
      })
  })
}

function handleChange({ fileList }) {
  fileList.value = fileList
}
```

## Setup Before Deleting

Set the `before-remove` function. When the user clicks the close button, the `before-remove` function will be executed. It receives `{ file: removed file, index: removed file index, fileList: file list }`. It supports returning a `boolean` or a `Promise<boolean>` to control whether to pass the option. If it does not pass, the remove operation will not be executed.

```html
<wd-upload
  :file-list="fileList"
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
  :before-remove="beforeRemove"
></wd-upload>
```

```typescript
import { useToast, useDialog } from '@/uni_modules/wot-ui'

const messageBox = useDialog()
const toast = useToast()
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const beforeRemove = ({ file, fileList }) => {
  return new Promise<boolean>((resolve) => {
    messageBox
      .confirm({
        msg: 'Are you sure to delete?',
        title: 'Prompt'
      })
      .then(() => {
        toast.success('Delete succeeded')
        resolve(true)
      })
      .catch(() => {
        toast.show('Delete canceled')
        resolve(false)
      })
  })
}

function handleChange({ fileList }) {
  fileList.value = fileList
}
```

## Setup Before Choosing

Set the `before-choose` function. When the user clicks to awaken the upload options, the `before-choose` function will be executed. It receives `{ fileList: file list }`. It supports returning a `boolean` or a `Promise<boolean>` to control whether to pass the option. If it does not pass, the file choosing operation will not be executed.

```html
<wd-upload
  :file-list="fileList"
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
  :before-choose="beforeChoose"
></wd-upload>
```

```typescript
import { useToast, useDialog } from '@/uni_modules/wot-ui'

const messageBox = useDialog()
const toast = useToast()
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const beforeChoose = ({ fileList }) => {
  return new Promise<boolean>((resolve) => {
    messageBox
      .confirm({
        msg: 'Are you sure to choose?',
        title: 'Prompt'
      })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        toast.show('Choose canceled')
        resolve(false)
      })
  })
}

function handleChange({ fileList }) {
  fileList.value = fileList
}
```

## Upload to Cloud Storage

Set the `buildFormData` function. When the user clicks upload, the `buildFormData` function will be executed, receiving `{ file, formData }`.

- `file`: the current uploaded file
- `formData`: the `formData` to be processed
- Returns processed `Record<string, any>` data or a `Promise`. The component uses the new form data containing signatures to perform the upload.

```html
<wd-upload :file-list="files" :action="host" :build-form-data="buildFormData" @change="handleChange"></wd-upload>
```

::: code-group

```ts [Aliyun OSS]
const host = ref<string>('Bucket access domain surface, e.g., https://examplebucket.oss-cn-zhangjiakou.aliyuncs.com')

const files = ref<Record<string, any>[]>([])

function handleChange({ fileList }) {
  files.value = fileList
}

/* *
 * Build formData
 * @param {Object} { file, formData }
 * @return {Object} Assambled formData
 * */
const buildFormData = ({ file, formData }) => {
  let imageName = file.url.substring(file.url.lastIndexOf('/') + 1)
  // #ifdef H5
  imageName = imageName + file.name
  // #endif
  const signature = 'your <signatureString>' // signature info
  const ossAccessKeyId = 'your <accessKey>' // your AccessKey ID
  const policy = 'your <policyBase64Str>' // policy info
  const key = `20231120/${imageName}` // upload path
  const success_action_status = '200' 

  return {
    ...formData,
    key: key,
    OSSAccessKeyId: ossAccessKeyId,
    policy: policy,
    signature: signature,
    success_action_status: success_action_status
  }
}
```

```TS [Tencent Cloud COS]
const host = ref<string>('Bucket access domain surface, e.g., https://examplebucket.oss-cn-zhangjiakou.aliyuncs.com')

const files = ref<Record<string, any>[]>([])

function handleChange({ fileList }) {
  files.value = fileList
}

/* *
 * Build formData
 * @param {Object} { file, formData }
 * @return {Object} Assembled formData
 * */
const buildFormData = ({ file, formData }) => {
  let imageName = file.url.substring(file.url.lastIndexOf('/') + 1)
  // #ifdef H5
  imageName = imageName + file.name
  // #endif
  const policy = 'your policy' // policy info
  const key = `20231120/${imageName}` // upload path
  const qAk = 'your qAk'
  const qSignAlgorithm = 'your qSignAlgorithm'
  const qKeyTime = 'your qKeyTime'
  const qSignature = 'your qSignature'
  const success_action_status = '200'
  return {
    ...formData,
    key: key,
    policy: policy,
    'q-sign-algorithm': qSignAlgorithm,
    'q-ak': qAk,
    'q-key-time': qKeyTime,
    'q-signature': qSignature,
    success_action_status: success_action_status
  }
}
```

```ts [Huawei Cloud OBS]
const host = ref<string>('Bucket access domain surface, e.g., https://examplebucket.oss-cn-zhangjiakou.aliyuncs.com')

const files = ref<Record<string, any>[]>([])

function handleChange({ fileList }) {
  files.value = fileList
}

/* *
 * Build formData
 * @param {Object} { file, formData }
 * @return {Object} Assembled formData
 * */
const buildFormData = ({ file, formData }) => {
  let imageName = file.url.substring(file.url.lastIndexOf('/') + 1)
  // #ifdef H5
  imageName = imageName + file.name
  // #endif
  const signature = 'your <signature>' // signature info
  const accessKeyId = 'your <accessKeyId>' // your AccessKey ID
  const policy = 'your <policyBase64Str>' // policy info
  const key = `20231120/${imageName}` // upload path
  const success_action_status = '200'

  return {
    ...formData,
    key: key,
    policy: policy,
    AccessKeyId: accessKeyId,
    signature: signature,
    success_action_status: success_action_status
  }
}
```

:::

## Valid Values for accept

| name  | Description                                                                                   | Minimum Version |
| ----- | --------------------------------------------------------------------------------------------- | --------------- |
| image | Images, supported on all platforms                                                           | -               |
| video | Videos, supported on all platforms                                                           | 1.3.0           |
| media | Images and videos, WeChat only, implemented using `chooseMedia`                              | 1.3.0           |
| file  | Files other than images and videos from client sessions, WeChat only, implemented using `chooseMessageFile` | 1.3.0           |
| all   | All types of files, WeChat and H5 only, WeChat uses `chooseMessageFile`, H5 uses `chooseFile` | 1.3.0           |

## File Selection Quantity Limits

Different platforms have different file selection methods with varying maximum quantity limits, which are determined by the uni-app platform APIs:

### WeChat Platform

WeChat Mini Program platform offers richer file selection capabilities with higher quantity limits:

| Selection Method | Maximum Count | Description | Applicable File Types |
| ---------------- | ------------- | ----------- | -------------------- |
| `chooseMedia` | 20 | Maximum selection count for images and videos | Used when accept is `image`, `video`, or `media` |
| `chooseMessageFile` | 100 | Maximum selection count for files from client sessions | Used when accept is `file` or `all` |

### H5 Platform

H5 platform supports multiple file selection methods:

| Selection Method | Maximum Count | Description | Applicable File Types |
| ---------------- | ------------- | ----------- | -------------------- |
| `chooseImage` | 9 | Maximum selection count for images | Used when accept is `image` |
| `chooseVideo` | 1 | Does not support multiple selection, single video file only | Used when accept is `video` |
| `chooseFile` | 100 | Maximum selection count for files | Used when accept is `all` |

::: warning H5 Platform Special Note
The behavior of the count value on the H5 platform is based on the browser's own specifications. Current test results show that it can only limit single/multiple selection, but cannot limit the specific quantity. Moreover, very few mobile browsers actually support multiple selection.
:::

### Other Platforms

Other platforms (such as Alipay Mini Program, DingTalk Mini Program, App, etc.) have relatively limited file selection capabilities:

| Selection Method | Maximum Count | Description | Applicable File Types |
| ---------------- | ------------- | ----------- | -------------------- |
| `chooseImage` | 9 | Maximum selection count for images | Used when accept is `image` |
| `chooseVideo` | 1 | Does not support multiple selection, single video file only | Used when accept is `video` |

::: tip Tips
- When the set `limit` or `maxCount` exceeds the above platform limits, the actual selection count will be subject to platform limits
- WeChat Mini Program platform prioritizes using `chooseMedia` for selecting images and videos, which has higher selection count limits
- Video selection on non-WeChat platforms is limited by the `chooseVideo` API and only supports single selection
- Platform capability priority: WeChat Platform > H5 Platform > Other Platforms
:::

## file Data Structure

| Key Name  | Type            | Description                                                  | Minimum Version |
| -------- | --------------- | ----------------------------------------------------- | -------- |
| uid      | number          | Unique identifier for the currently uploaded file in the list | -        |
| url      | string          | Uploaded image address                                          | -        |
| action   | string          | Upload address                                            | -        |
| percent  | number          | Upload progress                                              | -        |
| size     | number          | File size dimension code                                        | -        |
| status   | string          | Upload status. If a custom status-key is set, the corresponding field should be mapped | -        |
| response | string / object | Content returned by backend, could be an object or a string            | -        |

## Slot

| Name    | Description             | Minimum Version |
| ------- | ---------------- | -------- |
| default | Upload slot style | -        |
| preview-cover | Custom content overlaid on the preview area |   1.3.12   |

## Events

| Event Name    | Description                   | Params                                                                                 | Minimum Version |
| ----------- | ---------------------- | ------------------------------------------------------------------------------------ | -------- |
| success     | Triggered on success         | event = { file, fileList, formData }, `file` is the currently uploaded file, `fileList` is the upload file list | -        |
| fail        | Triggered on fail         | event = { error, file, formData }, `error` is the error message, `file` is the failed uploaded file                 | -        |
| progress    | Triggered on progressed           | event = { response, file }, `response` is the progress response info, `file` is the currently uploaded file          | -        |
| chooseerror | Triggered when picking an image fails     | event = { error }, `error` is the error message of image picking failure                                       | -        |
| change      | Triggered on upload list changes     | event = { fileList }, `fileList` is the upload image list                                | -        |
| remove      | Triggered on image removal         | event = { file }, `file`: info of removed file                                                | -        |
| oversize    | Triggered when the size limitation is exceeded | event = { file }, `file`: info of exceeded file                                            | -        |

## Methods

| Method Name | Description         | Params | Minimum Version         |
| -------- | ------------ | ---- | ---------------- |
| submit   | Manually trigger upload | -    | 1.3.8 |

## External Classes

| Class                 | Description                     | Minimum Version |
| -------------------- | ------------------------ | -------- |
| custom-class         | Root node custom class             | -        |
| custom-evoke-class   | Upload button custom class     | -        |
| custom-preview-class | Custom class for file preview list | -        |

## Attributes

| Parameter                     | Description                                                                                                                                                                    | Type                                   | Options                                         | Default                     | Minimum Version         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | ---------------------------------------------- | -------------------------- | ---------------- |
| file-list / v-model:file-list | Uploaded file list, e.g., [{ name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg' }]                                                                                               | array                                  | -                                              | []                         | -                |
| action                        | Required parameter, the upload address                                                                                                                                                           | string                                 | -                                              | -                          | -                |
| header                        | Request headers for upload                                                                                                                                                             | object                                 | -                                              | -                          | -                |
| multiple                      | Whether to support multiple file selection                                                                                                                                                               | boolean                                | -                                              | -                          | -                |
| disabled                      | Whether it is disabled                                                                                                                                                                       | boolean                                | -                                              | false                      | -                |
| reupload    | Whether to enable overwriting upload, preview will be closed once enabled   | boolean          | -                                              | false                       | 1.5.0 |
| limit                         | Maximum number of uploads allowed                                                                                                                                                               | number                                 | -                                              | -                          | -                |
| show-limit-num                | Whether to display the number of uploaded items if size limited                                                                                                                                   | boolean                                | -                                              | false                      | -                |
| max-size                      | File size limitation, in `byte`                                                                                                                                                     | number                                 | -                                              | -                          | -                |
| source-type                   | Photo source `chooseImage` api params [Manual](https://uniapp.dcloud.net.cn/api/media/image.html#chooseimage)                                                        | array / string                         | -                                              | ['album', 'camera']        | -                |
| size-type                     | Selected image dimensions `chooseImage` api params [Manual](https://uniapp.dcloud.net.cn/api/media/image.html#chooseimage)                                                      | array / string                         | -                                              | ['original', 'compressed'] | -                |
| name                          | Associated key for file logic, backend retrieves binary content using this key, `uploadFile` params [Manual](https://uniapp.dcloud.net.cn/api/request/network-file#uploadfile) | string                                 | -                                              | file                       | -                |
| formData                      | HTTP request extra formData, `uploadFile` api params [Manual](https://uniapp.dcloud.net.cn/api/request/network-file#uploadfile)                                     | object                                 | -                                              | -                          | -                |
| header                        | HTTP request Header, referer cannot be setup in Header, `uploadFile` params [Manual](https://uniapp.dcloud.net.cn/api/request/network-file#uploadfile)                         | object                                 | -                                              | -                          | -                |
| on-preview-fail               | Execute on preview failure                                                                                                                                                               | function({ index, imgList })           | -                                              | -                          | -                |
| before-upload                 | Setup before uploading, parameters are `files` and `fileList`. Returns `false` or rejected `Promise` to stop upload. | function({ files, fileList }) | -                                              | -                          | -                |
| before-choose                 | Setup before choosing, parameters are `fileList`. Returns `false` or rejected `Promise` to stop choose file. | function({ fileList })        | -                                              | -                          | -                |
| before-remove                 | Setup before removing, parameters are `file, index, fileList`. Returns `false` or rejected `Promise` to stop removal. | function({ file, index, fileList })  | -                                              | -                          | -                |
| before-preview                | Setup before previewing, parameters are `file, index, imgList, fileList`. Returns `false` or rejected `Promise` to stop preview. | function({file, index, imgList, fileList })  | -                                              | -                          | -                |
| build-form-data               | Hooks to build `formData`. Returns `Record<string, any> | Promise`.  | function({ file, formData })  | -                                              | -                          | 0.1.61           |
| loading-type                  | [Loading icon type](/component/loading)                                                                                                                                           | string                                 | -                                              | circular-ring              | -                |
| loading-color                 | [Loading icon color](/component/loading)                                                                                                                                           | string                                 | -                                              | #ffffff                    | -                |
| loading-size                  | [Loading icon size](/component/loading)                                                                                                                                           | string                                 | -                                              | 24px                       | -                |
| status-key                    | Within file dictionary, mapped field for upload status                                                                                                                                             | string                                 | -                                              | status                     | -                |
| image-mode                    | Preview `mode` attributes for image                                                                                                                                                           | ImageMode                              | -                                              | aspectFit                  | -                |
| accept                        | Accepts file type                                                                                                                                                                 | UploadFileType                         | **image** **video** **media** **file** **all** | **image**                  | 1.3.0            |
| compressed                    | Whether to compress the video, effective when `accept` is `video | media`                                                                                                                               | boolean                                | -                                              | true                       | 1.3.0            |
| maxDuration                   | Max video recording duration (seconds), effective when `accept` is `video | media`                                                                                                               | Number                                 | -                                              | 60                         | 1.3.0            |
| camera                        | Front or rear camera, effective when `accept` is `video | media`                                                                                                                       | UploadCameraType                       | **front**                                      | **back**                   | 1.3.0            |
| successStatus                 | Status code of a passed success response (statusCode)                                                                                                                                             | number / number[]                      | -                                              | 200                        | 1.3.4            |
| auto-upload                   | Auto uploads once file is picked. Set to `false` and trigger `.submit()` method manually to upload.                                                                                                            | boolean                                | -                                              | true                       | 1.3.8 |
| upload-method                 | Customized upload method                                                                                                                                                     | UploadMethod                                | -                                              | -                       | 1.3.8 |
| extension | Target file extension (Everything is supported for H5, `all` and `file` format only for WeChat, unsupported for other mini programs). | string[] | - | - | 1.9.0 |
