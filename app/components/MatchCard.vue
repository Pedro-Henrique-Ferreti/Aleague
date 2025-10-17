<template>
  <div
    class="grid w-full gap-0.5"
    :class="[layout === 'vertical' ? 'grid-cols-[1fr_auto]' : 'grid-cols-[1fr_auto_1fr]']"
  >
    <MatchCardTeam
      :align="layout !== 'vertical' ? 'right' : undefined"
      :team="match.homeTeam.id"
      :show-country="showCountry"  
    />
    <div
      class="flex items-stretch gap-0.5 h-full"
      :class="{ 'row-span-2': layout === 'vertical' }"
    >
      <span
        v-if="homeScore === undefined && awayScore === undefined"
        class="flex items-center font-semibold text-gray-600"
      >
        ✕
      </span>
      <template v-else>
        <MatchCardScore
          v-model:home-score="homeScore"
          v-model:away-score="awayScore"
          :layout="layout"
          :disabled="match.homeTeam.id === null || match.awayTeam.id === null"
        />
        <MatchCardScore
          v-if="fixtureTwoHomeScore !== undefined && fixtureTwoAwayScore !== undefined"
          v-model:home-score="fixtureTwoHomeScore"
          v-model:away-score="fixtureTwoAwayScore"
          :layout="layout"
          :disabled="match.homeTeam.id === null || match.awayTeam.id === null"
        />
      </template>
    </div>
    <MatchCardTeam
      :team="match.awayTeam.id"
      :show-country="showCountry"  
    />
  </div>
</template>

<script lang="ts">
export interface MatchWithOldScore extends Match {
  oldScore: {
    home: Match['homeTeam']['score'];
    away: Match['awayTeam']['score'];
  }
}
export interface MatchCardEmits {
  'match-updated': [MatchWithOldScore];
}
</script>

<script lang="ts" setup>
const props = defineProps<{
  match: Match;
  layout?: 'vertical';
  showCountry?: boolean;
}>();

const emit = defineEmits<MatchCardEmits>();

const homeScore = defineModel<Match['homeTeam']['score']>('home-score');
const awayScore = defineModel<Match['awayTeam']['score']>('away-score');
const fixtureTwoHomeScore = defineModel<Match['homeTeam']['score']>('fixture-two-home-score');
const fixtureTwoAwayScore = defineModel<Match['awayTeam']['score']>('fixture-two-away-score');

watch(() => [props.match.homeTeam.score, props.match.awayTeam.score], (_, oldScore) => {
  emit('match-updated', {
    ...props.match,
    oldScore: { home: oldScore[0] ?? null, away: oldScore[1] ?? null },
  });
});
</script>
