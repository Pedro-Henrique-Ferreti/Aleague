<template>
  <div class="grid gap-1 min-h-6.25 mb-2 tablet-lg:grid-cols-[1fr_auto]">
    <TournamentProfileCard />
    <TournamentWinnerBadge
      v-if="tournamentStore.activeTournamentWinner"
      class="h-fit"
      :winner="tournamentStore.activeTournamentWinner"
    />
  </div>
</template>

<script lang="ts" setup>
const tournamentStore = useTournamentStore();
</script>
