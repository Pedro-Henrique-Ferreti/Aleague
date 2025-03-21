<template>
  <main class="teams">
    <PageHeader title="Equipes">
      <AppButton
        :to="{ name: 'new-team' }"
        :icon-left="IconPlus"
      >
        Nova equipe
      </AppButton>
    </PageHeader>
    <AppToolbar v-model="form.search">
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
          text="Todos"
          :value="false"
        />
        <AppRadioInput
          v-model="form.showFavorites"
          text="Favoritos"
          :value="true"
        />
      </div>
    </AppToolbar>
    <TransitionFade>
      <LoadingIndicator v-if="isLoading" />
      <ErrorState
        v-else-if="errorMessage"
        :message="errorMessage"
      />
      <EmptySearchState
        v-else-if="teams.length === 0"
        @clear-filters="clearSearchFilters"
      />
      <div
        v-else
        class="teams__content"
      >
        <div class="teams__grid">
          <RouterLink
            v-for="team in teams"
            :key="team.id"
            class="team-card"
            :to="{ name: 'show-team', params: { id: team.id } }"
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
        <AppButton
          color="secondary"
          :is-loading="isAppendingTeams"
          @click="form.page += 1"
        >
          Carregar mais equipes
        </AppButton>
      </div>
    </TransitionFade>
  </main>
</template>

<script lang="ts" setup>
import type { TeamPreview } from '@/types/Team';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ALL_COUNTRIES_OPTIONS } from '@/constants/country';
import api from '@/api';
import IconPlus from '@/assets/icons/Plus.svg';
import AppButton from '@/components/AppButton.vue';
import AppRadioInput from '@/components/AppRadioInput.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import AppChip from '@/components/AppChip.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';
import AppToolbar from '@/components/AppToolbar.vue';
import EmptySearchState from '@/components/EmptySearchState.vue';

const { t } = useI18n();

const teams = ref<TeamPreview[]>([]);
const form = ref({
  page: 1,
  search: '',
  showFavorites: false,
  country: '',
});

const isLoading = ref(false);
const isAppendingTeams = ref(false);
const errorMessage = ref('');

async function getTeams(append = false) {
  errorMessage.value = '';
  if (append) {
    isAppendingTeams.value = true;
  } else {
    isLoading.value = true;
  }

  try {
    const { data: { data } } = await api.teamService.getTeams(form.value);

    if (append) {
      teams.value = [...teams.value, ...data];
    } else {
      teams.value = data;
    }
  } catch (error: any) {
    errorMessage.value = 'Algo deu errado e não foi possível listar as equipes.';
  } finally {
    isLoading.value = false;
    isAppendingTeams.value = false;
  }
}

watch(() => form.value.page, () => getTeams(true));

// Clear search filters
function clearSearchFilters() {
  form.value.page = 1;
  form.value.search = '';
  form.value.country = '';
  form.value.showFavorites = false;

  getTeams();
}
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
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
    gap: 1rem;
    width: 100%;
  }
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
