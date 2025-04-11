<template>
  <RouterLink
    class="tournament-card"
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
          {{ tournamentTypeText }}
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
</template>

<script lang="ts" setup>
import type { TournamentPreview } from '@/types/Tournament';
import { computed } from 'vue';
import { TournamentFormat } from '@/constants/tournament';
import { formatDate } from '@/utils';
import IconCalendarAdd from '@/assets/icons/CalendarAdd.svg';
import IconPencil from '@/assets/icons/Pencil.svg';
import AppChip from '@/components/AppChip.vue';
import AppProgressBar from '@/components/AppProgressBar.vue';

const props = defineProps<{
  tournament: TournamentPreview,
}>();

const tournamentTypeText = computed(() => {
  switch (props.tournament.type) {
    case TournamentFormat.ALL_PLAY_ALL:
      return 'Pontos corridos';
    case TournamentFormat.PLAYOFFS:
      return 'Eliminatórias';
    case TournamentFormat.CUSTOM:
      return 'Fases livres';
    default:
      return '';
  }
});
</script>

<style lang="scss" scoped>
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
