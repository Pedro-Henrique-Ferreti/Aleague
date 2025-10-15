<template>
  <div
    role="tablist"
    class="tabs tabs-lift"
  >
    <template
      v-for="(tournament, index) in tournamentStore.tournaments"
      :key="tournament.id"
    >
      <AppTab
        :label="tournament.name"
        :is-active="tournamentStore.activeTournamentId === tournament.id"
        @click="tournamentStore.activeTournamentId = tournament.id"
      />
      <div
        v-if="tournamentStore.activeTournamentId === tournament.id"
        class="tab-content pt-3 border-b-0 border-l-0 border-r-0 rounded-none border-base-300"
      >
        <TournamentPage v-model="tournamentStore.tournaments[index]!" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const tournamentStore = useTournamentStore();
</script>
