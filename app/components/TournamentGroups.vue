<template>
  <section class="grid gap-2 tablet-lg:grid-cols-[2fr_1fr]">
    <div class="grid gap-1.5 h-fit">
      <StandingsCard
        v-for="(group, index) in displayedGroups"
        :qualifier="filtersForm.view === TableEntryView.OVERALL ? stage.overallQualifier : group.qualifier"
        :standings="group.standings"
        :entry-type="filtersForm.entryType"
        :sort-type="filtersForm.sortType"
        :key="group.order"
        :title="getCardTitle(group.order)"
        :matchweeks="stage.matchweeks"
        @update:qualifier="onUpdateGroupQualifier($event, index)"
      >
        <template #header>
          <AppButton
            v-if="index === 0"
            class="btn-square btn-ghost w-2 h-2"
            aria-label="Filters"
            :icon-left="IconAdjustmentsHorizontal"
            @click="showFilters = !showFilters"
          />
        </template>
        <StandingsFilters
          v-if="index === 0"
          v-show="showFilters"
          v-model="filtersForm"
          :show-view-input="stage.groups.length > 1"
          @reset="filtersForm = newFiltersForm()"
        />
      </StandingsCard>
    </div>
    <MatchweekCard
      v-model="stage"
      class="sticky top-2 max-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden"
      @match-updated="updateStandings"
    />
  </section>
</template>

<script lang="ts" setup>
import { getStandingsDataFromScore } from '~/helpers/standings';
import type { MatchWithOldScore } from './MatchCard.vue';
import { IconAdjustmentsHorizontal } from '@tabler/icons-vue';
import type { FiltersForm } from './StandingsFilters.vue';
import { getMatchResult } from '~/helpers/match';

const stage = defineModel<TournamentGroupsStage>({ required: true });

const newFiltersForm = (): FiltersForm => ({
  entryType: TableEntryType.OVERALL,
  sortType: TableEntrySortType.POINTS,
  view: TableEntryView.PER_GROUP,
}); 

const filtersForm = ref<FiltersForm>(newFiltersForm());
const showFilters = ref(false);

// Displayed groups
const displayedGroups = computed<TournamentGroupsStage['groups']>(() => (
  filtersForm.value.view === TableEntryView.PER_GROUP ? stage.value.groups : [{
    order: -1,
    qualifier: [],
    standings: stage.value.groups.flatMap((group) => group.standings),
  }]
));

function onUpdateGroupQualifier(value: Qualifier[], groupIndex: number) {
  if (filtersForm.value.view === TableEntryView.OVERALL) {
    stage.value.overallQualifier = value;
    return;
  }

  stage.value.groups[groupIndex]!.qualifier = value;
}

// Card title
function getCardTitle(order: TournamentGroupsStage['groups'][number]['order']) {
  if (stage.value.groups.length === 1) return 'Classificação';

  if (filtersForm.value.view === TableEntryView.OVERALL) return 'Classificação geral';

  return `Grupo ${order}`;
}

// Update standings
function updateStandings(match: MatchWithOldScore, week: Matchweek['week']) {
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
        entry[key].form = entry[key].form.filter((f) => f.week !== week);
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
        entry[key].form.push({
          week,
          match,
          result: getMatchResult(match.homeTeam.score!, match.awayTeam.score!, isHome),
        });
        entry[key].form.sort((a, b) => a.week - b.week);
      }
    });
  });
}
</script>
