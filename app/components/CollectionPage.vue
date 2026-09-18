<template>
  <CollectionProfileCard />
  <section class="mt-2">
    <h2 class="font-medium text-2xl mb-1">Campeonatos</h2>
    <div
      v-if="tournaments.length"
      class="grid gap-1 grid-cols-[repeat(auto-fill,minmax(17rem,1fr))]"
    >
      <CollectionTournamentCard
        v-for="tournament in tournaments"
        :key="tournament.id"
        :tournament="tournament"
      />
    </div>
    <div
      v-else
      class="flex flex-col items-center text-center max-w-1/3 m-auto"
    >
      <IconFile class="size-4 opacity-60 mb-1" />
      <div class="textarea-xl font-medium mb-0.5">
        Nenhum campeonato ainda
      </div>
      <p>Essa coleção ainda não possui nenhum campeonato. Os campeonatos que você cria aparecerão aqui.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import IconFile from '@/assets/icons/File.svg';

const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();

const tournaments = computed(() => {
  return tournamentStore.tournamentList.filter(t => t.collectionId === collectionStore.activeCollection?.id);
});
</script>
