<template>
  <div class="matchup-card | app-base-card">
    <AppMatch
      v-model:home-score="matchupInput.games[0].homeTeamScore"
      v-model:away-score="matchupInput.games[0].awayTeamScore"
      direction="vertical"
      :home-team="matchup.games[0].homeTeam"
      :away-team="matchup.games[0].awayTeam"
      :fixture-two-home-score="matchup.games[1]?.homeTeamScore"
      :fixture-two-away-score="matchup.games[1]?.awayTeamScore"
      @update:fixture-two-home-score="(
        (matchupInput.games[1]) ? matchupInput.games[1].homeTeamScore = $event : null
      )"
      @update:fixture-two-away-score="(
        (matchupInput.games[1]) ? matchupInput.games[1].awayTeamScore = $event : null
      )"
    />
    <AppChip
      v-if="isLastRound"
      class="matchup-card__chip"
      color="blue"
      text="Final"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TournamentStageRoundMatchup } from '@/types/Tournament';
import type { MatchTeam } from '@/types/Match';
import { computed, watch, type PropType } from 'vue';
import AppMatch from './AppMatch.vue';
import AppChip from './AppChip.vue';

const emit = defineEmits(['update:matchup']);
const props = defineProps({
  matchup: {
    type: Object as PropType<TournamentStageRoundMatchup>,
    required: true,
  },
  isLastRound: {
    type: Boolean,
    default: false,
  },
});

const matchupInput = computed({
  get: () => props.matchup,
  set: (value) => emit('update:matchup', value),
});

const matchupWinner = computed<MatchTeam | null>(() => {
  const [matchOne, matchTwo] = props.matchup.games;

  if (
    matchOne.homeTeamScore === null
    || matchOne.awayTeamScore === null
    || (matchTwo && (matchTwo.homeTeamScore === null || matchTwo.awayTeamScore === null))
  ) {
    return null;
  }

  const firstTeamScore = matchOne.homeTeamScore + (matchTwo?.awayTeamScore || 0);
  const secondTeamScore = matchOne.awayTeamScore + (matchTwo?.homeTeamScore || 0);

  return (firstTeamScore > secondTeamScore) ? props.matchup.firstTeam : props.matchup.secondTeam;
});

watch(matchupWinner, (winner) => {
  console.log(winner);
});
</script>

<style lang="scss" scoped>
.matchup-card {
  --base-card--padding: 0.75rem;
  width: 100%;
  border-radius: $radius--large;
  position: relative;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
    &:nth-child(even) {
      margin-bottom: 1.5rem;
    }
  }
  &__chip {
    box-shadow: $shadow--popup;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
  }
}
</style>
