<template>
  <TabPanel
    class="leagues-tab-panel"
    :tabs="Object.values(filterTabs)"
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
import TabPanel from './TabPanel.vue';

const filterTabs = {
  all: {
    id: 1,
    name: 'Todos',
  },
  cup: {
    id: 2,
    name: 'Copa',
  },
  playOffs: {
    id: 3,
    name: 'Eliminatórias',
  },
  leagues: {
    id: 4,
    name: 'Pontos corridos',
  },
};

const activeTabId = ref(filterTabs.all.id);
</script>

<style lang="scss" scoped>
.leagues-tab-panel {
  margin-bottom: 2rem;
}
</style>
