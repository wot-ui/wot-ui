<template>
  <page-wraper>
    <view class="page-dialog">
      <wd-dialog></wd-dialog>
      <wd-dialog selector="wd-dialog-slot">
        <wd-rate v-model="rate" />
      </wd-dialog>
      <wd-dialog selector="wd-dialog-header-slot">
        <template #header>
          <image mode="widthFix" class="page-dialog__header-image" :src="blackMao"></image>
        </template>
      </wd-dialog>

      <demo-group :title="$t('zu-jian-lei-xing')">
        <demo-group-item :title="$t('ji-chu-yong-fa-0')">
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="basicAlert">{{ $t('alert-dan-chuang') }}</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="basicConfirm">{{ $t('confirm-dan-chuang') }}</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="basicPrompt">{{ $t('prompt-shu-ru-kuang') }}</wd-button>
          <wd-button type="primary" plain block @click="withTitleAndContent">{{ $t('biao-ti-nei-rong') }}</wd-button>
        </demo-group-item>
        <demo-group-item :title="$t('dan-chuang-lei-xing')">
          <wd-button type="success" plain block custom-class="page-dialog__button" @click="alertType">{{ $t('alert-lei-xing') }}</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="confirmType">{{ $t('confirm-lei-xing') }}</wd-button>
          <wd-button type="warning" plain block @click="promptType">{{ $t('prompt-lei-xing') }}</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group :title="$t('zu-jian-zhuang-tai')">
        <demo-group-item :title="$t('shu-ru-pei-zhi-prompt')">
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="promptWithPlaceholder">
            {{ $t('dai-zhan-wei-fu') }}
          </wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="promptWithDefaultValue">
            {{ $t('dai-mo-ren-zhi') }}
          </wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="promptTextarea">
            {{ $t('duo-hang-wen-ben-shu-ru') }}
          </wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="promptWithMaxlength">
            {{ $t('xian-zhi-shu-ru-chang-du') }}
          </wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="promptRegexValidation">
            {{ $t('zheng-ze-xiao-yan') }}
          </wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="promptFunctionValidation">函数校验</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="promptNumberInput">数字输入</wd-button>
          <wd-button type="primary" plain block @click="promptPasswordInput">密码输入</wd-button>
        </demo-group-item>
        <demo-group-item title="交互功能">
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="withCloseButton">显示关闭按钮</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="closeOnClickModal">点击遮罩关闭</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="beforeConfirmHook">确认前钩子</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="asyncBeforeConfirm">异步确认前钩子</wd-button>
          <wd-button type="primary" plain block @click="customZIndex">自定义层级</wd-button>
        </demo-group-item>
        <demo-group-item title="按钮状态">
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="loadingButton">按钮加载状态</wd-button>
          <wd-button type="primary" plain block @click="disabledButton">禁用按钮</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件变体">
        <demo-group-item title="弹窗风格">
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="buttonTheme">Button 风格（默认）</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="textTheme">Text 风格（iOS 风格）</wd-button>
          <wd-button type="primary" plain block @click="textThemeVertical">Text 风格 + 垂直布局</wd-button>
        </demo-group-item>
        <demo-group-item title="操作按钮配置">
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="customButtonText">自定义按钮文本</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="customButtonStyle">自定义按钮样式</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="verticalLayout">垂直排列按钮</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="singleButton">单个按钮</wd-button>
          <wd-button type="primary" plain block @click="multipleActions">多个按钮（Actions）</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item title="图标与头图">
          <wd-button type="success" plain block custom-class="page-dialog__button" @click="withSuccessIcon">成功图标</wd-button>
          <wd-button type="danger" plain block custom-class="page-dialog__button" @click="withDangerIcon">危险图标</wd-button>
          <wd-button type="warning" plain block custom-class="page-dialog__button" @click="withWarningIcon">警告图标</wd-button>
          <wd-button type="info" plain block custom-class="page-dialog__button" @click="withInfoIcon">信息图标</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="withCustomIcon">自定义图标</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="headerImageFull">顶部图片（完整）</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="headerImageWithTitle">顶部图片 + 标题</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="headerImageWithMessage">顶部图片 + 内容</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="headerImageOnly">顶部图片（纯图片）</wd-button>
          <wd-button type="primary" plain block @click="longTextScroll">长文本滚动</wd-button>
        </demo-group-item>
      </demo-group>

      <demo-group title="特殊样式">
        <demo-group-item title="插槽能力">
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="customSlot">默认插槽：自定义内容</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="slotHeader">Header 插槽：顶部图片</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="slotTitle">Title 插槽：自定义标题</wd-button>
          <wd-button type="primary" plain block @click="slotActions">Actions 插槽：多支付方式</wd-button>
        </demo-group-item>
        <demo-group-item title="业务场景示例">
          <wd-button type="danger" plain block custom-class="page-dialog__button" @click="deleteConfirm">删除确认</wd-button>
          <wd-button type="success" plain block custom-class="page-dialog__button" @click="paymentConfirm">支付确认</wd-button>
          <wd-button type="warning" plain block custom-class="page-dialog__button" @click="formSubmit">表单提交</wd-button>
          <wd-button type="info" plain block custom-class="page-dialog__button" @click="userFeedback">用户反馈选择</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="versionUpdate">版本更新</wd-button>
          <wd-button type="warning" plain block custom-class="page-dialog__button" @click="phoneCall">拨打电话</wd-button>
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="addressInput">地址录入</wd-button>
          <wd-button type="success" plain block @click="couponReceive">领取优惠券</wd-button>
        </demo-group-item>
        <demo-group-item title="开放能力（OpenType）">
          <wd-button type="primary" plain block custom-class="page-dialog__button" @click="getPhoneNumber">获取手机号</wd-button>
          <wd-button type="success" plain block custom-class="page-dialog__button" @click="getUserInfo">获取用户信息</wd-button>
          <wd-button type="info" plain block custom-class="page-dialog__button" @click="contactService">联系客服</wd-button>
          <wd-button type="warning" plain block custom-class="page-dialog__button" @click="openSettings">打开设置页</wd-button>
          <wd-button type="primary" plain block @click="multipleOpenTypes">多按钮不同开放能力</wd-button>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useDialog, useToast } from '@/uni_modules/wot-ui'
