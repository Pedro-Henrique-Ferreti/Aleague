<template>
  <div class="container-medium">
    <AppTransition name="fade">
      <LoadingIndicator v-if="isLoadingLeague" />
      <div v-else-if="league">
        <CompetitionPageHeader
          :competition-name="league.name"
          :competition-icon="competitionFormats.LEAGUE.image"
        />
        <CompetitionDetails />
        <div class="league-panel">
          <TabPanel
            class="league-panel__tab-panel"
            :tabs="Object.values(leaguePanelTabs)"
            :active-tab-id="activeTabId"
            @set-active-tab="activeTabId = $event"
          />
          <LeagueStandings
            v-show="activeTabId === leaguePanelTabs.STANDINGS.id"
            class="league-panel__item"
          />
          <LeagueMatches
            v-show="activeTabId === leaguePanelTabs.MATCHES.id"
            class="league-panel__item"
          />
        </div>
      </div>
    </AppTransition>
  </div>
</template>

<script lang="ts" setup>
import type { ReloadCompetitionParams, UpdateCompetitionParams } from '@/types/Competition';
import type { LeagueWithStandings } from '@/types/League';
import { provide, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';
import {
  injectionKeys,
  KEY_COMPETITION_DETAILS,
  KEY_DELETE_COMPETITION,
  KEY_RELOAD_COMPETITION,
  KEY_UPDATE_COMPETITION,
} from '@/constants/injectionKeys';
import { leaguePanelTabs } from '@/constants/tabPanelTabs';
import { competitionFormats } from '@/constants/competitionFormats';

import AppTransition from '@/components/AppTransition.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import TabPanel from '@/components/TabPanel.vue';
import CompetitionPageHeader from '@/components/CompetitionPageHeader.vue';
import CompetitionDetails from '@/components/CompetitionDetails.vue';
import LeagueStandings from '@/components/LeagueStandings.vue';
import LeagueMatches from '@/components/LeagueMatches.vue';

const route = useRoute();
const { getLeagueById, deleteLeague, updateLeague } = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

// League data
const league = ref<LeagueWithStandings | null>(null);

// League details
const leagueDetails = computed(() => ({
  name: league.value?.name || '',
  format: competitionFormats.LEAGUE.value,
  numberOfTeams: league.value?.numberOfTeams || 0,
  progress: league.value?.progress || 0,
  createdAt: league.value?.createdAt || '',
  updatedAt: league.value?.updatedAt || '',
}));

// Provided values
provide(KEY_COMPETITION_DETAILS, leagueDetails);
provide(KEY_UPDATE_COMPETITION, updateCompetition);
provide(KEY_DELETE_COMPETITION, deleteCompetition);
provide(KEY_RELOAD_COMPETITION, getLeague);

provide(injectionKeys.LEAGUE, league);
provide(injectionKeys.RELOAD_LEAGUE, getLeague);

// Get league data
const isLoadingLeague = ref(true);

getLeague();

async function getLeague({ showLoader }: ReloadCompetitionParams = { showLoader: true }) {
  isLoadingLeague.value = showLoader as boolean;

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

// Update league
function updateCompetition({ name }: UpdateCompetitionParams) {
  return updateLeague({
    hashId: league.value?.hashid || '',
    name,
  });
}

// Delete league
function deleteCompetition() {
  return deleteLeague(league.value?.hashid || '');
}
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