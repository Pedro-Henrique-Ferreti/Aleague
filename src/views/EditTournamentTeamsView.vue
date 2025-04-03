<template>
  <TransitionFade>
    <LoadingIndicator v-if="isLoading" />
    <ErrorState
      v-else-if="errorMessage"
      :message="errorMessage"
      @reload="getTournament"
    />
    <div
      v-else-if="tournament"
      class="tournament | container-medium"
    >
      <PageHeader
        title="Editar equipes"
        :breadcrumb-items="breadcrumbItems"
      />
      <TournamentPageStageControl
        v-if="tournament.type === TournamentFormat.CUSTOM"
        v-model="selectedStageId"
        class="tournament__stage-control"
        :display-playoff-rounds="false"
        :stages="tournament.stages"
      />
      <AppCard>
        <template
          v-if="!form.stages[activeStageIndex].disabled"
          #header
        >
          <div class="tournament__card-header">
            <TeamSearchInput
              placeholder="Adicionar equipe"
              :disabled-teams="selectedTeams"
              @team-selected="onTeamSelected"
            />
            <div class="tournament__card-controls">
              <AppIconButton
                v-tooltip="'Limpar participantes'"
                color="secondary"
                aria-label="Limpar participantes"
                :icon="IconEraserOutline"
                @click="resetTeamGroups"
              />
              <AppIconButton
                v-tooltip="'Preencher participantes'"
                color="secondary"
                aria-label="Preencher participantes"
                :icon="IconMagicWand"
              />
              <AppIconButton
                v-tooltip="'Embaralhar equipes'"
                color="secondary"
                aria-label="Embaralhar equipes"
                :icon="IconShuffle"
                @click="shuffleTeams"
              />
              <AppButton
                :disabled="submitButtonIsDisabled"
                @click="submitTeams"
              >
                Salvar
              </AppButton>
            </div>
          </div>
        </template>
        <div class="tournament__card-groups">
          <TournamentTeamGroup
            v-for="(group, i) in form.stages[activeStageIndex].groups"
            v-model:teams="form.stages[activeStageIndex].groups[i].teams"
            :key="group.id"
            :name="group.name"
            :disabled="form.stages[activeStageIndex].disabled"
          />
        </div>
      </AppCard>
    </div>
  </TransitionFade>
</template>

<script lang="ts">
export type TeamSlot = TeamPreview | MatchTeam | null;

interface TeamGroup {
  id: number;
  name: string;
  teams: TeamSlot[];
}

export interface FormStage {
  stageId: string;
  disabled: boolean;
  slotsPerGroup: number;
  groups: TeamGroup[];
}
</script>

<script lang="ts" setup>
import { TournamentStageType } from '@/types/Tournament';
import type { TeamPreview } from '@/types/Team';
import type { MatchTeam } from '@/types/Match';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from '@/composables/toast';
import { useTournament } from '@/composables/useTournament';
import api from '@/api';
import IconMagicWand from '@/assets/icons/MagicWand.svg';
import IconShuffle from '@/assets/icons/Shuffle.svg';
import IconEraserOutline from '@/assets/icons/EraserOutline.svg';
import AppButton from '@/components/AppButton.vue';
import AppCard from '@/components/AppCard.vue';
import AppIconButton from '@/components/AppIconButton.vue';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import { TournamentFormat } from '@/constants/tournament';
import TournamentTeamGroup from '@/components/TournamentTeamGroup.vue';
import TournamentPageStageControl from '@/components/TournamentPageStageControl.vue';
import TeamSearchInput from '@/components/TeamSearchInput.vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();

// Form
const form = ref({
  stages: [] as FormStage[],
});

// Selected teams
const selectedTeams = computed(() => (
  form.value.stages[activeStageIndex.value].groups.flatMap((group) => (
    group.teams.filter((team) => team !== null).map((team) => ({
      id: team.id,
      label: group.name,
    }))
  ))
));

// Tournament
const {
  tournament, isLoading, errorMessage, getTournament, breadcrumbItems,
} = useTournament({ currentPageName: 'Equipes' });

