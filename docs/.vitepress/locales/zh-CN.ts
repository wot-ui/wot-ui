import { defineConfig } from 'vitepress'
import { getDocsComponentNavItems, getDocsComponentSidebar } from '../../../src/config/component-catalog'
import packageJson from '../../../package.json'

const componentNavItems = getDocsComponentNavItems('zh-CN')
const componentSidebar = getDocsComponentSidebar('zh-CN')
const gettingStartedNavItems = [
  {
    text: '介绍',
    link: '/guide/introduction',
  },
  {
    text: '快速上手',
    link: '/guide/quick-use',
  },
  {
    text: '常见问题',
    link: '/guide/common-problems',
  }
]
const designSystemNavItems = [
  {
    text: '设计',
    link: '/guide/design',
  },
  {
    text: '定制主题',
    link: '/guide/custom-theme',
  },
  {
    text: '深色模式',
    link: '/guide/dark-mode',
  },
  {
    text: 'UnoCSS Preset',
    link: '/guide/unocss-preset',
  },
  {
    text: '样式覆盖',
    link: '/guide/custom-style',
  }
]
const aiNavItems = [
  {
    text: 'AI 总览',
    link: '/guide/ai',
  },
  {
    text: 'LLMs.txt',
    link: '/guide/llms-txt',
  },
  {
    text: '@wot-ui/cli',
    link: '/guide/open-wot',
  },
  {
    text: 'AI Skills',
    link: '/guide/skills',
  }
]
const engineeringNavItems = [
  {
    text: '国际化',
    link: '/guide/locale',
  },
  {
    text: '模板',
    link: '/guide/templates',
  },
  {
    text: '从 v1 迁移到 v2',
    link: '/guide/migration-v2',
  },
  {
    text: '更新日志',
    link: '/guide/changelog',
  }
]
const communityNavItems = [
  {
    text: '案例',
    link: '/guide/cases',
  },
  {
    text: '加群沟通',
    link: '/guide/join-group',
  }
]
const guideGroups = [
  {
    text: '快速开始',
    items: gettingStartedNavItems
  },
  {
    text: '设计系统',
    items: designSystemNavItems
  },
  {
    text: 'AI',
    items: aiNavItems
  },
  {
    text: '工程实践',
    items: engineeringNavItems
  },
  {
    text: '社区',
    items: communityNavItems
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
      { text: 'uni-echarts', link: 'https://uni-echarts.xiaohe.ink/' },
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
  { text: 'v1', link: 'https://v1.wot-ui.cn' },
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
        activeMatch: '/guide/(introduction|quick-use|common-problems|locale|templates|migration-v2|changelog|cases|join-group)',
        items: [
          {
            text: '快速开始',
            items: gettingStartedNavItems
          },
          {
            text: '工程实践',
            items: engineeringNavItems
          },
          {
            text: '社区',
            items: communityNavItems
          }
        ]
      },
      {
        text: '设计系统',
        activeMatch: '/guide/(design|custom-theme|dark-mode|unocss-preset|custom-style)',
        items: designSystemNavItems
      },
      {
        text: 'AI',
        activeMatch: '/guide/(ai|llms-txt|open-wot|skills)',
        items: aiNavItems
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
