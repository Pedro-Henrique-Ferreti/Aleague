<template>
  <TabPanel
    v-model:active-tab-id="activeTabId"
    class="leagues-tab-panel"
    :tabs="Object.values(competitionPageTabs)"
  >
    <template #controls>
      <AppButton
        icon-left="plus"
        icon-rounded
        :to="{ name: 'create-competition' }"
      >
        Novo campeonato
      </AppButton>
    </template>
  </TabPanel>
  <AppTransition name="fade">
    <div
      v-if="isLoading"
      class="leagues-list"
    >
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
    <CompetitionsListNoData v-else-if="competitions.length === 0" />
    <CompetitionsListNoResults v-else-if="displayedCompetititons.length === 0" />
    <div
      v-else
      class="leagues-list"
    >
      <CompetitionCard
        v-for="competition in displayedCompetititons"
        :key="competition.id"
        :id="competition.id"
        :title="competition.name"
        :competition-format="competition.type"
        :teams-count="competition.numberOfTeams"
        :progress="competition.progress"
        :steps-completed="competition.stepsCompleted"
        :created-at="competition.createdAt"
        :updated-at="competition.updatedAt"
        @delete="openDeleteCompetitionModal(competition.id, competition.type)"
      />
    </div>
  </AppTransition>
  <CompetitionModalDelete
    :show="showDeleteCompetitionModal"
    :is-loading="isDeletingCompetition"
    @close="closeDeleteCompetitionModal"
    @confirm="deleteCompetition"
  />
</template>

<script lang="ts" setup>
import type { CompetitionFormat, CompetitionListItem } from '@/types/Competition';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCompetitionStore } from '@/stores/competitionStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { usePlayoffStore } from '@/stores/playoffStore';
import { competitionPageTabs } from '@/constants/tabPanelTabs';
import { competitionFormats } from '@/constants/competitionFormats';

import AppTransition from './AppTransition.vue';
import CompetitionCard from './CompetitionCard.vue';
import CompetitionModalDelete from './CompetitionModalDelete.vue';
import CompetitionsListNoData from './CompetitionsListNoData.vue';
import CompetitionsListNoResults from './CompetitionsListNoResults.vue';
import TabPanel from './TabPanel.vue';
import SkeletonCard from './SkeletonCompetitionCard.vue';

const { openSnackbarNotification } = useNotificationStore();
const { deleteLeague } = useLeaguesStore();
const { deletePlayoff } = usePlayoffStore();
const competitionStore = useCompetitionStore();
const { searchBarValue } = storeToRefs(competitionStore);

const activeTabId = ref(competitionPageTabs.ALL.id);

const competitions = ref<CompetitionListItem[]>([]);

// Get competition
const isLoading = ref(true);

getCompetitions();

async function getCompetitions() {
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

  if (activeTabId.value === competitionPageTabs.ALL.id) {
    return displayedCompetititons;
  }

  return displayedCompetititons.filter(({ type }) => type === activeTabId.value);
});

// Delete competition modal
const showDeleteCompetitionModal = ref(false);

function openDeleteCompetitionModal(id: string, format: CompetitionFormat) {
  showDeleteCompetitionModal.value = true;

  competitionToDelete.value = { id, format };
}

function closeDeleteCompetitionModal() {
  showDeleteCompetitionModal.value = false;

  competitionToDelete.value = { id: null, format: null };
}

// Delete competition
const competitionToDelete = ref<{ id: string | null, format: CompetitionFormat | null }>({
  id: null,
  format: null,
});

const isDeletingCompetition = ref(false);

async function deleteCompetition() {
  const { id, format } = competitionToDelete.value;

  if (!id || !format) return;

  isDeletingCompetition.value = true;

  try {
    switch (format) {
      case competitionFormats.LEAGUE.value:
        await deleteLeague(id);
        break;
      case competitionFormats.PLAYOFF.value:
        await deletePlayoff(id);
        break;
      default:
        throw new Error('Invalid format');
    }

    openSnackbarNotification({
      message: 'Campeonato excluído com sucesso.',
    });

    closeDeleteCompetitionModal();

    getCompetitions();
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isDeletingCompetition.value = false;
  }
}
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
