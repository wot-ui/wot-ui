<template>
  <page-wraper>
    <!-- #ifdef MP-WEIXIN -->
    <wd-privacy-popup></wd-privacy-popup>
    <!-- #endif -->
    <wd-dialog></wd-dialog>
    <wd-toast></wd-toast>

    <view class="page-upload">
      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('jiBenYongFa')">
          <wd-upload accept="image" v-model:file-list="fileList" image-mode="aspectFill" :action="action" :success-status="[200, 201]"></wd-upload>
        </demo-group-item>
        <demo-group-item :title="$t('shang-chuan-shi-pin')">
          <wd-upload accept="video" multiple :file-list="fileList1" :action="action" :success-status="[200, 201]" @change="handleChange1"></wd-upload>
        </demo-group-item>

        <!-- #ifdef MP-WEIXIN -->
        <demo-group-item :title="$t('shang-chuan-shi-pin-he-tu-pian')">
          <wd-upload
            accept="media"
            multiple
            :file-list="fileList11"
            :action="action"
            :success-status="[200, 201]"
            @change="handleChange11"
          ></wd-upload>
        </demo-group-item>
        <demo-group-item :title="$t('jin-shang-chuan-wen-jian')">
          <wd-upload
            accept="file"
            multiple
            :file-list="fileList12"
            :action="action"
            :success-status="[200, 201]"
            @change="handleChange12"
          ></wd-upload>
        </demo-group-item>
        <!-- #endif -->

        <!-- #ifdef MP-WEIXIN || H5 -->
        <demo-group-item :title="$t('shang-chuan-shi-pin-tu-pian-he-wen-jian')">
          <wd-upload accept="all" multiple :file-list="fileList13" :action="action" :success-status="[200, 201]" @change="handleChange13"></wd-upload>
        </demo-group-item>
        <!-- #endif -->
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('shang-chuan-zhuang-tai-gou-zi')">
          <wd-upload
            :file-list="fileList7"
            :action="action"
            :success-status="[200, 201]"
            @change="handleChange7"
            @success="handleSuccess"
            @fail="handleFail"
            @progress="handleProgess"
          ></wd-upload>
          <view v-if="uploadStatusText" class="page-upload__status">{{ uploadStatusText }}</view>
        </demo-group-item>
        <demo-group-item :title="$t('jinYong')">
          <wd-upload :file-list="fileList8" disabled :action="action" :success-status="[200, 201]" @change="handleChange8"></wd-upload>
        </demo-group-item>
        <demo-group-item :title="$t('shou-dong-chu-fa-shang-chuan')">
          <view class="page-upload__action-row">
            <wd-upload
              ref="upload14"
              :auto-upload="false"
              :file-list="fileList14"
              :action="action"
              :success-status="[200, 201]"
              @change="handleChange14"
            ></wd-upload>
            <wd-button @click="upload14?.submit()">{{ $t('kai-shi-shang-chuan') }}</wd-button>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-bian-ti')">
        <demo-group-item :title="$t('zui-da-shang-chuan-shu-xian-zhi')">
          <wd-upload :file-list="fileList3" :limit="3" :action="action" :success-status="[200, 201]" @change="handleChange3"></wd-upload>
        </demo-group-item>
        <demo-group-item :title="$t('fu-gai-shang-chuan')">
          <!-- #ifdef MP-WEIXIN || H5 -->
          <wd-upload
            accept="all"
            reupload
            v-model:file-list="fileList17"
            image-mode="aspectFill"
            :action="action"
            :success-status="[200, 201]"
          ></wd-upload>
          <!-- #endif -->
          <!-- #ifndef MP-WEIXIN -->
          <!-- #ifndef H5 -->
          <wd-upload
            accept="image"
            reupload
            v-model:file-list="fileList17"
            image-mode="aspectFill"
            :action="action"
            :success-status="[200, 201]"
          ></wd-upload>
          <!-- #endif -->
          <!-- #endif -->
        </demo-group-item>
        <demo-group-item :title="$t('duo-xuan')">
          <wd-upload :file-list="fileList2" multiple :action="action" :success-status="[200, 201]" @change="handleChange2"></wd-upload>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-yang-shi')">
        <demo-group-item :title="$t('zi-ding-yi-huan-qi-shang-chuan-yang-shi-bing-xian-zhi-shang-chuan-5-zhang')">
          <wd-upload :file-list="fileList9" :action="action" :success-status="[200, 201]" @change="handleChange9" :limit="5">
            <wd-button>{{ $t('zi-ding-yi-huan-qi-yang-shi') }}</wd-button>
          </wd-upload>
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-yu-lan-yang-shi')">
          <wd-upload v-model:file-list="fileList16" accept="image" image-mode="aspectFill" :action="action" :success-status="[200, 201]">
            <template #preview-cover="{ file, index }">
              <view class="page-upload__preview-cover">{{ file.name || `文件${index}` }}</view>
            </template>
          </wd-upload>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('te-shu-yang-shi')">
        <demo-group-item :title="$t('lan-jie-yu-lan-tu-pian-cao-zuo')">
          <wd-upload
            :file-list="fileList4"
            :action="action"
            :success-status="[200, 201]"
            @change="handleChange4"
            :before-preview="beforePreview"
          ></wd-upload>
        </demo-group-item>
        <demo-group-item :title="$t('shang-chuan-qian-zhi-chu-li')">
          <wd-upload
            :file-list="fileList5"
            :action="action"
            :success-status="[200, 201]"
            @change="handleChange5"
            :before-upload="beforeUpload"
          ></wd-upload>
        </demo-group-item>
        <demo-group-item :title="$t('yi-chu-tu-pian-qian-zhi-chu-li')">
          <wd-upload
            :file-list="fileList6"
            :action="action"
            :success-status="[200, 201]"
            @change="handleChange6"
            :before-remove="beforeRemove"
          ></wd-upload>
        </demo-group-item>
        <demo-group-item :title="$t('xuan-ze-wen-jian-qian-zhi-chu-li')">
          <wd-upload
            :file-list="fileList10"
            :action="action"
            :success-status="[200, 201]"
            @change="handleChange10"
            :before-choose="beforeChoose"
          ></wd-upload>
        </demo-group-item>
        <demo-group-item :title="$t('zi-ding-yi-shang-chuan-fang-fa')">
          <wd-upload v-model:file-list="fileList15" :upload-method="customUpload" :success-status="[200, 201]"></wd-upload>
        </demo-group-item>

        <!-- #ifdef H5 || MP-WEIXIN -->
        <demo-group-item :title="$t('gen-ju-kuo-zhan-ming-guo-lv')">
          <!-- #ifdef H5 -->
          <wd-upload v-model:file-list="fileList18" :extension="['.jpg', '.png']" :action="action" :success-status="[200, 201]"></wd-upload>
          <view class="page-upload__filter-tip">{{ $t('xuan-ze-shi-pin-shi-guo-lv-mp4') }}</view>
          <wd-upload accept="video" v-model:file-list="fileList19" :extension="['.mp4']" :action="action" :success-status="[200, 201]"></wd-upload>
          <view class="page-upload__filter-tip">{{ $t('shang-chuan-suo-you-lei-xing-wen-jian-shi-guo-lv-pdf-he-docx') }}</view>
          <wd-upload
            accept="all"
            v-model:file-list="fileList21"
            :extension="['.pdf', '.docx']"
            :action="action"
            :success-status="[200, 201]"
          ></wd-upload>
          <!-- #endif -->
          <!-- #ifdef MP-WEIXIN -->
          <view class="page-upload__filter-tip">{{ $t('xuan-ze-wen-jian-shi-guo-lv-txt-wen-jian') }}</view>
          <wd-upload accept="file" v-model:file-list="fileList19" :extension="['.txt']" :action="action" :success-status="[200, 201]"></wd-upload>
          <view class="page-upload__filter-tip">{{ $t('xuan-ze-suo-you-wen-jian-shi-guo-lv-jpg-he-mp4') }}</view>
          <wd-upload
            accept="all"
            v-model:file-list="fileList20"
            :extension="['.jpg', '.mp4']"
            :action="action"
            :success-status="[200, 201]"
          ></wd-upload>
          <!-- #endif -->
        </demo-group-item>
        <!-- #endif -->
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast, useDialog } from '@/uni_modules/wot-ui'
import type { UploadFile, UploadInstance, UploadMethod } from '@/uni_modules/wot-ui/components/wd-upload/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const action: string = 'https://69bd04402bc2a25b22ad0a49.mockapi.io/upload'
const fileList = ref<UploadFile[]>([
  {
    url: 'https://wot-ui.cn/assets/panda.jpg'
  }
])

