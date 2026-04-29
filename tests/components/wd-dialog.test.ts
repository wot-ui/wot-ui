import { config, mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { describe, expect, test, vi } from 'vitest'
import WdDialog from '@/uni_modules/wot-ui/components/wd-dialog/wd-dialog.vue'
import WdIcon from '@/uni_modules/wot-ui/components/wd-icon/wd-icon.vue'
import { useDialog } from '@/uni_modules/wot-ui/components/wd-dialog'
import WdLoading from '@/uni_modules/wot-ui/components/wd-loading/wd-loading.vue'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
config.global.components = { WdIcon, WdLoading }

describe('WdDialog', () => {
  test('beforeConfirm 返回 false 时阻止确认', async () => {
    const wrapper = mount(WdDialog)
    const success = vi.fn()
    const beforeConfirm = vi.fn(() => false)

    ;(wrapper.vm as any).dialogState.show = true
    ;(wrapper.vm as any).dialogState.type = 'confirm'
    ;(wrapper.vm as any).dialogState.success = success
    ;(wrapper.vm as any).dialogState.beforeConfirm = beforeConfirm

    await (wrapper.vm as any).toggleModal('confirm')

    expect(beforeConfirm).toHaveBeenCalledWith('')
    expect(success).not.toHaveBeenCalled()
  })

  test('beforeConfirm 返回 Promise<true> 时通过确认', async () => {
    const wrapper = mount(WdDialog)
    const success = vi.fn()
    const beforeConfirm = vi.fn(() => Promise.resolve(true))

    ;(wrapper.vm as any).dialogState.show = true
    ;(wrapper.vm as any).dialogState.type = 'prompt'
    ;(wrapper.vm as any).dialogState.success = success
    ;(wrapper.vm as any).dialogState.beforeConfirm = beforeConfirm
    ;(wrapper.vm as any).inputVal = 'test'

    await (wrapper.vm as any).toggleModal('confirm')
    await nextTick()
    await sleep(0)

    expect(beforeConfirm).toHaveBeenCalledWith('test')
    expect(success).toHaveBeenCalledWith({ action: 'confirm', value: 'test' })
  })

  test('cancel 分支触发 fail 回调并关闭弹窗', async () => {
    const wrapper = mount(WdDialog)
    const fail = vi.fn()

    ;(wrapper.vm as any).dialogState.show = true
    ;(wrapper.vm as any).dialogState.type = 'confirm'
    ;(wrapper.vm as any).dialogState.fail = fail

    await (wrapper.vm as any).toggleModal('cancel')

    expect(fail).toHaveBeenCalledWith({ action: 'cancel' })
    expect((wrapper.vm as any).dialogState.show).toBe(false)
  })

  test('closeOnClickModal 为 false 时点击遮罩不关闭', async () => {
    const wrapper = mount(WdDialog)
    const fail = vi.fn()

    ;(wrapper.vm as any).dialogState.show = true
    ;(wrapper.vm as any).dialogState.closeOnClickModal = false
    ;(wrapper.vm as any).dialogState.fail = fail

    await (wrapper.vm as any).toggleModal('modal')

    expect(fail).not.toHaveBeenCalled()
    expect((wrapper.vm as any).dialogState.show).toBe(true)
  })

  test('closeOnClickModal 为 false 时 close 仍可关闭并返回 close action', async () => {
    const wrapper = mount(WdDialog)
    const fail = vi.fn()

    ;(wrapper.vm as any).dialogState.show = true
    ;(wrapper.vm as any).dialogState.showClose = true
    ;(wrapper.vm as any).dialogState.closeOnClickModal = false
    ;(wrapper.vm as any).dialogState.fail = fail

    await (wrapper.vm as any).toggleModal('close')

    expect(fail).toHaveBeenCalledWith({ action: 'close' })
    expect((wrapper.vm as any).dialogState.show).toBe(false)
  })

  test('closeOnClickModal 为 true 时点击遮罩触发 modal 关闭', async () => {
    const wrapper = mount(WdDialog)
    const fail = vi.fn()

    ;(wrapper.vm as any).dialogState.show = true
    ;(wrapper.vm as any).dialogState.closeOnClickModal = true
    ;(wrapper.vm as any).dialogState.fail = fail

    await (wrapper.vm as any).toggleModal('modal')

    expect(fail).toHaveBeenCalledWith({ action: 'modal' })
    expect((wrapper.vm as any).dialogState.show).toBe(false)
  })

  test('prompt 输入校验失败时阻止确认并显示错误', async () => {
    const wrapper = mount(WdDialog)
    const success = vi.fn()

    ;(wrapper.vm as any).dialogState.show = true
    ;(wrapper.vm as any).dialogState.type = 'prompt'
    ;(wrapper.vm as any).dialogState.success = success
    ;(wrapper.vm as any).dialogState.inputPattern = /^\d+$/
    ;(wrapper.vm as any).inputVal = 'abc'

    await (wrapper.vm as any).toggleModal('confirm')

    expect((wrapper.vm as any).dialogState.showErr).toBe(true)
    expect(success).not.toHaveBeenCalled()
    expect((wrapper.vm as any).dialogState.show).toBe(true)
  })

  test('beforeConfirm 返回 Promise<false> 时阻止确认', async () => {
    const wrapper = mount(WdDialog)
    const success = vi.fn()
    const beforeConfirm = vi.fn(() => Promise.resolve(false))

    ;(wrapper.vm as any).dialogState.show = true
    ;(wrapper.vm as any).dialogState.type = 'prompt'
    ;(wrapper.vm as any).dialogState.success = success
    ;(wrapper.vm as any).dialogState.beforeConfirm = beforeConfirm
    ;(wrapper.vm as any).inputVal = 'blocked'

    await (wrapper.vm as any).toggleModal('confirm')
    await nextTick()
    await sleep(0)

    expect(beforeConfirm).toHaveBeenCalledWith('blocked')
    expect(success).not.toHaveBeenCalled()
    expect((wrapper.vm as any).dialogState.show).toBe(true)
  })

  test('confirmButtonProps/cancelButtonProps 文案读取分支', () => {
    const wrapper = mount(WdDialog)

    ;(wrapper.vm as any).dialogState.confirmButtonProps = '提交'
    ;(wrapper.vm as any).dialogState.cancelButtonProps = { text: '返回' }

    expect((wrapper.vm as any).getConfirmText()).toBe('提交')
    expect((wrapper.vm as any).getCancelText()).toBe('返回')
  })

  test('自定义 actions 点击触发 click 与 success', async () => {
    const wrapper = mount(WdDialog)
    const success = vi.fn()
    const click = vi.fn()
    const action = { text: '自定义', click }

    ;(wrapper.vm as any).dialogState.show = true
    ;(wrapper.vm as any).dialogState.success = success
    ;(wrapper.vm as any).inputVal = 'action-value'

    await (wrapper.vm as any).handleAction(action, 0)

    expect(click).toHaveBeenCalled()
    expect(success).toHaveBeenCalledWith({ action: 'confirm', value: 'action-value' })
    expect((wrapper.vm as any).dialogState.show).toBe(false)
  })

  test('输入值清空时自动重置错误态', async () => {
    const wrapper = mount(WdDialog)

    ;(wrapper.vm as any).dialogState.showErr = true
    ;(wrapper.vm as any).inputVal = 'has-value'
    await nextTick()
    ;(wrapper.vm as any).inputVal = ''
    await nextTick()

    expect((wrapper.vm as any).dialogState.showErr).toBe(false)
  })

  test('openType 事件透传：actions 与 confirm 按钮配置', () => {
    const wrapper = mount(WdDialog)
    const onActionError = vi.fn()
    const onConfirmUserInfo = vi.fn()

    const action = { text: '自定义', onError: onActionError }
    ;(wrapper.vm as any).handleOpenTypeEvent(action, 'onError', { detail: { code: 500 } })
    ;(wrapper.vm as any).dialogState.confirmButtonProps = {
      text: '确认',
      onGetuserinfo: onConfirmUserInfo
    }
    ;(wrapper.vm as any).handleButtonOpenTypeEvent('confirm', 'onGetuserinfo', { detail: { nickName: 'test' } })

    expect(onActionError).toHaveBeenCalledWith({ detail: { code: 500 } })
    expect(onConfirmUserInfo).toHaveBeenCalledWith({ detail: { nickName: 'test' } })
  })

  test('theme=text 时按钮与 actions 强制 text 变体', () => {
    const wrapper = mount(WdDialog)

    ;(wrapper.vm as any).dialogState.theme = 'text'
    ;(wrapper.vm as any).dialogState.confirmButtonProps = { text: '确认', variant: 'filled' }
    ;(wrapper.vm as any).dialogState.cancelButtonProps = { text: '取消', variant: 'outlined' }
    ;(wrapper.vm as any).dialogState.actions = [{ text: '操作一' }, { text: '操作二', variant: 'filled' }]

    expect((wrapper.vm as any).customConfirmProps.variant).toBe('text')
    expect((wrapper.vm as any).customCancelProps.variant).toBe('text')
    expect((wrapper.vm as any).customActions[0].variant).toBe('text')
    expect((wrapper.vm as any).customActions[1].variant).toBe('text')
  })

  test('reset 时内置 icon 映射与 inputValue 优先级生效', () => {
    const wrapper = mount(WdDialog)

    ;(wrapper.vm as any).reset({
      title: '重置测试',
      show: true,
      closeOnClickModal: false,
      msg: '内容',
      type: 'prompt',
      inputValue: 'input-priority',
      inputProps: { modelValue: 'input-props' },
      textareaProps: { modelValue: 'textarea-props' },
      showErr: false,
      zIndex: 99,
      lazyRender: true,
      actionLayout: 'horizontal',
      theme: 'button',
      icon: 'success',
      iconProps: { color: '#00ff00' }
    })

    expect((wrapper.vm as any).inputVal).toBe('input-priority')
    expect((wrapper.vm as any).dialogState.iconProps.name).toBe('check-circle-fill')
    expect((wrapper.vm as any).iconTypeClass).toBe('is-success')
  })
})

const createUseDialogTestComponent = () => {
  return defineComponent({
    components: {
      WdDialog
    },
    template: '<div><wd-dialog /><wd-dialog selector="custom" /></div>',
    setup() {
      const dialog = useDialog()
      const customDialog = useDialog('custom')

      return {
        dialog,
        customDialog
      }
    }
  })
}

describe('useDialog', () => {
  test('show 在确认时 resolve，并回填到默认 selector 的 dialog 状态', async () => {
    const TestComponent = createUseDialogTestComponent()
    const wrapper = mount(TestComponent)
    const dialogWrapper = wrapper.findAllComponents(WdDialog)[0]
    const dialogVm = dialogWrapper.vm as any

    const pending = (wrapper.vm as any).dialog.show({ title: '标题', msg: '内容' })
    await nextTick()

    expect(dialogVm.dialogState.show).toBe(true)
    expect(dialogVm.dialogState.title).toBe('标题')
    expect(dialogVm.dialogState.msg).toBe('内容')

    await dialogVm.toggleModal('confirm')
    await expect(pending).resolves.toEqual({ action: 'confirm', value: '' })
  })

  test('show 在取消时 reject', async () => {
    const TestComponent = createUseDialogTestComponent()
    const wrapper = mount(TestComponent)
    const dialogWrapper = wrapper.findAllComponents(WdDialog)[0]
    const dialogVm = dialogWrapper.vm as any

    const pending = (wrapper.vm as any).dialog.show({ type: 'confirm', title: '二次确认' })
    await nextTick()

    await dialogVm.toggleModal('cancel')
    await expect(pending).rejects.toEqual({ action: 'cancel' })
  })

  test('confirm 默认显示取消按钮并支持快捷文案合并', async () => {
    const TestComponent = createUseDialogTestComponent()
    const wrapper = mount(TestComponent)
    const dialogWrapper = wrapper.findAllComponents(WdDialog)[0]
    const dialogVm = dialogWrapper.vm as any

    const pending = (wrapper.vm as any).dialog.confirm({
      title: '确认标题',
      confirmButtonText: '立即确认',
      cancelButtonText: '我再想想'
    })
    await nextTick()

    expect(dialogVm.dialogState.type).toBe('confirm')
    expect(dialogVm.dialogState.cancelButtonProps).toBe('我再想想')
    expect(dialogVm.getConfirmText()).toBe('立即确认')
    expect(dialogVm.getCancelText()).toBe('我再想想')

    await dialogVm.toggleModal('confirm')
    await expect(pending).resolves.toEqual({ action: 'confirm', value: '' })
  })

  test('prompt 透传输入值并在确认时返回 value', async () => {
    const TestComponent = createUseDialogTestComponent()
    const wrapper = mount(TestComponent)
    const dialogWrapper = wrapper.findAllComponents(WdDialog)[0]
    const dialogVm = dialogWrapper.vm as any

    const pending = (wrapper.vm as any).dialog.prompt({
      title: '请输入',
      inputValue: '初始值'
    })
    await nextTick()

    expect(dialogVm.dialogState.type).toBe('prompt')
    expect(dialogVm.inputVal).toBe('初始值')

    dialogVm.inputVal = '新值'
    await dialogVm.toggleModal('confirm')
    await expect(pending).resolves.toEqual({ action: 'confirm', value: '新值' })
  })

  test('close 可关闭指定 selector 的弹窗实例', async () => {
    const TestComponent = createUseDialogTestComponent()
    const wrapper = mount(TestComponent)
    const customDialogWrapper = wrapper.findAllComponents(WdDialog)[1]
    const customDialogVm = customDialogWrapper.vm as any

    ;(wrapper.vm as any).customDialog.alert('自定义弹窗')
    await nextTick()

    expect(customDialogVm.dialogState.show).toBe(true)
    ;(wrapper.vm as any).customDialog.close()
    await nextTick()
    expect(customDialogVm.dialogState.show).toBe(false)
  })

  test('alert 默认隐藏取消按钮（showCancelButton 默认分支）', async () => {
    const TestComponent = createUseDialogTestComponent()
    const wrapper = mount(TestComponent)
    const dialogWrapper = wrapper.findAllComponents(WdDialog)[0]
    const dialogVm = dialogWrapper.vm as any

    const pending = (wrapper.vm as any).dialog.alert('提示信息')
    await nextTick()

    expect(dialogVm.dialogState.type).toBe('alert')
    expect(dialogVm.dialogState.cancelButtonProps).toBeNull()

    await dialogVm.toggleModal('confirm')
    await expect(pending).resolves.toEqual({ action: 'confirm', value: '' })
  })

  test('confirm 默认显示取消按钮（showCancelButton 默认分支）', async () => {
    const TestComponent = createUseDialogTestComponent()
    const wrapper = mount(TestComponent)
    const dialogWrapper = wrapper.findAllComponents(WdDialog)[0]
    const dialogVm = dialogWrapper.vm as any

    const pending = (wrapper.vm as any).dialog.confirm({ title: '确认展示取消按钮' })
    await nextTick()

    expect(dialogVm.dialogState.cancelButtonProps).toEqual({})

    await dialogVm.toggleModal('confirm')
    await expect(pending).resolves.toEqual({ action: 'confirm', value: '' })
  })

  test('icon/iconColor 快捷属性归并并映射为内置 icon', async () => {
    const TestComponent = createUseDialogTestComponent()
    const wrapper = mount(TestComponent)
    const dialogWrapper = wrapper.findAllComponents(WdDialog)[0]
    const dialogVm = dialogWrapper.vm as any

    const pending = (wrapper.vm as any).dialog.alert({
      title: '图标测试',
      icon: 'warning',
      iconColor: '#ff9900'
    })
    await nextTick()

    expect(dialogVm.dialogState.iconProps.name).toBe('exclamation-circle-fill')
    expect(dialogVm.dialogState.iconProps.color).toBe('#ff9900')

    await dialogVm.toggleModal('confirm')
    await expect(pending).resolves.toEqual({ action: 'confirm', value: '' })
  })

  test('actions 与 confirmButtonProps 同时配置时触发 warning', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const TestComponent = createUseDialogTestComponent()
    const wrapper = mount(TestComponent)
    const dialogWrapper = wrapper.findAllComponents(WdDialog)[0]
    const dialogVm = dialogWrapper.vm as any

    const pending = (wrapper.vm as any).dialog.alert({
      title: '冲突配置',
      actions: [{ text: '动作' }],
      confirmButtonProps: '确认'
    })
    await nextTick()

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('actions 和 confirmButtonProps/cancelButtonProps 同时配置时'))

    await dialogVm.toggleModal('confirm')
    await expect(pending).resolves.toEqual({ action: 'confirm', value: '' })
    warnSpy.mockRestore()
  })
})
