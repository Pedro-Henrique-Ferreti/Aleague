<template>
  <div class="team-details | app-base-card">
    <div class="team-details__item">
      <b>Criado em</b>
      <span>{{ formatDate(team.createdAt) }}</span>
    </div>
    <div class="team-details__item">
      <b>Última atualização em</b>
      <span>{{ formatDate(team.createdAt) }}</span>
    </div>
    <AppButton
      block
      color="danger"
      :icon-left="IconDelete"
    >
      Excluir equipe
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { TeamDetails } from '@/types/Team';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import IconDelete from '@/assets/icons/IconDelete.svg';
import AppButton from './AppButton.vue';

defineProps({
  team: {
    type: Object as PropType<TeamDetails>,
    required: true,
  },
});

// Format date
function formatDate(date: string) {
  return format(new Date(date), 'd MMMM yyyy', { locale: ptBR });
}
</script>

<style lang="scss" scoped>
.team-details {
  &__item {
    display: grid;
    grid: 0.25rem;
    margin-bottom: 1rem;
    &:last-of-type {
      margin-bottom: 2rem;
    }
    b {
      color: $color--text-strong;
      font-weight: $font-weight--medium;
    }
  }
}
</style>
