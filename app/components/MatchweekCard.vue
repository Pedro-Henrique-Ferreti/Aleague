<template>
  <section class="card card-border h-fit">
    <div class="card-body gap-0 p-1.25">
      <MatchweekCardEmptyState v-if="stage.matchweeks.length === 0" />
      <template v-else-if="selectedMatchweek">
        <header class="matchweek-header">
          <MatchweekCardControls
            v-model:matchweek-number="activeMatchweekNumber"
            :matchweeks="stage.matchweeks"
            :disabled="isRandomizingScores"
          />
          <MatchweekCardOptions
            @edit-kickoffs="matchweekKickoffModalIsOpen = true"
            @randomize-results="randomizeMatchweekResults"
            @delete-matchweeks="stageStore.deleteGroupMatchweeks"
          />
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
              @match-updated="$emit('matchUpdated', $event, activeMatchweekNumber)"
              @focus="nextTick(() => teamStore.focusMatchTeams(match))"
              @blur="nextTick(() => teamStore.blurMatchTeams(match))"
            />
          </template>
        </div>
        <MatchweekKickoffModal
          v-model:is-open="matchweekKickoffModalIsOpen"
          :matches="selectedMatchweek.matches"
          @kickoffs-updated="selectedMatchweek.matches = $event"
        />
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { MatchCardEmits } from './MatchCard.vue';
import { isBefore } from 'date-fns';
import { getKickoffDisplayText, getRandomScore } from '~/helpers/match';
import { getActiveMatchweekNumber } from '~/helpers/matchweek';

defineEmits<{
  matchUpdated: [MatchCardEmits['matchUpdated'][number], Matchweek['week']];
}>();
const stageStore = useStageStore();
const teamStore = useTeamStore();

const stage = defineModel<GroupStage>({ required: true });

const matchweekKickoffModalIsOpen = ref(false);
const activeMatchweekNumber = ref(getActiveMatchweekNumber(stage.value.matchweeks));

const selectedMatchweek = computed({
  get: () => stage.value.matchweeks[activeMatchweekNumber.value - 1],
  set(value: Matchweek) {
    stage.value.matchweeks[activeMatchweekNumber.value - 1] = value;
  },
});

watch(() => stage.value.matchweeks.length, () => {
  activeMatchweekNumber.value = getActiveMatchweekNumber(stage.value.matchweeks);
});

function sortMatches(a: Match, b: Match) {
  if (a.kickoff && !b.kickoff) return 1;
  if (!a.kickoff && b.kickoff) return -1;
  if (a.kickoff === b.kickoff) return 0;

  return isBefore(a.kickoff!, b.kickoff!) ? -1 : 1;
}

const showMatchKickoff = computed(() => {
  const matches = stage.value.matchweeks[activeMatchweekNumber.value - 1]!.matches.toSorted(sortMatches);

  return matches.map((match, i) => (
    !matches[i - 1] || matches[i - 1]!.kickoff !== match.kickoff
  ));
});

const isRandomizingScores = ref(false);

async function randomizeMatchweekResults() {
  if (!selectedMatchweek.value) return;

  isRandomizingScores.value = true;

  for (const match of selectedMatchweek.value.matches) {
    await new Promise((resolve) => {
      match.homeTeam.score = getRandomScore();
      match.awayTeam.score = getRandomScore();

      setTimeout(resolve);
    });
  }

  isRandomizingScores.value = false;
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
