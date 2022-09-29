<template>
  <div class="container-medium">
    <AppTransition name="fade">
      <LoadingIndicator v-if="isLoadingLeague" />
      <div v-else-if="league">
        <LeagueHeader :league-name="league.name" />
        <LeagueDetails />
      </div>
    </AppTransition>
  </div>
</template>

<script lang="ts" setup>
import type { LeagueWithStandings } from '@/types/League';
import { provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { INJECTION_KEYS } from '@/constants';

import AppTransition from '@/components/AppTransition.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import LeagueHeader from '@/components/LeagueHeader.vue';
import LeagueDetails from '@/components/LeagueDetails.vue';

const route = useRoute();
const { getLeagueById } = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

// League data
const league = ref<LeagueWithStandings | null>(null);

provide(INJECTION_KEYS.league, league);
provide(INJECTION_KEYS.reloadLeague, getLeague);

const isLoadingLeague = ref(true);

getLeague();

async function getLeague() {
  isLoadingLeague.value = true;

  try {
    league.value = await getLeagueById(route.params.id as string);
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingLeague.value = false;
  }
}
</script>
