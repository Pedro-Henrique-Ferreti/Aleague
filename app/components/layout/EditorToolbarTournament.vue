<template>
  <EditorToolbarButton
    type="delete"
    label="Excluir"
    :icon-left="IconTrash"
    @click="deleteTournamentDialogIsOpen = true"
  />
  <EditorToolbarButton
    v-if="isCollectionTournament"
    label="Duplicar"
    :icon-left="IconLayersSubtract"
    @click="duplicateTournamentModalIsOpen = true"
  />
  <EditorToolbarButton
    label="Editar"
    :icon-left="IconEdit"
    @click="tournamentModalIsOpen = true"
  />
  <EditorToolbarDownloadButton @click="fileStore.exportActiveFile" />
  <TournamentFormModal
    v-model:is-open="tournamentModalIsOpen"
    :tournament="tournamentStore.activeTournament"
    :submit-fn="handleUpdateTournament"
  />
  <DuplicateTournamentModal
    v-if="isCollectionTournament && tournamentStore.activeTournament"
    v-model:is-open="duplicateTournamentModalIsOpen"
    :tournament="tournamentStore.activeTournament"
  />
  <DeleteTournamentModal
    v-if="isCollectionTournament && tournamentStore.activeTournament"
    v-model:is-open="deleteTournamentDialogIsOpen"
    :tournament="tournamentStore.activeTournament"
  />
</template>

<script lang="ts" setup>
import { IconEdit, IconLayersSubtract, IconTrash } from '@tabler/icons-vue';

const fileStore = useFileStore();
const tournamentStore = useTournamentStore();

const isCollectionTournament = computed(() => {
  return !!(tournamentStore.activeTournament && fileStore.getCollectionFileByTournament(tournamentStore.activeTournament));
});

const tournamentModalIsOpen = ref(false);
const duplicateTournamentModalIsOpen = ref(false);
const deleteTournamentDialogIsOpen = ref(false);

function handleUpdateTournament(form: TournamentForm) {
  if (fileStore.activeFile && tournamentStore.activeTournament) {
    tournamentStore.updateTournament(tournamentStore.activeTournament.id, fileStore.activeFile.id, form);
  }
}
</script>
