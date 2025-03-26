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
      >
        <AppButton>Salvar alterações</AppButton>
      </PageHeader>
      <TournamentPageStageControl
        v-if="tournament.type === TournamentFormat.CUSTOM"
        v-model="form.selectedStageId"
        class="tournament__stage-control"
        :display-playoff-rounds="false"
        :stages="tournament.stages"
      />
      <AppCard>
        <template #header>
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
          />
        </template>
        <div class="tournament__card-groups">
          <TournamentParticipantsGroup
            v-for="(group, i) in form.stages[selectedStageIndex].participantsGroups"
            v-model:teams="form.stages[selectedStageIndex].participantsGroups[i].teams"
            :key="group.id"
            :name="group.name"
          />
        </div>
      </AppCard>
    </div>
  </TransitionFade>
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
import { TournamentStageType } from '@/types/Tournament';
import type { ParticipantSlot } from '@/types/TournamentParticipant';
import { computed, ref, watch } from 'vue';
import { useTournament } from '@/composables/useTournament';
import IconMagicWand from '@/assets/icons/MagicWand.svg';
import IconShuffle from '@/assets/icons/Shuffle.svg';
import AppButton from '@/components/AppButton.vue';
import AppCard from '@/components/AppCard.vue';
import AppIconButton from '@/components/AppIconButton.vue';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import { TournamentFormat } from '@/constants/tournament';
import TournamentParticipantsGroup from '@/components/TournamentParticipantsGroup.vue';
import TournamentPageStageControl from '@/components/TournamentPageStageControl.vue';

// Form
const form = ref({
  stages: [] as FormStage[],
  selectedStageId: '',
});

const selectedStageIndex = computed(() => form.value.stages.findIndex(
  ({ stageId }) => stageId === form.value.selectedStageId,
));

// Tournament
const {
  tournament, isLoading, errorMessage, getTournament, breadcrumbItems,
} = useTournament({ currentPageName: 'Equipes' });

watch(() => tournament.value, () => {
  if (!tournament.value) return;

  form.value.stages = tournament.value.stages.map((stage) => {
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
          tournament.value?.type === TournamentFormat.ALL_PLAY_ALL
            ? 'Equipes'
            : `${stage.type === TournamentStageType.GROUPS ? 'Grupo' : 'Partida'} ${i}`
        ),
      });
    }

    return { stageId: stage.id, participantsGroups, slotsPerGroup };
  });

  form.value.selectedStageId = tournament.value.stages[0].id;
});
</script>

<style lang="scss" scoped>
.tournament {
  display: flex;
  flex-direction: column;
  &__stage-control {
    margin-bottom: 1.5rem;
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
}
</style>
