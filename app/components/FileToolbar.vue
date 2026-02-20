<template>
  <div class="flex items-center w-full">
    <BreadcrumbList>
      <BreadcrumbItem
        v-if="collectionStore.activeCollection"
        :label="collectionStore.activeCollection.name"
        :icon="IconFolderOpen"
      />
      <BreadcrumbItem
        :label="tournamentStore.activeTournament?.name"
        :icon="IconFileDescription"
      />
    </BreadcrumbList>
    <div class="flex justify-end gap-0.5 ml-auto border-l border-base-200 pl-0.5">
      <AppButton
        class="toolbar-delete-button"
        label="Excluir"
        :icon-left="IconTrash"
        @click="deleteTournamentDialogIsOpen = true"
      />
      <AppButton
        class="toolbar-button"
        label="Mover"
        :icon-left="IconFolderUp"
        @click="moveTournamentModalIsOpen = true"
      />
      <AppButton
        class="toolbar-button"
        label="Duplicar"
        :icon-left="IconLayersSubtract"
        @click="tournamentStore.duplicateActiveTournament"
      />
      <AppButton
        class="toolbar-button"
        label="Editar"
        :icon-left="IconEdit"
        @click="tournamentModalIsOpen = true"
      />
      <AppButton
        class="btn-accent btn-soft ml-0.5"
        label="Salvar"
        :icon-left="IconDownload"
        @click="downloadTournamentSourceFile(tournamentId)"
      />
    </div>
  </div>
  <TournamentFormModal
    v-if="tournamentStore.activeTournament"
    v-model:is-open="tournamentModalIsOpen"
    :key="tournamentId"
    :tournament="tournamentStore.activeTournament"
    :submit-fn="tournamentStore.updateActiveTournament"
  />
  <MoveTournamentModal v-model:is-open="moveTournamentModalIsOpen" />
  <AppDialog
    v-model:is-open="deleteTournamentDialogIsOpen"
    type="delete"
    title="Excluir campeonato"
    @confirm="deleteTournament"
  >
    <p>
      Você tem certeza que deseja excluir <b>{{ tournamentStore.activeTournament?.name }}</b>? Essa ação não poderá ser
      desfeita e você não poderá recuperá-lo, a não ser que possua uma cópia salva.
    </p>
  </AppDialog>
</template>

<script lang="ts" setup>
import { IconDownload, IconEdit, IconFileDescription, IconFolderOpen, IconFolderUp, IconLayersSubtract, IconTrash } from '@tabler/icons-vue';

const { downloadTournamentSourceFile } = useFileStore();
const tournamentStore = useTournamentStore();
const collectionStore = useCollectionStore();

const tournamentId = computed(() => tournamentStore.activeTournamentId!);

const tournamentModalIsOpen = ref(false);
const moveTournamentModalIsOpen = ref(false);
const deleteTournamentDialogIsOpen = ref(false);

function deleteTournament() {
  tournamentStore.deleteActiveTournament();
  deleteTournamentDialogIsOpen.value = false;
}
</script>

<style scoped>
@reference '@/assets/css/main.css';

.toolbar-button {
  @apply px-0.5 bg-transparent border-0 hover:bg-base-200;
}

.toolbar-delete-button {
  @apply text-error px-0.5 bg-transparent border-0 hover:bg-error/8;
}
</style>