import { ref } from 'vue'

import blackMao from '../img/black_mao.png'

const rate = ref<number>(1)

const toast = useToast()
const dialog = useDialog()
const dialog1 = useDialog('wd-dialog-slot')
const dialog2 = useDialog('wd-dialog-header-slot')

// ==================== 1. 基础用法 ====================

function basicAlert() {
  dialog.alert({
    title: '提示',
    msg: '这是一条消息提示'
  })
}

function basicConfirm() {
  dialog
    .confirm({
      title: '提示',
      msg: '确认执行此操作吗？'
    })
    .then(() => {
      toast.success('点击了确定')
    })
    .catch(() => {
      toast.info('点击了取消')
    })
}

function basicPrompt() {
  dialog
    .prompt({
      title: '请输入内容',
      inputProps: {
        placeholder: '请输入'
      }
    })
    .then((resp) => {
      toast.success(`输入内容：${resp.value}`)
    })
    .catch(() => {
      toast.info('取消输入')
    })
}

function withTitleAndContent() {
  dialog.alert({
    title: '操作提示',
    msg: '您的请求已经提交，我们会尽快处理。'
  })
}

// ==================== 2. 弹窗类型 ====================

function alertType() {
  dialog.alert({
    title: 'Alert 类型',
    msg: '只有一个确认按钮，用于通知用户重要信息'
  })
}

function confirmType() {
  dialog
    .confirm({
      title: 'Confirm 类型',
      msg: '有确认和取消两个按钮，用于需要用户确认的操作'
    })
    .then(() => {
      toast.success('点击了确认')
    })
    .catch(() => {
      toast.info('点击了取消')
    })
}

function promptType() {
  dialog
    .prompt({
      title: 'Prompt 类型',
      msg: '包含输入框，用于收集用户输入的内容',
      inputProps: {
        placeholder: '请输入内容'
      }
    })
    .then((res) => {
      toast.success(`输入内容：${res.value}`)
    })
    .catch(() => {
      toast.info('取消输入')
    })
}

