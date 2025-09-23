<template>
  <AppButton
    class="btn-primary btn-outline"
    label="Exportar"
    :icon-left="IconFileArrowRight"
    @click="tournamentStore.exportTournament(tournamentStore.activeTournamentId!)"
  />
</template>

<script lang="ts" setup>
import { IconFileArrowRight } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();
</script>
