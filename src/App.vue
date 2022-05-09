<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import HomeLayout from '@/layouts/HomeLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const route = useRoute();

const currentLayout = computed(() => {
  switch (route.meta.layout) {
    case 'auth':
      return AuthLayout;
    case 'home':
    default:
      return HomeLayout;
  }
});
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
