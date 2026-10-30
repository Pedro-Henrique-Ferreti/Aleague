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

const props = defineProps<{
  tournament: Tournament;
}>();
const fileStore = useFileStore();
const tournamentStore = useTournamentStore();

const modalIsOpen = defineModel<boolean>('is-open');

const form = ref<DuplicateTournamentForm>({ name: '' });

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  if (!fileStore.activeFile) return;

  const tournament = fileStore.duplicateCollectionFileTournament(
    fileStore.activeFile!.id,
    props.tournament.id,
    form.value,
  );

  if (tournament) {
    tournamentStore.setActiveTournament(tournament.id);
  }

  modalIsOpen.value = false;
}

function onOpenModal() {
  const file = fileStore.getCollectionFileByTournament(props.tournament);

  form.value = {
    name: appendNumericSuffix(props.tournament.name, Object.values(file?.data.tournaments ?? {})),
  };
}
</script>
