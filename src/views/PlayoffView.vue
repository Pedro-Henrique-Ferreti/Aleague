<template>
  <div class="container-medium">
    <AppTransition name="fade">
      <LoadingIndicator v-if="isLoadingPlayoff" />
      <div v-else-if="playoff">
        <CompetitionPageHeader
          :competition-name="playoff.name"
          :competition-icon="competitionFormats.PLAYOFF.image"
        />
      </div>
    </AppTransition>
  </div>
</template>

<script lang="ts" setup>
import type { PlayoffWithStandings } from '@/types/Playoff';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePlayoffStore } from '@/stores/playoffStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitionFormats';

import AppTransition from '@/components/AppTransition.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import CompetitionPageHeader from '@/components/CompetitionPageHeader.vue';

const route = useRoute();
const { getPlayoffById } = usePlayoffStore();
const { openSnackbarNotification } = useNotificationStore();

const playoff = ref<PlayoffWithStandings | null>(null);

// Get playoff
const isLoadingPlayoff = ref(false);

getPlayoff();

async function getPlayoff() {
  isLoadingPlayoff.value = true;

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
</script>
