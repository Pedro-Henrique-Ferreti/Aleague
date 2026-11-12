<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Editar coleção"
    :submit-button-disabled="r$.$invalid"
    @open="form = newForm()"
    @submit="submitForm"
  >
    <CollectionFormFields
      v-model="form"
      :form-namespace="FormNamespaces.EDIT_COLLECTION_MODAL"
    />
  </AppModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  collection: CollectionFile;
}>();

const { updateCollection } = useCollectionStore();
const { r$ } = useCollectScope(FormNamespaces.EDIT_COLLECTION_MODAL);

const modalIsOpen = defineModel<boolean>('is-open');

const newForm = (): CollectionForm => ({ name: props.collection.data.name });

const form = ref(newForm());

async function submitForm() {
  updateCollection(props.collection.id, form.value);
  modalIsOpen.value = false;
}
</script>
