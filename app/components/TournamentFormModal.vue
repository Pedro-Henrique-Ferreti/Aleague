<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    :title="isEditingTournament ? 'Editar campeonato' : 'Criar campeonato'"
    :submit-button-disabled="submitIsDisabled"
    :submit-button-label="isEditingTournament ? undefined : 'Criar'"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <div class="grid gap-0.75">
      <AppInput
        v-model="form.name"
        label="Nome"
      />
      <TagInput v-model="form.tags" />
    </div>
    <div class="grid grid-cols-[1fr_auto] gap-x-2 gap-y-0.75 mt-1">
      <AppSelect
        v-model="form.icon"
        label="Logo"
        :options="ICON_OPTIONS"
      />
      <div class="flex justify-center size-5">
        <img
          class="h-5"
          alt="Icon preview"
          :src="form.icon"
        />
      </div>
      <div class="flex gap-0.5 col-end-3 justify-between">
        <AppButton
          class="btn-square btn-sm"
          aria-label="Show previous avatar"
          :icon-left="IconChevronLeft"
          @click="changeIcon(-1)"
        />
        <AppButton
          class="btn-square btn-sm"
          aria-label="Show next avatar"
          :icon-left="IconChevronRight"
          @click="changeIcon(1)"
        />
      </div>
    </div>
    <AppToggle
      v-model="form.showCountry"
      label="Mostrar legenda de país"
    />
  </AppModal>  
</template>

<script setup lang="ts">
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

const props = defineProps<{
  tournament?: Tournament;
  submitFn: (form: TournamentForm) => Promise<void> | void;
}>();

const modalIsOpen = defineModel<boolean>('is-open');

function onOpenModal() {
  if (props.tournament) {
    form.value = {
      icon: props.tournament.icon,
      name: props.tournament.name,
      tags: props.tournament.tags,
      showCountry: props.tournament.showCountry,
    };
    return;
  }

  form.value = newForm();
}

// Form
const newForm = (): TournamentForm => ({
  name: '',
  icon: ICON_OPTIONS[0]!.value,
  tags: [],
  showCountry: false,
});

const form = ref<TournamentForm>(newForm());
const isEditingTournament = computed(() => !!props.tournament);

const selectedIconIndex = computed(() => ICON_OPTIONS.findIndex(({ value }) => value === form.value.icon));

function changeIcon(value: -1 | 1) {
  let index = selectedIconIndex.value + value;

  if (index < 0) {
    index = ICON_OPTIONS.length - 1;
  } else if (index >= ICON_OPTIONS.length) {
    index = 0;
  }

  form.value.icon = ICON_OPTIONS[index]!.value;
}

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  await props.submitFn(form.value);

  modalIsOpen.value = false;
}
</script>
