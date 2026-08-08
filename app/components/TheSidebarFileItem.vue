<template>
  <li
    v-tooltip.right="tournament.name"
    class="overflow-auto"
  >
    <BaseButton
      class="truncate w-full block"
      :class="{ 'menu-active': tournamentStore.activeTournamentId === tournament.id }"
      @click="tournamentStore.activeTournamentId = tournament.id"
    >
      <IconFileDescription class="h-1 w-1 inline-block" />
      {{ tournament.name }}
    </BaseButton>
  </li>
</template>

<script lang="ts" setup>
import { IconFileDescription } from '@tabler/icons-vue';

defineProps<{ tournament: Tournament }>();

const tournamentStore = useTournamentStore();
</script>
