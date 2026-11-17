<template>
  <AppDialog
    v-model:is-open="modalIsOpen"
    type="delete"
    title="Excluir campeonato"
    @confirm="deleteTournament"
  >
    <p>
      Você tem certeza que deseja excluir <strong>{{ tournament.name }}</strong>? Essa ação não poderá ser
      desfeita e você não poderá recuperá-lo, a não ser que possua uma cópia salva.
    </p>
  </AppDialog>
</template>

<script lang="ts" setup>
const props = defineProps<{ tournament: Tournament }>();
const modalIsOpen = defineModel<boolean>('is-open');

const fileStore = useFileStore();

function deleteTournament() {
  const file = fileStore.getCollectionFileByTournament(props.tournament);

  if (file) {
    fileStore.deleteCollectionFileTournament(file.id, props.tournament.id);
  }

  modalIsOpen.value = false;
}
</script>
