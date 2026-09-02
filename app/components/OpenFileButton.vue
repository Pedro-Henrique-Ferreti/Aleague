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

function onFilesImported({ collectionFiles, tournamentFiles }: UseImportSourceFilesHandlerParams) {
  let lastAddedCollectionId: Collection['id'];
  let lastAddedTournamentId: Tournament['id'];

  const pushToStore = (tournament: Tournament) => {
    if (tournamentStore.pushTournament(tournament)) {
      lastAddedTournamentId = tournament.id;
    }
  };

  collectionFiles.forEach((file) => {
    if (collectionStore.collections.find(i => i.id === file.id)) return;

    collectionStore.collections.push({
      id: file.id,
      name: file.data.name,
      createdAt: file.createdAt,
    } satisfies Collection);

    lastAddedCollectionId = file.id;

    file.data.tournaments.forEach(pushToStore);
  });

  tournamentFiles.forEach(file => pushToStore(file.data));

  nextTick(() => {
    if (lastAddedCollectionId) {
      collectionStore.setActiveCollection(lastAddedCollectionId);
    } else if (lastAddedTournamentId) {
      tournamentStore.activeTournamentId = lastAddedTournamentId;
    }
  });
}

const { openFileExplorer } = useImportSourceFiles(onFilesImported, { multiple: true });
</script>
