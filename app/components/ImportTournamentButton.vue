<template>
  <AppButton
    class="btn-primary btn-outline"
    label="Importar"
    :icon-left="IconFileArrowLeft"
    @click="importTournaments"
  />
</template>

<script lang="ts" setup>
import { IconFileArrowLeft } from '@tabler/icons-vue';

const { tournaments, activeTournamentId } = storeToRefs(useTournamentStore());

function handleImportTournament(data: Tournament[]) {
  for (const tournament of data) {
    if (tournaments.value.find((i) => i.id === tournament.id)) return;

    tournaments.value.push(tournament);
  }

  activeTournamentId.value = tournaments.value[tournaments.value.length - 1]?.id || null;
}

const { start: importTournaments } = useImportTournament(handleImportTournament, { multiple: true });
</script>
