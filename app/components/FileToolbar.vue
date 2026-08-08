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
    <div class="flex justify-end gap-0.5 ml-auto border-l border-base-200 pl-0.5">
      <FileToolbarCollection v-if="collectionStore.activeCollection" />
      <FileToolbarTournament v-else-if="tournamentStore.activeTournament" />
      <AppButton
        class="btn-accent btn-soft ml-0.5"
        label="Salvar"
        :icon-left="IconDownload"
        @click="downloadSourceFile(tournamentId)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconDownload, IconFileDescription, IconFolderOpen } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();
const collectionStore = useCollectionStore();
const { downloadSourceFile } = useExportSourceFile();

const tournamentId = computed(() => tournamentStore.activeTournamentId!);
</script>
