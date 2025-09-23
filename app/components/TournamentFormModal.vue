<template>
  <AppModal
    ref="modalRef"
    :title="title"
    @close="onCloseModal"
  >
    <template #trigger="{ open }">
      <slot :open="open" />
    </template>
    <AppInput
      v-model="form.name"
      label="Nome"
      name="name"
      input-class="w-full"
    />
    <template #actions>
      <AppButton
        class="btn-primary"
        label="Salvar"
        :disabled="submitIsDisabled"
        @click="submitForm"
      />
    </template>
  </AppModal>  
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  submitFn: (form: TournamentForm) => Promise<void> | void;
  initialForm?: TournamentForm;
}>();

// Modal
const modal = useTemplateRef('modalRef');

function closeModal() {
  modal.value?.close();
}

function onCloseModal() {
  form.value = newForm();
}

// Form
const newForm = (): TournamentForm => ({
  name: '',
});

const form = ref<TournamentForm>(props.initialForm ?? newForm());

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  await props.submitFn(form.value);

  closeModal();
}
</script>
