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
    <LeaguesListNoData v-else-if="competitions.length === 0" />
    <LeaguesListNoResults v-else-if="displayedCompetititons.length === 0" />
    <div
      v-else
      class="leagues-list"
    >
      <LeagueCard
        v-for="league in displayedCompetititons"
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
import type { CompetitionListItem } from '@/types/Competition';
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCompetitionStore } from '@/stores/competitionStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { leaguePageTabs } from '@/constants/tabPanelTabs';

import AppTransition from './AppTransition.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import LeagueCard from './LeagueCard.vue';
import LeaguesListNoData from './LeaguesListNoData.vue';
import LeaguesListNoResults from './LeaguesListNoResults.vue';
import TabPanel from './TabPanel.vue';

const { openSnackbarNotification } = useNotificationStore();
const competitionStore = useCompetitionStore();
const { searchBarValue } = storeToRefs(competitionStore);

const activeTabId = ref(leaguePageTabs.ALL.id);

const competitions = ref<CompetitionListItem[]>([]);

// Get competition
const isLoading = ref(true);

onMounted(() => getLeagues());

async function getLeagues() {
  isLoading.value = true;

  try {
    competitions.value = await competitionStore.getCompetitions();
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoading.value = false;
  }
}

// Displayed competitions
const displayedCompetititons = computed(() => {
  let displayedCompetititons = competitions.value;

  if (searchBarValue.value) {
    displayedCompetititons = competitions.value.filter(
      ({ name }) => name.toLowerCase().includes(searchBarValue.value.toLowerCase()),
    );
  }

  if (activeTabId.value === leaguePageTabs.ALL.id) {
    return displayedCompetititons;
  }

  return displayedCompetititons.filter(({ type }) => type === activeTabId.value);
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
