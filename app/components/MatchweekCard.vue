<template>
  <section class="card card-border h-fit relative">
    <MatchweekCardSimulationLoader />
    <div class="card-body gap-0 p-1.25">
      <MatchweekCardEmptyState v-if="stageStore.activeGroupStage?.matchweeks.length === 0" />
      <template v-else-if="selectedMatchweek">
        <header class="matchweek-header">
          <MatchweekCardControls />
          <MatchweekCardOptions />
        </header>
        <div class="grid gap-1">
          <template
            v-for="(match, index) in selectedMatchweek.matches.toSorted(sortMatches)"
            :key="match.id"
          >
            <span
              v-if="match.kickoff && showMatchKickoff[index]"
              v-text="getKickoffDisplayText(match.kickoff, 'EEEEEE \'•\' kk\'h\'mm')"
              class="matchweek-kickoff divider"
            />
            <MatchCard
              v-model:home-score="match.homeTeam.score"
              v-model:away-score="match.awayTeam.score"
              :match="match"
              @match-updated="handleMatchUpdated"
              @focus="nextTick(() => teamStore.focusMatchTeams(match))"
              @blur="nextTick(() => teamStore.blurMatchTeams(match))"
            />
          </template>
        </div>
        <MatchweekKickoffModal />
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { isBefore } from 'date-fns';
import { getKickoffDisplayText } from '~/helpers/match';
import { updateStandings } from '~/helpers/standings.js';

const stageStore = useStageStore();
const matchweekCardStore = useMatchweekCardStore();
const { selectedMatchweek, selectedWeekNumber } = storeToRefs(matchweekCardStore);
const teamStore = useTeamStore();

function sortMatches(a: Match, b: Match) {
  if (a.kickoff && !b.kickoff) return 1;
  if (!a.kickoff && b.kickoff) return -1;
  if (a.kickoff === b.kickoff) return 0;

  return isBefore(a.kickoff!, b.kickoff!) ? -1 : 1;
}

const showMatchKickoff = computed(() => {
  if (!selectedMatchweek.value) return [];

  const matches = selectedMatchweek.value.matches.toSorted(sortMatches);

  return matches.map((match, i) => (
    !matches[i - 1] || matches[i - 1]!.kickoff !== match.kickoff
  ));
});

function handleMatchUpdated(match: MatchWithOldScore) {
  if (!stageStore.activeGroupStage || matchweekCardStore.isResettingMatchweeks) return;

  stageStore.activeGroupStage.groups = updateStandings(stageStore.activeGroupStage.groups, match, selectedWeekNumber.value);
}
</script>

<style scoped>
@reference '@/assets/css/main.css';

.matchweek-header {
  @apply grid grid-cols-[1fr_auto_1fr] mb-1.5 border-b-gray-200 border-b -mt-1.25 pt-1.25 pb-1 sticky top-0 bg-white;
}

.matchweek-kickoff {
  @apply justify-self-center w-full max-w-2/3 mt-0.75 first:mt-0 -mb-0.5 text-xs font-semibold capitalize;
}
</style>
