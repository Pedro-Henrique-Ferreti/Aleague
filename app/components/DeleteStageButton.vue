<template>
  <AppDialog
    v-slot="{ open }"
    message="Deseja realmente excluir essa fase? Essa ação não poderá ser desfeita."
    @confirm="tournamentStore.removeStage(tournamentStore.activeTournamentId!, stageId)"
  >
    <AppButton
      class="btn-soft btn-error"
      label="Excluir"
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
