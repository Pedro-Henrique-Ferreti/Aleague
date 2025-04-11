<template>
  <section class="groups">
    <header class="groups__header">
      <h2 class="groups__title">
        Grupos
      </h2>
      <AppButton
        :icon-left="IconPlus"
        @click="showGroupForm = true"
      >
        Novo Grupo
      </AppButton>
    </header>
    <div class="groups__list">
      list
    </div>
    <AppModal
      title="Novo grupo"
      confirm-button-text="Adicionar"
      :show="showGroupForm"
      :confirm-button-is-loading="isSaving"
      :confirm-button-is-disabled="!form.groupName || !form.tournaments.length"
      @close="showGroupForm = false"
      @confirm="submitForm"
    >
      <AppInput
        v-model="form.groupName"
        label="Nome do grupo"
      />
      <span class="groups__modal-label">
        Campeonatos
      </span>
      <div class="groups__modal-list">
        <AppToggle
          v-for="tournament in tournaments"
          :model-value="form.tournaments.includes(tournament.id)"
          :key="tournament.id"
          :value="tournament.id"
          :text="tournament.name"
          @update:model-value="onUpdateTournaments(tournament.id)"
        />
      </div>
    </AppModal>
  </section>
</template>

<script lang="ts" setup>
import type { TournamentPreview } from '@/types/Tournament';
import { ref, watch } from 'vue';
import { useToast } from '@/composables/toast';
import api from '@/api';
import IconPlus from '@/assets/icons/Plus.svg';
import AppButton from './AppButton.vue';
import AppModal from './AppModal.vue';
import AppInput from './AppInput.vue';
import AppToggle from './AppToggle.vue';

const toast = useToast();

defineProps<{
  tournaments: TournamentPreview[];
}>();

// Group form
const form = ref({
  groupName: '',
  tournaments: [] as string[],
});
const showGroupForm = ref(false);

watch(() => showGroupForm.value, (value) => {
  if (!value) {
    form.value.groupName = '';
    form.value.tournaments = [];
  }
});

function onUpdateTournaments(tournamentId: string) {
  if (form.value.tournaments.includes(tournamentId)) {
    form.value.tournaments = form.value.tournaments.filter((id) => id !== tournamentId);
  } else {
    form.value.tournaments.push(tournamentId);
  }
}

// Submit form
const isSaving = ref(false);

async function submitForm() {
  isSaving.value = true;

  try {
    await api.tournamentService.createTournamentGroup({
      name: form.value.groupName,
      competitions: form.value.tournaments,
    });

    showGroupForm.value = false;
  } catch (error: any) {
    toast.error('Nao foi possivel criar o grupo. Por favor, tente novamente.');
  } finally {
    isSaving.value = false;
  }
}
</script>

<style lang="scss" scoped>
.groups {
  margin-top: 2.5rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 0.75rem;
  }
  &__title {
    color: $color--text-strong;
    font-size: 1.25rem;
    font-weight: $font-weight--medium;
  }
  &__list {
    display: grid;
    gap: 0.75rem;
  }
  &__modal-label {
    display: block;
    margin-top: 1rem;
    color: $color--text-strong;
    font-size: 0.875rem;
  }
  &__modal-list {
    display: grid;
    gap: 0.75rem;
    margin-top: 1rem;
  }
}
</style>
