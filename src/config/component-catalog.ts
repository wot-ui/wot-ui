export type CatalogLocale = 'zh-CN' | 'en-US'

type DocsComponentNavItem = {
  text: string
  link: string
}

type LocaleText = Record<CatalogLocale, string>

type CatalogCategoryId = 'basic' | 'navigation' | 'form' | 'feedback' | 'display' | 'composables'

interface DocsMeta {
  slug: string
  text: string
  available?: boolean
}

interface CatalogItem {
  id: string
  titleKey?: string
  docs: Record<CatalogLocale, DocsMeta>
}

interface CatalogCategory {
  id: CatalogCategoryId
  icon?: string
  appNameKey?: string
  appName?: LocaleText
  docsNavText: LocaleText
  docsSidebarText: LocaleText
  includeInApp?: boolean
  includeInDocsNav?: boolean
  items: CatalogItem[]
}

interface HomeCatalogParams {
  locale: string
  t: (key: string) => string
}

const appCategoryNames: Record<Extract<CatalogCategoryId, 'form'>, LocaleText> = {
  form: {
    'zh-CN': '录入',
    'en-US': 'Data Input'
  }
}

const categories: CatalogCategory[] = [
  {
    id: 'basic',
    icon: 'common',
    appNameKey: 'ji-chu',
    docsNavText: {
      'zh-CN': '基础',
      'en-US': 'Basic Components'
    },
    docsSidebarText: {
      'zh-CN': '基础',
      'en-US': 'Basic'
    },
    includeInApp: true,
    includeInDocsNav: true,
    items: [
      {
        id: 'button',
        titleKey: 'button-an-niu',
        docs: {
          'zh-CN': { slug: 'button', text: 'Button 按钮' },
          'en-US': { slug: 'button', text: 'Button' }
        }
      },
      {
        id: 'icon',
        titleKey: 'icon-tu-biao',
        docs: {
          'zh-CN': { slug: 'icon', text: 'Icon 图标' },
          'en-US': { slug: 'icon', text: 'Icon' }
        }
      },
      {
        id: 'text',
        titleKey: 'text-wen-ben',
        docs: {
          'zh-CN': { slug: 'text', text: 'Text 文本' },
          'en-US': { slug: 'text', text: 'Text' }
        }
      },
      {
        id: 'layout',
        titleKey: 'layout-bu-ju',
        docs: {
          'zh-CN': { slug: 'layout', text: 'Layout 布局' },
          'en-US': { slug: 'layout', text: 'Layout' }
        }
      },
      {
        id: 'cell',
        titleKey: 'cell-dan-yuan-ge',
        docs: {
          'zh-CN': { slug: 'cell', text: 'Cell 单元格' },
          'en-US': { slug: 'cell', text: 'Cell' }
        }
      },
      {
        id: 'fab',
        titleKey: 'fab-xuan-fu-an-niu',
        docs: {
          'zh-CN': { slug: 'fab', text: 'Fab 悬浮按钮' },
          'en-US': { slug: 'fab', text: 'Fab' }
        }
      },
      {
        id: 'transition',
        titleKey: 'transition-dong-hua',
        docs: {
          'zh-CN': { slug: 'transition', text: 'Transition 动画' },
          'en-US': { slug: 'transition', text: 'Transition' }
        }
      },
      {
        id: 'resize',
        titleKey: 'resize-jian-ting-yuan-su-chi-cun-bian-hua',
        docs: {
          'zh-CN': { slug: 'resize', text: 'Resize 监听元素尺寸变化' },
          'en-US': { slug: 'resize', text: 'Resize' }
        }
      },
      {
        id: 'configProvider',
        titleKey: 'configprovider-quan-ju-pei-zhi',
        docs: {
          'zh-CN': { slug: 'config-provider', text: 'ConfigProvider 全局配置' },
          'en-US': { slug: 'config-provider', text: 'ConfigProvider' }
        }
      },
      {
        id: 'rootPortal',
        titleKey: 'rootportal-title',
        docs: {
          'zh-CN': { slug: 'root-portal', text: 'RootPortal 根节点' },
          'en-US': { slug: 'root-portal', text: 'RootPortal' }
        }
      }
    ]
  },
  {
    id: 'navigation',
    icon: 'mind-mapping',
    appNameKey: 'dao-hang',
    docsNavText: {
      'zh-CN': '导航',
      'en-US': 'Navigation'
    },
    docsSidebarText: {
      'zh-CN': '导航',
      'en-US': 'Navigation'
    },
    includeInApp: true,
    includeInDocsNav: true,
    items: [
      {
        id: 'navbar',
        titleKey: 'navbar-dao-hang-lan',
        docs: {
          'zh-CN': { slug: 'navbar', text: 'Navbar 导航栏' },
          'en-US': { slug: 'navbar', text: 'Navbar' }
        }
      },
      {
        id: 'tabbar',
        titleKey: 'tabbar-biao-qian-lan',
        docs: {
          'zh-CN': { slug: 'tabbar', text: 'Tabbar 标签栏' },
          'en-US': { slug: 'tabbar', text: 'Tabbar' }
        }
      },
      {
        id: 'tabs',
        titleKey: 'tabs-biao-qian-ye',
        docs: {
          'zh-CN': { slug: 'tabs', text: 'Tabs 标签页' },
          'en-US': { slug: 'tabs', text: 'Tabs' }
        }
      },
      {
        id: 'segmented',
        titleKey: 'segmented-fen-duan-qi',
        docs: {
          'zh-CN': { slug: 'segmented', text: 'Segmented 分段器' },
          'en-US': { slug: 'segmented', text: 'Segmented' }
        }
      },
      {
        id: 'sidebar',
        titleKey: 'sidebar-ce-bian-lan',
        docs: {
          'zh-CN': { slug: 'sidebar', text: 'Sidebar 侧边栏' },
          'en-US': { slug: 'sidebar', text: 'Sidebar' }
        }
      },
      {
        id: 'pagination',
        titleKey: 'pagination-fen-ye',
        docs: {
          'zh-CN': { slug: 'pagination', text: 'Pagination 分页' },
          'en-US': { slug: 'pagination', text: 'Pagination' }
        }
      },
      {
        id: 'indexBar',
        titleKey: 'indexbar-suo-yin-lan',
        docs: {
          'zh-CN': { slug: 'index-bar', text: 'IndexBar 索引栏' },
          'en-US': { slug: 'index-bar', text: 'IndexBar' }
        }
      },
      {
        id: 'backtop',
        titleKey: 'backtop-hui-dao-ding-bu',
        docs: {
          'zh-CN': { slug: 'backtop', text: 'Backtop 回到顶部' },
          'en-US': { slug: 'backtop', text: 'Backtop' }
        }
      },
      {
        id: 'tour',
        titleKey: 'tour-title',
        docs: {
          'zh-CN': { slug: 'tour', text: 'Tour 漫游' },
          'en-US': { slug: 'tour', text: 'Tour' }
        }
      }
    ]
  },
  {
    id: 'form',
    icon: 'unordered-list',
    appName: appCategoryNames.form,
    docsNavText: {
      'zh-CN': '录入',
      'en-US': 'Data Input'
    },
    docsSidebarText: {
      'zh-CN': '录入',
      'en-US': 'Data Input'
    },
    includeInApp: true,
    includeInDocsNav: true,
    items: [
      {
        id: 'form',
        titleKey: 'form-biao-dan',
        docs: {
          'zh-CN': { slug: 'form', text: 'Form 表单' },
          'en-US': { slug: 'form', text: 'Form' }
        }
      },
      {
        id: 'input',
        titleKey: 'input-shu-ru-kuang',
        docs: {
          'zh-CN': { slug: 'input', text: 'Input 输入框' },
          'en-US': { slug: 'input', text: 'Input' }
        }
      },
      {
        id: 'textarea',
        titleKey: 'textarea-wen-ben-yu',
        docs: {
          'zh-CN': { slug: 'textarea', text: 'Textarea 文本域' },
          'en-US': { slug: 'textarea', text: 'Textarea' }
        }
      },
      {
        id: 'passwordInput',
        titleKey: 'passwordinput-mi-ma-shu-ru-kuang',
        docs: {
          'zh-CN': { slug: 'password-input', text: 'PasswordInput 密码输入框' },
          'en-US': { slug: 'password-input', text: 'PasswordInput' }
        }
      },
      {
        id: 'keyboard',
        titleKey: 'keyboard-xu-ni-jian-pan',
        docs: {
          'zh-CN': { slug: 'keyboard', text: 'Keyboard 虚拟键盘' },
          'en-US': { slug: 'keyboard', text: 'Keyboard' }
        }
      },
      {
        id: 'inputNumber',
        titleKey: 'inputnumber-ji-shu-qi',
        docs: {
          'zh-CN': { slug: 'input-number', text: 'InputNumber 计数器' },
          'en-US': { slug: 'input-number', text: 'InputNumber' }
        }
      },
      {
        id: 'search',
        titleKey: 'search-sou-suo',
        docs: {
          'zh-CN': { slug: 'search', text: 'Search 搜索框' },
          'en-US': { slug: 'search', text: 'Search' }
        }
      },
      {
        id: 'checkbox',
        titleKey: 'checkbox-fu-xuan-kuang',
        docs: {
          'zh-CN': { slug: 'checkbox', text: 'Checkbox 复选框' },
          'en-US': { slug: 'checkbox', text: 'Checkbox' }
        }
      },
      {
        id: 'radio',
        titleKey: 'radio-dan-xuan-kuang',
        docs: {
          'zh-CN': { slug: 'radio', text: 'Radio 单选框' },
          'en-US': { slug: 'radio', text: 'Radio' }
        }
      },
      {
        id: 'switch',
        titleKey: 'switch-kai-guan',
        docs: {
          'zh-CN': { slug: 'switch', text: 'Switch 开关' },
          'en-US': { slug: 'switch', text: 'Switch' }
        }
      },
      {
        id: 'rate',
        titleKey: 'rate-ping-fen',
        docs: {
          'zh-CN': { slug: 'rate', text: 'Rate 评分' },
          'en-US': { slug: 'rate', text: 'Rate' }
        }
      },
      {
        id: 'slider',
        titleKey: 'slider-hua-kuai',
        docs: {
          'zh-CN': { slug: 'slider', text: 'Slider 滑块' },
          'en-US': { slug: 'slider', text: 'Slider' }
        }
      },
      {
        id: 'picker',
        titleKey: 'picker-xuan-ze-qi',
        docs: {
          'zh-CN': { slug: 'picker', text: 'Picker 选择器' },
          'en-US': { slug: 'picker', text: 'Picker' }
        }
      },
      {
        id: 'pickerView',
        titleKey: 'pickerview-xuan-ze-qi-shi-tu',
        docs: {
          'zh-CN': { slug: 'picker-view', text: 'PickerView 选择器视图' },
          'en-US': { slug: 'picker-view', text: 'PickerView' }
        }
      },
      {
        id: 'selectPicker',
        titleKey: 'selectpicker-dan-fu-xuan-xuan-ze-qi',
        docs: {
          'zh-CN': { slug: 'select-picker', text: 'SelectPicker 单复选选择器' },
          'en-US': { slug: 'select-picker', text: 'SelectPicker' }
        }
      },
      {
        id: 'cascader',
        titleKey: 'colpicker-duo-lie-xuan-ze-qi',
        docs: {
          'zh-CN': { slug: 'cascader', text: 'Cascader 级联选择器' },
          'en-US': { slug: 'col-picker', text: 'ColPicker' }
        }
      },
      {
        id: 'calendar',
        titleKey: 'calendar-ri-li-xuan-ze-qi',
        docs: {
          'zh-CN': { slug: 'calendar', text: 'Calendar 日历选择器' },
          'en-US': { slug: 'calendar', text: 'Calendar' }
        }
      },
      {
        id: 'calendarView',
        titleKey: 'calendarview-ri-li-mian-ban',
        docs: {
          'zh-CN': { slug: 'calendar-view', text: 'CalendarView 日历面板' },
          'en-US': { slug: 'calendar-view', text: 'CalendarView' }
        }
      },
      {
        id: 'datetimePicker',
        titleKey: 'datetimepicker-shi-jian-xuan-ze-qi',
        docs: {
          'zh-CN': { slug: 'datetime-picker', text: 'DatetimePicker 时间选择器' },
          'en-US': { slug: 'datetime-picker', text: 'DatetimePicker' }
        }
      },
      {
        id: 'datetimePickerView',
        titleKey: 'datetimepickerview-shi-jian-xuan-ze-qi-shi-tu',
        docs: {
          'zh-CN': { slug: 'datetime-picker-view', text: 'DatetimePickerView 时间选择器视图' },
          'en-US': { slug: 'datetime-picker-view', text: 'DatetimePickerView' }
        }
      },
      {
        id: 'upload',
        titleKey: 'upload-shang-chuan',
        docs: {
          'zh-CN': { slug: 'upload', text: 'Upload 上传' },
          'en-US': { slug: 'upload', text: 'Upload' }
        }
      },
      {
        id: 'signature',
        titleKey: 'signature-qian-ming',
        docs: {
          'zh-CN': { slug: 'signature', text: 'Signature 签名' },
          'en-US': { slug: 'signature', text: 'Signature' }
        }
      },
      {
        id: 'slideVerify',
        titleKey: 'slide-verify-hua-dong-yan-zheng',
        docs: {
          'zh-CN': { slug: 'slide-verify', text: 'SlideVerify 滑动验证' },
          'en-US': { slug: 'slide-verify', text: 'SlideVerify' }
        }
      }
    ]
  },
  {
    id: 'feedback',
    icon: 'message',
    appNameKey: 'fan-kui',
    docsNavText: {
      'zh-CN': '反馈',
      'en-US': 'Feedback'
    },
    docsSidebarText: {
      'zh-CN': '反馈',
      'en-US': 'Feedback'
    },
    includeInApp: true,
    includeInDocsNav: true,
    items: [
      {
        id: 'popup',
        titleKey: 'popup-dan-chu-ceng',
        docs: {
          'zh-CN': { slug: 'popup', text: 'Popup 弹出层' },
          'en-US': { slug: 'popup', text: 'Popup' }
        }
      },
      {
        id: 'overlay',
        titleKey: 'overlay-zhe-zhao-ceng',
        docs: {
          'zh-CN': { slug: 'overlay', text: 'Overlay 遮罩层' },
          'en-US': { slug: 'overlay', text: 'Overlay' }
        }
      },
      {
        id: 'dialog',
        docs: {
          'zh-CN': { slug: 'dialog', text: 'Dialog 弹框' },
          'en-US': { slug: 'dialog', text: 'Dialog' }
        }
      },
      {
        id: 'actionSheet',
        titleKey: 'actionsheet-shang-la-cai-dan',
        docs: {
          'zh-CN': { slug: 'action-sheet', text: 'ActionSheet 动作面板' },
          'en-US': { slug: 'action-sheet', text: 'ActionSheet' }
        }
      },
      {
        id: 'dropMenu',
        titleKey: 'dropmenu-xia-la-cai-dan',
        docs: {
          'zh-CN': { slug: 'drop-menu', text: 'DropMenu 下拉菜单' },
          'en-US': { slug: 'drop-menu', text: 'DropMenu' }
        }
      },
      {
        id: 'popover',
        titleKey: 'popover-qi-pao',
        docs: {
          'zh-CN': { slug: 'popover', text: 'Popover 气泡' },
          'en-US': { slug: 'popover', text: 'Popover' }
        }
      },
      {
        id: 'tooltip',
        titleKey: 'tooltip-wen-zi-ti-shi',
        docs: {
          'zh-CN': { slug: 'tooltip', text: 'Tooltip 文字提示' },
          'en-US': { slug: 'tooltip', text: 'Tooltip' }
        }
      },
      {
        id: 'floatingPanel',
        titleKey: 'floatingpanel-fu-dong-mian-ban',
        docs: {
          'zh-CN': { slug: 'floating-panel', text: 'FloatingPanel 浮动面板' },
          'en-US': { slug: 'floating-panel', text: 'FloatingPanel' }
        }
      },
      {
        id: 'loading',
        titleKey: 'loading-jia-zai-zhi-shi-qi',
        docs: {
          'zh-CN': { slug: 'loading', text: 'Loading 加载' },
          'en-US': { slug: 'loading', text: 'Loading' }
        }
      },
      {
        id: 'progress',
        titleKey: 'progress-jin-du-tiao',
        docs: {
          'zh-CN': { slug: 'progress', text: 'Progress 进度条' },
          'en-US': { slug: 'progress', text: 'Progress' }
        }
      },
      {
        id: 'circle',
        titleKey: 'circle-huan-xing-jin-du-tiao',
        docs: {
          'zh-CN': { slug: 'circle', text: 'Circle 环形进度条' },
          'en-US': { slug: 'circle', text: 'Circle' }
        }
      },
      {
        id: 'toast',
        titleKey: 'toast-qing-ti-shi',
        docs: {
          'zh-CN': { slug: 'toast', text: 'Toast 轻提示' },
          'en-US': { slug: 'toast', text: 'Toast' }
        }
      },
      {
        id: 'notify',
        titleKey: 'notify-xiao-xi-tong-zhi',
        docs: {
          'zh-CN': { slug: 'notify', text: 'Notify 消息通知' },
          'en-US': { slug: 'notify', text: 'Notify' }
        }
      },
      {
        id: 'noticeBar',
        titleKey: 'noticebar-tong-zhi-lan',
        docs: {
          'zh-CN': { slug: 'notice-bar', text: 'NoticeBar 通知栏' },
          'en-US': { slug: 'notice-bar', text: 'NoticeBar' }
        }
      },
      {
        id: 'swipeAction',
        titleKey: 'swipeaction-hua-dong-cao-zuo',
        docs: {
          'zh-CN': { slug: 'swipe-action', text: 'SwipeAction 滑动操作' },
          'en-US': { slug: 'swipe-action', text: 'SwipeAction' }
        }
      },
      {
        id: 'sortButton',
        titleKey: 'sortbutton-pai-xu-an-niu',
        docs: {
          'zh-CN': { slug: 'sort-button', text: 'SortButton 排序按钮' },
          'en-US': { slug: 'sort-button', text: 'SortButton' }
        }
      },
      {
        id: 'empty',
        titleKey: 'empty-que-sheng-ti-shi',
        docs: {
          'zh-CN': { slug: 'empty', text: 'Empty 缺省提示' },
          'en-US': { slug: 'empty', text: 'Empty' }
        }
      },
      {
        id: 'countDown',
        titleKey: 'countdown-dao-ji-shi',
        docs: {
          'zh-CN': { slug: 'count-down', text: 'CountDown 倒计时' },
          'en-US': { slug: 'count-down', text: 'CountDown' }
        }
      },
      {
        id: 'countTo',
        titleKey: 'countto-shu-zi-gun-dong',
        docs: {
          'zh-CN': { slug: 'count-to', text: 'CountTo 数字滚动' },
          'en-US': { slug: 'count-to', text: 'CountTo' }
        }
      }
    ]
  },
  {
    id: 'display',
    icon: 'image',
    appNameKey: 'shu-ju-zhan-shi',
    docsNavText: {
      'zh-CN': '展示',
      'en-US': 'Data Display'
    },
    docsSidebarText: {
      'zh-CN': '展示',
      'en-US': 'Data Display'
    },
    includeInApp: true,
    includeInDocsNav: true,
    items: [
      {
        id: 'avatar',
        titleKey: 'avatar-tou-xiang',
        docs: {
          'zh-CN': { slug: 'avatar', text: 'Avatar 头像' },
          'en-US': { slug: 'avatar', text: 'Avatar' }
        }
      },
      {
        id: 'badge',
        titleKey: 'badge-hui-biao',
        docs: {
          'zh-CN': { slug: 'badge', text: 'Badge 徽标' },
          'en-US': { slug: 'badge', text: 'Badge' }
        }
      },
      {
        id: 'tag',
        titleKey: 'tag-biao-qian',
        docs: {
          'zh-CN': { slug: 'tag', text: 'Tag 标签' },
          'en-US': { slug: 'tag', text: 'Tag' }
        }
      },
      {
        id: 'card',
        titleKey: 'card-ka-pian',
        docs: {
          'zh-CN': { slug: 'card', text: 'Card 卡片' },
          'en-US': { slug: 'card', text: 'Card' }
        }
      },
      {
        id: 'divider',
        titleKey: 'divider-fen-ge-xian',
        docs: {
          'zh-CN': { slug: 'divider', text: 'Divider 分割线' },
          'en-US': { slug: 'divider', text: 'Divider' }
        }
      },
      {
        id: 'gap',
        titleKey: 'gap-jian-ge-cao',
        docs: {
          'zh-CN': { slug: 'gap', text: 'Gap 间隔槽' },
          'en-US': { slug: 'gap', text: 'Gap' }
        }
      },
      {
        id: 'grid',
        titleKey: 'grid-gong-ge',
        docs: {
          'zh-CN': { slug: 'grid', text: 'Grid 宫格' },
          'en-US': { slug: 'grid', text: 'Grid' }
        }
      },
      {
        id: 'collapse',
        titleKey: 'collapse-zhe-die-mian-ban',
        docs: {
          'zh-CN': { slug: 'collapse', text: 'Collapse 折叠面板' },
          'en-US': { slug: 'collapse', text: 'Collapse' }
        }
      },
      {
        id: 'steps',
        titleKey: 'steps-bu-zhou-tiao',
        docs: {
          'zh-CN': { slug: 'steps', text: 'Steps 步骤条' },
          'en-US': { slug: 'steps', text: 'Steps' }
        }
      },
      {
        id: 'sticky',
        titleKey: 'sticky-xi-ding-bu-ju',
        docs: {
          'zh-CN': { slug: 'sticky', text: 'Sticky 粘性布局' },
          'en-US': { slug: 'sticky', text: 'Sticky' }
        }
      },
      {
        id: 'skeleton',
        titleKey: 'skeleton-gu-jia-ping',
        docs: {
          'zh-CN': { slug: 'skeleton', text: 'Skeleton 骨架屏' },
          'en-US': { slug: 'skeleton', text: 'Skeleton' }
        }
      },
      {
        id: 'loadmore',
        titleKey: 'loadmore-jia-zai-geng-duo',
        docs: {
          'zh-CN': { slug: 'loadmore', text: 'Loadmore 加载更多' },
          'en-US': { slug: 'loadmore', text: 'Loadmore' }
        }
      },
      {
        id: 'img',
        titleKey: 'img-tu-pian',
        docs: {
          'zh-CN': { slug: 'img', text: 'Img 图片' },
          'en-US': { slug: 'img', text: 'Img' }
        }
      },
      {
        id: 'imagePreview',
        docs: {
          'zh-CN': { slug: 'image-preview', text: 'ImagePreview 图片预览' },
          'en-US': { slug: 'image-preview', text: 'ImagePreview' }
        }
      },
      {
        id: 'videoPreview',
        docs: {
          'zh-CN': { slug: 'video-preview', text: 'VideoPreview 视频预览' },
          'en-US': { slug: 'video-preview', text: 'VideoPreview' }
        }
      },
      {
        id: 'imgCropper',
        titleKey: 'imgcropper-tu-pian-cai-jian',
        docs: {
          'zh-CN': { slug: 'img-cropper', text: 'ImgCropper 图片裁剪' },
          'en-US': { slug: 'img-cropper', text: 'ImgCropper' }
        }
      },
      {
        id: 'swiper',
        titleKey: 'swiper-lun-bo-tu',
        docs: {
          'zh-CN': { slug: 'swiper', text: 'Swiper 轮播图' },
          'en-US': { slug: 'swiper', text: 'Swiper' }
        }
      },
      {
        id: 'table',
        titleKey: 'table-biao-ge',
        docs: {
          'zh-CN': { slug: 'table', text: 'Table 表格' },
          'en-US': { slug: 'table', text: 'Table' }
        }
      },
      {
        id: 'watermark',
        titleKey: 'watermark-shui-yin',
        docs: {
          'zh-CN': { slug: 'watermark', text: 'Watermark 水印' },
          'en-US': { slug: 'watermark', text: 'Watermark' }
        }
      },
      {
        id: 'qrCode',
        titleKey: 'qrcode-er-wei-ma',
        docs: {
          'zh-CN': { slug: 'qr-code', text: 'QRCode 二维码' },
          'en-US': { slug: 'qr-code', text: 'QRCode' }
        }
      },
      {
        id: 'curtain',
        titleKey: 'curtain-mu-lian',
        docs: {
          'zh-CN': { slug: 'curtain', text: 'Curtain 幕帘' },
          'en-US': { slug: 'curtain', text: 'Curtain' }
        }
      }
    ]
  },
  {
    id: 'composables',
    docsNavText: {
      'zh-CN': '组合式API',
      'en-US': 'Composables'
    },
    docsSidebarText: {
      'zh-CN': '组合式API',
      'en-US': 'Composables'
    },
    includeInApp: false,
    includeInDocsNav: false,
    items: [
      {
        id: 'useUpload',
        docs: {
          'zh-CN': { slug: 'use-upload', text: 'useUpload' },
          'en-US': { slug: 'use-upload', text: 'useUpload' }
        }
      },
      {
        id: 'useCountDown',
        docs: {
          'zh-CN': { slug: 'use-count-down', text: 'useCountDown' },
          'en-US': { slug: 'use-count-down', text: 'useCountDown' }
        }
      },
      {
        id: 'useToast',
        docs: {
          'zh-CN': { slug: 'use-toast', text: 'useToast' },
          'en-US': { slug: 'use-toast', text: 'useToast' }
        }
      },
      {
        id: 'useDialog',
        docs: {
          'zh-CN': { slug: 'use-dialog', text: 'useDialog' },
          'en-US': { slug: 'use-dialog', text: 'useDialog' }
        }
      },
      {
        id: 'useImagePreview',
        docs: {
          'zh-CN': { slug: 'use-image-preview', text: 'useImagePreview' },
          'en-US': { slug: 'use-image-preview', text: 'useImagePreview', available: false }
        }
      },
      {
        id: 'useVideoPreview',
        docs: {
          'zh-CN': { slug: 'use-video-preview', text: 'useVideoPreview' },
          'en-US': { slug: 'use-video-preview', text: 'useVideoPreview' }
        }
      },
      {
        id: 'useConfigProvider',
        docs: {
          'zh-CN': { slug: 'use-config-provider', text: 'useConfigProvider' },
          'en-US': { slug: 'use-config-provider', text: 'useConfigProvider' }
        }
      }
    ]
  }
]

