<template>
  <div class="form">
    <NewTournamentStageCard
      v-for="(stage, index) in form.stages"
      :key="stage.id"
      :stage="stage"
      :order="index + 1"
    />
    <AppButton @click="showModal = true">
      Adicionar fase
    </AppButton>
    <NewTournamentStageModal
      :show="showModal"
      @close="showModal = false"
      @add-stage="form.stages.push($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TournamentFormStage } from '@/types/NewTournamentForm';
import { ref } from 'vue';
import AppButton from './AppButton.vue';
import NewTournamentStageModal from './NewTournamentStageModal.vue';
import NewTournamentStageCard from './NewTournamentStageCard.vue';

// Form
const form = ref({
  stages: [] as TournamentFormStage[],
});

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
