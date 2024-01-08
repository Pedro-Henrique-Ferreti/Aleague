<template>
  <TabPanel
    v-model:active-tab-id="activeTabId"
    :tabs="Object.values(competitionPageTabs)"
  >
    <template #controls>
      <AppButton
        color="outline"
        aria-label="Exibir filtros"
        title="Exibir filtros"
        icon-left="filter"
        :is-active="showFilters"
        @click="showFilters = !showFilters"
      />
      <AppButton
        icon-left="plus"
        icon-rounded
        :to="{ name: 'create-competition' }"
      >
        Novo campeonato
      </AppButton>
    </template>
  </TabPanel>
  <div
    v-show="showFilters"
    class="competition-filters"
  >
    <AppSearchField
      v-model="filter.search"
      placeholder="Pesquisar por um campeonato"
    />
    <AppSelect
      v-model="filter.competitionStatus"
      id="competition-filter--status"
      aria-label="Status do campeonato"
      :options="Object.values(competitionStatusFilter)"
    />
  </div>
  <div class="competition-list-wrapper">
    <AppTransition name="fade">
      <div
        v-if="isLoading"
        class="competition-list"
      >
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <AppEmptyState
        v-else-if="competitions.length === 0"
        show-controls
        title="Nenhum campeonato"
        image-src="/images/football-team.svg"
        button-text="Criar campeonato"
        :button-path="{ name: 'create-competition' }"
      >
        <p>Você ainda não criou nenhum campeonato</p>
      </AppEmptyState>
      <AppEmptyState
        v-else-if="displayedCompetitions.length === 0"
        show-controls
        title="Nenhum resultado"
        image-src="/images/football-team.svg"
        button-text="Criar campeonato"
        :button-path="{ name: 'create-competition' }"
      >
        <p>Nenhum resultado foi encontrado para a sua busca</p>
      </AppEmptyState>
      <div
        v-else
        class="competition-list"
      >
        <CompetitionCard
          v-for="competition in displayedCompetitions"
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
  </div>
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
import { useNotificationStore } from '@/stores/notification';
import { useLeaguesStore } from '@/stores/leagues';
import { usePlayoffStore } from '@/stores/playoff';
import { competitionPageTabs } from '@/constants/tabPanelTabs';
import { competitionStatusFilter, competitionFormats } from '@/constants/competitions';
import api from '@/api';
import AppButton from './AppButton.vue';
import AppSelect from './AppSelect.vue';
import AppEmptyState from './AppEmptyState.vue';
import AppSearchField from './AppSearchField.vue';
import AppTransition from './AppTransition.vue';
import TabPanel from './TabPanel.vue';
import SkeletonCard from './SkeletonCompetitionCard.vue';
import CompetitionCard from './CompetitionCard.vue';
import CompetitionModalDelete from './CompetitionModalDelete.vue';

const { openSnackbarNotification } = useNotificationStore();
const { deleteLeague } = useLeaguesStore();
const { deletePlayoff } = usePlayoffStore();

const activeTabId = ref(competitionPageTabs.ALL.id);

const competitions = ref<CompetitionListItem[]>([]);

// Get competition
const isLoading = ref(true);

getCompetitions();

async function getCompetitions() {
  isLoading.value = true;

  try {
    const { data } = await api.competitionService.getCompetitions();

    competitions.value = data;
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoading.value = false;
  }
}

// Filters
const showFilters = ref(false);
const filter = ref({
  search: '',
  competitionStatus: competitionStatusFilter.ALL.id,
});

// Displayed competitions
const displayedCompetitions = computed(() => competitions.value.filter((competition) => {
  let isValid = true;

  if (filter.value.search) {
    isValid = (
      isValid &&
      competition.name.toLowerCase().includes(filter.value.search.toLowerCase())
    );
  }

  if (activeTabId.value !== competitionPageTabs.ALL.id) {
    isValid = (isValid && competition.type === activeTabId.value);
  }

  if (filter.value.competitionStatus !== competitionStatusFilter.ALL.id) {
    switch (filter.value.competitionStatus) {
      case competitionStatusFilter.NOT_STARTED.id:
        isValid = (isValid && !competition.stepsCompleted.third);
        break;
      case competitionStatusFilter.IN_PROGRESS.id:
        isValid = (isValid && competition.stepsCompleted.third && competition.progress < 100);
        break;
      case competitionStatusFilter.COMPLETED.id:
      default:
        isValid = (isValid && competition.progress === 100);
        break;
    }
  }

  return isValid;
}));

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
.competition-filters {
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
.competition-list-wrapper {
  margin-top: 2rem;
}
.competition-list {
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
