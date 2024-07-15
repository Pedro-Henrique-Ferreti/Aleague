<template>
  <main class="container-small">
    <PageHeader
      title="Criar nova equipe"
      :breadcrumb-items="BREADCRUMB_ITEMS"
    />
    <TransitionFade>
      <LoadingIndicator v-if="isLoading" />
      <ErrorState
        v-else-if="errorMessage"
        :message="errorMessage"
        @reload="getTeamEmblems"
      />
      <form
        v-else
        class="form"
        @submit.prevent
      >
        <div class="form__card | app-base-card">
          <div class="form__table">
            <div class="form__table-header">
              <span>Escudo</span>
              <span>Nome</span>
              <span>Nacionalidade</span>
            </div>
            <div
              v-for="team in form.teams"
              class="form__team"
              :key="team.id"
            >
              <CreateTeamFieldEmblem
                v-model:selected-emblem="team.emblem"
                :team-emblems="teamEmblems"
              />
              <AppInput
                v-model="team.name"
                :id="`form--team-name-${team.id}`"
              />
              <AppDropdown
                v-model="team.country"
                :id="`form--team-country-${team.id}`"
                :options="COUNTRY_OPTIONS"
              />
              <AppIconButton
                v-if="form.teams.length > 1"
                color="danger"
                small
                :icon="IconDelete"
                @click="deleteTeam(team.id)"
              />
            </div>
          </div>
          <AppTextButton
            :icon-left="IconPlus"
            @click="form.teams.push(newTeam())"
          >
            Nova equipe
          </AppTextButton>
        </div>
        <AppButton type="submit">
          Salvar equipes
        </AppButton>
      </form>
    </TransitionFade>
  </main>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { ApiTeamToBeCreated, TeamEmblem } from '@/types/Team';
import { ref } from 'vue';
import { Country, COUNTRY_OPTIONS } from '@/constants/country';
import api from '@/api';
import IconPlus from '@/assets/icons/IconPlus.svg';
import IconDelete from '@/assets/icons/IconDelete.svg';
import AppButton from '@/components/AppButton.vue';
import AppTextButton from '@/components/AppTextButton.vue';
import AppInput from '@/components/AppInput.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import AppIconButton from '@/components/AppIconButton.vue';
import PageHeader from '@/components/PageHeader.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import ErrorState from '@/components/ErrorState.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import CreateTeamFieldEmblem from '@/components/CreateTeamFieldEmblem.vue';

// Breadcrumb items
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Equipes', to: { name: 'teams' } },
  { title: 'Adicionar equipe', to: { name: 'new-team' } },
  'Criar nova equipe',
];

// Form
const form = ref({
  teams: [] as ApiTeamToBeCreated[],
});

// Delete team
function deleteTeam(id: number) {
  const index = form.value.teams.findIndex((item) => item.id === id);

  if (index >= 0) {
    form.value.teams.splice(index, 1);
  }
}

// Team emblems
const teamEmblems = ref<TeamEmblem[]>([]);
const isLoading = ref(true);
const errorMessage = ref('');

// New team
const newTeam = (): ApiTeamToBeCreated => ({
  id: new Date().getTime(),
  name: '',
  country: Country.BRAZIL,
  emblem: teamEmblems.value[0],
});

// Get team emblems
async function getTeamEmblems() {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const { data } = await api.teamService.getTeamEmblems();

    teamEmblems.value = data.sort((a, b) => {
      if (a.isDefaultEmblem && !b.isDefaultEmblem) return -1;
      if (!a.isDefaultEmblem && b.isDefaultEmblem) return 1;
      return 0;
    });

    form.value.teams.push(newTeam());
  } catch (error) {
    errorMessage.value = 'Algo deu errado e não foi possível carregar a lista de escudos.';
  } finally {
    isLoading.value = false;
  }
}

getTeamEmblems();
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  grid-template-columns: 1fr;
  place-items: start flex-end;
  &__card {
    width: 100%;
    margin-bottom: 2.5rem;
  }
  &__table {
    display: grid;
    grid-template-columns: 3.75rem minmax(min-content, 16.125rem) minmax(min-content, 18.5rem) 1fr;
    gap: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }
  &__table-header {
    display: grid;
    grid-column: 1 / 5;
    grid-template-columns: subgrid;
    font-size: 0.875rem;
    font-weight: $font-weight--medium;
  }
  &__team {
    display: grid;
    grid-column: 1 / 5;
    grid-template-columns: subgrid;
    place-items: center normal;
  }
}
</style>
