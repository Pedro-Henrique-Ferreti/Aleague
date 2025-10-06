<template>
  <div
    class="grid w-full gap-0.5"
    :class="[layout === 'vertical' ? 'grid-cols-[1fr_auto]' : 'grid-cols-[1fr_auto_1fr]']"
  >
    <MatchCardTeam
      :align="layout !== 'vertical' ? 'right' : undefined"
      :team="match.homeTeam.id"
    />
    <div
      class="flex items-stretch gap-0.5 h-full"
      :class="{ 'row-span-2': layout === 'vertical' }"
    >
      <MatchCardScore
        v-model:home-score="homeScore"
        v-model:away-score="awayScore"
        :layout="layout"
      />
      <MatchCardScore
        v-if="fixtureTwoHomeScore !== undefined && fixtureTwoAwayScore !== undefined"
        v-model:home-score="fixtureTwoHomeScore"
        v-model:away-score="fixtureTwoAwayScore"
        :layout="layout"
      />
    </div>
    <MatchCardTeam :team="match.awayTeam.id" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  match: Match;
  layout?: 'vertical';
}>();

const homeScore = defineModel<Match['homeTeam']['score']>('home-score');
const awayScore = defineModel<Match['awayTeam']['score']>('away-score');
const fixtureTwoHomeScore = defineModel<Match['homeTeam']['score']>('fixture-two-home-score');
const fixtureTwoAwayScore = defineModel<Match['awayTeam']['score']>('fixture-two-away-score');
</script>
