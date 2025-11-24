<template>
  <div
    role="tablist"
    class="tabs tabs-lift"
    ref="tablist"
  >
    <AppTab
      v-for="tournament in tournamentStore.tournaments"
      class="tabs__tab"
      :key="tournament.id"
      :label="tournament.name"
      :is-active="tournamentStore.activeTournamentId === tournament.id"
      @mousedown.self="tournamentStore.activeTournamentId = tournament.id"
    >
      <template #right>
        <CloseButton
          class="btn-xs ml-auto"
          aria-label="Close tab"
          @click="askToCloseTournament(tournament.id)"
        />
      </template>
    </AppTab>
  </div>
  <div class="tab-content block pt-3 border-b-0 border-l-0 border-r-0">
    <TournamentPage
      v-if="activeTournament"
      v-model="activeTournament"
      :key="String(tournamentStore.activeTournamentId)"
    />
  </div>
  <AppDialog
    v-model:is-open="showCloseModal"
    message="Alterações não salvas serão perdidas. Deseja continuar?"
    @confirm="tournamentStore.closeActiveTournament"
  />
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

// Close tournament modal
const showCloseModal = ref(false);

function askToCloseTournament(tournamentId: Tournament['id']) {
  tournamentStore.activeTournamentId = tournamentId;
  showCloseModal.value = true;
}

// Sortable tabs
const tablistRef = useTemplateRef('tablist');

onMounted(() => {
  new Sortable(tablistRef.value, {
    ghostClass: 'opacity-0',
    easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
    animation: 250,
  });
});
</script>

<style scoped>
@reference '@/assets/css/main.css';
.tabs {
  @apply border-b border-b-base-300;
}
.tabs__tab {
  @apply -mb-px cursor-default min-w-13! relative;
}
.tabs__tab:not(:first-of-type, .tab-active, .tab-active + .tabs__tab)::before {
  @apply content-[''] absolute left-0 h-1.25 w-[2px] bg-gray-300;
}
</style>
