<template>
  <div class="container-medium">
    <AppTransition name="fade">
      <LoadingIndicator v-if="isLoadingLeague" />
      <pre v-else>{{ league }}</pre>
    </AppTransition>
  </div>
</template>

<script lang="ts" setup>
import type { LeagueWithStandings } from '@/types/League';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';

import AppTransition from '@/components/AppTransition.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';

const route = useRoute();
const { getLeagueById } = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

// League data
const league = ref<LeagueWithStandings | null>(null);
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

<style lang="scss" scoped>

</style>
