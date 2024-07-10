<template>
  <RouterView v-if="$route.name !== 'teams'" />
  <main
    v-else
    class="teams"
  >
    <PageHeader title="Equipes">
      <AppButton
        :to="{ name: 'new-team' }"
        :icon-left="IconPlus"
      >
        Nova equipe
      </AppButton>
    </PageHeader>
    <SearchBar v-model="form.searchValue">
      <AppDropdown
        v-model="form.country"
        class="teams__search-bar-dropdown"
        id="search-bar-dropdown"
        rounded
        :options="ALL_COUNTRIES_OPTIONS"
      />
      <div class="teams__search-bar-radio">
        <AppRadioInput
          v-model="form.showFavorites"
          id="search-bar-radio-favorites--false"
          text="Todos"
          :value="false"
        />
        <AppRadioInput
          v-model="form.showFavorites"
          id="search-bar-radio-favorites--true"
          text="Favoritos"
          :value="true"
        />
      </div>
    </SearchBar>
    <TransitionFade>
      <LoadingIndicator v-if="isLoading" />
      <ErrorState
        v-else-if="errorMessage"
        :message="errorMessage"
        @reload="getTeams"
      />
      <EmptyState v-else-if="teams.length === 0">
        Parece que você ainda não adicionou nenhuma equipe.
        <template #controls>
          <AppButton
            color="secondary"
            :to="{ name: 'new-team' }"
            :icon-left="IconPlus"
          >
            Nova equipe
          </AppButton>
        </template>
      </EmptyState>
      <EmptySearchState
        v-else-if="displayedTeams.length === 0"
        @clear-filters="clearSearchFilters"
      />
      <div
        v-else
        class="team-grid"
      >
        <RouterLink
          v-for="team in displayedTeams"
          :key="team.id"
          class="team-card"
          to="#"
        >
          <div class="team-card__header">
            <div class="team-card__emblem">
              <img
                class="team-card__emblem-image"
                :src="team.emblem.url"
                :alt="`${team.name}'s emblem`"
              />
            </div>
            <AppChip :text="t(`countryAbbreviations.${team.country}`)">
              <template #icon-left>
                <img
                  :src="`/images/country-flag/${team.country}.svg`"
                  alt="Team country flag"
                />
              </template>
            </AppChip>
          </div>
          <span>{{ team.name }}</span>
        </RouterLink>
      </div>
    </TransitionFade>
  </main>
</template>

<script lang="ts" setup>
import type { ApiGetAllTeamsResponse } from '@/types/Team';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ALL_COUNTRIES_OPTIONS } from '@/constants/country';
import api from '@/api';
import IconPlus from '@/assets/icons/IconPlus.svg';
import AppButton from '@/components/AppButton.vue';
import AppRadioInput from '@/components/AppRadioInput.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import AppChip from '@/components/AppChip.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import EmptyState from '@/components/EmptyState.vue';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';
import SearchBar from '@/components/SearchBar.vue';
import EmptySearchState from '@/components/EmptySearchState.vue';

const { t } = useI18n();

// Search bar
const form = ref({
  searchValue: '',
  showFavorites: false,
  country: '',
});

const teams = ref<ApiGetAllTeamsResponse>([]);

const displayedTeams = computed(() => teams.value.filter((team) => {
  if (form.value.country && team.country !== form.value.country) return false;
  if (form.value.showFavorites && !team.isFavorite) return false;
  if (
    form.value.searchValue
    && !team.name.toLocaleLowerCase().includes(form.value.searchValue.toLocaleLowerCase())
  ) return false;

  return true;
}));

// Clear search filters
function clearSearchFilters() {
  form.value.searchValue = '';
  form.value.showFavorites = false;
}

// Get teams
const isLoading = ref(true);
const errorMessage = ref('');

async function getTeams() {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const { data } = await api.teamService.getAllTeams();
    teams.value = data;
  } catch (error: any) {
    errorMessage.value = 'Algo deu errado e não foi possível listar suas equipes.';
  } finally {
    isLoading.value = false;
  }
}

getTeams();
</script>

<style lang="scss" scoped>
.teams {
  &__search-bar-radio {
    display: flex;
    gap: 0.75rem;
  }
  &__search-bar-dropdown {
    min-width: 15.5rem;
  }
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 1rem;
}
.team-card {
  padding: 0.75rem;
  background-color: $color--white;
  border: 1px solid $color--neutral-300;
  border-radius: $radius--large;
  transition: border-color $transition--fastest linear;
  outline-color: $color--focus-ring;
  &:hover {
    border-color: $color--text-300;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }
  &__emblem {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.25rem;
    background-color: $color--neutral-200;
    border-radius: $radius--medium;
  }
  &__emblem-image {
    width: 2rem;
    height: 2rem;
  }
}
</style>
