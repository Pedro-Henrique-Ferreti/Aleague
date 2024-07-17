import 'floating-vue/dist/style.css';
import '@/assets/scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { type PluginOptions } from 'vue-toastification';
import FloatingVue from 'floating-vue';
import { createI18n } from 'vue-i18n';
import { register } from 'swiper/element/bundle';
import App from './App.vue';
import router from './router';
import ptBR from './locales/pt_BR';

register();

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Vue Toastification
const options: PluginOptions = {
  hideProgressBar: true,
  timeout: false,
  icon: false,
  closeButton: false,
  toastClassName: 'app-toast',
  transition: 'Vue-Toastification__fade',
};

app.use(Toast, options);

// Floating Vue
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
    },
    'app-popup-large': {
      $extend: 'dropdown',
      $resetCss: true,
      arrowOverflow: false,
      placement: 'bottom-start',
      distance: 12,
      skidding: -12,
    },
    tooltip: {
      $resetCss: true,
      distance: 8,
    },
  },
});

// Vue I18n
const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    'pt-BR': ptBR,
  },
});

app.use(i18n);

app.mount('#app');
