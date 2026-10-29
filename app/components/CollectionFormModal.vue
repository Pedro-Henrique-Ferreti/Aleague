<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    :title="isEditingCollection ? 'Renomear coleção' : 'Criar coleção'"
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
import { newCollection } from '~/helpers/collection';
import { createCollectionFile } from '~/helpers/file';

const props = defineProps<{
  collection?: Collection;
}>();

const fileStore = useFileStore();
const { updateCollection } = useCollectionStore();

const modalIsOpen = defineModel<boolean>('is-open');

const newForm = (): CollectionForm => ({ name: '' });

const form = ref<CollectionForm>(newForm());
const isEditingCollection = computed(() => !!props.collection);

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  if (isEditingCollection.value) {
    updateCollection(props.collection!.id, form.value);
  } else {
    fileStore.addFileToStore(createCollectionFile(newCollection(form.value), []));
  }

  modalIsOpen.value = false;
}

function onOpenModal() {
  if (!props.collection) {
    form.value = newForm();
    return;
  }

  form.value = {
    name: props.collection.name,
  };
}
</script>
