<template>
  <div class="flex items-center w-full">
    <BreadcrumbList>
      <BreadcrumbItem
        v-if="collectionStore.activeCollection"
        :clickable="!!tournamentStore.activeTournament"
        :label="collectionStore.activeCollection.name"
        :icon="IconFolderOpen"
        @click="collectionStore.setActiveCollection(collectionStore.activeCollection.id)"
      />
      <BreadcrumbItem
        v-if="tournamentStore.activeTournament"
        :label="tournamentStore.activeTournament?.name"
        :icon="IconFileDescription"
      />
    </BreadcrumbList>
    <div class="flex justify-end gap-0.5 ml-auto border-l border-base-200 pl-0.5">
      <FileToolbarTournament v-if="tournamentStore.activeTournament" />
      <FileToolbarCollection v-else-if="collectionStore.activeCollection" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconFileDescription, IconFolderOpen } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();
const collectionStore = useCollectionStore();
</script>
