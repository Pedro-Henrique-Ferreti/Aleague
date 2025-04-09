<template>
  <div class="form">
    <div class="form__grid">
      <template
        v-for="(stage, index) in form.stages"
        :key="stage.id"
      >
        <div
          v-if="index !== 0"
          class="form__button-wrapper"
        >
          <AppIconButton
            v-tooltip="'Adicionar fase'"
            class="form__icon-button"
            size="small"
            aria-label="Adicionar fase"
            :icon="IconPlus"
            @click="stageListIndex = index"
          />
        </div>
        <NewTournamentStageCard
          :stage="stage"
          :order="index + 1"
          @edit="selectedStage = stage"
          @delete="form.stages.splice(index, 1)"
        />
      </template>
    </div>
    <AppButton @click="stageListIndex = form.stages.length">
      Adicionar fase
    </AppButton>
    <NewTournamentStageModal
      :show="stageListIndex !== null || !!selectedStage"
      :stage="selectedStage"
      @close="closeStageModal"
      @add-stage="updateStageList"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TournamentFormStage } from '@/types/NewTournamentForm';
import { ref } from 'vue';
import { TournamentFormat } from '@/constants/tournament';
import api from '@/api';
import IconPlus from '@/assets/icons/Plus.svg';
import AppButton from './AppButton.vue';
import AppIconButton from './AppIconButton.vue';
import NewTournamentStageModal from './NewTournamentStageModal.vue';
import NewTournamentStageCard from './NewTournamentStageCard.vue';

// Form
const form = ref({
  stages: [] as TournamentFormStage[],
});
const selectedStage = ref<TournamentFormStage | null>(null);

// Stage modal
const stageListIndex = ref<number | null>(null);

function closeStageModal() {
  selectedStage.value = null;
  stageListIndex.value = null;
}

function updateStageList(stage: TournamentFormStage) {
  if (stageListIndex.value !== null) {
    const items = form.value.stages.splice(stageListIndex.value);

    form.value.stages = [...form.value.stages, stage, ...items];

    return;
  }

  const index = form.value.stages.findIndex(({ id }) => id === selectedStage.value?.id);

  if (index !== -1) {
    form.value.stages[index] = stage;
  }
}

// Create tournament
function createTournament(tournament: { name: string; iconId: number }) {
  if (form.value.stages.length === 0) {
    throw new Error('Você deve adicione ao menos uma fase para prosseguir.');
  }

  return api.tournamentService.createTournament({
    name: tournament.name,
    icon: tournament.iconId,
    type: TournamentFormat.CUSTOM,
    stages: form.value.stages.map((stage, index) => {
      const item = { ...stage, sequence: index + 1 };
      delete item.id;
      return item;
    }),
  });
}

// Exposed values
defineExpose({ createTournament });
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__grid {
    display: grid;
    gap: 0.75rem;
    width: 100%;
    max-width: 34rem;
    padding: 0 2rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
  &__button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    &:hover::after {
      background-color: $color--text-300;
    }
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 0.125rem;
      background-color: $color--neutral-300;
      transition: background-color $transition--fastest;
    }
  }
  &__icon-button {
    position: absolute;
    left: 0;
    transform: translateX(-100%);
  }
}
</style>
