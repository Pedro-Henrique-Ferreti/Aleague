<template>
  <main>
    <PageHeader
      title="Listas de equipes"
      :breadcrumb-items="BREADCRUMB_ITEMS"
    />
    <AppToolbar v-model="form.searchValue">
      <AppDropdown
        v-model="form.country"
        class="team-list__search-bar-dropdown"
        id="search-bar-dropdown"
        rounded
        :options="ALL_COUNTRIES_OPTIONS"
      />
    </AppToolbar>
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
          <div class="list-card__content">
            <CountryFlag :country="list.teams[0].country" />
            <span class="list-card__title">
              {{ list.name }}
            </span>
            <span>{{ list.teams.length }} equipes</span>
          </div>
          <button
            class="list-card__button"
            type="button"
            @click="selectedTeamList = list"
          >
            Ver lista
          </button>
        </div>
        <TeamListModal
          :team-list="selectedTeamList"
          @close="selectedTeamList = null"
          @list-applied="getTeamLists"
        />
      </div>
    </TransitionFade>
  </main>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { TeamList } from '@/types/Team';
import { computed, ref } from 'vue';
import { ALL_COUNTRIES_OPTIONS } from '@/constants/country';
import api from '@/api';
import AppDropdown from '@/components/AppDropdown.vue';
import PageHeader from '@/components/PageHeader.vue';
import AppToolbar from '@/components/AppToolbar.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import ErrorState from '@/components/ErrorState.vue';
import EmptySearchState from '@/components/EmptySearchState.vue';
import CountryFlag from '@/components/CountryFlag.vue';
import TeamListModal from '@/components/TeamListModal.vue';

// Breadcrumb items
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Equipes', to: { name: 'teams' } },
  { title: 'Adicionar equipe', to: { name: 'new-team' } },
  'Listas de equipes',
];

// Form
const form = ref({
  searchValue: '',
  country: '',
});

const teamLists = ref<TeamList[]>([]);
const selectedTeamList = ref<TeamList | null>(null);

const displayedTeamLists = computed(() => teamLists.value.filter((list) => {
  if (form.value.country && list.teams[0].country !== form.value.country) return false;
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
.list-card {
  min-height: 16rem;
  background-color: $color--white;
  border: 1px solid $color--neutral-300;
  border-radius: $radius--large;
  position: relative;
  &__content {
    padding: 0.75rem;
  }
  &__title {
    display: block;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    color: $color--text-strong;
    font-weight: $font-weight--medium;
  }
  &__button {
    padding: 0.625rem 0;
    margin-top: auto;
    border: 1px solid $color--neutral-300;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    color: $color--blue-800;
    font-weight: $font-weight--medium;
    font-size: 0.875rem;
    text-align: center;
    transition: border-color $transition--fastest linear;
    position: absolute;
    left: -1px;
    right: -1px;
    bottom: -1px;
    outline-color: $color--focus-ring;
    &:hover {
      border-color: $color--text-300;
    }
  }
}
</style>
