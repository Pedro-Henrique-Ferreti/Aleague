<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import LandingLayout from '@/layouts/LandingLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const route = useRoute();

const currentLayout = computed(() => {
  switch (route.meta.layout) {
    case 'auth':
      return AuthLayout;
    case 'landing':
      return LandingLayout;
    default:
      return DefaultLayout;
  }
});
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
