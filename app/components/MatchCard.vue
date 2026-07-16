<template>
  <div
    ref="matchCardRef"
    class="grid w-full gap-0.5"
    :class="[layout === 'vertical' ? 'grid-cols-[1fr_auto]' : 'grid-cols-[1fr_auto_1fr]']"
  >
    <MatchCardTeam
      :disabled="homeTeamDisabled || (!!winnerTeamId && winnerTeamId !== match.homeTeam.id)"
      :align="layout !== 'vertical' ? 'right' : undefined"
      :team="match.homeTeam.id"
      :show-country="showCountry"
      :is-highlighted="homeTeamHighlighted"
      :is-clickable="props.homeTeamClickable"
      @click="$emit('homeTeamClick', match.homeTeam.id ?? undefined)"
    />
    <div
      class="flex items-center gap-0.5 h-full"
      :class="{ 'row-span-2': layout === 'vertical' }"
    >
      <span
        v-if="homeScore === undefined && awayScore === undefined"
        class="flex items-center font-medium mx-0.5"
      >
        ✕
      </span>
      <template v-else>
        <MatchCardScore
          v-model:home-score="homeScore"
          v-model:away-score="awayScore"
          :layout="layout"
          :disabled="!!readonly || match.homeTeam.id === null || match.awayTeam.id === null"
        />
        <MatchCardScore
          v-if="fixtureTwoHomeScore !== undefined && fixtureTwoAwayScore !== undefined"
          v-model:home-score="fixtureTwoHomeScore"
          v-model:away-score="fixtureTwoAwayScore"
          :layout="layout"
          :disabled="!!readonly || match.homeTeam.id === null || match.awayTeam.id === null"
        />
      </template>
    </div>
    <MatchCardTeam
      :disabled="awayTeamDisabled || (!!winnerTeamId && winnerTeamId !== match.awayTeam.id)"
      :team="match.awayTeam.id"
      :show-country="showCountry"
      :is-highlighted="awayTeamHighlighted"
      :is-clickable="props.awayTeamClickable"
      @click="$emit('awayTeamClick', match.awayTeam.id ?? undefined)"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  match: Match;
  layout?: 'vertical';
  showCountry?: boolean;
  readonly?: boolean;
  size?: 'sm';
  winnerTeamId?: TeamDetails['id'];
  homeTeamHighlighted?: boolean;
  awayTeamHighlighted?: boolean;
  homeTeamClickable?: boolean;
  awayTeamClickable?: boolean;
  homeTeamDisabled?: boolean;
  awayTeamDisabled?: boolean;
}>();

const emit = defineEmits<{
  matchUpdated: [MatchWithOldScore];
  focus: [];
  blur: [];
  homeTeamClick: [Team['id']?];
  awayTeamClick: [Team['id']?];
}>();

const homeScore = defineModel<Match['homeTeam']['score']>('home-score');
const awayScore = defineModel<Match['awayTeam']['score']>('away-score');
const fixtureTwoHomeScore = defineModel<Match['homeTeam']['score']>('fixture-two-home-score');
const fixtureTwoAwayScore = defineModel<Match['awayTeam']['score']>('fixture-two-away-score');

watch(() => [props.match.homeTeam.score, props.match.awayTeam.score], (_, oldScore) => {
  emit('matchUpdated', {
    ...props.match,
    oldScore: { home: oldScore[0] ?? null, away: oldScore[1] ?? null },
  });
});

const matchCardRef = useTemplateRef<HTMLDivElement>('matchCardRef');
const { focused } = useFocusWithin(matchCardRef);

watch(focused, () => {
  if (focused.value) {
    emit('focus');
  } else {
    emit('blur');
  }
});
</script>
