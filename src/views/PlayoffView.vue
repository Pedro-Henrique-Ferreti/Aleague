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
import type { PlayoffWithStandings } from '@/types/Playoff';
import { ref, computed, provide } from 'vue';
import { useRoute } from 'vue-router';
import { usePlayoffStore } from '@/stores/playoffStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitionFormats';
import {
  KEY_PLAYOFF,
  KEY_COMPETITION_DETAILS,
  KEY_DELETE_COMPETITION,
  KEY_RELOAD_COMPETITION,
  KEY_UPDATE_COMPETITION,
} from '@/constants/injectionKeys';

import AppTransition from '@/components/AppTransition.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import CompetitionPageHeader from '@/components/CompetitionPageHeader.vue';
import CompetitionDetails from '@/components/CompetitionDetails.vue';
import PlayoffStandings from '@/components/PlayoffStandings.vue';

const route = useRoute();
const { getPlayoffById, updatePlayoff, deletePlayoff } = usePlayoffStore();
const { openSnackbarNotification } = useNotificationStore();

// Playoff data
const playoff = ref<PlayoffWithStandings | null>(null);

// Playoff details
const playoffDetails = computed(() => ({
  name: playoff.value?.name || '',
  format: competitionFormats.PLAYOFF.value,
  numberOfTeams: playoff.value?.numberOfTeams || 0,
  progress: playoff.value?.progress || 0,
  createdAt: playoff.value?.createdAt || '',
  updatedAt: playoff.value?.updatedAt || '',
}));

// Provided values
provide(KEY_COMPETITION_DETAILS, playoffDetails);
provide(KEY_UPDATE_COMPETITION, updateCompetition);
provide(KEY_DELETE_COMPETITION, deleteCompetition);
provide(KEY_RELOAD_COMPETITION, getPlayoff);
provide(KEY_PLAYOFF, playoff);

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

// Update playoff
function updateCompetition({ name }: UpdateCompetitionParams) {
  return updatePlayoff({
    hashId: playoff.value?.hashid || '',
    name,
  });
}

// Delete playoff
function deleteCompetition() {
  return deletePlayoff(playoff.value?.hashid || '');
}
</script>
