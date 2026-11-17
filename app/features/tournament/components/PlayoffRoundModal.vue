<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Renomear rodada"
    submit-button-label="Salvar"
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
interface PlayoffRoundForm {
  name: PlayoffRound['name'];
}

const modalIsOpen = defineModel<boolean>('is-open');
const round = defineModel<PlayoffRound>('round', { required: true });

const form = ref<PlayoffRoundForm>({ name: '' });

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  round.value.name = form.value.name;

  modalIsOpen.value = false;
}

function onOpenModal() {
  form.value = {
    name: round.value.name,
  };
}
</script>
