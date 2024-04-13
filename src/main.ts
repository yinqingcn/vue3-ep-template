import { createApp } from 'vue';
import './styles/base.scss';
import 'virtual:uno.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles/dark.scss';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

const i18n = createI18n({
  locale: 'zh-cn',
  messages,
});
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount('#app');
