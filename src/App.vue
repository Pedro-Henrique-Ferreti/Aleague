<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <SplashScreen v-if="showSplashScreen" />
    <div v-else>
      <component :is="currentLayout">
        <router-view />
      </component>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, type Component } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import LandingLayout from '@/layouts/LandingLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import NotFoundLayout from '@/layouts/NotFoundLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import SplashScreen from '@/components/SplashScreen.vue';

const route = useRoute();
const authStore = useAuthStore();

const currentLayout = computed<Component>(() => {
  switch (route.meta.layout) {
    case 'auth':
      return AuthLayout;
    case 'landing':
      return LandingLayout;
    case 'notFound':
      return NotFoundLayout;
    default:
      return DefaultLayout;
  }
});

const showSplashScreen = ref<boolean>(authStore.showSplashScreen);

watch(() => authStore.showSplashScreen, (show: boolean) => {
  if (show) {
    showSplashScreen.value = true;
    return;
  }

  // Sets a timeout before hiding the splash screen
  setTimeout(() => {
    showSplashScreen.value = false;
  }, 300);
});
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