// ==================== 3. 弹窗风格 ====================

function buttonTheme() {
  dialog.confirm({
    title: 'Button 风格',
    msg: '这是 Button 风格的弹窗，按钮有背景色和圆角',
    theme: 'button'
  })
}

function textTheme() {
  dialog.confirm({
    title: 'Text 风格',
    msg: '这是 Text 风格的弹窗，类似 iOS 原生弹窗样式',
    theme: 'text'
  })
}

function textThemeVertical() {
  dialog.confirm({
    title: 'Text 风格 + 垂直布局',
    msg: 'Text 风格搭配垂直布局，适合操作文案较长的场景',
    theme: 'text',
    actionLayout: 'vertical'
  })
}

// ==================== 4. 视觉增强 ====================

function withSuccessIcon() {
  dialog.alert({
    title: '操作成功',
    msg: '您的操作已成功完成',
    icon: 'success'
  })
}

function withDangerIcon() {
  dialog.confirm({
    title: '危险操作',
    msg: '此操作不可撤销，请谨慎操作！',
    icon: 'danger'
  })
}

function withWarningIcon() {
  dialog.confirm({
    title: '警告提示',
    msg: '该操作存在风险，是否继续？',
    icon: 'warning'
  })
}

function withInfoIcon() {
  dialog.alert({
    title: '温馨提示',
    msg: '系统将在今晚22:00进行维护',
    icon: 'info'
  })
}

function withCustomIcon() {
  dialog.alert({
    title: '收藏成功',
    msg: '已添加到我的收藏',
    icon: 'star-fill',
    iconColor: 'var(--wot-warning-main, #ff9500)'
  })
}

function headerImageFull() {
  dialog
    .confirm({
      title: '活动通知',
      msg: '双十一活动火热进行中，快来参与吧！',
      headerImage: blackMao
    })
    .then(() => {
      toast.success('立即参与')
    })
}

function headerImageWithTitle() {
  dialog
    .confirm({
      title: '限时优惠活动',
      headerImage: blackMao
    })
    .then(() => {
      toast.success('立即查看')
    })
    .catch(() => {
      toast.info('取消')
    })
}

function headerImageWithMessage() {
  dialog.alert({
    msg: '恭喜您获得专属优惠券，快来领取吧！',
    headerImage: blackMao,
    confirmButtonText: '立即领取'
  })
}

function headerImageOnly() {
  dialog.alert({
    headerImage: blackMao,
    confirmButtonText: '我知道了'
  })
}

function longTextScroll() {
  dialog.alert({
    title: '用户协议',
    msg: '本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。本协议是用户与本平台之间的法律协议。'
  })
}

// ==================== 5. 按钮配置 ====================

function customButtonText() {
  dialog
    .confirm({
      title: '确认删除',
      msg: '删除后将无法恢复，是否继续？',
      confirmButtonText: '确认删除',
      cancelButtonText: '再考虑一下'
    })
    .then(() => {
      toast.success('点击了确认')
    })
    .catch(() => {
      toast.info('点击了取消')
    })
}

function customButtonStyle() {
  dialog
    .confirm({
      title: '自定义按钮样式',
      msg: '可以自定义按钮的样式和类型',
      cancelButtonProps: {
        text: '取消',
        round: false,
        type: 'danger',
        customClass: 'page-dialog__shadow'
      },
      confirmButtonProps: {
        text: '确定',
        round: false,
        type: 'success',
        customClass: 'page-dialog__shadow'
      }
    })
    .then(() => {
      toast.success('确认')
    })
    .catch(() => {
      toast.info('取消')
    })
}

function verticalLayout() {
  dialog.confirm({
    title: '版本更新',
    msg: '发现新版本，是否立即更新？',
    actionLayout: 'vertical',
    confirmButtonText: '立即更新',
    cancelButtonText: '稍后再说'
  })
}

function singleButton() {
  dialog.show({
    title: '提示',
    msg: '这个弹窗只有一个按钮',
    confirmButtonProps: '知道了',
    cancelButtonProps: null
  })
}

