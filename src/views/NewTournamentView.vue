<template>
  <main class="new-tournament | container-small">
    <PageHeader
      title="Novo campeonato"
      :breadcrumb-items="BREADCRUMB_ITEMS"
    />
    <form @submit.prevent>
      <AppCard>
        <template #header>
          <AppProgressStepper :items="formSteps" />
        </template>
        <NewTournamentSettingsForm
          v-model:tournament-name="form.tournamentName"
          v-model:icon-id="form.iconId"
          v-model:format="form.format"
        />
      </AppCard>
      <div class="new-tournament__controls">
        <AppButton type="submit">
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
import AppButton from '@/components/AppButton.vue';
import AppCard from '@/components/AppCard.vue';
import AppProgressStepper from '@/components/AppProgressStepper.vue';
import PageHeader from '@/components/PageHeader.vue';
import NewTournamentSettingsForm from '@/components/NewTournamentSettingsForm.vue';

// Breadcrumb
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Campeonatos', to: { name: 'tournaments' } },
  'Novo',
];

// Form
const form = ref({
  tournamentName: '',
  iconId: NEW_TOURNAMENT_DEFAULT_ICON_ID,
  format: TournamentFormat.ALL_PLAY_ALL as TypeTournamentFormat,
});

const formSteps = computed<ProgressStepperStep[]>(() => ([
  { name: 'Nome e formato', isCompleted: false },
  { name: 'Definir regras', isCompleted: false },
]));

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
