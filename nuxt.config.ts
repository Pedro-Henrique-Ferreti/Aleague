import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@pinia/nuxt', '@vueuse/nuxt', 'nuxt-svgo', '@nuxt/test-utils/module'],
  imports: {
    dirs: ['types', 'constants', 'utils'],
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  app: {
    head: {
      title: 'Aleague',
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap' },
      ],
    },
  },
  devServer: {
    port: 8080,
  },
  css: ['@/assets/css/main.css'],
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('swiper'),
        },
      },
    },
    plugins: [tailwindcss()],
  },
  svgo: {
    defaultImport: 'component',
  },
  typescript: {
    typeCheck: true,
  },
});
