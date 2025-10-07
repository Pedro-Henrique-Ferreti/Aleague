<template>
  <section class="grid gap-2 tablet-lg:grid-cols-[2fr_1fr]">
    <div class="grid gap-1.5 h-fit">
      <StandingsCard
        v-for="(group, index) in stage.groups"
        v-model="stage.groups[index]!"
        :key="group.order"
        :title="stage.groups.length === 1 ? 'Classificação' : `Grupo ${group.order}`"
        :show-filters="index === 0"
      />
    </div>
    <MatchweekCard
      v-model="stage"
      @match-updated="updateStandings"
    />
  </section>
</template>

<script lang="ts" setup>
import { getStandingsDataFromScore } from '~/helpers/standings';
import type { MatchWithOldScore } from './MatchCard.vue';

const stage = defineModel<TournamentGroupsStage>({ required: true });

function updateStandings(match: MatchWithOldScore) {
  const { homeTeam, awayTeam, oldScore } = match;
  const prevFinished = oldScore.home !== null && oldScore.away !== null;
  const newFinished = homeTeam.score !== null && awayTeam.score !== null;

  if (!prevFinished && !newFinished) return;

  const onlySum = !prevFinished && newFinished;
  const onlySubtract = prevFinished && !newFinished;
  const subtractAndSum = prevFinished && newFinished;

  [homeTeam, awayTeam].forEach((team) => {
    stage.value.groups.forEach((group) => {
      const entry = group.standings.find((s) => s.team === team.id);

      if (!entry) return;

      const isHome = team.id === homeTeam.id;
      const key: keyof typeof entry = isHome ? 'home' : 'away';

      if (onlySubtract || subtractAndSum) {
        const data = getStandingsDataFromScore(oldScore.home!, oldScore.away!, isHome);

        entry[key].played -= 1;
        entry[key].points -= data.points;
        entry[key].won -= data.won;
        entry[key].drawn -= data.drawn;
        entry[key].lost -= data.lost;
        entry[key].goalsFor -= data.goalsFor;
        entry[key].goalsAgainst -= data.goalsAgainst;
      }

      if (onlySum || subtractAndSum) {
        const data = getStandingsDataFromScore(homeTeam.score!, awayTeam.score!, isHome);

        entry[key].played += 1;
        entry[key].points += data.points;
        entry[key].won += data.won;
        entry[key].drawn += data.drawn;
        entry[key].lost += data.lost;
        entry[key].goalsFor += data.goalsFor;
        entry[key].goalsAgainst += data.goalsAgainst;
      }
    });
  });
}
</script>
