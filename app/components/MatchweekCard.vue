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
          </div>
          <div class="flex gap-0.5 flex-1 justify-center">
            <AppButton
              v-tooltip="'Rodada anterior'"
              class="btn-square btn-sm btn-ghost"
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
              class="text-xs text-center font-semibold capitalize -mb-0.75"
            />
            <MatchCard
              v-model:home-score="match.homeTeam.score"
              v-model:away-score="match.awayTeam.score"
              :match="match"
              @match-updated="$emit('match-updated', $event)"
            />
          </template>
        </div>
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';
import type { MatchCardEmits } from './MatchCard.vue';
import { isBefore } from 'date-fns';
import { getKickoffDisplayText } from '~/helpers/match';

defineEmits<Pick<MatchCardEmits, 'match-updated'>>();

const stage = defineModel<TournamentGroupsStage>({ required: true });

const currentMatchweek = ref(
  stage.value.matchweeks.find(
    (i) => i.matches.some((m) => m.homeTeam.score === null || m.awayTeam.score === null)
  )?.week || 1,
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
</script>
