<template>
  <AppButton
    class="btn-primary btn-outline"
    label="Abrir"
    :icon-left="IconFolder"
    @click="openFileExplorer"
  />
</template>

<script lang="ts" setup>
import { IconFolder } from '@tabler/icons-vue';

const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();

function onFilesImported({ collectionFiles, tournamentFiles }: UseImportSourceFilesHandlerParams) {
  collectionFiles.forEach((file) => {
    collectionStore.collections.push({
      id: file.id,
      name: file.data.name,
      createdAt: file.createdAt,
      tournaments: file.data.tournaments.map((i) => i.id),
    } satisfies Collection);

    tournamentStore.tournaments.push(...file.data.tournaments);
  });

  tournamentFiles.forEach((file) => {
    tournamentStore.tournaments.push(file.data);
  });
}

const { openFileExplorer } = useImportSourceFiles(onFilesImported, { multiple: true });
</script>
