<template>
  <div role="tablist" class="tabs tabs-lift">
    <template
      v-for="tournament in tournamentStore.tournaments"
      :key="tournament.id"
    >
      <AppTab
        class="flex-1 max-w-16"
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
    <AppTab
      :icon="IconPlus"
      :is-active="tournamentStore.activeTournamentId === null"
      @click="tournamentStore.activeTournamentId = null"
    />
    <div class="tab-content tablet-lg:px-4 pt-4 border-b-0 border-l-0 border-r-0 rounded-none border-base-300">
      <TournamentForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();
</script>
