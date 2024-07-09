<template>
  <main>
    <PageHeader
      title="Listas de equipes"
      :breadcrumb-items="BREADCRUMB_ITEMS"
    />
    <SearchBar v-model="form.searchValue">
      <AppDropdown
        v-model="form.country"
        class="team-list__search-bar-dropdown"
        id="search-bar-dropdown"
        rounded
        :options="COUNTRY_OPTIONS"
      />
    </SearchBar>
    <TransitionFade>
      <LoadingIndicator v-if="isLoading" />
      <ErrorState
        v-else-if="errorMessage"
        :message="errorMessage"
        @reload="getTeamLists"
      />
      <EmptySearchState
        v-else-if="displayedTeamLists.length === 0"
        @clear-filters="form.searchValue = ''"
      />
      <div
        v-else
        class="list-grid"
      >
        <div
          v-for="list in displayedTeamLists"
          :key="list.id"
          class="list-card"
        >
          {{ list.name }}
        </div>
      </div>
    </TransitionFade>
  </main>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { TeamList } from '@/types/Team';
import { computed, ref } from 'vue';
import { Country, COUNTRY_OPTIONS } from '@/constants/country';
import api from '@/api';
import AppDropdown from '@/components/AppDropdown.vue';
import PageHeader from '@/components/PageHeader.vue';
import SearchBar from '@/components/SearchBar.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import ErrorState from '@/components/ErrorState.vue';
import EmptySearchState from '@/components/EmptySearchState.vue';

// Breadcrumb items
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Equipes', to: { name: 'teams' } },
  { title: 'Adicionar equipe', to: { name: 'new-team' } },
  'Listas de equipes',
];

// Form
const form = ref({
  searchValue: '',
  country: Country.BRAZIL,
});

const teamLists = ref<TeamList[]>([]);

const displayedTeamLists = computed(() => teamLists.value.filter((list) => {
  if (list.teams[0].country !== form.value.country) return false;
  if (
    form.value.searchValue
    && !list.name.toLocaleLowerCase().includes(form.value.searchValue.toLocaleLowerCase())
  ) return false;

  return true;
}));

// Get team lists
const isLoading = ref(true);
const errorMessage = ref('');

async function getTeamLists() {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const { data } = await api.teamService.getTeamLists();
    teamLists.value = data;
  } catch (error: any) {
    errorMessage.value = 'Algo deu errado e não foi possível carregar as listas de equipes.';
  } finally {
    isLoading.value = false;
  }
}

getTeamLists();
</script>

<style lang="scss" scoped>
.team-list {
  &__search-bar-dropdown {
    min-width: 15.5rem;
  }
}
.list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 1rem;
}
</style>
