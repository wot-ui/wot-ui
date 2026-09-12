# useUpload

Used for handling file upload and selection related logic.

## Basic Usage

```ts
import { useUpload } from '@/uni_modules/wot-ui'

const { startUpload, abort, chooseFile, UPLOAD_STATUS } = useUpload()

// Select files
const files = await chooseFile({
  accept: 'image',
  multiple: true,
  maxCount: 9
})

// Start upload
const file = {
  url: 'file://temp/image.png',
  status: UPLOAD_STATUS.PENDING,
  percent: 0
}

startUpload(file, {
  action: 'https://upload-url',
  onSuccess(res) {
    console.log('Upload successful', res)
  },
  onError(err) {
    console.log('Upload failed', err) 
  },
  onProgress(progress) {
    console.log('Upload progress', progress)
  }
})

// Abort upload
abort()
```

## API

### Methods

| Method Name | Description | Parameters | Return Value | Minimum Version |
|-------|------|------|--------|---------|
| startUpload | Start uploading file | file: UploadFileItem, options: UseUploadOptions | UniApp.UploadTask \| void | - |
| abort | Abort upload | task?: UniApp.UploadTask | void | - |
| chooseFile | Select file | options: ChooseFileOption | Promise<ChooseFile[]> | - |

### UseUploadOptions

| Parameter | Description | Type | Default Value | Minimum Version |
|-----|------|------|--------|---------|
| action | Upload address | string | - | - |
| header | Request headers | Record<string, any> | {} | - |
| name | File corresponding key | string | 'file' | - |
| formData | Other form data | Record<string, any> | {} | - |
| fileType | File type | 'image' \| 'video' \| 'audio' | 'image' | - |
| statusCode | Success status code | number \| number[] | 200 | - |
| uploadMethod | Custom upload method | UploadMethod | - | - |
| onSuccess | Upload success callback | Function | - | - |
| onError | Upload failure callback | Function | - | - |
| onProgress | Upload progress callback | Function | - | - |

### ChooseFileOption

| Parameter | Description | Type | Default Value | Minimum Version |
|-----|------|------|--------|---------|
| multiple | Whether to support multiple file selection | boolean | false | - |
| sizeType | Selected image size | Array | ['original', 'compressed'] | - |
| sourceType | File selection source | Array | ['album', 'camera'] | - |
| maxCount | Maximum selectable quantity | number | 9 | - |
| accept | Accepted file types | 'image' \| 'video' \| 'media' \| 'file' \| 'all' | 'image' | - |
| compressed | Whether to compress video | boolean | true | - |
| maxDuration | Maximum video duration (seconds) | number | 60 | - |
| camera | Camera direction | 'back' \| 'front' | 'back' | - |
| extension | Filter by file extension (H5 supports all type filtering, WeChat mini program supports filtering when all and file, other platforms not supported) | string[] | - |

## File Selection Quantity Limits

Different platforms have different limits on file selection quantity, which are determined by the uni-app platform API itself:

### WeChat Platform

| Selection Method | Maximum Quantity | Description | Applicable Scenario |
|---------|---------|------|----------|
| `chooseMedia` | 20 | Maximum quantity limit when selecting images and videos | Used when accept is `image`, `video`, `media` |
| `chooseMessageFile` | 100 | Maximum quantity limit when selecting files | Used when accept is `file`, `all` |

### H5 Platform

| Selection Method | Maximum Quantity | Description | Applicable Scenario |
|---------|---------|------|----------|
| `chooseImage` | 9 | Maximum quantity limit when selecting images | Used when accept is `image` |
| `chooseVideo` | 1 | Does not support multiple selection, can only select single video file | Used when accept is `video` |
| `chooseFile` | 100 | Maximum quantity limit when selecting files | Used when accept is `all` |

::: warning H5 Platform Special Note
The count value on H5 platform is based on browser specifications. Current test results show that it can only limit single/multiple selection, but cannot limit specific quantity. Moreover, in actual mobile browsers, few support multiple selection.
:::

### App Platform

| Selection Method | Maximum Quantity | Description | Applicable Scenario |
|---------|---------|------|----------|
| `chooseImage` | 9 | Maximum quantity limit when selecting images | Used when accept is `image` |
| `chooseVideo` | 1 | Does not support multiple selection, can only select single video file | Used when accept is `video` |
| `chooseMedia` | Depends on App runtime | Select images and videos, requires HBuilderX 4.52+ | Used when accept is `media` |

### Other Platforms

| Selection Method | Maximum Quantity | Description | Applicable Scenario |
|---------|---------|------|----------|
| `chooseImage` | 9 | Maximum quantity limit when selecting images | Used when accept is `image` |
| `chooseVideo` | 1 | Does not support multiple selection, can only select single video file | Used when accept is `video` |

::: tip Hint
- WeChat platform prioritizes using `chooseMedia` and `chooseMessageFile`, with higher selection quantity limits
- App platform uses `chooseMedia` when accept is `media`, requiring HBuilderX 4.52+
- Video selection does not support multiple selection on most platforms
- Actual selectable quantity is also further limited by the `maxCount` parameter
:::
