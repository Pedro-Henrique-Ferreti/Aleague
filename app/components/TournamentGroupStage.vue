<template>
  <section class="grid gap-2 @min-[50rem]/main:grid-cols-[1.25fr_1fr] @min-[72rem]/main:grid-cols-[2fr_1fr]">
    <div class="grid gap-1.5 h-fit">
      <StandingsCard
        v-for="(group, index) in displayedGroups"
        :key="group.order"
        :qualifier="filtersForm.view === TableEntryView.OVERALL ? stage.overallQualifier : group.qualifier"
        :standings="group.standings"
        :filters="filtersForm"
        :title="getCardTitle(group.order)"
        :matchweeks="stage.matchweeks"
        @update:qualifier="onUpdateGroupQualifier($event, index)"
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
    </div>
    <MatchweekCard class="sticky top-2 max-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden" />
  </section>
</template>

<script lang="ts" setup>
import { IconAdjustmentsHorizontal } from '@tabler/icons-vue';

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
        qualifier: [],
        standings: stage.value.groups.flatMap(group => group.standings),
      }]
));

function onUpdateGroupQualifier(value: Qualifier[], groupIndex: number) {
  if (filtersForm.value.view === TableEntryView.OVERALL) {
    stage.value.overallQualifier = value;
    return;
  }

  stage.value.groups[groupIndex]!.qualifier = value;
}

function getCardTitle(order: GroupStage['groups'][number]['order']) {
  if (stage.value.groups.length === 1) return 'Classificação';

  if (filtersForm.value.view === TableEntryView.OVERALL) return 'Classificação geral';

  if (stage.value.nameFormat === GroupStageNameFormat.NUMBER) return `Grupo ${order}`;

  const count = order > ALPHABET.length ? Math.ceil(order / ALPHABET.length) : '';
  const charPosition = order > ALPHABET.length ? order % ALPHABET.length : order;

  return `Grupo ${ALPHABET.at(charPosition - 1)}${count}`;
}
</script>
