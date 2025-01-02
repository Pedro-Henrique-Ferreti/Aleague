<template>
  <main class="new-tournament | container-small">
    <PageHeader
      :title="pageTitle"
      :breadcrumb-items="BREADCRUMB_ITEMS"
    />
    <form @submit.prevent="submitForm">
      <AppCard>
        <template #header>
          <AppProgressStepper :items="progressSteps" />
        </template>
        <template v-if="activeStepId === FormStep.RULES">
          <NewTournamentAllPlayAllForm
            v-if="settingsForm.format === TournamentFormat.ALL_PLAY_ALL"
            v-model:participants="allPlayAllForm.participants"
            v-model:is-double-legged="allPlayAllForm.isDoubleLegged"
          />
          <NewTournamentPlayoffsForm
            v-else-if="settingsForm.format === TournamentFormat.PLAYOFFS"
            v-model:rounds="playoffsForm.rounds"
            v-model:is-double-legged="playoffsForm.isDoubleLegged"
            v-model:final-round-is-double-legged="playoffsForm.finalRoundIsDoubleLegged"
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
        <template v-if="activeStepId === FormStep.RULES">
          <AppButton
            outline
            :icon-left="IconChevronLeft"
            @click="activeStepId = FormStep.FORMAT"
          >
            Voltar
          </AppButton>
          <AppButton
            type="submit"
            :is-loading="isCreatingTournament"
          >
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
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '@/composables/toast';
import {
  ALL_PLAY_ALL_MIN_NUMBER_OF_PARTICIPANTS,
  NEW_TOURNAMENT_DEFAULT_ICON_ID,
  PLAYOFFS_MIN_NUMBER_OF_ROUNDS,
  TournamentFormat,
} from '@/constants/tournament';
import api from '@/api';
import IconChevronLeft from '@/assets/icons/ChevronLeft.svg';
import AppButton from '@/components/AppButton.vue';
import AppCard from '@/components/AppCard.vue';
import AppProgressStepper from '@/components/AppProgressStepper.vue';
import PageHeader from '@/components/PageHeader.vue';
import NewTournamentSettingsForm from '@/components/NewTournamentSettingsForm.vue';
import NewTournamentAllPlayAllForm from '@/components/NewTournamentAllPlayAllForm.vue';
import NewTournamentPlayoffsForm from '@/components/NewTournamentPlayoffsForm.vue';

const router = useRouter();
const toast = useToast();

// Breadcrumb
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Campeonatos', to: { name: 'tournaments' } },
  'Novo',
];

// Form steps
const FormStep = {
  FORMAT: 0,
  RULES: 1,
} as const;

const activeStepId = ref<number>(FormStep.FORMAT);

const progressSteps = computed<ProgressStepperStep[]>(() => ([
  { name: 'Nome e formato', isCompleted: activeStepId.value === FormStep.RULES },
  { name: 'Definir regras', isCompleted: false },
]));

// Settings form
const settingsForm = ref({
  name: '',
  iconId: NEW_TOURNAMENT_DEFAULT_ICON_ID,
  format: TournamentFormat.ALL_PLAY_ALL as TypeTournamentFormat,
});

const isCreatingTournament = ref(false);

// All-play-all form
const allPlayAllForm = ref({
  participants: ALL_PLAY_ALL_MIN_NUMBER_OF_PARTICIPANTS,
  isDoubleLegged: false,
});

// Playoffs form
const playoffsForm = ref({
  rounds: PLAYOFFS_MIN_NUMBER_OF_ROUNDS,
  isDoubleLegged: false,
  finalRoundIsDoubleLegged: false,
});

// Page title
const pageTitle = ref('');

watch(() => activeStepId.value, (currentStepId, previousStepId) => {
  pageTitle.value = (
    [currentStepId, previousStepId].includes(FormStep.RULES)
  ) ? settingsForm.value.name : 'Novo campeonato';
}, { immediate: true });

// Submit form
async function submitForm() {
  if (activeStepId.value === FormStep.FORMAT) {
    activeStepId.value = FormStep.RULES;
    return;
  }

  isCreatingTournament.value = true;

  try {
    let id = '';

    if (settingsForm.value.format === TournamentFormat.ALL_PLAY_ALL) {
      const { data } = await api.tournamentService.createAllPlayAllTournament({
        name: settingsForm.value.name,
        icon: settingsForm.value.iconId,
        numberOfTeams: allPlayAllForm.value.participants,
        isDoubleLegged: allPlayAllForm.value.isDoubleLegged,
      });
      id = data.id;
    } else if (settingsForm.value.format === TournamentFormat.PLAYOFFS) {
      const { data } = await api.tournamentService.createPlayoffsTournament({
        name: settingsForm.value.name,
        icon: settingsForm.value.iconId,
        numberOfTeams: 2 ** playoffsForm.value.rounds,
        isDoubleLegged: playoffsForm.value.isDoubleLegged,
        finalRoundIsDoubleLegged: playoffsForm.value.finalRoundIsDoubleLegged,
      });
      id = data.id;
    }

    toast.success('Campeonato criado com sucesso!');

    router.push({ name: 'show-tournament', params: { id } });
  } catch (error: any) {
    toast.error('Algo deu errado e não foi possível criar o campeonato. Por favor, tente novamente.');
  } finally {
    isCreatingTournament.value = false;
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