function multipleActions() {
  dialog.show({
    title: '版本更新',
    msg: '发现新版本 v2.0.0',
    actionLayout: 'vertical',
    actions: [
      {
        text: '立即更新',
        block: true,
        type: 'primary',
        click: () => {
          toast.success('立即更新')
        }
      },
      {
        text: '稍后更新',
        type: 'info',
        block: true,
        variant: 'plain',
        click: () => {
          toast.info('稍后更新')
        }
      },
      {
        text: '忽略此版本',
        block: true,
        click: () => {
          toast.info('已忽略')
        }
      }
    ]
  })
}

function loadingButton() {
  dialog.show({
    title: '处理中',
    msg: '正在处理您的请求，请稍候...',
    confirmButtonProps: {
      text: '处理中',
      loading: true,
      disabled: true
    },
    cancelButtonProps: null
  })

  // 3秒后自动关闭
  setTimeout(() => {
    dialog.close()
    toast.success('处理完成')
  }, 3000)
}

function disabledButton() {
  dialog.show({
    title: '操作提示',
    msg: '该操作暂时不可用',
    confirmButtonProps: {
      text: '确定',
      disabled: true
    },
    cancelButtonProps: {
      text: '取消'
    }
  })
}

// ==================== 6. 输入配置（Prompt） ====================

function promptWithPlaceholder() {
  dialog
    .prompt({
      title: '请输入内容',
      inputProps: {
        placeholder: '请输入您的昵称'
      }
    })
    .then((res) => {
      toast.success(`输入内容：${res.value}`)
    })
    .catch(() => {
      toast.info('取消输入')
    })
}

function promptWithDefaultValue() {
  dialog
    .prompt({
      title: '修改昵称',
      inputValue: '默认昵称',
      inputProps: {
        placeholder: '请输入新昵称'
      }
    })
    .then((res) => {
      toast.success(`新昵称：${res.value}`)
    })
    .catch(() => {
      toast.info('取消修改')
    })
}

function promptTextarea() {
  dialog
    .prompt({
      title: '请输入反馈',
      textareaProps: {
        placeholder: '请输入您的意见或建议',
        maxlength: 200,
        showWordLimit: true
      }
    })
    .then((res) => {
      toast.success('提交成功')
    })
    .catch(() => {
      toast.info('取消输入')
    })
}

function promptWithMaxlength() {
  dialog
    .prompt({
      title: '请输入验证码',
      inputProps: {
        placeholder: '请输入6位验证码',
        maxlength: 6
      }
    })
    .then((res) => {
      toast.success(`验证码：${res.value}`)
    })
    .catch(() => {
      toast.info('取消输入')
    })
}

function promptRegexValidation() {
  dialog
    .prompt({
      title: '请输入内容',
      inputProps: {
        placeholder: '请输入至少5个字符'
      },
      inputPattern: /.{5,}/,
      inputError: '输入内容不能少于5个字符'
    })
    .then((res) => {
      toast.success(`输入内容：${res.value}`)
    })
    .catch(() => {
      toast.info('取消输入')
    })
}

function promptFunctionValidation() {
  dialog
    .prompt({
      title: '请输入手机号',
      inputProps: {
        type: 'tel',
        placeholder: '请输入11位手机号'
      },
      inputValidate: (value) => {
        if (!/^1[3-9]\d{9}$/.test(String(value))) {
          return false
        }
        return true
      },
      inputError: '请输入正确的手机号码'
    })
    .then((res) => {
      toast.success(`手机号：${res.value}`)
    })
    .catch(() => {
      toast.info('取消输入')
    })
}

function promptNumberInput() {
  dialog
    .prompt({
      title: '请输入金额',
      inputProps: {
        type: 'number',
        placeholder: '请输入金额'
      }
    })
    .then((res) => {
      toast.success(`金额：¥${res.value}`)
    })
    .catch(() => {
      toast.info('取消输入')
    })
}

function promptPasswordInput() {
  dialog
    .prompt({
      title: '请输入密码',
      inputProps: {
        showPassword: true,
        placeholder: '请输入密码'
      }
    })
    .then((res) => {
      toast.success('密码验证成功')
    })
    .catch(() => {
      toast.info('取消输入')
    })
}

