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
            v-tooltip="'Duplicar campeonato'"
            color="secondary"
            :icon="IconMagicWand"
          />
          <AppIconButton
            v-tooltip="'Embaralhar equipes'"
            color="secondary"
            :icon="IconShuffle"
          />
        </div>
        <TournamentParticipantsGroup
          :selected-teams="[]"
          :slots="stage.rules.numberOfTeams"
        />
      </AppAccordion>
    </div>
    <AppButton>
      Iniciar campeonato
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { Tournament, TournamentStage } from '@/types/Tournament';
import { TournamentFormat } from '@/constants/tournament';
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
