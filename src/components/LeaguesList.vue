<template>
  <TabPanel
    class="leagues-tab-panel"
    :tabs="Object.values(leaguePageTabs)"
    :active-tab-id="activeTabId"
    @set-active-tab="activeTabId = $event"
  >
    <template #controls>
      <AppButton
        icon-left="plus"
        icon-rounded
        :to="{ name: 'create-league' }"
      >
        Novo campeonato
      </AppButton>
    </template>
  </TabPanel>
  <AppTransition name="fade">
    <LoadingIndicator v-if="isLoading" />
    <LeaguesListNoData v-else-if="leagues.length === 0" />
    <LeaguesListNoResults v-else-if="displayedLeagues.length === 0" />
    <div
      v-else
      class="leagues-list"
    >
      <LeagueCard
        v-for="league in displayedLeagues"
        :key="league.id"
        :hash-id="league.hashid"
        :title="league.name"
        :teams-count="league.numberOfTeams"
        :progress="league.progress"
        :steps-completed="league.stepsCompleted"
        :created-at="league.createdAt"
        :updated-at="league.updatedAt"
      />
    </div>
  </AppTransition>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { leaguePageTabs } from '@/constants/tabPanelTabs';

import AppTransition from './AppTransition.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import LeagueCard from './LeagueCard.vue';
import LeaguesListNoData from './LeaguesListNoData.vue';
import LeaguesListNoResults from './LeaguesListNoResults.vue';
import TabPanel from './TabPanel.vue';

const { openSnackbarNotification } = useNotificationStore();
const leaguesStore = useLeaguesStore();
const { leagues, searchBarValue } = storeToRefs(leaguesStore);

const activeTabId = ref(leaguePageTabs.ALL.id);

// Get leagues
const isLoading = ref(true);

onMounted(() => getLeagues());

async function getLeagues() {
  isLoading.value = true;

  try {
    await leaguesStore.getLeagues();
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoading.value = false;
  }
}

// Displayed leagues
const displayedLeagues = computed(() => {
  let displayedLeagues = leagues.value;

  if (searchBarValue.value) {
    displayedLeagues = leagues.value.filter(
      ({ name }) => name.toLowerCase().includes(searchBarValue.value.toLowerCase()),
    );
  }

  if (activeTabId.value === leaguePageTabs.CUP.id ||
    activeTabId.value === leaguePageTabs.PLAY_OFFS.id
  ) {
    return [];
  }

  return displayedLeagues;
});
</script>

<style lang="scss" scoped>
.leagues-tab-panel {
  margin-bottom: 2rem;
}
.leagues-list {
  display: grid;
  gap: 1rem;
  @include for-tablet-portrait-up {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
  }
  @include for-desktop-up {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
