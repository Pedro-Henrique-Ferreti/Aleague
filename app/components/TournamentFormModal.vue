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
    <div class="flex w-full gap-2 mt-1">
      <AppSelect
        v-model="form.iconId"
        label="Avatar"
        class="w-full"
        input-class="w-full"
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
