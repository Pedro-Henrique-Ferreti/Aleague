<template>
  <AppDialog
    v-slot="{ open }"
    message="Alterações não salvas serão perdidas. Deseja continuar?"
    @confirm="tournamentStore.closeActiveTournament"
  >
    <AppButton
      class="btn-soft"
      label="Fechar"
      :icon-left="IconX"
      @click="open"
    />
  </AppDialog>
</template>

<script lang="ts" setup>
import { IconX } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();
</script>
