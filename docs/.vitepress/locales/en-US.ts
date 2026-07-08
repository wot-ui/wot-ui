import { defineConfig } from 'vitepress'
import { getDocsComponentNavItems, getDocsComponentSidebar } from '../../../src/config/component-catalog'
import packageJson from '../../../package.json'

const componentNavItems = getDocsComponentNavItems('en-US')
const componentSidebar = getDocsComponentSidebar('en-US')
const gettingStartedNavItems = [
  {
    text: 'Introduction',
    link: '/en-US/guide/introduction',
  },
  {
    text: 'Quick Start',
    link: '/en-US/guide/quick-use',
  },
  {
    text: 'Common Problems',
    link: '/en-US/guide/common-problems',
  }
]
const designSystemNavItems = [
  {
    text: 'Design',
    link: '/en-US/guide/design',
  },
  {
    text: 'Custom Theme',
    link: '/en-US/guide/custom-theme',
  },
  {
    text: 'Dark Mode',
    link: '/en-US/guide/dark-mode',
  },
  {
    text: 'UnoCSS Preset',
    link: '/en-US/guide/unocss-preset',
  },
  {
    text: 'Custom Style',
    link: '/en-US/guide/custom-style',
  }
]
const aiNavItems = [
  {
    text: 'AI Overview',
    link: '/en-US/guide/ai',
  },
  {
    text: 'LLMs.txt',
    link: '/en-US/guide/llms-txt',
  },
  {
    text: '@wot-ui/cli',
    link: '/en-US/guide/open-wot',
  },
  {
    text: 'AI Skills',
    link: '/en-US/guide/skills',
  }
]
const engineeringNavItems = [
  {
    text: 'Internationalization',
    link: '/en-US/guide/locale',
  },
  {
    text: 'Templates',
    link: '/en-US/guide/templates',
  },
  {
    text: 'Migrating from v1 to v2',
    link: '/en-US/guide/migration-v2',
  },
  {
    text: 'Changelog',
    link: '/en-US/guide/changelog',
  }
]
const communityNavItems = [
  {
    text: 'Cases',
    link: '/en-US/guide/cases',
  },
  {
    text: 'Join Group',
    link: '/en-US/guide/join-group',
  }
]
const guideGroups = [
  {
    text: 'Getting Started',
    items: gettingStartedNavItems
  },
  {
    text: 'Design System',
    items: designSystemNavItems
  },
  {
    text: 'AI',
    items: aiNavItems
  },
  {
    text: 'Engineering',
    items: engineeringNavItems
  },
  {
    text: 'Community',
    items: communityNavItems
  }
]
const ecosystemNavItems = [
  {
    text: 'Official',
    items: [
      { text: 'wot-starter', link: 'https://starter.wot-ui.cn/' },
      { text: '@wot-ui/router', link: 'https://my-uni.wot-ui.cn/' },
      { text: '@wot-ui/cli', link: 'https://github.com/wot-ui/open-wot' },
      { text: '@wot-ui/unocss-preset', link: 'https://github.com/wot-ui/unocss-preset' },
      { text: 'VS Code Extension', link: 'https://marketplace.visualstudio.com/items?itemName=wot-ui.wot-ui-intellisense' },
      { text: 'Mini Program CI Tool', link: 'https://github.com/Moonofweisheng/uni-mini-ci' },
      { text: 'wot-starter-retail', link: 'https://github.com/wot-ui/wot-starter-retail' },
    ]
  },
  {
    text: 'Resources',
    items: [
      { text: 'Uni Helper', link: 'https://uni-helper.js.org/' },
      { text: 'uni-ku', link: 'https://github.com/uni-ku' },
      { text: 'uni-echarts', link: 'https://uni-echarts.xiaohe.ink/' },

    ]
  },
  {
    text: 'Templates',
    items: [
      { text: 'vitesse-uni-app', link: 'https://vitesse-docs.netlify.app/' },
      { text: 'unibest', link: 'https://unibest.tech/' },
    ]
  }
]
const supportNavItems = [
  { text: '🥤Buy Us a Coffee', link: '/en-US/reward/reward' },
  { text: 'Become a Sponsor', link: '/en-US/reward/sponsor' },
  { text: 'About the Author', link: 'https://blog.wot-ui.cn/about' },
]

const versionNavItems = [
  { text: 'v1', link: 'https://v1.wot-ui.cn' },
  { text: 'Changelog', link: '/en-US/guide/changelog.html' },
]

export default defineConfig({
  lang: 'en-US',
  description: 'A uni-app component library based on wot-design',
  themeConfig: {
    lastUpdated: {
      text: 'Last Updated'
    },
    editLink: {
      pattern: 'https://github.com/wot-ui/wot-ui/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      {
        text: 'Guide',
        activeMatch: '/en-US/guide/(introduction|quick-use|common-problems|locale|templates|migration-v2|changelog|cases|join-group)',
        items: [
          {
            text: 'Getting Started',
            items: gettingStartedNavItems
          },
          {
            text: 'Engineering',
            items: engineeringNavItems
          },
          {
            text: 'Community',
            items: communityNavItems
          }
        ]
      },
      {
        text: 'Design System',
        activeMatch: '/en-US/guide/(design|custom-theme|dark-mode|unocss-preset|custom-style)',
        items: designSystemNavItems
      },
      {
        text: 'AI',
        activeMatch: '/en-US/guide/(ai|llms-txt|open-wot|skills)',
        items: aiNavItems
      },
      {
        text: 'Components',
        activeMatch: '/en-US/component/',
        items: componentNavItems
      },
      {
        text: 'Ecosystem',
        items: ecosystemNavItems
      },
      {
        text: 'Support',
        activeMatch: '/en-US/reward/',
        items: supportNavItems
      },
      {
        text: packageJson.version,
        items: versionNavItems
      },
    ],
    sidebar: {
      '/en-US/guide/': guideGroups,
      '/en-US/reward/': [
        {
          text: '🥤Buy Us a Coffee',
          link: '/en-US/reward/reward',
        },
        {
          text: 'Donor List',
          link: '/en-US/reward/donor',
        },
        {
          text: 'Become a Sponsor',
          link: '/en-US/reward/sponsor',
        }
      ],
      '/en-US/component/': componentSidebar
    }
  }
})
