<template>
  <div class="container-medium">
    <AppTransition name="fade">
      <LoadingIndicator v-if="isLoadingLeague" />
      <div v-else-if="league">
        <LeagueHeader :league-name="league.name" />
        <LeagueDetails />
        <div class="league-panel">
          <TabPanel
            class="league-panel__tab-panel"
            :tabs="Object.values(LEAGUE_PANEL_TABS)"
            :active-tab-id="activeTabId"
            @set-active-tab="activeTabId = $event"
          />
          <LeagueStandings
            v-show="activeTabId === LEAGUE_PANEL_TABS.standings.id"
            class="league-panel__item"
          />
          <LeagueMatches
            v-show="activeTabId === LEAGUE_PANEL_TABS.matches.id"
            class="league-panel__item"
          />
        </div>
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
import { INJECTION_KEYS, LEAGUE_PANEL_TABS } from '@/constants';

import AppTransition from '@/components/AppTransition.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import TabPanel from '@/components/TabPanel.vue';
import LeagueHeader from '@/components/LeagueHeader.vue';
import LeagueDetails from '@/components/LeagueDetails.vue';
import LeagueStandings from '@/components/LeagueStandings.vue';
import LeagueMatches from '@/components/LeagueMatches.vue';

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

// League panel
const activeTabId = ref(LEAGUE_PANEL_TABS.standings.id);
</script>

<style lang="scss" scoped>
.league-panel {
  margin-top: 1.5rem;
  &__tab-panel {
    margin-bottom: 1.5rem;
  }
  @include for-desktop-up {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.5rem;
    .league-panel__tab-panel {
      display: none;
    }
    .league-panel__item {
      display: block !important;
    }
  }
}
</style>