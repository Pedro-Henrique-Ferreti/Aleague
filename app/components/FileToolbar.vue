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
    <div class="flex justify-end gap-0.5 ml-auto">
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
        @click="tournamentStore.duplicateTournament(tournamentId)"
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
    :submit-fn="(form) => tournamentStore.updateTournament(tournamentId, form)"
  />
  <MoveTournamentModal v-model:is-open="moveTournamentModalIsOpen" />
</template>

<script lang="ts" setup>
import { IconLayersSubtract, IconEdit, IconDownload, IconFolderOpen, IconFileDescription, IconFolderUp } from '@tabler/icons-vue';

const { downloadTournamentSourceFile } = useFileStore();
const tournamentStore = useTournamentStore();
const collectionStore = useCollectionStore();

const tournamentId = computed(() => tournamentStore.activeTournamentId!);

const tournamentModalIsOpen = ref(false);
const moveTournamentModalIsOpen = ref(false);
</script>

<style scoped>
@reference '@/assets/css/main.css';

.toolbar-button {
  @apply px-0.5 bg-transparent border-0 hover:bg-base-200;
}
</style>
