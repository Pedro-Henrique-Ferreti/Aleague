<template>
  <FileToolbarButton
    type="delete"
    label="Excluir"
    :icon-left="IconTrash"
    @click="deleteTournamentDialogIsOpen = true"
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
  <FileToolbarDownloadButton @click="downloadTournamentFile(tournamentId)" />
  <TournamentFormModal
    v-model:is-open="tournamentModalIsOpen"
    :key="tournamentId"
    :tournament="tournamentStore.activeTournament"
    :submit-fn="tournamentStore.updateActiveTournament"
  />
  <DeleteTournamentModal v-model:is-open="deleteTournamentDialogIsOpen" />
</template>

<script lang="ts" setup>
import { IconEdit, IconLayersSubtract, IconTrash } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();
const { downloadTournamentFile } = useExportSourceFile();

const tournamentId = computed(() => tournamentStore.activeTournamentId!);

const tournamentModalIsOpen = ref(false);
const deleteTournamentDialogIsOpen = ref(false);
</script>
