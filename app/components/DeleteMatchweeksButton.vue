<template>
  <AppDialog
    type="delete"
    title="Excluir partidas"
    message="Você tem certeza que deseja excluir todas as partidas? Essa ação não poderá ser desfeita."
    @confirm="tournamentStore.deleteMatchweeks(tournamentStore.activeTournamentId!, stageId)"
  >
    <template #trigger="{ open }">
      <AppButton
        v-tooltip="'Excluir partidas'"
        class="btn-error btn-soft btn-sm btn-square"
        aria-label="Delete matchweeks"
        :icon-left="IconTrash"
        @click="open"
      />
    </template>
  </AppDialog>
</template>

<script lang="ts" setup>
import { IconTrash } from '@tabler/icons-vue';

defineProps<{
  stageId: TournamentStage['id'];
}>();

const tournamentStore = useTournamentStore();
</script>
