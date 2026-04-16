import { defineConfig } from 'vitepress'
import { getDocsComponentNavItems, getDocsComponentSidebar } from '../../../src/config/component-catalog'

const componentNavItems = getDocsComponentNavItems('en-US')
const componentSidebar = getDocsComponentSidebar('en-US')
const guideGroups = [
  {
    text: 'Basics',
    items: [
      {
        text: 'Introduction',
        link: '/en-US/guide/introduction',
      },
      {
        text: 'Design',
        link: '/en-US/guide/design',
      },
      {
        text: 'Quick Start',
        link: '/en-US/guide/quick-use',
      }
    ]
  },
  {
    text: 'Development',
    items: [
      {
        text: 'Custom Theme',
        link: '/en-US/guide/custom-theme',
      },
      {
        text: 'Custom Style',
        link: '/en-US/guide/custom-style',
      },
      {
        text: 'Dark Mode',
        link: '/en-US/guide/dark-mode',
      },
      {
        text: 'Internationalization',
        link: '/en-US/guide/locale',
      },
      {
        text: 'UnoCSS Preset',
        link: '/en-US/guide/unocss-preset',
      },
      {
        text: 'Templates',
        link: '/en-US/guide/templates',
      },
      {
        text: 'Common Problems',
        link: '/en-US/guide/common-problems',
      }
    ]
  },
  {
    text: 'AI',
    items: [
      {
        text: 'LLMs.txt',
        link: '/en-US/guide/llms-txt',
      },
      {
        text: 'CLI',
        link: '/en-US/guide/open-wot',
      },
      {
        text: 'Skills',
        link: '/en-US/guide/skills',
      }
    ]
  },
  {
    text: 'Community',
    items: [
      {
        text: 'Cases',
        link: '/en-US/guide/cases',
      },
      {
        text: 'Changelog',
        link: '/en-US/guide/changelog',
      },
      {
        text: 'Join Group',
        link: '/en-US/guide/join-group',
      }
    ]
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
  { text: 'v1', link: 'https://wot-ui.cn' },
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
        activeMatch: '/en-US/guide/',
        items: guideGroups
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
        text: 'v2',
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
