export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tooltip', {
    getSSRProps() {
      return {};
    },
  });
});
