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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LEAGUES_PAGE_TABS } from '@/constants';

import TabPanel from './TabPanel.vue';

const activeTabId = ref(LEAGUES_PAGE_TABS.all.id);
</script>

<style lang="scss" scoped>
.leagues-tab-panel {
  margin-bottom: 2rem;
}
</style>
