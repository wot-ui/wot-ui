/*
 * @Author: weisheng
 * @Date: 2025-12-30
 * @LastEditTime: 2026-01-16 14:11:54
 * @LastEditors: weisheng
 * @Description: AvatarGroup 头像组类型定义
 * @FilePath: /wot-design-uni/src/uni_modules/wot-ui/components/wd-avatar-group/types.ts
 * 记得注释
 */
import type { ExtractPropTypes, PropType } from 'vue'
import type { InjectionKey } from 'vue'
import { baseProps, makeStringProp, makeNumericProp } from '../../common/props'
import type { AvatarShape, AvatarSize } from '../wd-avatar/types'

export type AvatarGroupCascadingValue = 'left-up' | 'right-up'

export type AvatarGroupProvide = {
  props: AvatarGroupProps
}

export const AVATAR_GROUP_KEY: InjectionKey<AvatarGroupProvide> = Symbol('wd-avatar-group')

export const avatarGroupProps = {
  ...baseProps,

  /**
   * 最多显示的头像数量
   * 类型: string | number
   * 默认值: undefined
   */
  maxCount: Number,
  /**
   * 头像层叠方向
   * 可选值: left-up(左侧叠层) / right-up(右侧叠层)
   * 类型: string
   * 默认值: 'left-up'
   */
  cascading: makeStringProp<AvatarGroupCascadingValue>('left-up'),
  /**
   * 统一设置组内所有头像的形状
   * 类型: string
   */
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'round'
  },

  /**
   * 统一设置组内所有头像的尺寸，支持预设尺寸(large/medium/normal/small)或带单位的字符串(如 40px、100rpx)
   * 类型: string | number
   */
  size: {
    type: [String, Number] as PropType<string | number | AvatarSize>,
    default: 'normal'
  },
  /**
   * 超出最大数量时折叠头像显示的内容
   * 类型: string
   * 默认值: undefined
   */
  collapseAvatar: makeStringProp(''),
  /**
   * 是否垂直展示
   * 类型: boolean
   * 默认值: false
   */
  vertical: Boolean
}

export type AvatarGroupProps = ExtractPropTypes<typeof avatarGroupProps>
