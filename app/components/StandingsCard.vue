<template>
  <section class="card card-border overflow-hidden">
    <div class="card-body gap-0 p-1.25">
      <header class="flex justify-between">
        <div class="text-lg font-medium">{{ title }}</div>
        <slot name="header" />
      </header>
      <slot />
      <div class="divider mt-0.5 -mb-[7px]" />
      <div class="table-container">
        <div
          ref="tableWrapperRef"
          class="overflow-x-auto"
        >
          <table class="table static">
            <TransitionGroup
              name="table-entries"
              tag="tbody"
            >
              <tr
                class="text-xs text-gray-500 bg-gray-1 [&_th]:p-0.75 [&_th]:text-center"
                key="header"
              >
                <th
                  class="resize-observer"
                  aria-hidden="true"
                />
                <th class="position bg-inherit">
                  Posição
                </th>
                <th class="min-w-3">Pts</th>
                <th class="min-w-3">J</th>
                <th class="min-w-3">V</th>
                <th class="min-w-3">E</th>
                <th class="min-w-3">D</th>
                <th class="min-w-3">GP</th>
                <th class="min-w-3">GC</th>
                <th class="min-w-3">SG</th>
                <th class="min-w-4">%</th>
                <th>Recentes</th>
                <th />
              </tr>
              <tr
                v-for="entry, index in standings"
                class="bg-white h-3 hover:bg-gray-1 transition-colors duration-300 text-center [&_td]:px-0.75"
                :key="entry.id"
              >
                <td
                  v-resize-observer="onResizeObserver"
                  class="resize-observer p-0!"
                />
                <td
                  v-if="!entry.team"
                  class="h-3"
                  colspan="11"
                />
                <template v-else>
                  <td class="position bg-inherit h-[2.875rem] py-0">
                    <StandingsCardTeam
                      v-model:qualification="group.qualification[index]!"
                      :position="index + 1"
                      :team-id="entry.team"
                    />
                  </td>
                  <td class="font-semibold">{{ entry.points }}</td>
                  <td>{{ entry.played }}</td>
                  <td>{{ entry.won }}</td>
                  <td>{{ entry.drawn }}</td>
                  <td>{{ entry.lost }}</td>
                  <td>{{ entry.goalsFor }}</td>
                  <td>{{ entry.goalsAgainst }}</td>
                  <td>{{ entry.goalsFor - entry.goalsAgainst }}</td>
                  <td>{{ entry.played ? Math.round(entry.points / (entry.played * POINTS_PER_WIN) * 100) : 0 }}%</td>
                  <td />
                </template>
                <td />
              </tr>
            </TransitionGroup>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
type TableEntry = Pick<StandingsEntry, 'id' | 'team'> & StandingsData;
</script>

<script lang="ts" setup>
import type { ResizeObserverCallback } from '@vueuse/core';
import { vResizeObserver } from '@vueuse/components';

const props = withDefaults(defineProps<{
  title: string;
  filters?: StandingsFilters;
}>(), {
  filters: () => ({
    ordering: OrderingCriteria.POINTS,
    type: StandingsType.OVERALL,
  }),
});

const group = defineModel<TournamentGroupsStage['groups'][number]>({ required: true });

function getTableEntries(entry: StandingsEntry): TableEntry {
  let data: StandingsData = {
    points: entry.home.points + entry.away.points,
    played: entry.home.played + entry.away.played,
    won: entry.home.won + entry.away.won,
    drawn: entry.home.drawn + entry.away.drawn,
    lost: entry.home.lost + entry.away.lost,
    goalsFor: entry.home.goalsFor + entry.away.goalsFor,
    goalsAgainst: entry.home.goalsAgainst + entry.away.goalsAgainst,
  };

  if (props.filters.type === StandingsType.HOME) {
    data = entry.home;
  } else if (props.filters.type === StandingsType.AWAY) {
    data = entry.away;
  }

  return {
    id: entry.id,
    team: entry.team,
    ...data,
  };
}

function sortTableEntries(a: TableEntry, b: TableEntry) {
  switch (props.filters.ordering) {
    case OrderingCriteria.POINTS:
      return b.points - a.points;
    case OrderingCriteria.WON:
      return b.won - a.won;
    case OrderingCriteria.LOST:
      return a.lost - b.lost;
    case OrderingCriteria.GOALS_FOR:
      return b.goalsFor - a.goalsFor;
    case OrderingCriteria.GOALS_AGAINST:
      return a.goalsAgainst - b.goalsAgainst;
    case OrderingCriteria.GOALS_DIFFERENCE:
      return b.goalsFor - a.goalsFor;
  }
}

const standings = computed<TableEntry[]>(() => (
  group.value.standings.map(getTableEntries).sort((a, b) => {
    const result = sortTableEntries(a, b);
    
    if (result !== 0) return result;

    const wonDiff = b.won - a.won;

    if (wonDiff !== 0) return wonDiff;

    const goalDiff = (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);

    if (goalDiff !== 0) return goalDiff;
  
    if (a.played === 0 && b.played === 0) return 0;

    return Math.random() > 0.5 ? 1 : -1;
  })
));

// Position size
const positionSize = ref('0px');

const onResizeObserver: ResizeObserverCallback = (entries) => {
  positionSize.value = `${entries[0]?.contentRect.width || 0}px`;
}

const tableWrapperRef = useTemplateRef<HTMLDivElement>('tableWrapperRef');
const tableScroll = useScroll(tableWrapperRef);

const rightBorderSize = computed(() => {
  const clientWidth = tableWrapperRef.value?.clientWidth || 0;
  const scrollWidth = tableWrapperRef.value?.scrollWidth || 0;
  const scrollSize = scrollWidth - clientWidth;

  return `${scrollSize - tableScroll.x.value}px`;
});
</script>

<style scoped>
@reference '@/assets/css/main.css';

.table-container {
  @apply relative;
}
.table-container::after {
  width: v-bind(rightBorderSize);
  @apply content-[''] max-w-[2.25rem] h-[calc(100%-1rem)] bg-gradient-to-l from-white to-transparent absolute right-0 top-0 pointer-events-none;
}
.resize-observer {
  @apply min-w-16 w-[40%];
}
.position {
  width: v-bind(positionSize);
  @apply text-left absolute left-0;
}

.table-entries-move,
.table-entries-enter-active,
.table-entries-leave-active {
  @apply transition-all duration-300 ease-out;
}
.table-entries-enter-from,
.table-entries-leave-to {
  @apply translate-x-2;
}
.table-entries-leave-active {
  @apply absolute;
}
</style>
