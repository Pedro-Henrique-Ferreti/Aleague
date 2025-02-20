<template>
  <div
    class="form"
    :data-empty-list="form.stages.length === 0"
  >
    <template
      v-for="(stage, index) in form.stages"
      :key="stage.id"
    >
      <div class="form__button-wrapper">
        <AppIconButton
          v-tooltip="'Adicionar fase'"
          class="form__icon-button"
          size="small"
          aria-label="Adicionar fase"
          :icon="IconPlus"
          @click="stageListIndex = index"
        />
        <IconDashedLine
          class="form__dashed-line"
          :viewBox="index === 0 ? '0 0 4 48' : null"
        />
      </div>
      <NewTournamentStageCard
        :stage="stage"
        :order="index + 1"
        @edit="selectedStage = stage"
        @delete="form.stages.splice(index, 1)"
      />
    </template>
    <div class="form__button-wrapper">
      <IconDashedLine
        v-if="form.stages.length > 0"
        class="form__dashed-line"
        viewBox="0 0 4 48"
      />
      <AppButton @click="stageListIndex = form.stages.length">
        Adicionar fase
      </AppButton>
    </div>
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
import IconDashedLine from '@/assets/icons/DashedLine.svg';
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
  @include scrollbar;
  &[data-empty-list="true"] {
    justify-content: center;
  }
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
  &__button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    &:first-child .form__icon-button {
      position: relative;
    }
    &:first-child .form__dashed-line,
    &:last-child .form__dashed-line {
      height: 3rem;
    }
  }
  &__icon-button {
    flex-shrink: 0;
    position: absolute;
  }
  &__dashed-line {
    flex-shrink: 0;
  }
}
</style>
