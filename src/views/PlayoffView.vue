<template>
  <div class="container-medium">
    <AppTransition name="fade">
      <LoadingIndicator v-if="isLoadingPlayoff" />
      <div v-else-if="playoff">
        <CompetitionPageHeader
          :competition-name="playoff.name"
          :competition-icon="competitionFormats.PLAYOFF.image"
        />
        <CompetitionDetails />
        <PlayoffStandings />
      </div>
    </AppTransition>
  </div>
</template>

<script lang="ts" setup>
import type { ReloadCompetitionParams, UpdateCompetitionParams } from '@/types/Competition';
import type { PlayoffWithRounds } from '@/types/Playoff';
import { ref, computed, provide } from 'vue';
import { useRoute } from 'vue-router';
import { usePlayoffStore } from '@/stores/playoffStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitions';
import {
  KEY_PLAYOFF,
  KEY_COMPETITION_DETAILS,
  KEY_RESTART_COMPETITION,
  KEY_DELETE_COMPETITION,
  KEY_RELOAD_COMPETITION,
  KEY_UPDATE_COMPETITION,
  KEY_RESET_COMPETITION_GAMES,
} from '@/constants/injectionKeys';

import AppTransition from '@/components/AppTransition.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import CompetitionPageHeader from '@/components/CompetitionPageHeader.vue';
import CompetitionDetails from '@/components/CompetitionDetails.vue';
import PlayoffStandings from '@/components/PlayoffStandings.vue';

const route = useRoute();
const {
  getPlayoffById,
  restartPlayoff,
  updatePlayoff,
  resetPlayoffGames,
  deletePlayoff,
} = usePlayoffStore();
const { openSnackbarNotification } = useNotificationStore();

// Playoff data
const playoff = ref<PlayoffWithRounds | null>(null);

// Playoff details
const playoffDetails = computed(() => ({
  name: playoff.value?.name || '',
  format: competitionFormats.PLAYOFF.value,
  numberOfTeams: playoff.value?.rules?.numberOfTeams || 0,
  progress: playoff.value?.progress || 0,
  createdAt: playoff.value?.createdAt || '',
  updatedAt: playoff.value?.updatedAt || '',
}));

// Get playoff data
const isLoadingPlayoff = ref(false);

getPlayoff();

async function getPlayoff({ showLoader }: ReloadCompetitionParams = { showLoader: true }) {
  isLoadingPlayoff.value = showLoader as boolean;

  try {
    playoff.value = await getPlayoffById(route.params.id as string);
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingPlayoff.value = false;
  }
}

// Restart playoff
function restartCompetition() {
  return restartPlayoff(playoff.value?.id || '');
}

// Update playoff
function updateCompetition({ name }: UpdateCompetitionParams) {
  return updatePlayoff({
    id: playoff.value?.id || '',
    name,
  });
}

// Reset playoff games
function resetCompetitionGames() {
  return resetPlayoffGames(playoff.value?.id || '');
}

// Delete playoff
function deleteCompetition() {
  return deletePlayoff(playoff.value?.id || '');
}

// Provided values
provide(KEY_COMPETITION_DETAILS, playoffDetails);
provide(KEY_RESTART_COMPETITION, restartCompetition);
provide(KEY_UPDATE_COMPETITION, updateCompetition);
provide(KEY_DELETE_COMPETITION, deleteCompetition);
provide(KEY_RESET_COMPETITION_GAMES, resetCompetitionGames);
provide(KEY_RELOAD_COMPETITION, getPlayoff);
provide(KEY_PLAYOFF, playoff);
</script>
