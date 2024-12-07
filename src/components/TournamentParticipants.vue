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
    <AppButton>
      Iniciar campeonato
    </AppButton>
  </div>
</template>

<script lang="ts">
interface FormStage {
  stageId: string;
  selectedTeams: TeamPreview[];
}
</script>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { TeamPreview } from '@/types/Team';
import type { Tournament, TournamentStage } from '@/types/Tournament';
import { ref, type PropType } from 'vue';
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

// Stage card
function getStageCardTitle(stage: TournamentStage, index: number) {
  const name = (
    props.tournament.type === TournamentFormat.ALL_PLAY_ALL
  ) ? 'Pontos Corridos' : stage.name || `Fase ${index + 1}`;

  return ` ${name} - ${stage.rules.numberOfTeams} equipes`;
}
</script>

<style lang="scss" scoped>
.stages {
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
}
</style>
