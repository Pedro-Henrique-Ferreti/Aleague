<template>
  <TransitionFade>
    <LoadingIndicator v-if="isLoading" />
    <ErrorState
      v-else-if="errorMessage"
      :message="errorMessage"
      @reload="getTournament"
    />
    <TournamentParticipants
      v-else-if="tournament && !tournament.startedAt"
      :tournament="tournament"
      @participants-submitted="getTournament"
    />
    <TournamentPage
      v-else-if="tournament"
      :tournament="tournament"
    />
  </TransitionFade>
</template>

<script lang="ts" setup>
import type { Tournament } from '@/types/Tournament';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTitle } from '@/composables/useTitle';
import api from '@/api';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import ErrorState from '@/components/ErrorState.vue';
import TournamentParticipants from '@/components/TournamentParticipants.vue';
import TournamentPage from '@/components/TournamentPage.vue';

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

// Page title
const pageTitle = computed(() => tournament.value?.name);
useTitle(pageTitle);
</script>
