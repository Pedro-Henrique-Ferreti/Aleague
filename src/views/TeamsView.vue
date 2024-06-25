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
      <div
        v-else
        class="team-grid"
      >
        <RouterLink
          v-for="team in teams"
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
            <AppChip :text="team.country">
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
import type { TeamListItem } from '@/types/Team';
import { ref } from 'vue';
import api from '@/api';
import IconPlus from '@/assets/icons/IconPlus.svg';
import AppButton from '@/components/AppButton.vue';
import AppChip from '@/components/AppChip.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import EmptyState from '@/components/EmptyState.vue';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';

const isLoading = ref(true);
const teams = ref<TeamListItem[]>([]);
const errorMessage = ref('');

async function getTeams() {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const { data } = await api.teamService.getTeamList();
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
