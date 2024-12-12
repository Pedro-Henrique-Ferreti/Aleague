<template>
  <div class="groups-page">
    <div class="groups-page__standings">
      standings
    </div>
    <TournamentGameweeksCard :gameweeks="stage.gameweeks" />
  </div>
</template>

<script lang="ts" setup>
import type { TournamentGroupsStage } from '@/types/Tournament';
import type { PropType } from 'vue';
import TournamentGameweeksCard from './TournamentGameweeksCard.vue';

defineProps({
  stage: {
    type: Object as PropType<TournamentGroupsStage>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.groups-page {
  --grid-gap: 1.5rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: var(--grid-gap);
  margin-top: 1.5rem;
  &__standings {
    display: grid;
    gap: var(--grid-gap);
  }
}
</style>
