import { createSSRApp } from 'vue'
import App from './App.vue'
import i18n from './locale'
// #ifdef H5
import '@vant/touch-emulator'
// #endif

export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  app.config.globalProperties.$t = i18n.global.t
  return {
    app
  }
}
