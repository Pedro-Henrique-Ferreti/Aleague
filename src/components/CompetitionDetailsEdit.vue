<template>
  <section>
    <SectionHeader heading="h3">
      Editar
    </SectionHeader>
    <form
      class="competition-details-form"
      @submit.prevent="submitForm"
    >
      <AppTextField
        id="league--field-name"
        label="Nome do campeonato"
        v-model.trim="fieldName"
      />
      <AppButton
        :disabled="submitButtonIsDisabled"
        :is-loading="isLoading"
      >
        Renomear
      </AppButton>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { inject, ref, computed } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import {
  KEY_COMPETITION_DETAILS,
  KEY_RELOAD_COMPETITION,
  KEY_UPDATE_COMPETITION,
} from '@/constants/injectionKeys';
import AppTextField from './AppTextField.vue';
import SectionHeader from './SectionHeader.vue';

const { openSnackbarNotification } = useNotificationStore();

// Injected values
const competition = inject(KEY_COMPETITION_DETAILS);
const updateCompetition = inject(KEY_UPDATE_COMPETITION);
const reloadCompetition = inject(KEY_RELOAD_COMPETITION);

// Form fields
const fieldName = ref(competition?.value.name || '');

// Submit form
const submitButtonIsDisabled = computed(() => {
  return fieldName.value === '' || fieldName.value === competition?.value.name;
});

const isLoading = ref(false);

async function submitForm() {
  if (!updateCompetition || !reloadCompetition) return;

  isLoading.value = true;

  try {
    await updateCompetition({
      name: fieldName.value,
    });

    openSnackbarNotification({
      message: 'Campeonato renomeado com sucesso!',
    });

    reloadCompetition();
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.competition-details-form {
  display: grid;
  gap: 1rem;
  @include for-tablet-portrait-up {
    grid-template-columns: 3fr 1fr;
    align-items: flex-end;
  }
}
</style>
