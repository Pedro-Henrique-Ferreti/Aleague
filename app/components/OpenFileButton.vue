<template>
  <AppButton
    class="btn-primary btn-outline"
    label="Abrir"
    :icon-left="IconFolder"
    @click="openFileExplorer"
  />
</template>

<script lang="ts" setup>
import { IconFolder } from '@tabler/icons-vue';

const { tournaments, activeTournamentId } = storeToRefs(useTournamentStore());

function handleFileSelected(data: Tournament[]) {
  for (const tournament of data) {
    if (!tournaments.value.find((i) => i.id === tournament.id)) {
      tournaments.value.push(tournament);
    }
  }

  activeTournamentId.value = tournaments.value[tournaments.value.length - 1]?.id || null;
}

const { start: openFileExplorer } = useImportFile(handleFileSelected, { multiple: true });
</script>
