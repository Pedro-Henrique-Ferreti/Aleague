<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Editar coleção"
    :submit-button-disabled="submitIsDisabled"
    @open="form = newForm()"
    @submit="submitForm"
  >
    <CollectionFormFields v-model="form" />
  </AppModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  collection: CollectionFile;
}>();

const { updateCollection } = useCollectionStore();

const modalIsOpen = defineModel<boolean>('is-open');

const newForm = (): CollectionForm => ({ name: props.collection.data.name });

const form = ref(newForm());

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  updateCollection(props.collection.id, form.value);
  modalIsOpen.value = false;
}
</script>
