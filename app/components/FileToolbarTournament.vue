<template>
  <FileToolbarButton
    type="delete"
    label="Excluir"
    :icon-left="IconTrash"
    @click="deleteTournamentDialogIsOpen = true"
  />
  <FileToolbarButton
    v-if="allowDuplicateTournament"
    label="Duplicar"
    :icon-left="IconLayersSubtract"
    @click="duplicateTournamentModalIsOpen = true"
  />
  <FileToolbarButton
    label="Editar"
    :icon-left="IconEdit"
    @click="tournamentModalIsOpen = true"
  />
  <FileToolbarDownloadButton @click="fileStore.exportActiveFile" />
  <TournamentFormModal
    v-model:is-open="tournamentModalIsOpen"
    :key="tournamentStore.activeTournament?.id"
    :tournament="tournamentStore.activeTournament"
    :submit-fn="tournamentStore.updateActiveTournament"
  />
  <DuplicateTournamentModal
    v-if="allowDuplicateTournament && tournamentStore.activeTournament"
    v-model:is-open="duplicateTournamentModalIsOpen"
    :tournament="tournamentStore.activeTournament"
  />
  <DeleteTournamentModal v-model:is-open="deleteTournamentDialogIsOpen" />
</template>

<script lang="ts" setup>
import { IconEdit, IconLayersSubtract, IconTrash } from '@tabler/icons-vue';
import { isCollectionFile } from '~/helpers/file';

const fileStore = useFileStore();
const tournamentStore = useTournamentStore();

const allowDuplicateTournament = computed(() => {
  return fileStore.activeFile && isCollectionFile(fileStore.activeFile);
});

const tournamentModalIsOpen = ref(false);
const duplicateTournamentModalIsOpen = ref(false);
const deleteTournamentDialogIsOpen = ref(false);
</script>
