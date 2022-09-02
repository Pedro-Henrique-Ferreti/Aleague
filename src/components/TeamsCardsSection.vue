<template>
  <TabPanel
    class="teams-tab-panel"
    :tabs="Object.values(filterTabs)"
    :active-tab-id="activeTabId"
    @set-active-tab="activeTabId = $event"
  >
    <template #controls>
      <AppButton
        color="outline"
        icon-left="package"
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
  <transition
    name="fade"
    mode="out-in"
  >
    <LoadingIndicator v-if="isLoading" />
    <NoTeamsFound v-else-if="teams.length === 0" />
    <SearchNotFound v-else-if="filteredTeams.length === 0" />
    <div
      v-else
      class="teams-card-grid"
    >
      <TeamsCard
        v-for="team in filteredTeams"
        :key="team.id"
        :name="team.name"
        :is-favorite="team.isFavorite"
      />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTeamsStore } from '@/stores/teamsStore';
import { useNotificationStore } from '@/stores/notificationStore';
import LoadingIndicator from './LoadingIndicator.vue';
import TabPanel from './TabPanel.vue';
import TeamsCard from './TeamsCard.vue';
import NoTeamsFound from './TeamsSectionNoTeamsFound.vue';
import SearchNotFound from './TeamsSectionSearchNotFound.vue';

const teamsStore = useTeamsStore();
const { openSnackbarNotification } = useNotificationStore();
const { teams } = storeToRefs(teamsStore);

const filterTabs = {
  all: {
    id: 1,
    name: 'Todos',
  },
  favorites: {
    id: 2,
    name: 'Favoritos',
  },
};

const activeTabId = ref(filterTabs.all.id);
const isLoading = ref(true);

const filteredTeams = computed(() => {
  if (activeTabId.value === filterTabs.favorites.id) {
    return teams.value.filter(({ isFavorite }) => isFavorite);
  }

  return teams.value;
});

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
</script>

<style lang="scss" scoped>
.teams-tab-panel {
  margin-bottom: 2rem;
}
.teams-card-grid {
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
