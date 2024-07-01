import 'floating-vue/dist/style.css';
import '@/assets/scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { type PluginOptions } from 'vue-toastification';
import FloatingVue from 'floating-vue';
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

app.use(FloatingVue, {
  themes: {
    'user-menu': {
      $extend: 'menu',
      $resetCss: true,
      arrowOverflow: false,
      placement: 'bottom-end',
      distance: 16,
    },
    'app-dropdown': {
      $extend: 'dropdown',
      $resetCss: true,
      arrowOverflow: false,
      placement: 'bottom-start',
      distance: 2,
      container: '#app',
    },
  },
});

app.mount('#app');
