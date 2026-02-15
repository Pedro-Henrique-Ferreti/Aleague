<template>
  <li>
    <button
      type="button"
      :class="{ 'menu-active': tournamentStore.activeTournamentId === tournament.id }"
      @click="tournamentStore.activeTournamentId = tournament.id"
    >
      <IconFileDescription class="h-1 w-1" />
      {{ tournament.name }}
    </button>
  </li>
</template>

<script lang="ts" setup>
import { IconFileDescription } from '@tabler/icons-vue';

defineProps<{ tournament: Tournament }>();

const tournamentStore = useTournamentStore();
</script>
