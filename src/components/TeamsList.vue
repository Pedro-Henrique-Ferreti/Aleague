<template>
  <TabPanel
    class="teams-tab-panel"
    :tabs="Object.values(teamsPageTabs)"
    :active-tab-id="activeTabId"
    @set-active-tab="activeTabId = $event"
  >
    <template #controls>
      <AppButton
        color="outline"
        icon-left="package"
        @click="toggleShowTeamPackModal"
      >
        Pacotes
      </AppButton>
      <AppButton
        icon-left="plus"
        icon-rounded
      >
        Nova equipe
      </AppButton>
    </template>
  </TabPanel>
  <AppTransition name="fade">
    <LoadingIndicator v-if="isLoading" />
    <TeamsListNoData
      v-else-if="teams.length === 0"
      @action-button-click="toggleShowTeamPackModal"
    />
    <TeamsListNoResults
      v-else-if="filteredTeams.length === 0"
      @action-button-click="toggleShowTeamPackModal"
    />
    <div
      v-else
      class="teams-list"
    >
      <TeamsCard
        v-for="team in filteredTeams"
        :key="team.id"
        :name="team.name"
        :is-favorite="team.isFavorite"
        @click="selectedTeam = team"
      />
    </div>
  </AppTransition>
  <TeamPackModal
    :show="showTeamPackModal"
    @close="toggleShowTeamPackModal"
  />
  <TeamDetailsModal
    :show="!!selectedTeam"
    :team-name="selectedTeam?.name"
    :team-id="selectedTeam?.hashid"
    @close="selectedTeam = null"
  />
</template>

<script lang="ts" setup>
import type { TeamListItem } from '@/types/Team';
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useToggle } from '@vueuse/core';
import { useTeamsStore } from '@/stores/teamsStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { teamsPageTabs } from '@/constants/tabPanelTabs';

import AppTransition from './AppTransition.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import TabPanel from './TabPanel.vue';
import TeamsCard from './TeamsCard.vue';
import TeamsListNoData from './TeamsListNoData.vue';
import TeamsListNoResults from './TeamsListNoResults.vue';
import TeamDetailsModal from './TeamDetailsModal.vue';
import TeamPackModal from './TeamPackModal.vue';

const teamsStore = useTeamsStore();
const { openSnackbarNotification } = useNotificationStore();
const { teams, searchBarValue } = storeToRefs(teamsStore);

const activeTabId = ref(teamsPageTabs.ALL.id);
const showTeamPackModal = ref(false);

const toggleShowTeamPackModal = useToggle(showTeamPackModal);

const filteredTeams = computed(() => {
  let filteredTeams = teams.value;

  if (searchBarValue.value) {
    filteredTeams = filteredTeams.filter(
      ({ name }) => name.toLowerCase().includes(searchBarValue.value.toLowerCase()),
    );
  }

  if (activeTabId.value === teamsPageTabs.FAVORITES.id) {
    return filteredTeams.filter(({ isFavorite }) => isFavorite);
  }

  return filteredTeams;
});

// Get teams
const isLoading = ref(true);

onMounted(getTeams);

async function getTeams() {
  isLoading.value = true;

  try {
    await teamsStore.getTeams();
  } catch (error) {
    openSnackbarNotification({
      type: 'error',
      message: 'Não foi possível carregar a lista de equipes.',
    });
  } finally {
    isLoading.value = false;
  }
}

// Show team details
const selectedTeam = ref<TeamListItem | null>(null);
</script>

<style lang="scss" scoped>
.teams-tab-panel {
  margin-bottom: 2rem;
}
.teams-list {
  display: grid;
  gap: 1rem;
  @include for-tablet-portrait-up {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
  }
  @include for-desktop-up {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
