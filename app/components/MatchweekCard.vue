<template>
  <section class="card card-border h-fit">
    <div class="card-body gap-0 p-1.25">
      <MatchweekCardEmptyState
        v-if="stage.matchweeks.length === 0"
        :stage="stage"
      />
      <template v-else>
        <header class="matchweek-header">
          <MatchweekCardControls
            v-model:current-matchweek="currentMatchweek"
            :matchweeks="stage.matchweeks"
          />
          <MatchweekCardOptions
            @edit-kickoffs="matchweekKickoffModalIsOpen = true"
            @randomize-results="randomizeMatchweekResults"
            @delete-matchweeks="tournamentStore.deleteMatchweeks(tournamentStore.activeTournamentId!, stage.id)"
          />
        </header>
        <div class="grid gap-1">
          <template
            v-for="(match, index) in stage.matchweeks[currentMatchweek - 1]!.matches.toSorted(sortMatches)"
            :key="match.id"
          >
            <span
              v-if="match.kickoff && showMatchKickoff[index]"
              v-text="getKickoffDisplayText(match.kickoff, 'EEEEEE \'•\' kk\'h\'mm')"
              class="matchweek-kickoff"
            />
            <MatchCard
              v-model:home-score="match.homeTeam.score"
              v-model:away-score="match.awayTeam.score"
              :match="match"
              @match-updated="$emit('match-updated', $event, currentMatchweek)"
              @focus="nextTick(() => teamStore.focusMatchTeams(match))"
              @blur="nextTick(() => teamStore.blurMatchTeams(match))"
            />
          </template>
        </div>
        <MatchweekKickoffModal
          v-model:is-open="matchweekKickoffModalIsOpen" 
          :matches="stage.matchweeks[currentMatchweek - 1]!.matches"
          @kickoffs-updated="stage.matchweeks[currentMatchweek - 1]!.matches = $event"
        />
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { MatchCardEmits } from './MatchCard.vue';
import { isBefore } from 'date-fns';
import { getKickoffDisplayText, getRandomScore } from '~/helpers/match';

const tournamentStore = useTournamentStore();
const teamStore = useTeamStore();

defineEmits<{
  'match-updated': [MatchCardEmits['match-updated'][number], Matchweek['week']]
}>();

const matchweekKickoffModalIsOpen = ref(false);

const stage = defineModel<TournamentGroupsStage>({ required: true });

const currentMatchweek = ref(
  stage.value.matchweeks.find(
    (i) => i.matches.some((m) => m.homeTeam.score === null || m.awayTeam.score === null)
  )?.week || (stage.value.matchweeks[stage.value.matchweeks.length - 1]?.week ?? 1),
);

function sortMatches(a: Match, b: Match) {
  if (a.kickoff && !b.kickoff) return 1;
  if (!a.kickoff && b.kickoff) return -1;
  if (a.kickoff === b.kickoff) return 0;

  return isBefore(a.kickoff!, b.kickoff!) ? -1 : 1;
}

const showMatchKickoff = computed(() => {
  const matches = stage.value.matchweeks[currentMatchweek.value - 1]!.matches.toSorted(sortMatches);

  return matches.map((match, i) => (
    !matches[i - 1] || matches[i - 1]!.kickoff !== match.kickoff
  ));
});

async function randomizeMatchweekResults() {
  for (const match of stage.value.matchweeks[currentMatchweek.value - 1]!.matches) {
    await new Promise((resolve) => {
      match.homeTeam.score = getRandomScore();
      match.awayTeam.score = getRandomScore();

      setTimeout(resolve);
    });
  }
}
</script>

<style scoped>
@reference '@/assets/css/main.css';

.matchweek-header {
  @apply grid grid-cols-[1fr_auto_1fr] mb-1.5 border-b-gray-200 border-b -mt-1.25 pt-1.25 pb-1 sticky top-0 bg-white;
}

.matchweek-kickoff {
  @apply divider justify-self-center w-full max-w-2/3 mt-0.75 first:mt-0 -mb-0.5 text-xs font-semibold capitalize;
}
</style>
