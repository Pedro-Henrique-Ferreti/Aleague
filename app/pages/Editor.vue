<template>
  <NuxtLayout>
    <template #header>
      <EditorToolbar />
    </template>
    <TournamentPage
      v-if="tournamentStore.activeTournament?.id"
      :key="tournamentStore.activeTournament.id"
    />
    <CollectionPage
      v-else-if="collectionStore.activeCollection?.id"
      :key="collectionStore.activeCollection.id"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();
</script>
