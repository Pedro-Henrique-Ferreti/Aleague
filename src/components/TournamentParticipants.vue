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
        <div class="stages__card-groups">
          <TournamentParticipantsGroup
            v-for="(group, i) in form.stages[index].participantsGroups"
            v-model:teams="form.stages[index].participantsGroups[i].teams"
            :key="group.id"
            :name="group.name"
            :team-options="teamOptions"
            :stages="form.stages"
            :show-team-option-label="tournament.type !== TournamentFormat.ALL_PLAY_ALL"
          />
        </div>
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
interface ParticipantsGroup {
  id: number;
  name: string;
  teams: ParticipantSlot[];
}

export interface FormStage {
  stageId: string;
  slotsPerGroup: number;
  participantsGroups: ParticipantsGroup[];
}
</script>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { TeamPreview } from '@/types/Team';
import { TournamentStageType, type Tournament, type TournamentStage } from '@/types/Tournament';
import type { ParticipantSlot } from '@/types/TournamentParticipant';
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

// Map tournament stages
function mapTournamentStage(stage: TournamentStage): FormStage {
  const participantsGroups: ParticipantsGroup[] = [];
  const numberOfGroups = (
    stage.type === TournamentStageType.GROUPS
      ? stage.rules.numberOfGroups
      : stage.rules.numberOfTeams / 2
  );
  const slotsPerGroup = (
    stage.type === TournamentStageType.GROUPS ? stage.rules.numberOfTeamsPerGroup : 2
  );

  for (let i = 1; i <= numberOfGroups; i += 1) {
    const teams: ParticipantSlot[] = [];

    teams[slotsPerGroup - 1] = null;

    participantsGroups.push({
      id: i,
      teams: teams.fill(null),
      name: (
        props.tournament.type === TournamentFormat.ALL_PLAY_ALL
          ? 'Equipes'
          : `${stage.type === TournamentStageType.GROUPS ? 'Grupo' : 'Partida'} ${i}`
      ),
    });
  }

  return { stageId: stage.id, participantsGroups, slotsPerGroup };
}

// Form
const form = ref({
  stages: props.tournament.stages.map(mapTournamentStage),
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
  const stage = form.value.stages[stageIndex];
  const teams = stage.participantsGroups.flatMap((group) => group.teams);

  teams.sort(() => Math.random() - 0.5);

  for (let i = 0; i < stage.participantsGroups.length; i += 1) {
    stage.participantsGroups[i].teams = teams.splice(0, stage.slotsPerGroup);
  }
}

// Fill teams
function fillStageTeams(stageIndex: number) {
  const stage = form.value.stages[stageIndex];

  stage.participantsGroups.forEach((group, groupIndex) => {
    for (let slot = 0; slot < stage.slotsPerGroup; slot += 1) {
      if (!group.teams[slot]) {
        const allSelectedTeams = form.value.stages.flatMap(
          (stage) => stage.participantsGroups.flatMap((group) => group.teams),
        ).filter(Boolean).map((team) => team?.id);

        const availableTeams = teamOptions.value.filter(
          (team) => !allSelectedTeams.includes(team.id),
        );

        if (availableTeams.length > 0) {
          form.value.stages[stageIndex].participantsGroups[groupIndex].teams[slot] = (
            availableTeams[Math.floor(Math.random() * availableTeams.length)]
          );
        }
      }
    }
  });
}

// Stage card
function getStageCardTitle(stage: TournamentStage, index: number) {
  let name = '';

  if (props.tournament.type === TournamentFormat.ALL_PLAY_ALL) {
    name = 'Pontos Corridos';
  } else if (props.tournament.type === TournamentFormat.PLAYOFFS) {
    name = 'Eliminatórias';
  } else {
    name = stage.name || `Fase ${index + 1}`;
  }

  return ` ${name} - ${stage.rules.numberOfTeams} equipes`;
}

// Submit button
const submitButtonIsDisabled = computed(() => (
  form.value.stages.some((stage, index) => (
    (index > 0)
      ? false
      : stage.participantsGroups.some(({ teams }) => teams.some((i) => i === null))
  ))
));

// Submit participants
const isLoading = ref(false);

async function submitParticipants() {
  isLoading.value = true;

  try {
    await api.tournamentService.addTournamentParticipants({
      id: props.tournament.id,
      stages: form.value.stages.map((stage) => ({
        id: stage.stageId,
        teams: stage.participantsGroups.flatMap((group) => group.teams).map((team) => (
          (team) ? team.id : null
        )),
      })),
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
  &__card-groups {
    display: grid;
    gap: 1.5rem 1rem;
    @include for-tablet-portrait-up {
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    }
  }
  &__submit-button {
    margin-left: auto;
  }
}
</style>
