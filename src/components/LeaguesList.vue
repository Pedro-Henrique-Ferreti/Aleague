<template>
  <TabPanel
    class="leagues-tab-panel"
    :tabs="Object.values(LEAGUES_PAGE_TABS)"
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
      <pre>{{ displayedLeagues }}</pre>
    </div>
  </AppTransition>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { LEAGUES_PAGE_TABS } from '@/constants';

import AppTransition from './AppTransition.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import LeaguesListNoData from './LeaguesListNoData.vue';
import LeaguesListNoResults from './LeaguesListNoResults.vue';
import TabPanel from './TabPanel.vue';

const { openSnackbarNotification } = useNotificationStore();
const leaguesStore = useLeaguesStore();
const { leagues, searchBarValue } = storeToRefs(leaguesStore);

const activeTabId = ref(LEAGUES_PAGE_TABS.all.id);

// Get leagues
const isLoading = ref(false);

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
    displayedLeagues = leagues.value.filter(({ name }) => name.includes(searchBarValue.value));
  }

  if (activeTabId.value === LEAGUES_PAGE_TABS.cup.id ||
    activeTabId.value === LEAGUES_PAGE_TABS.playOffs.id
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
</style>
