<template>
  <AppButton
    class="btn-primary"
    label="Abrir"
    :icon-left="IconFolder"
    @click="openFileExplorer"
  />
</template>

<script lang="ts" setup>
import { IconFolder } from '@tabler/icons-vue';

const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();

function addTournamentToStore(tournament: Tournament) {
  if (!tournamentStore.tournaments.find(i => i.id === tournament.id)) {
    tournamentStore.tournaments.push(tournament);
  }
}

function onFilesImported({ collectionFiles, tournamentFiles }: UseImportSourceFilesHandlerParams) {
  for (const file of collectionFiles) {
    if (collectionStore.collections.find(i => i.id === file.id)) return;

    collectionStore.collections.push({
      id: file.id,
      name: file.data.name,
      createdAt: file.createdAt,
    } satisfies Collection);

    file.data.tournaments.forEach(addTournamentToStore);
  }

  tournamentFiles.forEach(file => addTournamentToStore(file.data));

  tournamentStore.activeTournamentId = tournamentStore.tournaments[tournamentStore.tournaments.length - 1]?.id;
}

const { openFileExplorer } = useImportSourceFiles(onFilesImported, { multiple: true });
</script>
