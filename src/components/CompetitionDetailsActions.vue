<template>
  <section>
    <SectionHeader heading="h3">
      Ações
    </SectionHeader>
    <div class="actions-container">
      <AppButton
        color="outline"
        icon-left="refresh"
        @click="toggleShowModalRestart"
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
    <ModalRestart
      :show="showModalRestart"
      :is-loading="isRestartingCompetition"
      @close="toggleShowModalRestart"
      @confirm="handleRestartCompetition"
    />
    <ModalDelete
      ask-for-confirmation
      :show="showModalDelete"
      :competition-name="competition?.name"
      :is-loading="isDeletingCompetition"
      @close="toggleShowModalDelete"
      @confirm="handleDeleteCompetition"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref, inject, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '@/stores/notificationStore';
import {
  KEY_COMPETITION_DETAILS,
  KEY_RELOAD_COMPETITION,
  KEY_RESTART_COMPETITION,
  KEY_DELETE_COMPETITION,
} from '@/constants/injectionKeys';
import SectionHeader from './SectionHeader.vue';
import ModalRestart from './CompetitionModalRestart.vue';
import ModalDelete from './CompetitionModalDelete.vue';

const router = useRouter();
const { openSnackbarNotification } = useNotificationStore();

// Injected values
const competition = inject(KEY_COMPETITION_DETAILS);
const reloadCompetition = inject(KEY_RELOAD_COMPETITION);
const restartCompetition = inject(KEY_RESTART_COMPETITION);
const deleteCompetition = inject(KEY_DELETE_COMPETITION);

// Restart competition
const showModalRestart = ref(false);
const isRestartingCompetition = ref(false);

function toggleShowModalRestart() {
  showModalRestart.value = !showModalRestart.value;
}

async function handleRestartCompetition() {
  if (!restartCompetition || !reloadCompetition) return;

  isRestartingCompetition.value = true;

  try {
    await restartCompetition();

    toggleShowModalRestart();

    openSnackbarNotification({
      message: 'Campeonato reiniciado com sucesso.',
    });

    await nextTick();

    reloadCompetition();
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isRestartingCompetition.value = false;
  }
}

// Delete competition
const showModalDelete = ref(false);
const isDeletingCompetition = ref(false);

function toggleShowModalDelete() {
  showModalDelete.value = !showModalDelete.value;
}

async function handleDeleteCompetition() {
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
