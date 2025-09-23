<template>
  <div
    v-if="tournamentStore.tournaments.length === 0"
    class="flex flex-col items-center justify-center min-h-15 pt-4"
  >
    <h1 class="text-3xl font-semibold mb-0.5">Bem-vindo ao Alegue</h1>
    <p>Para começar, importe um campeonato ou crie um novo.</p>
    <ImportTournamentButton class="btn-wide mt-2 mb-1" />
    <CreateTournamentButton class="btn-wide" />
  </div>
  <div
    v-else
    role="tablist"
    class="tabs tabs-lift"
  >
    <template
      v-for="tournament in tournamentStore.tournaments"
      :key="tournament.id"
    >
      <AppTab
        :label="tournament.name"
        :is-active="tournamentStore.activeTournamentId === tournament.id"
        @click="tournamentStore.activeTournamentId = tournament.id"
      />
      <div
        v-if="tournamentStore.activeTournamentId === tournament.id"
        class="tab-content tablet-lg:px-4 pt-4 border-b-0 border-l-0 border-r-0 rounded-none border-base-300"
      >
        <TournamentPage :tournament="tournament" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const tournamentStore = useTournamentStore();
</script>