function normalizeLocale(locale: string): CatalogLocale {
  return locale === 'en-US' ? 'en-US' : 'zh-CN'
}

function getCategoryAppName(category: CatalogCategory, locale: CatalogLocale, t: (key: string) => string) {
  if (category.appNameKey) {
    return t(category.appNameKey)
  }

  return category.appName?.[locale] ?? category.docsSidebarText[locale]
}

function isDocsItemAvailable(item: CatalogItem, locale: CatalogLocale) {
  return item.docs[locale].available !== false
}

function getDocsPathPrefix(locale: CatalogLocale) {
  return locale === 'en-US' ? '/en-US/component/' : '/component/'
}

function getDocsLink(locale: CatalogLocale, item: CatalogItem) {
  return `${getDocsPathPrefix(locale)}${item.docs[locale].slug}`
}

export function getHomeCatalog({ locale, t }: HomeCatalogParams) {
  const normalizedLocale = normalizeLocale(locale)

  return categories
    .filter((category) => category.includeInApp)
    .map((category) => ({
      id: category.id,
      name: getCategoryAppName(category, normalizedLocale, t),
      icon: category.icon ?? '',
      pages: category.items.map((item) => ({
        id: item.id,
        name: item.titleKey ? t(item.titleKey) : item.docs[normalizedLocale].text
      }))
    }))
}

export function getDocsComponentNavItems(locale: CatalogLocale): DocsComponentNavItem[] {
  return categories
    .filter((category) => category.includeInDocsNav)
    .map((category) => {
      const firstItem = category.items.find((item) => isDocsItemAvailable(item, locale))

      if (!firstItem) {
        return null
      }

      return {
        text: category.docsNavText[locale],
        link: getDocsLink(locale, firstItem)
      }
    })
    .filter((item): item is DocsComponentNavItem => item !== null)
}

export function getDocsComponentSidebar(locale: CatalogLocale) {
  return categories.map((category) => ({
    text: category.docsSidebarText[locale],
    collapsed: false,
    items: category.items
      .filter((item) => isDocsItemAvailable(item, locale))
      .map((item) => ({
        link: getDocsLink(locale, item),
        text: item.docs[locale].text
      }))
  }))
}
