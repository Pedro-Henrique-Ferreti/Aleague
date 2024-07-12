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
            v-for="n in 1"
            class="form__team"
            :key="n"
          >
            <img
              class="form__team-emblem"
              src="http://127.0.0.1:8000/assets/emblems/teams/default.png"
              alt=""
            />
            <AppInput
              id="team-name"
            />
            <AppDropdown
              id="team-name"
            />
            <AppIconButton
              color="danger"
              small
              :icon="IconDelete"
              :is-loading="isLoading"
              @click="isLoading = !isLoading"
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
import { ref } from 'vue';
import IconPlus from '@/assets/icons/IconPlus.svg';
import IconDelete from '@/assets/icons/IconDelete.svg';
import AppButton from '@/components/AppButton.vue';
import AppTextButton from '@/components/AppTextButton.vue';
import PageHeader from '@/components/PageHeader.vue';
import AppInput from '@/components/AppInput.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import AppIconButton from '@/components/AppIconButton.vue';

// Breadcrumb items
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Equipes', to: { name: 'teams' } },
  { title: 'Adicionar equipe', to: { name: 'new-team' } },
  'Criar nova equipe',
];

const isLoading = ref(false);
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
    width: 2.25rem;
    height: 2.25rem;
    place-self: center;
  }
}
</style>