// ==================== 7. 交互功能 ====================

function withCloseButton() {
  dialog
    .confirm({
      title: '系统公告',
      msg: '系统将于今晚22:00进行维护升级',
      showClose: true,
      closeOnClickModal: false
    })
    .catch((res) => {
      toast.info(`关闭方式：${res.action}`)
    })
}

function closeOnClickModal() {
  dialog.alert({
    title: '点击遮罩可关闭',
    msg: '试试点击弹窗外的区域',
    closeOnClickModal: true
  })
}

function beforeConfirmHook() {
  dialog
    .confirm({
      title: '提示',
      msg: '是否删除？',
      beforeConfirm: () => {
        toast.loading('删除中...')
        return new Promise((resolve) => {
          setTimeout(() => {
            toast.close()
            toast.success('删除成功')
            resolve(true)
          }, 2000)
        })
      }
    })
    .catch(() => {
      toast.info('取消删除')
    })
}

function asyncBeforeConfirm() {
  dialog
    .confirm({
      title: '异步验证',
      msg: '将进行异步验证，请稍候',
      beforeConfirm: () => {
        toast.loading('验证中...')
        return new Promise((resolve) => {
          setTimeout(() => {
            toast.close()
            const isValid = Math.random() > 0.3
            if (isValid) {
              toast.success('验证通过')
            } else {
              toast.error('验证失败')
            }
            resolve(isValid)
          }, 2000)
        })
      }
    })
    .catch(() => {
      toast.info('取消操作')
    })
}

function customZIndex() {
  dialog.alert({
    title: '高层级弹窗',
    msg: '此弹窗的 z-index 为 9999',
    zIndex: 9999
  })
}

// ==================== 8. 业务场景示例 ====================

function deleteConfirm() {
  dialog
    .confirm({
      title: '删除确认',
      msg: '确定要删除这条记录吗？删除后将无法恢复。',
      icon: 'warning',
      confirmButtonText: '确认删除',
      confirmButtonProps: {
        type: 'danger'
      },
      beforeConfirm: () => {
        toast.loading('删除中...')
        return new Promise((resolve) => {
          setTimeout(() => {
            toast.close()
            toast.success('删除成功')
            resolve(true)
          }, 1500)
        })
      }
    })
    .then(() => {
      console.log('删除完成')
    })
    .catch(() => {
      toast.info('取消删除')
    })
}

function paymentConfirm() {
  dialog
    .confirm({
      title: '确认支付',
      msg: '您将支付 ¥99.00 元购买会员服务',
      icon: 'info',
      theme: 'text',
      actionLayout: 'vertical',
      confirmButtonText: '确认支付',
      cancelButtonText: '取消',
      beforeConfirm: () => {
        toast.loading('支付中...')
        return new Promise((resolve) => {
          setTimeout(() => {
            toast.close()
            toast.success('支付成功')
            resolve(true)
          }, 2000)
        })
      }
    })
    .then(() => {
      console.log('支付成功')
    })
    .catch(() => {
      toast.info('取消支付')
    })
}

function formSubmit() {
  dialog
    .prompt({
      title: '提交申请',
      msg: '请输入申请理由（不少于10个字符）',
      icon: 'info',
      textareaProps: {
        placeholder: '请输入申请理由',
        maxlength: 100,
        showWordLimit: true
      },
      inputPattern: /.{10,}/,
      inputError: '申请理由不能少于10个字符',
      confirmButtonText: '提交申请',
      beforeConfirm: () => {
        toast.loading('提交中...')
        return new Promise((resolve) => {
          setTimeout(() => {
            toast.close()
            toast.success('提交成功')
            resolve(true)
          }, 1500)
        })
      }
    })
    .then((res) => {
      console.log('申请内容：', res.value)
    })
    .catch(() => {
      toast.info('取消提交')
    })
}

function userFeedback() {
  dialog.show({
    title: '反馈类型',
    msg: '请选择您要反馈的问题类型',
    icon: 'info',
    theme: 'text',
    actionLayout: 'vertical',
    actions: [
      {
        text: '功能建议',
        block: true,
        click: () => {
          toast.success('已选择：功能建议')
        }
      },
      {
        text: '问题反馈',
        block: true,
        click: () => {
          toast.success('已选择：问题反馈')
        }
      },
      {
        text: '其他',
        block: true,
        click: () => {
          toast.success('已选择：其他')
        }
      },
      {
        text: '取消',
        block: true,
        click: () => {
          toast.info('取消')
        }
      }
    ]
  })
}

