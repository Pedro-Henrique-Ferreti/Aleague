<template>
  <TournamentFormModal
    v-slot="{ open }"
    :key="tournament?.id"
    :tournament="tournament"
    :submit-fn="(form) => tournamentStore.updateTournament(tournament?.id!, form)"
  >
    <AppButton
      class="btn-soft"
      label="Editar"
      :class="$attrs.class"
      :icon-left="IconEdit"
      @click="open"
    />
  </TournamentFormModal>
</template>

<script setup lang="ts">
import { IconEdit } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const tournament = computed(() => (
  tournamentStore.tournaments.find((i) => i.id === tournamentStore.activeTournamentId)
));
</script>
