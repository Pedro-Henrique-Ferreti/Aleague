<template>
  <AppButton
    class="btn-soft"
    label="Fechar"
    :icon-left="IconX"
    @click="tournamentStore.closeActiveTournament()"
  />
</template>

<script lang="ts" setup>
import { IconX } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();
</script>
