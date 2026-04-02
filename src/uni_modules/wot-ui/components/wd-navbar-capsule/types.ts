import type { ExtractPropTypes } from 'vue'
import { baseProps } from '../../common/props'

/**
 * 导航栏胶囊属性
 */
export const navbarCapsuleProps = {
  ...baseProps
}

export type NavbarCapsuleProps = ExtractPropTypes<typeof navbarCapsuleProps>
