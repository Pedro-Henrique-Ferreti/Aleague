<template>
  <AppDialog
    v-slot="{ open }"
    message="Deseja realmente excluir todas as partidas? Essa ação não poderá ser desfeita."
    @confirm="tournamentStore.deleteMatchweeks(tournamentStore.activeTournamentId!, stageId)"
  >
    <AppButton
      v-tooltip="'Rodada anterior'"
      class="btn-error btn-soft btn-sm btn-square"
      :icon-left="IconTrash"
      @click="open"
    />
  </AppDialog>
</template>

<script lang="ts" setup>
import { IconTrash } from '@tabler/icons-vue';

defineProps<{
  stageId: TournamentStage['id'];
}>();

const tournamentStore = useTournamentStore();
</script>
