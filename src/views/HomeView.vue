<template>
  <main class="container-small">
    <AppTitle>{{ greetingMessage }}</AppTitle>
    <p>Bem-vindo ao Aleague! Você pode escolher uma das opções abaixo.</p>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import AppTitle from '@/components/AppTitle.vue';

const authStore = useAuthStore();

const greetingMessage = computed(() => {
  const curentHour = new Date().getTime();
  let greeting = 'Boa noite';

  if (curentHour < 13) {
    greeting = 'Bom dia';
  } else if (curentHour < 19) {
    greeting = 'Boa tarde';
  }

  return `${greeting}, ${authStore.user.username}`;
});
</script>
