<template>
  <div class="tournament">
    <PageHeader :breadcrumb-items="BREADCRUMB_ITEMS" />
    <div class="tournament__header">
      <TournamentProfileCard :tournament="tournament" />
      <AppButton>Salvar alterações</AppButton>
    </div>
    <TournamentPageStageControl
      v-if="tournament.type !== TournamentFormat.ALL_PLAY_ALL"
      v-model="form.selectedRoundId"
      class="tournament__stage-control"
      :stages="tournament.stages"
    />
    <TournamentPageGroups
      v-if="form.tournament.stages[0].type === TournamentStageType.GROUPS"
      v-model:stage="form.tournament.stages[0]"
    />
    <TournamentPagePlayoffs
      v-else
      v-model:stage="form.tournament.stages[0]"
      :selected-round-id="form.selectedRoundId"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import { TournamentStageType, type Tournament } from '@/types/Tournament';
import { onMounted, ref, type PropType } from 'vue';
import { TournamentFormat } from '@/constants/tournament';
import AppButton from './AppButton.vue';
import PageHeader from './PageHeader.vue';
import TournamentProfileCard from './TournamentProfileCard.vue';
import TournamentPageGroups from './TournamentPageGroups.vue';
import TournamentPagePlayoffs from './TournamentPagePlayoffs.vue';
import TournamentPageStageControl from './TournamentPageStageControl.vue';

const props = defineProps({
  tournament: {
    type: Object as PropType<Tournament>,
    required: true,
  },
});

// Breadcrumb items
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Campeonatos', to: { name: 'tournaments' } },
  props.tournament?.name || '',
];

// Form
const form = ref({
  tournament: props.tournament,
  selectedRoundId: '',
});

onMounted(() => {
  if (props.tournament.stages[0].type === TournamentStageType.PLAYOFFS) {
    form.value.selectedRoundId = props.tournament.stages[0].rounds[0].id;
  }
});
</script>

<style lang="scss" scoped>
.tournament {
  &__header {
    display: grid;
    gap: 2rem;
    place-items: start flex-end;
    @include for-desktop-up {
      grid-template-columns: 2fr 1fr;
    }
    @include for-large-desktop-up {
      grid-template-columns: 1fr 1fr;
    }
  }
  &__stage-control {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }
}
</style>
