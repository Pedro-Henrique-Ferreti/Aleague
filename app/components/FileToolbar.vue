<template>
  <div class="flex items-center w-full">
    <BreadcrumbList>
      <BreadcrumbItem
        v-if="collectionStore.activeCollection"
        :label="collectionStore.activeCollection.name"
        :icon="IconFolderOpen"
      />
      <BreadcrumbItem
        v-if="tournamentStore.activeTournament"
        :label="tournamentStore.activeTournament?.name"
        :icon="IconFileDescription"
      />
    </BreadcrumbList>
    <div
      v-if="tournamentStore.activeTournament"
      class="flex justify-end gap-0.5 ml-auto border-l border-base-200 pl-0.5"
    >
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
      <AppButton
        class="btn-accent btn-soft ml-0.5"
        label="Salvar"
        :icon-left="IconDownload"
        @click="downloadSourceFile(tournamentId)"
      />
    </div>
  </div>
  <template v-if="tournamentStore.activeTournament">
    <TournamentFormModal
      v-model:is-open="tournamentModalIsOpen"
      :key="tournamentId"
      :tournament="tournamentStore.activeTournament"
      :submit-fn="tournamentStore.updateActiveTournament"
    />
    <MoveTournamentModal v-model:is-open="moveTournamentModalIsOpen" />
    <DeleteTournamentModal v-model:is-open="deleteTournamentDialogIsOpen" />
  </template>
</template>

<script lang="ts" setup>
import { IconDownload, IconEdit, IconFileDescription, IconFolderOpen, IconFolderUp, IconLayersSubtract, IconTrash } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();
const collectionStore = useCollectionStore();
const { downloadSourceFile } = useExportSourceFile();

const tournamentId = computed(() => tournamentStore.activeTournamentId!);

const tournamentModalIsOpen = ref(false);
const moveTournamentModalIsOpen = ref(false);
const deleteTournamentDialogIsOpen = ref(false);
</script>
