<template>
  <BaseButton
    class="card card-border cursor-pointer transition-colors hover:bg-base-content/10"
    @click="tournamentStore.activeTournamentId = tournament.id"
  >
    <div class="card-body p-0.75 flex-row items-center text-left gap-0.75">
      <img
        class="w-auto h-3"
        alt="Logo do campeonato"
        :src="tournament.icon"
      >
      {{ tournament.name }}
    </div>
  </BaseButton>
</template>

<script lang="ts" setup>
defineProps<{
  tournament: Tournament;
}>();

const tournamentStore = useTournamentStore();
</script>
