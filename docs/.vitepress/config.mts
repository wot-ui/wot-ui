import { fileURLToPath, URL } from 'node:url'
import { createWotVitePressConfig } from '@wot-ui/vitepress-theme/config'
import enUS from './locales/en-US'
import zhCN from './locales/zh-CN'
export default createWotVitePressConfig({
  title: `Wot UI`,
  description: '一个轻量、美观、AI友好的 uni-app 组件库',
  markdown: {
    componentLinks: {
      repoUrl: 'https://github.com/wot-ui/wot-ui/tree/master',
      demoSourceRoot: 'src/subPages',
      componentSourceRoot: 'src/uni_modules/wot-ui/components',
    },
    scssVars: {
      componentScssRoot: fileURLToPath(new URL('../../src/uni_modules/wot-ui/components', import.meta.url)),
      componentMap: {
        table: ['wd-table', 'wd-table-column'],
        radio: ['wd-radio', 'wd-radio-group'],
        checkbox: ['wd-checkbox', 'wd-checkbox-group'],
        collapse: ['wd-collapse', 'wd-collapse-item'],
        'swipe-action': ['wd-swipe-action', 'wd-swipe-action-item'],
        grid: ['wd-grid', 'wd-grid-item'],
        tabs: ['wd-tabs', 'wd-tab'],
        steps: ['wd-steps', 'wd-step'],
        sidebar: ['wd-sidebar', 'wd-sidebar-item'],
        'index-bar': ['wd-index-bar', 'wd-index-anchor'],
        form: ['wd-form', 'wd-form-item']
      }
    },
    versionBadge: true,
    virtualVersionData: {
      docsRoot: fileURLToPath(new URL('../', import.meta.url)),
    }
  },
  features: {
    llms: {
      ignoreFiles: ['reward/*', 'index.md', 'README.md', 'en-US/*.md', 'en-US/**/*.md', 'ads/*', 'guide/cases.md', 'guide/changelog.md', 'guide/join-group.md', 'guide/typography.md'],
      domain: 'https://v2.wot-ui.cn',
    },
    compression: {},
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      ...zhCN
    },
    'en-US': {
      label: 'English',
      lang: 'en-US',
      ...enUS,
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'algolia-site-verification', content: '2E05BE38F4B83874' }],
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?c77588a5308ea5813c1d46bdd849338b";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `]
  ],
  themeConfig: {
    logo: '/logo.svg',
    lastUpdated: {
      text: '最后更新'
    },
    editLink: {
      pattern: 'https://github.com/wot-ui/wot-ui/edit/master/docs/:path',
      text: '为此页提供修改建议',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wot-ui/wot-ui' },
      { icon: { svg: '<svg t="1694688365239" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4048" width="200" height="200"><path d="M980.79827 694.105946c-21.144216-122.796973-109.844757-203.250162-109.844757-203.250162 12.647784-111.477622-33.792-131.26573-33.792-131.26573C827.392 14.668108 530.985514 20.67373 524.730811 20.839784 518.476108 20.67373 222.01427 14.668108 212.300108 359.590054c0 0-46.467459 19.788108-33.819676 131.26573 0 0-88.700541 80.453189-109.817081 203.250162 0 0-11.291676 207.484541 101.403676 25.40627 0 0 25.350919 69.161514 71.790703 131.26573 0 0-83.082378 28.256865-75.997405 101.625081 0 0-2.87827 81.836973 177.401081 76.218811 0 0 126.699243-9.852541 164.753297-63.515676l16.605405 0 0.276757 0 16.633081 0c38.026378 53.635459 164.725622 63.515676 164.725622 63.515676 180.224 5.618162 177.401081-76.218811 177.401081-76.218811 7.029622-73.368216-75.997405-101.625081-75.997405-101.625081 46.439784-62.104216 71.790703-131.26573 71.790703-131.26573C992.034595 901.590486 980.79827 694.105946 980.79827 694.105946z" p-id="4049" fill="#6D6D72"></path></svg>' }, link: "/guide/join-group", ariaLabel: 'QQ' },
      { icon: { svg: '<svg t="1758594913114" class="icon" viewBox="0 0 1316 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5329" width="200" height="200"><path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" fill="#1E80FF" p-id="5330"></path></svg>' }, link: 'https://juejin.cn/user/26044011388510/posts' },
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: '0SV8187ZET',
        apiKey: 'd39f1fde160c651c475f13225c0bf205',
        indexName: 'wot-ui-v2',
      },
    },

    footer: {
      message: `Released under the MIT License.`,
      copyright: 'Copyright © 2023-present Wot UI Team',
    },
  },

})
