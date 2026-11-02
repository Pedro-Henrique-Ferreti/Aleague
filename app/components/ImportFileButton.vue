<template>
  <AppButton
    label="Importar"
    :icon-left="IconFileImport"
    @click="openFileExplorer"
  />
</template>

<script lang="ts" setup>
import { IconFileImport } from '@tabler/icons-vue';

const fileStore = useFileStore();

function onFilesImported({ collectionFiles, tournamentFiles }: UseImportSourceFilesHandlerParams) {
  collectionFiles.forEach(fileStore.addFileToStore);
  tournamentFiles.forEach(fileStore.addFileToStore);
}

const { openFileExplorer } = useImportSourceFiles(onFilesImported, { multiple: true });
</script>
