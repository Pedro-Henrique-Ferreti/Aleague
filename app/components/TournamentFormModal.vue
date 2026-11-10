<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    :title="isEditingTournament ? 'Editar campeonato' : 'Criar campeonato'"
    :submit-button-disabled="submitIsDisabled"
    :submit-button-label="isEditingTournament ? undefined : 'Criar'"
    @open="form = newForm()"
    @submit="submitForm"
  >
    <template #trigger="slotProps">
      <slot
        name="trigger"
        v-bind="slotProps"
      />
    </template>
    <TournamentFormFields v-model="form" />
  </AppModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  tournament?: Tournament;
  submitFn: (form: TournamentForm) => Promise<void> | void;
}>();

const modalIsOpen = defineModel<boolean>('is-open');

function newForm(): TournamentForm {
  return {
    name: props.tournament?.name ?? '',
    icon: props.tournament?.icon ?? ICON_OPTIONS[0]!.value,
    tags: props.tournament?.tags ?? [],
    showCountry: props.tournament?.showCountry ?? false,
  };
}

const form = ref(newForm());

const isEditingTournament = computed(() => !!props.tournament);
const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  await props.submitFn(form.value);

  modalIsOpen.value = false;
}
</script>
