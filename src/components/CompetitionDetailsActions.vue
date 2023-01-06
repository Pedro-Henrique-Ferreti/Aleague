<template>
  <section>
    <SectionHeader heading="h3">
      Ações
    </SectionHeader>
    <div class="actions-container">
      <AppButton
        color="outline"
        icon-left="refresh"
      >
        Reiniciar campeonato
      </AppButton>
      <AppButton
        color="dangerGray"
        icon-left="trash-can-outline"
        @click="toggleShowModalDelete"
      >
        Excluir campeonato
      </AppButton>
    </div>
    <ModalDelete
      ask-for-confirmation
      :show="showModalDelete"
      :competition-name="competition?.name"
      :is-loading="isDeletingCompetition"
      @close="toggleShowModalDelete"
      @confirm="handleConfirm"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '@/stores/notificationStore';
import { KEY_COMPETITION_DETAILS, KEY_DELETE_COMPETITION } from '@/constants/injectionKeys';
import SectionHeader from './SectionHeader.vue';
import ModalDelete from './CompetitionModalDelete.vue';

const router = useRouter();
const { openSnackbarNotification } = useNotificationStore();

// Injected values
const competition = inject(KEY_COMPETITION_DETAILS);
const deleteCompetition = inject(KEY_DELETE_COMPETITION);

const showModalDelete = ref(false);

function toggleShowModalDelete() {
  showModalDelete.value = !showModalDelete.value;
}

// Delete competition
const isDeletingCompetition = ref(false);

async function handleConfirm() {
  if (!deleteCompetition) return;

  isDeletingCompetition.value = true;

  try {
    await deleteCompetition();

    toggleShowModalDelete();

    openSnackbarNotification({
      message: 'Campeonato excluído com sucesso.',
    });

    router.push({ name: 'leagues' });
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isDeletingCompetition.value = false;
  }
}
</script>

<style lang="scss" scoped>
.actions-container {
  display: flex;
  gap: 1.5rem;
  @include for-tablet-portrait-down {
    flex-direction: column;
  }
}
</style>
