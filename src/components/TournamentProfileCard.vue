<template>
  <div class="tournament-card | app-base-card">
    <div class="tournament-card__details">
      <img
        class="tournament-card__image"
        alt="Tournament icon"
        :src="`/images/competition-icons/icon-${tournament.icon}.svg`"
      />
      <div>
        <h1 class="tournament-card__title | h2">
          {{ tournament.name }}
        </h1>
        <div class="app-chip-group">
          <AppChip
            :icon-left="IconShield"
            :text="`${tournament.numberOfTeams} equipes`"
          />
          <AppChip
            :icon-left="IconCalendarAdd"
            :text="formatDate(tournament.createdAt, 'd MMM yyyy')"
          />
          <AppChip
            :color="statusColor"
            :text="statusText"
          />
        </div>
      </div>
    </div>
    <div class="tournament-card__controls">
      <AppIconButton
        v-tooltip="'Duplicar campeonato'"
        color="secondary"
        :icon="IconCopy"
      />
      <AppIconButton
        v-tooltip="'Editar campeonato'"
        color="secondary"
        :icon="IconPencil"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tournament } from '@/types/Tournament';
import { computed, type PropType } from 'vue';
import { formatDate } from '@/utils';
import IconCalendarAdd from '@/assets/icons/IconCalendarAdd.svg';
import IconShield from '@/assets/icons/IconShield.svg';
import IconPencil from '@/assets/icons/IconPencil.svg';
import IconCopy from '@/assets/icons/Copy.svg';
import AppChip from './AppChip.vue';
import AppIconButton from './AppIconButton.vue';

const props = defineProps({
  tournament: {
    type: Object as PropType<Tournament>,
    required: true,
  },
});

const statusText = computed(() => {
  if (!props.tournament.startedAt) return 'Não iniciado';
  return (props.tournament.progress !== 100) ? 'Em andamento' : 'Finalizado';
});
const statusColor = computed(() => {
  if (!props.tournament.startedAt) return 'primary';
  return (props.tournament.progress !== 100) ? 'blue' : 'success';
});
</script>

<style lang="scss" scoped>
.tournament-card {
  display: grid;
  gap: 2rem;
  @include for-large-tablet-portrait-up {
    grid-template-columns: 1fr auto;
  }
  &__image {
    max-width: 5.625rem;
    max-height: 5.625rem;
    flex-shrink: 0;
  }
  &__controls {
    display: flex;
    gap: 0.75rem;
  }
  &__details {
    display: flex;
    gap: 2rem;
    @include for-tablet-portrait-down {
      flex-direction: column;
      gap: 1rem;
    }
  }
  &__title {
    display: block;
    margin-bottom: 1.5rem;
  }
}
</style>
