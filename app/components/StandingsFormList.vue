<template>
  <TeamListFilter
    v-model="selectedTeams"
    title="Sequência"
    :options="teamOptions"
  />
  <swiper-container
    class="mt-1"
    space-between="16"
    free-mode="true"
    slides-per-view="auto"
  >
    <swiper-slide
      v-for="item in displayedForm"
      :key="item.match.id"
      class="w-max last:mr-0!"
      data-allow-mismatch="class"
    >
      <StandingsFormItem
        class="min-h-7"
        :form="item"
        :team-id="teamId"
      />
    </swiper-slide>
  </swiper-container>
  <div class="flex gap-1.5 mt-1 text-xs [&_b]:text-sm">
    <p class="flex gap-0.5">
      <span>Partidas: <b>{{ stats.home.played + stats.away.played }}</b></span>
      <span>V: <b>{{ stats.home.won + stats.away.won }}</b></span>
      <span>E: <b>{{ stats.home.drawn + stats.away.drawn }}</b></span>
      <span>D: <b>{{ stats.home.lost + stats.away.lost }}</b></span>
    </p>
    <p class="flex gap-0.5">
      <span>Casa: <b>{{ stats.home.played }}</b></span>
      <span>V: <b>{{ stats.home.won }}</b></span>
      <span>E: <b>{{ stats.home.drawn }}</b></span>
      <span>D: <b>{{ stats.home.lost }}</b></span>
    </p>
    <p class="flex gap-0.5">
      <span>Fora: <b>{{ stats.away.played }}</b></span>
      <span>V: <b>{{ stats.away.won }}</b></span>
      <span>E: <b>{{ stats.away.drawn }}</b></span>
      <span>D: <b>{{ stats.away.lost }}</b></span>
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  form: TableEntry['form'];
  teamId: TableEntry['team'];
}>();

// Team options
const selectedTeams = ref<Team['id'][]>([]);

const teamOptions = computed(() => (
  Array.from(
    new Set(props.form.flatMap(i => [i.match.homeTeam.id, i.match.awayTeam.id])),
  ).filter((id): id is NonNullable<typeof id> => id !== null && id !== props.teamId)
));

// Form
const displayedForm = computed(() => props.form.filter(({ match }) => (
  selectedTeams.value.length === 0
  || selectedTeams.value.includes(match.homeTeam.id!)
  || selectedTeams.value.includes(match.awayTeam.id!)
)));

const stats = computed(() => {
  const statistics = {
    home: { played: 0, won: 0, drawn: 0, lost: 0 },
    away: { played: 0, won: 0, drawn: 0, lost: 0 },
  };

  displayedForm.value.forEach(({ match, result }) => {
    if (match.homeTeam.score === null || match.awayTeam.score === null) return;

    const isHomeTeam = match.homeTeam.id === props.teamId;
    const key: keyof typeof statistics = isHomeTeam ? 'home' : 'away';

    statistics[key].played += 1;

    if (result === MatchResult.WON) {
      statistics[key].won += 1;
    } else if (result === MatchResult.DRAW) {
      statistics[key].drawn += 1;
    } else if (result === MatchResult.LOST) {
      statistics[key].lost += 1;
    }
  });

  return statistics;
});
</script>
