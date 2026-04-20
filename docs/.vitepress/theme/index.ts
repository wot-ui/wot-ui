/*
 * @Author: weisheng
 * @Date: 2026-04-20 16:40:00
 * @LastEditTime: 2026-04-20 18:28:25
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-ui/docs/.vitepress/theme/index.ts
 * 记得注释
 */
import { createWotVitePressTheme } from '@wot-ui/vitepress-theme'

export default createWotVitePressTheme({
  analytics: {
    trackBaiduRoute: true
  },
  demoIframe: {
    assetBase: '/wxqrcode'
  },
  banner: {
    urls: ['https://sponsor.wot-ui.cn/banner.json', 'https://wot-sponsors.pages.dev/banner.json']
  },
  sponsors: {
    urls: ['https://sponsor.wot-ui.cn/wot-design-uni.json', 'https://wot-sponsors.pages.dev/wot-design-uni.json']
  },
  ads: {
    wwadsId: '372',
    urls: ['https://sponsor.wot-ui.cn/ads.json', 'https://wot-sponsors.pages.dev/ads.json']
  },
  team: {
    urls: ['https://sponsor.wot-ui.cn/team.json', 'https://wot-sponsors.pages.dev/team.json']
  },
  friendly: {
    urls: ['https://sponsor.wot-ui.cn/friendly.json', 'https://wot-sponsors.pages.dev/friendly.json']
  },
  cases: {
    urls: ['https://sponsor.wot-ui.cn/cases.json', 'https://wot-sponsors.pages.dev/cases.json']
  },
  specialSponsor: {
    urls: ['https://sponsor.wot-ui.cn/sponsor.json', 'https://wot-sponsors.pages.dev/sponsor.json']
  }
})
