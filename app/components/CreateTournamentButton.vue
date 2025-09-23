<template>
  <AppModal
    ref="modalRef"
    title="Criar Campeonato"
    @close="onCloseModal"
  >
    <template #trigger="{ open }">
      <AppButton
        class="btn-primary btn-outline"
        label="Criar"
        :icon-left="IconPlus"
        @click="open"
      />
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
import { IconPlus } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

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

const form = ref<TournamentForm>(newForm());

const submitIsDisabled = computed(() => !form.value.name);

function submitForm() {
  const tournament = tournamentStore.createTournament(form.value);

  closeModal();
  
  tournamentStore.activeTournamentId = tournament.id;
}
</script>
