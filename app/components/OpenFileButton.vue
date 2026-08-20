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
  collectionFiles.forEach((file) => {
    if (collectionStore.collections.find(i => i.id === file.id)) return;

    collectionStore.collections.push({
      id: file.id,
      name: file.data.name,
      createdAt: file.createdAt,
    } satisfies Collection);

    file.data.tournaments.forEach(addTournamentToStore);
  });

  tournamentFiles.forEach(file => addTournamentToStore(file.data));

  nextTick(() => {
    const firstCollection = collectionStore.collections[0];
    const firstTournament = tournamentStore.tournaments[0];

    if (firstCollection) {
      collectionStore.setActiveCollection(firstCollection.id);
    } else if (firstTournament) {
      tournamentStore.activeTournamentId = firstTournament.id;
    }
  });
}

const { openFileExplorer } = useImportSourceFiles(onFilesImported, { multiple: true });
</script>
