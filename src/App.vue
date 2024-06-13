<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import { computed, type Component } from 'vue';
import { useRoute } from 'vue-router';
import LandingPageLayout from '@/layouts/LandingPageLayout.vue';

const route = useRoute();

const currentLayout = computed<Component>(() => {
  switch (route.meta.layout) {
    default:
      return LandingPageLayout;
  }
});
</script>
