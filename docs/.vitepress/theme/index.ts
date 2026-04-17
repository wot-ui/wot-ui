import type { Theme, EnhanceAppContext } from 'vitepress'
import DefaultTheme, { VPBadge } from 'vitepress/theme'
import './styles/vars.css'
import './styles/custom.css'

import Layout from './Layout.vue'
import SvgImage from './components/SvgImage.vue'
import ExternalLink from './components/ExternalLink.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// 声明百度统计全局变量
declare global {
  interface Window {
    _hmt: any[]
  }
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('SvgImage', SvgImage)
    app.component('ExternalLink',ExternalLink)
    app.component('Badge',VPBadge)
    app.use(ElementPlus as any)
    
    if (typeof window !== 'undefined') {
      
      // 百度统计路由监听
      // 确保百度统计已加载
      const trackPageView = (path: string) => {
        if (window._hmt) {
          window._hmt.push(['_trackPageview', path])
        }
      }
      
      // 监听路由变化
      router.onAfterRouteChange = (to: string) => {
        // 延迟执行，确保页面已完全加载
        setTimeout(() => {
          trackPageView(to)
        }, 100)
      }
    }
  },
} satisfies Theme
