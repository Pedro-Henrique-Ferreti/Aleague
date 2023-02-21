<template>
  <div class="competition-matches-controls">
    <AppButton
      color="outline"
      aria-label="Apagar resultados"
      title="Apagar resultados"
      icon-left="trash-can-outline"
      @click="showResetGamesModal = true"
    />
    <SaveButton
      :is-loading="isSavingGames"
      @click="$emit('save-games')"
    />
    <ModalResetGames
      :show="showResetGamesModal"
      :is-loading="isResettingGames"
      @confirm="handleResetGames"
      @close="closeResetResultsModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, nextTick } from 'vue';
import { useNotificationStore } from '@/stores/notificationStore';
import { KEY_RESET_COMPETITION_GAMES, KEY_RELOAD_COMPETITION } from '@/constants/injectionKeys';
import SaveButton from './SaveButton.vue';
import ModalResetGames from './CompetitionModalResetGames.vue';

const { openSnackbarNotification } = useNotificationStore();

defineEmits(['save-games']);
defineProps({
  isSavingGames: {
    type: Boolean,
    default: false,
  },
});

const reloadCompetition = inject(KEY_RELOAD_COMPETITION);
const resetCompetitionGames = inject(KEY_RESET_COMPETITION_GAMES);

// Reset games modal
const showResetGamesModal = ref(false);

function closeResetResultsModal() {
  showResetGamesModal.value = false;
}

// Reset games
const isResettingGames = ref(false);

async function handleResetGames() {
  if (!resetCompetitionGames || !reloadCompetition) return;

  isResettingGames.value = true;

  try {
    await resetCompetitionGames();

    closeResetResultsModal();

    openSnackbarNotification({
      message: 'Resultados apagados com sucesso.',
    });

    await nextTick();

    reloadCompetition();
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isResettingGames.value = false;
  }
}
</script>

<style lang="scss" scoped>
.competition-matches-controls {
  display: flex;
  gap: 1rem;
}
</style>
