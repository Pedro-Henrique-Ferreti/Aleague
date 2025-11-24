<template>
  <div
    role="tablist"
    class="tabs tabs-lift border-b border-b-base-300"
    ref="tablist"
  >
  <AppTab
    v-for="tournament in tournamentStore.tournaments"
    class="-mb-px"
    :key="tournament.id"
    :label="tournament.name"
    :is-active="tournamentStore.activeTournamentId === tournament.id"
    @mousedown="tournamentStore.activeTournamentId = tournament.id"
  />
  </div>
  <div class="tab-content block pt-3 border-b-0 border-l-0 border-r-0">
    <TournamentPage
      v-if="activeTournament"
      v-model="activeTournament"
    />
  </div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs';

const tournamentStore = useTournamentStore();

const activeTournament = computed({
  get: () => tournamentStore.activeTournament,
  set: (tournament) => {
    const index = tournamentStore.tournaments.findIndex(t => t.id === tournament?.id);
    
    if (index > -1 && tournament) {
      tournamentStore.tournaments[index] = tournament;
    }
  },
});

const tablistRef = useTemplateRef('tablist');

onMounted(() => {
  new Sortable(tablistRef.value, {
    ghostClass: 'opacity-0',
    easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
    animation: 250,
  });
});
</script>
