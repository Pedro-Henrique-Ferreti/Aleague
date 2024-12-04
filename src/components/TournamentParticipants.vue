<template>
  <div class="container-medium">
    <PageHeader :breadcrumb-items="BREADCRUMB_ITEMS" />
    <TournamentProfileCard :tournament="tournament" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { Tournament } from '@/types/Tournament';
import PageHeader from './PageHeader.vue';
import TournamentProfileCard from './TournamentProfileCard.vue';

const props = defineProps({
  tournament: {
    type: Object as PropType<Tournament>,
    required: true,
  },
});

const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Campeonatos', to: { name: 'tournaments' } },
  {
    title: props.tournament?.name || '',
    to: { name: 'show-tournament', params: { id: props.tournament.id } },
  },
  'Adicionar participantes',
];
</script>

<style lang="scss" scoped>

</style>
