<template>
  <NuxtLayout>
    <template #header>
      <EditorFileToolbar />
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
import EditorFileToolbar from '~/components/layout/EditorFileToolbar.vue';

const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();
</script>
