<template>
  <view class="page-message-box">
    <page-wraper>
      <wd-message-box></wd-message-box>
      <wd-message-box selector="wd-message-box-slot">
        <wd-rate v-model="rate" />
      </wd-message-box>
      <wd-message-box selector="wd-message-box-header-slot">
        <template #header>
          <image mode="widthFix" style="width: 100%; display: block" :src="blackMao"></image>
        </template>
      </wd-message-box>

      <!-- 基础用法 -->
      <demo-block title="基础用法">
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="basicAlert">Alert 弹窗</wd-button>
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="basicConfirm">Confirm 弹窗</wd-button>
        <wd-button type="primary" plain block @click="basicPrompt">Prompt 输入框</wd-button>
      </demo-block>

      <!-- 弹窗风格 -->
      <demo-block title="弹窗风格">
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="buttonTheme">Button 风格（默认）</wd-button>
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="textTheme">Text 风格（iOS）</wd-button>
        <wd-button type="primary" plain block @click="textThemeWithActions">Text 风格 + 多按钮</wd-button>
      </demo-block>

      <!-- 视觉增强 -->
      <demo-block title="视觉增强">
        <wd-button type="success" plain block custom-style="margin-bottom: 24px" @click="withIcon">内置图标</wd-button>
        <wd-button type="info" plain block custom-style="margin-bottom: 24px" @click="withCustomIcon">自定义图标</wd-button>
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="withHeaderImage">顶部图片</wd-button>
        <wd-button type="primary" plain block @click="longTextScroll">长文本滚动</wd-button>
      </demo-block>

      <!-- 按钮配置 -->
      <demo-block title="按钮配置">
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="customButtonText">自定义按钮文本</wd-button>
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="customButtonStyle">自定义按钮样式</wd-button>
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="verticalLayout">垂直排列</wd-button>
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="multipleActions">多按钮（Actions）</wd-button>
        <wd-button type="primary" plain block @click="hideButton">隐藏按钮</wd-button>
      </demo-block>

      <!-- 输入配置 -->
      <demo-block title="输入配置">
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="textareaInput">多行输入</wd-button>
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="inputValidation">输入校验</wd-button>
        <wd-button type="primary" plain block @click="inputWithIcon">输入框 + 图标</wd-button>
      </demo-block>

      <!-- 交互功能 -->
      <demo-block title="交互功能">
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="withCloseButton">关闭按钮</wd-button>
        <wd-button type="primary" plain block @click="beforeConfirmHook">确认前钩子</wd-button>
      </demo-block>

      <!-- 业务场景 -->
      <demo-block title="业务场景">
        <wd-button type="danger" plain block custom-style="margin-bottom: 24px" @click="deleteConfirm">删除确认</wd-button>
        <wd-button type="success" plain block custom-style="margin-bottom: 24px" @click="paymentConfirm">支付确认</wd-button>
        <wd-button type="warning" plain block custom-style="margin-bottom: 24px" @click="formSubmit">表单提交</wd-button>
        <wd-button type="info" plain block @click="userFeedback">用户反馈</wd-button>
      </demo-block>

      <!-- 高级用法 -->
      <demo-block title="高级用法（插槽）">
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="customSlot">默认插槽：自定义内容</wd-button>
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="slotHeader">header 插槽：顶部图片</wd-button>
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="slotTitle">title 插槽：自定义标题</wd-button>
        <wd-button type="primary" plain block custom-style="margin-bottom: 24px" @click="slotActions">actions 插槽：自定义按钮</wd-button>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { useMessage, useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'

import blackMao from '../img/black_mao.png'

const rate = ref<number>(1)

const toast = useToast()
const message = useMessage()
const message1 = useMessage('wd-message-box-slot')
const message2 = useMessage('wd-message-box-header-slot')

// ==================== 1. 基础用法 ====================

function basicAlert() {
  message.alert({
    title: '提示',
    msg: '这是一条消息提示'
  })
}

function basicConfirm() {
  message
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
  message
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

// ==================== 2. 弹窗风格 ====================

function buttonTheme() {
  message.confirm({
    title: '提示',
    msg: '这是 Button 风格的弹窗，按钮有背景色和圆角',
    theme: 'button'
  })
}

function textTheme() {
  message.confirm({
    title: '提示',
    msg: '这是 Text 风格的弹窗，类似 iOS 原生弹窗样式',
    theme: 'text'
  })
}

function textThemeWithActions() {
  message.show({
    title: '选择操作',
    msg: '请选择您想要执行的操作',
    theme: 'text',
    actionLayout: 'vertical',
    actions: [
      {
        text: '立即执行',
        block: true,
        click: () => {
          toast.success('立即执行')
        }
      },
      {
        text: '延后执行',
        block: true,
        click: () => {
          toast.info('延后执行')
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

// ==================== 3. 视觉增强 ====================

function withIcon() {
  message
    .confirm({
      title: '操作成功',
      msg: '您的操作已成功完成',
      icon: 'success'
    })
    .then(() => {
      toast.success('确认')
    })
}

function withCustomIcon() {
  message.alert({
    title: '收藏成功',
    msg: '已添加到我的收藏',
    icon: 'star-fill',
    iconColor: '#ff9500'
  })
}

function withHeaderImage() {
  message
    .confirm({
      title: '活动通知',
      msg: '双十一活动火热进行中，快来参与吧！',
      headerImage: blackMao
    })
    .then(() => {
      toast.success('确认')
    })
}

function longTextScroll() {
  message.alert({
    title: '用户协议',
    msg: '以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字。以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字，以上文字仅为占位文字。'
  })
}

// ==================== 4. 按钮配置 ====================

function customButtonText() {
  message
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
  message
    .confirm({
      title: '自定义按钮样式',
      msg: '可以自定义按钮的样式和类型',
      cancelButtonProps: {
        text: '取消',
        round: false,
        type: 'danger',
        customClass: 'custom-shadow'
      },
      confirmButtonProps: {
        text: '确定',
        round: false,
        type: 'success',
        customClass: 'custom-shadow'
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
  message.confirm({
    title: '版本更新',
    msg: '发现新版本，是否立即更新？',
    actionLayout: 'vertical',
    confirmButtonText: '立即更新',
    cancelButtonText: '稍后再说'
  })
}

function multipleActions() {
  message.show({
    title: '版本更新',
    msg: '发现新版本 v2.0.0',
    actionLayout: 'vertical',
    actions: [
      {
        text: '立即更新',
        block: true,
        type: 'primary'
      },
      {
        text: '稍后更新',
        type: 'info',
        block: true,
        variant: 'plain'
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

function hideButton() {
  message.show({
    title: '提示',
    msg: '这个弹窗只有一个按钮',
    confirmButtonProps: '知道了',
    cancelButtonProps: null
  })
}

// ==================== 5. 输入配置 ====================

function textareaInput() {
  message
    .prompt({
      title: '请输入反馈',
      textareaProps: {
        placeholder: '请输入您的意见或建议',
        maxlength: 50,
        showWordLimit: true
      }
    })
    .then((res) => {
      toast.success(`输入内容：${res.value}`)
    })
    .catch(() => {
      toast.info('取消输入')
    })
}

function inputValidation() {
  message
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

function inputWithIcon() {
  message
    .prompt({
      title: '验证成功',
      msg: '请输入您的姓名',
      icon: 'success',
      inputProps: {
        placeholder: '请输入姓名'
      }
    })
    .then((res) => {
      toast.success(`输入内容：${res.value}`)
    })
}

// ==================== 6. 交互功能 ====================

function withCloseButton() {
  message.confirm({
    title: '系统公告',
    msg: '系统将于今晚22:00进行维护升级',
    showClose: true
  })
}

function beforeConfirmHook() {
  message
    .confirm({
      title: '提示',
      msg: '是否删除？',
      beforeConfirm: ({ resolve }) => {
        toast.loading('删除中...')
        setTimeout(() => {
          toast.close()
          resolve(true)
          toast.success('删除成功')
        }, 2000)
      }
    })
    .catch(() => {})
}

// ==================== 7. 业务场景 ====================

function deleteConfirm() {
  message
    .confirm({
      title: '删除确认',
      msg: '确定要删除这条记录吗？删除后将无法恢复。',
      icon: 'warning',
      confirmButtonText: '确认删除',
      confirmButtonProps: {
        type: 'danger'
      },
      beforeConfirm: ({ resolve }) => {
        toast.loading('删除中...')
        setTimeout(() => {
          toast.close()
          resolve(true)
          toast.success('删除成功')
        }, 1500)
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
  message
    .confirm({
      title: '确认支付',
      msg: '您将支付 ¥99.00 元购买会员服务',
      icon: 'info',
      theme: 'text',
      actionLayout: 'vertical',
      confirmButtonText: '确认支付',
      cancelButtonText: '取消',
      beforeConfirm: ({ resolve }) => {
        toast.loading('支付中...')
        setTimeout(() => {
          toast.close()
          resolve(true)
          toast.success('支付成功')
        }, 2000)
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
  message
    .prompt({
      title: '提交申请',
      msg: '请输入申请理由（不少于10个字符）',
      icon: 'info',
      headerImage: blackMao,
      textareaProps: {
        placeholder: '请输入申请理由',
        maxlength: 100,
        showWordLimit: true
      },
      inputPattern: /.{10,}/,
      inputError: '申请理由不能少于10个字符',
      confirmButtonText: '提交申请',
      beforeConfirm: ({ resolve }) => {
        toast.loading('提交中...')
        setTimeout(() => {
          toast.close()
          resolve(true)
          toast.success('提交成功')
        }, 1500)
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
  message.show({
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
          // 跳转到反馈页面
        }
      },
      {
        text: '问题反馈',
        block: true,
        click: () => {
          toast.success('已选择：问题反馈')
          // 跳转到反馈页面
        }
      },
      {
        text: '其他',
        block: true,
        click: () => {
          toast.success('已选择：其他')
          // 跳转到反馈页面
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

function customSlot() {
  message1
    .confirm({
      title: '请为我们评分'
    })
    .then(() => {
      message.alert({
        title: '感谢评分',
        msg: `您的评分为 ${rate.value} 分`,
        icon: 'success'
      })
    })
    .catch(() => {})
}

function slotHeader() {
  message2
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
  message.show({
    title: '会员特权',
    msg: '开通会员即可享受专属特权',
    confirmButtonProps: '立即开通',
    cancelButtonProps: '暂不开通'
  })
}

function slotActions() {
  message.show({
    title: '支付方式',
    msg: '请选择支付方式完成购买',
    // 通过 actions 属性而非插槽实现多按钮
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
        text: '取消',
        block: true,
        click: () => {
          toast.info('取消')
        }
      }
    ]
  })
}
</script>
<style lang="scss" scoped>
.page-message-box {
  :deep() {
    .custom-shadow {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
  }
}
</style>
