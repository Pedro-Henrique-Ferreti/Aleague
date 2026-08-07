<template>
  <FileToolbarButton
    type="delete"
    label="Excluir"
    :icon-left="IconTrash"
    @click="deleteTournamentDialogIsOpen = true"
  />
  <FileToolbarButton
    label="Mover"
    :icon-left="IconFolderUp"
    @click="moveTournamentModalIsOpen = true"
  />
  <FileToolbarButton
    label="Duplicar"
    :icon-left="IconLayersSubtract"
    @click="tournamentStore.duplicateActiveTournament"
  />
  <FileToolbarButton
    label="Editar"
    :icon-left="IconEdit"
    @click="tournamentModalIsOpen = true"
  />
  <TournamentFormModal
    v-model:is-open="tournamentModalIsOpen"
    :key="tournamentId"
    :tournament="tournamentStore.activeTournament"
    :submit-fn="tournamentStore.updateActiveTournament"
  />
  <MoveTournamentModal v-model:is-open="moveTournamentModalIsOpen" />
  <DeleteTournamentModal v-model:is-open="deleteTournamentDialogIsOpen" />
</template>

<script lang="ts" setup>
import { IconEdit, IconFolderUp, IconLayersSubtract, IconTrash } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const tournamentId = computed(() => tournamentStore.activeTournamentId!);

const tournamentModalIsOpen = ref(false);
const moveTournamentModalIsOpen = ref(false);
const deleteTournamentDialogIsOpen = ref(false);
</script>
