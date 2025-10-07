<template>
  <AppDialog
    v-slot="{ open }"
    message="Deseja realmente excluir todas as partidas? Essa ação não poderá ser desfeita."
    @confirm="tournamentStore.deleteMatchweeks(tournamentStore.activeTournamentId!, stageId)"
  >
    <div class="tooltip" data-tip="Excluir partidas">
      <AppButton
        class="btn-error btn-soft btn-sm btn-square"
        :icon-left="IconTrash"
        @click="open"
      />
    </div>
  </AppDialog>
</template>

<script lang="ts" setup>
import { IconTrash } from '@tabler/icons-vue';

defineProps<{
  stageId: TournamentStage['id'];
}>();

const tournamentStore = useTournamentStore();
</script>
