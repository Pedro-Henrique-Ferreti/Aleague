<template>
  <main class="tournaments">
    <PageHeader title="Campeonatos">
      <AppButton
        :icon-left="IconPlus"
        :to="{ name: 'new-tournament' }"
      >
        Novo campeonato
      </AppButton>
    </PageHeader>
    <SearchBar v-model="form.searchValue">
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
    </SearchBar>
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
      <pre v-else>
        {{ displayedTournaments }} {{ form.filterType }}
      </pre>
    </TransitionFade>
  </main>
</template>

<script lang="ts" setup>
import type { ApiGetAllTournamentsResponse } from '@/types/Tournament';
import { computed, ref } from 'vue';
import api from '@/api';
import IconPlus from '@/assets/icons/IconPlus.svg';
import AppButton from '@/components/AppButton.vue';
import AppRadioInput from '@/components/AppRadioInput.vue';
import PageHeader from '@/components/PageHeader.vue';
import SearchBar from '@/components/SearchBar.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import ErrorState from '@/components/ErrorState.vue';
import EmptyState from '@/components/EmptyState.vue';
import EmptySearchState from '@/components/EmptySearchState.vue';

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
</script>

<style lang="scss" scoped>
.tournaments {
  &__search-bar-radio {
    display: flex;
    gap: 0.75rem;
  }
}
</style>
