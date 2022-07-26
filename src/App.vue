<template>
  <transition name="fade" mode="out-in">
    <SplashScreen v-if="showSplashScreen" />
    <div v-else>
      <component :is="currentLayout">
        <router-view />
      </component>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import LandingLayout from '@/layouts/LandingLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import NotFoundLayout from '@/layouts/NotFoundLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import SplashScreen from '@/components/SplashScreen.vue';

const route = useRoute();
const authStore = useAuthStore();

const currentLayout = computed(() => {
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

const showSplashScreen = ref(authStore.showSplashScreen);

watch(() => authStore.showSplashScreen, (isShowingSplashScreen) => {
  if (isShowingSplashScreen) {
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
