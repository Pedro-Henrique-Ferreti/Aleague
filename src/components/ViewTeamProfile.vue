<template>
  <div class="team-profile | app-base-card">
    <div class="team-profile__content-wrapper">
      <div class="team-profile__emblem">
        <img
          class="team-profile__emblem-img"
          :src="team.emblem.url"
          :alt="`${team.name}'s emblem`"
        />
      </div>
      <div class="team-profile__content">
        <h1 class="h1">
          {{ team.name }}
        </h1>
        <AppChip
          :icon-left="IconCalendarAdd"
          :text="format(new Date(team.createdAt), 'd MMM yyyy', { locale: ptBR })"
        />
        <div class="team-profile__flag">
          <img
            class="team-profile__flag-img"
            :src="`/images/country-flag/${team.country}.svg`"
            :alt="team.country"
          />
          <span>{{ countryName }}</span>
        </div>
      </div>
    </div>
    <div class="team-profile__controls">
      <AppIconButton
        v-tooltip="'Editar equipe'"
        color="secondary"
        :icon="IconPencil"
      />
      <AppIconButton
        v-tooltip="'Favoritar equipe'"
        color="secondary"
        :icon="IconStarOutline"
      />
      <AppIconButton
        v-tooltip="'Estatísticas'"
        color="secondary"
        :icon="IconGraphLine"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import type { TeamDetails } from '@/types/Team';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { COUNTRY_OPTIONS } from '@/constants/country';
import IconCalendarAdd from '@/assets/icons/IconCalendarAdd.svg';
import IconGraphLine from '@/assets/icons/IconGraphLine.svg';
import IconPencil from '@/assets/icons/IconPencil.svg';
import IconStarOutline from '@/assets/icons/IconStarOutline.svg';
import AppIconButton from './AppIconButton.vue';
import AppChip from './AppChip.vue';

const props = defineProps({
  team: {
    type: Object as PropType<TeamDetails>,
    required: true,
  },
});

const countryName = computed(() => (
  COUNTRY_OPTIONS.find(({ id }) => id === props.team.country)?.text
));
</script>

<style lang="scss" scoped>
.team-profile {
  display: grid;
  gap: 1rem;
  @include for-tablet-portrait-up {
    grid-template-columns: 1fr auto;
  }
  &__emblem {
    display: grid;
    place-items: center;
    width: 8.5rem;
    height: 8.5rem;
    border: 1px solid $color--neutral-100;
    border-radius: 0.75rem;
  }
  &__emblem-img {
    max-width: 7rem;
    max-height: 7rem;
  }
  &__content-wrapper {
    display: flex;
    gap: 1.5rem;
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    padding-top: 0.5rem;
  }
  &__flag {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  &__flag-img {
    width: 2.5rem;
    height: 2.5rem;
  }
  &__controls {
    display: flex;
    gap: 1rem;
    @include for-tablet-portrait-up {
      flex-direction: column;
    }
  }
}
</style>
