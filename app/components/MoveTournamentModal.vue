<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Mover arquivo"
    submit-button-label="Mover"
    @open="onModalOpen"
    @submit="submitForm"
  >
    <p>Selecione uma coleção para mover o campeonato:</p>
    <div class="grid gap-1 mt-1.5">
      <MoveTournamentCard
        v-for="collection in collectionStore.collections"
        v-model="collectionId"
        :key="collection.id"
        :value="collection.id"
        :label="collection.name"
      />
      <MoveTournamentCard
        v-model="collectionId"
        label="Nenhuma coleção"
        :icon="IconFolderX"
        :value="null"
      />
    </div>
  </AppModal>
</template>

<script lang="ts" setup>
import { IconFolderX } from '@tabler/icons-vue';

const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();

const modalIsOpen = defineModel<boolean>('is-open');

const collectionId = ref<Tournament['collectionId']>(null);

function onModalOpen() {
  collectionId.value = tournamentStore.activeTournament?.collectionId ?? null;
}

function submitForm() {
  if (tournamentStore.activeTournament) {
    tournamentStore.activeTournament.collectionId = collectionId.value;
  }

  modalIsOpen.value = false;
}
</script>
