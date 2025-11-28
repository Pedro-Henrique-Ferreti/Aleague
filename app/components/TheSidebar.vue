<template>
  <aside class="w-15 h-screen sticky top-0 border-r-1 border-base-200 p-1">
    <ul class="menu gap-0.25 w-full p-0">
      <li
        v-for="tournament in tournamentStore.tournaments"
        :key="tournament.id"
      >
        <button
          type="button"
          :class="{ 'menu-active': tournamentStore.activeTournamentId === tournament.id }"
          @click="tournamentStore.activeTournamentId = tournament.id"
        >
          <IconFile class="h-1 w-1" />
          {{ tournament.name }}
        </button>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { IconFile } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();
</script>
