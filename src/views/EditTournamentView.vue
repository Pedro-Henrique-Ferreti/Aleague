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
        :breadcrumb-items="breadcrumbItems"
      />
      <EditTournamentSettings :tournament="tournament" />
    </div>
  </TransitionFade>
</template>

<script lang="ts" setup>
import { useTournament } from '@/composables/useTournament';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import PageHeader from '@/components/PageHeader.vue';
import EditTournamentSettings from '@/components/EditTournamentSettings.vue';

const {
  tournament, isLoading, errorMessage, getTournament, breadcrumbItems,
} = useTournament({ currentPageName: 'Editar' });
</script>
