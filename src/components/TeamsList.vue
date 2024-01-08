<template>
  <TabPanel
    v-model:active-tab-id="activeTabId"
    :tabs="Object.values(teamsPageTabs)"
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
  <div class="team-filters">
    <AppSearchField
      v-model="searchBarValue"
      placeholder="Pesquisar por uma equipe"
    />
  </div>
  <div class="team-list-wrapper">
    <AppTransition name="fade">
      <LoadingIndicator v-if="isLoading" />
      <AppEmptyState
        v-else-if="teams.length === 0"
        show-controls
        title="Não há equipes cadastradas"
        image-src="/images/business-analysis.svg"
        button-text="Acessar pacotes de equipe"
        @button-click="toggleShowTeamPackModal"
      >
        <p>Você ainda não criou nenhuma equipe. Você pode fazer isso através dos pacotes de equipe</p>
      </AppEmptyState>
      <AppEmptyState
        v-else-if="filteredTeams.length === 0"
        show-controls
        title="Nenhuma equipe encontrada"
        image-src="/images/business-analysis.svg"
        button-text="Acessar pacotes de equipe"
        @button-click="toggleShowTeamPackModal"
      >
        <p>Parece que a equipe que você está procurando ainda não existe. Que tal criá-la agora?</p>
      </AppEmptyState>
      <div
        v-else
        class="team-list"
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
  </div>
  <TeamPackModal
    :show="showTeamPackModal"
    @close="toggleShowTeamPackModal"
  />
  <TeamDetailsModal
    :show="!!selectedTeam"
    :team-name="selectedTeam?.name"
    :team-id="selectedTeam?.id"
    @close="selectedTeam = null"
  />
</template>

<script lang="ts" setup>
import type { TeamListItem } from '@/types/Team';
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useToggle } from '@vueuse/core';
import { useTeamsStore } from '@/stores/teams';
import { useNotificationStore } from '@/stores/notification';
import { teamsPageTabs } from '@/constants/tabPanelTabs';
import AppButton from './AppButton.vue';
import AppEmptyState from './AppEmptyState.vue';
import AppSearchField from './AppSearchField.vue';
import AppTransition from './AppTransition.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import TabPanel from './TabPanel.vue';
import TeamsCard from './TeamsCard.vue';
import TeamDetailsModal from './TeamDetailsModal.vue';
import TeamPackModal from './TeamPackModal.vue';

const teamsStore = useTeamsStore();
const { openSnackbarNotification } = useNotificationStore();
const { teams } = storeToRefs(teamsStore);

const activeTabId = ref(teamsPageTabs.ALL.id);
const showTeamPackModal = ref(false);
const searchBarValue = ref('');

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
.team-filters {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.25rem;
  @include for-tablet-portrait-up {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  @include for-desktop-up {
    grid-template-columns: repeat(3, 1fr);
  }
}
.team-list-wrapper {
  margin-top: 2rem;
}
.team-list {
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
