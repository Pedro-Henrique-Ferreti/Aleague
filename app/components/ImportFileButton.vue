<template>
  <AppButton
    label="Importar"
    :class="$attrs.class"
    :icon-left="IconFileImport"
    @click="openFileExplorer"
  />
  <FeedbackDialog
    v-if="showNotImportedFilesDialog"
    v-model:is-open="errorDialogIsOpen"
    type="error"
    title="Arquivos não importados"
  >
    <p>Alguns arquivos não puderam ser importados porque já foram importados anteriormente:</p>
    <ul class="mt-0.75 list-inside list-disc text-left">
      <li
        v-for="file in skippedFiles"
        :key="file"
      >
        {{ file }}
      </li>
    </ul>
  </FeedbackDialog>
</template>

<script lang="ts" setup>
import { IconFileImport } from '@tabler/icons-vue';

withDefaults(defineProps<{
  showNotImportedFilesDialog?: boolean;
}>(), {
  showNotImportedFilesDialog: true,
});

const fileStore = useFileStore();

const errorDialogIsOpen = ref(false);
const skippedFiles = ref<string[]>([]);

function onFilesImported({ collectionFiles, tournamentFiles }: UseImportSourceFilesHandlerParams) {
  skippedFiles.value = [];

  [...collectionFiles, ...tournamentFiles].forEach(({ fileName, sourceFile }) => {
    if (!fileStore.addFileToStore(sourceFile)) {
      skippedFiles.value.push(fileName);
    }
  });
  errorDialogIsOpen.value = skippedFiles.value.length > 0;
}

const { openFileExplorer } = useImportSourceFiles(onFilesImported, { multiple: true });
</script>
