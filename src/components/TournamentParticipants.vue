<template>
  <div class="stages | container-medium">
    <PageHeader :breadcrumb-items="BREADCRUMB_ITEMS" />
    <TournamentProfileCard :tournament="tournament" />
    <div class="stages__grid">
      <AppAccordion
        v-for="(stage, index) in tournament.stages"
        initial-open
        :key="stage.id"
        :title="getStageCardTitle(stage, index)"
      >
        <div class="stages__card-header">
          <AppIconButton
            v-tooltip="'Preencher participantes'"
            color="secondary"
            :icon="IconMagicWand"
            @click="fillStageTeams(index)"
          />
          <AppIconButton
            v-tooltip="'Embaralhar equipes'"
            color="secondary"
            :icon="IconShuffle"
            @click="shuffleStageTeams(index)"
          />
        </div>
        <TournamentParticipantsGroup
          v-model:selected-teams="form.stages[index].selectedTeams"
          :team-options="teamOptions"
          :number-of-slots="stage.rules.numberOfTeams"
        />
      </AppAccordion>
    </div>
    <AppButton
      class="stages__submit-button"
      :is-loading="isLoading"
      :disabled="submitButtonIsDisabled"
      @click="submitParticipants"
    >
      Iniciar campeonato
    </AppButton>
  </div>
</template>

<script lang="ts">
interface FormStage {
  stageId: string;
  numberOfSlots: number;
  selectedTeams: TeamPreview[];
}
</script>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { TeamPreview } from '@/types/Team';
import type { Tournament, TournamentStage } from '@/types/Tournament';
import { computed, ref, type PropType } from 'vue';
import { useToast } from '@/composables/toast';
import { TournamentFormat } from '@/constants/tournament';
import api from '@/api';
import IconMagicWand from '@/assets/icons/MagicWand.svg';
import IconShuffle from '@/assets/icons/Shuffle.svg';
import AppAccordion from './AppAccordion.vue';
import AppButton from './AppButton.vue';
import AppIconButton from './AppIconButton.vue';
import PageHeader from './PageHeader.vue';
import TournamentProfileCard from './TournamentProfileCard.vue';
import TournamentParticipantsGroup from './TournamentParticipantsGroup.vue';

const toast = useToast();

const emit = defineEmits(['participants-submitted']);
const props = defineProps({
  tournament: {
    type: Object as PropType<Tournament>,
    required: true,
  },
});

// Breadcrumb items
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Campeonatos', to: { name: 'tournaments' } },
  {
    title: props.tournament?.name || '',
    to: { name: 'show-tournament', params: { id: props.tournament.id } },
  },
  'Adicionar participantes',
];

// Form
const form = ref({
  stages: props.tournament.stages.map((stage): FormStage => ({
    stageId: stage.id,
    numberOfSlots: stage.rules.numberOfTeams,
    selectedTeams: [],
  })),
});

// Team options
const teamOptions = ref<TeamPreview[]>([]);
const isLoadingTeamOptions = ref(true);
const loadTeamOptionsError = ref(false);

async function getTeamOptions() {
  isLoadingTeamOptions.value = true;
  loadTeamOptionsError.value = false;

  try {
    const { data } = await api.teamService.getAllTeams();
    teamOptions.value = data;
  } catch (error) {
    loadTeamOptionsError.value = true;
  } finally {
    isLoadingTeamOptions.value = false;
  }
}

getTeamOptions();

// Shuffle teams
function shuffleStageTeams(stageIndex: number) {
  form.value.stages[stageIndex].selectedTeams.sort(() => Math.random() - 0.5);
}

// Fill teams
function fillStageTeams(stageIndex: number) {
  const stage = form.value.stages[stageIndex];

  for (let slot = 0; slot < stage.numberOfSlots; slot += 1) {
    if (!stage.selectedTeams[slot]) {
      const selectedTeams = form.value.stages.flatMap(
        (stage) => stage.selectedTeams,
      ).map(({ id }) => id);

      const availableTeams = teamOptions.value.filter(
        (team) => !selectedTeams.includes(team.id),
      );

      stage.selectedTeams[slot] = availableTeams[Math.floor(Math.random() * availableTeams.length)];
    }
  }
}

// Stage card
function getStageCardTitle(stage: TournamentStage, index: number) {
  const name = (
    props.tournament.type === TournamentFormat.ALL_PLAY_ALL
  ) ? 'Pontos Corridos' : stage.name || `Fase ${index + 1}`;

  return ` ${name} - ${stage.rules.numberOfTeams} equipes`;
}

// Submit participants
const submitButtonIsDisabled = computed(() => (
  form.value.stages.some((stage) => stage.selectedTeams.length !== stage.numberOfSlots)
));

const isLoading = ref(false);

async function submitParticipants() {
  isLoading.value = true;

  try {
    await api.tournamentService.initializeAllPlayAllTournament({
      id: props.tournament.id,
      teams: form.value.stages.flatMap((stage) => stage.selectedTeams.map(({ id }) => id)),
    });

    emit('participants-submitted');
  } catch (error: any) {
    toast.error('Não foi possivel iniciar o campeonato. Por favor, tente novamente.');
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.stages {
  display: flex;
  flex-direction: column;
  &__grid {
    display: grid;
    gap: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 2.5rem;
  }
  &__card-header {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  &__submit-button {
    margin-left: auto;
  }
}
</style>
