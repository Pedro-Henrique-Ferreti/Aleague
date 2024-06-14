<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>

<script lang="ts" setup>
import { computed, type Component } from 'vue';
import { useRoute } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';
import LandingPageLayout from '@/layouts/LandingPageLayout.vue';

const route = useRoute();

const currentLayout = computed<Component>(() => {
  switch (route.meta.layout) {
    case 'auth':
      return AuthLayout;
    default:
      return LandingPageLayout;
  }
});
</script>
