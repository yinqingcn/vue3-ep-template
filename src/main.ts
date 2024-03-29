import { createApp } from 'vue'
import './styles/base.scss'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// element-plus 图标全部引入
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/dark.scss'

const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
app.use(createPinia())
app.use(router)
app.mount('#app')
