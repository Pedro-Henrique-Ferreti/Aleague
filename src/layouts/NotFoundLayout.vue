<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import DefaultLayout from './DefaultLayout.vue';
import LandingLayout from './LandingLayout.vue';

const authStore = useAuthStore();

const layout = computed(() => authStore.userIsAuthenticated ? DefaultLayout : LandingLayout);
</script>
