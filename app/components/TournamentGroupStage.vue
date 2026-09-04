<template>
  <section class="grid gap-2 @min-[50rem]/main:grid-cols-[1.25fr_1fr] @min-[72rem]/main:grid-cols-[2fr_1fr]">
    <div class="grid gap-1.5 h-fit">
      <StandingsCard
        v-for="(group, index) in displayedGroups"
        :key="group.order"
        :legend="filtersForm.view === TableEntryView.OVERALL ? stage.overallLegend : group.legend"
        :standings="group.standings"
        :filters="filtersForm"
        :title="getCardTitle(group)"
        :matchweeks="stage.matchweeks"
        @update:legend="handleUpdateGroupLegend($event, index)"
      >
        <template #header>
          <AppButton
            v-if="index === 0"
            class="btn-square btn-ghost w-2 h-2"
            aria-label="Filtros"
            :icon-left="IconAdjustmentsHorizontal"
            @click="showFilters = !showFilters"
          />
        </template>
        <StandingsFilters
          v-if="index === 0"
          v-show="showFilters"
          v-model="filtersForm"
          @reset="filtersForm = newStandingsFilters()"
        />
      </StandingsCard>
      <LegendsCard :legends="stage.legendDescription" />
    </div>
    <MatchweekCard class="sticky top-2 max-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden" />
    <StandingsLegendsModal />
  </section>
</template>

<script lang="ts" setup>
import { IconAdjustmentsHorizontal } from '@tabler/icons-vue';
import { getGroupName } from '@/helpers/group-stage';

const stage = defineModel<GroupStage>({ required: true });

function newStandingsFilters(): StandingsFilters {
  return {
    entryType: TableEntryType.OVERALL,
    sortType: TableEntrySortType.POINTS,
    view: TableEntryView.PER_GROUP,
    week: DEFAULT_WEEK_OPTION.value,
    weekDirection: WeekDirection.BEFORE,
  };
}

const filtersForm = ref<StandingsFilters>(newStandingsFilters());
const showFilters = ref(false);

const displayedGroups = computed<GroupStage['groups']>(() => (
  filtersForm.value.view === TableEntryView.PER_GROUP
    ? stage.value.groups
    : [{
        order: -1,
        legend: [],
        standings: stage.value.groups.flatMap(group => group.standings),
      }]
));

function getCardTitle(group: GroupStage['groups'][number]) {
  if (stage.value.groups.length === 1) return 'Classificação';
  if (filtersForm.value.view === TableEntryView.OVERALL) return 'Classificação geral';

  return getGroupName(group.order, stage.value.nameFormat);
}

function handleUpdateGroupLegend(value: LegendColor[], groupIndex: number) {
  if (filtersForm.value.view === TableEntryView.OVERALL) {
    stage.value.overallLegend = value;
    return;
  }

  stage.value.groups[groupIndex]!.legend = value;
}
</script>
