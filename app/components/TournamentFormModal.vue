<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    :title="isEditingTournament ? 'Editar campeonato' : 'Criar campeonato'"
    :submit-button-disabled="r$.$invalid"
    :submit-button-label="isEditingTournament ? undefined : 'Criar'"
    @open="handleOpenModal"
    @submit="submitForm"
  >
    <template #trigger="slotProps">
      <slot
        name="trigger"
        v-bind="slotProps"
      />
    </template>
    <TournamentFormFields
      v-model="form"
      :form-namespace="FormNamespaces.TOURNAMENT_FORM_MODAL"
    />
  </AppModal>
</template>

<script setup lang="ts">
import type { AppModalSlots } from './AppModal.vue';

const props = defineProps<{
  tournament?: Tournament;
  submitFn: (form: TournamentForm) => Promise<void> | void;
}>();

defineSlots<Pick<AppModalSlots, 'trigger'>>();

const modalIsOpen = defineModel<boolean>('is-open');

const { r$ } = useCollectScope(FormNamespaces.TOURNAMENT_FORM_MODAL);

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

function handleOpenModal() {
  form.value = newForm();
  nextTick(r$.$reset);
}

async function submitForm() {
  await props.submitFn(form.value);

  modalIsOpen.value = false;
}
</script>
