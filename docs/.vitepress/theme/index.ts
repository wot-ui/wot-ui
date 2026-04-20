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
    urls: ['https://sponsor.wot-ui.cn', 'https://wot-sponsors.pages.dev']
  },
  friendly: {
    urls: ['https://sponsor.wot-ui.cn/friendly.json', 'https://wot-sponsors.pages.dev/friendly.json']
  },
  cases: {
    urls: ['https://sponsor.wot-ui.cn', 'https://wot-sponsors.pages.dev']
  }
})
