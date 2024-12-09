<template>
  <div class="tournament">
    <PageHeader :breadcrumb-items="BREADCRUMB_ITEMS" />
    <div class="tournament__header">
      <TournamentProfileCard :tournament="tournament" />
      <AppButton>Salvar alterações</AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { Tournament } from '@/types/Tournament';
import type { PropType } from 'vue';
import AppButton from './AppButton.vue';
import PageHeader from './PageHeader.vue';
import TournamentProfileCard from './TournamentProfileCard.vue';

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
}
</style>
