<template>
  <div class="groups-page">
    <div class="groups-page__groups">
      <TournamentGroupCard
        v-for="(group, index) in stage.groups"
        :key="group.number"
        :title="(stage.groups.length === 1) ? 'Classificação' : `Grupo ${group.number}`"
        :standings="group.standings"
        :stage="stage"
        @update:position-color="(
          stage.groups[index].standings[$event.rowIndex].positionColor = $event.color
        )"
      />
    </div>
    <TournamentGameweeksCard v-model:gameweeks="stage.gameweeks" />
  </div>
</template>

<script lang="ts" setup>
import type { TournamentGroupsStage } from '@/types/Tournament';
import type { PropType } from 'vue';
import TournamentGameweeksCard from './TournamentGameweeksCard.vue';
import TournamentGroupCard from './TournamentGroupCard.vue';

const stage = defineModel('stage', {
  type: Object as PropType<TournamentGroupsStage>,
  required: true,
});
</script>

<style lang="scss" scoped>
.groups-page {
  --grid-gap: 1.5rem;
  display: grid;
  gap: var(--grid-gap);
  margin-top: 1.5rem;
  @include for-desktop-up {
    grid-template-columns: 2.25fr minmax(25rem, 1fr);
  }
  @include for-large-desktop-up {
    grid-template-columns: 3fr minmax(29rem, 1fr);
  }
  &__groups {
    display: grid;
    gap: var(--grid-gap);
  }
}
</style>
