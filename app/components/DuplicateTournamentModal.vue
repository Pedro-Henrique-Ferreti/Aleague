<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Duplicar campeonato"
    submit-button-label="Duplicar"
    :submit-button-disabled="submitIsDisabled"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <AppInput
      v-model.trim="form.name"
      label="Nome"
    />
  </AppModal>
</template>

<script setup lang="ts">
import { appendNumericSuffix } from '~/helpers/file';

const tournamentStore = useTournamentStore();

const modalIsOpen = defineModel<boolean>('is-open');

const form = ref<DuplicateTournamentForm>({ name: '' });

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  tournamentStore.duplicateActiveTournament(form.value);
  modalIsOpen.value = false;
}

function onOpenModal() {
  form.value = {
    name: tournamentStore.activeTournament
      ? appendNumericSuffix(tournamentStore.activeTournament?.name, tournamentStore.tournamentList)
      : '',
  };
}
</script>
