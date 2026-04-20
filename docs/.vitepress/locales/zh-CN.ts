import { defineConfig } from 'vitepress'
import { getDocsComponentNavItems, getDocsComponentSidebar } from '../../../src/config/component-catalog'
import packageJson from '../../../package.json'

const componentNavItems = getDocsComponentNavItems('zh-CN')
const componentSidebar = getDocsComponentSidebar('zh-CN')
const guideGroups = [
  {
    text: '基础',
    items: [
      {
        text: '介绍',
        link: '/guide/introduction',
      },
      {
        text: '设计',
        link: '/guide/design',
      },
      {
        text: '快速上手',
        link: '/guide/quick-use',
      }
    ]
  },
  {
    text: '开发',
    items: [
      {
        text: '定制主题',
        link: '/guide/custom-theme',
      },
      {
        text: '样式覆盖',
        link: '/guide/custom-style',
      },
      {
        text: '深色模式',
        link: '/guide/dark-mode',
      },
      {
        text: '国际化',
        link: '/guide/locale',
      },
      {
        text:'UnoCSS Preset',
        link:'/guide/unocss-preset'
      },
      // {
      //   text: '脚手架',
      //   link: '/guide/cli',
      // },
      {
        text: '模板',
        link: '/guide/templates',
      },
      {
        text: '常见问题',
        link: '/guide/common-problems',
      }
    ]
  },
  {
    text: 'AI',
    items: [
      {
        text: 'LLMs.txt',
        link: '/guide/llms-txt',
      },
      {
        text: 'CLI',
        link: '/guide/open-wot',
      },
      {
        text: 'Skills',
        link: '/guide/skills',
      }
    ]
  },
  {
    text: '社区',
    items: [
      {
        text: '案例',
        link: '/guide/cases',
      },
      {
        text: '更新日志',
        link: '/guide/changelog',
      },
      {
        text: '加群沟通',
        link: '/guide/join-group',
      }
    ]
  }
]
const ecosystemNavItems = [
  {
    text: '官方生态',
    items: [
      { text: 'wot-starter', link: 'https://starter.wot-ui.cn/' },
      { text: '@wot-ui/router', link: 'https://my-uni.wot-ui.cn/' },
      { text: '@wot-ui/cli', link: 'https://github.com/wot-ui/open-wot' },
      { text: '@wot-ui/unocss-preset', link: 'https://github.com/wot-ui/unocss-preset' },
      { text: 'VS Code 插件', link: 'https://marketplace.visualstudio.com/items?itemName=wot-ui.wot-ui-intellisense' },
      { text: '小程序 CI 工具', link: 'https://github.com/Moonofweisheng/uni-mini-ci' },
      { text: 'wot-starter-retail', link: 'https://github.com/wot-ui/wot-starter-retail' },
    ]
  },
  {
    text: '开发资源',
    items: [
      { text: 'Uni Helper', link: 'https://uni-helper.js.org/' },
      { text: 'uni-ku', link: 'https://github.com/uni-ku' },
    ]
  },
  {
    text: '模板方案',
    items: [
      { text: 'vitesse-uni-app', link: 'https://vitesse-docs.netlify.app/' },
      { text: 'unibest', link: 'https://unibest.tech/' },
    ]
  }
]
const supportNavItems = [
  { text: '🥤一杯咖啡', link: '/reward/reward' },
  { text: '成为赞助者', link: '/reward/sponsor' },
  { text: '关于作者', link: 'https://blog.wot-ui.cn/about' },
]

const versionNavItems = [
  { text: 'v1', link: 'https://wot-ui.cn' },
  { text: '更新日志', link: '/guide/changelog.html' },
]

export default defineConfig({
  lang: 'zh-CN',
  description: '一个轻量、美观、AI友好的 uni-app 组件库',
  themeConfig: {
    lastUpdated: {
      text: '最后更新'
    },
    editLink: {
      pattern: 'https://github.com/wot-ui/wot-ui/edit/master/docs/:path',
      text: '为此页提供修改建议'
    },
    nav: [
      {
        text: '指南',
        activeMatch: '/guide/',
        items: guideGroups
      },
      {
        text: '组件',
        activeMatch: '/component/',
        items: componentNavItems
      },
      {
        text: '生态',
        items: ecosystemNavItems
      },
      {
        text: '支持',
        activeMatch: '/reward/',
        items: supportNavItems
      },
      {
        text: packageJson.version,
        items: versionNavItems
      },
    ],
    sidebar: {
      '/guide/': guideGroups,
      '/reward/': [
        {
          text: '🥤一杯咖啡',
          link: '/reward/reward',
        },
        {
          text: '榜上有名',
          link: '/reward/donor',
        },
        {
          text: '成为赞助者',
          link: '/reward/sponsor',
        },
      ],
      '/component/': componentSidebar
    }
  }
})
