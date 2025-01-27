<template>
  <div class="playoffs-page">
    <div
      class="playoffs-page__rounds"
      :data-display-max-rounds="displayedRoundsId.length - maxDisplayedRounds === 0"
    >
      <template
        v-for="(round, index) in stageValue.rounds"
        :key="round.id"
      >
        <TournamentPlayoffRound
          v-if="displayedRoundsId.includes(round.id)"
          v-model:name="round.name"
          v-model:matchups="round.matchups"
          :is-last-round="isLastStage && stageValue.rounds.length - 1 === index"
          @update-next-round="updateRoundMatchups({
            roundIndex: index,
            team: $event.team,
            previousTeam: $event.previousTeam,
            nextMatchupId: $event.nextRoundMatchupId,
          })"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
type UpdateRoundMatchupsPayload = {
  roundIndex: number;
  team: MatchTeam | null;
  previousTeam: MatchTeam | null;
  nextMatchupId: string | null;
};
</script>

<script lang="ts" setup>
import type { TournamentPlayoffsStage } from '@/types/Tournament';
import type { MatchTeam } from '@/types/Match';
import { computed, type PropType } from 'vue';
import { useBreakpoints } from '@/composables/useBreakpoints';
import TournamentPlayoffRound from './TournamentPlayoffRound.vue';

const breakpoints = useBreakpoints({
  LARGE_DESKTOP_UP: 1500,
});

const emit = defineEmits(['update:stage']);
const props = defineProps({
  stage: {
    type: Object as PropType<TournamentPlayoffsStage>,
    required: true,
  },
  selectedRoundId: {
    type: String,
    default: '',
  },
  isLastStage: {
    type: Boolean,
    default: false,
  },
});

const stageValue = computed({
  get: () => props.stage,
  set: (stage) => emit('update:stage', stage),
});

const selectedRoundIndex = computed(() => (
  props.stage.rounds.findIndex((round) => round.id === props.selectedRoundId)
));

const maxDisplayedRounds = computed(() => {
  if (breakpoints.greaterOrEqual('LARGE_DESKTOP_UP').value) return 4;
  if (breakpoints.greaterOrEqual('DESKTOP_UP').value) return 3;
  if (breakpoints.greaterOrEqual('LARGE_TABLET_PORTRAIT_UP').value) return 2;
  return 1;
});

const displayedRoundsId = computed(() => props.stage.rounds.slice(
  selectedRoundIndex.value,
  selectedRoundIndex.value + maxDisplayedRounds.value,
).map((round) => round.id));

// Update round matchups
function updateMatchupFirstTeam(roundIndex: number, matchupIndex: number, team: MatchTeam | null) {
  const matchup = stageValue.value.rounds[roundIndex].matchups[matchupIndex];

  matchup.firstTeam = team;
  matchup.games[0].homeTeam = team;
  matchup.games[0].homeTeamScore = null;
  matchup.games[0].awayTeamScore = null;

  if (matchup.games[1]) {
    matchup.games[1].awayTeam = team;
    matchup.games[1].homeTeamScore = null;
    matchup.games[1].awayTeamScore = null;
  }
}

function updateMatchupSecondTeam(roundIndex: number, matchupIndex: number, team: MatchTeam | null) {
  const matchup = stageValue.value.rounds[roundIndex].matchups[matchupIndex];

  matchup.secondTeam = team;
  matchup.games[0].awayTeam = team;
  matchup.games[0].homeTeamScore = null;
  matchup.games[0].awayTeamScore = null;

  if (matchup.games[1]) {
    matchup.games[1].homeTeam = team;
    matchup.games[1].homeTeamScore = null;
    matchup.games[1].awayTeamScore = null;
  }
}

function updateRoundMatchups(payload: UpdateRoundMatchupsPayload) {
  const nextRoundIndex = payload.roundIndex + 1;
  const nextRound = stageValue.value.rounds[nextRoundIndex];

  if (!nextRound) return;

  const matchupIndex = nextRound.matchups.findIndex(({ id }) => id === payload.nextMatchupId);

  if (matchupIndex === -1) return;

  const matchup = nextRound.matchups[matchupIndex];

  if (!payload.team) {
    if (matchup.firstTeam?.id === payload.previousTeam?.id) {
      updateMatchupFirstTeam(nextRoundIndex, matchupIndex, null);
    } else {
      updateMatchupSecondTeam(nextRoundIndex, matchupIndex, null);
    }
    return;
  }

  if (!matchup.firstTeam || matchup.firstTeam.id === payload.previousTeam?.id) {
    updateMatchupFirstTeam(nextRoundIndex, matchupIndex, payload.team);
  } else {
    updateMatchupSecondTeam(nextRoundIndex, matchupIndex, payload.team);
  }
}
</script>

<style lang="scss" scoped>
.playoffs-page {
  margin-top: 2rem;
  &__rounds {
    display: flex;
    justify-content: center;
    gap: 5rem;
    margin-top: 1.5rem;
    @include for-desktop-up {
      justify-content: flex-start;
      gap: 6rem;
      &[data-display-max-rounds="true"] {
        justify-content: space-between;
      }
    }
  }
}
</style>
