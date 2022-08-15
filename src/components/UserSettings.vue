<template>
  <AppModal
    title="Configurações"
    size="large"
    :show="userStore.showUserSettingsModal"
    @close="userStore.showUserSettingsModal = false"
  >
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim officiis, assumenda quod eveniet atque quos est sunt modi architecto officia voluptatem soluta temporibus veniam fuga excepturi ipsa asperiores totam, at recusandae, sit facilis unde maxime. Nulla itaque ducimus fuga neque dolor praesentium corporis fugit labore iure voluptatibus, eum dicta eos! Mollitia, asperiores qui. Qui error dolor incidunt quaerat reiciendis. Atque corporis necessitatibus sed ex, accusantium, repellat aut ipsa et in cum deserunt veniam</p>
  </AppModal>
</template>

<script setup>
import AppModal from './AppModal.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
</script>
