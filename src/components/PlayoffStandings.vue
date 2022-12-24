<template>
  <div class="playoff-standings">
    <div class="playoff-standings__controls">
      <PhaseToggle />
    </div>
    <PhaseHeader />
    <div class="playoff-phase-grid">
      <p>Oitavas de final</p>
      <p>Quartas de final</p>
      <p>Semi-final</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PhaseToggle from './CompetitionPhaseToggle.vue';
import PhaseHeader from './PlayoffPhaseHeader.vue';
</script>

<style lang="scss" scoped>
.playoff-standings {
  margin-top: 1.5rem;
  &__controls {
    display: flex;
    align-items: flex-end;
    width: 100%;
    min-height: 2.75rem;
    margin-bottom: 1.5rem;
  }
}
</style>
