<template>
  <div class="form">
    <AppButton @click="showModal = true">
      Adicionar fase
    </AppButton>
    <NewTournamentStageModal
      :show="showModal"
      @close="showModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AppButton from './AppButton.vue';
import NewTournamentStageModal from './NewTournamentStageModal.vue';

const showModal = ref(false);
</script>

<style lang="scss" scoped>
.form {
  @include scrollbar;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30rem;
  padding: 1.25rem;
  margin-top: 1.5rem;
  border: 1px solid $color--neutral-300;
  border-radius: 1rem;
  background-image: url('/images/dotted-background.svg');
  background-position: center 7%;
  overflow-y: auto;
}
</style>