const fileList1 = ref<UploadFile[]>([])
const fileList2 = ref<UploadFile[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])
const fileList3 = ref<UploadFile[]>([])
const fileList4 = ref<UploadFile[]>([])
const fileList5 = ref<UploadFile[]>([])
const fileList6 = ref<UploadFile[]>([])
const fileList7 = ref<UploadFile[]>([])
const fileList8 = ref<UploadFile[]>([])
const fileList9 = ref<UploadFile[]>([])
const fileList10 = ref<UploadFile[]>([])
const fileList11 = ref<UploadFile[]>([])
const fileList12 = ref<UploadFile[]>([])
const fileList13 = ref<UploadFile[]>([])
const fileList14 = ref<UploadFile[]>([])
const fileList15 = ref<UploadFile[]>([])
const fileList16 = ref<UploadFile[]>([
  {
    url: 'https://wot-ui.cn/assets/panda.jpg',
    name: 'panda'
  }
])
const fileList17 = ref<UploadFile[]>([
  {
    url: 'https://wot-ui.cn/assets/panda.jpg'
  }
])
const fileList18 = ref<UploadFile[]>([])
const fileList19 = ref<UploadFile[]>([])
const fileList20 = ref<UploadFile[]>([])
const fileList21 = ref<UploadFile[]>([])

