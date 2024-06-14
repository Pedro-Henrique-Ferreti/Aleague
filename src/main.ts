import '@/assets/scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { type PluginOptions } from 'vue-toastification';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const options: PluginOptions = {
  hideProgressBar: true,
  timeout: false,
  icon: false,
  closeButton: false,
  toastClassName: 'app-toast',
  transition: 'Vue-Toastification__fade',
};

app.use(Toast, options);

app.mount('#app');
