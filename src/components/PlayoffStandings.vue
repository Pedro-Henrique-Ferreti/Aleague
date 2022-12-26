<template>
  <div class="playoff-standings">
    <div class="playoff-standings__controls">
      <RoundToggle
        :disable-previous-button="activeRoundNumber === 1"
        :disable-next-button="activeRoundNumber === playoffStandings?.standings.length"
        @previous-round="activeRoundNumber--"
        @next-round="activeRoundNumber++"
      />
    </div>
    <RoundHeader>
      <span
        v-for="{ number } in displayedRounds"
        v-text="getRoundName(number)"
        :key="number"
      />
    </RoundHeader>
    <div class="playoff-round-grid">
      <div
        v-for="round in displayedRounds"
        class="playoff-standings__card-list"
        :key="round.number"
      >
        <template
          v-for="confrontation, index in round.confrontations"
          :key="index"
        >
          <PlayoffCard
            v-if="confrontation.games[1]"
            :games="confrontation.games"
            v-model:first-game-score-team-a="confrontation.games[0].homeTeamScore"
            v-model:first-game-score-team-b="confrontation.games[0].awayTeamScore"
            v-model:second-game-score-team-a="confrontation.games[1].awayTeamScore"
            v-model:second-game-score-team-b="confrontation.games[1].homeTeamScore"
            v-model:penalty-score-team-a="confrontation.games[0].homeTeamPenaltyShootoutScore"
            v-model:penalty-score-team-b="confrontation.games[0].awayTeamPenaltyShootoutScore"
            @clear-next-round="clearNextRound"
            @update-winner="moveTeamToNextRound"
          />
          <PlayoffCard
            v-else
            :games="confrontation.games"
            v-model:first-game-score-team-a="confrontation.games[0].homeTeamScore"
            v-model:first-game-score-team-b="confrontation.games[0].awayTeamScore"
            v-model:penalty-score-team-a="confrontation.games[0].homeTeamPenaltyShootoutScore"
            v-model:penalty-score-team-b="confrontation.games[0].awayTeamPenaltyShootoutScore"
            @clear-next-round="clearNextRound"
            @update-winner="moveTeamToNextRound"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, computed } from 'vue';
import { KEY_PLAYOFF } from '@/constants/injectionKeys';
import RoundToggle from './CompetitionRoundToggle.vue';
import RoundHeader from './PlayoffRoundHeader.vue';
import PlayoffCard from './PlayoffCard.vue';

// Injected values
const playoffStandings = inject(KEY_PLAYOFF);

const activeRoundNumber = ref(1);

const displayedRounds = computed(() => {
  if (!playoffStandings) {
    return [];
  }

  const { standings } = playoffStandings.value;
  const index = activeRoundNumber.value - 1;

  return standings.slice(index, index + 3);
});

function getRoundName(number: number): string {
  if (!playoffStandings) {
    return '';
  }

  const roundNumbers = playoffStandings.value.standings
    .slice(-4)
    .map(({ number }) => number)
    .reverse();

  switch (number) {
    case roundNumbers[0]:
      return 'Final';
    case roundNumbers[1]:
      return 'Semi-final';
    case roundNumbers[2]:
      return 'Quartas de final';
    case roundNumbers[3]:
      return 'Oitavas de final';
    default:
      return `Fase ${number}`;
  }
}

// Clear next round
function clearNextRound() {
  console.log('clear round');
}

// Move team to next round
function moveTeamToNextRound(team: { id: number, name: string }) {
  console.log(team);
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
  &__card-list {
    display: grid;
    gap: 1rem;
    &:not(:first-of-type) {
      place-items: center flex-end;
    }
    &:nth-child(2) {
      place-items: center;
    }
  }
}
</style>
