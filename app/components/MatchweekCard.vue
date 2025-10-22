<template>
  <section class="card card-border h-fit">
    <div class="card-body gap-0 p-1.25">
      <MatchweekCardEmptyState
        v-if="stage.matchweeks.length === 0"
        :stage="stage"
      />
      <template v-else>
        <header class="grid grid-cols-[1fr_auto_1fr] mb-1.5 border-b-gray-200 border-b -mt-1.25 pt-1.25 pb-1 sticky top-0 bg-white">
          <div class="flex gap-0.75">
            <EditMatchweekKickoff 
              :matches="stage.matchweeks[currentMatchweek - 1]!.matches"
              @kickoffs-updated="stage.matchweeks[currentMatchweek - 1]!.matches = $event"
            />
            <AppButton
              v-tooltip="'Sortear resultados'"
              aria-label="Sortear resultados"
              class="btn-secondary btn-square btn-soft btn-sm"
              :icon-left="IconDice5"
              @click="getRandomMatchweekResults"
            />
          </div>
          <div class="flex gap-0.5 flex-1 justify-center">
            <AppButton
              v-tooltip="'Rodada anterior'"
              class="btn-square btn-sm btn-ghost"
              aria-label="Show previous matchweek"
              :icon-left="IconChevronLeft"
              :disabled="currentMatchweek <= 1"
              @click="currentMatchweek -= 1"
            />
            <BaseSelect
              v-model="currentMatchweek"
              class="select-ghost w-7 p-0 justify-center h-2 bg-[url()] font-semibold text-lg [&_option]:font-normal [&_option]:textarea-md"
              :options="matchweeksOptions"
            />
            <AppButton
              v-tooltip="'Próxima rodada'"
              class="btn-square btn-sm btn-ghost"
              aria-label="Show next matchweek"
              :icon-left="IconChevronRight"
              :disabled="currentMatchweek >= stage.matchweeks.length"
              @click="currentMatchweek += 1"
            />
          </div>
          <div class="flex gap-0.75 justify-end">
            <DeleteMatchweeksButton :stage-id="stage.id" />
          </div>
        </header>
        <div class="grid gap-1">
          <template
            v-for="(match, index) in stage.matchweeks[currentMatchweek - 1]!.matches.toSorted(sortMatches)"
            :key="match.id"
          >
            <span
              v-if="match.kickoff && showMatchKickoff[index]"
              v-text="getKickoffDisplayText(match.kickoff, 'EEEEEE \'•\' kk\'h\'mm')"
              class="divider justify-self-center w-full max-w-2/3 mt-0.75 first:mt-0 -mb-0.5 text-xs font-semibold capitalize"
            />
            <MatchCard
              v-model:home-score="match.homeTeam.score"
              v-model:away-score="match.awayTeam.score"
              :match="match"
              @match-updated="$emit('match-updated', $event, currentMatchweek)"
              @focus="teamStore.focusMatchTeams(match)"
              @blur="teamStore.blurMatchTeams(match)"
            />
          </template>
        </div>
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight, IconDice5 } from '@tabler/icons-vue';
import type { MatchCardEmits } from './MatchCard.vue';
import { isBefore } from 'date-fns';
import { getKickoffDisplayText, getRandomScore } from '~/helpers/match';

const teamStore = useTeamStore();

defineEmits<{
  'match-updated': [MatchCardEmits['match-updated'][number], Matchweek['week']]
}>();

const stage = defineModel<TournamentGroupsStage>({ required: true });

const currentMatchweek = ref(
  stage.value.matchweeks.find(
    (i) => i.matches.some((m) => m.homeTeam.score === null || m.awayTeam.score === null)
  )?.week || (stage.value.matchweeks[stage.value.matchweeks.length - 1]?.week ?? 1),
);

const matchweeksOptions = computed<SelectOptionList<number>>(() => stage.value.matchweeks.map((i) => ({
  label: `Rodada ${i.week}`,
  value: i.week,
})));

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

async function getRandomMatchweekResults() {
  for (const match of stage.value.matchweeks[currentMatchweek.value - 1]!.matches) {
    await new Promise((resolve) => {
      match.homeTeam.score = getRandomScore();
      match.awayTeam.score = getRandomScore();

      setTimeout(resolve);
    });
  }
}
</script>
