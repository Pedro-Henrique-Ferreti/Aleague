<template>
  <AppModal
    ref="modalRef"
    :title="title"
    @open="onOpenModal"
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

function onOpenModal() {
  form.value = props.initialForm ?? newForm();
}

// Form
const newForm = (): TournamentForm => ({
  name: '',
});

const form = ref<TournamentForm>(newForm());

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  await props.submitFn(form.value);

  closeModal();
}
</script>
