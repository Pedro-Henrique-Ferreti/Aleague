<template>
  <AppDialog
    v-model:is-open="modalIsOpen"
    type="delete"
    title="Excluir campeonato"
    @confirm="deleteTournament"
  >
    <p>
      Você tem certeza que deseja excluir <strong>{{ tournamentStore.activeTournament?.name }}</strong>? Essa ação não poderá ser
      desfeita e você não poderá recuperá-lo, a não ser que possua uma cópia salva.
    </p>
  </AppDialog>
</template>

<script lang="ts" setup>
const modalIsOpen = defineModel<boolean>('is-open');

const tournamentStore = useTournamentStore();

function deleteTournament() {
  tournamentStore.deleteActiveTournament();
  modalIsOpen.value = false;
}
</script>
