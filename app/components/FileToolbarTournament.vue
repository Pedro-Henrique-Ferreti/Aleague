<template>
  <FileToolbarButton
    type="delete"
    label="Excluir"
    :icon-left="IconTrash"
    @click="deleteTournamentDialogIsOpen = true"
  />
  <FileToolbarButton
    v-if="isCollectionTournament"
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
</script>
