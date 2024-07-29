<template>
  <main class="new-tournament | container-small">
    <PageHeader
      :title="(activeStepId === NewTournamentSteps.RULES) ? settingsForm.name : 'Novo campeonato'"
      :breadcrumb-items="BREADCRUMB_ITEMS"
    />
    <form @submit.prevent="submitForm">
      <AppCard>
        <template #header>
          <AppProgressStepper :items="progressSteps" />
        </template>
        <template v-if="activeStepId === NewTournamentSteps.RULES">
          <NewTournamentAllPlayAllForm
            v-if="settingsForm.format === TournamentFormat.ALL_PLAY_ALL"
          />
        </template>
        <NewTournamentSettingsForm
          v-else
          v-model:tournament-name="settingsForm.name"
          v-model:icon-id="settingsForm.iconId"
          v-model:format="settingsForm.format"
        />
      </AppCard>
      <div class="new-tournament__controls">
        <template v-if="activeStepId === NewTournamentSteps.RULES">
          <AppButton
            outline
            :icon-left="IconChevronLeft"
            @click="activeStepId = NewTournamentSteps.FORMAT"
          >
            Voltar
          </AppButton>
          <AppButton type="submit">
            Criar campeonato
          </AppButton>
        </template>
        <AppButton
          v-else
          type="submit"
          :disabled="!settingsForm.name"
        >
          Continuar
        </AppButton>
      </div>
    </form>
  </main>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { ProgressStepperStep } from '@/types/ProgressStepper';
import type { TypeTournamentFormat } from '@/types/Tournament';
import { computed, ref } from 'vue';
import { NEW_TOURNAMENT_DEFAULT_ICON_ID, TournamentFormat } from '@/constants/tournament';
import IconChevronLeft from '@/assets/icons/IconChevronLeft.svg';
import AppButton from '@/components/AppButton.vue';
import AppCard from '@/components/AppCard.vue';
import AppProgressStepper from '@/components/AppProgressStepper.vue';
import PageHeader from '@/components/PageHeader.vue';
import NewTournamentSettingsForm from '@/components/NewTournamentSettingsForm.vue';
import NewTournamentAllPlayAllForm from '@/components/NewTournamentAllPlayAllForm.vue';

// Breadcrumb
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Campeonatos', to: { name: 'tournaments' } },
  'Novo',
];

// Form steps
const NewTournamentSteps = {
  FORMAT: 0,
  RULES: 1,
} as const;

const activeStepId = ref<number>(NewTournamentSteps.FORMAT);

const progressSteps = computed<ProgressStepperStep[]>(() => ([
  { name: 'Nome e formato', isCompleted: activeStepId.value === NewTournamentSteps.RULES },
  { name: 'Definir regras', isCompleted: false },
]));

// Settings form
const settingsForm = ref({
  name: '',
  iconId: NEW_TOURNAMENT_DEFAULT_ICON_ID,
  format: TournamentFormat.ALL_PLAY_ALL as TypeTournamentFormat,
});

// Submit form
function submitForm() {
  if (activeStepId.value === NewTournamentSteps.FORMAT) {
    activeStepId.value = NewTournamentSteps.RULES;
  }
}
</script>

<style lang="scss" scoped>
.new-tournament {
  &__controls {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
}
</style>
