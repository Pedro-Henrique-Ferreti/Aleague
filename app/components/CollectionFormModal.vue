<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    :title="isEditingCollection ? 'Editar coleção' : 'Criar coleção'"
    :submit-button-disabled="submitIsDisabled"
    :submit-button-label="isEditingCollection ? undefined : 'Criar'"
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
const { createCollection } = useCollectionStore();

const props = defineProps<{
  collection?: Collection;
}>();

const modalIsOpen = defineModel<boolean>('is-open');

function onOpenModal() {
  if (!props.collection) {
    form.value = newForm();
    return;
  }

  form.value = {
    name: props.collection.name,
  };
}

// Form
const newForm = (): CollectionForm => ({ name: '' });

const form = ref<CollectionForm>(newForm());
const isEditingCollection = computed(() => !!props.collection);

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  createCollection(form.value);

  modalIsOpen.value = false;
}
</script>
