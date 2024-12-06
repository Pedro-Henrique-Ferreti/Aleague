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
        @submit.prevent="submitForm"
      >
        <div class="form__card | app-base-card">
          <div class="form__table">
            <div class="form__table-header">
              <span>Escudo</span>
              <span>Nome</span>
              <span>Nacionalidade</span>
            </div>
            <div
              v-for="(team, index) in form.teams"
              class="form__team"
              :key="team.id"
            >
              <TeamEmblemPopup
                v-model="team.emblem"
                class="form__team-emblem"
                :emblems="teamEmblems"
              >
                <button
                  class="form__team-emblem-button"
                  type="button"
                >
                  <img
                    class="form__team-emblem-button-image"
                    alt=""
                    :src="team.emblem.url"
                  />
                </button>
              </TeamEmblemPopup>
              <AppInput
                v-model.trim="team.name"
                :id="`form--team-name-${team.id}`"
                :dirty="v$.teams.$dirty"
                :error-message="v$.teams.$each.$message[index][0]"
              />
              <AppDropdown
                v-model="team.country"
                :id="`form--team-country-${team.id}`"
                :options="COUNTRY_OPTIONS"
              />
              <AppIconButton
                v-if="form.teams.length > 1"
                color="danger"
                size="extra-small"
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
        <AppButton
          type="submit"
          :is-loading="isSaving"
        >
          Salvar equipes
        </AppButton>
      </form>
    </TransitionFade>
  </main>
</template>

<script lang="ts" setup>
import type { ApiError } from '@/types/Auth';
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { ApiTeamToBeCreated, TeamEmblem } from '@/types/Team';
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useToast } from '@/composables/toast';
import { requiredValidator } from '@/helpers/validators';
import { Country, COUNTRY_OPTIONS } from '@/constants/country';
import api from '@/api';
import IconPlus from '@/assets/icons/Plus.svg';
import IconDelete from '@/assets/icons/Delete.svg';
import AppButton from '@/components/AppButton.vue';
import AppTextButton from '@/components/AppTextButton.vue';
import AppInput from '@/components/AppInput.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import AppIconButton from '@/components/AppIconButton.vue';
import PageHeader from '@/components/PageHeader.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import ErrorState from '@/components/ErrorState.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import TeamEmblemPopup from '@/components/TeamEmblemPopup.vue';

const toast = useToast();

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

// Form validation
const v$ = useVuelidate({
  teams: {
    $each: helpers.forEach({
      name: {
        requiredValidator,
      },
    }),
  },
}, form, { $autoDirty: true });

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

    teamEmblems.value = data;
    form.value.teams.push(newTeam());
  } catch (error) {
    errorMessage.value = 'Algo deu errado e não foi possível carregar a lista de escudos.';
  } finally {
    isLoading.value = false;
  }
}

getTeamEmblems();

// Submit form
const isSaving = ref(false);

async function submitForm() {
  if (!await v$.value.$validate()) return;

  isSaving.value = true;

  try {
    await api.teamService.createTeams(form.value.teams);
  } catch (error: any) {
    toast.error(
      (error.response)
        ? (error.response as ApiError).data.message
        : 'Ocorreu um erro inesperado. Por favor, tente novamente.',
    );
  } finally {
    isSaving.value = false;
  }
}
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
  &__team-emblem {
    display: grid;
    place-items: center;
    place-self: center;
    width: 2.5rem;
    height: 2.5rem;
  }
  &__team-emblem-button {
    display: grid;
    place-items: center;
    width: inherit;
    height: inherit;
  }
  &__team-emblem-button-image {
    max-width: 88%;
    max-height: 88%;
  }
}
</style>
