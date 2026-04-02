import { defineConfig } from 'vitepress'
import { getDocsComponentNavItems, getDocsComponentSidebar } from '../../../src/config/component-catalog'

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
        text: '脚手架',
        link: '/guide/cli',
      },
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
        text: 'llms.txt',
        link: '/guide/llms-txt',
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
      { text: '官方模板 wot-starter', link: 'https://starter.wot-ui.cn/' },
      { text: '摸鱼插件', link: 'https://my-uni.wot-ui.cn/' },
      { text: 'VS Code 代码提示插件', link: 'https://marketplace.visualstudio.com/items?itemName=wot-ui.wot-ui-intellisense' },
      { text: 'wot-starter-retail', link: 'https://github.com/wot-ui/wot-starter-retail' },
    ]
  },
  {
    text: '模板方案',
    items: [
      { text: 'vitesse-uni-app', link: 'https://vitesse-docs.netlify.app/' },
      { text: 'unibest', link: 'https://unibest.tech/' },
    ]
  },
  {
    text: '开发资源',
    items: [
      { text: '多平台小程序 CI 工具', link: 'https://github.com/Moonofweisheng/uni-mini-ci' },
      { text: 'Uni Helper', link: 'https://uni-helper.js.org/' },
      { text: 'uni-ku', link: 'https://github.com/uni-ku' },
    ]
  }
]
const supportNavItems = [
  { text: '🥤一杯咖啡', link: '/reward/reward' },
  { text: '关于作者', link: 'https://blog.wot-ui.cn/about' },
]

export default defineConfig({
  lang: 'zh-CN',
  description: '一个轻量、美观、AI友好的 uni-app 组件库',
  themeConfig: {
    lastUpdated: {
      text: '最后更新'
    },
    editLink: {
      pattern: 'https://github.com/Moonofweisheng/wot-design-uni/edit/master/docs/:path',
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
