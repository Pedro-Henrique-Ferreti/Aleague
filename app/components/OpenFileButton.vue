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

const fileStore = useFileStore();

function onFilesImported({ collectionFiles, tournamentFiles }: UseImportSourceFilesHandlerParams) {
  collectionFiles.forEach(fileStore.addFileToStore);
  tournamentFiles.forEach(fileStore.addFileToStore);
}

const { openFileExplorer } = useImportSourceFiles(onFilesImported, { multiple: true });
</script>
