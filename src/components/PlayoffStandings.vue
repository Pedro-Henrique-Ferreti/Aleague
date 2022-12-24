<template>
  <div class="playoff-standings">
    <div class="playoff-standings__controls">
      <PhaseToggle
        :disable-previous-button="activePhaseNumber === 1"
        :disable-next-button="activePhaseNumber === playoffStandings?.standings.length"
        @previous-phase="activePhaseNumber--"
        @next-phase="activePhaseNumber++"
      />
    </div>
    <PhaseHeader>
      <span
        v-for="phase in displayedPhases"
        v-text="getPhaseName(phase.number)"
        :key="phase.number"
      />
    </PhaseHeader>
    <div class="playoff-phase-grid">
      <div
        v-for="phase in displayedPhases"
        :key="phase.number"
      >
        <div
          v-for="confrontation, index in phase.confrontations"
          :key="index"
        >
          {{ index + 1 + ' - ' + confrontation.teams.map((team) => team?.name).join(' x ') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, computed } from 'vue';
import { KEY_PLAYOFF } from '@/constants/injectionKeys';
import PhaseToggle from './CompetitionPhaseToggle.vue';
import PhaseHeader from './PlayoffPhaseHeader.vue';

// Injected values
const playoffStandings = inject(KEY_PLAYOFF);

const activePhaseNumber = ref(1);

const displayedPhases = computed(() => {
  if (!playoffStandings) {
    return [];
  }

  const { standings } = playoffStandings.value;
  const index = activePhaseNumber.value - 1;

  return standings.slice(index, index + 3);
});

function getPhaseName(number: number): string {
  if (!playoffStandings) {
    return '';
  }

  const phaseNumbers = playoffStandings.value.standings
    .slice(-4)
    .map(({ number }) => number)
    .reverse();

  switch (number) {
    case phaseNumbers[0]:
      return 'Final';
    case phaseNumbers[1]:
      return 'Semi-final';
    case phaseNumbers[2]:
      return 'Quartas de final';
    case phaseNumbers[3]:
      return 'Oitavas de final';
    default:
      return `Fase ${number}`;
  }
}
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
