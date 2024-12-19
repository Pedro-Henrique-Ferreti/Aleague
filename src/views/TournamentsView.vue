<template>
  <main class="tournaments">
    <PageHeader
      title="Campeonatos"
      :chip-text="tournaments.length ? String(tournaments.length) : ''"
    >
      <AppButton
        :icon-left="IconPlus"
        :to="{ name: 'new-tournament' }"
      >
        Novo campeonato
      </AppButton>
    </PageHeader>
    <AppToolbar v-model="form.searchValue">
      <div class="tournaments__search-bar-radio">
        <AppRadioInput
          v-model="form.filterType"
          id="search-bar-radio--all"
          text="Todos"
          :value="FilterType.ALL"
        />
        <AppRadioInput
          v-model="form.filterType"
          id="search-bar-radio--in-progress"
          text="Em andamento"
          :value="FilterType.IN_PROGRESS"
        />
        <AppRadioInput
          v-model="form.filterType"
          id="search-bar-radio--completed"
          text="Finalizados"
          :value="FilterType.COMPLETED"
        />
      </div>
    </AppToolbar>
    <TransitionFade>
      <LoadingIndicator v-if="isLoading" />
      <ErrorState
        v-else-if="errorMessage"
        :message="errorMessage"
        @reload="getTournaments"
      />
      <EmptyState v-else-if="tournaments.length === 0">
        Parece que você ainda não criou nenhum campeonato.
        <template #controls>
          <AppButton
            color="secondary"
            :to="{ name: 'new-tournament' }"
            :icon-left="IconPlus"
          >
            Novo campeonato
          </AppButton>
        </template>
      </EmptyState>
      <EmptySearchState
        v-else-if="displayedTournaments.length === 0"
        @clear-filters="clearSearchFilters"
      />
      <div
        v-else
        class="tournaments__grid"
      >
        <RouterLink
          v-for="tournament in displayedTournaments"
          class="tournament-card"
          :key="tournament.id"
          :to="{ name: 'show-tournament', params: { id: tournament.id } }"
        >
          <div class="tournament-card__header">
            <div class="tournament-card__icon">
              <img
                class="tournament-card__icon-image"
                alt="Tournament icon"
                :src="`/images/competition-icons/icon-${tournament.icon}.svg`"
              />
            </div>
            <div class="tournament-card__info">
              <span class="tournament-card__title">
                {{ tournament.name }}
              </span>
              <span class="tournament-card__type">
                {{ getTournamentTypeText(tournament.type) }}
              </span>
            </div>
          </div>
          <AppProgressBar :value="tournament.progress" />
          <div class="tournament-card__stats">
            <AppChip
              :icon-left="IconShield"
              :text="`${tournament.numberOfTeams} equipes`"
            />
            <AppChip
              :icon-left="IconCalendarAdd"
              :text="formatDate(tournament.createdAt, 'd MMM yyyy')"
            />
            <AppChip
              :icon-left="IconPencil"
              :text="formatDate(tournament.updatedAt, 'd MMM yyyy')"
            />
          </div>
        </RouterLink>
      </div>
    </TransitionFade>
  </main>
</template>

<script lang="ts" setup>
import type { ApiGetAllTournamentsResponse, TypeTournamentFormat } from '@/types/Tournament';
import { computed, ref } from 'vue';
import { formatDate } from '@/utils';
import api from '@/api';
import IconPlus from '@/assets/icons/Plus.svg';
import IconCalendarAdd from '@/assets/icons/CalendarAdd.svg';
import IconPencil from '@/assets/icons/Pencil.svg';
import IconShield from '@/assets/icons/Shield.svg';
import AppChip from '@/components/AppChip.vue';
import AppButton from '@/components/AppButton.vue';
import AppProgressBar from '@/components/AppProgressBar.vue';
import AppRadioInput from '@/components/AppRadioInput.vue';
import PageHeader from '@/components/PageHeader.vue';
import AppToolbar from '@/components/AppToolbar.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import ErrorState from '@/components/ErrorState.vue';
import EmptyState from '@/components/EmptyState.vue';
import EmptySearchState from '@/components/EmptySearchState.vue';
import { TournamentFormat } from '@/constants/tournament';

enum FilterType {
  ALL = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
}

// Search bar
const form = ref({
  searchValue: '',
  filterType: FilterType.ALL,
});

function clearSearchFilters() {}

// Tournaments
const tournaments = ref<ApiGetAllTournamentsResponse>([]);

const displayedTournaments = computed(() => tournaments.value.filter((tournament) => {
  if (
    form.value.filterType === FilterType.IN_PROGRESS
    && (!tournament.startedAt || tournament.progress === 100)
  ) return false;

  if (
    form.value.filterType === FilterType.COMPLETED
    && (!tournament.startedAt || tournament.progress < 100)
  ) return false;

  if (
    form.value.searchValue
    && !tournament.name.toLocaleLowerCase().includes(form.value.searchValue.toLocaleLowerCase())
  ) return false;

  return true;
}));

// Get tournaments
const isLoading = ref(true);
const errorMessage = ref('');

async function getTournaments() {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const { data } = await api.tournamentService.getAllTournaments();
    tournaments.value = data;
  } catch (error: any) {
    errorMessage.value = 'Algo deu errado e não foi possível listar seus campeonatos.';
  } finally {
    isLoading.value = false;
  }
}

getTournaments();

// Tournament type text
function getTournamentTypeText(type: TypeTournamentFormat) {
  switch (type) {
    case TournamentFormat.ALL_PLAY_ALL:
      return 'Pontos corridos';
    case TournamentFormat.PLAYOFFS:
      return 'Eliminatórias';
    case TournamentFormat.CUSTOM:
      return 'Fases livres';
    default:
      return '';
  }
}
</script>

<style lang="scss" scoped>
.tournaments {
  &__search-bar-radio {
    display: flex;
    gap: 0.75rem;
  }
  &__grid {
    --columns: 1;
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 1.5rem;
    @include for-tablet-landscape-up {
      --columns: 2;
    }
    @include for-desktop-up {
      --columns: 3;
    }
  }
}
.tournament-card {
  padding: 1rem;
  background-color: $color--white;
  border: 1px solid $color--neutral-300;
  border-radius: $radius--large;
  transition: border-color $transition--fastest linear;
  outline-color: $color--focus-ring;
  &:hover {
    border-color: $color--text-300;
  }
  &__header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.875rem;
    margin-bottom: 0.75rem;
  }
  &__icon {
    width: 5rem;
    height: 5rem;
  }
  &__icon-image {
    max-width: 100%;
    max-height: 100%;
  }
  &__info {
    display: flex;
    flex-direction: column;
  }
  &__title {
    display: block;
    padding-bottom: 0.25rem;
    color: $color--text-strong;
    font-size: 1.25rem;
    font-weight: $font-weight--medium;
  }
  &__type {
    margin-top: auto;
    font-size: 0.875rem;
  }
  &__stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1rem;
  }
}
</style>
