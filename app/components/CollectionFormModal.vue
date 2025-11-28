<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    :title="collection ? 'Editar coleção' : 'Criar coleção'"
    :submit-button-disabled="submitIsDisabled"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <AppInput
      v-model="form.name"
      label="Nome"
    />
  </AppModal>  
</template>

<script setup lang="ts">
const props = defineProps<{
  collection?: Collection;
  submitFn: (form: CollectionForm) => Promise<void> | void;
}>();

const modalIsOpen = defineModel<boolean>('is-open');

function onOpenModal() {
  if (props.collection) {
    form.value = {
      name: props.collection.name,
    };
    return;
  }

  form.value = newForm();
}

// Form
const newForm = (): CollectionForm => ({
  name: '',
});

const form = ref<CollectionForm>(newForm());

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  await props.submitFn(form.value);

  modalIsOpen.value = false;
}
</script>