const upload14 = ref<UploadInstance>()
const uploadStatusText = ref<string>('')

const dialog = useDialog()
const toast = useToast()

const beforeChoose = () => {
  return new Promise<boolean>((resolve) => {
    dialog
      .confirm({
        msg: t('shi-fou-xuan-ze'),
        title: t('ti-shi-0')
      })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        toast.show(t('qu-xiao-xuan-ze-cao-zuo'))
        resolve(false)
      })
  })
}

const beforePreview = () => {
  return new Promise<boolean>((resolve) => {
    dialog
      .confirm({
        msg: t('shi-fou-yu-lan-tu-pian'),
        title: t('ti-shi-0')
      })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        toast.show(t('qu-xiao-yu-lan-cao-zuo'))
        resolve(false)
      })
  })
}
const beforeUpload = () => {
  return new Promise<boolean>((resolve) => {
    dialog
      .confirm({
        msg: t('shi-fou-shang-chuan'),
        title: t('ti-shi-0')
      })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        toast.show(t('qu-xiao-shang-chuan-cao-zuo'))
        resolve(false)
      })
  })
}
const beforeRemove = () => {
  return new Promise<boolean>((resolve) => {
    dialog
      .confirm({
        msg: t('shi-fou-shan-chu-0'),
        title: t('ti-shi-0')
      })
      .then(() => {
        toast.success(t('shan-chu-cheng-gong'))
        resolve(true)
      })
      .catch(() => {
        toast.show(t('qu-xiao-shan-chu-cao-zuo'))
        resolve(false)
      })
  })
}

