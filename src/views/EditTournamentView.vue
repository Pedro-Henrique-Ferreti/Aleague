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
      class="container-small"
    >
      <PageHeader
        title="Editar campeonato"
        :breadcrumb-items="BREADCRUMB_ITEMS"
      />
      <EditTournamentSettings :tournament="tournament" />
    </div>
  </TransitionFade>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { Tournament } from '@/types/Tournament';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import PageHeader from '@/components/PageHeader.vue';
import EditTournamentSettings from '@/components/EditTournamentSettings.vue';

const route = useRoute();

const tournament = ref<Tournament | null>(null);

// Get tournament
const isLoading = ref(true);
const errorMessage = ref('');

async function getTournament() {
  isLoading.value = true;
  errorMessage.value = '';
  tournament.value = null;

  try {
    const { data } = await api.tournamentService.getTournamentById(route.params.id as string);
    tournament.value = data;
  } catch (error: any) {
    errorMessage.value = 'Algo deu errado e não foi possível carregar o campeonato.';
  } finally {
    isLoading.value = false;
  }
}

getTournament();

// Breadcrumb items
const BREADCRUMB_ITEMS = computed<Breadcrumb[]>(() => ([
  { title: 'Campeonatos', to: { name: 'tournaments' } },
  {
    title: tournament.value?.name || '',
    to: { name: 'show-tournament', params: { id: tournament.value?.id } },
  },
  'Editar',
]));
</script>

<style lang="scss" scoped>

</style>
