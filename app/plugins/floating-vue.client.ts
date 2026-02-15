import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FloatingVue, {
    themes: {
      'tooltip': {
        $resetCss: true,
        distance: 8,
        overflowPadding: 12,
      },
      'team-form': {
        $extend: 'menu',
        $resetCss: true,
        arrowOverflow: false,
        distance: 8,
        placement: 'top-end',
        arrowPadding: 12,
        triggers: ['hover', 'focus'],
        delay: {
          hide: 0,
        },
      },
    },
  });
});
