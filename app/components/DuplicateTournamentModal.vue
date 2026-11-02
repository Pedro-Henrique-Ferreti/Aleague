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

const router = useRouter();
const fileStore = useFileStore();

const modalIsOpen = defineModel<boolean>('is-open');

const form = ref<DuplicateTournamentForm>({ name: '' });

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  const fileId = fileStore.activeFile?.id;

  if (!fileId) return;

  const tournament = fileStore.duplicateCollectionFileTournament(fileId, props.tournament.id, form.value);

  if (tournament) {
    router.push({ name: 'editor', params: { fileId, tournamentId: tournament.id } });
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
