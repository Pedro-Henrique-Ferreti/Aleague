<template>
  <div class="team-profile | app-base-card">
    <div class="team-profile__content-wrapper">
      <div class="team-profile__emblem">
        <img
          class="team-profile__emblem-img"
          :src="team.emblemUrl"
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
        :to="{ name: 'edit-team', params: { id: team.id } }"
      />
      <AppIconButton
        v-tooltip="(team.isFavorite) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
        color="secondary"
        :icon="(team.isFavorite) ? IconStar : IconStarOutline"
        :is-loading="isUpdatingTeamFavoriteStatus"
        @click="toggleTeamFavoriteStatus"
      />
      <AppIconButton
        v-tooltip="'Comparar estatísticas'"
        color="secondary"
        :icon="IconGraphLine"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue';
import type { TeamDetails } from '@/types/Team';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/composables/toast';
import { COUNTRY_OPTIONS } from '@/constants/country';
// import api from '@/api';
import IconCalendarAdd from '@/assets/icons/CalendarAdd.svg';
import IconGraphLine from '@/assets/icons/GraphLine.svg';
import IconPencil from '@/assets/icons/Pencil.svg';
import IconStar from '@/assets/icons/Star.svg';
import IconStarOutline from '@/assets/icons/StarOutline.svg';
import AppIconButton from './AppIconButton.vue';
import AppChip from './AppChip.vue';

const toast = useToast();

const emit = defineEmits<{
  (e: 'update-favorite-status', value: boolean): void;
}>();
const props = defineProps({
  team: {
    type: Object as PropType<TeamDetails>,
    required: true,
  },
});

const countryName = computed(() => (
  COUNTRY_OPTIONS.find(({ id }) => id === props.team.country)?.text
));

// Toggle team favorite status
const isUpdatingTeamFavoriteStatus = ref(false);

async function toggleTeamFavoriteStatus() {
  isUpdatingTeamFavoriteStatus.value = true;

  try {
    // await api.teamService.toggleTeamFavoriteStatus(props.team.id);

    toast.success('Status da equipe atualizado com sucesso!');

    emit('update-favorite-status', !props.team.isFavorite);
  } catch (error: any) {
    toast.error('Não foi possível atualizar o status da equipe. Por favor, tente novamente.');
  } finally {
    isUpdatingTeamFavoriteStatus.value = false;
  }
}
</script>

<style lang="scss" scoped>
.team-profile {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr auto;
  &__emblem {
    --size: 6rem;
    @include for-tablet-portrait-up {
      --size: 8.5rem;
    }
    display: grid;
    place-items: center;
    width: var(--size);
    height: var(--size);
    border: 1px solid $color--neutral-100;
    border-radius: 0.75rem;
  }
  &__emblem-img {
    max-width: 83%;
    max-height: 83%;
  }
  &__content-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    @include for-tablet-portrait-up {
      gap: 1.5rem;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    @include for-tablet-portrait-up {
      padding-top: 0.5rem;
    }
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
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
