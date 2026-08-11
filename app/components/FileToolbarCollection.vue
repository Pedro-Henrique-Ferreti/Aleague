<template>
  <FileToolbarButton
    label="Editar"
    :icon-left="IconEdit"
    @click="collectionModalIsOpen = true"
  />
  <FileToolbarDownloadButton @click="collectionStore.activeCollection && downloadCollectionFile(collectionStore.activeCollection.id)" />
  <CollectionFormModal
    v-model:is-open="collectionModalIsOpen"
    :collection="collectionStore.activeCollection"
  />
</template>

<script lang="ts" setup>
import { IconEdit } from '@tabler/icons-vue';

const collectionStore = useCollectionStore();
const { downloadCollectionFile } = useExportSourceFile();

const collectionModalIsOpen = ref(false);
</script>
