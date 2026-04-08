<template>
  <div class="card card-border relative">
    <div class="card-body p-1 pt-1.5 flex flex-col gap-0.75">
      <div
        class="badge badge-soft absolute top-0 left-1/2 -translate-1/2"
        :class="[roundRobinNumber % 2 ? 'badge-secondary' : 'badge-accent']"
      >
        Rodada {{ matchweek.week }}
        <span
          v-if="store.form.roundRobins > 1"
          v-text="`(Turno ${roundRobinNumber})`"
          class="text-xs"
        />
      </div>
      <MatchCard
        v-for="match in matchweek.matches"
        :key="match.id"
        :match="match"
        :home-team-highlighted="shouldHighlightTeam(match.homeTeam.id, match.awayTeam.id, true)"
        :away-team-highlighted="shouldHighlightTeam(match.homeTeam.id, match.awayTeam.id, false)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  matchweek: Matchweek;
}>();

const store = useMatchweekFormStore();

const roundRobinNumber = computed(() => {
  if (!store.matchweekList) return 1;

  const weeksPerRoundRobin = store.matchweekList.matchweeks.length / store.form.roundRobins;

  return Math.ceil(props.matchweek.week / weeksPerRoundRobin);
});

function shouldHighlightTeam(homeTeam: MatchTeam['id'], awayTeam: MatchTeam['id'], isHomeTeam: boolean) {
  if ((isHomeTeam && homeTeam === null) || (!isHomeTeam && awayTeam === null)) return false;

  if (store.previewFilter.showMatchesOnly) {
    return store.previewFilter.highlightedTeams.includes(homeTeam!) && store.previewFilter.highlightedTeams.includes(awayTeam!);
  }

  return isHomeTeam
    ? store.previewFilter.highlightedTeams.includes(homeTeam!)
    : store.previewFilter.highlightedTeams.includes(awayTeam!);
}
</script>
