<template>
  <main class="tournaments">
    <PageHeader
      title="Campeonatos"
      :chip-text="tournaments.length ? String(tournaments.length) : ''"
    >
      <AppButton
        :icon-left="IconPlus"
        :to="{ name: 'new-tournament' }"
      >
        Novo campeonato
      </AppButton>
    </PageHeader>
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
      <div
        v-else
        class="tournaments__grid"
      >
        <RouterLink
          v-for="tournament in tournaments"
          class="tournament-card"
          :key="tournament.id"
          :to="{ name: 'show-tournament', params: { id: tournament.id } }"
        >
          <div class="tournament-card__header">
            <div class="tournament-card__icon">
              <img
                class="tournament-card__icon-image"
                alt="Tournament icon"
                :src="`/images/competition-icons/icon-${tournament.icon}.svg`"
              />
            </div>
            <div class="tournament-card__info">
              <span class="tournament-card__title">
                {{ tournament.name }}
              </span>
              <span class="tournament-card__type">
                {{ getTournamentTypeText(tournament.type) }}
              </span>
            </div>
          </div>
          <AppProgressBar :value="tournament.progress" />
          <div class="tournament-card__stats">
            <AppChip
              :icon-left="IconCalendarAdd"
              :text="formatDate(tournament.createdAt, 'd MMM yyyy')"
            />
            <AppChip
              :icon-left="IconPencil"
              :text="formatDate(tournament.updatedAt, 'd MMM yyyy')"
            />
          </div>
        </RouterLink>
      </div>
    </TransitionFade>
  </main>
</template>

<script lang="ts" setup>
import type { TorunamentPreview, TypeTournamentFormat } from '@/types/Tournament';
import { ref } from 'vue';
import { formatDate } from '@/utils';
import { TournamentFormat } from '@/constants/tournament';
import api from '@/api';
import IconPlus from '@/assets/icons/Plus.svg';
import IconCalendarAdd from '@/assets/icons/CalendarAdd.svg';
import IconPencil from '@/assets/icons/Pencil.svg';
import AppChip from '@/components/AppChip.vue';
import AppButton from '@/components/AppButton.vue';
import AppProgressBar from '@/components/AppProgressBar.vue';
import PageHeader from '@/components/PageHeader.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import ErrorState from '@/components/ErrorState.vue';
import EmptyState from '@/components/EmptyState.vue';

// Tournaments
const tournaments = ref<TorunamentPreview[]>([]);

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

// Tournament type text
function getTournamentTypeText(type: TypeTournamentFormat) {
  switch (type) {
    case TournamentFormat.ALL_PLAY_ALL:
      return 'Pontos corridos';
    case TournamentFormat.PLAYOFFS:
      return 'Eliminatórias';
    case TournamentFormat.CUSTOM:
      return 'Fases livres';
    default:
      return '';
  }
}
</script>

<style lang="scss" scoped>
.tournaments {
  &__search-bar-radio {
    display: flex;
    gap: 0.75rem;
  }
  &__grid {
    --columns: 1;
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 1.5rem;
    @include for-large-tablet-landscape-up {
      --columns: 2;
    }
    @media (min-width: 1600px) {
      --columns: 3;
    }
  }
}
.tournament-card {
  padding: 1rem;
  background-color: $color--white;
  border: 1px solid $color--neutral-300;
  border-radius: $radius--large;
  transition: border-color $transition--fastest linear;
  outline-color: $color--focus-ring;
  &:hover {
    border-color: $color--text-300;
  }
  &__header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.875rem;
    margin-bottom: 1rem;
  }
  &__icon {
    width: 4rem;
    height: 4rem;
  }
  &__icon-image {
    max-width: 100%;
    max-height: 100%;
  }
  &__info {
    display: flex;
    flex-direction: column;
  }
  &__title {
    display: block;
    padding-bottom: 0.5rem;
    color: $color--text-strong;
    font-size: 1.125rem;
    font-weight: $font-weight--medium;
  }
  &__type {
    font-size: 0.875rem;
  }
  &__stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1rem;
  }
}
</style>
