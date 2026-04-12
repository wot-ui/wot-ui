import type { ExtractPropTypes, PropType, InjectionKey, ComputedRef } from 'vue'
import { makeStringProp, baseProps } from '../../common/props'

export const configProviderProps = {
  ...baseProps,
  /**
   * 主题风格，设置为 dark 来开启深色模式，全局生效
   */
  theme: makeStringProp('light'),
  /**
   * 自定义主题变量
   */
  themeVars: {
    type: Object as PropType<ConfigProviderThemeVars>,
    default: () => ({})
  }
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type ConfigProviderProvide = {
  themeStyle: ComputedRef<string>
}

export const CONFIG_PROVIDER_KEY: InjectionKey<ConfigProviderProvide> = Symbol('wd-config-provider')

export type baseThemeVars = {
  baseBlack?: string
  baseTransparent?: string
  baseWhite?: string
  blue1?: string
  blue10?: string
  blue2?: string
  blue3?: string
  blue4?: string
  blue5?: string
  blue6?: string
  blue7?: string
  blue8?: string
  blue9?: string
  blueOpac?: string
  borderExtraStrong?: string
  borderLight?: string
  borderMain?: string
  borderStrong?: string
  borderWhite?: string
  borderZero?: string
  classifyapplicationCyanBackground?: string
  classifyapplicationCyanBorder?: string
  classifyapplicationCyanContent?: string
  classifyapplicationGrapeBackground?: string
  classifyapplicationGrapeBorder?: string
  classifyapplicationGrapeContent?: string
  classifyapplicationPinkBackground?: string
  classifyapplicationPinkBorder?: string
  classifyapplicationPinkContent?: string
  classifyapplicationPurpleBackground?: string
  classifyapplicationPurpleBorder?: string
  classifyapplicationPurpleContent?: string
  classifyapplicationYellowBackground?: string
  classifyapplicationYellowBorder?: string
  classifyapplicationYellowContent?: string
  coolgrey1?: string
  coolgrey10?: string
  coolgrey2?: string
  coolgrey3?: string
  coolgrey4?: string
  coolgrey5?: string
  coolgrey6?: string
  coolgrey7?: string
  coolgrey8?: string
  coolgrey9?: string
  cyan1?: string
  cyan10?: string
  cyan2?: string
  cyan3?: string
  cyan4?: string
  cyan5?: string
  cyan6?: string
  cyan7?: string
  cyan8?: string
  cyan9?: string
  cyanOpac?: string
  dangerClicked?: string
  dangerDisabled?: string
  dangerHover?: string
  dangerMain?: string
  dangerParticular?: string
  dangerSurface?: string
  dividerLight?: string
  dividerMain?: string
  dividerStrong?: string
  dividerWhite?: string
  feedbackAccent?: string
  feedbackActive?: string
  feedbackHover?: string
  filledBottom?: string
  filledContent?: string
  filledExtraStrong?: string
  filledOppo?: string
  filledStrong?: string
  filledZero?: string
  fontWeightBold?: string
  fontWeightLight?: string
  fontWeightMedium?: string
  fontWeightRegular?: string
  fontWeightSemibold?: string
  fontWeightUltraLight?: string
  grape1?: string
  grape10?: string
  grape2?: string
  grape3?: string
  grape4?: string
  grape5?: string
  grape6?: string
  grape7?: string
  grape8?: string
  grape9?: string
  grapeOpac?: string
  green1?: string
  green10?: string
  green2?: string
  green3?: string
  green4?: string
  green5?: string
  green6?: string
  green7?: string
  green8?: string
  green9?: string
  greenOpac?: string
  iconAuxiliary?: string
  iconDisabled?: string
  iconMain?: string
  iconPlaceholder?: string
  iconSecondary?: string
  iconWhite?: string
  lightblue1?: string
  lightblue10?: string
  lightblue2?: string
  lightblue3?: string
  lightblue4?: string
  lightblue5?: string
  lightblue6?: string
  lightblue7?: string
  lightblue8?: string
  lightblue9?: string
  lightblueOpac?: string
  n0?: string
  n05?: string
  n1?: string
  n10?: string
  n11?: string
  n12?: string
  n14?: string
  n15?: string
  n16?: string
  n17?: string
  n18?: string
  n2?: string
  n20?: string
  n22?: string
  n24?: string
  n248?: string
  n26?: string
  n28?: string
  n3?: string
  n32?: string
  n34?: string
  n36?: string
  n375?: string
  n4?: string
  n40?: string
  n44?: string
  n48?: string
  n5?: string
  n50?: string
  n52?: string
  n56?: string
  n6?: string
  n60?: string
  n64?: string
  n8?: string
  n88?: string
  n9?: string
  n98?: string
  neutralgrey1?: string
  neutralgrey10?: string
  neutralgrey2?: string
  neutralgrey3?: string
  neutralgrey4?: string
  neutralgrey5?: string
  neutralgrey6?: string
  neutralgrey7?: string
  neutralgrey8?: string
  neutralgrey9?: string
  nFull?: string
  opac1_02?: string
  opac10_85?: string
  opac2_04?: string
  opac3_08?: string
  opac4_15?: string
  opac5_20?: string
  opac6_30?: string
  opac7_45?: string
  opac7_55?: string
  opac8_65?: string
  opac9_75?: string
  opacfilledLightCover?: string
  opacfilledMainCover?: string
  opacfilledTooltipToastCover?: string
  opacityBackdrop?: string
  opacityDimmer?: string
  opacityDisabled?: string
  opacityMain?: string
  opacityOverlay?: string
  opacwhite1_02?: string
  opacwhite10_85?: string
  opacwhite2_04?: string
  opacwhite3_08?: string
  opacwhite4_15?: string
  opacwhite5_20?: string
  opacwhite6_30?: string
  opacwhite7_45?: string
  opacwhite7_55?: string
  opacwhite8_65?: string
  opacwhite9_75?: string
  orange1?: string
  orange10?: string
  orange2?: string
  orange3?: string
  orange4?: string
  orange5?: string
  orange6?: string
  orange7?: string
  orange8?: string
  orange9?: string
  orangeOpac?: string
  paddingExtraLoose?: string
  paddingExtraSpacious?: string
  paddingExtraTight?: string
  paddingLoose?: string
  paddingMain?: string
  paddingSpacious?: string
  paddingSuperLoose?: string
  paddingSuperSpacious?: string
  paddingSuperTight?: string
  paddingTight?: string
  paddingUltraLoose?: string
  paddingUltraSpacious?: string
  paddingUltraTight?: string
  paddingZero?: string
  pink1?: string
  pink10?: string
  pink2?: string
  pink3?: string
  pink4?: string
  pink5?: string
  pink6?: string
  pink7?: string
  pink8?: string
  pink9?: string
  pinkOpac?: string
  primary1?: string
  primary10?: string
  primary2?: string
  primary3?: string
  primary4?: string
  primary5?: string
  primary6?: string
  primary7?: string
  primary8?: string
  primary9?: string
  purple1?: string
  purple10?: string
  purple2?: string
  purple3?: string
  purple4?: string
  purple5?: string
  purple6?: string
  purple7?: string
  purple8?: string
  purple9?: string
  purpleOpac?: string
  radiusExtraLarge?: string
  radiusLarge?: string
  radiusMain?: string
  radiusRadiusFull?: string
  radiusSmall?: string
  radiusSuperLarge?: string
  radiusUltraLarge?: string
  radiusZero?: string
  red1?: string
  red10?: string
  red2?: string
  red3?: string
  red4?: string
  red5?: string
  red6?: string
  red7?: string
  red8?: string
  red9?: string
  redOpac?: string
  spacingExtraLoose?: string
  spacingExtraSpacious?: string
  spacingExtraTight?: string
  spacingLoose?: string
  spacingMain?: string
  spacingSpacious?: string
  spacingSuperLoose?: string
  spacingSuperSpacious?: string
  spacingSuperTight?: string
  spacingTight?: string
  spacingUltraLoose?: string
  spacingUltraSpacious?: string
  spacingUltraTight?: string
  spacingZero?: string
  strokeBold?: string
  strokeLight?: string
  strokeMain?: string
  strokeZero?: string
  successClicked?: string
  successDisabled?: string
  successHover?: string
  successMain?: string
  successParticular?: string
  successSurface?: string
  textAuxiliary?: string
  textDisabled?: string
  textMain?: string
  textPlaceholder?: string
  textSecondary?: string
  textWhite?: string
  typographyBodyFontFamily?: string
  typographyBodyFontWeightExtraStrong?: string
  typographyBodyFontWeightMain?: string
  typographyBodyFontWeightStrong?: string
  typographyBodyLineHeightSizeExtraLarge?: string
  typographyBodyLineHeightSizeLarge?: string
  typographyBodyLineHeightSizeMain?: string
  typographyBodyLineHeightSizeSuperLarge?: string
  typographyBodyLineHeightSizeUltraLarge?: string
  typographyBodySizeExtraLarge?: string
  typographyBodySizeLarge?: string
  typographyBodySizeMain?: string
  typographyBodySizeSuperLarge?: string
  typographyBodySizeUltraLarge?: string
  typographyLabelFontFamily?: string
  typographyLabelFontWeightMain?: string
  typographyLabelFontWeightStrong?: string
  typographyLabelLineHeightSizeExtraSmall?: string
  typographyLabelLineHeightSizeLarge?: string
  typographyLabelLineHeightSizeMain?: string
  typographyLabelLineHeightSizeSmall?: string
  typographyLabelLineHeightSizeSuperSmall?: string
  typographyLabelSizeExtraSmall?: string
  typographyLabelSizeLarge?: string
  typographyLabelSizeMain?: string
  typographyLabelSizeSmall?: string
  typographyLabelSizeSuperSmall?: string
  typographyTitleFontFamily?: string
  typographyTitleFontWeightLight?: string
  typographyTitleFontWeightMain?: string
  typographyTitleFontWeightStrong?: string
  typographyTitleLineHeightSizeExtraLarge?: string
  typographyTitleLineHeightSizeLarge?: string
  typographyTitleLineHeightSizeMain?: string
  typographyTitleSizeExtraLarge?: string
  typographyTitleSizeLarge?: string
  typographyTitleSizeMain?: string
  volcano1?: string
  volcano10?: string
  volcano2?: string
  volcano3?: string
  volcano4?: string
  volcano5?: string
  volcano6?: string
  volcano7?: string
  volcano8?: string
  volcano9?: string
  volcanoOpac?: string
  warmgrey1?: string
  warmgrey10?: string
  warmgrey2?: string
  warmgrey3?: string
  warmgrey4?: string
  warmgrey5?: string
  warmgrey6?: string
  warmgrey7?: string
  warmgrey8?: string
  warmgrey9?: string
  warningClicked?: string
  warningDisabled?: string
  warningHover?: string
  warningMain?: string
  warningParticular?: string
  warningSurface?: string
  yellow1?: string
  yellow10?: string
  yellow2?: string
  yellow3?: string
  yellow4?: string
  yellow5?: string
  yellow6?: string
  yellow7?: string
  yellow8?: string
  yellow9?: string
  yellowOpac?: string
}

export type actionSheetThemeVars = {
  actionSheetActionBg?: string // 操作项背景色
  actionSheetActionColor?: string // 操作项文字颜色
  actionSheetActionFontSize?: string // 操作项字体大小
  actionSheetActionLineHeight?: string // 操作项行高
  actionSheetActionPadding?: string // 操作项内边距
  actionSheetActiveBg?: string // 激活态背景色
  actionSheetBg?: string // 底部弹层背景色
  actionSheetCancelBg?: string // 取消按钮背景色
  actionSheetCancelColor?: string // 取消按钮文字颜色
  actionSheetCancelFontSize?: string // 取消按钮字体大小
  actionSheetCancelLineHeight?: string // 取消按钮行高
  actionSheetCancelPadding?: string // 取消按钮内边距
  actionSheetCloseColor?: string // 关闭图标颜色
  actionSheetCloseFontSize?: string // 关闭图标尺寸
  actionSheetCloseRight?: string // 关闭图标右侧偏移
  actionSheetDescriptionColor?: string // 描述文本颜色
  actionSheetDescriptionFontSize?: string // 描述文本字体大小
  actionSheetDescriptionLineHeight?: string // 描述文本行高
  actionSheetDescriptionMarginTop?: string // 描述文本顶部外边距
  actionSheetDisabledColor?: string // 禁用态文字颜色
  actionSheetGapBg?: string // 取消按钮与操作项的间隔背景色
  actionSheetGapHeight?: string // 取消按钮顶部外边距
  actionSheetLoadingSize?: string // 加载图标尺寸
  actionSheetPanelBg?: string // 面板区域背景色
  actionSheetPanelImgRadius?: string // 面板图片圆角
  actionSheetPanelImgSize?: string // 面板图片尺寸
  actionSheetPanelImgSpacing?: string // 面板图片外边距
  actionSheetPanelPadding?: string // 单个面板内边距
  actionSheetPanelsPadding?: string // 面板列表内边距
  actionSheetPanelsWrapPadding?: string // 面板容器内边距
  actionSheetPanelTitleColor?: string // 面板标题颜色
  actionSheetPanelTitleFontSize?: string // 面板标题字体大小
  actionSheetPanelTitleLineHeight?: string // 面板标题行高
  actionSheetPanelWidth?: string // 单个面板宽度
  actionSheetRadius?: string // 底部弹层圆角
  actionSheetTitleBg?: string // 标题背景色
  actionSheetTitleColor?: string // 标题文字颜色
  actionSheetTitleFontSize?: string // 标题字体大小
  actionSheetTitleFontWeight?: string // 标题字重
  actionSheetTitleHeight?: string // 标题区域高度
  actionSheetTitleLineHeight?: string // 标题行高
}

export type avatarThemeVars = {
  avatarBg?: string // 头像背景颜色
  avatarBorderRadius?: string // 默认圆角
  avatarBorderRadiusFull?: string // 全圆角
  avatarColor?: string // 文本颜色
  avatarFontSize?: string // 默认文字字号
  avatarFontSizeLarge?: string // 大尺寸文字字号
  avatarFontSizeMedium?: string // 中尺寸文字字号
  avatarFontSizeSmall?: string // 小尺寸文字字号
  avatarFontWeight?: string // 头像文字字重
  avatarIconColor?: string // 图标颜色
  avatarLineHeight?: string // 默认文字行高
  avatarLineHeightLarge?: string // 大尺寸文字行高
  avatarLineHeightMedium?: string // 中尺寸文字行高
  avatarLineHeightSmall?: string // 小尺寸文字行高
  avatarOverlap?: string // 头像重叠距离
  avatarSizeLarge?: string // 大尺寸
  avatarSizeMedium?: string // 中尺寸
  avatarSizeNormal?: string // 默认尺寸
  avatarSizeSmall?: string // 小尺寸
  avatarTextColor?: string // 头像文字颜色
}

export type backtopThemeVars = {
  backtopBg?: string // 背景色
  backtopBorderColor?: string // 边框颜色
  backtopColor?: string // 按钮图标颜色
  backtopHeight?: string // 按钮高度
  backtopIconSize?: string // 按钮图标尺寸
  backtopRadius?: string // 方形模式圆角
  backtopRadiusCircle?: string // 圆形模式圆角
  backtopTextColor?: string // 文本颜色
  backtopTextFontSize?: string // 文本字号
  backtopTextLineHeight?: string // 文本行高
  backtopWidth?: string // 按钮宽度
  backtopZIndex?: string // 组件层级
}

export type badgeThemeVars = {
  badgeBorderColor?: string // 徽标边框颜色
  badgeBorderRadius?: string // 默认圆角
  badgeBubbleBorderRadius?: string // 气泡圆角
  badgeColor?: string // 徽标文本颜色
  badgeDangerBg?: string // 危险类型背景色
  badgeDotSize?: string // 圆点尺寸
  badgeFontSize?: string // 徽标文本字号
  badgeFontWeight?: string // 徽标文本字重
  badgeHeight?: string // 徽标高度
  badgeInfoBg?: string // 信息类型背景色
  badgeInfoColor?: string // 信息类型文本颜色
  badgeLineHeight?: string // 徽标文本行高
  badgeMinWidth?: string // 徽标最小宽度
  badgePadding?: string // 徽标内边距
  badgePrimaryBg?: string // 主类型背景色
  badgeSquareBorderRadius?: string // 方形圆角
  badgeSuccessBg?: string // 成功类型背景色
  badgeTransform?: string // 固定定位偏移
  badgeWarningBg?: string // 警告类型背景色
}

export type buttonThemeVars = {
  buttonDangerBg?: string // 危险类型背景色
  buttonDangerBgActive?: string // 危险类型背景激活色
  buttonDangerColor?: string // 危险类型文本色
  buttonDangerColorActive?: string // 危险类型文本激活色
  buttonDangerPlainBg?: string // 危险类型 plain 背景色
  buttonDangerPlainBgActive?: string // 危险类型 plain 背景激活色
  buttonDangerPlainBorder?: string // 危险类型 plain 边框色
  buttonDangerPlainBorderActive?: string // 危险类型 plain 边框激活色
  buttonDangerSoftBg?: string // 危险类型 soft 背景色
  buttonDangerSoftBgActive?: string // 危险类型 soft 背景激活色
  buttonDisabled?: string // 禁用态透明度
  buttonFontSizeLarge?: string // large 尺寸文字字号
  buttonFontSizeMedium?: string // medium 尺寸文字字号
  buttonFontSizeMini?: string // mini 尺寸文字字号
  buttonFontSizeSmall?: string // small 尺寸文字字号
  buttonInfoBg?: string // 信息类型背景色
  buttonInfoBgActive?: string // 信息类型背景激活色
  buttonInfoColor?: string // 信息类型文本色
  buttonInfoColorActive?: string // 信息类型文本激活色
  buttonInfoPlainBg?: string // 信息类型 plain 背景色
  buttonInfoPlainBgActive?: string // 信息类型 plain 背景激活色
  buttonInfoPlainBorder?: string // 信息类型 plain 边框色
  buttonInfoPlainBorderActive?: string // 信息类型 plain 边框激活色
  buttonInfoSoftBg?: string // 信息类型 soft 背景色
  buttonInfoSoftBgActive?: string // 信息类型 soft 背景激活色
  buttonLeftRightPaddingLarge?: string // large 尺寸左右内边距
  buttonLeftRightPaddingMedium?: string // medium 尺寸左右内边距
  buttonLeftRightPaddingMini?: string // mini 尺寸左右内边距
  buttonLeftRightPaddingSmall?: string // small 尺寸左右内边距
  buttonLineHeightLarge?: string // large 尺寸文字行高
  buttonLineHeightMedium?: string // medium 尺寸文字行高
  buttonLineHeightMini?: string // mini 尺寸文字行高
  buttonLineHeightSmall?: string // small 尺寸文字行高
  buttonLoadingSize?: string // 加载图标尺寸
  buttonLoadingSpacing?: string // 加载图标与文字间距
  buttonMainColor?: string // 实心按钮默认文本色
  buttonOnlyIconPaddingLarge?: string // large 尺寸仅图标按钮内边距
  buttonOnlyIconPaddingMedium?: string // medium 尺寸仅图标按钮内边距
  buttonOnlyIconPaddingMini?: string // mini 尺寸仅图标按钮内边距
  buttonOnlyIconPaddingSmall?: string // small 尺寸仅图标按钮内边距
  buttonPrimaryBg?: string // 主类型背景色
  buttonPrimaryBgActive?: string // 主类型背景激活色
  buttonPrimaryColor?: string // 主类型文本色
  buttonPrimaryColorActive?: string // 主类型文本激活色
  buttonPrimaryPlainBg?: string // 主类型 plain 背景色
  buttonPrimaryPlainBgActive?: string // 主类型 plain 背景激活色
  buttonPrimaryPlainBorder?: string // 主类型 plain 边框色
  buttonPrimaryPlainBorderActive?: string // 主类型 plain 边框激活色
  buttonPrimarySoftBg?: string // 主类型 soft 背景色
  buttonPrimarySoftBgActive?: string // 主类型 soft 背景激活色
  buttonRadiusFull?: string // 圆形圆角
  buttonRadiusMain?: string // 默认圆角
  buttonSizeIconLarge?: string // large 尺寸图标字号
  buttonSizeIconMedium?: string // medium 尺寸图标字号
  buttonSizeIconMini?: string // mini 尺寸图标字号
  buttonSizeIconSmall?: string // small 尺寸图标字号
  buttonSpacingBlock?: string // 块级按钮纵向间距
  buttonSpacingLarge?: string // large 尺寸图标与文字间距
  buttonSpacingMedium?: string // medium 尺寸图标与文字间距
  buttonSpacingMini?: string // mini 尺寸图标与文字间距
  buttonSpacingSmall?: string // small 尺寸图标与文字间距
  buttonSuccessBg?: string // 成功类型背景色
  buttonSuccessBgActive?: string // 成功类型背景激活色
  buttonSuccessColor?: string // 成功类型文本色
  buttonSuccessColorActive?: string // 成功类型文本激活色
  buttonSuccessPlainBg?: string // 成功类型 plain 背景色
  buttonSuccessPlainBgActive?: string // 成功类型 plain 背景激活色
  buttonSuccessPlainBorder?: string // 成功类型 plain 边框色
  buttonSuccessPlainBorderActive?: string // 成功类型 plain 边框激活色
  buttonSuccessSoftBg?: string // 成功类型 soft 背景色
  buttonSuccessSoftBgActive?: string // 成功类型 soft 背景激活色
  buttonUpDownPaddingLarge?: string // large 尺寸上下内边距
  buttonUpDownPaddingMedium?: string // medium 尺寸上下内边距
  buttonUpDownPaddingMini?: string // mini 尺寸上下内边距
  buttonUpDownPaddingSmall?: string // small 尺寸上下内边距
  buttonWarningBg?: string // 警告类型背景色
  buttonWarningBgActive?: string // 警告类型背景激活色
  buttonWarningColor?: string // 警告类型文本色
  buttonWarningColorActive?: string // 警告类型文本激活色
  buttonWarningPlainBg?: string // 警告类型 plain 背景色
  buttonWarningPlainBgActive?: string // 警告类型 plain 背景激活色
  buttonWarningPlainBorder?: string // 警告类型 plain 边框色
  buttonWarningPlainBorderActive?: string // 警告类型 plain 边框激活色
  buttonWarningSoftBg?: string // 警告类型 soft 背景色
  buttonWarningSoftBgActive?: string // 警告类型 soft 背景激活色
}

export type calendarThemeVars = {
  calendarBg?: string // 日历弹层背景色
  calendarConfirmBorderColor?: string // 确认区域上边框颜色
  calendarConfirmPadding?: string // 确认区域内边距
  calendarRangeFontSize?: string // 范围标签字号
  calendarRangeItemColor?: string // 范围标签项颜色
  calendarRangeItemColorPlaceholder?: string // 占位符颜色
  calendarRangeItemFontSize?: string // 范围标签项字号
  calendarRangeItemFontWeight?: string // 范围标签项字重
  calendarRangeItemLineColor?: string // 范围标签项下划线颜色
  calendarRangeItemLineColorPlaceholder?: string // 范围标签项下划线占位符颜色
  calendarRangeItemLineHeight?: string // 范围标签项行高
  calendarRangeItemPadding?: string // 范围标签项内边距
  calendarRangePadding?: string // 范围标签内边距
  calendarRangeSeparatorColor?: string // 分隔符颜色
  calendarRangeSeparatorHeight?: string // 分隔符高度
  calendarRangeSeparatorMargin?: string // 分隔符水平间距
  calendarRangeSeparatorWidth?: string // 分隔符宽度
  calendarShortcutsPadding?: string // 快捷选项内边距
  calendarTabsPadding?: string // Tabs 内边距
  calendarTabsWidth?: string // Tabs 宽度
  calendarTagSpacingRight?: string // 标签右间距
}

export type calendarViewThemeVars = {
  calendarViewBorderRadiusActive?: string // 激活态圆角
  calendarViewColorActive?: string // 激活态颜色
  calendarViewColorDisabled?: string // 禁用态文字颜色
  calendarViewColorSelected?: string // 选中态文字颜色
  calendarViewControlColorDisabled?: string // 控制栏禁用图标颜色
  calendarViewControlIconColor?: string // 控制栏图标颜色
  calendarViewControlIconSize?: string // 控制栏图标尺寸
  calendarViewControlIconSpacing?: string // 控制栏图标间距
  calendarViewControlsPadding?: string // 面板控制栏内边距
  calendarViewDayColor?: string // 日期单元文字颜色
  calendarViewDayFontSize?: string // 日期单元字号
  calendarViewDayFontWeight?: string // 日期单元字重
  calendarViewDayHeight?: string // 日期单元高度
  calendarViewInfoFontSize?: string // 顶部/底部辅助信息字号
  calendarViewInfoLineHeight?: string // 顶部/底部辅助信息行高
  calendarViewInfoPosition?: string // 顶部/底部辅助信息偏移位置
  calendarViewItemMarginBottom?: string // 日期/月份单元底部间距
  calendarViewItemPadding?: string // 日期/月份容器内边距
  calendarViewMonthFontWeight?: string // 月份单元字重
  calendarViewMonthHeight?: string // 月份单元高度
  calendarViewMonthWidth?: string // 月份单元宽度
  calendarViewPanelTitleColor?: string // 面板标题文字颜色
  calendarViewPanelTitleFontSize?: string // 面板标题字号
  calendarViewPanelTitleFontWeight?: string // 面板标题字重
  calendarViewPanelTitleLineHeight?: string // 面板标题行高
  calendarViewPanelTitleMargin?: string // 面板标题外边距
  calendarViewPanelTitlePadding?: string // 面板标题内边距
  calendarViewRangeBg?: string // 区间态背景色
  calendarViewRangeColor?: string // 区间态文字颜色
  calendarViewTimeBoxShadow?: string // 时间选择区域阴影
  calendarViewTimeLabelBorder?: string // 时间标签分隔边框
  calendarViewTimeLabelHeight?: string // 时间标签高度
  calendarViewTimePickerBg?: string // 时间选择器背景色
  calendarViewTimePickerColor?: string // 时间选择器文字颜色
  calendarViewTimePickerFontSize?: string // 时间选择器字号
  calendarViewWeekColor?: string // 星期文字颜色
  calendarViewWeekFontSize?: string // 星期文字字号
  calendarViewWeekLineHeight?: string // 星期文字行高
  calendarViewWeeksPadding?: string // 星期栏内边距
}

export type cardThemeVars = {
  cardBg?: string // 卡片背景色
  cardBorderColor?: string // 卡片边框颜色
  cardContentBorderColor?: string // 内容区域边框颜色
  cardContentColor?: string // 内容文字颜色
  cardContentFontSize?: string // 内容字号
  cardContentLineHeight?: string // 内容行高
  cardContentPadding?: string // 内容内边距
  cardFooterBorderColor?: string // 底部分割线颜色
  cardFooterPadding?: string // 底部内边距
  cardMarginBottom?: string // 卡片底部间距
  cardMarginHorizontal?: string // 卡片水平方向外边距
  cardRadius?: string // 卡片圆角
  cardShadow?: string // 卡片阴影
  cardShadowHover?: string // 卡片悬浮阴影
  cardTitleColor?: string // 标题颜色
  cardTitleFontSize?: string // 标题字号
  cardTitleFontWeight?: string // 标题字重
  cardTitleLineHeight?: string // 标题行高
  cardTitlePadding?: string // 标题内间距
  cardTransition?: string // 过渡动画
}

export type cascaderThemeVars = {
  cascaderActionRight?: string // 关闭图标右侧偏移
  cascaderBg?: string // 级联选择器弹层背景色
  cascaderConfirmColor?: string // checkStrictly模式确认按钮颜色
  cascaderConfirmFontSize?: string // checkStrictly模式确认按钮字号
  cascaderConfirmFontWeight?: string // checkStrictly模式确认按钮字重
  cascaderConfirmLineHeight?: string // checkStrictly模式确认按钮行高
  cascaderConfirmOpacityDisabled?: string // checkStrictly模式确认按钮禁用透明度
  cascaderListCheckedIconSize?: string // 选中图标尺寸
  cascaderListCheckedIconSpacing?: string // 选中图标与文字间距
  cascaderListHeight?: string // 选项列表高度
  cascaderListItemColor?: string // 选项文字颜色
  cascaderListItemColorChecked?: string // 选项选中态文字颜色
  cascaderListItemFontSize?: string // 选项文字字号
  cascaderListItemFontWeightChecked?: string // 选项选中态文字字重
  cascaderListItemLineHeight?: string // 选项文字行高
  cascaderListItemOpacityDisabled?: string // 选项禁用态透明度
  cascaderListItemPadding?: string // 选项内边距
  cascaderListTipColor?: string // 选项提示文字颜色
  cascaderListTipFontSize?: string // 选项提示文字字号
  cascaderListTipLineHeight?: string // 选项提示文字行高
  cascaderListTipMarginTop?: string // 选项提示顶部外边距
  cascaderLoadingIconSize?: string // loading 图标尺寸
  cascaderLoadingOpacity?: string // loading 状态下选项区透明度
}

export type cellGroupThemeVars = {
  cellGroupBg?: string // 单元格组背景色
  cellGroupFontWeight?: string // 标题文字字重
  cellGroupInsertMargin?: string // 插入模式外边距
  cellGroupInsertRadius?: string // 插入模式圆角
  cellGroupPadding?: string // 标题区域内边距
  cellGroupTitleColor?: string // 标题文字颜色
  cellGroupTitleFontSize?: string // 标题文字字号
  cellGroupValueColor?: string // 右侧辅助文字颜色
  cellGroupValueFontSize?: string // 右侧辅助文字字号
}

export type cellThemeVars = {
  cellArrowColor?: string // 箭头颜色
  cellArrowMarginLeft?: string // 箭头左侧间距
  cellArrowSize?: string // 箭头图标尺寸
  cellBg?: string // 单元格背景色
  cellBgActive?: string // 单元格激活态背景色
  cellBorderColor?: string // 边框颜色
  cellClearColor?: string // 清除图标颜色
  cellIconColor?: string // 图标颜色
  cellIconSize?: string // 图标尺寸
  cellIconSpacingRight?: string // 前缀图标右侧间距
  cellLabelColor?: string // 标签文字颜色
  cellLabelFontSize?: string // 标签字号
  cellLabelFontSizeLarge?: string // 大尺寸标签字号
  cellLabelLineHeight?: string // 标签行高
  cellLabelLineHeightLarge?: string // 大尺寸标签行高
  cellLabelMarginTop?: string // 标签顶部间距
  cellMarginHorizontal?: string // 水平布局左右区域间距
  cellPadding?: string // 单元格内边距
  cellPaddingLarge?: string // 大尺寸单元格内边距
  cellPlaceholderColor?: string // 占位符颜色
  cellPlaceholderFontSize?: string // 占位符字号
  cellPlaceholderLineHeight?: string // 占位符行高
  cellRequiredColor?: string // 必填标记颜色
  cellRequiredFontSize?: string // 必填标记字号
  cellRequiredLineHeight?: string // 必填标记行高
  cellRequiredMargin?: string // 必填标记外边距
  cellTapBg?: string // 点击态背景色
  cellThemeColor?: string // 主题色
  cellTitleColor?: string // 标题文字颜色
  cellTitleFontSize?: string // 标题字号
  cellTitleFontSizeLarge?: string // 大尺寸标题字号
  cellTitleLineHeight?: string // 标题行高
  cellTitleLineHeightLarge?: string // 大尺寸标题行高
  cellValueColor?: string // 值文字颜色
  cellValueFontSize?: string // 值字号
  cellValueFontSizeLarge?: string // 大尺寸值字号
  cellValueLineHeight?: string // 值行高
  cellValueLineHeightLarge?: string // 大尺寸值行高
  cellVerticalPaddingTop?: string // 纵向布局右侧顶部内边距
}

export type checkboxThemeVars = {
  checkboxButtonBg?: string // 按钮模式背景颜色
  checkboxButtonBgChecked?: string // 按钮模式选中状态背景颜色
  checkboxButtonBorderRadius?: string // 按钮圆角大小
  checkboxButtonBorderWidth?: string // 边框宽度
  checkboxButtonFontSize?: string // 按钮模式字号
  checkboxButtonIconColor?: string // 按钮模式图标颜色
  checkboxButtonIconLeft?: string // 按钮模式图标左侧偏移
  checkboxButtonIconRight?: string // 按钮模式图标右侧偏移
  checkboxButtonIconSize?: string // 按钮模式图标尺寸
  checkboxButtonIconTop?: string // 按钮模式图标顶部偏移
  checkboxButtonLineHeight?: string // 按钮模式行高
  checkboxButtonMargin?: string // 按钮模式多个单选框距离
  checkboxButtonMaxWidth?: string // 按钮模式最大宽
  checkboxButtonMinWidth?: string // 按钮模式最小宽
  checkboxButtonPadding?: string // 按钮模式内边距
  checkboxButtonShapeBorderRadius?: string // 按钮模式图标圆角大小
  checkboxButtonShapeLeft?: string // 按钮模式勾角左侧偏移
  checkboxButtonShapeRight?: string // 按钮模式勾角右侧偏移
  checkboxButtonShapeSize?: string // 按钮模式图标容器大小
  checkboxButtonShapeTop?: string // 按钮模式勾角顶部偏移
  checkboxColorChecked?: string // 选中颜色
  checkboxHorizontalMargin?: string // 水平模式多个单选框距离
  checkboxIconSize?: string // 图标尺寸
  checkboxLabelColor?: string // 文字颜色
  checkboxLabelFontSize?: string // 文字字号
  checkboxLabelLineHeight?: string // 文字行高
  checkboxLabelMargin?: string // 文字与图标距离
  checkboxOpacityDisabled?: string // 禁用态透明度
  checkboxUncheckedColor?: string // 未选中图标颜色
}

export type circleThemeVars = {
  circleTextColor?: string // 圆环文字颜色
  circleTextFontSize?: string // 圆环文字字号
  circleTextLineHeight?: string // 圆环文字行高
}

export type collapseItemThemeVars = {
  collapseItemArrowColor?: string // 折叠项箭头颜色
  collapseItemArrowSize?: string // 折叠项箭头尺寸
  collapseItemBodyColor?: string // 折叠项内容文字颜色
  collapseItemBodyFontSize?: string // 折叠项内容文字字号
  collapseItemBodyLineHeight?: string // 折叠项内容文字行高
  collapseItemBodyPadding?: string // 折叠项内容区域内边距
  collapseItemHeaderPadding?: string // 折叠项头部内边距
  collapseItemTitleColor?: string // 折叠项标题文字颜色
  collapseItemTitleFontSize?: string // 折叠项标题文字字号
  collapseItemTitleLineHeight?: string // 折叠项标题文字行高
}

export type collapseThemeVars = {
  collapseArrowColor?: string // 折叠箭头颜色
  collapseArrowSize?: string // 折叠箭头尺寸
  collapseBg?: string // 折叠面板背景颜色
  collapseBodyColor?: string // 折叠内容文字颜色
  collapseBodyFontSize?: string // 折叠内容文字字号
  collapseBodyPadding?: string // 折叠内容区域内边距
  collapseMoreColor?: string // 更多按钮文字颜色
  collapseMoreFontSize?: string // 更多按钮文字字号
  collapseMoreMarginTop?: string // 更多按钮上边距
  collapseMoreTextMarginRight?: string // 更多按钮文字右侧间距
  collapsePadding?: string // 折叠容器左右内边距
  collapseTitleColor?: string // 折叠标题文字颜色
  collapseTitleFontSize?: string // 折叠标题文字字号
}

export type countDownThemeVars = {
  countDownFontSize?: string // 倒计时文本字号
  countDownLineHeight?: string // 倒计时文本行高
  countDownTextColor?: string // 倒计时文本颜色
}

export type countToThemeVars = {
  countToSeparatorTextFontSize?: string // 分隔文本字号
  countToSeparatorTextLineHeight?: string // 分隔文本行高
  countToTextFontSize?: string // 数字主体文本字号
  countToTextLineHeight?: string // 数字主体文本行高
}

export type curtainThemeVars = {
  curtainContentCloseColor?: string // 幕帘关闭图标颜色
  curtainContentCloseInset?: string // 幕帘关闭图标偏移
  curtainContentCloseSize?: string // 幕帘关闭图标尺寸
  curtainContentRadius?: string // 幕帘内容圆角
}

export type datetimePickerThemeVars = {
  datetimePickerActionColor?: string // 操作按钮文字颜色
  datetimePickerActionFontSize?: string // 操作按钮字号
  datetimePickerActionLineHeight?: string // 操作按钮行高
  datetimePickerPopupRadius?: string // 日期时间选择器弹窗圆角
  datetimePickerRangeFontSize?: string // 范围标签字号
  datetimePickerRangeItemColor?: string // 范围标签项颜色
  datetimePickerRangeItemFontSize?: string // 范围标签项字号
  datetimePickerRangeItemFontWeight?: string // 范围标签项字重
  datetimePickerRangeItemLineColor?: string // 范围标签项下划线颜色
  datetimePickerRangeItemLineHeight?: string // 范围标签项行高
  datetimePickerRangeItemLinePlaceholderColor?: string // 范围标签项下划线占位符颜色
  datetimePickerRangeItemPadding?: string // 范围标签项内边距
  datetimePickerRangeItemPlaceholderColor?: string // 占位符颜色
  datetimePickerRangePadding?: string // 范围标签内边距
  datetimePickerRangeSeparatorColor?: string // 分隔符颜色
  datetimePickerRangeSeparatorHeight?: string // 分隔符高度
  datetimePickerRangeSeparatorMargin?: string // 分隔符水平间距
  datetimePickerRangeSeparatorWidth?: string // 分隔符宽度
  datetimePickerTitleColor?: string // 标题文字颜色
  datetimePickerTitleFontSize?: string // 标题文字字号
  datetimePickerTitleFontWeight?: string // 标题文字字重
  datetimePickerTitleHeight?: string // 标题区域高度
  datetimePickerTitleLineHeight?: string // 标题文字行高
  datetimePickerTitlePadding?: string // 标题区域内边距
}

export type dialogThemeVars = {
  dialogActionsConfirmFontWeight?: string // 确认按钮字重
  dialogActionsPadding?: string // 操作区内边距
  dialogActionsPaddingVertical?: string // 垂直操作区内边距
  dialogActionsSpacing?: string // 操作按钮水平间距
  dialogActionsSpacingVertical?: string // 操作按钮垂直间距
  dialogActionTextBorder?: string // 文本按钮边框宽度
  dialogActionTextBorderColor?: string // 文本按钮边框颜色
  dialogActionTextButtonPadding?: string // 文本按钮内边距
  dialogBg?: string // 对话框背景色
  dialogBodyElementSpacing?: string // 主体元素间距
  dialogBodyElementSpacingLarge?: string // 主体大间距
  dialogBodyPadding?: string // 对话框主体内边距
  dialogCloseIconColor?: string // 关闭图标颜色
  dialogCloseIconRight?: string // 关闭图标右侧偏移
  dialogCloseIconSize?: string // 关闭图标尺寸
  dialogCloseIconTop?: string // 关闭图标顶部偏移
  dialogContentColor?: string // 内容文字颜色
  dialogContentFontSize?: string // 内容文字字号
  dialogContentInputBg?: string // 输入框背景色
  dialogContentInputErrorColor?: string // 输入错误文字颜色
  dialogContentInputFontSize?: string // 输入错误文字字号
  dialogContentInputLineHeight?: string // 输入错误文字行高
  dialogContentInputPaddingTop?: string // 输入提示顶部内边距
  dialogContentLineHeight?: string // 内容文字行高
  dialogContentMaxHeight?: string // 内容区最大高度
  dialogContentPadding?: string // 内容区内边距
  dialogErrorColor?: string // 危险图标颜色
  dialogIconMarginBottom?: string // 图标底部外边距
  dialogIconSize?: string // 图标尺寸
  dialogImgBorderRadius?: string // 图片圆角
  dialogPrimaryColor?: string // 默认图标颜色
  dialogRadius?: string // 对话框圆角
  dialogScrollbarColor?: string // 滚动条颜色
  dialogScrollbarRadius?: string // 滚动条圆角
  dialogScrollbarWidth?: string // 滚动条宽度
  dialogSuccessColor?: string // 成功图标颜色
  dialogTitleColor?: string // 标题文字颜色
  dialogTitleFontSize?: string // 标题文字字号
  dialogTitleFontWeight?: string // 标题文字字重
  dialogTitleLineHeight?: string // 标题文字行高
  dialogTitleMarginBottom?: string // 标题底部外边距
  dialogWarningColor?: string // 警告图标颜色
  dialogWidth?: string // 对话框宽度
}

export type dividerThemeVars = {
  dividerColorDefault?: string // 默认文字颜色
  dividerColorLine?: string // 分割线颜色
  dividerFontSizeDefault?: string // 默认文字字号
  dividerLineHeight?: string // 分割线厚度
  dividerMargin?: string // 组件垂直外边距
  dividerMarginContentLeft?: string // 内容左侧间距
  dividerMarginContentRight?: string // 内容右侧间距
  dividerMarginDefault?: string // 默认外边距
  dividerMarginVerticalContent?: string // 纵向模式内容间距
  dividerPadding?: string // 组件水平内边距
  dividerPaddingDefault?: string // 默认内边距
  dividerSizeContentLeftWidth?: string // 左对齐模式左侧线段宽度
  dividerSizeContentRightWidth?: string // 右对齐模式右侧线段宽度
  dividerSizeLineHeight?: string // 内容文字行高
  dividerSizeVerticalHeight?: string // 纵向分割线高度
  dividerSizeVerticalLineWidth?: string // 纵向分割线宽度
}

export type dropMenuItemThemeVars = {
  dropItemIconColor?: string // 勾选图标颜色
  dropItemIconSize?: string // 勾选图标尺寸
  dropItemModalBg?: string // 遮罩层背景色
  dropItemOptionPadding?: string // 选项内边距
  dropItemPopupBorderTop?: string // 弹层顶部边线样式
  dropItemTextColor?: string // 选项文字颜色
  dropItemTextColorActive?: string // 选中项文字颜色
  dropItemTextFontSize?: string // 选项文字字号
  dropItemTextLineHeight?: string // 选项文字行高
  dropItemTipColor?: string // 提示文字颜色
  dropItemTipColorActive?: string // 选中项提示文字颜色
  dropItemTipFontSize?: string // 提示文字字号
  dropItemTipLineHeight?: string // 提示文字行高
  dropItemTipSpacing?: string // 提示文字间距
}

export type dropMenuThemeVars = {
  dropMenuArrowColor?: string // 箭头图标颜色
  dropMenuArrowColorActive?: string // 箭头图标激活态颜色
  dropMenuArrowSize?: string // 箭头图标大小
  dropMenuArrowSpacing?: string // 箭头图标间距
  dropMenuHeight?: string // 菜单项高度
  dropMenuListBg?: string // 菜单列表背景色
  dropMenuOptionOpacityDisabled?: string // 菜单项禁用态透明度
  dropMenuOptionPadding?: string // 菜单项内边距
  dropMenuOptionPaddingHorizontal?: string // 菜单项水平内边距
  dropMenuTextColor?: string // 菜单文字颜色
  dropMenuTextColorActive?: string // 菜单激活态文字颜色
  dropMenuTextFontSize?: string // 菜单文字字号
  dropMenuTextFontWeightActive?: string // 菜单激活态字重
  dropMenuTextLineHeight?: string // 菜单文字行高
}

export type emptyThemeVars = {
  emptyIconColor?: string // 图标颜色
  emptyIconSize?: string // 图标尺寸
  emptyPaddingBottom?: string // 组件底部内边距
  emptyTextColor?: string // 文案颜色
  emptyTextFontSize?: string // 文案字号
  emptyTextFontWeight?: string // 文案字重
  emptyTextLineHeight?: string // 文案行高
  emptyTextMarginTop?: string // 文案顶部间距
}

export type fabThemeVars = {
  fabActionsPadding?: string // 动作列表主轴内边距
  fabTransitionOffset?: string // 动作按钮展开/收起动画偏移距离
  fabTriggerHeight?: string // 浮动按钮触发器高度
  fabTriggerIconSize?: string // 浮动按钮触发器图标大小
  fabTriggerWidth?: string // 浮动按钮触发器宽度
  fabZIndex?: string // 浮动按钮层级
}

export type floatingPanelThemeVars = {
  floatingPanelBarBg?: string // 拖拽条背景色
  floatingPanelBarHeight?: string // 拖拽条高度
  floatingPanelBarRadius?: string // 拖拽条圆角
  floatingPanelBarWidth?: string // 拖拽条宽度
  floatingPanelBg?: string // 面板背景色
  floatingPanelContentBg?: string // 内容区域背景色
  floatingPanelHeaderHeight?: string // 头部高度
  floatingPanelRadius?: string // 面板圆角
  floatingPanelZIndex?: string // 面板 z-index
}

export type formItemThemeVars = {
  formItemErrorMessageColor?: string // 错误提示文字颜色
  formItemErrorMessageFontSize?: string // 错误提示文字字号
  formItemErrorMessageLineHeight?: string // 错误提示文字行高
  formItemErrorMessageMarginTop?: string // 错误提示顶部外边距
  formItemPlaceholderColor?: string // 占位符文字颜色
}

export type gridItemThemeVars = {
  gridItemBg?: string // 网格项背景色
  gridItemBorderColor?: string // 网格项边框颜色
  gridItemBorderWidth?: string // 网格项边框宽度
  gridItemFontSize?: string // 网格项文字字号
  gridItemHoverBg?: string // 网格项悬浮背景色
  gridItemIconColor?: string // 网格项图标颜色
  gridItemIconSize?: string // 网格项图标尺寸
  gridItemLineHeight?: string // 网格项文字行高
  gridItemPadding?: string // 网格项内容内边距
  gridItemTextColor?: string // 网格项文字颜色
  gridItemTextSpacing?: string // 网格项文字间距
}

export type iconThemeVars = {
  iconFontSize?: string // 图标字号
}

export type imagePreviewThemeVars = {
  imagePreviewBg?: string // 预览蒙层背景色
  imagePreviewCloseColor?: string // 关闭图标颜色
  imagePreviewCloseMargin?: string // 关闭按钮边距
  imagePreviewCloseSize?: string // 关闭图标尺寸
  imagePreviewIndexColor?: string // 页码文字颜色
  imagePreviewIndexFontSize?: string // 页码文字字号
  imagePreviewIndexFontWeight?: string // 页码文字字重
  imagePreviewIndexLineHeight?: string // 页码文字行高
  imagePreviewIndexMargin?: string // 页码顶部间距
}

export type imgCropperThemeVars = {
  imgCropperBg?: string // 组件背景色
  imgCropperCancelColor?: string // 取消按钮文字颜色
  imgCropperCancelFontSize?: string // 取消按钮字号
  imgCropperCanvasBg?: string // 画布背景色
  imgCropperCanvasZIndex?: string // 画布层级
  imgCropperCornerColor?: string // 角标颜色
  imgCropperCornerLength?: string // 角标长度
  imgCropperCornerSize?: string // 角标粗细
  imgCropperCutBorderColor?: string // 裁剪框边框颜色
  imgCropperCutZIndex?: string // 裁剪框层级
  imgCropperFooterBtnMargin?: string // 底部按钮向上边距
  imgCropperFooterPadding?: string // 底部操作栏内边距
  imgCropperFooterZIndex?: string // 底部操作栏层级
  imgCropperGridlineBorderColor?: string // 网格线边框颜色
  imgCropperIconColor?: string // 旋转图标颜色
  imgCropperIconSize?: string // 旋转图标大小
  imgCropperImgZIndex?: string // 图片层级
  imgCropperOverlayBg?: string // 裁剪区遮罩背景色
  imgCropperOverlayBgHighlight?: string // 裁剪区遮罩高亮背景色
  imgCropperOverlayTransitionDuration?: string // 遮罩过渡时长
  imgCropperWrapperBg?: string // 包裹器蒙层背景色
  imgCropperZIndex?: string // 组件层级
}

export type imgThemeVars = {
  imgBorderRadius?: string // 圆形模式圆角
  imgErrorBg?: string // 失败态背景色
  imgErrorColor?: string // 失败态文字颜色
  imgErrorFontSize?: string // 失败态文字字号
  imgErrorIconColor?: string // 失败态图标颜色
  imgErrorIconSize?: string // 失败态图标尺寸
  imgLoadingBg?: string // 加载态背景色
  imgLoadingColor?: string // 加载态文字颜色
  imgLoadingFontSize?: string // 加载态文字字号
  imgLoadingIconColor?: string // 加载态图标颜色
  imgLoadingIconSize?: string // 加载态图标尺寸
}

export type indexAnchorThemeVars = {
  indexAnchorBg?: string
  indexAnchorColor?: string
  indexAnchorFontSize?: string
  indexAnchorPadding?: string
  indexAnchorZIndex?: string
}

export type indexBarThemeVars = {
  indexBarCurrentIndexBg?: string
  indexBarCurrentIndexColor?: string
  indexBarCurrentIndexFontSize?: string
  indexBarCurrentIndexSize?: string
  indexBarCurrentIndexZIndex?: string
  indexBarIndexBgActive?: string
  indexBarIndexBorderRadius?: string
  indexBarIndexColor?: string
  indexBarIndexColorActive?: string
  indexBarIndexFontSize?: string
  indexBarIndexFontWeight?: string
  indexBarIndexHeight?: string
  indexBarIndexWidth?: string
  indexBarSidebarRight?: string
}

export type inputNumberThemeVars = {
  inputNumberActionBg?: string // 操作按钮背景色
  inputNumberActionBorderRadius?: string // 操作按钮圆角
  inputNumberActionBorderRadiusFull?: string // 圆角模式操作按钮圆角
  inputNumberActionColor?: string // 操作按钮颜色
  inputNumberActionDisabledColor?: string // 操作按钮禁用颜色
  inputNumberActionDividerBg?: string // 操作按钮分割线颜色
  inputNumberActionDividerSplitBg?: string // 分离模式分割线颜色
  inputNumberActionDividerSplitHeight?: string // 分离模式分割线高度
  inputNumberActionDividerWidth?: string // 操作按钮分割线宽度
  inputNumberActionPrimaryBg?: string // primary 主题主按钮背景色
  inputNumberActionPrimaryColor?: string // primary 主题主按钮颜色
  inputNumberActionPrimarySubColor?: string // primary 主题次按钮颜色
  inputNumberActionSize?: string // 操作按钮尺寸
  inputNumberBorderColor?: string // 主题边框颜色
  inputNumberDisabledOpacity?: string // 禁用态透明度
  inputNumberFontSize?: string // 输入框文字字号
  inputNumberIconSize?: string // 图标尺寸
  inputNumberIconWeight?: string // 图标线宽
  inputNumberInputBg?: string // 输入框背景色
  inputNumberInputColor?: string // 输入框文字颜色
  inputNumberInputHeight?: string // 输入框高度
  inputNumberInputPadding?: string // 输入框内边距
  inputNumberInputWidth?: string // 输入框宽度
}

export type keyboardThemeVars = {
  keyboardBg?: string // 键盘背景色
  keyboardCloseColor?: string // 关闭按钮文字颜色
  keyboardCloseFontSize?: string // 关闭按钮字号
  keyboardCloseOpacityHover?: string // 关闭按钮悬浮透明度
  keyboardClosePadding?: string // 关闭按钮内边距
  keyboardColor?: string // 键盘文字颜色
  keyboardHeaderHeight?: string // 键盘头部高度
  keyboardPadding?: string // 键盘内容间距
  keyboardTitleColor?: string // 键盘标题颜色
  keyboardTitleFontSize?: string // 键盘标题字号
}

export type loadingThemeVars = {
  loadingColorMain?: string // 主色模式颜色
  loadingColorNormal?: string // 常规模式颜色
  loadingColorText?: string // 文本颜色
  loadingColorWhite?: string // 白色模式颜色
  loadingSize?: string // 组件基准尺寸
  loadingSizeHeight?: string // 容器高度
  loadingSizeWidth?: string // 容器宽度
  loadingSpinnerAnimationDuration?: string // 旋转动画时长
  loadingSpinnerCircleRadius?: string // 圆形加载器圆角
  loadingSpinnerCircleStrokeWidth?: string // 圆形加载器描边宽度
  loadingSpinnerDotHeight?: string // 条状点高度
  loadingSpinnerDotRadius?: string // 条状点圆角
  loadingSpinnerDotsDotRadius?: string // 点状加载器单点圆角
  loadingSpinnerDotsDotSize?: string // 点状加载器单点尺寸
  loadingSpinnerDotWidth?: string // 条状点宽度
  loadingSpinnerPadding?: string // 加载器内边距
  loadingTextFontSize?: string // 文本字号
  loadingTextLineHeight?: string // 文本行高
  loadingTextSpacing?: string // 文本与加载器间距
  loadingWaveAnimationDuration?: string // 波形加载器动画时长
  loadingWaveBarHeight?: string // 波形加载器单柱高度
  loadingWaveBarRadius?: string // 波形加载器单柱圆角
  loadingWaveBarWidth?: string // 波形加载器单柱宽度
  loadingWaveGap?: string // 波形加载器间距
}

export type loadmoreThemeVars = {
  loadmoreColor?: string // 默认文字颜色
  loadmoreFontSize?: string // 默认文字字号
  loadmoreHeight?: string // 组件最小高度
  loadmoreLineHeight?: string // 默认文字行高
  loadmoreLoadingSize?: string // 加载图标尺寸
  loadmoreLoadingSpacing?: string // 加载图标与文字间距
  loadmorePadding?: string // 组件内边距
  loadmoreRefreshColor?: string // 刷新态文字颜色
  loadmoreRefreshFontSize?: string // 刷新图标字号
  loadmoreRefreshLineHeight?: string // 刷新图标行高
  loadmoreRetrySpacing?: string // 重试文案与图标间距
}

export type navbarCapsuleThemeVars = {
  navbarCapsuleBorderColor?: string // 胶囊边框颜色
  navbarCapsuleBorderWidth?: string // 胶囊边框宽度
  navbarCapsuleHeight?: string // 胶囊高度
  navbarCapsuleIconColor?: string // 胶囊图标颜色
  navbarCapsuleIconSize?: string // 胶囊图标大小
  navbarCapsuleRadius?: string // 胶囊圆角
  navbarCapsuleSperatorColor?: string // 分割线颜色
  navbarCapsuleSperatorHeight?: string // 分割线高度
  navbarCapsuleSperatorWidth?: string // 分割线宽度
  navbarCapsuleWidth?: string // 胶囊宽度
}

export type navbarThemeVars = {
  navbarArrowSize?: string // 箭头图标大小
  navbarBg?: string // 导航栏背景色
  navbarColor?: string // 标题文字颜色
  navbarDescColor?: string // 描述区域文字颜色
  navbarDescFontSize?: string // 描述区域字号
  navbarHeight?: string // 导航栏高度
  navbarLeftPadding?: string // 左侧内边距
  navbarOpacityDisabled?: string // 禁用态透明度
  navbarTitleFontSize?: string // 标题字号
  navbarTitleFontWeight?: string // 标题字重
  navbarZIndex?: string // 固定定位层级
}

export type noticeBarThemeVars = {
  noticeBarDangerBg?: string // 危险态背景色
  noticeBarDangerColor?: string // 危险态文字颜色
  noticeBarFontSize?: string // 公告栏文字字号
  noticeBarInfoBg?: string // 信息态背景色
  noticeBarInfoColor?: string // 信息态文字颜色
  noticeBarLineHeight?: string // 公告栏文字行高
  noticeBarPadding?: string // 公告栏内边距
  noticeBarPrefixMarginRight?: string // 前缀图标右侧间距
  noticeBarPrefixSize?: string // 前缀图标大小
  noticeBarRadius?: string // 公告栏圆角
  noticeBarSuffixColor?: string // 后缀图标颜色
  noticeBarSuffixMarginLeft?: string // 后缀图标左侧间距
  noticeBarSuffixSize?: string // 后缀图标大小
  noticeBarWarningBg?: string // 警告态背景色
  noticeBarWarningColor?: string // 警告态文字颜色
}

export type notifyThemeVars = {
  notifyDangerBg?: string // 危险态背景色
  notifyDangerColor?: string // 危险态文字颜色
  notifyFloatingBg?: string // floating 变体背景色
  notifyFloatingColor?: string // floating 变体文字颜色
  notifyFloatingMarginHorizontal?: string // floating 变体左右间距
  notifyFloatingMarginVertical?: string // floating 变体上下间距
  notifyFloatingRadius?: string // floating 变体圆角
  notifyFontSize?: string // 通知文字字号
  notifyIconSize?: string // 图标尺寸
  notifyIconSpacing?: string // 图标间距
  notifyLineHeight?: string // 通知文字行高
  notifyPadding?: string // 通知内边距
  notifyPrimaryBg?: string // 主色态背景色
  notifyPrimaryColor?: string // 主色态文字颜色
  notifySuccessBg?: string // 成功态背景色
  notifySuccessColor?: string // 成功态文字颜色
  notifyTextColor?: string // 通知文字颜色
  notifyWarningBg?: string // 警告态背景色
  notifyWarningColor?: string // 警告态文字颜色
}

export type overlayThemeVars = {
  overlayBg?: string // 遮罩层背景色
}

export type paginationThemeVars = {
  paginationBg?: string // 分页背景色
  paginationIconSize?: string // 分页图标尺寸
  paginationMessageColor?: string // 辅助文案颜色
  paginationMessageFontSize?: string // 辅助文案字号
  paginationMessageLineHeight?: string // 辅助文案行高
  paginationMessageMarginTop?: string // 辅助文案顶部间距
  paginationNavWidth?: string // 翻页按钮最小宽度
  paginationPadding?: string // 分页内边距
  paginationSizeColor?: string // 页码颜色
  paginationSizeCurrentColor?: string // 当前页码颜色
  paginationSizeFontSize?: string // 页码字号
  paginationSizeLineHeight?: string // 页码行高
  paginationSizeSeparatorMargin?: string // 分隔符外边距
}

export type passwordInputThemeVars = {
  passwordInputBg?: string // 输入格背景色
  passwordInputBorderColor?: string // 边框颜色
  passwordInputBorderWidth?: string // 边框宽度
  passwordInputCursorColor?: string // 光标颜色
  passwordInputCursorDuration?: string // 光标闪烁周期
  passwordInputCursorHeight?: string // 光标高度
  passwordInputCursorWidth?: string // 光标宽度
  passwordInputDotColor?: string // 密码点颜色
  passwordInputDotRadius?: string // 密码点圆角
  passwordInputDotSize?: string // 密码点尺寸
  passwordInputErrorInfoColor?: string // 错误提示颜色
  passwordInputFontSize?: string // 输入字号
  passwordInputHeight?: string // 输入区域高度
  passwordInputInfoColor?: string // 提示信息颜色
  passwordInputInfoFontSize?: string // 提示信息字号
  passwordInputLineHeight?: string // 输入行高
  passwordInputMargin?: string // 组件外边距
  passwordInputRadius?: string // 输入格圆角
  passwordInputTextColor?: string // 输入文本颜色
}

export type pickerThemeVars = {
  pickerActionColorCancel?: string // 取消按钮文字颜色
  pickerActionColorConfirm?: string // 确认按钮文字颜色
  pickerActionDisabledColor?: string // 操作按钮禁用颜色
  pickerActionFontSize?: string // 操作按钮字号
  pickerBg?: string // 选择器背景色
  pickerRadius?: string // 弹窗圆角
  pickerTitleColor?: string // 标题文字颜色
  pickerTitleFontSize?: string // 标题文字字号
  pickerTitleFontWeight?: string // 标题文字字重
  pickerTitleLineHeight?: string // 标题文字行高
  pickerToolbarHeight?: string // 选择器工具栏高度
}

export type pickerViewThemeVars = {
  pickerViewBg?: string // 选择器视图背景色
  pickerViewColumnItemColor?: string // 列项文字颜色
  pickerViewColumnItemDisabledColor?: string // 列项禁用文字颜色
  pickerViewColumnItemFontSize?: string // 列项字号
  pickerViewColumnItemFontWeightActive?: string // 列项激活字重
  pickerViewColumnItemHeight?: string // 列项高度
  pickerViewColumnItemPadding?: string // 列项内边距
  pickerViewDisabledOpacity?: string // 禁用态透明度
  pickerViewMaskBg?: string // 遮罩背景渐变
  pickerViewMaskEndColor?: string // 遮罩渐变结束色
  pickerViewMaskStartColor?: string // 遮罩渐变起始色
  pickerViewPadding?: string // 选择器视图内边距
  pickerViewRollerBg?: string // 滚轮背景色
  pickerViewRollerBorderRadius?: string // 滚轮圆角
}

export type popoverThemeVars = {
  popoverArrowBoxShadow?: string // 箭头阴影
  popoverArrowSize?: string // 箭头尺寸
  popoverBg?: string // 浮层背景色
  popoverBorderColor?: string // 浮层边框颜色
  popoverBoxShadow?: string // 浮层阴影
  popoverCloseIconColor?: string // 关闭图标颜色
  popoverCloseIconPadding?: string // 关闭图标内边距
  popoverCloseIconSize?: string // 关闭图标尺寸
  popoverColor?: string // 浮层文字颜色
  popoverFontSize?: string // 浮层字号
  popoverLineHeight?: string // 浮层行高
  popoverMenuIconMarginRight?: string // 菜单图标右侧间距
  popoverMenuIconSize?: string // 菜单图标大小
  popoverPadding?: string // 浮层内边距
  popoverRadius?: string // 浮层圆角
  popoverZIndex?: string // 浮层层级
}

export type popupThemeVars = {
  popupBg?: string // 弹窗背景色
  popupCloseColor?: string // 关闭图标颜色
  popupCloseMargin?: string // 关闭图标外边距
  popupCloseSize?: string // 关闭图标尺寸
  popupRadius?: string // 弹窗圆角：根据弹出位置自动适配
}

export type progressThemeVars = {
  progressBarHeight?: string // 外部文案模式进度条高度
  progressBg?: string // 进度条底色
  progressColor?: string // 默认进度色
  progressDangerColor?: string // danger 进度色
  progressHeight?: string // 内部文案模式组件高度
  progressIconSize?: string // 图标字号
  progressInnerLabelColor?: string // 内部文案颜色
  progressInnerPadding?: string // 内部文案内边距
  progressInnerZeroBg?: string // 内部 zero 态背景色
  progressInnerZeroColor?: string // 内部 zero 态文字颜色
  progressLabelColor?: string // 外部文案颜色
  progressLabelFontSize?: string // 文案字号
  progressLabelLineHeight?: string // 文案行高
  progressLabelMarginLeft?: string // 外部文案左侧间距
  progressLabelWidth?: string // 外部文案宽度
  progressRadius?: string // 进度条圆角
  progressSuccessColor?: string // success 进度色
  progressWarningColor?: string // warning 进度色
}

export type radioThemeVars = {
  radioButtonBg?: string // 按钮模式背景色
  radioButtonBorderRadius?: string // 按钮模式圆角
  radioButtonBorderWidth?: string // 按钮模式边框宽度
  radioButtonCheckedBg?: string // 按钮模式选中背景色
  radioButtonFontSize?: string // 按钮模式字号
  radioButtonIconColor?: string // 按钮模式图标颜色
  radioButtonIconLeft?: string // 按钮模式图标左侧偏移
  radioButtonIconRight?: string // 按钮模式图标右侧偏移
  radioButtonIconSize?: string // 按钮模式图标尺寸
  radioButtonIconTop?: string // 按钮模式图标顶部偏移
  radioButtonLineHeight?: string // 按钮模式行高
  radioButtonMargin?: string // 按钮模式项间距
  radioButtonMaxWidth?: string // 按钮模式最大宽度
  radioButtonMinWidth?: string // 按钮模式最小宽度
  radioButtonPadding?: string // 按钮模式内边距
  radioButtonShapeBorderRadius?: string // 按钮模式标记圆角
  radioButtonShapeLeft?: string // 按钮模式标记左侧偏移
  radioButtonShapeRight?: string // 按钮模式标记右侧偏移
  radioButtonShapeSize?: string // 按钮模式标记尺寸
  radioButtonShapeTop?: string // 按钮模式标记顶部偏移
  radioCheckedColor?: string // 选中颜色
  radioDisabled?: string // 禁用态透明度
  radioHorizontalMargin?: string // 水平模式间距
  radioIconSize?: string // 图标尺寸
  radioLabelColor?: string // 文案颜色
  radioLabelFontSize?: string // 文案字号
  radioLabelLineHeight?: string // 文案行高
  radioLabelMargin?: string // 文案与图标间距
  radioUncheckedColor?: string // 未选中图标颜色
}

export type rateThemeVars = {
  rateActiveColor?: string // 激活图标颜色
  rateColor?: string // 未激活图标颜色
  rateDisabledOpacity?: string // 禁用态透明度
  rateItemSpace?: string // 图标间距
  rateSize?: string // 图标尺寸
}

export type resizeThemeVars = {
  resizeContainerMinSize?: string // 容器最小宽高
  resizeWrapperZIndex?: string // wrapper 层级
}

export type searchThemeVars = {
  searchBg?: string // 组件容器背景色 (filled)
  searchBlockMarginRight?: string // block 向右间距
  searchCancelColor?: string // 取消按钮颜色
  searchCancelFontSize?: string // 取消按钮字号
  searchCancelLineHeight?: string // 取消按钮行高
  searchClearIconColor?: string // 清除图标颜色
  searchClearIconMarginLeft?: string // 清除图标向右间距
  searchClearIconSize?: string // 清除图标大小
  searchCoverBg?: string // 组件覆盖层背景色 (filled)
  searchFieldPadding?: string // 输入框内边距
  searchIconColor?: string // 搜索图标颜色
  searchIconSize?: string // 搜索图标大小
  searchInputBg?: string // 输入框背景色 (filled)
  searchInputColor?: string // 输入框文字颜色
  searchInputFontSize?: string // 输入框字号
  searchInputHeight?: string // 输入框高度
  searchInputLineHeight?: string // 输入框文字行高
  searchInputRadius?: string // 输入框圆角
  searchLeftIconMarginRight?: string // 输入框左侧搜索图标向右间距
  searchLightBg?: string // light 模式容器背景色
  searchLightBlockBg?: string // light 模式内容块背景色
  searchLightCoverBg?: string // light 模式覆盖层背景色
  searchPadding?: string // 组件整体内边距
  searchPlaceholderColor?: string // 占位符颜色
  searchPlaceholderFontSize?: string // 占位符字号
  searchPlaceholderLineHeight?: string // 占位符行高
  searchPlainBg?: string // plain 模式容器背景色
  searchPlainBlockBg?: string // plain 模式内容块背景色
  searchPlainBlockBorderColor?: string // plain 模式内容块边框
  searchPlainCoverBg?: string // plain 模式覆盖层背景色
}

export type segmentedThemeVars = {
  segmentedBg?: string // 组件背景色
  segmentedBorderWidth?: string // 组件边框宽度
  segmentedItemBgActive?: string // 选项激活背景色
  segmentedItemColor?: string // 选项文字颜色
  segmentedItemColorActive?: string // 选项激活文字颜色
  segmentedItemDisabledOpacity?: string // 选项禁用透明度
  segmentedItemFontSize?: string // 选项文字字号
  segmentedItemFontWeight?: string // 选项文字字重
  segmentedItemFontWeightActive?: string // 选项激活字重
  segmentedItemLineHeight?: string // 选项文字行高
  segmentedItemPadding?: string // 选项内边距
  segmentedOutlineBg?: string // 轮廓模式背景色
  segmentedOutlineBorderColor?: string // 轮廓模式边框颜色
  segmentedOutlineItemBgActive?: string // 轮廓模式选项激活背景色
  segmentedOutlineItemBgActiveDisabled?: string // 轮廓模式选项激活禁用背景色
  segmentedOutlineItemColor?: string // 轮廓模式选项文字颜色
  segmentedOutlineItemColorActive?: string // 轮廓模式选项激活文字颜色
  segmentedOutlineItemDisabledColor?: string // 轮廓模式选项禁用文字颜色
  segmentedOutlineItemPadding?: string // 轮廓模式选项内边距
  segmentedOutlinePadding?: string // 轮廓模式内边距
  segmentedOutlineRadius?: string // 轮廓模式圆角
  segmentedPadding?: string // 组件内边距
  segmentedRadius?: string // 组件圆角
}

export type selectPickerThemeVars = {
  selectPickerBg?: string // 选择器背景色
  selectPickerFooterBorderColor?: string // 确认区域上边框颜色
  selectPickerFooterPadding?: string // 底部内边距
  selectPickerItemPadding?: string // 选项内边距
  selectPickerLoadingIconSize?: string // loading 图标尺寸
  selectPickerLoadingOpacity?: string // loading 状态下透明度
  selectPickerTextActiveColor?: string // 选中态文字颜色
  selectPickerWrapperMaxHeight?: string // 内容区最大高度
  selectPickerWrapperPaddingHorizontal?: string // 内容区水平内边距
}

export type sidebarItemThemeVars = {
  sidebarItemBg?: string // 选项背景色
  sidebarItemBgActive?: string // 激活项背景色
  sidebarItemBgHover?: string // 选项点击态背景色
  sidebarItemBorderRadius?: string // 圆角大小
  sidebarItemColor?: string // 选项文字颜色
  sidebarItemColorActive?: string // 激活项文字颜色
  sidebarItemColorDisabled?: string // 禁用状态文字颜色
  sidebarItemFontSize?: string // 选项字号
  sidebarItemFontWeightActive?: string // 激活项字重
  sidebarItemIconMarginRight?: string // 图标右边距
  sidebarItemIconSize?: string // 图标大小
  sidebarItemIndicatorHeight?: string // 激活指示条高度
  sidebarItemIndicatorWidth?: string // 激活指示条宽度
  sidebarItemLineHeight?: string // 选项行高
  sidebarItemMinHeight?: string // 选项最小高度
  sidebarItemPadding?: string // 选项内边距
}

export type sidebarThemeVars = {
  sidebarBg?: string // 侧边栏背景色
  sidebarHeight?: string // 侧边栏高度
  sidebarPaddingBg?: string // 内容区背景色
  sidebarWidth?: string // 侧边栏宽度
}

export type signatureThemeVars = {
  signatureBg?: string // 签名区域背景色
  signatureBorder?: string // 签名区域边框
  signatureButtonMarginLeft?: string // 底部按钮左间距
  signatureFooterMarginTop?: string // 底部操作区上间距
  signatureRadius?: string // 签名区域圆角
}

export type skeletonThemeVars = {
  skeletonAnimationFlashed?: string // 闪烁动画高亮色
  skeletonAnimationFlashedOpacity?: string // 闪烁动画透明度
  skeletonAnimationGradient?: string // 渐变动画高亮色
  skeletonCircleBorderRadius?: string // 圆形占位圆角
  skeletonCircleHeight?: string // 圆形占位尺寸
  skeletonColBg?: string // 占位块背景色
  skeletonRectBorderRadius?: string // 矩形占位圆角
  skeletonRectHeight?: string // 矩形占位高度
  skeletonRowMarginBottom?: string // 行间距
  skeletonTextBorderRadius?: string // 文本占位圆角
  skeletonTextHeight?: string // 文本占位高度
}

export type sliderThemeVars = {
  sliderBarBg?: string
  sliderBarHeight?: string
  sliderBarHeightCapsule?: string
  sliderBarHeightVertical?: string
  sliderBarRadius?: string
  sliderCapsuleTrackInset?: string
  sliderDotBg?: string
  sliderDotPopoverArrowHeight?: string
  sliderDotPopoverArrowWidth?: string
  sliderDotPopoverBg?: string
  sliderDotPopoverColor?: string
  sliderDotPopoverDurationEnter?: string
  sliderDotPopoverDurationExit?: string
  sliderDotPopoverEasingEnter?: string
  sliderDotPopoverEasingExit?: string
  sliderDotPopoverFontSize?: string
  sliderDotPopoverGap?: string
  sliderDotPopoverLineHeight?: string
  sliderDotPopoverPadding?: string
  sliderDotPopoverRadius?: string
  sliderDotShadow?: string
  sliderDotSize?: string
  sliderExtremeSpacing?: string
  sliderLineBg?: string
  sliderLineHeight?: string
  sliderLineHeightCapsule?: string
  sliderMarksDescCapsuleSpacing?: string
  sliderMarksDescSpacing?: string
  sliderMarksExtraCapsulePadding?: string
  sliderMarksExtraPadding?: string
  sliderOpacityDisabled?: string
  sliderScaleBg?: string
  sliderScaleBgActive?: string
  sliderScaleBorderRadius?: string
  sliderScaleCapsuleBg?: string
  sliderScaleCapsuleBorderRadius?: string
  sliderScaleCapsuleWidth?: string
  sliderScaleDescColor?: string
  sliderScaleDescFontSize?: string
  sliderScaleDescLineHeight?: string
  sliderScaleDescSpacing?: string
  sliderScaleSize?: string
  sliderValueColor?: string
  sliderValueFontSize?: string
}

export type slideVerifyThemeVars = {
  slideVerifyBg?: string // 组件背景色
  slideVerifyButtonBg?: string // 滑块背景色
  slideVerifyButtonBorderColor?: string // 滑块边框颜色
  slideVerifyButtonColor?: string // 滑块图标颜色
  slideVerifyButtonShadow?: string // 滑块阴影色
  slideVerifyButtonSize?: string // 滑块尺寸
  slideVerifyButtonSuccessColor?: string // 滑块图标成功态颜色
  slideVerifyDisabledOpacity?: string // 禁用态透明度
  slideVerifyHeight?: string // 组件高度
  slideVerifyRadius?: string // 圆角
  slideVerifySuccessIconSize?: string // 滑块图标尺寸
  slideVerifySuccessTextColor?: string // 成功态文字颜色
  slideVerifyTextColor?: string // 提示文字颜色
  slideVerifyTextFontSize?: string // 提示文字字号
  slideVerifyTextLineHeight?: string // 提示文字行高
  slideVerifyTrackBg?: string // 成功态track背景色
  slideVerifyWidth?: string // 组件宽度
}

export type sortButtonThemeVars = {
  sortButtonArrowIconSize?: string // 箭头图标尺寸
  sortButtonColor?: string // 文字颜色
  sortButtonColorActive?: string // 文字激活颜色
  sortButtonFontWeightActive?: string // 文字激活字重
  sortButtonHeight?: string // 组件高度
  sortButtonIconColor?: string // 图标颜色
  sortButtonIconColorActive?: string // 图标激活颜色
  sortButtonLineBottom?: string // 下划线底部距离
  sortButtonLineColor?: string // 下划线颜色
  sortButtonLineHeight?: string // 下划线高度
  sortButtonLineWidth?: string // 下划线宽度
  sortButtonRightSize?: string // 右侧区域尺寸
  sortButtonRightSpacingLeft?: string // 右侧区域左间距
  sortButtonSortSpacing?: string // 排序图标纵向间距
  sortButtonTextFontSize?: string // 文字字号
  sortButtonTextLineHeight?: string // 文字行高
}

export type stepThemeVars = {
  stepCircleBg?: string // 等待 (wait) 状态下圆形指示器的背景色
  stepCircleBorderRadius?: string // 圆形指示器的圆角大小
  stepCircleIconSize?: string // 圆形指示器内置状态图标 (如完成时的对号或错误时的叉号) 的字号大小
  stepCircleTextColor?: string // 等待状态或默认状态下圆形指示器内文本颜色
  stepCircleTextFinishedColor?: string // 已完成状态下圆形指示器内文本颜色
  stepCircleTextFontSize?: string // 圆形指示器内部文本的字号
  stepCircleTextFontWeight?: string // 圆形指示器内部文本的字重
  stepCircleTextLineHeight?: string // 圆形指示器内部文本的行高
  stepCircleTextProcessColor?: string // 进行中状态下圆形指示器内文本颜色
  stepContentMarginTop?: string // 内容区距头部的顶部外边距
  stepDescriptionColor?: string // 描述文本颜色
  stepDescriptionFontSize?: string // 描述文本字号大小
  stepDescriptionFontWeight?: string // 描述文本字重
  stepDescriptionLineHeight?: string // 描述文本行高
  stepDescriptionMarginTop?: string // 描述文本距标题的距离
  stepDescriptionPadding?: string // 描述文本的内边距
  stepDotErrorBg?: string // 错误 (error) 状态下点状指示器的背景色
  stepDotFinishedBg?: string // 已完成 (finished) 状态下点状指示器的背景色
  stepDotFinishedBorderColor?: string // 已完成 (finished) 状态下点状指示器的描边颜色
  stepDotProcessBg?: string // 进行中 (process) 状态下点状指示器的背景色
  stepDotProcessBorderColor?: string // 进行中 (process) 状态下点状指示器的描边颜色
  stepDotSize?: string // 点状指示器的宽高尺寸
  stepDotWaitBg?: string // 等待 (wait) 状态下点状指示器的背景色
  stepErrorBg?: string // 错误 (error) 状态下圆形指示器的背景色
  stepErrorColor?: string // 错误状态整体的主色调（纯白文本场景下等使用）
  stepFinishedBg?: string // 已完成 (finished) 状态下圆形指示器的背景色
  stepIconColor?: string // 等待或默认状态下图标的颜色
  stepIconColorActive?: string // 激活 (如 process 或 finished) 状态下图标的颜色
  stepIconErrorColor?: string // 错误 (error) 状态下图标的颜色
  stepIconSize?: string // 外部自定义传入的图标 (通过 icon 属性) 的字号大小
  stepInactiveColor?: string // 未激活部分的占位文本颜色
  stepIndicatorSize?: string // 圆形指示器的宽高尺寸
  stepLineActiveColor?: string // 激活 (完成状态) 下连接线的颜色
  stepLineColor?: string // 连接线的默认底色 (对应未激活的线段)
  stepLineSpacing?: string // 连接线与两侧指示器之间的间距
  stepProcessBg?: string // 进行中 (process) 状态下圆形指示器的背景色
  stepTitleColor?: string // 等待与完成状态下标题的颜色
  stepTitleColorActive?: string // 进行中状态下标题的激活颜色
  stepTitleErrorColor?: string // 错误状态下标题的颜色
  stepTitleFontSize?: string // 标题文本字号大小
  stepTitleFontWeight?: string // 标题文本字重
  stepTitleLineHeight?: string // 标题文本行高
  stepVerticalContentMarginLeft?: string // 垂直布局时内容区的左外边距
  stepVerticalContentPaddingBottom?: string // 垂直布局时内容区的底部内边距
  stepVerticalHeaderDotTop?: string // 垂直布局且为点状指示器时，头部的顶部绝对定位距离
}

export type swiperNavThemeVars = {
  swiperNavBtnBg?: string // 按钮背景色
  swiperNavBtnBorderRadius?: string // 按钮圆角
  swiperNavBtnColor?: string // 按钮图标颜色
  swiperNavBtnIconSize?: string // 按钮图标尺寸
  swiperNavBtnSize?: string // 按钮尺寸
  swiperNavBtnSpacing?: string // 按钮水平间距
  swiperNavDotBorderRadius?: string // dot 圆角
  swiperNavDotColor?: string // dot 颜色
  swiperNavDotColorActive?: string // dot 激活颜色
  swiperNavDotMargin?: string // dot 间距
  swiperNavDotsBarWidthActive?: string // dots-bar 激活宽度
  swiperNavDotSize?: string // dot 尺寸
  swiperNavFractionBg?: string // 分数模式背景色
  swiperNavFractionBorderRadius?: string // 分数模式圆角
  swiperNavFractionColor?: string // 分数模式文字颜色
  swiperNavFractionFontSize?: string // 分数模式字号
  swiperNavFractionLineHeight?: string // 分数模式行高
  swiperNavFractionPadding?: string // 分数模式内边距
  swiperNavSpacing?: string // 导航定位间距
}

export type swiperThemeVars = {
  swiperBorderRadius?: string // 轮播容器圆角
  swiperItemPadding?: string // 轮播项内边距
  swiperItemTextColor?: string // 轮播文案颜色
  swiperItemTextFontSize?: string // 轮播文案字号
  swiperItemTextSpacing?: string // 轮播文案定位间距
}

export type switchThemeVars = {
  switchColorActionBg?: string // 操作块背景色
  switchColorActionIcon?: string // 操作块图标颜色
  switchColorActiveBg?: string // 激活态背景色
  switchColorActiveIcon?: string // 内部图标激活态颜色
  switchColorInactiveBg?: string // 非激活态背景色
  switchColorInactiveIcon?: string // 非激活态图标颜色
  switchColorInnerActiveText?: string // 内部文案激活态颜色
  switchColorInnerInactiveText?: string // 内部文案非激活态颜色
  switchDisabled?: string // 禁用态透明度
  switchInnerFontSize?: string // 内部文案字号
  switchLeftRightPadding?: string // 水平内边距
  switchRadius?: string // 方角模式圆角
  switchRadiusAction?: string // 方角模式操作块圆角
  switchRadiusActionFull?: string // 圆角模式操作块圆角
  switchRadiusFull?: string // 圆角模式圆角
  switchSize?: string // 组件尺寸
  switchSizeActionHeight?: string // 操作块高度
  switchSizeActionIcon?: string // 操作块图标尺寸
  switchSizeActionWidth?: string // 操作块宽度
  switchSizeIcon?: string // 内部图标尺寸
  switchSizeInnerHeight?: string // 内部容器高度
  switchSizeInnerMinWidth?: string // 内部容器最小宽度
  switchSpacing?: string // 图标与文案间距
  switchTopBottomPadding?: string // 垂直内边距
  switchTransitionDuration?: string // 过渡时长
}

export type tabbarItemThemeVars = {
  tabbarItemColorActive?: string // 激活态颜色（文字和图标）
  tabbarItemColorInactive?: string // 非激活态颜色（文字和图标）
  tabbarItemIconSize?: string // 图标大小
  tabbarItemTitleFontSize?: string // 标题文字大小
  tabbarItemTitleLineHeight?: string // 标题文字行高
}

export type tabbarThemeVars = {
  tabbarBg?: string // 背景色
  tabbarHeight?: string // 高度
  tabbarRoundMarginHorizontal?: string // round 变体水平外边距
  tabbarRoundRadius?: string // round 变体圆角
  tabbarZIndex?: string // 固定定位层级
}

export type tableThemeVars = {
  tableBg?: string // 表格背景色
  tableBorderColor?: string // 边框颜色
  tableBorderWidth?: string // 边框宽度
  tableCellFontSize?: string // 单元格字号
  tableCellLineHeight?: string // 单元格行高
  tableCellPadding?: string // 单元格内边距
  tableColor?: string // 表格文字颜色
  tableShadowGradient?: string // 固定列阴影渐变背景
  tableSortButtonHeight?: string // 排序按钮高度
  tableStripeBg?: string // 斑马纹背景色
}

export type tabsThemeVars = {
  tabsDuration?: string // 过渡时长
  tabsMapArrowColor?: string // 地图模式箭头颜色
  tabsMapArrowSize?: string // 地图模式箭头尺寸
  tabsMapBodyBg?: string // 地图模式内容背景色
  tabsMapBodyPadding?: string // 地图模式内容内边距
  tabsMapBtnBeforeBg?: string // 地图模式按钮前景渐变背景
  tabsMapBtnHeight?: string // 地图模式按钮高度
  tabsMapBtnWidth?: string // 地图模式按钮宽度
  tabsMapColor?: string // 地图模式通用文字颜色
  tabsMapHeaderFontSize?: string // 地图模式头部字号
  tabsMapHeaderLineHeight?: string // 地图模式头部行高
  tabsMapHeaderPadding?: string // 地图模式头部内边距
  tabsMapModalBg?: string // 地图模式遮罩背景
  tabsMapNavBtnBg?: string // 地图模式导航按钮背景
  tabsMapNavBtnColor?: string // 地图模式导航按钮文字颜色
  tabsMapNavBtnDisabledOpacity?: string // 地图模式导航按钮禁用透明度
  tabsMapNavBtnFontSize?: string // 地图模式导航按钮字号
  tabsMapNavBtnGap?: string // 地图模式导航按钮间距
  tabsMapNavBtnLineHeight?: string // 地图模式导航按钮行高
  tabsMapNavBtnPadding?: string // 地图模式导航按钮内边距
  tabsMapNavBtnRadius?: string // 地图模式导航按钮圆角
  tabsNavBg?: string // 导航背景色
  tabsNavColor?: string // 导航文字颜色
  tabsNavColorActive?: string // 导航激活文字颜色
  tabsNavColorDisabled?: string // 导航禁用文字颜色
  tabsNavFontWeightActive?: string // 导航激活文字字重
  tabsNavItemFontSize?: string // 导航项字号
  tabsNavItemLineHeight?: string // 导航项行高
  tabsNavItemPadding?: string // 导航项内边距
  tabsNavLineBg?: string // 导航线背景色
  tabsNavLineBottom?: string // 导航线底部偏移
  tabsNavLineHeight?: string // 导航线高度
  tabsNavLineWidth?: string // 导航线宽度
  tabsNavStickyWidth?: string // 导航吸顶宽度
}

export type tagThemeVars = {
  tagColor?: string // 基础文字颜色
  tagCyanBg?: string // 青色背景
  tagCyanColor?: string // 青色文字颜色
  tagCyanLightBg?: string // 青色浅色背景
  tagDangerBg?: string // 危险色背景
  tagDangerColor?: string // 危险色文字颜色
  tagDangerLightBg?: string // 危险色浅色背景
  tagDefaultFontSize?: string // 默认尺寸字号
  tagDefaultIconSize?: string // 默认尺寸图标尺寸
  tagDefaultLineHeight?: string // 默认尺寸行高
  tagDefaultPadding?: string // 默认尺寸内边距
  tagDefaultRoundPadding?: string // 默认尺寸圆角态内边距
  tagExtraLargeFontSize?: string // 超大尺寸字号
  tagExtraLargeIconSize?: string // 超大尺寸图标尺寸
  tagExtraLargeLineHeight?: string // 超大尺寸行高
  tagExtraLargePadding?: string // 超大尺寸内边距
  tagExtraLargeRoundPadding?: string // 超大尺寸圆角态内边距
  tagFontSize?: string // 基础字号
  tagIconSpacing?: string // 图标间距
  tagInfoBg?: string // 默认信息色背景
  tagInfoColor?: string // 默认信息色文字颜色
  tagInfoLightBg?: string // 默认信息色浅色背景
  tagInputWidth?: string // 输入态宽度
  tagLargeFontSize?: string // 大尺寸字号
  tagLargeIconSize?: string // 大尺寸图标尺寸
  tagLargeLineHeight?: string // 大尺寸行高
  tagLargePadding?: string // 大尺寸内边距
  tagLargeRoundPadding?: string // 大尺寸圆角态内边距
  tagLightblueBg?: string // 亮蓝色背景
  tagLightblueColor?: string // 亮蓝色文字颜色
  tagLightblueLightBg?: string // 亮蓝色浅色背景
  tagMarkRadius?: string // 标记标签圆角
  tagMediumFontSize?: string // 中尺寸字号
  tagMediumIconSize?: string // 中尺寸图标尺寸
  tagMediumLineHeight?: string // 中尺寸行高
  tagMediumPadding?: string // 中尺寸内边距
  tagMediumRoundPadding?: string // 中尺寸圆角态内边距
  tagPinkBg?: string // 粉色背景
  tagPinkColor?: string // 粉色文字颜色
  tagPinkLightBg?: string // 粉色浅色背景
  tagPrimaryBg?: string // 主色背景
  tagPrimaryColor?: string // 主色文字颜色
  tagPrimaryLightBg?: string // 主色浅色背景
  tagPurpleBg?: string // 紫色背景
  tagPurpleColor?: string // 紫色文字颜色
  tagPurpleLightBg?: string // 紫色浅色背景
  tagRadius?: string // 默认圆角
  tagRoundRadius?: string // 圆角标签圆角
  tagSmallFontSize?: string // 小尺寸字号
  tagSmallIconSize?: string // 小尺寸图标尺寸
  tagSmallLineHeight?: string // 小尺寸行高
  tagSmallPadding?: string // 小尺寸内边距
  tagSmallRoundPadding?: string // 小尺寸圆角态内边距
  tagSuccessBg?: string // 成功色背景
  tagSuccessColor?: string // 成功色文字颜色
  tagSuccessLightBg?: string // 成功色浅色背景
  tagVolcanoBg?: string // 橘火色背景
  tagVolcanoColor?: string // 橘火色文字颜色
  tagVolcanoLightBg?: string // 橘火色浅色背景
  tagWarningBg?: string // 警告色背景
  tagWarningColor?: string // 警告色文字颜色
  tagWarningLightBg?: string // 警告色浅色背景
}

export type textareaThemeVars = {
  textareaBg?: string // 文本域背景色
  textareaCountColor?: string // 字数统计颜色
  textareaCountFontSize?: string // 字数统计字号
  textareaCountLineHeight?: string // 字数统计行高
  textareaDisabledColor?: string // 禁用态颜色
  textareaErrorColor?: string // 错误颜色
  textareaIconColor?: string // 图标颜色
  textareaIconFontSize?: string // 图标字号
  textareaIconMargin?: string // 图标间距
  textareaInnerColor?: string // 文本域文字颜色
  textareaInnerFontSize?: string // 文本域字号
  textareaInnerLineHeight?: string // 文本域行高
  textareaInnerMinHeight?: string // 文本域最小高度
  textareaInnerPlaceholderColor?: string // 占位符颜色
  textareaPadding?: string // 文本域内边距
}

export type textThemeVars = {
  textDefaultColor?: string // 默认文字颜色
  textErrorColor?: string // 错误文字颜色
  textFontSize?: string // 默认文字字号
  textLineHeight?: string // 默认文字行高
  textPrimaryColor?: string // 主色文字颜色
  textSuccessColor?: string // 成功文字颜色
  textWarningColor?: string // 警告文字颜色
}

export type toastThemeVars = {
  toastBg?: string // 背景色
  toastBorderRadius?: string // 圆角大小
  toastColor?: string // 文字颜色
  toastFontSize?: string // 字号
  toastIconMarginBottom?: string // 图标下边距
  toastIconSize?: string // 图标大小
  toastLineHeight?: string // 行高
  toastLoadingMarginBottom?: string // loading 动画的 margin-bottom
  toastLoadingPadding?: string // loading 状态下的 padding
  toastMaxWidth?: string // 最大宽度
  toastMsgMarginLeft?: string // 消息内容左边距
  toastPadding?: string // 内边距
}

export type tooltipThemeVars = {
  tooltipArrowBoxShadow?: string // 箭头阴影效果
  tooltipArrowSize?: string // 箭头大小
  tooltipBg?: string // 背景色
  tooltipBoxShadow?: string // 阴影效果
  tooltipCloseIconColor?: string // 关闭按钮颜色
  tooltipCloseIconPadding?: string // 关闭按钮内边距
  tooltipCloseIconSize?: string // 关闭按钮大小
  tooltipColor?: string // 文字颜色
  tooltipFontSize?: string // 字号
  tooltipLineHeight?: string // 行高
  tooltipPadding?: string // 内边距
  tooltipRadius?: string // 圆角大小
  tooltipZIndex?: string // 层级
}

export type tourThemeVars = {
  tourAnimationDuration?: string // 动画时长
  tourButtonsMarginTop?: string // 操作区域上边距
  tourHighlightAnimationTiming?: string // 高亮动画时间函数
  tourHighlightShadowColor?: string // 高亮区域阴影颜色
  tourInfoColor?: string // 信息框文字颜色
  tourInfoFontSize?: string // 信息框字号
  tourInfoLineHeight?: string // 信息框行高
  tourPopoverBg?: string // 弹层背景色
  tourPopoverMaxWidth?: string // 弹层最大宽度
  tourPopoverMinWidth?: string // 弹层最小宽度
  tourPopoverPadding?: string // 弹层内边距
  tourPopoverRadius?: string // 弹层圆角
  tourPopoverZIndex?: string // 弹层层级
  tourZIndex?: string // 层级
}

export type uploadThemeVars = {
  uploadBorderColor?: string // 上传项边框颜色
  uploadCloseBg?: string // 关闭按钮背景色
  uploadCloseIconColor?: string // 关闭按钮图标颜色
  uploadCloseIconSize?: string // 关闭按钮图标尺寸
  uploadClosePadding?: string // 关闭按钮内边距
  uploadCloseRadius?: string // 关闭按钮圆角
  uploadCoverIconSize?: string // 视频/文件图标尺寸
  uploadEvokeBg?: string // 唤起项背景色
  uploadEvokeColor?: string // 唤起项文字颜色
  uploadEvokeColorDisabled?: string // 唤起项禁用文字颜色
  uploadEvokeFontSize?: string // 唤起项文字大小
  uploadEvokeIconColor?: string // 唤起项图标颜色
  uploadEvokeIconColorDisabled?: string // 唤起项禁用图标颜色
  uploadEvokeIconSize?: string // 唤起项的图标大小
  uploadEvokeLineHeight?: string // 唤起项文字行高
  uploadFileColor?: string // 文件名文字颜色
  uploadFileFontSize?: string // 文件名文字字号
  uploadFileLineHeight?: string // 文件名文字行高
  uploadFilePadding?: string // 文件/视频名称内边距
  uploadMaskBg?: string // 遮罩层背景色
  uploadPreviewIconColor?: string // 预览态内部图标颜色
  uploadPreviewIconSize?: string // 预览态内部图标尺寸
  uploadPreviewMargin?: string // 预览项外边距
  uploadProgressColor?: string // 进度文字颜色
  uploadProgressFontSize?: string // 进度文字字号
  uploadProgressLineHeight?: string // 进度文字行高
  uploadRadius?: string // 上传项圆角
  uploadRowSpacing?: string // 上传项行间距
  uploadSize?: string // 上传项尺寸
  uploadVideoIconColor?: string // 视频播放图标颜色
  uploadVideoIconSize?: string // 视频图标尺寸
}

export type videoPreviewThemeVars = {
  videoPreviewBg?: string // 预览背景色
  videoPreviewCloseColor?: string // 关闭图标颜色
  videoPreviewCloseMargin?: string // 关闭按钮外边距
  videoPreviewCloseSize?: string // 关闭图标尺寸
  videoPreviewCloseZIndex?: string // 关闭按钮层级
  videoPreviewVideoHeight?: string // 视频预览区域高度
  videoPreviewZIndex?: string // 预览层级
}

export type watermarkThemeVars = {
  watermarkOpacity?: string // 水印透明度
}

export type ConfigProviderThemeVars = baseThemeVars &
  actionSheetThemeVars &
  avatarThemeVars &
  backtopThemeVars &
  badgeThemeVars &
  buttonThemeVars &
  calendarThemeVars &
  calendarViewThemeVars &
  cardThemeVars &
  cascaderThemeVars &
  cellGroupThemeVars &
  cellThemeVars &
  checkboxThemeVars &
  circleThemeVars &
  collapseItemThemeVars &
  collapseThemeVars &
  countDownThemeVars &
  countToThemeVars &
  curtainThemeVars &
  datetimePickerThemeVars &
  dialogThemeVars &
  dividerThemeVars &
  dropMenuItemThemeVars &
  dropMenuThemeVars &
  emptyThemeVars &
  fabThemeVars &
  floatingPanelThemeVars &
  formItemThemeVars &
  gridItemThemeVars &
  iconThemeVars &
  imagePreviewThemeVars &
  imgCropperThemeVars &
  imgThemeVars &
  indexAnchorThemeVars &
  indexBarThemeVars &
  inputNumberThemeVars &
  keyboardThemeVars &
  loadingThemeVars &
  loadmoreThemeVars &
  navbarCapsuleThemeVars &
  navbarThemeVars &
  noticeBarThemeVars &
  notifyThemeVars &
  overlayThemeVars &
  paginationThemeVars &
  passwordInputThemeVars &
  pickerThemeVars &
  pickerViewThemeVars &
  popoverThemeVars &
  popupThemeVars &
  progressThemeVars &
  radioThemeVars &
  rateThemeVars &
  resizeThemeVars &
  searchThemeVars &
  segmentedThemeVars &
  selectPickerThemeVars &
  sidebarItemThemeVars &
  sidebarThemeVars &
  signatureThemeVars &
  skeletonThemeVars &
  sliderThemeVars &
  slideVerifyThemeVars &
  sortButtonThemeVars &
  stepThemeVars &
  swiperNavThemeVars &
  swiperThemeVars &
  switchThemeVars &
  tabbarItemThemeVars &
  tabbarThemeVars &
  tableThemeVars &
  tabsThemeVars &
  tagThemeVars &
  textareaThemeVars &
  textThemeVars &
  toastThemeVars &
  tooltipThemeVars &
  tourThemeVars &
  uploadThemeVars &
  videoPreviewThemeVars &
  watermarkThemeVars