function versionUpdate() {
  dialog.show({
    title: '版本更新',
    msg: '发现新版本 v2.5.0\n\n更新内容：\n1. 新增 XX 功能\n2. 优化 XX 体验\n3. 修复若干已知问题',
    icon: 'info',
    headerImage: blackMao,
    actionLayout: 'vertical',
    actions: [
      {
        text: '立即更新',
        block: true,
        type: 'primary',
        click: () => {
          toast.loading('正在更新...')
          setTimeout(() => {
            toast.close()
            toast.success('更新成功')
          }, 2000)
        }
      },
      {
        text: '稍后提醒',
        block: true,
        click: () => {
          toast.info('稍后提醒')
        }
      },
      {
        text: '忽略此版本',
        block: true,
        click: () => {
          toast.info('已忽略')
        }
      }
    ]
  })
}

function phoneCall() {
  dialog
    .confirm({
      title: '拨打电话',
      msg: '确认拨打 400-123-4567 吗？',
      icon: 'info',
      confirmButtonText: '立即拨打',
      beforeConfirm: () => {
        // 实际项目中使用 uni.makePhoneCall
        toast.loading('正在拨打...')
        return new Promise((resolve) => {
          setTimeout(() => {
            toast.close()
            toast.success('拨打成功')
            resolve(true)
          }, 1000)
        })
      }
    })
    .catch(() => {
      toast.info('取消拨打')
    })
}

function addressInput() {
  dialog
    .prompt({
      title: '收货地址',
      msg: '请输入详细地址',
      textareaProps: {
        placeholder: '请输入街道门牌号等详细信息',
        maxlength: 100,
        showWordLimit: true
      },
      confirmButtonText: '保存地址'
    })
    .then((res) => {
      toast.success('地址保存成功')
      console.log('地址：', res.value)
    })
    .catch(() => {
      toast.info('取消输入')
    })
}

function couponReceive() {
  dialog
    .alert({
      title: '恭喜您',
      msg: '成功领取满100减20优惠券',
      icon: 'success',
      headerImage: blackMao,
      confirmButtonText: '立即使用'
    })
    .then(() => {
      toast.success('跳转到商城')
    })
}

// ==================== 9. 高级用法（插槽） ====================

function customSlot() {
  dialog1
    .confirm({
      title: '请为我们评分'
    })
    .then(() => {
      dialog.alert({
        title: '感谢评分',
        msg: `您的评分为 ${rate.value} 分`,
        icon: 'success'
      })
    })
    .catch(() => {})
}

function slotHeader() {
  dialog2
    .confirm({
      title: '限时活动',
      msg: '现在参与活动即可获得专属优惠券，机会难得，不容错过！'
    })
    .then(() => {
      toast.success('立即参与')
    })
    .catch(() => {
      toast.info('取消')
    })
}

function slotTitle() {
  dialog.show({
    title: '会员特权',
    msg: '开通会员即可享受以下专属特权：\n\n• 免广告观看\n• 高清画质\n• 离线下载\n• 会员专属内容',
    confirmButtonProps: '立即开通',
    cancelButtonProps: '暂不开通'
  })
}

function slotActions() {
  dialog.show({
    title: '支付方式',
    msg: '请选择支付方式完成购买',
    actionLayout: 'vertical',
    actions: [
      {
        text: '💳 微信支付',
        block: true,
        type: 'success',
        click: () => {
          toast.success('微信支付')
        }
      },
      {
        text: '💰 支付宝',
        block: true,
        type: 'primary',
        click: () => {
          toast.success('支付宝')
        }
      },
      {
        text: '💵 银行卡',
        block: true,
        type: 'info',
        click: () => {
          toast.success('银行卡支付')
        }
      },
      {
        text: '取消',
        block: true,
        click: () => {
          toast.info('取消')
        }
      }
    ]
  })
}

