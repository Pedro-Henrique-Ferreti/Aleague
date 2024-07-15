<template>
  <main class="container-small">
    <PageHeader
      title="Criar nova equipe"
      :breadcrumb-items="BREADCRUMB_ITEMS"
    />
    <form
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
            <CreateTeamFieldEmblem />
            <AppInput
              v-model="team.name"
              id="form--team-name"
            />
            <AppDropdown
              v-model="team.country"
              id="form--team-country"
              :options="COUNTRY_OPTIONS"
            />
            <AppIconButton
              color="danger"
              small
              :icon="IconDelete"
            />
          </div>
        </div>
        <AppTextButton :icon-left="IconPlus">
          Nova equipe
        </AppTextButton>
      </div>
      <AppButton type="submit">
        Salvar equipes
      </AppButton>
    </form>
  </main>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { ApiTeamToBeCreated } from '@/types/Team';
import { ref } from 'vue';
import { Country, COUNTRY_OPTIONS } from '@/constants/country';
import IconPlus from '@/assets/icons/IconPlus.svg';
import IconDelete from '@/assets/icons/IconDelete.svg';
import AppButton from '@/components/AppButton.vue';
import AppTextButton from '@/components/AppTextButton.vue';
import AppInput from '@/components/AppInput.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import AppIconButton from '@/components/AppIconButton.vue';
import PageHeader from '@/components/PageHeader.vue';
import CreateTeamFieldEmblem from '@/components/CreateTeamFieldEmblem.vue';

// Breadcrumb items
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Equipes', to: { name: 'teams' } },
  { title: 'Adicionar equipe', to: { name: 'new-team' } },
  'Criar nova equipe',
];

// New team
const newTeam = (): ApiTeamToBeCreated => ({
  id: new Date().getTime(),
  name: '',
  country: Country.BRAZIL,
  emblem: null,
});

// Form
const form = ref({
  teams: [newTeam()] as ApiTeamToBeCreated[],
});
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
