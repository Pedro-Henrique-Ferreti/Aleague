<template>
  <CollectionProfileCard />
  <section class="mt-2">
    <h2 class="font-medium text-2xl mb-1">Campeonatos</h2>
    <div class="grid gap-1 grid-cols-[repeat(auto-fill,minmax(17rem,1fr))]">
      <CollectionTournamentCard
        v-for="tournament in tournaments"
        :key="tournament.id"
        :tournament="tournament"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();

const tournaments = computed(() => {
  return tournamentStore.tournaments.filter(t => t.collectionId === collectionStore.activeCollectionId);
});
</script>
