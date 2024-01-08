<template>
  <div class="container-medium">
    <AppTransition name="fade">
      <LoadingIndicator v-if="isLoadingLeague" />
      <div v-else-if="league">
        <CompetitionPageHeader
          :competition-name="league.name"
          :competition-icon="competitionFormats.LEAGUE.image"
          :competition-is-completed="league.progress === 100"
        />
        <CompetitionDetails />
        <div class="league-panel">
          <TabPanel
            v-model:active-tab-id="activeTabId"
            class="league-panel__tab-panel"
            :tabs="Object.values(leaguePanelTabs)"
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
import type { League } from '@/types/League';
import { provide, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useNotificationStore } from '@/stores/notification';
import {
  KEY_LEAGUE,
  KEY_COMPETITION_DETAILS,
  KEY_RESTART_COMPETITION,
  KEY_UPDATE_COMPETITION,
  KEY_DELETE_COMPETITION,
  KEY_RESET_COMPETITION_GAMES,
  KEY_RELOAD_COMPETITION,
} from '@/constants/injectionKeys';
import { leaguePanelTabs } from '@/constants/tabPanelTabs';
import { competitionFormats } from '@/constants/competitions';
import api from '@/api';
import AppTransition from '@/components/AppTransition.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import TabPanel from '@/components/TabPanel.vue';
import CompetitionPageHeader from '@/components/CompetitionPageHeader.vue';
import CompetitionDetails from '@/components/CompetitionDetails.vue';
import LeagueStandings from '@/components/LeagueStandings.vue';
import LeagueMatches from '@/components/LeagueMatches.vue';

const route = useRoute();
const { openSnackbarNotification } = useNotificationStore();

// League data
const league = ref<League | null>(null);

// League details
const leagueDetails = computed(() => ({
  name: league.value?.name || '',
  format: competitionFormats.LEAGUE.value,
  numberOfTeams: league.value?.rules?.numberOfTeams || 0,
  progress: league.value?.progress || 0,
  createdAt: league.value?.createdAt || '',
  updatedAt: league.value?.updatedAt || '',
}));

// League panel
const activeTabId = ref(leaguePanelTabs.STANDINGS.id);

// Get league data
const isLoadingLeague = ref(true);

getLeague();

async function getLeague({ showLoader }: ReloadCompetitionParams = { showLoader: true }) {
  isLoadingLeague.value = showLoader as boolean;

  try {
    const { data } = await api.leagueService.getLeagueById(route.params.id as string);

    league.value = data;
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
  return api.leagueService.updateLeague({
    id: league.value?.id || '',
    name,
  });
}

// Restart league
function restartCompetition() {
  return api.leagueService.restartLeague(league.value?.id || '');
}

// Reset league standings
function resetCompetitionStandings() {
  return api.leagueService.resetLeagueStandings(league.value?.id || '');
}

// Delete league
function deleteCompetition() {
  return api.leagueService.deleteLeague(league.value?.id || '');
}

// Provided values
provide(KEY_COMPETITION_DETAILS, leagueDetails);
provide(KEY_RESTART_COMPETITION, restartCompetition);
provide(KEY_UPDATE_COMPETITION, updateCompetition);
provide(KEY_DELETE_COMPETITION, deleteCompetition);
provide(KEY_RELOAD_COMPETITION, getLeague);
provide(KEY_RESET_COMPETITION_GAMES, resetCompetitionStandings);
provide(KEY_LEAGUE, league);
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