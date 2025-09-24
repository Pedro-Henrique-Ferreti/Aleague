<template>
  <AppModal
    ref="modalRef"
    :title="title"
    :submit-button-disabled="submitIsDisabled"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <template #trigger="{ open }">
      <slot :open="open" />
    </template>
    <AppInput
      v-model="form.name"
      label="Nome"
      name="name"
    />
    <div class="flex w-full gap-2 mt-1">
      <AppSelect
        v-model="form.iconId"
        label="Avatar"
        class="w-full"
        :options="TOURNAMENT_ICONS_OPTIONS"
      />
      <div class="w-5 h-5">
        <img
          class="h-5"
          alt="Icon preview"
          :src="getTournamentIcon(form.iconId)"
        />
      </div>
    </div>
  </AppModal>  
</template>

<script setup lang="ts">
import { getTournamentIcon } from '~/helpers/tournament';

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
  iconId: 1,
});

const form = ref<TournamentForm>(newForm());

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  await props.submitFn(form.value);

  closeModal();
}
</script>