const buildFormData = ({ file, formData }: any) => {
  let imageName = file.url.substring(file.url.lastIndexOf('/') + 1)
  // #ifdef H5
  // h5端url中不包含扩展名，可以拼接一下name
  imageName = imageName + file.name
  // #endif
  const signature = t('your-less-than-signaturestring-greater-than')
  const ossAccessKeyId = t('your-ossaccesskeyid')
  const policy = t('your-less-than-policybase64str-greater-than')
  const key = `20231120/${imageName}`
  const success_action_status = '200' // 将上传成功状态码设置为200，默认状态码为204

  return {
    ...formData,
    key: key,
    OSSAccessKeyId: ossAccessKeyId,
    policy: policy,
    signature: signature,
    success_action_status: success_action_status
  }
}

function handleSuccess(event: any) {
  uploadStatusText.value = t('shang-chuan-cheng-gong-eventfilename-eventfileurl', event.file.name || event.file.url)
}
function handleFail(event: any) {
  uploadStatusText.value = t('shang-chuan-shi-bai-eventfilename-eventfileurl', event.file.name || event.file.url)
}
function handleProgess(event: any) {
  uploadStatusText.value = t('shang-chuan-zhong-eventresponseprogress', event.response.progress)
}

function handleChange({ fileList: list }: any) {
  fileList.value = list
}

function handleChange1({ fileList }: { fileList: UploadFile[] }) {
  // fileList.forEach((item) => {
  //   if (!item.thumb) {
  //     item.thumb = 'https://wot-ui.cn/assets/redpanda.jpg'
  //   }
  // })
  fileList1.value = fileList
}
function handleChange2({ fileList }: any) {
  fileList2.value = fileList
}
function handleChange3({ fileList }: any) {
  fileList3.value = fileList
}
function handleChange4({ fileList }: any) {
  fileList4.value = fileList
}
function handleChange5({ fileList }: any) {
  fileList5.value = fileList
}
function handleChange6({ fileList }: any) {
  fileList6.value = fileList
}
function handleChange7({ fileList }: any) {
  fileList7.value = fileList
}
function handleChange8({ fileList }: any) {
  fileList8.value = fileList
}
function handleChange9({ fileList }: any) {
  fileList9.value = fileList
}
function handleChange10({ fileList }: any) {
  fileList10.value = fileList
}
function handleChange11({ fileList }: any) {
  fileList11.value = fileList
}
function handleChange12({ fileList }: any) {
  fileList12.value = fileList
}
function handleChange13({ fileList }: any) {
  fileList13.value = fileList
}
function handleChange14({ fileList }: any) {
  fileList14.value = fileList
}

const customUpload: UploadMethod = (file, formData, options) => {
  const uploadTask = uni.uploadFile({
    url: action,
    header: options.header,
    name: options.name,
    fileName: options.name,
    fileType: options.fileType,
    formData,
    filePath: file.url,
    success(res) {
      const statusCode = options.statusCode
      const isSuccess = Array.isArray(statusCode) ? statusCode.includes(res.statusCode) : res.statusCode === statusCode
      if (isSuccess) {
        // 上传成功
        options.onSuccess(res, file, formData)
      } else {
        // 上传失败
        options.onError({ ...res, errMsg: res.errMsg || '' }, file, formData)
      }
    },
    fail(err) {
      // 上传失败
      options.onError(err, file, formData)
    }
  })
  // 获取当前文件加载的百分比
  uploadTask.onProgressUpdate((res) => {
    options.onProgress(res, file)
  })
}
</script>
<style lang="scss" scoped>
.page-upload {
  &__action-row {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-loose;
  }

  &__status {
    margin-top: $spacing-loose;
    color: $text-auxiliary;
    font-size: $typography-body-size-main;
  }

  &__filter-tip {
    margin: $spacing-main 0;
  }

  &__preview-cover {
    margin-top: 10rpx;
    text-align: center;
  }
}
</style>
