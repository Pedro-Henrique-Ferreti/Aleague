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
  const tournaments = tournamentFiles.filter(
    (file) => !tournamentStore.tournaments.find((i) => i.id === file.data.id)
  ).map((file) => file.data);

  tournamentStore.tournaments.push(...tournaments);

  let id = tournaments.reverse()[0]?.id;

  for (const file of collectionFiles) {
    if (collectionStore.collections.find((i) => i.id === file.id)) return;

    collectionStore.collections.push({
      id: file.id,
      name: file.data.name,
      createdAt: file.createdAt,
    } satisfies Collection);

    tournamentStore.tournaments.push(...file.data.tournaments);

    id = file.data.tournaments[0]?.id ?? id;
  }

  if (id) {
    tournamentStore.activeTournamentId = id;
  }
}

const { openFileExplorer } = useImportSourceFiles(onFilesImported, { multiple: true });
</script>
