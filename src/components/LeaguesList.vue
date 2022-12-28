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
      <CompetitionCard
        v-for="competition in displayedCompetititons"
        :key="competition.hashid"
        :hash-id="competition.hashid"
        :title="competition.name"
        :competition-format="competition.type"
        :teams-count="competition.numberOfTeams"
        :progress="competition.progress"
        :steps-completed="competition.stepsCompleted"
        :created-at="competition.createdAt"
        :updated-at="competition.updatedAt"
        @delete="openDeleteCompetitionModal(competition.hashid, competition.type)"
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
import { leaguePageTabs } from '@/constants/tabPanelTabs';
import { competitionFormats } from '@/constants/competitionFormats';

import AppTransition from './AppTransition.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import CompetitionCard from './CompetitionCard.vue';
import CompetitionModalDelete from './CompetitionModalDelete.vue';
import LeaguesListNoData from './LeaguesListNoData.vue';
import LeaguesListNoResults from './LeaguesListNoResults.vue';
import TabPanel from './TabPanel.vue';

const { openSnackbarNotification } = useNotificationStore();
const { deleteLeague } = useLeaguesStore();
const { deletePlayoff } = usePlayoffStore();
const competitionStore = useCompetitionStore();
const { searchBarValue } = storeToRefs(competitionStore);

const activeTabId = ref(leaguePageTabs.ALL.id);

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

  if (activeTabId.value === leaguePageTabs.ALL.id) {
    return displayedCompetititons;
  }

  return displayedCompetititons.filter(({ type }) => type === activeTabId.value);
});

// Delete competition modal
const showDeleteCompetitionModal = ref(false);

function openDeleteCompetitionModal(hashid: string, format: CompetitionFormat) {
  showDeleteCompetitionModal.value = true;

  competitionToDelete.value = { hashid, format };
}

function closeDeleteCompetitionModal() {
  showDeleteCompetitionModal.value = false;

  competitionToDelete.value = { hashid: null, format: null };
}

// Delete competition
const competitionToDelete = ref<{ hashid: string | null, format: CompetitionFormat | null }>({
  hashid: null,
  format: null,
});

const isDeletingCompetition = ref(false);

async function deleteCompetition() {
  const { hashid, format } = competitionToDelete.value;

  if (!hashid || !format) return;

  isDeletingCompetition.value = true;

  try {
    switch (format) {
      case competitionFormats.LEAGUE.value:
        await deleteLeague(hashid);
        break;
      case competitionFormats.PLAYOFF.value:
        await deletePlayoff(hashid);
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
