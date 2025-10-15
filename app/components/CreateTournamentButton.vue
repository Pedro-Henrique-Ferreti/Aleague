<template>
  <TournamentFormModal
    v-slot="{ open }"
    :submit-fn="submitForm"
  >
    <AppButton
      class="btn-primary btn-outline"
      label="Criar"
      :class="$attrs.class"
      :icon-left="IconPlus"
      @click="open"
    />
  </TournamentFormModal>
</template>

<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

function submitForm(form: TournamentForm) {
  const tournament = tournamentStore.createTournament(form);
  
  tournamentStore.activeTournamentId = tournament.id;
}
</script>
