<template>
  <FileToolbarButton
    label="Editar"
    :icon-left="IconEdit"
    @click="collectionModalIsOpen = true"
  />
  <FileToolbarDownloadButton @click="fileStore.exportActiveFile" />
  <CollectionFormModal
    v-model:is-open="collectionModalIsOpen"
    :collection="collectionStore.activeCollection"
  />
</template>

<script lang="ts" setup>
import { IconEdit } from '@tabler/icons-vue';

const fileStore = useFileStore();
const collectionStore = useCollectionStore();

const collectionModalIsOpen = ref(false);
</script>
