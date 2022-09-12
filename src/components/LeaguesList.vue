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
  </AppTransition>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { LEAGUES_PAGE_TABS } from '@/constants';

import AppTransition from './AppTransition.vue';
import TabPanel from './TabPanel.vue';
import LoadingIndicator from './LoadingIndicator.vue';

const leaguesStore = useLeaguesStore();

const activeTabId = ref(LEAGUES_PAGE_TABS.all.id);

// Get leagues
const isLoading = ref(false);

onMounted(() => getLeagues());

async function getLeagues() {
  isLoading.value = true;

  try {
    await leaguesStore.getLeagues();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.leagues-tab-panel {
  margin-bottom: 2rem;
}
</style>