// ==================== 10. 开放能力（OpenType） ====================

function getPhoneNumber() {
  dialog.confirm({
    title: '获取手机号',
    msg: '需要获取您的手机号以便提供更好的服务',
    icon: 'info',
    confirmButtonProps: {
      text: '授权获取',
      openType: 'getPhoneNumber',
      onGetphonenumber: (detail) => {
        console.log('获取手机号结果:', detail)
        if (detail.errMsg === 'getPhoneNumber:ok') {
          toast.success('授权成功')
        } else {
          toast.error('授权失败')
        }
      },
      onError: (detail) => {
        console.error('获取手机号错误:', detail)
        toast.error('获取失败')
      }
    }
  })
}

function getUserInfo() {
  dialog.confirm({
    title: '获取用户信息',
    msg: '需要获取您的昵称、头像等信息',
    icon: 'info',
    theme: 'text',
    confirmButtonProps: {
      text: '授权',
      openType: 'getUserInfo',
      lang: 'zh_CN',
      onGetuserinfo: (detail) => {
        console.log('用户信息:', detail)
        if (detail.errMsg === 'getUserInfo:ok') {
          toast.success(`欢迎 ${detail.userInfo?.nickName || '用户'}`)
        } else {
          toast.error('授权失败')
        }
      }
    }
  })
}

function contactService() {
  dialog.confirm({
    title: '联系客服',
    msg: '如有问题，请随时联系我们的客服团队',
    icon: 'info',
    confirmButtonProps: {
      text: '进入客服',
      openType: 'contact',
      sessionFrom: 'dialog-demo',
      sendMessageTitle: '咨询问题',
      sendMessagePath: '/pages/index/index',
      showMessageCard: true,
      onContact: (detail) => {
        console.log('客服会话:', detail)
        toast.success('已进入客服会话')
      }
    },
    cancelButtonProps: {
      text: '暂不需要'
    }
  })
}

function openSettings() {
  dialog.confirm({
    title: '需要权限',
    msg: '请在设置中开启相关权限以使用完整功能',
    icon: 'warning',
    confirmButtonProps: {
      text: '去设置',
      openType: 'openSetting',
      onOpensetting: (detail) => {
        console.log('打开设置结果:', detail)
        if (detail.authSetting) {
          toast.success('已打开设置页')
        }
      }
    }
  })
}

function multipleOpenTypes() {
  dialog.show({
    title: '选择授权方式',
    msg: '请选择您要授权的信息类型',
    icon: 'info',
    theme: 'text',
    actionLayout: 'vertical',
    actions: [
      {
        text: '📱 获取手机号',
        block: true,
        type: 'primary',
        openType: 'getPhoneNumber',
        onGetphonenumber: (detail) => {
          console.log('手机号:', detail)
          if (detail.errMsg === 'getPhoneNumber:ok') {
            toast.success('手机号授权成功')
          }
        }
      },
      {
        text: '👤 获取用户信息',
        block: true,
        type: 'success',
        openType: 'getUserInfo',
        lang: 'zh_CN',
        onGetuserinfo: (detail) => {
          console.log('用户信息:', detail)
          if (detail.userInfo) {
            toast.success('用户信息获取成功')
          }
        }
      },
      {
        text: '💬 联系客服',
        block: true,
        type: 'info',
        openType: 'contact',
        sessionFrom: 'multi-dialog',
        onContact: (detail) => {
          console.log('客服:', detail)
          toast.success('进入客服会话')
        }
      },
      {
        text: '⚙️ 打开设置',
        block: true,
        type: 'warning',
        openType: 'openSetting',
        onOpensetting: (detail) => {
          console.log('设置:', detail)
          toast.success('已打开设置页')
        }
      },
      {
        text: '取消',
        block: true,
        click: () => {
          toast.info('取消授权')
        }
      }
    ]
  })
}
</script>
<style lang="scss" scoped>
.page-dialog {
  &__header-image {
    display: block;
    width: 100%;
  }

  :deep() {
    .page-dialog__button {
      margin-bottom: $spacing-tight;
    }

    .page-dialog__shadow {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
  }
}
</style>