watch(() => tournament.value, () => {
  if (!tournament.value) return;

  form.value.stages = tournament.value.stages.map((stage) => {
    const teamGroups: TeamGroup[] = [];
    const numberOfGroups = (
      stage.type === TournamentStageType.GROUPS
        ? stage.rules.numberOfGroups
        : stage.rules.numberOfTeams / 2
    );
    const slotsPerGroup = (
      stage.type === TournamentStageType.GROUPS ? stage.rules.numberOfTeamsPerGroup : 2
    );

    for (let i = 1; i <= numberOfGroups; i += 1) {
      let teams: TeamSlot[] = [];

      if (stage.type === TournamentStageType.GROUPS) {
        teams = stage.groups[i - 1].standings.map(({ team }) => (team.id === null ? null : team));
      } else {
        const { firstTeam, secondTeam } = stage.rounds[0].matchups[i - 1];
        teams = [firstTeam, secondTeam];
      }

      teamGroups.push({
        id: i,
        teams,
        name: (
          tournament.value?.type === TournamentFormat.ALL_PLAY_ALL
            ? 'Equipes'
            : `${stage.type === TournamentStageType.GROUPS ? 'Grupo' : 'Partida'} ${i}`
        ),
      });
    }

    return {
      stageId: stage.id,
      disabled: teamGroups.every((group) => group.teams.every((team) => team !== null)),
      groups: teamGroups,
      slotsPerGroup,
    };
  });
});

// Selected stage
const selectedStageId = computed({
  get: () => (
    route.query.stageId as string || tournament.value?.stages[0].id || ''
  ),
  set: (stageId) => (router.replace({ query: { stageId } })),
});

const activeStageIndex = computed(() => form.value.stages.findIndex(
  ({ stageId }) => stageId === selectedStageId.value,
));

// On team selected
function onTeamSelected(team: TeamPreview) {
  const group = form.value.stages[activeStageIndex.value]?.groups.find(
    (group) => group.teams.includes(null),
  );

  if (!group) return;

  const emptySlotIndex = group.teams.findIndex((teamSlot) => teamSlot === null);

  group.teams[emptySlotIndex] = team;
}

// Reset team groups
function resetTeamGroups() {
  form.value.stages[activeStageIndex.value].groups.forEach((group) => {
    group.teams.fill(null);
  });
}

// Shuffle teams
function shuffleTeams() {
  const stage = form.value.stages[activeStageIndex.value];
  const teams = stage.groups.flatMap((group) => group.teams);

  teams.sort(() => Math.random() - 0.5);

  for (let i = 0; i < stage.groups.length; i += 1) {
    stage.groups[i].teams = teams.splice(0, stage.slotsPerGroup);
  }
}

// Submit teams
const isSubmitting = ref(false);
const submitButtonIsDisabled = computed(() => (
  form.value.stages[activeStageIndex.value].groups.some((group) => (
    group.teams.some((team) => team === null)
  ))
));

async function submitTeams() {
  isSubmitting.value = true;

  try {
    await api.tournamentService.addStageParticipants({
      stageId: form.value.stages[activeStageIndex.value].stageId,
      teams: form.value.stages[activeStageIndex.value].groups.flatMap(
        (group) => (group.teams.map((team) => team)
        ),
      ).map((team, index) => ({ teamId: team?.id || '', tbdId: `TBD_${index + 1}` })),
    });
  } catch (error: any) {
    toast.error('Não foi possivel adicionar as equipes. Por favor, tente novamente.');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style lang="scss" scoped>
.tournament {
  display: flex;
  flex-direction: column;
  &__stage-control {
    margin-bottom: 1.5rem;
  }
  &__card-header {
    display: grid;
    gap: 1rem;
    @include for-large-tablet-portrait-up {
      grid-template-columns: minmax(22rem, 50%) auto;
    }
  }
  &__card-controls {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }
  &__card-groups {
    display: grid;
    gap: 1.5rem 1rem;
    margin-top: 0.625rem;
    @include for-tablet-portrait-up {
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    }
  }
}
</style>
