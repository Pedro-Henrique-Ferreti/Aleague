<template>
  <NuxtLayout>
    <template #header>
      <FileToolbar />
    </template>
    <TournamentPage
      v-if="tournamentStore.activeTournamentId"
      :key="String(tournamentStore.activeTournamentId)"
    />
    <CollectionPage
      v-else-if="collectionStore.activeCollection?.id"
      :key="String(collectionStore.activeCollection?.id)"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import FileToolbar from '~/components/FileToolbar.vue';

const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();
</script>
