<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    :title="tournament ? 'Editar campeonato' : 'Criar campeonato'"
    :submit-button-disabled="submitIsDisabled"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <template #trigger="{ open }">
      <slot :open="open" />
    </template>
    <div class="grid gap-0.75">
      <AppInput
        v-model="form.name"
        label="Nome"
      />
      <TagInput v-model="form.tags" />
    </div>
    <div class="grid grid-cols-[1fr_auto] gap-x-2 gap-y-0.75 mt-1">
      <AppSelect
        v-model="form.iconId"
        label="Avatar"
        :options="TOURNAMENT_ICONS_OPTIONS"
      />
      <div class="flex justify-center size-5">
        <img
          class="h-5"
          alt="Icon preview"
          :src="getTournamentIcon(form.iconId)"
        />
      </div>
      <div class="flex gap-0.5 col-end-3 justify-between">
        <AppButton
          class="btn-square btn-sm"
          aria-label="Show previous avatar"
          :icon-left="IconChevronLeft"
          @click="selectIcon(form.iconId - 1)"
        />
        <AppButton
          class="btn-square btn-sm"
          aria-label="Show next avatar"
          :icon-left="IconChevronRight"
          @click="selectIcon(form.iconId + 1)"
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
import { getTournamentIcon } from '~/helpers/tournament';

const props = defineProps<{
  tournament?: Tournament;
  submitFn: (form: TournamentForm) => Promise<void> | void;
}>();

const modalIsOpen = defineModel<boolean>('is-open');

function onOpenModal() {
  if (props.tournament) {
    form.value = {
      iconId: props.tournament.iconId,
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
  iconId: 1,
  tags: [],
  showCountry: false,
});

const form = ref<TournamentForm>(newForm());

function selectIcon(id: number) {
  if (id < 1) {
    form.value.iconId = TOURNAMENT_ICONS_OPTIONS.length;
  } else {
    form.value.iconId = id > TOURNAMENT_ICONS_OPTIONS.length ? 1 : id;
  }
}

const submitIsDisabled = computed(() => !form.value.name);

async function submitForm() {
  await props.submitFn(form.value);

  modalIsOpen.value = false;
}
</script>
